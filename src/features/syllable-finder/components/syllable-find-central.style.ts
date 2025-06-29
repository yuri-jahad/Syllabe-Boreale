import {
  githubStyleBg,
  stripeStyleBg,
  tailwindStyleBg
} from '@shared/generic/generic.style'
import { css } from '~styled-system/css'

export const topSectionCSS = css({
  display: 'flex',
  flexDirection: { base: 'column', lg: 'row' },
  gap: '20px',
  height: { base: 'auto', lg: '45%' },
  minHeight: '450px'
})

export const bottomSectionCSS = css({
  flex: 1,
  minHeight: '350px',
  height: { base: 'auto', lg: '55%' }
})

// Conteneur principal des trois blocs
export const threeBlocksContainerCSS = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: '1fr 1fr 1.5fr' },
  paddingTop: '12px',
  gap: '16px',
  height: '62vh',
  width: '85vw',
  maxWidth: '1600px',
  margin: '0 auto'
})

// Bloc de base
export const blockBaseCSS = css({
  padding: 0,
  borderRadius: '8px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
  background: 'rgba(15, 23, 42, 0.6)',
  border: '1px solid rgba(148, 163, 184, 0.08)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',

  '&:hover': {
    borderColor: 'rgba(64, 194, 255, 0.2)'
  }
})

// Headers des blocs
export const blockHeaderCSS = css({
  padding: '16px 20px',
  background: 'rgba(30, 41, 59, 0.6)',
  borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})

export const blockTitleCSS = css({
  color: '#f1f5f9',
  fontSize: '14px',
  fontWeight: '600',
  margin: 0
})

export const blockBadgeCSS = css({
  fontSize: '12px',
  color: '#94a3b8',
  background: 'rgba(59, 130, 246, 0.1)',
  padding: '2px 8px',
  borderRadius: '4px',
  fontWeight: '500'
})

// Contenus des blocs
export const blockContentCSS = css({
  flex: 1,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
})

export const blockScrollAreaCSS = css({
  flex: 1,
  overflowY: 'auto',
  padding: '8px 0',

  '&::-webkit-scrollbar': {
    width: '6px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(148, 163, 184, 0.03)',
    borderRadius: '3px'
  },
  '&::-webkit-scrollbar-thumb': {
    background:
      'linear-gradient(180deg, rgba(148, 163, 184, 0.25), rgba(148, 163, 184, 0.15))',
    borderRadius: '3px',
    border: '1px solid rgba(148, 163, 184, 0.08)',

    '&:hover': {
      background:
        'linear-gradient(180deg, rgba(148, 163, 184, 0.4), rgba(148, 163, 184, 0.25))'
    }
  }
})

// Items des listes - Espacement légèrement augmenté
export const listItemCSS = css({
  padding: '9px 16px',
  margin: '0',
  color: '#e2e8f0',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
  textTransform: 'uppercase',
  borderLeft: '3px solid transparent',
  borderBottom: '1px solid rgba(148, 163, 184, 0.06)',
  transition: 'all 0.2s ease',

  '&:hover': {
    background: 'rgba(30, 41, 59, 0.5)',
    borderLeftColor: 'rgba(59, 130, 246, 0.4)',
    color: '#ffffff'
  },

  '&:last-child': {
    borderBottom: 'none'
  }
})

export const listItemActiveCSS = css({
  background: 'rgba(59, 130, 246, 0.15)',
  borderLeftColor: '#3b82f6',
  color: '#ffffff',
  fontWeight: '600'
})

// Syllabe highlighting

// États vides et de chargement
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
  lineHeight: '1.6'
})

export const emptyStateIconCSS = css({
  fontSize: '48px',
  marginBottom: '16px',
  opacity: 0.3,
  filter: 'grayscale(100%)'
})

export const emptyStateTitleCSS = css({
  color: '#64748b',
  fontSize: '16px',
  fontWeight: '600',
  marginBottom: '8px'
})

export const emptyStateTextCSS = css({
  color: '#64748b',
  fontSize: '13px',
  lineHeight: '1.5',
  maxWidth: '280px'
})

export const loadingStateCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: '40px 20px',
  color: '#94a3b8',
  fontSize: '14px'
})

export const spinnerCSS = css({
  width: '24px',
  height: '24px',
  border: '2px solid rgba(148, 163, 184, 0.2)',
  borderTop: '2px solid #94a3b8',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginBottom: '12px',

  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
})


export const definitionHeaderCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px'
})

export const definitionNumberCSS = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  borderRadius: '4px',
  background: 'rgba(59, 130, 246, 0.15)',
  border: '1px solid rgba(59, 130, 246, 0.2)',
  color: '#93c5fd',
  fontSize: '11px',
  fontWeight: '700',
  flexShrink: 0
})

export const definitionSourceCSS = css({
  fontSize: '10px',
  color: '#64748b',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
  marginBottom: '0',
  padding: '2px 6px',
  background: 'rgba(148, 163, 184, 0.08)',
  borderRadius: '3px',
  display: 'inline-block',
  border: '1px solid rgba(148, 163, 184, 0.1)'
})

// Pagination
export const paginationContainerCSS = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  padding: '12px 16px',
  background: 'rgba(30, 41, 59, 0.4)',
  borderTop: '1px solid rgba(148, 163, 184, 0.1)'
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
  }
})

export const paginationInfoCSS = css({
  color: '#94a3b8',
  fontSize: '12px',
  fontWeight: '500',
  minWidth: '60px',
  textAlign: 'center'
})

// Styles pour compatibilité
export const SquareCSS = css({
  padding: 0,
  borderRadius: '8px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
  background: 'rgba(15, 23, 42, 0.6)',
  border: '1px solid rgba(148, 163, 184, 0.08)',
  transition: 'all 0.3s ease',

  '&:hover': {
    borderColor: 'rgba(64, 194, 255, 0.2)'
  },

  width: '85vw',
  height: '360px',
  '@media (min-width: 640px)': { width: '42vw', height: '380px' },
  '@media (min-width: 768px)': { width: '32vw', height: '420px' },
  '@media (min-width: 1024px)': { width: '34vw', height: '500px' }
})

export const SquareLeftCSS = css({
  margin: '0 12px 20px 0',
  '@media (min-width: 640px)': { margin: '0 20px 25px 0' },
  '@media (min-width: 768px)': { margin: '0 30px 35px 0' },
  '@media (min-width: 1024px)': { margin: '0 40px 40px 0' }
})

export const SquareRightCSS = css({
  transform: 'translateY(2%)',
  margin: '0 0 20px 12px',
  '@media (min-width: 640px)': {
    transform: 'translateY(3%)',
    margin: '0 0 25px 20px'
  },
  '@media (min-width: 768px)': {
    transform: 'translateY(5%)',
    margin: '0 0 35px 30px'
  },
  '@media (min-width: 1024px)': {
    transform: 'translateY(7%)',
    margin: '0 0 40px 40px'
  }
})

export const definitionsCardCSS = css({
  padding: 0,
  borderRadius: '8px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
  background: 'rgba(15, 23, 42, 0.6)',
  border: '1px solid rgba(148, 163, 184, 0.08)',
  height: '100%',
  width: '100%',
  transition: 'all 0.3s ease',

  '&:hover': {
    borderColor: 'rgba(64, 194, 255, 0.2)'
  }
})

export const SquareTitleCSS = css({
  padding: '16px 20px',
  background: 'rgba(30, 41, 59, 0.6)',
  borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
  color: '#f1f5f9',
  fontSize: '14px',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})

export const badgeCSS = css({
  fontSize: '12px',
  color: '#94a3b8',
  background: 'rgba(59, 130, 246, 0.1)',
  padding: '2px 8px',
  borderRadius: '4px',
  fontWeight: '500'
})

export const WordCSS = css({
  padding: '9px 16px',
  margin: '0',
  color: '#e2e8f0',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  textTransform: 'uppercase',
  borderLeft: '3px solid transparent',
  borderBottom: '1px solid rgba(148, 163, 184, 0.06)',
  transition: 'all 0.2s ease',

  '&:hover': {
    background: 'rgba(30, 41, 59, 0.5)',
    borderLeftColor: 'rgba(59, 130, 246, 0.4)',
    color: '#ffffff'
  },

  '&:last-child': {
    borderBottom: 'none'
  }
})

export const selectedWordCSS = css({
  background: 'rgba(59, 130, 246, 0.15)',
  borderLeftColor: '#3b82f6',
  color: '#ffffff',
  fontWeight: '600'
})

export const contentAreaCSS = css({
  height: 'calc(100% - 64px)',
  overflowY: 'auto',
  padding: '8px 0',

  '&::-webkit-scrollbar': {
    width: '6px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(148, 163, 184, 0.03)',
    borderRadius: '3px'
  },
  '&::-webkit-scrollbar-thumb': {
    background:
      'linear-gradient(180deg, rgba(148, 163, 184, 0.25), rgba(148, 163, 184, 0.15))',
    borderRadius: '3px',
    border: '1px solid rgba(148, 163, 184, 0.08)',

    '&:hover': {
      background:
        'linear-gradient(180deg, rgba(148, 163, 184, 0.4), rgba(148, 163, 184, 0.25))'
    }
  }
})

export const cleanAreaCSS = css({
  height: 'calc(100% - 64px)',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(15, 23, 42, 0.2)'
})

export const cleanContentCSS = css({
  flex: 1,
  overflowY: 'auto',
  padding: '0',

  '&::-webkit-scrollbar': {
    width: '6px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(148, 163, 184, 0.03)',
    borderRadius: '3px'
  },
  '&::-webkit-scrollbar-thumb': {
    background:
      'linear-gradient(180deg, rgba(148, 163, 184, 0.25), rgba(148, 163, 184, 0.15))',
    borderRadius: '3px',
    border: '1px solid rgba(148, 163, 184, 0.08)'
  }
})

export const compactMetaCSS = css({
  padding: '12px 18px',
  background:
    'linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(30, 41, 59, 0.4))',
  borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
  color: '#cbd5e1',
  fontSize: '12px',
  fontWeight: '600',
  textAlign: 'center',
  letterSpacing: '0.5px',
  position: 'relative',

  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '40px',
    height: '2px',
    background:
      'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)'
  }
})

export const sourcesRowCSS = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '7px',
  padding: '11px 16px',
  borderBottom: '1px solid rgba(148, 163, 184, 0.06)',
  background: 'rgba(30, 41, 59, 0.3)',
  justifyContent: 'center'
})

export const miniChipCSS = css({
  padding: '5px 9px',
  background: 'rgba(30, 41, 59, 0.7)',
  border: '1px solid rgba(148, 163, 184, 0.12)',
  borderRadius: '6px',
  color: '#cbd5e1',
  fontSize: '11px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  '&:hover': {
    background: 'rgba(30, 41, 59, 0.9)',
    borderColor: 'rgba(148, 163, 184, 0.2)',
    color: '#f1f5f9'
  }
})

export const miniChipActiveCSS = css({
  background: 'rgba(59, 130, 246, 0.2)',
  borderColor: 'rgba(59, 130, 246, 0.3)',
  color: '#93c5fd',

  '&:hover': {
    background: 'rgba(59, 130, 246, 0.25)'
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
  letterSpacing: '0.5px'
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

  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
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
  }
})

// Styles de table
export const tableContainerCSS = css({
  height: '70vh',
  ...stripeStyleBg,
  borderRadius: '8px',
  border: '1px solid rgba(148, 163, 184, 0.08)',
  overflow: 'hidden',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
})

export const sourceBadgeCSS = css({
  display: 'inline-block',
  padding: '4px 8px',
  background: 'rgba(148, 163, 184, 0.08)',
  color: '#64748b',
  fontSize: '11px',
  fontWeight: '600',
  borderRadius: '6px'
})

export const numberBadgeCSS = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  background: 'rgba(59, 130, 246, 0.1)',
  color: '#93c5fd',
  fontSize: '12px',
  fontWeight: '700',
  borderRadius: '12px'
})

export const selectedRowCSS = css({
  background: 'rgba(59, 130, 246, 0.1)',
  color: '#ffffff !important'
})

export const loadingTextCSS = css({
  color: '#f1f5f9',
  fontSize: '13px'
})

export const placeholderTextCSS = css({
  color: '#94a3b8',
  fontSize: '13px',
  fontStyle: 'italic'
})

// Bear container
export const bearContainerCSS = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px 0',

  '& svg': {
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
    transition: 'transform 0.3s ease',

    '&:hover': {
      transform: 'scale(1.02)'
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
  fontStyle: 'italic'
})
