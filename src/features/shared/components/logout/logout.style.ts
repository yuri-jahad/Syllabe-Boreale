import { css } from '~styled-system/css'
import { githubStyleBg } from '@shared/generic/generic.style';

export const LogoutCSS = css({
  height: '6vh',
  ...githubStyleBg,
  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background:
      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
    zIndex: 1
  }
})

export const buttonCSS = css({
  width: '100%',
  height: '100%',
  background: 'transparent',
  border: 'none',
  color: 'rgba(255, 255, 255, 0.85)',
  fontSize: '13px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  textTransform: 'uppercase',
  letterSpacing: '1.8px',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
    transition: 'left 0.6s ease',
    zIndex: 0
  },

  '&:hover': {
    color: 'rgba(255, 255, 255, 1)',
    textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',

    '&::before': {
      left: '100%'
    }
  },

  '&:active': {
    transform: 'scale(0.95)',
    transition: 'transform 0.1s ease'
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    textShadow: 'none',

    '&:hover::before': {
      left: '-100%'
    }
  }
})

export const buttonContentCSS = css({
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
})

export const iconCSS = css({
  width: '16px',
  height: '16px',
  opacity: 0.9,
  transition: 'all 0.3s ease',

  '&:hover': {
    opacity: 1,
    transform: 'translateX(2px)'
  }
})

export const spinnerCSS = css({
  width: '16px',
  height: '16px',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  borderTop: '2px solid rgba(255, 255, 255, 1)',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
})

export const minimalContainerCSS = css({
  height: '6vh',
  background: 'rgba(15, 23, 42, 0.3)',
  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  width: '100%',
  backdropFilter: 'blur(8px)'
})

export const minimalButtonCSS = css({
  width: '100%',
  height: '100%',
  background: 'transparent',
  border: 'none',
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '12px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  textTransform: 'uppercase',
  letterSpacing: '1.2px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    color: 'rgba(255, 255, 255, 0.95)',
    background: 'rgba(255, 255, 255, 0.05)'
  },

  '&:disabled': {
    opacity: 0.4,
    cursor: 'not-allowed'
  }
})
