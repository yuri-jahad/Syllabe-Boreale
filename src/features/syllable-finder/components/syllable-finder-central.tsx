import { useNavigation, useStore, useSyllablesSection } from '@/store/store'
import {
  threeBlocksContainerCSS,
  blockBaseCSS,
  blockHeaderCSS,
  blockTitleCSS,
  blockBadgeCSS,
  blockContentCSS,
  blockScrollAreaCSS,
  listItemCSS,
  listItemActiveCSS,
  emptyStateCSS,
  emptyStateIconCSS,
  emptyStateTitleCSS,
  emptyStateTextCSS,
  loadingStateCSS,
  spinnerCSS,
  definitionHeaderCSS,
  definitionNumberCSS,
  definitionSourceCSS,
  paginationContainerCSS,
  paginationButtonCSS,
  paginationInfoCSS,
  cleanAreaCSS,
  cleanContentCSS,
  sourcesRowCSS,
  miniChipCSS,
  miniChipActiveCSS,
  filterStatusCSS
} from '@features/syllable-finder/components/syllable-find-central.style'
import { useEffect, useState, useMemo, useCallback, memo, useRef } from 'react'
import { useWordsBySyllable } from '../hooks/syllable-finder.hooks'
import { useDefinitionByName } from '@word-finder/hooks/find-words.hooks'
import { highlightSyllable } from '@shared/services/hightlight-syllable.service'
import {
  definitionCardCSS,
  definitionTextCSS
} from '@shared/generic/generic.style'
import { useQueryClient } from '@tanstack/react-query'

const DEFS_PER_PAGE = 5

const BlockSkeleton = memo(({ title, count = '...' }: any) => (
  <div className={blockBaseCSS}>
    <div className={blockHeaderCSS}>
      <div className={blockTitleCSS}>{title}</div>
      <div className={blockBadgeCSS}>{count}</div>
    </div>
    <div className={blockContentCSS}>
      <div style={{ padding: '20px', opacity: 0.5 }}>Loading...</div>
    </div>
  </div>
))

const SyllableItem = memo(({ syllable, isSelected, onSelect, color, currentPattern}: any) => (
  <div
    className={`${listItemCSS} ${isSelected ? listItemActiveCSS : ''}`}
    onClick={() => onSelect(syllable)}
  >
    {highlightSyllable(syllable, currentPattern, color)}
  </div>
))

const WordItem = memo(
  ({ word, syllable, isSelected, onSelect, color }: any) => (
    <div
      className={`${listItemCSS} ${isSelected ? listItemActiveCSS : ''}`}
      onClick={() => onSelect(word)}
    >
      {highlightSyllable(word, syllable, color)}
    </div>
  )
)

const SourceChip = memo(({ name, count, isActive, onToggle }: any) => (
  <div
    onClick={() => onToggle(name)}
    className={`${miniChipCSS} ${isActive ? miniChipActiveCSS : ''}`}
  >
    {name} ({count})
  </div>
))

const EmptyState = memo(({ icon, title, text }: any) => (
  <div className={emptyStateCSS}>
    <div className={emptyStateIconCSS}>{icon}</div>
    <div className={emptyStateTitleCSS}>{title}</div>
    <div className={emptyStateTextCSS}>{text}</div>
  </div>
))

const LoadingState = memo(({ text }: any) => (
  <div className={loadingStateCSS}>
    <div className={spinnerCSS}></div>
    {text}
  </div>
))

const usePagination = (items: any, itemsPerPage: any) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil((items?.length || 0) / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentPageItems =
    items?.slice(startIndex, startIndex + itemsPerPage) || []

  const goToPage = useCallback(
    (page: any) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    },
    [totalPages]
  )

  const nextPage = useCallback(
    () => goToPage(currentPage + 1),
    [currentPage, goToPage]
  )
  const prevPage = useCallback(
    () => goToPage(currentPage - 1),
    [currentPage, goToPage]
  )
  const resetPage = useCallback(() => setCurrentPage(1), [])

  return {
    currentPage,
    currentPageItems,
    totalPages,
    nextPage,
    prevPage,
    resetPage,
    startIndex
  }
}

const useDefinitionFilters = (definitions = []) => {
  const [selectedSources, setSelectedSources] = useState([])

  const availableSources = useMemo(() => {
    if (!definitions.length) return []
    const sourcesMap = new Map()
    definitions.forEach((def: any) => {
      sourcesMap.set(
        def.source_name,
        (sourcesMap.get(def.source_name) || 0) + 1
      )
    })
    return Array.from(sourcesMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  }, [definitions])

  const filteredDefinitions = useMemo(() => {
    return selectedSources.length === 0
      ? definitions
      : //@ts-ignore
        definitions.filter(def => selectedSources.includes(def.source_name))
  }, [definitions, selectedSources])

  const toggleSource = useCallback((sourceName: any) => {
    setSelectedSources((prev: any) =>
      prev.includes(sourceName)
        ? prev.filter((s: any) => s !== sourceName)
        : [...prev, sourceName]
    )
  }, [])

  const resetFilters = useCallback(() => setSelectedSources([]), [])

  return {
    selectedSources,
    availableSources,
    filteredDefinitions,
    toggleSource,
    resetFilters
  }
}

export default function SyllablesInfosBody () {
  const [isInitialized, setIsInitialized] = useState(false)
  const queryClient = useQueryClient()
  const lastWordSearchRef = useRef<string>('')

  const {
    syllablesList,
    syllableSelected,
    syllableWordsList,
    syllableWordSelected,
    syllableWordDefinitions,
    setSyllableSelected,
    setSyllableWordsList,
    setSyllableWordSelected,
    setSyllableWordDefinitions
  } = useSyllablesSection()

  const wordsBySyllableMutation = useWordsBySyllable()
  const definitionMutation = useDefinitionByName(syllableWordSelected)

  const {
    selectedSources,
    availableSources,
    filteredDefinitions,
    toggleSource,
    resetFilters
  } = useDefinitionFilters(syllableWordDefinitions?.definitions)
  const { syllableColor } = useStore()
  const { currentPatternSyllable } = useNavigation()

  const {
    currentPage,
    currentPageItems: currentPageDefs,
    totalPages,
    nextPage,
    prevPage,
    resetPage,
    startIndex
  } = usePagination(filteredDefinitions, DEFS_PER_PAGE)

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialized(true), 16)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (syllableSelected && !syllableWordsList?.data?.length) {
      const searchKey = `${syllableSelected}-word`

      if (lastWordSearchRef.current === searchKey) {
        return
      }

      const cacheKey = ['wordsBySyllable', syllableSelected, 'word']
      const cachedData = queryClient.getQueryData(cacheKey)

      if (cachedData) {
        //@ts-ignore

        setSyllableWordsList(cachedData)
        console.log('📦 Words by syllable retrieved from cache')
        return
      }

      lastWordSearchRef.current = searchKey
      wordsBySyllableMutation.mutate({
        syllable: syllableSelected,
        listname: 'word'
      })
    }
  }, [
    syllableSelected,
    syllableWordsList,
    queryClient,
    setSyllableWordsList,
    wordsBySyllableMutation
  ])

  useEffect(() => {
    if (wordsBySyllableMutation.isSuccess && wordsBySyllableMutation.data) {
      setSyllableWordsList(wordsBySyllableMutation.data)
    }
  }, [
    wordsBySyllableMutation.isSuccess,
    wordsBySyllableMutation.data,
    setSyllableWordsList
  ])

  useEffect(() => {
    if (definitionMutation.isSuccess && definitionMutation.data) {
      setSyllableWordDefinitions(definitionMutation.data)
    }
  }, [
    definitionMutation.isSuccess,
    definitionMutation.data,
    setSyllableWordDefinitions
  ])

  useEffect(() => {
    if (syllableWordSelected) {
      resetPage()
      resetFilters()
    }
  }, [syllableWordSelected, resetPage, resetFilters])

  useEffect(() => resetPage(), [selectedSources, resetPage])

  const handleSyllableSelect = useCallback(
    (syllable: any) => {
      setSyllableSelected(syllable)
      setSyllableWordSelected('')
      setSyllableWordDefinitions(null)
      resetPage()
      resetFilters()

      const searchKey = `${syllable}-word`

      if (lastWordSearchRef.current === searchKey) {
        return
      }

      const cacheKey = ['wordsBySyllable', syllable, 'word']
      const cachedData = queryClient.getQueryData(cacheKey)

      if (cachedData) {
        //@ts-ignore

        setSyllableWordsList(cachedData)
        console.log('📦 Words by syllable retrieved from cache')
        return
      }

      lastWordSearchRef.current = searchKey
      wordsBySyllableMutation.mutate({ syllable, listname: 'word' })
    },
    [
      setSyllableSelected,
      setSyllableWordSelected,
      setSyllableWordDefinitions,
      resetPage,
      resetFilters,
      queryClient,
      setSyllableWordsList,
      wordsBySyllableMutation
    ]
  )

  const handleWordSelect = useCallback(
    (word: any) => {
      setSyllableWordSelected(word)
    },
    [setSyllableWordSelected]
  )

  useEffect(() => {
    return () => {
      lastWordSearchRef.current = ''
    }
  }, [syllableSelected])

  if (!isInitialized) {
    return (
      <div className={threeBlocksContainerCSS}>
        <BlockSkeleton title='Syllables' />
        <BlockSkeleton title='Words' />
        <BlockSkeleton title='Definitions' />
      </div>
    )
  }

  const PaginationComponent =
    totalPages > 1 ? (
      <div className={paginationContainerCSS}>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={paginationButtonCSS}
        >
          ←
        </button>
        <div className={paginationInfoCSS}>
          {currentPage} / {totalPages}
        </div>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={paginationButtonCSS}
        >
          →
        </button>
      </div>
    ) : null

  return (
    <div className={threeBlocksContainerCSS}>
      <div className={blockBaseCSS}>
        <div className={blockHeaderCSS}>
          <div className={blockTitleCSS}>Syllables</div>
          <div className={blockBadgeCSS}>
            {syllablesList?.data?.length || 0}
          </div>
        </div>
        <div className={blockContentCSS}>
          {!syllablesList?.data?.length ? (
            <EmptyState
              icon='📝'
              title='No syllables'
              text='Search for words to see syllables'
            />
          ) : (
            <div className={blockScrollAreaCSS}>
              {syllablesList.data.map(syllable => (
                <SyllableItem
                  key={syllable}
                  currentPattern={currentPatternSyllable}
                  syllable={syllable}
                  color={syllableColor}
                  isSelected={syllableSelected === syllable}
                  onSelect={handleSyllableSelect}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={blockBaseCSS}>
        <div className={blockHeaderCSS}>
          <div className={blockTitleCSS}>Words</div>
          <div className={blockBadgeCSS}>
            {syllableWordsList?.data?.length || 0}
          </div>
        </div>
        <div className={blockContentCSS}>
          {!syllableSelected ? (
            <EmptyState
              icon='←'
              title='Select a syllable'
              text='Click on a syllable to see matching words'
            />
          ) : wordsBySyllableMutation.isPending ? (
            <LoadingState text='Loading words...' />
          ) : !syllableWordsList?.data?.length ? (
            <EmptyState
              icon='🔍'
              title='No words found'
              text={`No words containing the syllable "${syllableSelected}"`}
            />
          ) : (
            <div className={blockScrollAreaCSS}>
              {syllableWordsList.data.map(word => (
                <WordItem
                  key={word}
                  word={word}
                  color={syllableColor}
                  syllable={syllableSelected}
                  isSelected={syllableWordSelected === word}
                  onSelect={handleWordSelect}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={blockBaseCSS}>
        <div className={blockHeaderCSS}>
          <div className={blockTitleCSS}>Definitions</div>
          <div className={blockBadgeCSS}>
            {filteredDefinitions.length || 0}
            {selectedSources.length > 0 &&
              syllableWordDefinitions?.definitions &&
              ` / ${syllableWordDefinitions.definitions.length}`}
          </div>
        </div>
        <div className={blockContentCSS}>
          {!syllableWordSelected ? (
            <EmptyState
              icon='←'
              title='Select a word'
              text='Click on a word to see its definitions'
            />
          ) : definitionMutation.isPending ? (
            <LoadingState text='Loading definitions...' />
          ) : !syllableWordDefinitions?.definitions?.length ? (
            <EmptyState
              icon='📚'
              title='No definitions'
              text={`No definitions found for "${syllableWordSelected}"`}
            />
          ) : (
            <div className={cleanAreaCSS}>
              {availableSources.length > 1 && (
                <div className={sourcesRowCSS}>
                  {availableSources.map(({ name, count }: any) => (
                    <SourceChip
                      key={name}
                      name={name}
                      count={count}
                      //@ts-ignore

                      isActive={selectedSources.includes(name)}
                      onToggle={toggleSource}
                    />
                  ))}
                </div>
              )}

              {selectedSources.length > 0 && (
                <div className={filterStatusCSS}>
                  {filteredDefinitions.length} out of{' '}
                  {syllableWordDefinitions.definitions_count}
                </div>
              )}

              {filteredDefinitions.length === 0 ? (
                <EmptyState
                  icon='🔍'
                  title='No definitions'
                  text='No definitions for the selected sources'
                />
              ) : (
                <div className={cleanContentCSS}>
                  {currentPageDefs.map((definition: any, index: any) => (
                    <div key={definition.id} className={definitionCardCSS}>
                      <div className={definitionHeaderCSS}>
                        <div className={definitionNumberCSS}>
                          {startIndex + index + 1}
                        </div>
                        <div className={definitionSourceCSS}>
                          {definition.source_name}
                        </div>
                      </div>
                      <div className={definitionTextCSS}>
                        {definition.definition}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {PaginationComponent}
        </div>
      </div>
    </div>
  )
}