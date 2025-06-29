import { managementModalStyle as Style } from '@features/management/components/editor-modal-update.style'
import { ListId, useAddWordsModal } from '@/store/store'
import { useEditorAddWords } from '../hook/use-editor'
import { useSession } from '@/features/shared/hooks/shared-session.hook'

export default function AddWordsModal ({
  close,
  createur_id
}: {
  close: () => void
  createur_id: number
}) {
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

  const availableTags = dataSession?.data.allListsDetails.listNames.slice(1)

  // Ajouter un nouveau mot à la liste
  const handleAddWord = () => {
    if (!currentWord.trim()) return
    addWord(currentWord.trim().toLowerCase())
  }

  // Supprimer un mot de la liste
  const handleRemoveWord = (index: number) => {
    removeWord(index)
  }

  // Toggle un tag pour un mot spécifique
  const handleToggleTag = (wordIndex: number, tag: ListId) => {
    toggleWordTag(wordIndex, tag)
  }

  // Sauvegarder tous les mots
  const handleSave = async () => {
    const validWords = words.filter(word => word.name.trim())

    if (!validWords.length) {
      alert('Aucun mot valide à ajouter')
      return
    }

    try {
       addWords({
         creator_id: createur_id,
         words_details: validWords.map(word => ({
           name: word.name,
           tags: word.tags
          }))
      })

      clearWords() // Vider le store après succès
      close()
    } catch (error) {
      alert("Erreur lors de l'ajout des mots")
      console.error('❌ Erreur:', error)
    }
  }

  const totalWords = words.filter(w => w.name.trim()).length

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
          {/* Header - Plus compact */}
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
              <div className={Style.HeaderSubtitle}>Ajout de nouveaux mots</div>
              <h2
                className={Style.HeaderTitle}
                style={{
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem'
                }}
              >
                Créer des mots
              </h2>
            </div>
          </div>

          {/* Main content - Avec scroll */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              paddingRight: '0.5rem'
            }}
          >
            <div
              className={Style.MainContent}
              style={{
                gap: '1rem',
                height: 'auto',
                overflow: 'visible'
              }}
            >
              {/* Left column - Ajout de mot */}
              <div className={Style.LeftColumn} style={{ gap: '0.75rem' }}>
                {/* Section ajout */}
                <div className={Style.Section} style={{ padding: '1rem' }}>
                  <h3
                    className={Style.SectionHeader}
                    style={{
                      marginBottom: '0.75rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    <div className={Style.BlueDot} />
                    Ajouter un mot
                  </h3>

                  <label
                    className={Style.Label}
                    style={{ marginBottom: '0.5rem' }}
                  >
                    Nouveau mot
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type='text'
                      value={currentWord}
                      onChange={e => setCurrentWord(e.target.value)}
                      className={Style.Input}
                      placeholder='Tapez un mot...'
                      disabled={isPending}
                      style={{ fontSize: '0.8rem' }}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          handleAddWord()
                        }
                      }}
                    />
                    <button
                      onClick={handleAddWord}
                      disabled={!currentWord.trim() || isPending}
                      className={`${Style.BaseButton} ${Style.SaveButton}`}
                      style={{
                        whiteSpace: 'nowrap',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.75rem'
                      }}
                    >
                      Ajouter
                    </button>
                  </div>
                </div>

                {/* Liste des mots - Plus compacte */}
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
                    Mots à ajouter ({totalWords})
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
                    {words.length === 0 ? (
                      <div
                        style={{
                          color: '#94a3b8',
                          fontSize: '0.75rem',
                          fontStyle: 'italic',
                          padding: '0.75rem 0',
                          textAlign: 'center'
                        }}
                      >
                        Aucun mot ajouté
                      </div>
                    ) : (
                      words.map((word, index) => (
                        <div
                          key={index}
                          data-word-index={index}
                          style={{
                            background: 'rgba(15, 20, 25, 0.5)',
                            border: '1px solid rgba(56, 189, 248, 0.2)',
                            borderRadius: '6px',
                            padding: '0.75rem'
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
                              {word.name || 'Mot vide'}
                            </span>
                            <button
                              onClick={() => handleRemoveWord(index)}
                              disabled={isPending}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#ef4444',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                padding: '0.125rem',
                                borderRadius: '2px'
                              }}
                              title='Supprimer ce mot'
                            >
                              ✕
                            </button>
                          </div>

                          {/* Tags pour ce mot */}
                          <div
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '0.375rem'
                            }}
                          >
                            {word.tags.map(tag =>
                              tag !== 'Mot' ? (
                                <div
                                  key={tag}
                                  className={Style.CurrentTag}
                                  onClick={() => handleToggleTag(index, tag)}
                                  style={{
                                    cursor: isPending
                                      ? 'not-allowed'
                                      : 'pointer',
                                    opacity: isPending ? 0.6 : 1,
                                    fontSize: '0.7rem',
                                    padding: '0.25rem 0.5rem'
                                  }}
                                  title={`Retirer "${tag}"`}
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
                                    padding: '0.25rem 0.5rem'
                                  }}
                                >
                                  {tag} (impératif)
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right column - Tags disponibles */}
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
                  Tags disponibles
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
                      Sélectionnez un mot puis cliquez sur les tags à ajouter :
                    </div>

                    <div style={{ marginBottom: '0.75rem' }}>
                      <select
                        style={{
                          width: '100%',
                          background: 'rgba(15, 20, 25, 0.8)',
                          border: '1px solid rgba(56, 189, 248, 0.3)',
                          borderRadius: '6px',
                          padding: '0.5rem',
                          color: '#f1f5f9',
                          fontSize: '0.75rem'
                        }}
                        onChange={e => {
                          const wordIndex = parseInt(e.target.value)
                          if (!isNaN(wordIndex)) {
                            const element = document.querySelector(
                              `[data-word-index="${wordIndex}"]`
                            )
                            element?.scrollIntoView({ behavior: 'smooth' })
                          }
                        }}
                      >
                        <option value=''>Sélectionner un mot...</option>
                        {words.map((word, index) => (
                          <option key={index} value={index}>
                            {word.name || `Mot ${index + 1}`}
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
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      disabled={isPending || words.length === 0}
                      className={`${Style.AvailableTag} ${Style.InactiveTag}`}
                      style={{
                        opacity: isPending || words.length === 0 ? 0.4 : 1,
                        cursor:
                          isPending || words.length === 0
                            ? 'not-allowed'
                            : 'pointer',
                        fontSize: '0.7rem',
                        padding: '0.5rem 0.25rem'
                      }}
                      title={
                        words.length === 0
                          ? "Ajoutez d'abord un mot"
                          : `Ajouter "${tag}" au dernier mot`
                      }
                      onClick={() => {
                        if (words.length > 0) {
                          handleToggleTag(words.length - 1, tag)
                        }
                      }}
                    >
                      {tag}
                    </button>
                  ))}
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
                    Les tags seront ajoutés au dernier mot de la liste
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Fixe en bas */}
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
              {totalWords} mot{totalWords > 1 ? 's' : ''} à ajouter
            </div>

            <div className={Style.ButtonGroup} style={{ gap: '0.5rem' }}>
              <button
                onClick={close}
                disabled={isPending}
                className={`${Style.BaseButton} ${Style.CancelButton}`}
                type='button'
                style={{
                  fontSize: '0.75rem',
                  padding: '0.5rem 0.875rem'
                }}
              >
                Annuler
              </button>

              <button
                onClick={handleSave}
                disabled={totalWords === 0 || isPending}
                className={`${Style.BaseButton} ${Style.SaveButton}`}
                type='button'
                style={{
                  fontSize: '0.75rem',
                  padding: '0.5rem 1rem'
                }}
              >
                {isPending
                  ? 'Ajout en cours...'
                  : `Ajouter ${totalWords} mot${totalWords > 1 ? 's' : ''}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
