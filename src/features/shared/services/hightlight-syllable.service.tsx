import { SyllableHighlight } from '../components/syllable-hightlight/syllable-hightlight'

export const highlightSyllable = (word: string, syllable: string, color:string) => {
  if (!syllable) return word

  const regex = new RegExp(`(${syllable})`, 'gi')
  const parts = word.split(regex)

  return parts.map((part, index) =>
    regex.test(part) ? (
     <SyllableHighlight children={part} color={color} key={index}/>
    ) : (
      part
    )
  )
}
