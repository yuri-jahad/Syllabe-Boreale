import { useQueryClient } from '@tanstack/react-query'
import { useMemo, useCallback, memo } from 'react'
import {
  useModalIsOpen,
  useEditRowSelected,
  useOpenModal,
  useCloseModal,
  useStore
} from '@/store/store'
import {
  tableContainerStyle,
  tableStyle,
  headerStyle,
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
  typesContainerStyle
} from './editor-table.style'
import getTags from '../helper/get-tags'
import EditorModalUpdate from './editor-modal-update'
import { WordFindResponse } from '../types/editor.types'
import { css } from '~styled-system/css'
import Modal from '@shared/components/modal/modal'
import { highlightSyllable } from '@shared/services/hightlight-syllable.service'

const enhancedRowStyle = css({
  transition: 'background-color 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(30, 41, 59, 0.3)'
  }
})

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

const getRoleColor = (role: string) => {
  const colors = {
    Administrator: '#ff3b82',
    Moderator: '#00d9ff'
  }
  return colors[role as keyof typeof colors] || '#64748b'
}

const timeCache = new Map()
const getTimeAgo = (dateString: string) => {
  if (timeCache.has(dateString)) {
    return timeCache.get(dateString)
  }

  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffMinutes = Math.ceil(diffTime / (1000 * 60))
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    let result = ''
    if (diffMinutes < 60) result = `${diffMinutes}min`
    else if (diffHours < 24) result = `${diffHours}h`
    else if (diffDays === 1) result = 'today'
    else if (diffDays === 2) result = 'yesterday'
    else if (diffDays <= 7) result = `${diffDays}d`
    else if (diffDays <= 30) result = `${Math.ceil(diffDays / 7)}w`
    else result = `${Math.ceil(diffDays / 30)}mo`

    timeCache.set(dateString, result)
    return result
  } catch {
    return ''
  }
}

const dateCache = new Map()
const formatDate = (dateString: string) => {
  if (dateCache.has(dateString)) {
    return dateCache.get(dateString)
  }

  try {
    const result = new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
    dateCache.set(dateString, result)
    return result
  } catch {
    return dateString
  }
}

const UserAvatar = memo(({ row }: { row: any }) => {
  const getFallbackUrl = useCallback(() => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      row.username
    )}&background=475569&color=fff&size=32`
  }, [row.username])

  const avatarUrl = useMemo(() => {
    return row.image_path || getFallbackUrl()
  }, [row.image_path, getFallbackUrl])

  if (avatarUrl.includes('.webm')) {
    return (
      <video
        src={avatarUrl}
        className={avatarStyle}
        autoPlay
        loop
        muted
        playsInline
      />
    )
  }

  return (
    <picture>
      {avatarUrl.includes('.avif') && (
        <source key='avif' srcSet={avatarUrl} type='image/avif' />
      )}
      {avatarUrl.includes('.webp') && (
        <source key='webp' srcSet={avatarUrl} type='image/webp' />
      )}
      <img src={avatarUrl} alt={row.username} className={avatarStyle} />
    </picture>
  )
})

const TypeBadges = memo(({ row }: { row: any }) => {
  const badges = useMemo(() => {
    const types = getTags(row)
    return types.map((type, index) => {
      const colorConfig = getBadgeColor(type)
      return (
        <span
          key={`badge-${row.id}-${type}-${index}`}
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
  }, [row])

  return <div className={typesContainerStyle}>{badges}</div>
})

const TableRow = memo(
  ({
    row,
    currentSearchTerm,
    syllableColor,
    onRowClick
  }: {
    row: any
    currentSearchTerm: string
    syllableColor: string
    onRowClick: (row: any) => void
  }) => {
    const handleClick = useCallback(() => {
      onRowClick(row)
    }, [row, onRowClick])

    const handleButtonClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation()
        onRowClick(row)
      },
      [row, onRowClick]
    )

    const formattedData = useMemo(
      () => ({
        timeAgo: getTimeAgo(row.created_at.toString()),
        formattedDate: formatDate(row.created_at.toString()),
        roleColor: getRoleColor(row.role)
      }),
      [row.created_at, row.role]
    )

    return (
      <tr
        key={`row-${row.id}`}
        className={enhancedRowStyle}
        onClick={handleClick}
      >
        <td key={`creator-${row.id}`} className={cellStyle}>
          <div className={userContainerStyle}>
            <UserAvatar row={row} />
            <div className={userInfoStyle}>
              <span className={usernameStyle}>{row.username}</span>
              <span
                className={roleStyle}
                style={{ color: formattedData.roleColor }}
              >
                {row.role || 'User'}
              </span>
            </div>
          </div>
        </td>

        <td key={`word-${row.id}`} className={cellStyle}>
          <span className={wordStyle}>
            {highlightSyllable(row.word, currentSearchTerm, syllableColor)}
          </span>
        </td>

        <td key={`categories-${row.id}`} className={cellStyle}>
          <TypeBadges row={row} />
        </td>

        <td key={`date-${row.id}`} className={cellStyle}>
          <div className={timestampContainerStyle}>
            <span className={dateStyle}>{formattedData.formattedDate}</span>
            <span className={timeAgoStyle}>{formattedData.timeAgo}</span>
          </div>
        </td>

        <td key={`actions-${row.id}`} className={cellStyle}>
          <button
            onClick={handleButtonClick}
            className={cleanUpdateButtonStyle}
          >
            Edit
          </button>
        </td>
      </tr>
    )
  }
)

export default function EditorTable ({ data }: any) {
  const queryClient = useQueryClient()
  const modalIsOpen = useModalIsOpen()
  const editRowSelected = useEditRowSelected()
  const openModal = useOpenModal()
  const closeModal = useCloseModal()
  const { syllableColor } = useStore()

  const searchResults: WordFindResponse = useMemo(
    () => data || queryClient.getQueryData(['editor', 'currentSearch']),
    [data, queryClient]
  )

  const currentSearchTerm: string = useMemo(
    () => queryClient.getQueryData(['editor', 'currentSearchTerm']) || '',
    [queryClient]
  )

  const displayedData = useMemo(() => {
    if (!searchResults?.data) return []
    return searchResults.data.slice(0, 100)
  }, [searchResults?.data])

  const handleRowClick = useCallback(
    (row: any) => {
      openModal(row)
    },
    [openModal]
  )

  const handleModalClose = useCallback(() => {
    closeModal()
  }, [closeModal])

  if (!searchResults) {
    return (
      <div className={tableContainerStyle}>
        <div className={loadingStyle}>
          <div className='spinner'></div>
          <div className='text'>Search for a word...</div>
        </div>
      </div>
    )
  }

  if (!searchResults.data.length) {
    return (
      <div className={tableContainerStyle}>
        <div className={emptyStyle}>
          <div className='title'>No results for "{currentSearchTerm}"</div>
          <div className='subtitle'>Try another search term</div>
        </div>
      </div>
    )
  }

  return (
    <div className={tableContainerStyle}>
      <table className={tableStyle}>
        <thead>
          <tr>
            <th key='creator' className={headerStyle}>
              Creator
            </th>
            <th key='word' className={headerStyle}>
              Word
            </th>
            <th key='categories' className={headerStyle}>
              Categories
            </th>
            <th key='date' className={headerStyle}>
              Date
            </th>
            <th key='actions' className={headerStyle}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((row: any) => (
            <TableRow
              key={row.id}
              row={row}
              currentSearchTerm={currentSearchTerm}
              syllableColor={syllableColor}
              onRowClick={handleRowClick}
            />
          ))}
        </tbody>
      </table>

      <div className={metadataStyle}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span className='stat'>Displayed: {displayedData.length}</span>
          <span className='stat'>Total: {searchResults.total}</span>
          {searchResults.data.length > 100 && (
            <span className='more'>
              +{searchResults.data.length - 100} hidden for performance
            </span>
          )}
          {searchResults.hasMore > 0 && (
            <span className='more'>+{searchResults.hasMore} available</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className='query'>"{searchResults.pattern}"</span>
          <span style={{ fontSize: '10px', color: '#64748b' }}>
            {new Date().toLocaleTimeString('en-US')}
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