import SearchInput from '@features/shared/components/input-search/input-search'
import WordInfosCentral from '@word-finder/components/word-finder-central'
import { WordInfosCSS } from '@word-finder/components/word-finder.style'
import ListsGallery from '@shared/components/lists-gallery/lists-gallery'
import PanelInfos from '@shared/components/panel-infos/panel-infos'
import { useEffect } from 'react'
import { useStore } from '@/store/store'
import type { ChangeEvent } from 'react'
import { useFindWords } from '../hooks/find-words.hooks'
import HeaderSpecs from '@/features/shared/components/header/header-specs'

export default function WordInfos () {
  const {
    setCurrentPatternWord,
    currentPatternWord,
    currentList,
    setWordsList,
    wordsList
  } = useStore()

  const findWords = useFindWords()

  useEffect(() => {
    if (currentPatternWord && currentList) {
      findWords.mutate({
        searchParams: {
          pattern: currentPatternWord ,
          listname: currentList
        }
      })
    }
  }, [currentPatternWord, currentList])

  useEffect(() => {
    if (findWords.isSuccess && findWords.data) {
      setWordsList(findWords.data)
    }
  }, [findWords.isSuccess, findWords.data, setWordsList])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCurrentPatternWord(value)

    if (value.length === 0) {
      setWordsList(null)
    }
  }

  return (
    <div style={{ width: '90vw', height: '88vh' }}>
      <div className={WordInfosCSS}>
        <HeaderSpecs
          total={wordsList?.total || 0}
          spliced={wordsList?.data.length || 0}
          username='~'
        />
        <SearchInput handleOnChange={handleOnChange} />
        {findWords.isError && (
          <div
            style={{
              color: 'rgba(255, 100, 100, 0.8)',
              padding: '10px',
              textAlign: 'center'
            }}
          >
            ❌ Erreur: {findWords.error?.message}
          </div>
        )}

        {!currentList && (
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              padding: '10px',
              textAlign: 'center'
            }}
          >
            ⚠️ Sélectionnez une liste pour commencer
          </div>
        )}

        <WordInfosCentral />
        <ListsGallery />
      </div>
      <PanelInfos />
    </div>
  )
}
