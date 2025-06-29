import { managementModalStyle as Style } from '@management/components/editor-modal-update.style'
import { useModalForm } from '@/store/store'
import {
  useEditorSaveWord,
  useEditorDeleteWord
} from '@management/hook/use-editor'
import { WordItem } from '@management/types/editor.types'
import { useSession } from '@/features/shared/hooks/shared-session.hook'

export default function EditorModalUpdate ({
  row,
  close
}: {
  row: WordItem
  close: () => void
}) {
  if (!row || !row.word) {
    console.warn('EditorModalUpdate: row invalide', row)
    close()
    return null
  }

  const { name, tags, isLoading, setName, toggleTag } = useModalForm()
  const { data } = useSession()
  const listNames = data?.data.listNames || []
  const { mutate: saveWord, isPending: isSaving } = useEditorSaveWord()
  const { mutate: deleteWord, isPending: isDeleting } = useEditorDeleteWord()

  const isProcessing = isLoading || isSaving || isDeleting

  const handleSave = async () => {
    try {
      const wordWithTags = {
        name: name, // ✅ "name" pas "word"
        tags: tags.slice(1)
      }

      console.log('🎯 Saving word ID:', row.id)
      console.log('📝 Word data:', wordWithTags)

      saveWord({
        wordId: row.id.toString(), // ✅ Convertir en string
        wordWithTags
      })

      close()
      console.log('✅ Mot sauvegardé avec succès')
    } catch (error) {
      alert('Erreur lors de la sauvegarde')
      console.error('❌ Erreur sauvegarde:', error)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Supprimer "${row.word}" ?`)) return

    try {
      await deleteWord(row.id)
      close()
      console.log('✅ Mot supprimé avec succès')
    } catch (error) {
      alert('Erreur lors de la suppression')
      console.error('❌ Erreur suppression:', error)
    }
  }

  return (
    <div className={Style.ContentContainer}>
      {/* Header */}
      <div className={Style.Header}>
        <div className={Style.HeaderContent}>
          <div className={Style.HeaderSubtitle}>Gestion avancée du mot</div>
          <h2 className={Style.HeaderTitle}>"{row.word}"</h2>
        </div>

        <div className={Style.HeaderInfo}>
          <div className={Style.UserBadge}>
            <img
              src={
                row.image_path ||
                `https://ui-avatars.com/api/?name=${row.username}&background=475569&color=fff&size=32`
              }
              alt={row.username}
              className={Style.UserAvatar}
            />
            <span className={Style.Username}>{row.username}</span>
            <div className={Style.Separator} />
            <span className={Style.Date}>
              {new Date(row.created_at).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={Style.MainContent}>
        {/* Left column */}
        <div className={Style.LeftColumn}>
          {/* Word editing */}
          <div className={Style.Section}>
            <h3 className={Style.SectionHeader}>
              <div className={Style.BlueDot} />
              Modification du terme
            </h3>

            <label className={Style.Label}>Nouveau nom</label>
            <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              className={Style.Input}
              placeholder={`Modifier "${row.word}"`}
              disabled={isProcessing}
            />
          </div>

          {/* Current tags */}
          <div className={Style.FlexSection}>
            <h3 className={Style.SectionHeader}>
              <div className={Style.GreenDot} />
              Tags actuels ({tags.length})
            </h3>

            <div className={Style.TagsContainer}>
              {tags.length === 0 ? (
                <div
                  style={{
                    color: '#64748b',
                    fontSize: '0.875rem',
                    fontStyle: 'italic',
                    textAlign: 'center',
                    padding: '2rem',
                    border: '2px dashed rgba(100, 116, 139, 0.3)',
                    borderRadius: '12px',
                    width: '100%'
                  }}
                >
                  Aucun tag sélectionné
                </div>
              ) : (
                tags.map(tag => (
                  <div
                    key={tag}
                    className={`
                      ${Style.CurrentTag} 
                      ${tag === 'Mot' ? Style.ImperativeTag : ''}
                    `}
                    onClick={() =>
                      tag !== 'Mot' && !isProcessing && toggleTag(tag)
                    }
                    style={{
                      cursor:
                        tag === 'Mot'
                          ? 'default'
                          : isProcessing
                          ? 'not-allowed'
                          : 'pointer',
                      opacity: isProcessing ? 0.6 : 1
                    }}
                    title={
                      tag === 'Mot' ? 'Tag obligatoire' : `Retirer "${tag}"`
                    }
                  >
                    {tag}
                    {tag !== 'Mot' && (
                      <span className={Style.TagCloseIcon}>✕</span>
                    )}
                    {tag === 'Mot' && (
                      <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                        (obligatoire)
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className={Style.Section}>
          <h3 className={Style.SectionHeader}>
            <div className={Style.PurpleDot} />
            Tags disponibles
          </h3>

          <div className={Style.TagsGrid}>
            {listNames.map((tag: string) => {
              const isActive = tags.includes(tag)
              return (
                <button
                  key={tag}
                  onClick={() => !isProcessing && toggleTag(tag)}
                  disabled={isProcessing}
                  className={`
                    ${Style.AvailableTag} 
                    ${isActive ? Style.ActiveTag : Style.InactiveTag}
                  `}
                  title={isActive ? `Retirer "${tag}"` : `Ajouter "${tag}"`}
                  style={{
                    opacity: isProcessing ? 0.6 : 1,
                    cursor: isProcessing ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isActive && <span className={Style.CheckIcon}>✓</span>}
                  {tag}
                </button>
              )
            })}
          </div>

          <div className={Style.HelperText}>
            <p className={Style.HelperTextContent}>
              Cliquez sur un tag pour l'ajouter ou le retirer
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={Style.Footer}>
        <div className={Style.FooterInfo}>
          <div className={Style.PulsingDot} />
          {tags.length} tag{tags.length > 1 ? 's' : ''} sélectionné
          {tags.length > 1 ? 's' : ''}
        </div>

        <div className={Style.ButtonGroup}>
          <button
            onClick={close}
            disabled={isProcessing}
            className={`${Style.BaseButton} ${Style.CancelButton}`}
            type='button'
          >
            Annuler
          </button>

          <button
            onClick={handleDelete}
            disabled={isProcessing}
            className={`${Style.BaseButton} ${Style.DeleteButton}`}
            type='button'
          >
            {isDeleting ? 'Suppression...' : 'Supprimer'}
          </button>

          <button
            onClick={handleSave}
            disabled={!name.trim() || isProcessing}
            className={`${Style.BaseButton} ${Style.SaveButton}`}
            type='button'
          >
            {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>
    </div>
  )
}
