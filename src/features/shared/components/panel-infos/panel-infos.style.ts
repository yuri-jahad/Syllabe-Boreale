import { FlexCSS } from '@shared/generic/generic.token'
import { css } from '~styled-system/css'
import { githubStyleBg } from '@shared/generic/generic.style'

export const PanelInfosCSS = css({
  position: 'absolute',
  bottom: '0',
  height: '6vh',
  width: '90vw',
  ...githubStyleBg,
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderBottom: 'none',
  ...FlexCSS.center
})

export const InfoContentCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: 'rgba(255, 255, 255, 0.75)',
  fontSize: '12px',
  fontWeight: '500',
  letterSpacing: '1px',
  textTransform: 'uppercase'
})

export const InfoIconCSS = css({
  width: '14px',
  height: '14px',
  opacity: 0.8,
  transition: 'opacity 0.3s ease',

  '&:hover': {
    opacity: 1
  }
})

export const InfoTextCSS = css({
  color: 'rgba(255, 255, 255, 0.75)',
  fontSize: '12px',
  fontWeight: '500'
})

export const InfoBadgeCSS = css({
  background: 'rgba(255, 255, 255, 0.12)',
  color: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: '600',
  minWidth: '18px',
  textAlign: 'center',
  border: '1px solid rgba(255, 255, 255, 0.08)'
})

export const LoadingSpinnerCSS = css({
  width: '12px',
  height: '12px',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  borderTop: '2px solid rgba(255, 255, 255, 0.8)',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginRight: '6px',

  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
})

export const ErrorCSS = css({
  color: 'rgba(239, 68, 68, 0.9)',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '12px',
  fontWeight: '500'
})

export const ErrorIconCSS = css({
  width: '14px',
  height: '14px',
  color: 'rgba(239, 68, 68, 0.8)'
})
