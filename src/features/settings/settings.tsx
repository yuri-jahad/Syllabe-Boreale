import Header from '@shared/components/header/header'
import PanelInfos from '@shared/components/panel-infos/panel-infos'
import NavigationPanel from '@/features/shared/components/panel-navigation/navigation-panel'
import {
  DashboardBackgroundCSS,
  DashboardCentralCSS
} from '@shared/generic/generic.style'

export default function Settings () {
  return (
    <div className={DashboardBackgroundCSS}>
      <Header />
      <div style={{ display: 'flex' }}>
        <NavigationPanel />
        <div className={DashboardCentralCSS}>
          <PanelInfos />
        </div>
      </div>
    </div>
  )
}
