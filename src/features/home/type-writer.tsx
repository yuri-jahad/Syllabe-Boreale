import React, { useState, useEffect } from 'react'
import { css } from '~styled-system/css'
import { BookOpen } from 'lucide-react'
import book from '@assets/images/book.jpg'

interface PropsText {
  text: string
}

const containerCSS = css({
  height: '100vh',
  padding: '2rem 3rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  maxWidth: '1200px',
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.02), transparent 60%)',
    zIndex: -1,
    pointerEvents: 'none'
  },

  '@media (max-width: 768px)': {
    padding: '1.5rem',
    height: '100vh'
  }
})

const titleCSS = css({
  fontSize: '2.75rem',
  fontWeight: '300',
  color: '#F8FAFC',
  marginBottom: '3rem',
  letterSpacing: '-0.02em',
  lineHeight: '1.1',
  minHeight: '3.5rem',
  display: 'flex',
  alignItems: 'flex-start',
  fontFamily: 'alessa, "Inter"',
  '&::after': {
    content: '"|"',
    color: '#6366F1',
    animation: 'blink 1.5s infinite',
    marginLeft: '2px',
    fontWeight: '100'
  },

  '@keyframes blink': {
    '0%, 50%': { opacity: 1 },
    '51%, 100%': { opacity: 0 }
  },

  '@media (max-width: 768px)': {
    fontSize: '2.25rem',
    marginBottom: '2.5rem',
    minHeight: '3rem'
  }
})

const titleCompleteCSS = css({
  fontSize: '2.3rem',
  fontWeight: '300',
  color: '#F8FAFC',
  marginBottom: '1.3rem',
  letterSpacing: '-0.02em',
  lineHeight: '1.1',
  minHeight: '3.5rem',
  display: 'flex',
  alignItems: 'flex-start',
  fontFamily: 'Alessa, "Inter", system-ui, sans-serif',

  '@media (max-width: 768px)': {
    fontSize: '2.25rem',
    marginBottom: '2.5rem',
    minHeight: '3rem'
  }
})

const contentCSS = css({
  display: 'grid',
  gridTemplateColumns: '1.2fr 0.8fr',
  gap: '3rem',
  alignItems: 'center',
  width: '100%',
  animation: 'slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',

  '@keyframes slideInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },

  '@media (max-width: 1024px)': {
    gridTemplateColumns: '1fr',
    gap: '2rem'
  }
})

const textSectionCSS = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
})

const paragraphCSS = css({
  fontSize: '1.1rem',
  color: '#D1D5DB',
  lineHeight: '1.7',
  margin: '0',
  fontFamily: '"Inter", system-ui, sans-serif',
  '&:first-child': {
    fontSize: '1.1rem',
    letterSpacing: '0.01em'
  },

  '&:last-child': {
    padding: '2rem',
    background: 'rgba(30, 41, 59, 0.2)',
    borderRadius: '16px',
    marginTop: '0.5rem',
    fontSize: '1.125rem',
    color: '#E2E8F0',
    letterSpacing: '0.01em'
  },

  '@media (max-width: 768px)': {
    fontSize: '1rem',

    '&:first-child': {
      fontSize: '1.125rem'
    },

    '&:last-child': {
      fontSize: '1rem',
      padding: '1.5rem'
    }
  }
})

const subtileParagraphCSS = css({
  fontSize: '1.1rem',
  color: 'rgba(255, 255, 255, 0.6)',
  lineHeight: '1.7',
  margin: '0',
  fontFamily: 'alessa, "Inter", system-ui, sans-serif',
  fontWeight: '300',
  padding: '1.75rem',
  background: 'rgba(51, 65, 85, 0.3)',
  borderRadius: '12px',
  border: '1px solid rgba(148, 163, 184, 0.15)',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.875rem',

  '&:hover': {
    background: 'rgba(51, 65, 85, 0.4)',
    borderColor: 'rgba(148, 163, 184, 0.25)'
  },

  '& .paragraph-icon': {
    marginTop: '0.125rem',
    flexShrink: 0,
    width: '1.25rem',
    height: '1.25rem',
    color: '#94A3B8',
    strokeWidth: 1.5
  },

  '& .text': {
    flex: 1
  },

  '@media (max-width: 768px)': {
    fontSize: '1rem',
    padding: '1.5rem',
    borderRadius: '10px',
    gap: '0.75rem',

    '& .paragraph-icon': {
      width: '1.125rem',
      height: '1.125rem'
    }
  }
})

const imageContainerCSS = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '@media (max-width: 1024px)': {
    order: -1,
    marginBottom: '1rem'
  }
})

const imageCSS = css({
  width: '100%',
  maxWidth: '300px',
  height: 'auto',
  borderRadius: '8px',
  opacity: 0.8,
  animation: 'fadeIn 1s ease-out 0.5s both',

  '@keyframes fadeIn': {
    from: {
      opacity: 0
    },
    to: {
      opacity: 0.8
    }
  },

  '@media (max-width: 768px)': {
    maxWidth: '260px'
  }
})

const Typewriter: React.FC<PropsText> = ({ text }) => {
  const [charIndex, setCharIndex] = useState(0)
  const [showParagraphs, setShowParagraphs] = useState(false)
  const introText = text

  useEffect(() => {
    if (charIndex < introText.length) {
      const timer = setTimeout(() => {
        setCharIndex(charIndex + 1)
      }, 45) // Vitesse légèrement plus rapide
      return () => clearTimeout(timer)
    } else {
      const showTimer = setTimeout(() => {
        setShowParagraphs(true)
      }, 600) // Délai légèrement plus long pour l'effet
      return () => clearTimeout(showTimer)
    }
  }, [charIndex, introText.length])

  return (
    <div className={containerCSS}>
      <h1 className={showParagraphs ? titleCompleteCSS : titleCSS}>
        {introText.slice(0, charIndex)}
      </h1>

      {showParagraphs && (
        <div className={contentCSS}>
          <div className={textSectionCSS}>
            <p className={paragraphCSS}>
              L'idée initiale était simple : créer une plateforme pour
              collaborer autour du dictionnaire français. L'application que vous
              voyez aujourd'hui découle de cette pensée.
            </p>
            <p className={paragraphCSS}>
              Les listes présentes sur cette plateforme sont conçues pour être
              informatives. Si vous êtes en charge de la gestion, des outils
              sont disponibles pour faciliter vos tâches.
            </p>
            <p className={paragraphCSS}>
              La plateforme est construite avec des outils tels que Node.js et
              React, afin de garantir sa fonctionnalité et sa pérennité.
            </p>

            <p className={subtileParagraphCSS}>
              <BookOpen className='paragraph-icon' />
              <span className='text'>
                Que vous soyez ici pour gérer, contribuer ou simplement
                explorer, nous espérons que cette application répondra à vos
                besoins. Nous vous souhaitons une agréable navigation.
              </span>
            </p>
          </div>

          <div className={imageContainerCSS}>
            <img
              src={book}
              alt='Dictionnaire collaboratif français'
              className={imageCSS}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Typewriter
