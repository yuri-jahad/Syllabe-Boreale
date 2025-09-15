import { css } from '~styled-system/css'
import { githubStyleBg } from '@shared/generic/generic.style'

export const NavCSS = css({
  position: 'relative',
  height: '88vh',
  ...githubStyleBg,
  border: 'none',
  borderRight: '1px solid rgba(255, 255, 255, 0.06)',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingLeft: '24px',
  paddingRight: '24px',

  '@media (max-width: 1300px)': {
    display: 'none',
    position: 'fixed',
    boxSizing: 'border-box',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '1000',
    background: 'rgb(30, 41, 59)',

    '&.mobile-open': {
      display: 'flex'
    }
  }
})

export const UlCSS = css({
  display: 'flex',
  height: '300px',
  justifyContent: 'space-evenly',
  flexDirection: 'column',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  width: '100%',

  '@media (max-width: 1300px)': {
    height: 'auto',
    gap: '20px',
    paddingTop: '40px',
    justifyContent: 'center'
  }
})

export const AsideCSS = css({
  width: '10vw',
  '@media (max-width: 1300px)': {
    width: '0',
    height: '0',
    overflow: 'hidden',
    position: 'absolute'
  }
})

export const navLinkCSS = css({
  display: 'block',
  padding: '16px 0',
  cursor: 'pointer',
  transition: 'all 0.4s ease',
  textDecoration: 'none', 
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '13px',
  fontWeight: '500',
  textAlign: 'left',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  position: 'relative',

  '&::before': {
    content: '""',
    position: 'absolute',
    left: '-16px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.15)',
    transition: 'all 0.4s ease'
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    left: '0',
    bottom: '8px',
    width: '0',
    height: '1px',
    background: 'rgba(255, 255, 255, 0.4)',
    transition: 'width 0.4s ease'
  },

  '&:hover': {
    color: 'rgba(255, 255, 255, 0.8)',

    '&::before': {
      background: 'rgba(255, 255, 255, 0.6)',
      transform: 'translateY(-50%) scale(1.5)'
    },

    '&::after': {
      width: '60%'
    }
  },

  '@media (max-width: 1300px)': {
    fontSize: '16px',
    padding: '20px 0',
    textAlign: 'center',

    '&::before': {
      display: 'none'
    },

    '&::after': {
      left: '50%',
      transform: 'translateX(-50%)'
    },

    '&:hover::after': {
      width: '80%'
    }
  }
})

export const navLinkActiveCSS = css({
  color: 'rgba(255, 255, 255, 0.9)',
  fontWeight: '600',
  position: 'relative',
  textDecoration: 'line-through', 
  textDecorationColor: 'rgba(255, 255, 255, 0.7)',

  '&::before': {
    content: '""',
    position: 'absolute',
    left: '-16px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.7)',
    transform: 'translateY(-50%) scale(2)'
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    left: '0',
    bottom: '8px',
    width: '80%',
    height: '1px',
    background: 'rgba(255, 255, 255, 0.4)',
    transition: 'width 0.4s ease'
  },

  '&:hover': {
    '&::after': {
      width: '100%'
    }
  },

  '@media (max-width: 1300px)': {
    '&::before': {
      display: 'none'
    },

    '&::after': {
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80%'
    },

    '&:hover::after': {
      width: '100%'
    }
  }
})

export const BurgerButtonCSS = css({
  display: 'none',
  '@media (max-width: 1300px)': {
    display: 'flex',
    position: 'fixed',
    justifyContent: 'center',
    alignItems: 'center',
    top: '0vh',
    left: '0',
    zIndex: '1001',
    background: 'rgb(30, 41, 59)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '3px',
    padding: '12px',
    height: '6vh',
    cursor: 'pointer',
    flexDirection: 'column',
    gap: '4px',
    transition: 'all 0.3s ease',

    '&:hover': {
      background: 'rgb(45, 55, 75)',
      borderColor: 'rgba(255, 255, 255, 0.2)'
    }
  }
})

export const BurgerLineCSS = css({
  width: '20px',
  height: '2px',
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '1px',
  transition: 'all 0.3s ease'
})

export const LogoutDesktopCSS = css({
  display: 'block',

  '@media (max-width: 1300px)': {
    display: 'none'
  }
})

export const MobileLogoutCSS = css({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'none',

  '@media (max-width: 1300px)': {
    display: 'block'
  }
})

export const OverlayCSS = css({
  display: 'none',

  '@media (max-width: 1300px)': {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.8)',
    zIndex: '999',
    backdropFilter: 'blur(4px)',

    '&.open': {
      display: 'block'
    }
  }
})
