import { DashboardBackgroundCSS } from '../../generic/generic.style'
import Header from '@shared/components/header/header'
import NavigationPanel from '@shared/components/panel-navigation/navigation-panel'
import { css } from '~styled-system/css'
import PanelInfos from '../panel-infos/panel-infos'
import { PropsWithChildren } from 'react'
export default function Scene ({ children }: PropsWithChildren) {
  return (
    <>
      <div className={DashboardBackgroundCSS}>
        <Header />
        <div
          className={css({
            display: 'flex',
            flex: 1,
            overflow: 'hidden'
          })}
        >
          <NavigationPanel />
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              overflow: 'hidden',
            })}
          >
            <div
              className={css({
                flex: 1,
                overflow:'hidden',
                width: '100%',
                padding:'0 24px 0 24px',
                margin: '0 auto',
                '@media:(max-width:1300px)': {
                  overflowY: 'auto',
                  width: '100vw'
                }
              })}
            >
              {children}
            </div>
            <PanelInfos /> {/* Déplace ici, dans le conteneur de droite */}
          </div>
        </div>
      </div>
    </>
  )
}
