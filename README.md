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

Pronunciation looks up actual bundled filenames in a generated recording
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
added languages have no bundled recordings. Only these genuinely absent combinations use a matching-language
device voice, with a clear message if none is available. Additional archive
recordings for letters/signs excluded from this exercise are retained.

