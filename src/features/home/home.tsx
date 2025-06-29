import { useAuth } from '../auth/hooks/auth.hooks'
import Header from '../shared/components/header/header'
import PanelInfos from '../shared/components/panel-infos/panel-infos'
import NavigationPanel from '../shared/components/panel-navigation/navigation-panel'
import {
  DashboardBackgroundCSS,
  DashboardCentralCSS
} from '@shared/generic/generic.style'

import Typewriter from './type-writer'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className={DashboardBackgroundCSS}>
          <Header />
          <div style={{ display: 'flex' }}>
            <NavigationPanel />
            <div className={DashboardCentralCSS}>
            <Typewriter text={`Hello, ${user?.username}`} />
              <PanelInfos />
            </div>
          </div>
        </div>

  )
}

export default Home
