const test = require('node:test');
const assert = require('node:assert/strict');
const letters = require('../src/letters');

function combine(code, consonant, vowel) {
  const language = letters.languageDetails.findIndex(details => details.code === code);
  const consonantIndex = letters.consonantLangs[language].indexOf(consonant);
  const vowelIndex = letters.vowelLetterLangs[language].indexOf(vowel);
  assert.notEqual(consonantIndex, -1, `${code}: missing ${consonant}`);
  assert.notEqual(vowelIndex, -1, `${code}: missing ${vowel}`);
  return letters.combineLetters(language, consonantIndex, vowelIndex);
}

test('Assamese supports vocalic R, dotted consonants and the traditional conjunct', () => {
  for (const [consonant, vowel, expected] of [
    ['ক', 'ঋ', 'কৃ'],
    ['ক', 'এ', 'কে'],
    ['ড়', 'উ', 'ড়ু'],
    ['ঢ়', 'আ', 'ঢ়া'],
    ['য়', 'ই', 'য়ি'],
    ['ৰ', 'ঋ', 'ৰৃ'],
    ['ৱ', 'ঔ', 'ৱৌ'],
    ['ক্ষ', 'ঈ', 'ক্ষী'],
  ]) {
    assert.equal(combine('as-IN', consonant, vowel), expected);
  }
});

test('all six restored Tibetan letters take each of the four basic vowel signs', () => {
  for (const consonant of ['ཙ', 'ཚ', 'ཛ', 'ཝ', 'ཞ', 'ཟ']) {
    assert.equal(combine('bo-IN', consonant, 'ཨ'), consonant);
    for (const [vowel, sign] of [['ཨི', 'ི'], ['ཨུ', 'ུ'], ['ཨེ', 'ེ'], ['ཨོ', 'ོ']]) {
      assert.equal(combine('bo-IN', consonant, vowel), consonant + sign);
    }
  }
});

test('Odia supports vocalic R, dotted letters, YYA, VA, WA and KSHA', () => {
  for (const [consonant, vowel, expected] of [
    ['କ', 'ଋ', 'କୃ'],
    ['କ', 'ଏ', 'କେ'],
    ['ଡ଼', 'ଉ', 'ଡ଼ୁ'],
    ['ଢ଼', 'ଆ', 'ଢ଼ା'],
    ['ୟ', 'ଇ', 'ୟି'],
    ['ଵ', 'ଓ', 'ଵୋ'],
    ['ୱ', 'ଔ', 'ୱୌ'],
    ['କ୍ଷ', 'ଈ', 'କ୍ଷୀ'],
  ]) {
    assert.equal(combine('or-IN', consonant, vowel), expected);
  }
});

test('Tibetan and Odia nasal/visarga signs are not presented as vowels', () => {
  for (const [code, consonant, vowel, kind, expected] of [
    ['bo-IN', 'ཀ', 'ཨཾ', 'anusvara', 'ཀཾ'],
    ['bo-IN', 'ཀ', 'ཨྃ', 'candrabindu', 'ཀྃ'],
    ['or-IN', 'କ', 'ଅଂ', 'anusvara', 'କଂ'],
    ['or-IN', 'କ', 'ଅଃ', 'visarga', 'କଃ'],
  ]) {
    const language = letters.languageDetails.findIndex(details => details.code === code);
    const vowelIndex = letters.vowelLetterLangs[language].indexOf(vowel);
    assert.equal(letters.getVowelKind(language, vowelIndex), kind);
    assert.equal(combine(code, consonant, vowel), expected);
  }
});
