import Header from '@features/shared/components/header/header'
import { css } from '~styled-system/css'
import NavigationPanel from '@/features/shared/components/panel-navigation/navigation-panel'
import { DashboardBackgroundCSS } from '@shared/generic/generic.style'
import SyllablesInfos from './components/syllable-finder-infos'

export default function SyllableFinder () {
  return (
    <div className={DashboardBackgroundCSS}>
      <div>
        <Header />
        <div className={css({ display: 'flex' })}>
          <NavigationPanel />
          <SyllablesInfos />
        </div>
      </div>
    </div>
  )
}
