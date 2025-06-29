import {
  pageHeaderStyle,
  titleAreaStyle,
  subtitleStyle,
  statsAreaStyle,
  statItemStyle
} from '@shared/components/header/header-specs.style'

export default function HeaderSpecs ({
  total,
  spliced,
  username
}: {
  total: number
  spliced: number
  username: string
}) {
  return (
    <div className={pageHeaderStyle}>
      <div className={titleAreaStyle}>
        <div>
          <div className={subtitleStyle}>Base de données linguistique</div>
        </div>
      </div>

      <div className={statsAreaStyle}>
        <div className={statItemStyle}>
          <span>Total:</span>
          <span className='value'>{total || 0}</span>
        </div>
        <div className={statItemStyle}>
          <span>Affichés:</span>
          <span className='value'>{spliced || 0}</span>
        </div>
        <div className={statItemStyle}>
          <span>Utilisateur:</span>
          <span className='value'>{username || 'Invité'}</span>
        </div>
      </div>
    </div>
  )
}
