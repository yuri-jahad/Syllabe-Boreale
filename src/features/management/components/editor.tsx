import Header from '@/features/shared/components/header/header'
import PanelInfos from '@shared/components/panel-infos/panel-infos'
import NavigationPanel from '@/features/shared/components/panel-navigation/navigation-panel'
import {
  DashboardBackgroundCSS,
  DashboardCentralCSS
} from '@shared/generic/generic.style'

import SearchInput from '../../shared/components/input-search/input-search'
import { ChangeEvent, useState, useMemo, useEffect, useCallback } from 'react'
import { ContainerInputCSS } from './editor-table.style'
import { useEditorSearch } from '../hook/use-editor'
import { useQueryClient } from '@tanstack/react-query'
import { css } from '~styled-system/css'
import AddWordsModal from './editor-modal-add'
import EditorTable from './editor-table'
import { useAuth } from '@auth/hooks/auth.hooks'
import TableFilters, {
  FilterState,
  applyFilters
} from '@management/components/editor-table-filter'
import HeaderSpecs from '@shared/components/header/header-specs'
import Modal from '@shared/components/modal/modal'
import EditorModalUpdate from '@management/components/editor-modal-update'
import { WordItem } from '@management/types/editor.types'
import { useSession } from '@/features/shared/hooks/shared-session.hook'

// ⚡ STYLES POUR LES COMPOSANTS
const loaderContainer = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px',
  background: 'rgba(15, 23, 42, 0.4)',
  borderRadius: '8px',
  margin: '20px auto',
  width: 'min(94%, 1400px)',
  border: '1px solid rgba(148, 163, 184, 0.1)'
})

const loaderContent = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px'
})

const loaderText = css({
  color: '#94a3b8',
  fontSize: '14px'
})

const dot = css({
  width: '6px',
  height: '6px',
  backgroundColor: '#94a3b8',
  borderRadius: '50%',
  animation: 'bounce 1.4s ease-in-out infinite both',
  '&:nth-child(1)': { animationDelay: '-0.32s' },
  '&:nth-child(2)': { animationDelay: '-0.16s' },
  '&:nth-child(3)': { animationDelay: '0s' }
})

// ⚡ COMPOSANT LOADER
const SearchLoader = () => (
  <>
    <style>{`
      @keyframes bounce {
        0%, 80%, 100% {
          transform: scale(0.8);
          opacity: 0.5;
        }
        40% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `}</style>
    <div className={loaderContainer}>
      <div className={loaderContent}>
        <span className={loaderText}>Recherche en cours</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <div className={dot}></div>
          <div className={dot}></div>
          <div className={dot}></div>
        </div>
      </div>
    </div>
  </>
)

// ⚡ COMPOSANT ERROR
const SearchError = () => (
  <div
    className={css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.2)',
      borderRadius: '8px',
      margin: '20px auto',
      width: 'min(94%, 1400px)',
      color: '#ef4444',
      fontSize: '14px'
    })}
  >
    Erreur lors de la recherche
  </div>
)

// ⚡ COMPOSANT BOUTON ADD
const AddButton = ({
  onClick,
  disabled
}: {
  onClick: () => void
  disabled?: boolean
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={css({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 16px',
      background: 'rgba(15, 23, 42, 0.8)',
      border: '1px solid rgba(148, 163, 184, 0.2)',
      borderRadius: '6px',
      color: '#f1f5f9',
      fontSize: '13px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        background: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 0.4)',
        color: '#dbeafe'
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed'
      }
    })}
  >
    <span>+</span>
    <span>Nouveau mot</span>
  </button>
)

// ⚡ COMPOSANT PRINCIPAL MANAGEMENT
export default function Management () {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const currentUserId = user?.id

  // ⚡ ÉTATS POUR LES MODALS
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editRowSelected, setEditRowSelected] = useState<WordItem | null>(null)
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    role: '',
    dateRange: '',
    sortBy: 'created_at',
    sortOrder: 'desc'
  })

  // ⚡ HOOK DE RECHERCHE
  const {
    mutate: searchWords,
    isPending: isSearching,
    error: searchError
  } = useEditorSearch()

  const { data } = useSession()
  const listNames = data?.data.allListsDetails.listNames

  useMemo(() => {
    searchWords('edit')
  }, [searchWords])

  // ⚡ DONNÉES DE RECHERCHE
  const currentSearch = queryClient.getQueryData(['editor', 'currentSearch'])
  const searchResults: any = currentSearch
  const isLoading = isSearching
  const error = searchError

  // ⚡ DONNÉES FILTRÉES
  const filteredData = useMemo(() => {
    if (!searchResults?.data?.data) return null
    console.log(searchResults)
    return {
      ...searchResults.data,
      data: applyFilters(listNames, searchResults.data.data, filters)
    }
  }, [searchResults, filters])

  // ⚡ HANDLERS
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const syllable = e.target.value.trim()
      if (syllable.length > 0) {
        searchWords(syllable)
      } else {
        queryClient.removeQueries({ queryKey: ['editor', 'currentSearch'] })
        queryClient.removeQueries({ queryKey: ['editor', 'currentSearchTerm'] })

        searchWords('edit')
      }
    },
    [queryClient, searchWords]
  )

  // ⚡ HANDLERS POUR MODAL ADD
  const handleAddWords = () => setShowAddModal(true)
  const handleCloseAddModal = () => setShowAddModal(false)

  // ⚡ HANDLERS POUR MODAL EDIT
  const handleEditRow = (row: WordItem) => {
    setEditRowSelected(row)
    setShowEditModal(true)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setEditRowSelected(null)
  }

  // ⚡ HANDLER POUR FILTRES
  const handleFiltersChange = (newFilters: FilterState) =>
    setFilters(newFilters)

  return (
    <div className={DashboardBackgroundCSS}>
      <Header />
      <div style={{ display: 'flex' }}>
        <NavigationPanel />
        <div className={DashboardCentralCSS}>
          <div
            className={css({
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '20px',
              margin: '0 auto 16px',
              width: 'min(94%, 1400px)'
            })}
          >
            <div style={{ flex: 1 }}>
              <HeaderSpecs
                total={searchResults?.data.total}
                spliced={filteredData?.data?.length}
                username={user?.username || 'Invité'}
              />
              <div className={ContainerInputCSS}>
                <SearchInput
                  handleOnChange={handleOnChange}
                  placeholder='Rechercher un mot...'
                />
              </div>
            </div>
            <AddButton onClick={handleAddWords} disabled={isLoading} />
          </div>

          {/* ⚡ FILTRES */}
          {searchResults?.data && (
            <TableFilters onFiltersChange={handleFiltersChange} />
          )}
          <div>
            {isLoading && <SearchLoader />}
            {error && <SearchError />}
            {!isLoading && !error && filteredData && (
              <EditorTable data={filteredData} onEditRow={handleEditRow} />
            )}
          </div>

          <PanelInfos />
        </div>
      </div>

      {/* ⚡ MODAL ADD WORDS */}
      {showAddModal && currentUserId && (
        <Modal onClose={handleCloseAddModal} showCloseButton={true}>
          <AddWordsModal
            close={handleCloseAddModal}
            createur_id={currentUserId}
          />
        </Modal>
      )}

      {/* ⚡ MODAL EDIT WORD */}
      {showEditModal && editRowSelected && (
        <Modal onClose={handleCloseEditModal} showCloseButton={false}>
          <EditorModalUpdate
            row={editRowSelected}
            close={handleCloseEditModal}
          />
        </Modal>
      )}
    </div>
  )
}
