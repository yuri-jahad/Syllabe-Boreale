import { css } from '~styled-system/css'

export const ListsGalleryCSS = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  backdropFilter: 'blur(20px)',
  borderTop: '1px solid #334155',
  borderBottom: '1px solid #1e293b',
  padding: '14px 18px',
  overflowX: 'auto',
  overflowY: 'hidden',
  flexWrap: 'nowrap',
  boxShadow: '0 -2px 20px rgba(0, 0, 0, 0.25)',
  '&::-webkit-scrollbar': {
    height: '3px'
  },
  '&::-webkit-scrollbar-track': {
    background: '#1e293b'
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#475569',
    borderRadius: '2px',
    '&:hover': {
      background: '#64748b'
    }
  },

  '@media (max-width: 599px)': {
    marginTop: '16px',
    padding: '10px 14px',
    gap: '6px',
    justifyContent: 'center',
    '&::-webkit-scrollbar': { height: '2px' }
  },

  '@media (min-width: 600px)': {
    position: 'absolute',
    bottom: '6vh',
    padding: '14px 18px',
    gap: '8px',
    borderRadius: '8px 8px 0 0',
    zIndex: 999
  },

  // Écrans moyens - SANS menu (100vw centré)
  '@media (min-width: 600px) and (max-width: 1299px)': {
    width: '100vw',
    maxWidth: '100vw',
    left: '50%',
    transform: 'translateX(-50%)', // CENTRÉ sur l'écran complet
    borderRadius: '0'
  },

  // Grands écrans - AVEC menu (centré sur la zone visible)
  '@media (min-width: 1300px)': {
    width: '50vw',
    maxWidth: '90vw',
    left: '55vw', 
    transform: 'translateX(-50%)', // Centrer l'élément sur ce point
    borderRadius: '8px 8px 0 0'
  }
})

export const ListCSS = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: '7px 16px',
  minWidth: '60px',
  maxWidth: '100px',
  height: '30px',
  fontSize: '11px',
  fontWeight: '500',
  letterSpacing: '0.025em',
  background: '#1e293b',
  border: '1px solid #334155',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  flexShrink: 0,
  userSelect: 'none',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',

  '&:hover': {
    background: '#334155',
    borderColor: '#475569',
    color: '#f1f5f9',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
  },

  '@media (max-width: 599px)': {
    padding: '3px 6px',
    minWidth: '35px',
    maxWidth: '60px',
    height: '20px',
    fontSize: '9px',
    borderRadius: '3px',
    '&:hover': {
      transform: 'none',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)'
    }
  },

  '@media (min-width: 600px) and (max-width: 899px)': {
    padding: '5px 10px',
    minWidth: '55px',
    maxWidth: '90px',
    height: '26px',
    fontSize: '10px',
    borderRadius: '5px'
  },

  '@media (min-width: 900px) and (max-width: 1299px)': {
    padding: '6px 12px',
    minWidth: '60px',
    maxWidth: '100px',
    height: '28px',
    fontSize: '11px',
    borderRadius: '6px'
  },

  '@media (min-width: 1300px)': {
    padding: '8px 16px',
    minWidth: '70px',
    maxWidth: '120px',
    height: '32px',
    fontSize: '12px',
    borderRadius: '8px'
  }
})

export const ListSelectedCSS = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: '7px 16px',
  minWidth: '60px',
  maxWidth: '100px',
  height: '30px',
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '0.025em',
  color: '#ffffff',
  background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
  border: '1px solid #3b82f6',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  flexShrink: 0,
  userSelect: 'none',
  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',

  '@media (max-width: 599px)': {
    padding: '3px 6px',
    minWidth: '35px',
    maxWidth: '60px',
    height: '20px',
    fontSize: '9px',
    borderRadius: '3px',
    '&:hover': {
      transform: 'none',
      boxShadow: '0 1px 6px rgba(59, 130, 246, 0.2)'
    }
  },

  '@media (min-width: 600px) and (max-width: 899px)': {
    padding: '5px 10px',
    minWidth: '55px',
    maxWidth: '90px',
    height: '26px',
    fontSize: '10px',
    borderRadius: '5px'
  },

  '@media (min-width: 900px) and (max-width: 1299px)': {
    padding: '6px 12px',
    minWidth: '60px',
    maxWidth: '100px',
    height: '28px',
    fontSize: '11px',
    borderRadius: '6px'
  },

  '@media (min-width: 1300px)': {
    padding: '8px 16px',
    minWidth: '70px',
    maxWidth: '120px',
    height: '32px',
    fontSize: '12px',
    borderRadius: '8px'
  }
})

export const containerWithGalleryCSS = css({
  '@media (min-width: 600px)': {
    position: 'relative',
    minHeight: '100vh',
    paddingBottom: 'calc(6vh + 80px)'
  }
})
