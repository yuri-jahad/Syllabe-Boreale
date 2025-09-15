import SearchInput from '@features/shared/components/input-search/input-search'
import WordInfosCentral from '@word-finder/components/word-finder-central'
import ListsGallery from '@shared/components/lists-gallery/lists-gallery'
import { useEffect, useCallback, useMemo, memo, useRef } from 'react'
import { useStore } from '@/store/store'
import type { ChangeEvent } from 'react'
import { useFindWords } from '@word-finder/hooks/find-words.hooks'
import HeaderSpecs from '@shared/components/header/header-specs'
import { useDebouncedEffect } from '@shared/hooks/shared-use-debounced-effect'
import { SearchContainerCSS } from '@shared/generic/generic.style'
import { useQueryClient } from '@tanstack/react-query'

export default function WordInfos () {
  const {
    setCurrentPatternWord,
    currentPatternWord,
    currentList,
    setWordsList,
    wordsList
  } = useStore()

  const queryClient = useQueryClient()
  const findWords = useFindWords()

  const lastSearchRef = useRef<string>('')

  useDebouncedEffect(() => {
    if (currentPatternWord && currentList) {
      const searchKey = `${currentPatternWord}-${currentList}`
      const cacheKey = ['findWords', currentPatternWord, currentList]
      const cachedData = queryClient.getQueryData(cacheKey)
      if (cachedData) {
        setWordsList(cachedData as any)
        return
      }

      lastSearchRef.current = searchKey
      findWords.mutate({
        searchParams: {
          pattern: currentPatternWord,
          listname: currentList
        }
      })
    }
  }, [currentPatternWord, currentList])

  const updateWordsList = useCallback(
    (data: any) => {
      setWordsList(data)
    },
    [setWordsList]
  )

  useEffect(() => {
    if (findWords.isSuccess && findWords.data) {
      updateWordsList(findWords.data)
    }
  }, [findWords.isSuccess, findWords.data, updateWordsList])

  useEffect(() => {
    return () => {
      lastSearchRef.current = ''
    }
  }, [currentPatternWord, currentList])

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim()
      if (value.length === 0) {
        setCurrentPatternWord('')
        setWordsList(null)
        lastSearchRef.current = '' // ✅ Reset de la référence
      } else {
        setCurrentPatternWord(value)
      }
    },
    [setCurrentPatternWord, setWordsList]
  )

  const headerStats = useMemo(
    () => ({
      total: wordsList?.total || 0,
      spliced: wordsList?.data?.length || 0
    }),
    [wordsList]
  )

  return (
    <div>
      <div className={SearchContainerCSS}>
        <HeaderSpecs
          total={headerStats.total}
          spliced={headerStats.spliced}
          username='~'
        />

        <SearchInput handleOnChange={handleOnChange} />

        <WordInfosCentral />
        <ListsGallery />
      </div>
    </div>
  )
}
