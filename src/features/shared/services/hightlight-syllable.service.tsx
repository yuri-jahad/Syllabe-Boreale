import { highlightedSyllableCSS } from '@shared/generic/generic.style'

export const highlightSyllable = (word: string, syllable: string) => {
  if (!syllable) return word

  const regex = new RegExp(`(${syllable})`, 'gi')
  const parts = word.split(regex)

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className={highlightedSyllableCSS}>
        {part}
      </span>
    ) : (
      part
    )
  )
}
