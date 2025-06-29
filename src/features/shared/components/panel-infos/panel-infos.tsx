import {
  PanelInfosCSS,
  InfoContentCSS,
  InfoIconCSS,
  InfoTextCSS,
  InfoBadgeCSS,
  LoadingSpinnerCSS,
  ErrorCSS,
  ErrorIconCSS
} from '@shared/components/panel-infos/panel-infos.style'
import { useSession } from '../../hooks/shared-session.hook'
import { memo, useMemo } from 'react'

// Icône de liste - mémorisée
const ListIcon = memo(() => (
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
))

// Icône d'erreur - mémorisée
const ErrorIcon = memo(() => (
  <svg
    className={ErrorIconCSS}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
  >
    <circle cx='12' cy='12' r='10' />
    <line x1='15' y1='9' x2='9' y2='15' />
    <line x1='9' y1='9' x2='15' y2='15' />
  </svg>
))

export default function PanelsInfos () {
  const { data, isLoading, error } = useSession()

  // Calcul mémorisé du nombre de listes
  const listsCount = useMemo(() => {
    return data?.data?.allListsDetails.listNames?.length || 0
  }, [data?.data?.allListsDetails.listNames?.length])

  // Texte mémorisé pour les listes
  const listsText = useMemo(() => {
    return `Liste${listsCount > 1 ? 's' : ''} trouvée${
      listsCount > 1 ? 's' : ''
    }`
  }, [listsCount])

  // Gestion du loading
  if (isLoading) {
    return (
      <div className={PanelInfosCSS}>
        <div className={InfoContentCSS}>
          <span className={LoadingSpinnerCSS} />
          <span className={InfoTextCSS}>Chargement...</span>
        </div>
      </div>
    )
  }

  // Gestion des erreurs
  if (error) {
    return (
      <div className={PanelInfosCSS}>
        <div className={ErrorCSS}>
          <ErrorIcon />
          <span>Erreur</span>
        </div>
      </div>
    )
  }

  return (
    <div className={PanelInfosCSS}>
      <div className={InfoContentCSS}>
        <ListIcon />
        <span className={InfoBadgeCSS}>{listsCount}</span>
        <span className={InfoTextCSS}>{listsText}</span>
      </div>
    </div>
  )
}
