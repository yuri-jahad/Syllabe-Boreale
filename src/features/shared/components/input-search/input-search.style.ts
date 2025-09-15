import { css } from '~styled-system/css'

export const searchContainerCSS = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  width: '100%',
  maxWidth: '500px'
})

export const inputWrapperCSS = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  background: 'transparent',
  border: 'none',
  borderBottom: '2px solid rgba(148, 163, 184, 0.2)',
  borderRadius: '0',
  padding: '16px 8px 12px 0',
  transition: 'border-color 0.3s ease',

  '&:hover': {
    borderBottomColor: 'rgba(148, 163, 184, 0.4)'
  },

  '&.focused': {
    borderBottomColor: 'rgba(59, 130, 246, 0.6)'
  }
})

export const searchIconCSS = css({
  width: '20px',
  height: '20px',
  marginRight: '14px',
  color: 'rgba(148, 163, 184, 0.6)',
  flexShrink: 0,
  transition: 'color 0.3s ease',

  '.focused &': {
    color: 'rgba(59, 130, 246, 0.8)'
  }
})

export const modernInputCSS = css({
  flex: 1,
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#f8fafc',
  fontSize: '16px',
  fontWeight: '400',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  lineHeight: '1.5',
  padding: '0',

  '&::placeholder': {
    color: 'rgba(148, 163, 184, 0.5)',
    fontWeight: '400'
  },

  '&:focus::placeholder': {
    color: 'rgba(148, 163, 184, 0.3)'
  },

  // Autofill
  '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus': {
    WebkitTextFillColor: '#f8fafc !important',
  }
})

export const clearButtonCSS = css({
  width: '20px',
  height: '20px',
  marginLeft: '10px',
  background: 'none',
  border: 'none',
  color: 'rgba(148, 163, 184, 0.5)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  flexShrink: 0,
  transition: 'all 0.2s ease',
  opacity: 0,
  borderRadius: '50%',

  '&.visible': {
    opacity: 1
  },

  '&:hover': {
    color: '#ef4444',
    background: 'rgba(148, 163, 184, 0.1)',
    transform: 'scale(1.1)'
  }
})

export const metaInfoCSS = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px 0 0 0',
  minHeight: '18px'
})

export const counterCSS = css({
  fontSize: '11px',
  color: 'rgba(148, 163, 184, 0.5)',
  fontWeight: '500',
  fontFamily: 'monospace',

  '&.warning': {
    color: 'rgba(245, 158, 11, 0.7)'
  },

  '&.error': {
    color: 'rgba(239, 68, 68, 0.7)'
  }
})

export const suggestionCSS = css({
  fontSize: '11px',
  color: 'rgba(148, 163, 184, 0.5)',
  fontWeight: '400',
  fontStyle: 'italic'
})