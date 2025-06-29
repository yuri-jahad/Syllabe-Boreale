import { css } from '~styled-system/css'

export const managementModalStyle = {
  // ✨ CONTENEUR PRINCIPAL - Design sophistiqué
  ContentContainer: css({
    color: '#e2e8f0',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    overflow: 'hidden',
    padding:"10px",
    position: 'relative',
    background:
      'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.4) 100%)',
    backdropFilter: 'blur(20px)',
    animation: 'fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  }),

  // ✨ HEADER - Élégance moderne
  Header: css({
    flexShrink: 0,
    borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
    paddingBottom: '2rem',
    position: 'relative',
    _after: {
      content: '""',
      position: 'absolute',
      bottom: '-1px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '2px',
      background:
        'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.6), transparent)',
      borderRadius: '1px'
    }
  }),

  HeaderContent: css({
    textAlign: 'center',
    marginBottom: '1.5rem',
    position: 'relative',
    zIndex: 1
  }),

  HeaderSubtitle: css({
    fontSize: '0.75rem',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '0.75rem',
    fontWeight: '500',
    opacity: 0.8,
    animation: 'slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both'
  }),

  HeaderTitle: css({
    fontSize: '2.25rem',
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: '1.5rem',
    letterSpacing: '-0.02em',
    background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: 'none',
    animation: 'slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both'
  }),

  HeaderInfo: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    animation: 'slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both'
  }),

  UserBadge: css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    backdropFilter: 'blur(12px)',
    paddingX: '1.25rem',
    paddingY: '0.75rem',
    borderRadius: '9999px',
    border: '1px solid rgba(148, 163, 184, 0.12)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    _hover: {
      transform: 'translateY(-1px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      backgroundColor: 'rgba(30, 41, 59, 0.4)',
      borderColor: 'rgba(148, 163, 184, 0.2)'
    }
  }),

  UserAvatar: css({
    width: '1.75rem',
    height: '1.75rem',
    borderRadius: '50%',
    border: '2px solid rgba(148, 163, 184, 0.2)',
    transition: 'all 0.3s ease',
    _hover: {
      borderColor: 'rgba(56, 189, 248, 0.4)',
      boxShadow: '0 0 0 2px rgba(56, 189, 248, 0.1)'
    }
  }),

  Username: css({
    color: '#e2e8f0',
    fontSize: '0.875rem',
    fontWeight: '500',
    letterSpacing: '0.01em'
  }),

  Separator: css({
    width: '2px',
    height: '2px',
    backgroundColor: '#64748b',
    borderRadius: '50%',
    opacity: 0.6
  }),

  Date: css({
    color: '#64748b',
    fontSize: '0.75rem',
    fontFamily: 'ui-monospace, SFMono-Regular, monospace',
    fontWeight: '400',
    letterSpacing: '0.02em'
  }),

  // ✨ CONTENU PRINCIPAL - Layout harmonieux
  MainContent: css({
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    overflow: 'hidden',
    minHeight: 0
  }),

  LeftColumn: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    minHeight: 0
  }),

  // ✨ SECTIONS - Raffinement moderne
  Section: css({
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    backdropFilter: 'blur(12px)',
    padding: '1.75rem',
    borderRadius: '16px',
    border: '1px solid rgba(148, 163, 184, 0.08)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',

    _before: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background:
        'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.1), transparent)'
    },

    _hover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
      backgroundColor: 'rgba(30, 41, 59, 0.4)',
      borderColor: 'rgba(148, 163, 184, 0.15)'
    }
  }),

  FlexSection: css({
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    backdropFilter: 'blur(12px)',
    padding: '1.75rem',
    borderRadius: '16px',
    border: '1px solid rgba(148, 163, 184, 0.08)',
    flex: 1,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    position: 'relative',
    overflow: 'hidden',

    _before: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background:
        'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.1), transparent)'
    },

    _hover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
      backgroundColor: 'rgba(30, 41, 59, 0.4)',
      borderColor: 'rgba(148, 163, 184, 0.15)'
    }
  }),

  SectionHeader: css({
    color: '#f8fafc',
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flexShrink: 0,
    letterSpacing: '-0.01em'
  }),

  // ✨ DOTS COLORÉS - Design subtil
  BlueDot: css({
    width: '10px',
    height: '10px',
    backgroundColor: '#0ea5e9',
    borderRadius: '50%',
    boxShadow:
      '0 0 12px rgba(14, 165, 233, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
    position: 'relative',
    _after: {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '4px',
      height: '4px',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: '50%'
    }
  }),

  GreenDot: css({
    width: '10px',
    height: '10px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    boxShadow:
      '0 0 12px rgba(16, 185, 129, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
    position: 'relative',
    _after: {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '4px',
      height: '4px',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: '50%'
    }
  }),

  PurpleDot: css({
    width: '10px',
    height: '10px',
    backgroundColor: '#8b5cf6',
    borderRadius: '50%',
    boxShadow:
      '0 0 12px rgba(139, 92, 246, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
    position: 'relative',
    _after: {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '4px',
      height: '4px',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: '50%'
    }
  }),

  // ✨ FORMULAIRE - UX perfectionnée
  Label: css({
    display: 'block',
    color: '#cbd5e1',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '1rem',
    textTransform: 'none',
    letterSpacing: '0.01em',
    transition: 'color 0.3s ease'
  }),

  Input: css({
    width: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(148, 163, 184, 0.12)',
    borderRadius: '12px',
    paddingX: '1rem',
    paddingY: '0.875rem',
    color: '#f8fafc',
    fontSize: '1rem',
    fontWeight: '400',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    position: 'relative',

    _focus: {
      borderColor: 'rgba(56, 189, 248, 0.4)',
      boxShadow:
        '0 0 0 3px rgba(56, 189, 248, 0.08), 0 8px 24px rgba(0, 0, 0, 0.12)',
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      transform: 'translateY(-1px)'
    },

    _hover: {
      borderColor: 'rgba(148, 163, 184, 0.2)',
      backgroundColor: 'rgba(15, 23, 42, 0.7)'
    },

    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  }),

  // ✨ TAGS - Design raffiné
  TagsContainer: css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    minHeight: '4rem',
    flex: 1,
    overflowY: 'auto',
    padding: '0.5rem 0',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(148, 163, 184, 0.3) transparent'
  }),

  TagsGrid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '0.75rem',
    maxHeight: '20rem',
    overflowY: 'auto',
    paddingRight: '0.5rem',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(148, 163, 184, 0.3) transparent'
  }),

  CurrentTag: css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(56, 189, 248, 0.2)',
    paddingX: '0.875rem',
    paddingY: '0.5rem',
    borderRadius: '10px',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#bfdbfe',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',

    _before: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background:
        'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
      transition: 'left 0.5s ease'
    },

    _hover: {
      backgroundColor: 'rgba(239, 68, 68, 0.08)',
      borderColor: 'rgba(239, 68, 68, 0.3)',
      color: '#fecaca',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 16px rgba(239, 68, 68, 0.15)',

      _before: {
        left: '100%'
      }
    }
  }),

  ImperativeTag: css({
    backgroundColor: 'rgba(51, 65, 85, 0.4) !important',
    color: '#cbd5e1 !important',
    border: '1px solid rgba(100, 116, 139, 0.2) !important',
    cursor: 'default !important',
    opacity: 0.7,

    _hover: {
      backgroundColor: 'rgba(51, 65, 85, 0.4) !important',
      borderColor: 'rgba(100, 116, 139, 0.2) !important',
      color: '#cbd5e1 !important',
      transform: 'none !important',
      boxShadow: 'none !important'
    }
  }),

  TagCloseIcon: css({
    fontSize: '0.75rem',
    opacity: 0.7,
    transition: 'all 0.2s ease',
    _hover: {
      opacity: 1,
      transform: 'scale(1.1)'
    }
  }),

  AvailableTag: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    paddingX: '1rem',
    paddingY: '0.75rem',
    borderRadius: '10px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid transparent',
    position: 'relative',
    overflow: 'hidden',

    _before: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background:
        'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
      transition: 'left 0.5s ease'
    },

    _hover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
      _before: {
        left: '100%'
      }
    },

    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
      transform: 'none'
    }
  }),

  ActiveTag: css({
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(34, 197, 94, 0.2)',
    color: '#86efac',

    _hover: {
      backgroundColor: 'rgba(34, 197, 94, 0.12)',
      borderColor: 'rgba(34, 197, 94, 0.3)',
      boxShadow: '0 8px 24px rgba(34, 197, 94, 0.12)'
    }
  }),

  InactiveTag: css({
    backgroundColor: 'rgba(51, 65, 85, 0.3)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(100, 116, 139, 0.15)',
    color: '#cbd5e1',

    _hover: {
      backgroundColor: 'rgba(56, 189, 248, 0.08)',
      borderColor: 'rgba(56, 189, 248, 0.2)',
      color: '#bfdbfe',
      boxShadow: '0 8px 24px rgba(56, 189, 248, 0.12)'
    }
  }),

  CheckIcon: css({
    fontSize: '0.75rem',
    opacity: 0.8,
    transition: 'all 0.2s ease',
    _parentHover: {
      transform: 'scale(1.1)'
    }
  }),

  // ✨ TEXTE D'AIDE - Subtil et élégant
  HelperText: css({
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(148, 163, 184, 0.08)',
    flexShrink: 0,
    position: 'relative',

    _before: {
      content: '""',
      position: 'absolute',
      top: '-1px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '40px',
      height: '1px',
      background:
        'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.3), transparent)'
    }
  }),

  HelperTextContent: css({
    color: '#64748b',
    fontSize: '0.75rem',
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.8,
    letterSpacing: '0.01em'
  }),

  // ✨ FOOTER - Design harmonieux
  Footer: css({
    flexShrink: 0,
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(148, 163, 184, 0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',

    _before: {
      content: '""',
      position: 'absolute',
      top: '-1px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '1px',
      background:
        'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.3), transparent)'
    }
  }),

  FooterInfo: css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#64748b',
    fontSize: '0.875rem',
    fontWeight: '400'
  }),

  PulsingDot: css({
    width: '8px',
    height: '8px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
    position: 'relative',

    _after: {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '3px',
      height: '3px',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      borderRadius: '50%'
    }
  }),

  ButtonGroup: css({
    display: 'flex',
    gap: '0.75rem'
  }),

  // ✨ BOUTONS - Design premium
  BaseButton: css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingX: '1.5rem',
    paddingY: '0.75rem',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid transparent',
    gap: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    letterSpacing: '0.01em',

    _before: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background:
        'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
      transition: 'left 0.6s ease'
    },

    _hover: {
      transform: 'translateY(-2px)',
      _before: {
        left: '100%'
      }
    },

    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      transform: 'none'
    }
  }),

  CancelButton: css({
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(100, 116, 139, 0.15)',
    color: '#cbd5e1',

    _hover: {
      backgroundColor: 'rgba(30, 41, 59, 0.6)',
      borderColor: 'rgba(148, 163, 184, 0.3)',
      color: '#f1f5f9',
      boxShadow: '0 8px 24px rgba(30, 41, 59, 0.2)'
    }
  }),

  DeleteButton: css({
    backgroundColor: 'rgba(239, 68, 68, 0.06)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    color: '#fca5a5',

    _hover: {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: 'rgba(239, 68, 68, 0.3)',
      color: '#fecaca',
      boxShadow: '0 8px 24px rgba(239, 68, 68, 0.15)'
    }
  }),

  SaveButton: css({
    paddingX: '2rem',
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(56, 189, 248, 0.2)',
    color: '#bfdbfe',
    fontWeight: '600',

    _hover: {
      backgroundColor: 'rgba(56, 189, 248, 0.12)',
      borderColor: 'rgba(56, 189, 248, 0.3)',
      color: '#dbeafe',
      boxShadow: '0 8px 24px rgba(56, 189, 248, 0.15)'
    }
  }),

  // ✨ ANIMATIONS KEYFRAMES
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },

  '@keyframes slideDown': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-10px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },

  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 1
    },
    '50%': {
      opacity: 0.5
    }
  }
}
