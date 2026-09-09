const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const letters = require('../src/letters');

const source = ['letters.js', 'audio-manifest.js', 'casino.js']
  .map(file => fs.readFileSync(path.resolve(__dirname, '../src', file), 'utf8'))
  .join('\n');
const expectedBase = 'https://cdn.jsdelivr.net/gh/nsdevaraj/IndianLetters@419d457f7c14afd4345815694a861a6fddfcaa0d/audio/';

function createPlayer(options = {}) {
  const audios = [];
  const utterances = [];
  const audioStatus = { textContent: '' };
  const context = vm.createContext({
    audioStatus,
    document: { addEventListener() {} },
    window: {
      speechSynthesis: {
        getVoices: () => options.voices || [],
        speak: utterance => utterances.push(utterance),
        cancel: () => { utterances.length = 0; },
      },
    },
    Audio: class {
      constructor(url) { this.url = url; this.paused = false; audios.push(this); }
      play() { return options.play ? options.play(this) : Promise.resolve(); }
      pause() { this.paused = true; }
    },
    SpeechSynthesisUtterance: class {
      constructor(text) { this.text = text; }
    },
  });
  vm.runInContext(`${source}\nelements = { audioStatus };`, context);
  return {
    context, audios, utterances, audioStatus,
    select(language, consonant = 0, vowel = 0) {
      vm.runInContext(`currentLang = ${language}; consonantIndex = ${consonant}; vowelIndex = ${vowel};`, context);
    },
    mute() {
      vm.runInContext('soundEnabled = false; stopAudio();', context);
    },
  };
}

test('all 4,547 mapped selections use encoded, revision-pinned IndianLetters CDN URLs', async () => {
  const player = createPlayer();
  let count = 0;
  for (let language = 0; language < letters.lang.length; language++) {
    for (let consonant = 0; consonant < letters.consonantLangs[language].length; consonant++) {
      for (let vowel = 0; vowel < letters.vowelLetterLangs[language].length; vowel++) {
        const filename = letters.getRecordedAudioFilename(language, consonant, vowel);
        if (!filename) continue;
        player.select(language, consonant, vowel);
        await player.context.playAudio();
        const audio = player.audios.at(-1);
        assert.equal(audio.url, `${expectedBase}${encodeURIComponent(letters.lang[language])}/${encodeURIComponent(filename)}`);
        assert.equal(audio.playbackRate, 0.8);
        count++;
      }
    }
  }
  assert.equal(count, 4547);
  assert.equal(player.audios.length, count);
  assert.equal(player.utterances.length, 0);
});

test('legacy Kannada and Thai recordings keep their manifest filename, not the displayed spelling', async () => {
  const player = createPlayer();
  for (const [language, vowel] of [[2, 7], [8, 5], [8, 8]]) {
    player.select(language, 0, vowel);
    await player.context.playAudio();
    const filename = decodeURIComponent(new URL(player.audios.at(-1).url).pathname.split('/').at(-1));
    assert.equal(filename, letters.getRecordedAudioFilename(language, 0, vowel));
    assert.notEqual(filename, letters.getAudioFilename(language, 0, vowel));
  }
});

test('absent recordings use only matching-language voices without requesting the CDN', async () => {
  const player = createPlayer({ voices: [{ lang: 'en-US' }, { lang: 'hi-IN' }] });
  player.select(4, 33);
  await player.context.playAudio();
  assert.equal(player.audios.length, 0);
  assert.equal(player.utterances.length, 1);
  assert.equal(player.utterances[0].lang, 'hi-IN');
  assert.equal(player.utterances[0].text, letters.getPronunciationText(4, 33, 0));
});

test('languages without recordings or matching voices report unavailable audio', async () => {
  const player = createPlayer({ voices: [{ lang: 'en-US' }] });
  for (let language = 9; language < letters.lang.length; language++) {
    player.select(language);
    await player.context.playAudio();
    assert.match(player.audioStatus.textContent, /No recording is available.*no matching device voice/);
  }
  assert.equal(player.audios.length, 0);
  assert.equal(player.utterances.length, 0);
});

for (const [name, message] of [
  ['NotAllowedError', /browser blocked playback/],
  ['NotSupportedError', /recording could not be loaded or played/],
  ['NetworkError', /recording could not be loaded or played/],
]) {
  test(`${name} is surfaced without substituting device speech`, async () => {
    const player = createPlayer({
      play: () => Promise.reject({ name }),
      voices: [{ lang: 'ta-IN' }],
    });
    await player.context.playAudio();
    assert.match(player.audioStatus.textContent, message);
    assert.equal(player.utterances.length, 0);
    assert.equal(player.audios[0].paused, true);
  });
}

test('late CDN media errors clear the playing state and report failure', async () => {
  const player = createPlayer();
  await player.context.playAudio();
  assert.match(player.audioStatus.textContent, /Playing pronunciation/);
  player.audios[0].onerror();
  assert.equal(player.audios[0].paused, true);
  assert.match(player.audioStatus.textContent, /recording could not be loaded or played/);
});

test('replaying cancels previous audio and ignores its stale media events', async () => {
  const player = createPlayer();
  await player.context.playAudio();
  const previous = player.audios[0];
  player.select(3);
  await player.context.playAudio();
  assert.equal(previous.paused, true);
  previous.onerror();
  previous.onended();
  assert.match(player.audioStatus.textContent, /Playing pronunciation/);
  player.audios[1].onended();
  assert.equal(player.audioStatus.textContent, '');
});

test('muting pending CDN playback cancels it without stale errors or further requests', async () => {
  let reject;
  const player = createPlayer({
    play: () => new Promise((_, fail) => { reject = fail; }),
  });
  const pending = player.context.playAudio();
  player.mute();
  reject({ name: 'NetworkError' });
  await pending;
  await player.context.playAudio();
  assert.equal(player.audios[0].paused, true);
  assert.equal(player.audios.length, 1);
  assert.equal(player.utterances.length, 0);
  assert.equal(player.audioStatus.textContent, '');
});
