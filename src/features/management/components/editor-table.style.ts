import { css } from '~styled-system/css'

// 🌌 Container principal épuré
export const tableContainerStyle = css({
  width: 'min(94%, 1400px)',
  height:'50vh',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(15, 23, 42, 0.8)',
  border: '1px solid rgba(148, 163, 184, 0.1)',
  borderRadius: '12px',
  margin: '0 auto',
  overflowY: "auto",
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',

  '&::-webkit-scrollbar': {
    width: '4px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(15, 23, 42, 0.3)'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(148, 163, 184, 0.3)',
    borderRadius: '3px'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(148, 163, 184, 0.5)'
  }
})

// 📊 Table compacte
export const tableStyle = css({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0',
  fontSize: '13px'
})

// 🎯 Headers simples et nets
export const headerStyle = css({
  background: 'rgba(30, 41, 59, 0.6)',
  color: '#e2e8f0',
  fontWeight: '600',
  fontSize: '12px',
  textAlign: 'left',
  padding: '12px 16px',
  borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  position: 'sticky',
  top: 0,
  zIndex: 10,

  '&:hover': {
    background: 'rgba(30, 41, 59, 0.8)'
  }
})

// ✨ Rows compactes avec hover subtil
export const rowStyle = css({
  transition: 'all 0.2s ease',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: 'rgba(30, 41, 59, 0.4)'
  }
})

// 🎨 Container d'input
export const ContainerInputCSS = css({
  width: 'min(100%, 1400px)',
  margin: '0 auto',
})

// 💎 Cellules compactes
export const cellStyle = css({
  padding: '10px 16px',
  color: '#f1f5f9',
  fontSize: '16px',
  verticalAlign: 'middle',
  backgroundColor: 'transparent',
  borderBottom: '1px solid rgba(148, 163, 184, 0.05)'
})

// 🖼️ Avatar compact
export const avatarStyle = css({
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  objectFit: 'cover',
  border: '1px solid rgba(148, 163, 184, 0.2)',
  transition: 'transform 0.2s ease',

  '&:hover': {
    transform: 'scale(1.05)'
  }
})

// 👤 Container utilisateur compact
export const userContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
})

// 📝 Username simple
export const usernameStyle = css({
  fontWeight: '500',
  color: '#e2e8f0',
  fontSize: '13px'
})

// 🔤 Mot en évidence
export const wordStyle = css({
  color: '#ffffff',
  fontSize: '13px',
  textTransform:"uppercase",
  fontFamily:'amazon'
})

// 🏷️ Badges compacts
export const badgeStyle = css({
  display: 'inline-block',
  paddingX: '6px',
  paddingY: '2px',
  borderRadius: '4px',
  fontSize: '10px',
  fontWeight: '500',
  marginRight: '4px',
  marginBottom: '2px',
  color: '#e2e8f0',
  textTransform: 'uppercase',
  letterSpacing: '0.3px'
})

// 🎨 Couleurs simples pour badges
export const getBadgeColor = (type: string) => {
  // Hash function pour générer une couleur consistante
  const stringToColor = (str: string) => {
    const colors = [
      {
        bg: 'rgba(212, 70, 239, 0.2)',
        border: 'rgba(212, 70, 239, 0.3)',
        color: '#f3e8ff'
      },
      {
        bg: 'rgba(6, 182, 212, 0.2)',
        border: 'rgba(6, 182, 212, 0.3)',
        color: '#cffafe'
      },
      {
        bg: 'rgba(251, 113, 133, 0.2)',
        border: 'rgba(251, 113, 133, 0.3)',
        color: '#fecdd3'
      },
      {
        bg: 'rgba(52, 211, 153, 0.2)',
        border: 'rgba(52, 211, 153, 0.3)',
        color: '#d1fae5'
      },
      {
        bg: 'rgba(168, 85, 247, 0.2)',
        border: 'rgba(168, 85, 247, 0.3)',
        color: '#e9d5ff'
      }
    ]

    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }

    return colors[Math.abs(hash) % colors.length]
  }

  return type
    ? stringToColor(type)
    : {
        bg: 'rgba(107, 114, 128, 0.2)',
        border: 'rgba(107, 114, 128, 0.3)',
        color: '#d1d5db'
      }
}


export const dateStyle = css({
  color: '#94a3b8',
  fontSize: '11px',
  fontFamily: 'monospace'
})

// ⏳ Loading simple
export const loadingStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  gap: '16px',
  color: '#94a3b8',

  '& .spinner': {
    width: '24px',
    height: '24px',
    border: '2px solid rgba(148, 163, 184, 0.2)',
    borderTop: '2px solid #94a3b8',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },

  '& .text': {
    fontSize: '14px',
    fontWeight: '500'
  }
})

// 🚫 Empty state simple
export const emptyStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  gap: '12px',
  color: '#94a3b8',
  textAlign: 'center',
  padding: '40px',

  '& .title': {
    fontSize: '16px',
    fontWeight: '600',
    color: '#e2e8f0'
  },

  '& .subtitle': {
    fontSize: '14px',
    color: '#94a3b8'
  }
})

// 📊 Footer épuré
export const metadataStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  background: 'rgba(15, 23, 42, 0.6)',
  borderTop: '1px solid rgba(148, 163, 184, 0.1)',
  color: '#94a3b8',
  fontSize: '12px',

  '& .stat': {
    padding: '4px 8px',
    borderRadius: '4px',
    background: 'rgba(30, 41, 59, 0.4)',
    marginRight: '8px'
  },

  '& .query': {
    color: '#e2e8f0',
    fontWeight: '500'
  },

  '& .more': {
    color: '#60a5fa',
    fontWeight: '500'
  }
})

// 🎯 Container types
export const typesContainerStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '3px',
  alignItems: 'center',
  maxWidth: '180px'
})

// ✏️ Bouton d'édition propre
export const editButtonStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6px 12px',
  background: 'rgba(30, 41, 59, 0.6)',
  border: '1px solid rgba(148, 163, 184, 0.2)',
  borderRadius: '6px',
  color: '#cbd5e1',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontSize: '11px',
  fontWeight: '500',
  textTransform: 'uppercase',
  letterSpacing: '0.3px',

  '&:hover': {
    background: 'rgba(59, 130, 246, 0.2)',
    borderColor: 'rgba(59, 130, 246, 0.4)',
    color: '#dbeafe'
  }
})

// 🌟 Zone scrollable
export const scrollableContentStyle = css({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden'
})

// 🔄 Bouton de mise à jour
export const updateStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 16px',
  background: 'rgba(15, 23, 42, 0.8)',
  border: '1px solid rgba(148, 163, 184, 0.2)',
  borderRadius: '6px',
  color: '#f1f5f9',
  fontSize: '12px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  '&:hover': {
    background: 'rgba(30, 41, 59, 0.8)',
    borderColor: 'rgba(148, 163, 184, 0.3)'
  }
})
