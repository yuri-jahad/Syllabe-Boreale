import { FlexCSS } from '@shared/generic/generic.token'
import { css } from '~styled-system/css'

export const PanelInfosCSS = css({
  height: '6vh',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderBottom: 'none',
  ...FlexCSS.center,
  zIndex: 10,

  '@media(max-width: 480px)': {
    width: '100vw',
    height: '7vh',
  },

  '@media(max-width: 1300px)': {
    width: '100vw'
  }
})

export const InfoContainerCSS = css({
  alignItems: 'center',

  '@media(max-width: 480px)': {
    width: '100%',
    padding: '0 8px',
    gap: '4px'
  },

  '@media(min-width: 481px) and (max-width: 768px)': {
    width: '95%',
    padding: '0 12px'
  },

  '@media(min-width: 769px) and (max-width: 1024px)': {
    width: '90%'
  }
})

export const CenterSectionCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  flex: '1 1 auto',
  justifyContent: 'center',
  minWidth: '0',

  '@media(max-width: 480px)': {
    gap: '4px',
  },

  '@media(min-width: 481px) and (max-width: 768px)': {
    gap: '8px'
  }
})

// Styles pour les icônes
export const InfoIconCSS = css({
  width: '12px',
  height: '12px',
  opacity: 0.8,
  transition: 'opacity 0.3s ease',
  flexShrink: 0,

  '&:hover': {
    opacity: 1
  },

  '@media(max-width: 480px)': {
    width: '10px',
    height: '10px'
  },

  '@media(min-width: 481px) and (max-width: 768px)': {
    width: '13px',
    height: '13px'
  },

  '@media(min-width: 769px) and (max-width: 1024px)': {
    width: '14px',
    height: '14px'
  },

  '@media(min-width: 1025px) and (max-width: 1300px)': {
    width: '16px',
    height: '16px'
  }
})

export const InfoTextCSS = css({
  color: 'rgba(255, 255, 255, 0.75)',
  fontSize: '11px',
  fontWeight: '500',
  whiteSpace: 'nowrap',

  '@media(max-width: 480px)': {
    fontSize: '9px',
    textAlign: 'center',
    whiteSpace: 'normal'
  },

  '@media(min-width: 481px) and (max-width: 768px)': {
    fontSize: '12px'
  },

  '@media(min-width: 769px) and (max-width: 1024px)': {
    fontSize: '12px'
  },

  '@media(min-width: 1025px) and (max-width: 1300px)': {
    fontSize: '14px',
    fontWeight: '600'
  }
})

export const InfoBadgeCSS = css({
  background: 'rgba(255, 255, 255, 0.12)',
  color: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 4px',
  borderRadius: '3px',
  fontSize: '10px',
  fontWeight: '600',
  minWidth: '16px',
  textAlign: 'center',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  flexShrink: 0,

  '@media(max-width: 480px)': {
    padding: '1px 3px',
    fontSize: '8px',
    minWidth: '14px',
    borderRadius: '2px'
  },

  '@media(min-width: 481px) and (max-width: 768px)': {
    padding: '2px 5px',
    fontSize: '11px',
    minWidth: '18px',
    borderRadius: '4px'
  },

  '@media(min-width: 769px) and (max-width: 1024px)': {
    padding: '2px 6px',
    fontSize: '11px',
    minWidth: '18px'
  },

  '@media(min-width: 1025px) and (max-width: 1300px)': {
    fontSize: '13px',
    padding: '4px 8px',
    minWidth: '24px'
  }
})

export const StatusIndicatorCSS = css({
  fontSize: '10px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  textAlign: 'center',

  '@media(max-width: 480px)': {
    fontSize: '8px',
    letterSpacing: '0.3px'
  },

  '@media(min-width: 481px) and (max-width: 768px)': {
    fontSize: '11px'
  },

  '@media(min-width: 769px) and (max-width: 1024px)': {
    fontSize: '11px'
  },

  '@media(min-width: 1025px) and (max-width: 1300px)': {
    fontSize: '12px'
  }
})

// Styles pour les états de chargement/erreur
export const LoadingSpinnerCSS = css({
  width: '10px',
  height: '10px',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  borderTop: '2px solid rgba(255, 255, 255, 0.8)',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginRight: '4px',
  flexShrink: 0,

  '@media(max-width: 480px)': {
    width: '8px',
    height: '8px',
    marginRight: '2px'
  },

  '@media(min-width: 481px) and (max-width: 768px)': {
    width: '11px',
    height: '11px',
    marginRight: '5px'
  },

  '@media(min-width: 769px) and (max-width: 1024px)': {
    width: '12px',
    height: '12px',
    marginRight: '6px'
  },

  '@media(min-width: 1025px) and (max-width: 1300px)': {
    width: '14px',
    height: '14px',
    marginRight: '8px'
  }
})

export const ErrorCSS = css({
  color: 'rgba(239, 68, 68, 0.9)',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '11px',
  fontWeight: '500',

  '@media(max-width: 480px)': {
    gap: '2px',
    fontSize: '9px',
    flexDirection: 'column'
  },

  '@media(min-width: 481px) and (max-width: 768px)': {
    gap: '5px',
    fontSize: '12px'
  },

  '@media(min-width: 769px) and (max-width: 1024px)': {
    gap: '6px',
    fontSize: '12px'
  },

  '@media(min-width: 1025px) and (max-width: 1300px)': {
    fontSize: '14px',
    gap: '8px'
  }
})
