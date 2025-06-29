import { useQueryClient } from '@tanstack/react-query'
import {
  useModalIsOpen,
  useEditRowSelected,
  useOpenModal,
  useCloseModal
} from '@/store/store'
import {
  tableContainerStyle,
  tableStyle,
  headerStyle,
  rowStyle,
  cellStyle,
  avatarStyle,
  userContainerStyle,
  usernameStyle,
  wordStyle,
  badgeStyle,
  getBadgeColor,
  dateStyle,
  loadingStyle,
  emptyStyle,
  metadataStyle,
  typesContainerStyle,
  globalAnimations
} from './editor-table.style'
import getTags from '../helper/get-tags'
import EditorModalUpdate from './editor-modal-update'
import { WordFindResponse } from '../types/editor.types'
import { css } from '~styled-system/css'
import Modal from '@shared/components/modal/modal'

// 🎯 Row avec hover subtil
const enhancedRowStyle = css({
  transition: 'background-color 0.2s ease',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: 'rgba(30, 41, 59, 0.3)'
  }
})

// 🎨 Bouton modifier élégant
const cleanUpdateButtonStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6px 12px',
  background: 'rgba(30, 41, 59, 0.6)',
  border: 'none',
  borderRadius: '6px',
  color: '#cbd5e1',
  fontSize: '11px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  '&:hover': {
    background: 'rgba(59, 130, 246, 0.2)',
    color: '#ffffff'
  },

  '&:active': {
    transform: 'scale(0.98)'
  }
})

// 🎯 Styles pour info utilisateur
const userInfoStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px'
})

const roleStyle = css({
  fontSize: '9px',
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.3px',
  fontWeight: '600'
})

const timestampContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px'
})

const timeAgoStyle = css({
  fontSize: '10px',
  color: '#64748b',
  fontStyle: 'italic'
})

// 🎨 Couleurs pour les rôles
const getRoleColor = (role: string) => {
  const colors = {
    Administrator: '#ff3b82', // Rose néon
    Moderator: '#00d9ff' // Cyan lumineux
  }
  return colors[role as keyof typeof colors] || '#64748b'
}

// ⏰ Calcul du temps
const getTimeAgo = (dateString: string) => {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffMinutes = Math.ceil(diffTime / (1000 * 60))
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffMinutes < 60) return `${diffMinutes}min`
    if (diffHours < 24) return `${diffHours}h`
    if (diffDays === 1) return "aujourd'hui"
    if (diffDays === 2) return 'hier'
    if (diffDays <= 7) return `${diffDays}j`
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)}sem`
    return `${Math.ceil(diffDays / 30)}mois`
  } catch {
    return ''
  }
}

const renderTypeBadges = (row: any) => {
  const types = getTags(row)
  return types.map((type, index) => {
    const colorConfig = getBadgeColor(type)
    return (
      <span
        key={`${type}-${index}`}
        className={badgeStyle}
        style={{
          background: colorConfig.bg,
          borderColor: colorConfig.border,
          color: colorConfig.color
        }}
      >
        {type}
      </span>
    )
  })
}

const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return dateString
  }
}

export default function EditorTable ({ data }: any) {
  const queryClient = useQueryClient()
  const modalIsOpen = useModalIsOpen()
  const editRowSelected = useEditRowSelected()
  const openModal = useOpenModal()
  const closeModal = useCloseModal()

  const searchResults: WordFindResponse =
    data || queryClient.getQueryData(['editor', 'currentSearch'])
  const currentSearchTerm =
    queryClient.getQueryData(['editor', 'currentSearchTerm']) || ''

  const handleRowClick = (row: any) => {
    openModal(row)
  }

  const handleModalClose = () => {
    closeModal()
  }

  if (!searchResults) {
    return (
      <div className={`${tableContainerStyle} ${globalAnimations}`}>
        <div className={loadingStyle}>
          <div className='spinner'></div>
          <div className='text'>Recherchez un mot...</div>
        </div>
      </div>
    )
  }

  if (!searchResults.data.length) {
    return (
      <div className={`${tableContainerStyle} ${globalAnimations}`}>
        <div className={emptyStyle}>
          <div className='title'>Aucun résultat pour "{currentSearchTerm}"</div>
          <div className='subtitle'>Essayez un autre terme de recherche</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${tableContainerStyle} ${globalAnimations}`}>
      <table className={tableStyle}>
        <thead>
          <tr>
            <th className={headerStyle}>Creator</th>
            <th className={headerStyle}>Word</th>
            <th className={headerStyle}>Categories</th>
            <th className={headerStyle}>Date</th>
            <th className={headerStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.data.map((row: any, index: number) => (
            <tr
              key={`${row.id}-${index}`}
              className={enhancedRowStyle}
              onClick={() => handleRowClick(row)}
            >
              <td className={cellStyle}>
                <div className={userContainerStyle}>
                  <img
                    src={
                      row.image_path ||
                      `https://ui-avatars.com/api/?name=${row.username}&background=64748b&color=fff&size=32`
                    }
                    alt={row.username}
                    className={avatarStyle}
                  />
                  <div className={userInfoStyle}>
                    <span className={usernameStyle}>{row.username}</span>
                    <span
                      className={roleStyle}
                      style={{ color: getRoleColor(row.role) }}
                    >
                      {row.role || 'Utilisateur'}
                    </span>
                  </div>
                </div>
              </td>

              <td className={cellStyle}>
                <span className={wordStyle}>{row.word}</span>
              </td>

              <td className={cellStyle}>
                <div className={typesContainerStyle}>
                  {renderTypeBadges(row)}
                </div>
              </td>

              <td className={cellStyle}>
                <div className={timestampContainerStyle}>
                  <span className={dateStyle}>
                    {formatDate(row.created_at.toString())}
                  </span>
                  <span className={timeAgoStyle}>
                    {getTimeAgo(row.created_at.toString())}
                  </span>
                </div>
              </td>

              <td className={cellStyle}>
                <button
                  onClick={e => {
                    e.stopPropagation()
                    handleRowClick(row)
                  }}
                  className={cleanUpdateButtonStyle}
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={metadataStyle}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span className='stat'>Affichés: {searchResults.data.length}</span>
          <span className='stat'>Total: {searchResults.total}</span>
          {searchResults.hasMore > 0 && (
            <span className='more'>+{searchResults.hasMore} disponibles</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className='query'>"{searchResults.pattern}"</span>
          <span style={{ fontSize: '10px', color: '#64748b' }}>
            {new Date().toLocaleTimeString('fr-FR')}
          </span>
        </div>
      </div>

      {modalIsOpen && editRowSelected && (
        <Modal onClose={handleModalClose}>
          <EditorModalUpdate row={editRowSelected} close={handleModalClose} />
        </Modal>
      )}
    </div>
  )
}
