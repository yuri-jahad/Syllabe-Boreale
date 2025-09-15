import { css } from '~styled-system/css'

export const titleAreaStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',

  '@media (min-width: 480px)': {
    gap: '10px'
  },

  '@media (min-width: 768px)': {
    gap: '12px'
  }
})

export const titleStyle = css({
  color: '#f8fafc',
  fontSize: '18px',
  fontWeight: '600',
  margin: 0,
  lineHeight: '1.2',

  '@media (min-width: 480px)': {
    fontSize: '20px'
  },

  '@media (min-width: 768px)': {
    fontSize: '22px'
  },

  '@media (min-width: 1024px)': {
    fontSize: '24px'
  }
})

export const subtitleStyle = css({
  color: '#64748b',
  fontSize: '12px',
  marginTop: '2px',
  lineHeight: '1.3',

  '@media (min-width: 480px)': {
    fontSize: '13px',
    marginTop: '3px'
  },

  '@media (min-width: 768px)': {
    fontSize: '14px',
    marginTop: '4px'
  }
})

export const statsAreaStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '11px',
  color: '#94a3b8',
  flexWrap: 'wrap',

  '@media (min-width: 480px)': {
    gap: '12px',
    fontSize: '12px'
  },

  '@media (min-width: 768px)': {
    gap: '16px',
    flexWrap: 'nowrap'
  }
})

export const pageHeaderStyle = css({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  padding: '8px 16px',

  '@media (min-width: 480px)': {
    padding: '10px 20px',
    gap: '10px'
  },

  '@media (min-width: 640px)': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '16px'
  },

  '@media (min-width: 768px)': {
    padding: '10px 0',
    width: 'min(100%, 1400px)'
  },

  '@media (min-width: 1300px)': {
    padding: '10px 0'
  }
})

export const statItemStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
  padding: '4px 6px',
  background: 'rgba(30, 41, 59, 0.4)',
  borderRadius: '4px',
  border: '1px solid rgba(148, 163, 184, 0.1)',
  fontSize: '10px',
  whiteSpace: 'nowrap',

  '& .value': {
    color: '#e2e8f0',
    fontWeight: '600'
  },

  '@media (min-width: 480px)': {
    gap: '4px',
    padding: '5px 8px',
    borderRadius: '5px',
    fontSize: '11px'
  },

  '@media (min-width: 768px)': {
    gap: '4px',
    padding: '6px 10px',
    borderRadius: '6px',
    fontSize: '12px'
  }
})
