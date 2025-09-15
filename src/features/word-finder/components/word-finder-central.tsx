import { useStore } from '@/store/store'
import BearSVG from '@features/shared/icons/bear'
import {
  emptyStateCSS,
  moreIndicatorCSS,
  contentAreaCSS,
  WordCSS,
  SquareCSS,
  SquareTitleCSS,
  SquareLeftCSS,
  SquareRightCSS,
  bearContainerCSS,
  badgeCSS,
  selectedWordCSS,
  loadingDefCSS,
  errorDefCSS,
  paginationContainerCSS,
  paginationButtonCSS,
  paginationInfoCSS,
  cleanAreaCSS,
  cleanContentCSS,
  sourcesRowCSS,
  miniChipCSS,
  miniChipActiveCSS,
  filterStatusCSS,
  definitionNumberCSS,
  definitionSourceCSS
} from '@word-finder/components/word-finder-central.style'
import {
  definitionCardCSS,
  compactMetaCSS,
  SquareParentCSS
} from '@shared/generic/generic.style'

import { useEffect, useState, useMemo, useCallback, memo } from 'react'
import { useDefinitionByName } from '../hooks/find-words.hooks'
import { definitionTextCSS } from '@shared/generic/generic.style';
import { SyllableHighlight } from '@/features/shared/components/syllable-hightlight/syllable-hightlight'
import { highlightSyllable } from '@/features/shared/services/hightlight-syllable.service'

const DEFS_PER_PAGE = 10
const WordItem = memo(
  ({
    mot,
    isSelected,
    onSelect,
    currentPatternWord
  }: {
    mot: string
    isSelected: boolean
    onSelect: (mot: string) => void
    currentPatternWord: string
  }) => {
    const { syllableColor } = useStore()

    return (
      <div
        onClick={() => onSelect(mot)}
        className={`${WordCSS} ${isSelected ? selectedWordCSS : ''}`}
      >
        {highlightSyllable(mot, currentPatternWord, syllableColor)}
      </div>
    )
  }
)

const DefinitionItem = memo(
  ({
    definition,
    index,
    startIndex
  }: {
    definition: any
    index: number
    startIndex: number
  }) => (
    <div className={definitionCardCSS}>
      <div className={definitionNumberCSS}>{startIndex + index + 1}</div>
      <div style={{ flex: 1 }}>
        <div className={definitionSourceCSS}>{definition.source_name}</div>
        <div className={definitionTextCSS}>{definition.definition}</div>
      </div>
    </div>
  )
)

const SourceChip = memo(
  ({
    name,
    count,
    isActive,
    onToggle
  }: {
    name: string
    count: number
    isActive: boolean
    onToggle: (name: string) => void
  }) => (
    <div
      onClick={() => onToggle(name)}
      className={`${miniChipCSS} ${isActive ? miniChipActiveCSS : ''}`}
    >
      {name} ({count})
    </div>
  )
)

export default function WordInfosBody () {
  const {
    wordsList,
    currentPatternWord,
    setWordSelected,
    wordSelected,
    setWordDefinitions
  } = useStore()

  const [currentDefPage, setCurrentDefPage] = useState(1)
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [bearDirection, setBearDirection] = useState<
    'center' | 'left' | 'right'
  >('center')

  const {
    data: wordDefinitions,
    error: defError,
    isLoading: isLoadingDef
  } = useDefinitionByName(wordSelected || '')

  const { availableSources, filteredDefinitions } = useMemo(() => {
    if (!wordDefinitions?.definitions) {
      return { availableSources: [], filteredDefinitions: [] }
    }

    const sourcesMap = new Map<string, number>()
    wordDefinitions.definitions.forEach(def => {
      sourcesMap.set(
        def.source_name,
        (sourcesMap.get(def.source_name) || 0) + 1
      )
    })

    const sources = Array.from(sourcesMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)

    const filtered =
      selectedSources.length === 0
        ? wordDefinitions.definitions
        : wordDefinitions.definitions.filter(def =>
            selectedSources.includes(def.source_name)
          )

    return { availableSources: sources, filteredDefinitions: filtered }
  }, [wordDefinitions?.definitions, selectedSources])

  const paginationData = useMemo(() => {
    const totalDefs = filteredDefinitions.length
    const totalPages = Math.ceil(totalDefs / DEFS_PER_PAGE)
    return { totalDefs, totalPages }
  }, [filteredDefinitions.length])

  const currentPageDefs = useMemo(() => {
    const startIndex = (currentDefPage - 1) * DEFS_PER_PAGE
    return filteredDefinitions.slice(startIndex, startIndex + DEFS_PER_PAGE)
  }, [filteredDefinitions, currentDefPage])

  const formattedTitle = useMemo(() => {
    if (!currentPatternWord) return 'Available words'
    if (!wordsList?.total) return `No words for ${currentPatternWord}`

    const { data, total } = wordsList
    const displayedCount = data?.length || 0

    return displayedCount === total
      ? `${total} word${total > 1 ? 's' : ''} with "${currentPatternWord}"`
      : `${displayedCount} out of ${total} words with "${currentPatternWord}"`
  }, [currentPatternWord, wordsList])

  useEffect(() => {
    if (wordSelected) {
      setCurrentDefPage(1)
      setSelectedSources([])
    }
  }, [wordSelected])

  useEffect(() => {
    if (wordDefinitions && wordSelected) {
      setWordDefinitions(wordDefinitions)
    }
  }, [wordDefinitions, wordSelected, setWordDefinitions])

  useEffect(() => {
    setBearDirection(currentPatternWord?.length > 0 ? 'left' : 'center')
  }, [currentPatternWord])

  const handleWordSelect = useCallback(
    (mot: string) => {
      setWordSelected(mot)
      setBearDirection('right')
    },
    [setWordSelected]
  )

  const handleSourceToggle = useCallback((sourceName: string) => {
    setSelectedSources(prev => {
      const newSources = prev.includes(sourceName)
        ? prev.filter(s => s !== sourceName)
        : [...prev, sourceName]
      setCurrentDefPage(1)
      return newSources
    })
  }, [])

  const handlePrevPage = useCallback(() => {
    setCurrentDefPage(prev => Math.max(1, prev - 1))
  }, [])

  const handleNextPage = useCallback(() => {
    setCurrentDefPage(prev =>
      Math.min(paginationData.totalPages || 1, prev + 1)
    )
  }, [paginationData.totalPages])

  const WordsContent = useMemo(() => {
    if (!currentPatternWord) {
      return (
        <div className={emptyStateCSS}>
          Type a syllable to search for words
        </div>
      )
    }

    if (!wordsList?.data?.length) {
      return (
        <div className={emptyStateCSS}>
          No words found with "{currentPatternWord}"
        </div>
      )
    }

    return (
      <div className={contentAreaCSS}>
        {wordsList.data.map((mot, index) => (
          <WordItem
            key={`${mot}-${index}`}
            mot={mot}
            isSelected={wordSelected === mot}
            onSelect={handleWordSelect}
            currentPatternWord={currentPatternWord || ''}
          />
        ))}

        {wordsList.hasMore > 0 && (
          <div className={moreIndicatorCSS}>
            ... and {wordsList.total - wordsList.data.length} other words
          </div>
        )}
      </div>
    )
  }, [currentPatternWord, wordsList, wordSelected, handleWordSelect])

  const Pagination = useMemo(() => {
    if (paginationData.totalPages <= 1) return null

    return (
      <div className={paginationContainerCSS}>
        <button
          onClick={handlePrevPage}
          disabled={currentDefPage === 1}
          className={paginationButtonCSS}
        >
          ←
        </button>
        <div className={paginationInfoCSS}>
          {currentDefPage} / {paginationData.totalPages}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentDefPage === paginationData.totalPages}
          className={paginationButtonCSS}
        >
          →
        </button>
      </div>
    )
  }, [
    paginationData.totalPages,
    currentDefPage,
    handlePrevPage,
    handleNextPage
  ])

  const DefinitionsContent = useMemo(() => {
    if (!wordSelected) {
      return (
        <div className={emptyStateCSS}>
          Select a word to see its definitions
        </div>
      )
    }

    if (isLoadingDef) {
      return (
        <div className={loadingDefCSS}>
          <div className='spinner'></div>
          Loading...
        </div>
      )
    }

    if (defError) {
      return (
        <div className={errorDefCSS}>⚠️ {defError.message || 'Error'}</div>
      )
    }

    if (!wordDefinitions?.definitions?.length) {
      return (
        <div className={emptyStateCSS}>
          No definitions for "{wordSelected}"
        </div>
      )
    }

    if (filteredDefinitions.length === 0) {
      return (
        <div className={emptyStateCSS}>
          No definitions for the selected sources
        </div>
      )
    }

    const startIndex = (currentDefPage - 1) * DEFS_PER_PAGE

    return (
      <div className={cleanAreaCSS}>
        {wordDefinitions.word_details && (
          <div className={compactMetaCSS}>
            {wordDefinitions.definitions_count} definition{wordDefinitions.definitions_count > 1 ? 's' : ''}
          </div>
        )}

        {availableSources.length > 1 && (
          <div className={sourcesRowCSS}>
            {availableSources.map(({ name, count }) => (
              <SourceChip
                key={name}
                name={name}
                count={count}
                isActive={selectedSources.includes(name)}
                onToggle={handleSourceToggle}
              />
            ))}
          </div>
        )}

        {selectedSources.length > 0 && (
          <div className={filterStatusCSS}>
            {filteredDefinitions.length} out of {wordDefinitions.definitions_count}
          </div>
        )}

        <div className={cleanContentCSS}>
          {currentPageDefs.map((def, index) => (
            <DefinitionItem
              key={def.id}
              definition={def}
              index={index}
              startIndex={startIndex}
            />
          ))}
        </div>

        {Pagination}
      </div>
    )
  }, [
    wordSelected,
    isLoadingDef,
    defError,
    wordDefinitions,
    filteredDefinitions,
    currentPageDefs,
    currentDefPage,
    availableSources,
    selectedSources,
    handleSourceToggle,
    Pagination
  ])

  return (
    <div className={SquareParentCSS}>
      <div className={`${SquareCSS} ${SquareLeftCSS}`}>
        <div className={SquareTitleCSS}>
          {formattedTitle}
          {(wordsList?.hasMore || '') && (
            <span className={badgeCSS}>(+{wordsList?.hasMore})</span>
          )}
        </div>
        {WordsContent}
      </div>

      <div className={bearContainerCSS}>
        <BearSVG height={80} width={200} direction={bearDirection} />
      </div>

      <div className={`${SquareCSS} ${SquareRightCSS}`}>
        <div className={SquareTitleCSS}>
          Definitions
          {wordSelected && <span className={badgeCSS}>"{wordSelected}"</span>}
        </div>
        {DefinitionsContent}
      </div>
    </div>
  )
}