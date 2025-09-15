import {
  PanelInfosCSS,
  InfoContainerCSS,
  CenterSectionCSS,
  InfoIconCSS,
  InfoTextCSS,
  InfoBadgeCSS
} from '@shared/components/panel-infos/panel-infos.style'
import { useSession } from '../../hooks/shared-session.hook'
import { memo, useEffect, useState, useMemo } from 'react'

const ListIcon = () => (
  <svg
    className={InfoIconCSS}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
  >
    <line x1='8' y1='6' x2='21' y2='6' />
    <line x1='8' y1='12' x2='21' y2='12' />
    <line x1='8' y1='18' x2='21' y2='18' />
    <line x1='3' y1='6' x2='3.01' y2='6' />
    <line x1='3' y1='12' x2='3.01' y2='12' />
    <line x1='3' y1='18' x2='3.01' y2='18' />
  </svg>
)

const ClockIcon = () => (
  <svg
    className={InfoIconCSS}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
  >
    <circle cx='12' cy='12' r='10' />
    <polyline points='12,6 12,12 16,14' />
  </svg>
)

function PanelsInfos () {
  const { data, isLoading, error } = useSession()

  const listsCount = data?.data?.allListsDetails.listNames?.length || 0
  const isPlural = listsCount > 1

  const centerSection = (
    <div className={CenterSectionCSS}>
      <ListIcon />
      <span className={InfoBadgeCSS}>
        {isLoading ? '0' : error ? '!' : listsCount}
      </span>
      <span className={InfoTextCSS}>
        {isLoading
          ? 'Loading...'
          : error
          ? 'Loading error'
          : `List${isPlural ? 's' : ''} found`}
      </span>
    </div>
  )

  return (
    <div className={PanelInfosCSS}>
      <div className={InfoContainerCSS}>{centerSection}</div>
    </div>
  )
}

export default memo(PanelsInfos)