import { css } from '~styled-system/css'

export const DashboardCentralCSS = css({
  display: 'flex',
  height: '94vh',
  width: '90vw',
  flexDirection: 'column',
  boxSizing: 'border-box',
  '@media(max-width:1300px)': {
    width: '100vw',
    height: 'fit-content'
  }
})

export const githubStyleBg = {
  backgroundColor: '#0d1117',
  backgroundImage: `
  radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
  radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.03) 0%, transparent 50%)
  `
}

export const stripeStyleBg = {
  backgroundColor: '#0a0e1a',
  backgroundImage: `
  linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, transparent 50%),
  radial-gradient(circle at 50% 100%, rgba(16, 185, 129, 0.02) 0%, transparent 70%)
  `
}
export const tailwindStyleBg = {
  backgroundColor: '#111827',
  backgroundImage: `
  radial-gradient(circle at 75% 25%, rgba(55, 65, 81, 0.4) 0%, transparent 50%),
  radial-gradient(circle at 25% 75%, rgba(17, 24, 39, 0.8) 0%, transparent 50%)
  `
}

export const DashboardBackgroundCSS = css({
  position: 'relative',
  fontFamily: 'JBM-semibold',
  color: 'rgba(255, 255, 255, 0.85)',
  overflow: 'auto !important',
  boxSizing: 'border-box',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  ...githubStyleBg
})

export const SearchContainerCSS = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  boxSizing: 'border-box'
})

export const definitionTextCSS = css({
  color: '#f1f5f9',
  fontSize: '16.2px',
  lineHeight: '1.6',
  letterSpacing: '0.01em',
  padding: '0 10px 0 10px',
  fontFamily:
    'amazon, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',

  textRendering: 'optimizeLegibility',
  wordSpacing: '0.05em',
  wordBreak: 'break-word',
  hyphens: 'auto',

  // Espacement vertical pour aérer les longs textes
  marginBottom: '8px',
  maxHeight: '150px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '4px'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(148, 163, 184, 0.3)',
    borderRadius: '2px'
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

export const SquareParentCSS = css({
  display: 'flex',
  flexDirection: { base: 'column', md: 'row' },
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  gap: { base: '1.5rem', md: '0' }
})

export const definitionCardCSS = css({
  display: 'flex',
  gap: '12px',
  padding: '12px 14px',
  marginBottom: '6px',
  background: 'rgba(30, 41, 59, 0.5)',
  border: '1px solid rgba(148, 163, 184, 0.08)',
  borderRadius: '8px',
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  flexDirection: 'column', // Barre latérale subtile
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '3px',
    background:
      'linear-gradient(180deg, rgba(59, 130, 246, 0.6), rgba(59, 130, 246, 0.2))',
    borderRadius: '0 2px 2px 0',
    opacity: 0,
    transition: 'opacity 0.25s ease'
  },

  '&:hover': {
    background: 'rgba(30, 41, 59, 0.7)',
    borderColor: 'rgba(148, 163, 184, 0.15)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',

    '&::before': {
      opacity: 1
    }
  }
})

export const highlightedSyllableCSS = css({
  color: '#48cae4',
  fontWeight: '700',
  background: 'rgba(59, 130, 246, 0.15)',
  padding: '1px 2px',
  borderRadius: '2px',
  margin: '0 -1px',
  textTransform: 'uppercase'
})

export const toastErrorCSS = {
  background: '#d32f2f',
  color: 'white',
  padding: '8px 24px',
  fontSize: '14px',
  fontWeight: '500'
}
