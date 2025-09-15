import { css } from '~styled-system/css'
import { githubStyleBg } from '@shared/generic/generic.style'

export const HeaderCSS = css({
  position: 'relative',
  margin:'0',
  height: '6vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', 
  ...githubStyleBg,
  color: 'white',
  fontFamily: 'system-ui, sans-serif',
  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '6vh',
    left: 0,
    right: 0,
    height: '1px',
    background:
      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    zIndex: 1
  },
  '@media(max-width:1250px)': {
    padding: '5px'
  }
})

export const HeaderContentCSS = css({
  position: 'absolute',
  left: '0',
  right: '0',
  top: '0',
  bottom: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding:'0px 24px',

  '@media(max-width:1250px)': {
    padding: '5px' // Même responsive que le header
  }
})


export const AvatarCSS = css({
  width: '40px',
  height: '40px',
  borderRadius: '9999px',
  objectFit: 'cover',
  boxShadow: '0 0 4px rgba(255, 255, 255, 0.15)',
  position: 'relative',
  transition: 'transform 0.2s ease-in-out',

  _hover: {
    transform: 'scale(1.05)',
    boxShadow: '0 0 8px rgba(255, 255, 255, 0.25)'
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '10px',
    height: '10px',
    backgroundColor: '#48BB78',
    borderRadius: '50%'
  },
  '@media (max-width:750px)': {
    width: '30px',
    height: '30px'
  }
})

export const UserSection = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem'
})

export const RoleText = css({
  textTransform: 'capitalize',
  fontWeight: '500',
  fontSize: '1rem',
  '@media (max-width:1250px)': {
    marginLeft: '55px'
  }
})

export const UsernameText = css({
  fontSize: '1rem',
  fontWeight: '600'
})
