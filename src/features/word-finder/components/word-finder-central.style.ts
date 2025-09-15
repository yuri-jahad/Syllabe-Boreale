import { css } from '~styled-system/css'
import { useStore } from '../../../store/store'

export const SquareCSS = css({
  padding: 0,
  borderRadius: '8px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
  background: 'rgba(15, 23, 42, 0.6)',
  border: '1px solid rgba(148, 163, 184, 0.08)',
  transition: 'all 0.3s ease',
  width: '34vw',
  height: '57vh',
  '&:hover': {
    borderColor: 'rgba(64, 194, 255, 0.2)'
  },

  '@media (max-width: 800px)': {
    width: '100%'
  }
})

export const SquareLeftCSS = css({
  margin: '0 0 16px 0',
  '@media (min-width: 1024px)': {
    margin: '0 40px 40px 0'
  }
})

export const SquareRightCSS = css({
  // Mobile
  transform: 'none',
  margin: '0 0 16px 0',
  '@media (min-width: 1024px)': {
    transform: 'translateY(7%)',
    margin: '0 0 40px 40px'
  }
})

export const SquareTitleCSS = css({
  padding: '10px 20px',
  background: 'rgba(30, 41, 59, 0.6)',
  borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
  color: '#f1f5f9',
  fontSize: '14px',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@media (max-width: 639px)': {
    padding: '12px 16px',
    fontSize: '13px'
  }
})

export const badgeCSS = css({
  fontSize: '12px',
  color: '#94a3b8',
  background: 'rgba(59, 130, 246, 0.1)',
  padding: '2px 8px',
  borderRadius: '4px',
  fontWeight: '500',

  // Seulement mobile qui change
  '@media (max-width: 639px)': {
    fontSize: '11px',
    padding: '1px 6px'
  }
})

export const WordCSS = css({
  padding: '10px 16px',
  margin: '2px 0',
  color: '#e2e8f0',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  textTransform: 'uppercase',
  borderLeft: '3px solid transparent',
  transition: 'all 0.2s ease',

  '&:hover': {
    background: 'rgba(30, 41, 59, 0.5)',
    borderLeftColor: 'rgba(59, 130, 246, 0.4)',
    color: '#ffffff'
  },

  // Seulement mobile qui change
  '@media (max-width: 639px)': {
    padding: '8px 12px',
    fontSize: '14px',
    margin: '1px 0'
  }
})

export const selectedWordCSS = css({
  background: 'rgba(59, 130, 246, 0.15)',
  borderLeftColor: '#3b82f6',
  color: '#ffffff',
  fontWeight: 'bold'
})



export const contentAreaCSS = css({
  height: 'calc(100% - 64px)',
  overflowY: 'auto',
  padding: '12px 16px 8px 16px',

  '&::-webkit-scrollbar': {
    width: '8px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(148, 163, 184, 0.05)',
    borderRadius: '4px'
  },
  '&::-webkit-scrollbar-thumb': {
    background:
      'linear-gradient(180deg, rgba(148, 163, 184, 0.3), rgba(148, 163, 184, 0.2))',
    borderRadius: '4px',
    border: '1px solid rgba(148, 163, 184, 0.1)',

    '&:hover': {
      background:
        'linear-gradient(180deg, rgba(148, 163, 184, 0.5), rgba(148, 163, 184, 0.3))'
    }
  },

  '@media (max-width: 640px)': {
    padding: '8px 12px 6px 12px',
    height: 'calc(100% - 56px)',

    '&::-webkit-scrollbar': {
      width: '4px'
    }
  }
})

export const cleanAreaCSS = css({
  height: 'calc(100% - 64px)',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(15, 23, 42, 0.2)',

  '@media (max-width: 640px)': {
    height: 'calc(100% - 56px)'
  }
})

export const cleanContentCSS = css({
  flex: 1,
  overflowY: 'auto',
  padding: '8px 16px',

  '&::-webkit-scrollbar': {
    width: '8px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(148, 163, 184, 0.05)',
    borderRadius: '4px'
  },
  '&::-webkit-scrollbar-thumb': {
    background:
      'linear-gradient(180deg, rgba(148, 163, 184, 0.3), rgba(148, 163, 184, 0.2))',
    borderRadius: '4px',
    border: '1px solid rgba(148, 163, 184, 0.1)'
  },

  '@media (max-width: 640px)': {
    padding: '6px 12px',

    '&::-webkit-scrollbar': {
      width: '4px'
    }
  }
})

export const definitionNumberCSS = css({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  borderRadius: '6px',
  background:
    'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1))',
  border: '1px solid rgba(59, 130, 246, 0.25)',
  color: '#93c5fd',
  fontSize: '12px',
  fontWeight: '700',
  flexShrink: 0,
  marginTop: '1px',
  boxShadow: '0 2px 4px rgba(59, 130, 246, 0.1)',

  '@media (max-width: 640px)': {
    width: '20px',
    height: '20px',
    fontSize: '11px'
  }
})

export const definitionSourceCSS = css({
  fontSize: '10px',
  color: '#64748b',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
  marginBottom: '6px',
  padding: '2px 6px',
  background: 'rgba(148, 163, 184, 0.08)',
  borderRadius: '3px',
  display: 'inline-block',
  border: '1px solid rgba(148, 163, 184, 0.1)',

  '@media (max-width: 640px)': {
    fontSize: '9px',
    padding: '1px 4px',
    marginBottom: '4px'
  }
})

export const sourcesRowCSS = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  padding: '14px 18px',
  borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
  background: 'rgba(30, 41, 59, 0.3)',
  justifyContent: 'center',

  '@media (max-width: 640px)': {
    padding: '10px 12px',
    gap: '6px'
  }
})

export const miniChipCSS = css({
  padding: '6px 10px',
  background: 'rgba(30, 41, 59, 0.7)',
  border: '1px solid rgba(148, 163, 184, 0.15)',
  borderRadius: '8px',
  color: '#cbd5e1',
  fontSize: '11px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.1), transparent)',
    transition: 'left 0.4s ease'
  },

  '&:hover': {
    background: 'rgba(30, 41, 59, 0.9)',
    borderColor: 'rgba(148, 163, 184, 0.25)',
    color: '#f1f5f9',
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',

    '&::before': {
      left: '100%'
    }
  },

  '@media (max-width: 640px)': {
    padding: '4px 8px',
    fontSize: '10px',
    borderRadius: '6px',

    '&:hover': {
      transform: 'none' // Désactive l'animation sur mobile
    }
  }
})

export const miniChipActiveCSS = css({
  background:
    'linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(59, 130, 246, 0.15))',
  borderColor: 'rgba(59, 130, 246, 0.4)',
  color: '#93c5fd',
  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)',

  '&:hover': {
    background:
      'linear-gradient(135deg, rgba(59, 130, 246, 0.35), rgba(59, 130, 246, 0.25))',
    transform: 'translateY(-1px)'
  },

  '@media (max-width: 640px)': {
    '&:hover': {
      transform: 'none'
    }
  }
})

export const filterStatusCSS = css({
  padding: '10px 18px',
  background:
    'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.08))',
  borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
  color: '#93c5fd',
  fontSize: '11px',
  fontWeight: '600',
  textAlign: 'center',
  letterSpacing: '0.5px',

  '@media (max-width: 640px)': {
    padding: '8px 12px',
    fontSize: '10px'
  }
})

export const emptyStateCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: '40px 20px',
  color: '#64748b',
  fontSize: '14px',
  textAlign: 'center',
  lineHeight: '1.6',

  '@media (max-width: 640px)': {
    padding: '30px 16px',
    fontSize: '13px'
  }
})

export const loadingDefCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: '40px 20px',
  color: '#94a3b8',
  fontSize: '14px',

  '& .spinner': {
    width: '24px',
    height: '24px',
    border: '2px solid rgba(148, 163, 184, 0.2)',
    borderTop: '2px solid #94a3b8',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '12px'
  },

  '@media (max-width: 640px)': {
    padding: '30px 16px',
    fontSize: '13px',

    '& .spinner': {
      width: '20px',
      height: '20px',
      marginBottom: '10px'
    }
  }
})

export const errorDefCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: '40px 20px',
  color: '#ef4444',
  fontSize: '14px',
  textAlign: 'center',
  background: 'rgba(239, 68, 68, 0.05)',
  borderRadius: '8px',
  margin: '16px',

  '&::before': {
    content: '"⚠️"',
    fontSize: '32px',
    marginBottom: '12px'
  },

  '@media (max-width: 640px)': {
    padding: '30px 16px',
    fontSize: '13px',
    margin: '12px',

    '&::before': {
      fontSize: '28px',
      marginBottom: '10px'
    }
  }
})

// Pagination élégante
export const paginationContainerCSS = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  padding: '12px 16px',
  background: 'rgba(30, 41, 59, 0.4)',
  borderTop: '1px solid rgba(148, 163, 184, 0.1)',

  '@media (max-width: 640px)': {
    padding: '10px 12px',
    gap: '8px'
  }
})

export const paginationButtonCSS = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  borderRadius: '6px',
  background: 'rgba(30, 41, 59, 0.6)',
  border: '1px solid rgba(148, 163, 184, 0.1)',
  color: '#cbd5e1',
  fontSize: '12px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  '&:hover:not(:disabled)': {
    background: 'rgba(59, 130, 246, 0.2)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    color: '#93c5fd'
  },

  '&:disabled': {
    opacity: 0.4,
    cursor: 'not-allowed'
  },

  '@media (max-width: 640px)': {
    width: '28px',
    height: '28px',
    fontSize: '11px',
    borderRadius: '4px'
  }
})

export const paginationInfoCSS = css({
  color: '#94a3b8',
  fontSize: '12px',
  fontWeight: '500',
  minWidth: '60px',
  textAlign: 'center',

  '@media (max-width: 640px)': {
    fontSize: '11px',
    minWidth: '50px'
  }
})

// Bear container redesigné
export const bearContainerCSS = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  '& svg': {
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
    transition: 'transform 0.3s ease',

    '&:hover': {
      transform: 'scale(1.02)'
    }
  },

  '@media (max-width: 640px)': {
    padding: '16px 0',

    '& svg': {
      '&:hover': {
        transform: 'none'
      }
    }
  }
})

export const moreIndicatorCSS = css({
  padding: '8px 16px',
  textAlign: 'center',
  fontSize: '12px',
  color: '#64748b',
  background: 'rgba(30, 41, 59, 0.3)',
  borderTop: '1px solid rgba(148, 163, 184, 0.1)',
  fontStyle: 'italic',

  '@media (max-width: 640px)': {
    padding: '6px 12px',
    fontSize: '11px'
  }
})

// Classes utilitaires pour mobile
export const mobileSquareCSS = css({
  '@media (max-width: 640px)': {
    margin: '8px',
    maxHeight: '300px',
    overflow: 'hidden'
  }
})

export const responsiveContainerCSS = css({
  '@media (max-width: 640px)': {
    padding: '8px',
    gap: '8px'
  }
})
