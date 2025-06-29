import { useSyllablesSection } from '@/store/store'
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
import { useEffect, useState, useMemo, useCallback, memo } from 'react'
import { useWordsBySyllable } from '../hooks/syllable-finder.hooks'
import { useDefinitionByName } from '@word-finder/hooks/find-words.hooks'
import {
  definitionCardCSS,
  definitionTextCSS
} from '@shared/generic/generic.style'
import { highlightSyllable } from '@shared/services/hightlight-syllable.service'

const DEFS_PER_PAGE = 5

// ============================================================================
// COMPOSANTS MEMOISES
// ============================================================================

const SyllableItem = memo(
  ({
    syllable,
    isSelected,
    onSelect
  }: {
    syllable: string
    isSelected: boolean
    onSelect: (syllable: string) => void
  }) => (
    <div
      className={`${listItemCSS} ${isSelected ? listItemActiveCSS : ''}`}
      onClick={() => onSelect(syllable)}
    >
      {syllable}
    </div>
  )
)

const WordItem = memo(
  ({
    word,
    syllable,
    isSelected,
    onSelect
  }: {
    word: string
    syllable: string
    isSelected: boolean
    onSelect: (word: string) => void
  }) => (
    <div
      className={`${listItemCSS} ${isSelected ? listItemActiveCSS : ''}`}
      onClick={() => onSelect(word)}
    >
      {highlightSyllable(word, syllable)}
    </div>
  )
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
      <div className={definitionHeaderCSS}>
        <div className={definitionNumberCSS}>{startIndex + index + 1}</div>
        <div className={definitionSourceCSS}>{definition.source_name}</div>
      </div>
      <div className={definitionTextCSS}>{definition.definition}</div>
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

const EmptyState = memo(
  ({ icon, title, text }: { icon: string; title: string; text: string }) => (
    <div className={emptyStateCSS}>
      <div className={emptyStateIconCSS}>{icon}</div>
      <div className={emptyStateTitleCSS}>{title}</div>
      <div className={emptyStateTextCSS}>{text}</div>
    </div>
  )
)

const LoadingState = memo(({ text }: { text: string }) => (
  <div className={loadingStateCSS}>
    <div className={spinnerCSS}></div>
    {text}
  </div>
))

// ============================================================================
// HOOK PERSONNALISE POUR LA LOGIQUE DE PAGINATION
// ============================================================================

const usePagination = (items: any[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1)

  const paginationData = useMemo(() => {
    const totalItems = items.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    return { totalItems, totalPages }
  }, [items.length, itemsPerPage])

  const currentPageItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return items.slice(startIndex, startIndex + itemsPerPage)
  }, [items, currentPage, itemsPerPage])

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, paginationData.totalPages)))
    },
    [paginationData.totalPages]
  )

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1)
  }, [currentPage, goToPage])

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1)
  }, [currentPage, goToPage])

  const resetPage = useCallback(() => {
    setCurrentPage(1)
  }, [])

  return {
    currentPage,
    currentPageItems,
    paginationData,
    nextPage,
    prevPage,
    resetPage,
    startIndex: (currentPage - 1) * itemsPerPage
  }
}

// ============================================================================
// HOOK PERSONNALISE POUR LA LOGIQUE DES FILTRES
// ============================================================================

const useDefinitionFilters = (definitions: any[] = []) => {
  const [selectedSources, setSelectedSources] = useState<string[]>([])

  const { availableSources, filteredDefinitions } = useMemo(() => {
    if (!definitions.length) {
      return { availableSources: [], filteredDefinitions: [] }
    }

    // Calcul des sources disponibles
    const sourcesMap = new Map<string, number>()
    definitions.forEach(def => {
      sourcesMap.set(
        def.source_name,
        (sourcesMap.get(def.source_name) || 0) + 1
      )
    })

    const sources = Array.from(sourcesMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)

    // Filtrage des définitions
    const filtered =
      selectedSources.length === 0
        ? definitions
        : definitions.filter(def => selectedSources.includes(def.source_name))

    return { availableSources: sources, filteredDefinitions: filtered }
  }, [definitions, selectedSources])

  const toggleSource = useCallback((sourceName: string) => {
    setSelectedSources(prev =>
      prev.includes(sourceName)
        ? prev.filter(s => s !== sourceName)
        : [...prev, sourceName]
    )
  }, [])

  const resetFilters = useCallback(() => {
    setSelectedSources([])
  }, [])

  return {
    selectedSources,
    availableSources,
    filteredDefinitions,
    toggleSource,
    resetFilters
  }
}

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

export default function SyllablesInfosBody () {
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

  // Hooks mutations
  const wordsBySyllableMutation = useWordsBySyllable()
  const definitionMutation = useDefinitionByName(syllableWordSelected)

  // Hooks personnalisés
  const {
    selectedSources,
    availableSources,
    filteredDefinitions,
    toggleSource,
    resetFilters
  } = useDefinitionFilters(syllableWordDefinitions?.definitions)

  const {
    currentPage,
    currentPageItems: currentPageDefs,
    paginationData,
    nextPage,
    prevPage,
    resetPage,
    startIndex
  } = usePagination(filteredDefinitions, DEFS_PER_PAGE)

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Chargement initial des mots si syllabe déjà sélectionnée
  useEffect(() => {
    if (syllableSelected && !syllableWordsList?.data?.length) {
      wordsBySyllableMutation.mutate({
        syllable: syllableSelected,
        listname: 'word'
      })
    }
  }, [syllableSelected])

  // Mise à jour des mots quand la mutation réussit
  useEffect(() => {
    if (wordsBySyllableMutation.isSuccess && wordsBySyllableMutation.data) {
      setSyllableWordsList(wordsBySyllableMutation.data)
    }
  }, [
    wordsBySyllableMutation.isSuccess,
    wordsBySyllableMutation.data,
    setSyllableWordsList
  ])

  // Mise à jour des définitions quand la mutation réussit
  useEffect(() => {
    if (definitionMutation.isSuccess && definitionMutation.data) {
      setSyllableWordDefinitions(definitionMutation.data)
    }
  }, [
    definitionMutation.isSuccess,
    definitionMutation.data,
    setSyllableWordDefinitions
  ])

  // Reset pagination et filtres quand le mot change
  useEffect(() => {
    if (syllableWordSelected) {
      resetPage()
      resetFilters()
    }
  }, [syllableWordSelected, resetPage, resetFilters])

  // Reset pagination quand les filtres changent
  useEffect(() => {
    resetPage()
  }, [selectedSources, resetPage])

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleSyllableSelect = useCallback(
    (syllable: string) => {
      setSyllableSelected(syllable)
      setSyllableWordSelected('')
      setSyllableWordDefinitions(null)
      resetPage()
      resetFilters()

      wordsBySyllableMutation.mutate({
        syllable,
        listname: 'word'
      })
    },
    [
      setSyllableSelected,
      setSyllableWordSelected,
      setSyllableWordDefinitions,
      resetPage,
      resetFilters,
      wordsBySyllableMutation
    ]
  )

  const handleWordSelect = useCallback(
    (word: string) => {
      setSyllableWordSelected(word)
    },
    [setSyllableWordSelected]
  )

  // ============================================================================
  // COMPOSANTS RENDER
  // ============================================================================

  const PaginationComponent = useMemo(() => {
    if (paginationData.totalPages <= 1) return null

    return (
      <div className={paginationContainerCSS}>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={paginationButtonCSS}
        >
          ←
        </button>
        <div className={paginationInfoCSS}>
          {currentPage} / {paginationData.totalPages}
        </div>
        <button
          onClick={nextPage}
          disabled={currentPage === paginationData.totalPages}
          className={paginationButtonCSS}
        >
          →
        </button>
      </div>
    )
  }, [paginationData.totalPages, currentPage, prevPage, nextPage])

  const renderSyllablesBlock = () => (
    <div className={blockBaseCSS}>
      <div className={blockHeaderCSS}>
        <div className={blockTitleCSS}>Syllabes</div>
        <div className={blockBadgeCSS}>{syllablesList?.data?.length || 0}</div>
      </div>
      <div className={blockContentCSS}>
        {!syllablesList?.data?.length ? (
          <EmptyState
            icon='📝'
            title='Aucune syllabe'
            text='Recherchez des mots pour voir les syllabes'
          />
        ) : (
          <div className={blockScrollAreaCSS}>
            {syllablesList.data.map(syllable => (
              <SyllableItem
                key={syllable}
                syllable={syllable}
                isSelected={syllableSelected === syllable}
                onSelect={handleSyllableSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const renderWordsBlock = () => (
    <div className={blockBaseCSS}>
      <div className={blockHeaderCSS}>
        <div className={blockTitleCSS}>Mots</div>
        <div className={blockBadgeCSS}>
          {syllableWordsList?.data?.length || 0}
        </div>
      </div>
      <div className={blockContentCSS}>
        {!syllableSelected ? (
          <EmptyState
            icon='←'
            title='Sélectionnez une syllabe'
            text='Cliquez sur une syllabe pour voir les mots correspondants'
          />
        ) : wordsBySyllableMutation.isPending ? (
          <LoadingState text='Chargement des mots...' />
        ) : !syllableWordsList?.data?.length ? (
          <EmptyState
            icon='🔍'
            title='Aucun mot trouvé'
            text={`Aucun mot contenant la syllabe "${syllableSelected}"`}
          />
        ) : (
          <div className={blockScrollAreaCSS}>
            {syllableWordsList.data.map(word => (
              <WordItem
                key={word}
                word={word}
                syllable={syllableSelected}
                isSelected={syllableWordSelected === word}
                onSelect={handleWordSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const renderDefinitionsBlock = () => (
    <div className={blockBaseCSS}>
      <div className={blockHeaderCSS}>
        <div className={blockTitleCSS}>Définitions</div>
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
            title='Sélectionnez un mot'
            text='Cliquez sur un mot pour voir ses définitions'
          />
        ) : definitionMutation.isPending ? (
          <LoadingState text='Chargement des définitions...' />
        ) : !syllableWordDefinitions?.definitions?.length ? (
          <EmptyState
            icon='📚'
            title='Aucune définition'
            text={`Aucune définition trouvée pour "${syllableWordSelected}"`}
          />
        ) : (
          <div className={cleanAreaCSS}>
            {/* Filtres par sources */}
            {availableSources.length > 1 && (
              <div className={sourcesRowCSS}>
                {availableSources.map(({ name, count }) => (
                  <SourceChip
                    key={name}
                    name={name}
                    count={count}
                    isActive={selectedSources.includes(name)}
                    onToggle={toggleSource}
                  />
                ))}
              </div>
            )}

            {/* Statut des filtres actifs */}
            {selectedSources.length > 0 && (
              <div className={filterStatusCSS}>
                {filteredDefinitions.length} sur{' '}
                {syllableWordDefinitions.definitions_count}
              </div>
            )}

            {/* Contenu des définitions filtrées */}
            {filteredDefinitions.length === 0 ? (
              <EmptyState
                icon='🔍'
                title='Aucune définition'
                text='Aucune définition pour les sources sélectionnées'
              />
            ) : (
              <div className={cleanContentCSS}>
                {currentPageDefs.map((definition, index) => (
                  <DefinitionItem
                    key={definition.id}
                    definition={definition}
                    index={index}
                    startIndex={startIndex}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        {PaginationComponent}
      </div>
    </div>
  )

  return (
    <div className={threeBlocksContainerCSS}>
      {renderSyllablesBlock()}
      {renderWordsBlock()}
      {renderDefinitionsBlock()}
    </div>
  )
}
