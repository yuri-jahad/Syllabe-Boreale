import { css } from '~styled-system/css'
import { githubStyleBg, stripeStyleBg } from '@shared/generic/generic.style';

// ===== NAVIGATION ALIGNÉE À GAUCHE AVEC SÉPARATEUR =====
export const NavCSS = css({
  height: '88vh',
  // background: 'transparent',
  
  
  ...githubStyleBg,
  border: 'none',
  borderRight: '1px solid rgba(255, 255, 255, 0.06)', // Plus fine : 0.15 → 0.06
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingLeft: '24px',
  paddingRight: '24px',
  position: 'relative'
})

export const UlCSS = css({
  display: 'flex',
  height: '300px',
  justifyContent: 'space-evenly',
  flexDirection: 'column',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  width: '100%'
})

export const AsideCSS = css({
  width: '10vw' // Encore plus réduit : 12vw → 10vw
})

export const navLinkCSS = css({
  display: 'block',
  padding: '16px 0',
  cursor: 'pointer',
  transition: 'all 0.4s ease', // Plus lent : 0.2s → 0.4s
  textDecoration: 'none',
  color: 'rgba(255, 255, 255, 0.5)', // Plus doux
  fontSize: '13px',
  fontWeight: '500',
  textAlign: 'left',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  position: 'relative',

  // Point décoratif à gauche - couleur plus douce
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '-16px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.15)', // Plus discret
    transition: 'all 0.4s ease' // Plus lent
  },

  // Ligne qui grandit depuis la gauche - couleur plus douce
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '0',
    bottom: '8px',
    width: '0',
    height: '1px',
    background: 'rgba(255, 255, 255, 0.4)', // Blanc clair au lieu de bleu
    transition: 'width 0.4s ease' // Plus lent
  },

  '&:hover': {
    color: 'rgba(255, 255, 255, 0.8)', // Plus doux

    '&::before': {
      background: 'rgba(255, 255, 255, 0.6)', // Blanc clair
      transform: 'translateY(-50%) scale(1.5)'
    },

    '&::after': {
      width: '60%'
    }
  }
})

export const navLinkActiveCSS = css({
  color: 'rgba(255, 255, 255, 0.9)', // Blanc au lieu de bleu
  fontWeight: '600',

  '&::before': {
    background: 'rgba(255, 255, 255, 0.7)', // Blanc clair
    transform: 'translateY(-50%) scale(2)'
  },

  '&::after': {
    width: '80%'
  },

  '&:hover': {
    '&::after': {
      width: '100%'
    }
  }
})
