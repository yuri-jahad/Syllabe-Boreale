import { css } from '~styled-system/css'
import { FlexCSS } from '../shared/generic/generic.token'

// 🎨 Design Tokens - Palette raffinée et moderne
export const colors = {
  bg: '#0a0f1c',
  panel: '#111827',
  card: '#1a202c',
  cardHover: '#252d3a',
  border: '#2d3748',
  borderLight: '#4a5568',
  text: '#f7fafc',
  textMuted: '#a0aec0',
  textSubtle: '#718096',
  hover: '#1e2733',
  accent: '#4f46e5',
  accentHover: '#5b54ee',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6'
}

export const settingsCSS = css({
  ...FlexCSS.center,
  height: '88vh',
  padding: '0 16px',
  '@media (max-width: 1024px)': {
    height: 'auto',
    minHeight: '100vh',
    padding: '16px'
  }
})

const shadows = {
  xs: '0 1px 3px rgba(0, 0, 0, 0.12)',
  sm: '0 2px 8px rgba(0, 0, 0, 0.15)',
  md: '0 4px 16px rgba(0, 0, 0, 0.18)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.22)',
  glow: '0 0 0 2px rgba(79, 70, 229, 0.3)',
  glowSuccess: '0 0 0 2px rgba(16, 185, 129, 0.3)'
}

const transitions = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
const spacing = {
  xs: '6px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px'
}

export const settingsContainerCSS = css({
  margin: '0 auto',
  background: colors.bg,
  borderRadius: '12px',
  border: `1px solid ${colors.border}`,
  boxShadow: shadows.lg,
  display: 'flex',
  height: '82vh',
  maxWidth: '1400px',
  width: '98vw',
  overflow: 'hidden',
  transition: transitions,
  backdropFilter: 'blur(20px)',
  '@media(max-width:1300px)': {
    width: '99vw'
  },
  '@media (max-width: 1024px)': {
    flexDirection: 'column',
    borderRadius: '8px',
    height: 'auto',
    minHeight: '80vh',
    maxHeight: 'none',
    overflow: 'visible'
  },
  '@media (max-width: 640px)': {
    width: '100%',
    margin: '0',
    borderRadius: '0',
    minHeight: '100vh',
    height: 'auto'
  }
})

export const sidebarCSS = css({
  width: '240px',
  minWidth: '240px',
  background: `linear-gradient(180deg, ${colors.panel} 0%, ${colors.bg} 100%)`,
  borderRight: `1px solid ${colors.border}`,
  transition: transitions,
  overflowY: 'auto',
  '@media (max-width: 1024px)': {
    width: '100%',
    minWidth: '100%',
    borderRight: 'none',
    borderBottom: `1px solid ${colors.border}`,
    overflowY: 'visible',
    flexShrink: 0
  }
})

export const sidebarContentCSS = css({
  padding: spacing.lg,
  '@media (max-width: 640px)': {
    padding: spacing.md
  }
})

export const menuItemCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
  padding: `${spacing.sm} ${spacing.md}`,
  fontSize: '14px',
  fontWeight: '500',
  color: colors.textMuted,
  cursor: 'pointer',
  borderRadius: '8px',
  transition: transitions,
  marginBottom: '2px',
  '&:hover': {
    backgroundColor: colors.hover,
    color: colors.text,
    transform: 'translateX(2px)'
  },
  '&:focus': {
    outline: 'none',
    boxShadow: shadows.glow
  }
})

export const menuItemActiveCSS = css({
  backgroundColor: colors.accent,
  color: '#ffffff',
  fontWeight: '600',
  boxShadow: shadows.sm,
  '&:hover': {
    backgroundColor: colors.accentHover,
    transform: 'none'
  }
})

// 📱 CORRECTION MAJEURE : Content Area avec scroll responsive
export const contentAreaCSS = css({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  background: colors.bg,
  minHeight: 0, // IMPORTANT pour flex
  '&::-webkit-scrollbar': { width: '6px' },
  '&::-webkit-scrollbar-track': { background: 'transparent' },
  '&::-webkit-scrollbar-thumb': {
    background: colors.border,
    borderRadius: '3px'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: colors.borderLight
  },
  '@media (max-width: 1024px)': {
    flex: 'none',
    overflowY: 'visible',
    overflowX: 'visible',
    minHeight: 'auto',
    height: 'auto'
  }
})

export const contentInnerCSS = css({
  padding: spacing.xl,
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
  minHeight: '100%',
  '@media (max-width: 1024px)': {
    minHeight: 'auto'
  },
  '@media (max-width: 768px)': {
    padding: spacing.lg
  },
  '@media (max-width: 640px)': {
    padding: spacing.md
  }
})

export const sectionCSS = css({
  marginBottom: spacing.xl,
  '&:last-child': { marginBottom: 0 }
})

export const sectionHeaderCSS = css({
  marginBottom: spacing.lg,
  paddingBottom: spacing.md,
  borderBottom: `1px solid ${colors.border}`
})

export const sectionTitleCSS = css({
  fontSize: '22px',
  fontWeight: '700',
  color: colors.text,
  marginBottom: spacing.xs,
  letterSpacing: '-0.02em',
  '@media (max-width: 640px)': {
    fontSize: '20px'
  }
})

export const sectionDescCSS = css({
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: '1.6'
})

export const fieldGroupCSS = css({
  marginBottom: spacing.lg,
  '&:last-child': { marginBottom: 0 }
})

export const labelCSS = css({
  display: 'block',
  fontSize: '14px',
  fontWeight: '600',
  color: colors.text,
  marginBottom: spacing.xs
})

const baseInput = {
  width: '100%',
  fontSize: '14px',
  color: colors.text,
  backgroundColor: colors.card,
  border: `1px solid ${colors.border}`,
  borderRadius: '8px',
  fontFamily: 'inherit',
  transition: transitions,
  '&:focus': {
    borderColor: colors.accent,
    backgroundColor: colors.cardHover,
    boxShadow: shadows.glow,
    outline: 'none'
  },
  '&:hover:not(:focus)': {
    borderColor: colors.borderLight,
    backgroundColor: colors.cardHover
  },
  '&::placeholder': {
    color: colors.textSubtle
  },
  '&:disabled': {
    backgroundColor: colors.hover,
    color: colors.textSubtle,
    cursor: 'not-allowed',
    opacity: 0.6
  }
}

export const inputCSS = css({
  ...baseInput,
  height: '40px',
  padding: `0 ${spacing.md}`,
  maxWidth: '100%',
  '@media (max-width: 640px)': {
    height: '44px',
    padding: `0 ${spacing.sm}`,
    fontSize: '16px' // Évite le zoom sur iOS
  }
})

export const selectCSS = css({
  ...baseInput,
  height: '40px',
  padding: `0 ${spacing.md}`,
  cursor: 'pointer',
  appearance: 'none',
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg fill='%23718096' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>\")",
  backgroundPosition: `right ${spacing.md} center`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '16px',
  '@media (max-width: 640px)': {
    height: '44px',
    padding: `0 ${spacing.sm}`,
    fontSize: '16px',
    backgroundPosition: `right ${spacing.sm} center`
  }
})

export const textareaCSS = css({
  ...baseInput,
  padding: spacing.md,
  minHeight: '100px',
  resize: 'vertical',
  lineHeight: '1.5',
  '@media (max-width: 640px)': {
    padding: spacing.sm,
    minHeight: '120px',
    fontSize: '16px'
  }
})

// 🎛️ Buttons - Style uniforme et moderne + RESPONSIVE
const baseButton = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.xs,
  height: '40px',
  padding: `0 ${spacing.md}`,
  fontSize: '14px',
  fontWeight: '500',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: transitions,
  border: '1px solid transparent',
  minWidth: 'fit-content',
  whiteSpace: 'nowrap',
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.6
  },
  '&:hover:not(:disabled)': {
    transform: 'translateY(-1px)',
    boxShadow: shadows.sm
  },
  '&:focus': {
    outline: 'none',
    boxShadow: shadows.glow
  },
  '&:active': {
    transform: 'translateY(0)'
  },
  '@media (max-width: 640px)': {
    height: '44px',
    padding: `0 ${spacing.md}`,
    fontSize: '14px',
    width: '100%',
    minWidth: 'auto'
  },
  '@media (max-width: 480px)': {
    height: '48px',
    padding: `0 ${spacing.sm}`,
    fontSize: '13px'
  }
}

export const buttonPrimaryCSS = css({
  ...baseButton,
  color: '#ffffff',
  backgroundColor: colors.success,
  '&:hover:not(:disabled)': {
    backgroundColor: '#059669',
    boxShadow: shadows.glowSuccess
  }
})

export const buttonSecondaryCSS = css({
  ...baseButton,
  color: colors.text,
  backgroundColor: colors.card,
  borderColor: colors.border,
  '&:hover:not(:disabled)': {
    backgroundColor: colors.cardHover,
    borderColor: colors.borderLight
  }
})

export const buttonDangerCSS = css({
  ...baseButton,
  color: '#ffffff',
  backgroundColor: colors.danger,
  '&:hover:not(:disabled)': {
    backgroundColor: '#dc2626'
  }
})

// 👤 Avatar - Section optimisée + RESPONSIVE
export const avatarSectionCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.lg,
  padding: spacing.lg,
  backgroundColor: colors.card,
  borderRadius: '10px',
  border: `1px solid ${colors.border}`,
  transition: transitions,
  '&:hover': {
    backgroundColor: colors.cardHover,
    borderColor: colors.borderLight
  },
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing.md
  }
})

export const avatarActionsCSS = css({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
  flex: 1,
  minWidth: 0
})

export const avatarButtonGroupCSS = css({
  display: 'flex',
  gap: spacing.sm,
  '@media (max-width: 640px)': {
    flexDirection: 'column',
    width: '100%'
  },
  '@media (max-width: 480px)': {
    flexDirection: 'column'
  }
})

export const fileHintCSS = css({
  fontSize: '12px',
  color: colors.textSubtle,
  lineHeight: '1.5'
})

// 🎨 Color Picker - Design compact + RESPONSIVE
export const colorSectionCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.md,
  padding: spacing.md,
  backgroundColor: colors.card,
  borderRadius: '8px',
  border: `1px solid ${colors.border}`,
  maxWidth: '300px',
  '@media (max-width: 640px)': {
    maxWidth: '100%',
    gap: spacing.sm,
    padding: spacing.sm
  }
})

export const colorInputCSS = css({
  width: '48px',
  height: '40px',
  borderRadius: '6px',
  backgroundColor: 'transparent',
  border: `1px solid ${colors.border}`,
  cursor: 'pointer',
  transition: transitions,
  '&:hover': {
    borderColor: colors.accent
  },
  '&:focus': {
    borderColor: colors.accent,
    boxShadow: shadows.glow,
    outline: 'none'
  }
})

export const colorDisplayCSS = css({
  fontSize: '14px',
  color: colors.textMuted,
  fontFamily: 'ui-monospace, monospace',
  fontWeight: '500'
})

// 🔍 Preview - Compact et élégant
export const previewBoxCSS = css({
  padding: spacing.md,
  marginTop: spacing.sm,
  backgroundColor: colors.card,
  border: `1px solid ${colors.border}`,
  borderRadius: '8px',
  fontSize: '14px',
  color: colors.text,
  lineHeight: '1.5'
})

export const syllablePreviewCSS = css({
  display: 'inline-block',
  padding: `2px ${spacing.xs}`,
  borderRadius: '4px',
  fontWeight: '500',
  color: '#fff'
})

export const appearanceDescCSS = css({
  fontSize: '14px',
  color: colors.textMuted,
  marginBottom: spacing.md,
  lineHeight: '1.5',
  background: `rgba(79, 70, 229, 0.05)`,
  padding: spacing.md,
  borderRadius: '8px',
  border: `1px solid rgba(79, 70, 229, 0.1)`
})

// ✅ Notices - Alertes minimalistes
const baseNotice = {
  padding: spacing.md,
  marginBottom: spacing.lg,
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  border: '1px solid transparent'
}

export const errorNoticeCSS = css({
  ...baseNotice,
  backgroundColor: `rgba(239, 68, 68, 0.1)`,
  borderColor: `rgba(239, 68, 68, 0.2)`,
  color: colors.danger
})

export const successNoticeCSS = css({
  ...baseNotice,
  backgroundColor: `rgba(16, 185, 129, 0.1)`,
  borderColor: `rgba(16, 185, 129, 0.2)`,
  color: colors.success
})

// 🔐 Security - Layout optimisé + RESPONSIVE
export const passwordFieldsCSS = css({
  display: 'grid',
  gap: spacing.md,
  gridTemplateColumns: '1fr',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1fr 1fr'
  },
  '@media (max-width: 640px)': {
    gap: spacing.sm
  }
})

export const gridColumnSpan2CSS = css({
  gridColumn: 'span 2',
  '@media (max-width: 768px)': {
    gridColumn: 'span 1'
  }
})

export const buttonGroupCSS = css({
  display: 'flex',
  gap: spacing.sm,
  marginTop: spacing.lg,
  flexWrap: 'wrap',
  '@media (max-width: 640px)': {
    flexDirection: 'column',
    gap: spacing.xs
  }
})

export const formErrorCSS = css({
  color: colors.danger,
  fontSize: '12px',
  marginTop: spacing.xs,
  fontWeight: '500'
})

export const formFieldMarginCSS = css({
  marginBottom: spacing.md
})

// 🎫 Support Tickets - Cards élégantes + RESPONSIVE + SCROLL FIXÉ
export const ticketsHeaderCSS = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: spacing.md,
  gap: spacing.md,
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing.sm
  },
  '@media (max-width: 640px)': {
    flexDirection: 'column',
    gap: spacing.xs,
    alignItems: 'stretch'
  }
})

export const ticketsCountBadgeCSS = css({
  fontSize: '12px',
  color: '#fff',
  background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
  padding: `4px ${spacing.sm}`,
  borderRadius: '12px',
  fontWeight: '600'
})

// 🔧 CORRECTION SCROLL : Container de tickets avec scroll adaptatif
export const ticketsScrollContainerCSS = css({
  border: `1px solid ${colors.border}`,
  borderRadius: '8px',
  overflow: 'hidden',
  maxHeight: '400px',
  backgroundColor: colors.card,
  overflowY: 'auto',
  '@media (max-width: 1024px)': {
    maxHeight: 'none',
    overflowY: 'visible'
  },
  // Scroll custom pour mobile
  '&::-webkit-scrollbar': { 
    width: '4px',
    '@media (max-width: 640px)': {
      width: '2px'
    }
  },
  '&::-webkit-scrollbar-track': { background: 'transparent' },
  '&::-webkit-scrollbar-thumb': {
    background: colors.border,
    borderRadius: '2px'
  }
})

export const ticketItemCSS = css({
  padding: spacing.md,
  borderBottom: `1px solid ${colors.border}`,
  transition: transitions,
  '&:hover': {
    backgroundColor: colors.cardHover
  },
  '&:last-child': {
    borderBottom: 'none'
  },
  '@media (max-width: 640px)': {
    padding: spacing.sm
  }
})

export const ticketHeaderCSS = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: spacing.md,
  marginBottom: spacing.xs,
  '@media (max-width: 640px)': {
    flexDirection: 'column',
    gap: spacing.xs,
    alignItems: 'stretch'
  }
})

export const ticketFlexContainerCSS = css({
  flex: 1,
  minWidth: 0
})

export const ticketTitleCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  marginBottom: spacing.xs,
  '@media (max-width: 640px)': {
    flexWrap: 'wrap'
  }
})

export const ticketIdBadgeCSS = css({
  fontSize: '11px',
  fontWeight: '600',
  color: colors.textSubtle,
  background: colors.hover,
  padding: `2px ${spacing.xs}`,
  borderRadius: '4px',
  fontFamily: 'ui-monospace, monospace'
})

export const typeBadgeCSS = css({
  padding: `2px ${spacing.xs}`,
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: '600',
  textTransform: 'uppercase',
  '@media (max-width: 640px)': {
    fontSize: '10px',
    padding: `2px 6px`
  }
})

export const ticketMainTitleCSS = css({
  fontSize: '14px',
  fontWeight: '500',
  color: colors.text,
  margin: 0,
  lineHeight: '1.4',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '@media (max-width: 640px)': {
    fontSize: '13px',
    whiteSpace: 'normal',
    overflow: 'visible',
    textOverflow: 'unset'
  }
})

export const ticketActionsContainerCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '4px',
  flexShrink: 0,
  '@media (max-width: 640px)': {
    alignItems: 'flex-start',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export const statusBadgeCSS = css({
  padding: `4px ${spacing.sm}`,
  borderRadius: '12px',
  fontSize: '11px',
  fontWeight: '600',
  textTransform: 'uppercase',
  '@media (max-width: 640px)': {
    fontSize: '10px',
    padding: `3px ${spacing.xs}`
  }
})

export const ticketDateCSS = css({
  fontSize: '11px',
  color: colors.textSubtle,
  fontWeight: '500'
})

export const ticketDescriptionCSS = css({
  fontSize: '13px',
  color: colors.textMuted,
  lineHeight: '1.4',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  '@media (max-width: 640px)': {
    WebkitLineClamp: 3,
    fontSize: '12px'
  }
})

export const ticketsFooterCSS = css({
  fontSize: '12px',
  color: colors.textSubtle,
  marginTop: spacing.md,
  textAlign: 'center',
  fontStyle: 'italic'
})

export const supportFormDescCSS = css({
  fontSize: '14px',
  color: colors.textMuted,
  marginBottom: spacing.md,
  lineHeight: '1.5'
})

// 🎯 Classes utilitaires pour la responsivité
export const mobileFullWidthCSS = css({
  '@media (max-width: 640px)': {
    width: '100%'
  }
})

export const mobileStackCSS = css({
  '@media (max-width: 640px)': {
    flexDirection: 'column',
    gap: spacing.xs
  }
})

export const mobileCenterCSS = css({
  '@media (max-width: 640px)': {
    textAlign: 'center'
  }
})

// 📱 Classes spécifiques pour le scroll mobile
export const mobileScrollContainerCSS = css({
  '@media (max-width: 1024px)': {
    '-webkit-overflow-scrolling': 'touch',
    overflowY: 'auto'
  }
})