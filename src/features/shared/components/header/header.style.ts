import { css } from '~styled-system/css'
import { githubStyleBg } from '@shared/generic/generic.style'

export const HeaderCSS = css({
  height: '6vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  ...githubStyleBg,
  padding: '0 2rem',
  color: 'white',
  fontFamily: 'system-ui, sans-serif',
  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: "6vh",
    left: 0,
    right: 0,
    height: '1px',
    background:
      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    zIndex: 1
  }
})

export const AvatarCSS = css({
  width: '42px',
  height: '42px',
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
    backgroundColor: '#48BB78', // vert "online"
    borderRadius: '50%'
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
  fontSize: '1rem'
})

export const UsernameText = css({
  fontSize: '1rem',
  fontWeight: '600'
})
