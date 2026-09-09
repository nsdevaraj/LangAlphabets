# IndianLetters
Learning Indian Letters of 16 Languages

## Play and learn

Open `index.html` in a modern browser. No build or server is needed.

1. Choose a language and a consonant.
2. Spin or drag the wheel, or select a vowel directly. All letter buttons
   and the spin control also work with the keyboard.
3. Read the combination and use **Listen again** to repeat its pronunciation.
   **Sound on/off** controls pronunciation without affecting letter selection.

Use **Dark theme** in the header to switch between light and dark appearances.
The initial theme follows your system setting; an explicit choice is saved
on this browser and restored before the page renders. Switching themes does
not reset the selected language, letters, audio setting, or wheel animation.
If browser privacy settings block storage, switching still works for the
current page, but the preference cannot be saved.

The layout adapts to phones and desktop screens without resetting your selection
on resize. Reduced-motion preferences skip the spinning animation. A language
can be linked directly, for example `index.html?l=3` for Bengali or `?l=6` for
Malayalam.

Six additional languages are available: **Nepali, Burmese, Lao, Javanese,
Amharic and Khmer**. Their stable link IDs are `10` through `15`, respectively
(for example, `index.html?l=14` opens Amharic). Script fonts are bundled locally.
Amharic selects precomposed syllable orders; the other additions use explicit
vowel signs or patterns, including Burmese and Javanese spelling exceptions.

Script-specific [Noto fonts](https://fonts.google.com/noto) are bundled locally
in `fonts/` so letters do not depend on installed system fonts or a CDN.
Each font's SIL Open Font License is included alongside it. The wheel uses
native SVG and does not require a third-party canvas library.

## Audio via jsDelivr

Recordings are served from the public
[IndianLetters repository](https://github.com/nsdevaraj/IndianLetters) through
jsDelivr. LangAlphabets does not need a local `audio/` directory or a separate
audio upload: jsDelivr serves files already published on GitHub. Recorded
pronunciation requires an internet connection, including when opening
`index.html` directly from disk.

The base URL in `src/casino.js` is pinned to the published commit that matches
the checked-in `src/audio-manifest.js`:

```text
https://cdn.jsdelivr.net/gh/nsdevaraj/IndianLetters@419d457f7c14afd4345815694a861a6fddfcaa0d/audio/
```

Language folder names and filenames are URL-encoded separately so spaces and
native-script characters reach the correct CDN paths.

Pronunciation looks up actual archive filenames in a generated recording
manifest, using the consonant and vowel identities rather than reconstructing
the result portion of a legacy filename. This covers older Kannada vowel-sign
labels and Thai vowel-component spellings without changing the written result.
Canonical Unicode equivalents are matched, but different consonants or languages
are never substituted.

The 5,149 archive files were WAV audio incorrectly named `.mp3`, which failed in
the integrated browser. They are now real MP3 files with their original filenames.
Playback/decoding errors are reported as recording errors, not mistaken for
unavailable device voices.

The manifest maps 4,547 current selections. All selections in Tamil, Telugu,
Kannada, Bengali, Punjabi, Malayalam, Gujarati and Thai have recordings. Hindi
has recordings for its original 33 consonants (429 combinations); its seven newly
added nukta letters have no files in this archive. Sinhala and the six newly
added languages have no archive recordings. Only these genuinely absent combinations use a matching-language
device voice, with a clear message if none is available. Additional archive
recordings for letters/signs excluded from this exercise are retained.

## Audio tests

Run the focused playback tests with Node.js 18 or later; no dependencies are
required:

```bash
node --test tests/audio.test.js
```

These tests check CDN URLs for every mapped selection, legacy filename handling,
missing-recording device voices, playback failures, and cancellation. They mock
playback and do not need network access. For a live check, open `index.html`,
select a letter and choose **Listen again**; the browser's Network panel should
show an `audio/mpeg` response from `cdn.jsdelivr.net`.

## Updating recordings

Generate or normalize recordings in the
[IndianLetters source repository](https://github.com/nsdevaraj/IndianLetters#recording-manifest),
which owns the audio files, generation tools, and full asset-validation suite.
In that repository, rebuild and validate the manifest after changing audio:

```bash
npm run audio:map
npm run audio:check
```

Publish the recordings and manifest to GitHub, then copy that revision's
`src/audio-manifest.js` into LangAlphabets and update `audioBaseUrl` in
`src/casino.js` to the same commit SHA. Keep its language ordering and recording
keys compatible with `src/letters.js`. Run the audio tests and verify a CDN
recording before deploying. Pinning a new commit avoids stale branch-cache
responses; no jsDelivr account or upload step is required.
