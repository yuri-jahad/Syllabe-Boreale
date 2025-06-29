import { css } from '~styled-system/css'

export const titleAreaStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
})

export const titleStyle = css({
  color: '#f8fafc',
  fontSize: '24px',
  fontWeight: '600',
  margin: 0
})

export const subtitleStyle = css({
  color: '#64748b',
  fontSize: '14px',
  marginTop: '4px'
})

export const statsAreaStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  fontSize: '12px',
  color: '#94a3b8'
})

export const pageHeaderStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 'min(100%, 1400px)',
  padding: '10px 0 10px',
})


export const statItemStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '6px 10px',
  background: 'rgba(30, 41, 59, 0.4)',
  borderRadius: '6px',
  border: '1px solid rgba(148, 163, 184, 0.1)',

  '& .value': {
    color: '#e2e8f0',
    fontWeight: '600'
  }
})
