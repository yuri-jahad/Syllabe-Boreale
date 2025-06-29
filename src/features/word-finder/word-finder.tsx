import Header from '@features/shared/components/header/header'
import WordInfos from '@/features/word-finder/components/word-finder-infos'
import { css } from '~styled-system/css'
import NavigationPanel from '@/features/shared/components/panel-navigation/navigation-panel'
import { DashboardBackgroundCSS } from '@shared/generic/generic.style'


export default function WordFinder () {
  return (
    <div className={DashboardBackgroundCSS}>
      <div>
        <Header />
        <div className={css({ display: 'flex' })}>
          <NavigationPanel />
          <WordInfos />
        </div>
      </div>
    </div>
  )
}
