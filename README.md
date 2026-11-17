# IndianLetters
Learning Indian Letters of 20 Languages

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

Four additional languages are available: **Assamese, Tibetan, Marathi and
Odia**. Their stable link IDs are `16` through `19`, respectively (for example,
`index.html?l=18` opens Marathi). Script fonts are bundled locally. They are
added alongside the earlier 16-language set, and Marathi reuses the matching
Hindi audio archive for shared consonant and vowel combinations. Marathi
includes its additional consonants ळ, क्ष and ज्ञ, and vowels ॲ and ऑ.

## Alphabet verification

All 20 lesson inventories were checked against
[Unicode CLDR character exemplars](https://github.com/unicode-org/cldr/tree/main/common/main)
and [Unicode's Indic-script descriptions](https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-12/),
with [Richard Ishida's orthography notes](https://r12a.github.io/scripts/)
for script-specific composition. CLDR lists characters used in a language,
not a prescribed school alphabet; Javanese's default CLDR repertoire is Latin,
so its hanacaraka lesson was checked against the
[Javanese orthography notes](https://r12a.github.io/scripts/java/jv).

These are **consonant-vowel exercises, not exhaustive alphabet charts**.
Counts below describe selectable lesson entries, not universally agreed
alphabet sizes. Conjuncts, historical letters and Sanskrit extensions are
identified rather than counted as ordinary modern letters. A selectable
combination demonstrates writing; it is not necessarily a word or a common
syllable, and device/Hindi-shared pronunciation is not a native-speaker review.

| Language | Consonant entries | Vowel choices and scope |
| --- | --- | --- |
| Tamil | 18 core | 12 vowels; aytham and Grantha extensions excluded |
| Telugu | 35 letters + క్ష | 14 vowels including rare ౠ, plus 2 signs; ఌ/ౡ excluded |
| Kannada | 34 core | 13 vowels + 2 signs; rare Sanskrit vocalics and historical consonants excluded |
| Bengali | 35 including 3 dotted letters | 11 vowels + 3 Sanskrit-only vowels; ৎ and nasal/visarga signs excluded |
| Hindi | 33 core + 7 nukta letters | 11 traditional vowels + 2 signs; borrowed vowels, rare Sanskrit vowels and candrabindu excluded |
| Punjabi (Gurmukhi) | 32 core + 6 dotted extensions | 10 vowel forms; carriers represented through these forms; tippi/bindi and addak excluded |
| Malayalam | 36 core + scholarly ഩ + റ്റ | 16 vowels including 3 rare vocalics, plus 2 signs; chillus excluded |
| Gujarati | 34 core | 16 vowels including 3 rare vocalics, plus 3 signs |
| Thai | 44 traditional, including obsolete ฃ/ฅ | 14 common patterns only; not the complete vowel system |
| Sinhala | 41 mixed/traditional letters | 18 vowels including 4 vocalics, plus 2 signs |
| Nepali | 33 core + क्ष/त्र/ज्ञ | 11 traditional vowels + 2 signs; extended letters and candrabindu excluded |
| Burmese | 33 traditional | 9 basic patterns only; independent vowels, medials, tones and stacked forms excluded |
| Lao | 26 core + loanword ຣ | 13 common patterns only; tones and other vowel patterns excluded |
| Javanese | 20 hanacaraka | 6 basic patterns; ra/la + pepet use ꦉ/ꦊ; pasangan/murda excluded |
| Amharic | 34 fidel series | 7 orders per series (238 syllables); labialized and other additional forms excluded |
| Khmer | 33 modern | 16 dependent-vowel patterns only; independent vowels and extra vowel/coda signs excluded |
| Assamese | 36 letters + ক্ষ | 11 vowels including ঋ; vowel-less ৎ, nasal/visarga signs and rare Sanskrit vowels excluded |
| Tibetan | 30 basic letters | Inherent a + 4 vowel signs, plus 2 Sanskrit nasal signs; stacks and extended Sanskrit letters excluded |
| Marathi | 34 letters + क्ष/ज्ञ | 13 vowels including ऋ/ॲ/ऑ, plus 2 signs; rare Sanskrit vocalics excluded |
| Odia | 36 basic + ଵ/ୱ + କ୍ଷ | 11 vowels including ଋ, plus 2 signs; rare Sanskrit vocalics and candrabindu excluded |

The audit restored missing Assamese ঋ/ড়/ঢ়/য়/ক্ষ, Tibetan
ཙ/ཚ/ཛ/ཝ/ཞ/ཟ, Marathi ऋ and Odia ଋ/ଡ଼/ଢ଼/ୟ/ଵ/ୱ/କ୍ଷ.
Tibetan nasal signs and Odia anusvara/visarga are classified as signs, not
vowels. See the [Tibetan](https://r12a.github.io/scripts/tibt/bo) and
[Odia](https://r12a.github.io/scripts/orya/or) references and CLDR's
[Assamese](https://github.com/unicode-org/cldr/blob/main/common/main/as.xml)
and [Marathi](https://github.com/unicode-org/cldr/blob/main/common/main/mr.xml)
repertoires. Tibetan and Odia now have their own bundled Noto fonts instead
of being assigned Devanagari and Bengali fonts.

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
Canonical Unicode equivalents are matched, but different consonants are never
substituted. Nepali and Marathi may reuse a Hindi recording for the same consonant and
vowel when no native recording for the selected language exists.

The 5,149 archive files were WAV audio incorrectly named `.mp3`, which failed in
the integrated browser. They are now real MP3 files with their original filenames.
Playback/decoding errors are reported as recording errors, not mistaken for
unavailable device voices.

The manifest maps 4,547 current selections. All selections in Tamil, Telugu,
Kannada, Bengali, Punjabi, Malayalam, Gujarati and Thai have recordings. Hindi
has recordings for its original 33 consonants (429 combinations); its seven newly
added nukta letters have no files in this archive. Nepali reuses those 429 Hindi
recordings for its 33 shared consonants and 13 vowel/sign choices, bringing
recorded playback coverage to 4,976 selections before Marathi sharing. Marathi
adds another 429 matching Hindi selections, including its restored ऋ vowel,
for 5,405 selections with recorded playback in total. The UI identifies this as Hindi
audio; it is an approximation, since Nepali and Marathi pronunciation can differ. Matching
uses letter identities, not array positions, and native recordings take
priority if added later.

Nepali's three conjuncts (KSHA, TRA and JNYA; 39 combinations) have no matching
Hindi recordings. They use a Nepali device voice, never a Hindi voice or an
unrelated Hindi letter. Sinhala, Burmese, Lao, Javanese, Amharic, Khmer, Assamese,
Tibetan and Odia also have no archive recordings. Marathi's ळ/क्ष/ज्ञ and
ॲ/ऑ selections have no matching Hindi recording. Combinations without a recording use a
matching-language device voice, with a clear message if none is available.
Additional archive recordings for letters/signs excluded from this exercise
are retained.

## Tests

Run the focused playback tests with Node.js 18 or later; no dependencies are
required:

```bash
node --test tests/*.test.js
```

These tests check restored alphabet entries and their vowel-sign combinations,
nasal-sign classification, CDN URLs for every mapped selection, Nepali/Marathi-to-Hindi fallback,
native-recording priority, legacy filename handling, missing-recording device
voices, playback failures, and cancellation. They mock
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
