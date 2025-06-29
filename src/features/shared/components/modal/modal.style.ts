import { css } from '~styled-system/css'

export const ModalCSS = css({
  // 🎯 BASE OVERLAY - Plein écran optimisé
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 999999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  background: `
    radial-gradient(ellipse at center, rgba(56, 189, 248, 0.06) 0%, transparent 50%),
    linear-gradient(135deg, rgba(12, 18, 34, 0.96) 0%, rgba(30, 41, 59, 0.98) 100%)
  `,
  animation: 'modalFadeIn 0.25s ease-out',

  // 🔧 RESET
  margin: 0,
  border: 'none',
  isolation: 'isolate',

  // 📱 RESPONSIVE
  '@media (max-width: 768px)': {
    padding: '0.75rem'
  },

  '& .modal-overlay': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
    cursor: 'pointer'
  },

  '& .modal-content': {
    position: 'relative',
    zIndex: 2,
    width: '88vw', // ⚡ Légèrement plus large
    height: '85vh', // ⚡ Plus haut pour plus de contenu
    padding: '0', // ⚡ Pas de padding global
    maxWidth: '1200px', // ⚡ Plus compact
    maxHeight: '760px', // ⚡ Hauteur optimisée
    minWidth: '320px',
    minHeight: '400px',
    background: `
      linear-gradient(145deg, 
        rgba(15, 23, 42, 0.98) 0%, 
        rgba(30, 41, 59, 0.96) 50%, 
        rgba(15, 23, 42, 0.98) 100%
      )
    `,
    borderRadius: '16px', // ⚡ Moins arrondi
    border: '1px solid rgba(56, 189, 248, 0.2)',

    // 🌟 OMBRES SUBTILES
    boxShadow: `
      0 20px 40px -8px rgba(0, 0, 0, 0.4),
      0 8px 20px -4px rgba(56, 189, 248, 0.06),
      inset 0 1px 0 rgba(56, 189, 248, 0.06)
    `,

    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',

    // ✨ ANIMATION DOUCE
    animation: 'modalSlideIn 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',

    // 🎯 LIGNE ACCENT SUBTILE
    _before: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '15%',
      right: '15%',
      height: '1px',
      background:
        'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.6), transparent)',
      zIndex: 10
    },

    // 📱 RESPONSIVE MOBILE
    '@media (max-width: 768px)': {
      width: 'calc(100vw - 1.5rem)',
      height: 'calc(100vh - 1.5rem)',
      maxWidth: 'none',
      maxHeight: 'none',
      minWidth: 'unset',
      borderRadius: '12px',

      _before: {
        left: '10%',
        right: '10%'
      }
    }
  },

  // 🎯 CONTENU INTERNE AVEC SCROLL OPTIMISÉ
  '& .modal-body': {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '1.5rem', // ⚡ Padding compact mais confortable
    minHeight: 0,

    // 🖱️ SCROLL ÉLÉGANT
    '&::-webkit-scrollbar': {
      width: '4px'
    },

    '&::-webkit-scrollbar-track': {
      background: 'rgba(51, 65, 85, 0.2)',
      borderRadius: '2px'
    },

    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(56, 189, 248, 0.3)',
      borderRadius: '2px',

      '&:hover': {
        background: 'rgba(56, 189, 248, 0.5)'
      }
    },

    // 📱 MOBILE
    '@media (max-width: 768px)': {
      padding: '1rem'
    }
  },

  // 🎯 HEADER COMPACT
  '& .modal-header': {
    flexShrink: 0,
    padding: '1.5rem 1.5rem 0 1.5rem', // ⚡ Plus compact
    borderBottom: '1px solid rgba(56, 189, 248, 0.08)',

    '@media (max-width: 768px)': {
      padding: '1rem 1rem 0 1rem'
    }
  },

  // 🎯 FOOTER COMPACT
  '& .modal-footer': {
    flexShrink: 0,
    padding: '0 1.5rem 1.5rem 1.5rem', // ⚡ Plus compact
    borderTop: '1px solid rgba(56, 189, 248, 0.08)',

    '@media (max-width: 768px)': {
      padding: '0 1rem 1rem 1rem'
    }
  }
})

// 🎬 ANIMATIONS OPTIMISÉES
export const ModalAnimations = css({
  '@keyframes modalFadeIn': {
    '0%': {
      opacity: 0,
      backdropFilter: 'blur(0px)'
    },
    '100%': {
      opacity: 1,
      backdropFilter: 'blur(8px)'
    }
  },

  '@keyframes modalSlideIn': {
    '0%': {
      opacity: 0,
      transform: 'scale(0.95) translateY(10px)',
      filter: 'blur(2px)'
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1) translateY(0)',
      filter: 'blur(0px)'
    }
  }
})

// 🎯 BOUTON CLOSE COMPACT
export const CloseButtonCSS = css({
  position: 'absolute',
  top: '1rem', // ⚡ Plus proche du bord
  right: '1rem',
  zIndex: 100,
  width: '2.25rem', // ⚡ Plus petit
  height: '2.25rem',

  // 🎨 DESIGN SUBTIL
  background: 'rgba(30, 41, 59, 0.7)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(56, 189, 248, 0.2)',
  borderRadius: '8px', // ⚡ Moins arrondi

  // 🎯 LAYOUT
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  // 🎨 COULEURS DOUCES
  color: '#94a3b8',
  fontSize: '1rem', // ⚡ Plus petit
  fontWeight: '500',

  // 🖱️ INTERACTIVITÉ FLUIDE
  cursor: 'pointer',
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',

  // ✨ OMBRES SUBTILES
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',

  // 🎯 HOVER ÉLÉGANT
  _hover: {
    background: 'rgba(239, 68, 68, 0.15)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    color: '#fca5a5',
    transform: 'scale(1.05)', // ⚡ Moins d'agrandissement
    boxShadow: '0 4px 16px rgba(239, 68, 68, 0.2)'
  },

  // 🎯 ACTIVE STATE
  _active: {
    transform: 'scale(0.98)',
    transition: 'transform 0.1s ease'
  },

  // 📱 MOBILE OPTIMISÉ
  '@media (max-width: 768px)': {
    top: '0.75rem',
    right: '0.75rem',
    width: '2rem',
    height: '2rem',
    fontSize: '0.875rem'
  }
})

// 🎯 STYLES UTILITAIRES POUR LE CONTENU
export const ModalContentCSS = css({
  // 📝 TYPOGRAPHIE OPTIMISÉE
  '& h1, & h2, & h3': {
    margin: '0 0 1rem 0',
    lineHeight: 1.3,
    fontWeight: '600',
    letterSpacing: '-0.01em'
  },

  '& h1': {
    fontSize: '1.5rem', // ⚡ Plus petit que 2rem
    color: '#f8fafc'
  },

  '& h2': {
    fontSize: '1.25rem', // ⚡ Plus petit que 1.5rem
    color: '#e2e8f0'
  },

  '& h3': {
    fontSize: '1.125rem', // ⚡ Plus petit que 1.25rem
    color: '#cbd5e1'
  },

  // 📝 PARAGRAPHES & TEXTE
  '& p': {
    margin: '0 0 1rem 0',
    fontSize: '0.875rem', // ⚡ Taille confortable
    lineHeight: 1.5,
    color: '#cbd5e1'
  },

  // 🏷️ LABELS
  '& label': {
    fontSize: '0.8rem', // ⚡ Compact mais lisible
    fontWeight: '500',
    color: '#94a3b8',
    margin: '0 0 0.5rem 0',
    display: 'block'
  },

  // 📝 INPUTS
  '& input, & textarea, & select': {
    fontSize: '0.875rem', // ⚡ Taille optimale
    padding: '0.625rem 0.75rem', // ⚡ Padding compact
    borderRadius: '8px'
  },

  // 🔘 BOUTONS
  '& button': {
    fontSize: '0.8rem', // ⚡ Compact
    fontWeight: '500',
    padding: '0.625rem 1rem', // ⚡ Padding ajusté
    borderRadius: '8px',
    letterSpacing: '0.01em'
  },

  // 📊 ESPACEMENTS GÉNÉRAUX
  '& > *:not(:last-child)': {
    marginBottom: '1.25rem' // ⚡ Espacement uniforme
  },

  // 🏷️ BADGES & TAGS
  '& .tag, & .badge': {
    fontSize: '0.75rem', // ⚡ Plus petit
    padding: '0.375rem 0.625rem', // ⚡ Padding compact
    borderRadius: '6px'
  },

  // 📋 LISTES
  '& ul, & ol': {
    fontSize: '0.875rem',
    lineHeight: 1.5,
    paddingLeft: '1.25rem'
  },

  '& li': {
    marginBottom: '0.375rem'
  },

  // 📊 CODE & PRE
  '& code': {
    fontSize: '0.8rem',
    padding: '0.125rem 0.25rem',
    borderRadius: '4px',
    backgroundColor: 'rgba(51, 65, 85, 0.4)'
  },

  '& pre': {
    fontSize: '0.75rem',
    padding: '0.75rem',
    borderRadius: '8px',
    overflow: 'auto'
  }
})
