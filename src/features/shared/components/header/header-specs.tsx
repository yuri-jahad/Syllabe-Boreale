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
          <div className={subtitleStyle}>Linguistic Database</div>
        </div>
      </div>

      <div className={statsAreaStyle}>
        <div className={statItemStyle}>
          <span>Total:</span>
          <span className='value'>{total || 0}</span>
        </div>
        <div className={statItemStyle}>
          <span>Displayed:</span>
          <span className='value'>{spliced || 0}</span>
        </div>
        <div className={statItemStyle}>
          <span>User:</span>
          <span className='value'>{username || 'Guest'}</span>
        </div>
      </div>
    </div>
  )
}