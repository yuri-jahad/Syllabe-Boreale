import { managementModalStyle as Style } from '@management/components/editor-modal-update.style'
import { useModalForm } from '@/store/store'
import {
  useEditorSaveWord,
  useEditorDeleteWord
} from '@management/hook/use-editor'
import { WordItem } from '@management/types/editor.types'
import { useSession } from '@/features/shared/hooks/shared-session.hook'
import { useAuth } from '@/features/auth/hooks/auth.hooks'
import { useCallback, useMemo } from 'react'
import { renderAdminWarning } from '../helper/render-admin-warning'

interface EditorModalUpdateProps {
  row: WordItem
  close: () => void
}

const ModalUserAvatar = ({ row }: { row: WordItem }) => {
  const getAvatarUrl = () => {
    if (row.image_path) {
      return row.image_path
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      row.username
    )}&background=475569&color=fff&size=32`
  }

  const avatarUrl = getAvatarUrl()

  if (avatarUrl.includes('.webm')) {
    return (
      <video
        src={avatarUrl}
        className={Style.UserAvatar}
        autoPlay
        loop
        muted
        playsInline
        onError={(e) => {
          console.log('Modal avatar video error:', avatarUrl)
          const target = e.target as HTMLVideoElement
          target.style.display = 'none'
          const img = document.createElement('img')
          img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            row.username
          )}&background=475569&color=fff&size=32`
          img.className = Style.UserAvatar
          img.alt = row.username
          target.parentNode?.appendChild(img)
        }}
      />
    )
  }

  return (
    <picture>
      {avatarUrl.includes('.avif') && (
        <source srcSet={avatarUrl} type="image/avif" />
      )}
      {avatarUrl.includes('.webp') && (
        <source srcSet={avatarUrl} type="image/webp" />
      )}
      <img
        src={avatarUrl}
        alt={row.username}
        className={Style.UserAvatar}
        onError={(e) => {
          console.log('Modal avatar image error:', avatarUrl)
          const target = e.target as HTMLImageElement
          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            row.username
          )}&background=475569&color=fff&size=32`
        }}
      />
    </picture>
  )
}

export default function EditorModalUpdate({
  row,
  close
}: EditorModalUpdateProps) {
  if (!row?.word) {
    console.warn('EditorModalUpdate: invalid row', row)
    close()
    return null
  }

  const { name, tags, isLoading, setName, toggleTag } = useModalForm()
  const { user } = useAuth()
  const { data } = useSession()
  const { mutate: saveWord, isPending: isSaving } = useEditorSaveWord()
  const { mutate: deleteWord, isPending: isDeleting } = useEditorDeleteWord()

  const listNames = useMemo(
    () => data?.data.allListsDetails.listNames || [],
    [data]
  )

  const isProcessing = isLoading || isSaving || isDeleting
  const isAdmin = user?.role === 'Administrator'
  const canEdit = isAdmin && !isProcessing
  const canSave = canEdit && name.trim()

  const handleSave = useCallback(async () => {
    if (!canSave) return

    try {
      const wordWithTags = {
        name: name.trim(),
        tags: tags.slice(1)
      }

      console.log('Saving word ID:', row.id)
      console.log('Word data:', wordWithTags)

      await saveWord({
        wordId: row.id.toString(),
        wordWithTags
      })

      close()
      console.log('Word saved successfully')
    } catch (error) {
      console.error('Save error:', error)
      alert('Error during save')
    }
  }, [canSave, name, tags, row.id, saveWord, close])

  const handleDelete = useCallback(async () => {
    if (!canEdit) return

    const confirmed = window.confirm(`Delete "${row.word}"?`)
    if (!confirmed) return

    try {
      await deleteWord(row.id)
      close()
      console.log('Word deleted successfully')
    } catch (error) {
      console.error('Delete error:', error)
      alert('Error during deletion')
    }
  }, [canEdit, row.word, row.id, deleteWord, close])

  const handleTagClick = useCallback(
    (tag: string) => {
      if (tag !== 'Word' && canEdit) {
        toggleTag(tag)
      }
    },
    [canEdit, toggleTag]
  )

  const renderUserInfo = () => (
    <div className={Style.UserBadge}>
      <ModalUserAvatar row={row} />
      <span className={Style.Username}>{row.username}</span>
      <div className={Style.Separator} />
      <span className={Style.Date}>
        {new Date(row.created_at).toLocaleDateString('en-US')}
      </span>
    </div>
  )

  const renderEmptyTags = () => (
    <div
      style={{
        color: '#94a3b8',
        fontSize: '0.875rem',
        fontStyle: 'italic',
        textAlign: 'center',
        padding: '2rem',
        border: '2px dashed rgba(148, 163, 184, 0.3)',
        borderRadius: '12px',
        width: '100%',
        backgroundColor: 'rgba(30, 41, 59, 0.2)'
      }}
    >
      No tags selected
    </div>
  )

  const renderCurrentTag = (tag: string) => {
    const isImperative = tag === 'Word'
    const canRemove = !isImperative && canEdit

    return (
      <div
        key={tag}
        className={`
          ${Style.CurrentTag} 
          ${isImperative ? Style.ImperativeTag : ''}
        `}
        onClick={() => handleTagClick(tag)}
        style={{
          cursor: isImperative
            ? 'default'
            : canRemove
            ? 'pointer'
            : 'not-allowed',
          opacity: isProcessing ? 0.6 : 1
        }}
        title={isImperative ? 'Required tag' : `Remove "${tag}"`}
      >
        {tag}
        {canRemove && <span className={Style.TagCloseIcon}>✕</span>}
        {isImperative && (
          <span
            style={{
              fontSize: '0.7rem',
              opacity: 0.8,
              marginLeft: '4px',
              color: '#94a3b8'
            }}
          >
            (required)
          </span>
        )}
      </div>
    )
  }

  const renderAvailableTag = (tag: string) => {
    const isActive = tags.includes(tag)

    return (
      <button
        key={tag}
        onClick={() => handleTagClick(tag)}
        disabled={!canEdit}
        className={`
          ${Style.AvailableTag} 
          ${isActive ? Style.ActiveTag : Style.InactiveTag}
        `}
        title={isActive ? `Remove "${tag}"` : `Add "${tag}"`}
        style={{
          opacity: isProcessing ? 0.6 : 1,
          cursor: canEdit ? 'pointer' : 'not-allowed'
        }}
      >
        {isActive && <span className={Style.CheckIcon}>✓</span>}
        {tag}
      </button>
    )
  }

  return (
    <div className={Style.ContentContainer}>
      <div className={Style.Header}>
        <div className={Style.HeaderContent}>
          <div className={Style.HeaderSubtitle}>Advanced word management</div>
          <h2 className={Style.HeaderTitle}>"{row.word}"</h2>
        </div>
        <div className={Style.HeaderInfo}>{renderUserInfo()}</div>
      </div>

      <div className={Style.MainContent}>
        <div className={Style.LeftColumn}>
          {renderAdminWarning(isAdmin)}
          <div className={Style.Section}>
            <h3 className={Style.SectionHeader}>
              <div className={Style.BlueDot} />
              Term modification
            </h3>

            <label className={Style.Label}>New name</label>
            <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              className={Style.Input}
              placeholder={`Modify "${row.word}"`}
              disabled={!canEdit}
            />
          </div>

          <div className={Style.FlexSection}>
            <h3 className={Style.SectionHeader}>
              <div className={Style.GreenDot} />
              {tags.length === 1
                ? 'Base tag'
                : `Selected tags (${tags.length})`}
            </h3>

            <div className={Style.TagsContainer}>
              {tags.length === 0
                ? renderEmptyTags()
                : tags.map(renderCurrentTag)}
            </div>
          </div>
        </div>

        <div className={Style.Section}>
          <h3 className={Style.SectionHeader}>
            <div className={Style.PurpleDot} />
            Available tags ({listNames.length})
          </h3>

          <div className={Style.TagsGrid}>
            {listNames.map(renderAvailableTag)}
          </div>

          <div className={Style.HelperText}>
            <p className={Style.HelperTextContent}>
              Click on a tag to add or remove it
            </p>
          </div>
        </div>
      </div>

      <div className={Style.Footer}>
        <div className={Style.FooterInfo}>
          <div className={Style.PulsingDot} />
          {tags.length} tag{tags.length > 1 ? 's' : ''} selected
        </div>

        <div className={Style.ButtonGroup}>
          <button
            onClick={close}
            disabled={isProcessing}
            className={`${Style.BaseButton} ${Style.CancelButton}`}
            type='button'
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={!canEdit}
            className={`${Style.BaseButton} ${Style.DeleteButton}`}
            type='button'
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>

          <button
            onClick={handleSave}
            disabled={!canSave}
            className={`${Style.BaseButton} ${Style.SaveButton}`}
            type='button'
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}