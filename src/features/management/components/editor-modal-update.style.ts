import { css } from '~styled-system/css'

export const managementModalStyle = {
  ContentContainer: css({
    color: '#e2e8f0',
    width: '100%',
    maxWidth: '1200px',
    minHeight: '600px',
    maxHeight: '95vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '24px',
    position: 'relative',
    background:
      'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(148, 163, 184, 0.1)',
    animation: 'fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)',

    '@media (max-width: 768px)': {
      width: '95vw',
      maxHeight: '95vh',
      padding: '16px',
      gap: '1rem'
    }
  }),

  Header: css({
    flexShrink: 0,
    borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
    paddingBottom: '20px',
    minHeight: '120px',
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
    },

    '@media (max-width: 768px)': {
      minHeight: '80px',
      paddingBottom: '16px'
    }
  }),

  HeaderContent: css({
    textAlign: 'center',
    position: 'relative',
    zIndex: 1
  }),

  HeaderSubtitle: css({
    fontSize: '0.75rem',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '8px',
    fontWeight: '500',
    opacity: 0.8,
    animation: 'slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both',

    '@media (max-width: 768px)': {
      fontSize: '0.7rem',
      marginBottom: '4px'
    }
  }),

  HeaderTitle: css({
    fontSize: '2rem',
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: '16px',
    letterSpacing: '-0.02em',
    background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both',

    '@media (max-width: 768px)': {
      fontSize: '1.5rem',
      marginBottom: '12px'
    }
  }),

  HeaderInfo: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    animation: 'slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both',

    '@media (max-width: 768px)': {
      gap: '0.5rem',
      fontSize: '0.8rem'
    }
  }),

  UserBadge: css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    backdropFilter: 'blur(12px)',
    paddingX: '16px',
    paddingY: '8px',
    borderRadius: '9999px',
    border: '1px solid rgba(148, 163, 184, 0.12)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',

    _hover: {

      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      backgroundColor: 'rgba(30, 41, 59, 0.4)',
      borderColor: 'rgba(148, 163, 184, 0.2)'
    },

    '@media (max-width: 768px)': {
      paddingX: '12px',
      paddingY: '6px',
      gap: '0.5rem'
    }
  }),

  UserAvatar: css({
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: '2px solid rgba(148, 163, 184, 0.2)',
    transition: 'all 0.3s ease',

    _hover: {
      borderColor: 'rgba(56, 189, 248, 0.4)',
      boxShadow: '0 0 0 2px rgba(56, 189, 248, 0.1)'
    },

    '@media (max-width: 768px)': {
      width: '24px',
      height: '24px'
    }
  }),

  Username: css({
    color: '#e2e8f0',
    fontSize: '0.875rem',
    fontWeight: '500',
    letterSpacing: '0.01em',

    '@media (max-width: 768px)': {
      fontSize: '0.8rem'
    }
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
    letterSpacing: '0.02em',

    '@media (max-width: 768px)': {
      fontSize: '0.7rem'
    }
  }),

  MainContent: css({
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    minHeight: 'auto',

    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr',
      gap: '16px'
    }
  }),

  LeftColumn: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    minHeight: 'auto'
  }),

  Section: css({
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(12px)',
    padding: '20px',
    borderRadius: '16px',
    border: '1px solid rgba(148, 163, 184, 0.15)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    minHeight: '120px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',

    _before: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background:
        'linear-gradient(90deg, rgba(56, 189, 248, 0.3), rgba(139, 92, 246, 0.3), rgba(56, 189, 248, 0.3))'
    },

    _hover: {
      boxShadow: '0 16px 50px rgba(0, 0, 0, 0.15)',
      backgroundColor: 'rgba(30, 41, 59, 0.6)',
      borderColor: 'rgba(148, 163, 184, 0.25)'
    },

    '@media (max-width: 768px)': {
      padding: '16px',
      minHeight: '100px'
    }
  }),

  FlexSection: css({
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(12px)',
    padding: '20px',
    borderRadius: '16px',
    border: '1px solid rgba(148, 163, 184, 0.15)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '160px',
    maxHeight: '300px',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',

    _before: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background:
        'linear-gradient(90deg, rgba(16, 185, 129, 0.3), rgba(34, 197, 94, 0.3), rgba(16, 185, 129, 0.3))'
    },

    _hover: {
      boxShadow: '0 16px 50px rgba(0, 0, 0, 0.15)',
      backgroundColor: 'rgba(30, 41, 59, 0.6)',
      borderColor: 'rgba(148, 163, 184, 0.25)'
    },

    '@media (max-width: 768px)': {
      padding: '16px',
      minHeight: '120px',
      maxHeight: '250px'
    }
  }),

  SectionHeader: css({
    color: '#ffffff',
    fontSize: '1.125rem',
    fontWeight: '700',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexShrink: 0,
    letterSpacing: '-0.01em',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',

    '@media (max-width: 768px)': {
      fontSize: '1rem',
      marginBottom: '12px',
      gap: '8px'
    }
  }),

  BlueDot: css({
    width: '10px',
    height: '10px',
    backgroundColor: '#0ea5e9',
    borderRadius: '50%',
    boxShadow:
      '0 0 12px rgba(14, 165, 233, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
    position: 'relative',
    flexShrink: 0,

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
    flexShrink: 0,

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
    flexShrink: 0,

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

  Label: css({
    display: 'block',
    color: '#f1f5f9',
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '12px',
    textTransform: 'none',
    letterSpacing: '0.01em',
    transition: 'color 0.3s ease',
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',

    '@media (max-width: 768px)': {
      fontSize: '0.8rem',
      marginBottom: '8px'
    }
  }),

  Input: css({
    width: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(8px)',
    border: '2px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '12px',
    paddingX: '16px',
    paddingY: '12px',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    position: 'relative',
    minHeight: '48px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',

    _focus: {
      borderColor: 'rgba(56, 189, 248, 0.6)',
      boxShadow:
        '0 0 0 4px rgba(56, 189, 248, 0.15), 0 8px 30px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
    },

    _hover: {
      borderColor: 'rgba(148, 163, 184, 0.35)',
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)'
    },

    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    },

    '@media (max-width: 768px)': {
      paddingX: '12px',
      paddingY: '10px',
      fontSize: '0.9rem',
      minHeight: '44px'
    }
  }),

  TagsContainer: css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    minHeight: '60px',
    maxHeight: '200px',
    overflowY: 'auto',
    padding: '8px 0',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(148, 163, 184, 0.4) rgba(30, 41, 59, 0.3)',

    '&::-webkit-scrollbar': {
      width: '8px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(30, 41, 59, 0.3)',
      borderRadius: '4px'
    },
    '&::-webkit-scrollbar-thumb': {
      background:
        'linear-gradient(180deg, rgba(148, 163, 184, 0.6), rgba(100, 116, 139, 0.4))',
      borderRadius: '4px',
      border: '1px solid rgba(148, 163, 184, 0.2)',

      '&:hover': {
        background:
          'linear-gradient(180deg, rgba(148, 163, 184, 0.8), rgba(100, 116, 139, 0.6))'
      }
    },
    '&::-webkit-scrollbar-corner': {
      background: 'rgba(30, 41, 59, 0.3)'
    }
  }),

  TagsGrid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '8px',
    maxHeight: '250px',
    overflowY: 'auto',
    paddingRight: '8px',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(148, 163, 184, 0.4) rgba(30, 41, 59, 0.3)',

    '&::-webkit-scrollbar': {
      width: '8px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(30, 41, 59, 0.3)',
      borderRadius: '4px'
    },
    '&::-webkit-scrollbar-thumb': {
      background:
        'linear-gradient(180deg, rgba(148, 163, 184, 0.6), rgba(100, 116, 139, 0.4))',
      borderRadius: '4px',
      border: '1px solid rgba(148, 163, 184, 0.2)',

      '&:hover': {
        background:
          'linear-gradient(180deg, rgba(148, 163, 184, 0.8), rgba(100, 116, 139, 0.6))'
      }
    },
    '&::-webkit-scrollbar-corner': {
      background: 'rgba(30, 41, 59, 0.3)'
    },

    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '6px',
      maxHeight: '200px'
    }
  }),

  CurrentTag: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    backdropFilter: 'blur(8px)',
    border: '2px solid rgba(56, 189, 248, 0.3)',
    paddingX: '12px',
    paddingY: '6px',
    borderRadius: '10px',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '32px',
    whiteSpace: 'nowrap',
    boxShadow: '0 2px 8px rgba(56, 189, 248, 0.2)',

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
      backgroundColor: 'rgba(239, 68, 68, 0.15)',
      borderColor: 'rgba(239, 68, 68, 0.4)',
      color: '#ffffff',
      boxShadow: '0 6px 20px rgba(239, 68, 68, 0.25)',

      _before: {
        left: '100%'
      }
    },

    '@media (max-width: 768px)': {
      paddingX: '10px',
      paddingY: '5px',
      fontSize: '0.8rem',
      gap: '6px'
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
    flexShrink: 0,

    _hover: {
      opacity: 1,
      transform: 'scale(1.1)'
    }
  }),

  AvailableTag: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    paddingX: '12px',
    paddingY: '8px',
    borderRadius: '10px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid transparent',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '36px',
    textAlign: 'center',

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
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
      _before: {
        left: '100%'
      }
    },

    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
      transform: 'none'
    },

    '@media (max-width: 768px)': {
      paddingX: '10px',
      paddingY: '6px',
      fontSize: '0.8rem',
      minHeight: '32px'
    }
  }),

  ActiveTag: css({
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    backdropFilter: 'blur(8px)',
    border: '2px solid rgba(34, 197, 94, 0.3)',
    color: '#ffffff',
    fontWeight: '600',
    boxShadow: '0 2px 8px rgba(34, 197, 94, 0.2)',

    _hover: {
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
      borderColor: 'rgba(34, 197, 94, 0.4)',
      boxShadow: '0 6px 20px rgba(34, 197, 94, 0.25)'
    }
  }),

  InactiveTag: css({
    backgroundColor: 'rgba(100, 116, 139, 0.4)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(148, 163, 184, 0.25)',
    color: '#e2e8f0',
    fontWeight: '500',

    _hover: {
      backgroundColor: 'rgba(56, 189, 248, 0.15)',
      borderColor: 'rgba(56, 189, 248, 0.3)',
      color: '#ffffff',
      boxShadow: '0 6px 20px rgba(56, 189, 248, 0.2)'
    }
  }),

  CheckIcon: css({
    fontSize: '0.75rem',
    opacity: 0.8,
    transition: 'all 0.2s ease',
    flexShrink: 0
  }),

  HelperText: css({
    marginTop: '16px',
    paddingTop: '16px',
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
    color: '#94a3b8',
    fontSize: '0.75rem',
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 1,
    letterSpacing: '0.01em',
    fontWeight: '500',

    '@media (max-width: 768px)': {
      fontSize: '0.7rem'
    }
  }),

  Footer: css({
    flexShrink: 0,
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(148, 163, 184, 0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    minHeight: '60px',

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
    },

    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '12px',
      alignItems: 'stretch',
      minHeight: 'auto'
    }
  }),

  FooterInfo: css({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#94a3b8',
    fontSize: '0.875rem',
    fontWeight: '500',

    '@media (max-width: 768px)': {
      justifyContent: 'center',
      fontSize: '0.8rem'
    }
  }),

  PulsingDot: css({
    width: '8px',
    height: '8px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
    position: 'relative',
    flexShrink: 0,

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
    gap: '12px',

    '@media (max-width: 768px)': {
      width: '100%',
      justifyContent: 'space-between'
    }
  }),

  BaseButton: css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingX: '20px',
    paddingY: '10px',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid transparent',
    gap: '8px',
    position: 'relative',
    overflow: 'hidden',
    letterSpacing: '0.01em',
    minHeight: '44px',
    whiteSpace: 'nowrap',

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
    },

    '@media (max-width: 768px)': {
      flex: 1,
      paddingX: '16px',
      fontSize: '0.8rem'
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
    paddingX: '24px',
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
  })
}
