import { managementModalStyle as Style } from '@features/management/components/editor-modal-update.style'
import { ListId, useAddWordsModal } from '@/store/store'
import { useEditorAddWords } from '../hook/use-editor'
import { useSession } from '@/features/shared/hooks/shared-session.hook'
import { useAuth } from '@/features/auth/hooks/auth.hooks'
import { useCallback, useMemo } from 'react'
import { renderAdminWarning } from '../helper/render-admin-warning'

interface AddWordsModalProps {
  close: () => void
  createur_id: number
}

export default function AddWordsModal ({
  close,
  createur_id
}: AddWordsModalProps) {
  const {
    words,
    currentWord,
    setCurrentWord,
    addWord,
    removeWord,
    toggleWordTag,
    clearWords
  } = useAddWordsModal()

  const { mutate: addWords, isPending } = useEditorAddWords()
  const { data: dataSession } = useSession()
  const { user } = useAuth()

  const availableTags = useMemo(
    () => dataSession?.data.allListsDetails.listNames.slice(1) || [],
    [dataSession]
  )
  const totalWords = useMemo(
    () => words.filter(w => w.name.trim()).length,
    [words]
  )
  const isAdmin = user?.role === 'Administrator'
  
  const canEdit = isAdmin && !isPending

  const handleAddWord = useCallback(() => {
    if (!currentWord.trim() || !canEdit) return
    addWord(currentWord.trim().toLowerCase())
    setCurrentWord('')
  }, [currentWord, canEdit, addWord, setCurrentWord])

  const handleRemoveWord = useCallback(
    (index: number) => {
      if (!canEdit) return
      removeWord(index)
    },
    [canEdit, removeWord]
  )

  const handleToggleTag = useCallback(
    (wordIndex: number, tag: ListId) => {
      if (!canEdit) return
      toggleWordTag(wordIndex, tag)
    },
    [canEdit, toggleWordTag]
  )

  const handleSave = useCallback(async () => {
    if (!canEdit) return

    const validWords = words.filter(word => word.name.trim())

    if (!validWords.length) {
      alert('No valid words to add')
      return
    }

    try {
      await addWords({
        creator_id: createur_id,
        words_details: validWords.map(word => ({
          name: word.name,
          tags: word.tags
        }))
      })

      clearWords()
      close()
    } catch (error) {
      console.error('Error:', error)
      alert("Error adding words")
    }
  }, [canEdit, words, addWords, createur_id, clearWords, close])

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleAddWord()
      }
    },
    [handleAddWord]
  )

  const handleWordSelection = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const wordIndex = parseInt(e.target.value)
      if (!isNaN(wordIndex)) {
        const element = document.querySelector(
          `[data-word-index="${wordIndex}"]`
        )
        element?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    []
  )

  const handleTagClick = useCallback(
    (tag: ListId) => {
      if (words.length > 0 && canEdit) {
        handleToggleTag(words.length - 1, tag)
      }
    },
    [words.length, canEdit, handleToggleTag]
  )

  const renderEmptyWords = () => (
    <div
      style={{
        color: '#94a3b8',
        fontSize: '0.75rem',
        fontStyle: 'italic',
        padding: '0.75rem 0',
        textAlign: 'center'
      }}
    >
      No words added
    </div>
  )

  const renderWordItem = (word: any, index: number) => (
    <div
      key={index}
      data-word-index={index}
      style={{
        background: 'rgba(15, 20, 25, 0.5)',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        borderRadius: '6px',
        padding: '0.75rem',
        opacity: !canEdit ? 0.6 : 1
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem'
        }}
      >
        <span
          style={{
            color: '#f1f5f9',
            fontWeight: '600',
            fontSize: '0.85rem'
          }}
        >
          {word.name || 'Empty word'}
        </span>
        <button
          onClick={() => handleRemoveWord(index)}
          disabled={!canEdit}
          style={{
            background: 'transparent',
            border: 'none',
            color: canEdit ? '#ef4444' : '#64748b',
            cursor: canEdit ? 'pointer' : 'not-allowed',
            fontSize: '0.8rem',
            padding: '0.125rem',
            borderRadius: '2px'
          }}
          title={canEdit ? 'Delete this word' : 'Action not authorized'}
        >
          ✕
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.375rem'
        }}
      >
        {word.tags.map((tag: string) =>
          tag !== 'Word' ? (
            <div
              key={tag}
              className={Style.CurrentTag}
              onClick={() => handleToggleTag(index, tag)}
              style={{
                cursor: canEdit ? 'pointer' : 'not-allowed',
                opacity: canEdit ? 1 : 0.6,
                fontSize: '0.7rem',
                padding: '0.25rem 0.5rem'
              }}
              title={canEdit ? `Remove "${tag}"` : 'Action not authorized'}
            >
              {tag}
              <span className={Style.TagCloseIcon}>✕</span>
            </div>
          ) : (
            <div
              key={tag}
              className={`${Style.ImperativeTag} ${Style.AvailableTag}`}
              style={{
                fontSize: '0.7rem',
                padding: '0.25rem 0.5rem',
                opacity: canEdit ? 1 : 0.6
              }}
            >
              {tag} (required)
            </div>
          )
        )}
      </div>
    </div>
  )

  const renderAvailableTag = (tag: string) => (
    <button
      key={tag}
      disabled={!canEdit || words.length === 0}
      className={`${Style.AvailableTag} ${Style.InactiveTag}`}
      style={{
        opacity: !canEdit || words.length === 0 ? 0.4 : 1,
        cursor: !canEdit || words.length === 0 ? 'not-allowed' : 'pointer',
        fontSize: '0.7rem',
        padding: '0.5rem 0.25rem'
      }}
      title={
        !canEdit
          ? 'Action not authorized'
          : words.length === 0
          ? "Add a word first"
          : `Add "${tag}" to the last word`
      }
      onClick={() => handleTagClick(tag)}
    >
      {tag}
    </button>
  )

  return (
    <div>
      <div
        className='modal-content'
        style={{
          position: 'relative',
          zIndex: 1000,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          className={Style.ContentContainer}
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          <div
            className={Style.Header}
            style={{
              paddingBottom: '0.75rem',
              flexShrink: 0
            }}
          >
            <div
              className={Style.HeaderContent}
              style={{ marginBottom: '0.5rem' }}
            >
              <div className={Style.HeaderSubtitle}>Adding new words</div>
              <h2
                className={Style.HeaderTitle}
                style={{
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem'
                }}
              >
                Create words
              </h2>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              paddingRight: '0.5rem'
            }}
          >
            {renderAdminWarning(isAdmin)}

            <div
              className={Style.MainContent}
              style={{
                gap: '1rem',
                height: 'auto',
                overflow: 'visible'
              }}
            >
              <div className={Style.LeftColumn} style={{ gap: '0.75rem' }}>
                <div className={Style.Section} style={{ padding: '1rem' }}>
                  <h3
                    className={Style.SectionHeader}
                    style={{
                      marginBottom: '0.75rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    <div className={Style.BlueDot} />
                    Add a word
                  </h3>

                  <label
                    className={Style.Label}
                    style={{ marginBottom: '0.5rem' }}
                  >
                    New word
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type='text'
                      value={currentWord}
                      onChange={e => setCurrentWord(e.target.value)}
                      className={Style.Input}
                      placeholder='Type a word...'
                      disabled={!canEdit}
                      style={{
                        fontSize: '0.8rem',
                        opacity: canEdit ? 1 : 0.6
                      }}
                      onKeyPress={handleKeyPress}
                    />
                    <button
                      onClick={handleAddWord}
                      disabled={!currentWord.trim() || !canEdit}
                      className={`${Style.BaseButton} ${Style.SaveButton}`}
                      style={{
                        whiteSpace: 'nowrap',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.75rem'
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div
                  className={Style.FlexSection}
                  style={{
                    padding: '1rem',
                    flex: 1,
                    minHeight: '200px'
                  }}
                >
                  <h3
                    className={Style.SectionHeader}
                    style={{
                      marginBottom: '0.75rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    <div className={Style.GreenDot} />
                    Words to add ({totalWords})
                  </h3>

                  <div
                    style={{
                      flex: 1,
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      maxHeight: '250px'
                    }}
                  >
                    {words.length === 0
                      ? renderEmptyWords()
                      : words.map(renderWordItem)}
                  </div>
                </div>
              </div>

              <div
                className={Style.Section}
                style={{
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  height: 'fit-content'
                }}
              >
                <h3
                  className={Style.SectionHeader}
                  style={{
                    marginBottom: '0.75rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <div className={Style.PurpleDot} />
                  Available tags
                </h3>

                {words.length > 0 && (
                  <>
                    <div
                      style={{
                        marginBottom: '0.75rem',
                        color: '#bfdbfe',
                        fontSize: '0.75rem'
                      }}
                    >
                      Select a word then click on the tags to add:
                    </div>

                    <div style={{ marginBottom: '0.75rem' }}>
                      <select
                        title='tag selection'
                        style={{
                          width: '100%',
                          background: 'rgba(15, 20, 25, 0.8)',
                          border: '1px solid rgba(56, 189, 248, 0.3)',
                          borderRadius: '6px',
                          padding: '0.5rem',
                          color: '#f1f5f9',
                          fontSize: '0.75rem',
                          opacity: canEdit ? 1 : 0.6
                        }}
                        onChange={handleWordSelection}
                        disabled={!canEdit}
                      >
                        <option value=''>Select a word...</option>
                        {words.map((word, index) => (
                          <option key={index} value={index}>
                            {word.name || `Word ${index + 1}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.5rem',
                    marginBottom: '0.75rem'
                  }}
                >
                  {availableTags.map(renderAvailableTag)}
                </div>

                <div
                  className={Style.HelperText}
                  style={{
                    marginTop: '0.5rem',
                    paddingTop: '0.5rem'
                  }}
                >
                  <p
                    className={Style.HelperTextContent}
                    style={{ fontSize: '0.65rem' }}
                  >
                    Tags will be added to the last word in the list
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={Style.Footer}
            style={{
              marginTop: '0.75rem',
              paddingTop: '0.75rem',
              flexShrink: 0
            }}
          >
            <div className={Style.FooterInfo} style={{ fontSize: '0.75rem' }}>
              <div className={Style.PulsingDot} />
              {totalWords} word{totalWords > 1 ? 's' : ''} to add
            </div>

            <div className={Style.ButtonGroup} style={{ gap: '0.5rem' }}>
              <button
                onClick={close}
                disabled={!canEdit}
                className={`${Style.BaseButton} ${Style.CancelButton}`}
                type='button'
                style={{
                  fontSize: '0.75rem',
                  padding: '0.5rem 0.875rem'
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={totalWords === 0 || !canEdit}
                className={`${Style.BaseButton} ${Style.SaveButton}`}
                type='button'
                style={{
                  fontSize: '0.75rem',
                  padding: '0.5rem 1rem'
                }}
              >
                {isPending
                  ? 'Adding...'
                  : `Add ${totalWords} word${totalWords > 1 ? 's' : ''}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}