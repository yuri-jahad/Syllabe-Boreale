import React, { useState, useEffect } from 'react'
import { css } from '~styled-system/css'
import { BookOpen } from 'lucide-react'
import book from '@/assets/images/book.webp'

interface PropsText {
  text: string
}

const containerCSS = css({
  minHeight: '84vh',
  padding: '2rem 3rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  maxWidth: '1200px',
  margin: '0 auto',
  position: 'relative',
  overflow: 'visible',

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

  '@media (max-width: 1300px)': {
    height: 'fit-content',
    padding: '1rem',
    paddingTop: '4rem',
    paddingBottom: '2rem',
    justifyContent: 'flex-start',
    maxWidth: '100%',
    margin: '0'
  },

  '@media (max-width: 768px)': {
    padding: '0.5rem',
    paddingTop: '3rem',
    paddingBottom: '2rem',
    minHeight: 'fit-content'
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

  '@media (max-width: 1300px)': {
    fontSize: '2.4rem',
    marginBottom: '2rem',
    textAlign: 'center',
    width: '100%',
    justifyContent: 'center'
  },

  '@media (max-width: 768px)': {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    minHeight: '2.5rem'
  },

  '@media (max-width: 480px)': {
    fontSize: '1.8rem',
    marginBottom: '1rem'
  }
})

const containerParagraphBasicCSS = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
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
  fontFamily: 'Geist, "Inter", system-ui, sans-serif',

  '@media (max-width: 1300px)': {
    fontSize: '2.1rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    width: '100%',
    justifyContent: 'center'
  },

  '@media (max-width: 768px)': {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    minHeight: '2.5rem'
  },

  '@media (max-width: 480px)': {
    fontSize: '1.6rem',
    marginBottom: '0.8rem'
  }
})

const contentCSS = css({
  display: 'grid',
  gridTemplateColumns: '1.2fr 0.8fr',
  gap: '3rem',
  alignItems: 'center',
  width: '100%',
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',

  '&.visible': {
    opacity: 1,
    transform: 'translateY(0)'
  },

  '@media (max-width: 1300px)': {
    gridTemplateColumns: '1fr',
    gap: '2rem',
    textAlign: 'center'
  },

  '@media (max-width: 1024px)': {
    gap: '1.5rem'
  },

  '@media (max-width: 768px)': {
    gap: '1rem'
  }
})

const textSectionCSS = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  gap: '1.5rem',

  '@media (max-width: 1300px)': {
    gap: '1rem',
    maxWidth: '70%',
    margin: '0 auto'
  },

  '@media (max-width: 768px)': {
    gap: '0.8rem',
    maxWidth: '80%'
  }
})

const paragraphCSS = css({
  fontSize: '16px',
  color: '#D1D5DB',
  lineHeight: '1.7',
  margin: '0',
  fontFamily: '"Inter", system-ui, sans-serif',
  '&:first-child': {
    fontSize: '16px',
    letterSpacing: '0.01em'
  },

  '@media (max-width: 1300px)': {
    fontSize: '1rem',
    textAlign: 'center',
    padding: '0 1rem',

    '&:first-child': {
      fontSize: '1.05rem'
    },

    '&:last-child': {
      fontSize: '1rem',
      padding: '1.2rem'
    }
  },

  '@media (max-width: 768px)': {
    fontSize: '0.95rem',
    lineHeight: '1.6',

    '&:first-child': {
      fontSize: '1rem'
    },

    '&:last-child': {
      fontSize: '0.95rem',
      padding: '1.2rem'
    }
  },

  '@media (max-width: 480px)': {
    fontSize: '0.9rem',

    '&:last-child': {
      padding: '1rem'
    }
  }
})

const subtileParagraphCSS = css({
  fontSize: '1.1rem',
  color: 'rgba(255, 255, 255, 0.6)',
  lineHeight: '1.7',
  margin: '0',
  fontFamily: '"Inter", system-ui, sans-serif',
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

  '@media (max-width: 1300px)': {
    fontSize: '1rem',
    padding: '1.5rem',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '0.75rem',

    '& .paragraph-icon': {
      width: '1.5rem',
      height: '1.5rem',
      marginTop: '0'
    }
  },

  '@media (max-width: 768px)': {
    fontSize: '0.95rem',
    padding: '1.2rem',
    borderRadius: '10px',

    '& .paragraph-icon': {
      width: '1.3rem',
      height: '1.3rem'
    }
  },

  '@media (max-width: 480px)': {
    fontSize: '0.9rem',
    padding: '1rem'
  }
})

const imageContainerCSS = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  height: 'auto',

  '@media (max-width: 1300px)': {
    order: -1,
    marginBottom: '1.5rem'
  },

  '@media (max-width: 768px)': {
    marginBottom: '1rem'
  }
})

const imageCSS = css({
  width: '100%',
  maxWidth: '300px',
  height: 'auto',
  borderRadius: '8px',
  opacity: 0.8,

  '@media (max-width: 1300px)': {
    maxWidth: '220px',
    height: 'auto'
  },

  '@media (max-width: 768px)': {
    maxWidth: '180px',
    height: 'auto'
  },

  '@media (max-width: 480px)': {
    maxWidth: '150px',
    height: 'auto'
  }
})

const Typewriter: React.FC<PropsText> = ({ text }) => {
  const [charIndex, setCharIndex] = useState(0)
  const [showParagraphs, setShowParagraphs] = useState(false)
  const introText = text

  useEffect(() => {
    const img = new Image()
    img.src = book
  }, [])

  useEffect(() => {
    if (charIndex < introText.length) {
      const timer = setTimeout(() => {
        setCharIndex(charIndex + 1)
      }, 20)
      return () => clearTimeout(timer)
    } else {
      const showTimer = setTimeout(() => {
        setShowParagraphs(true)
      }, 100)
      return () => clearTimeout(showTimer)
    }
  }, [charIndex, introText.length])

  return (
    <div className={containerCSS}>
      <h1 className={showParagraphs ? titleCompleteCSS : titleCSS}>
        {introText.slice(0, charIndex)}
      </h1>

      <div className={`${contentCSS} ${showParagraphs ? 'visible' : ''}`}>
        <div className={textSectionCSS}>
          <div className={containerParagraphBasicCSS}>
            <p className={paragraphCSS}>
              The idea was simple: create a space to collaborate around the
              French dictionary. The application you see today grew out of that
              concept.
            </p>
            <p className={paragraphCSS}>
              Here, everything revolves around words – explore rare syllables,
              browse words and their definitions, and discover the richness of
              the French language through interactive lists.
            </p>
            <p className={paragraphCSS}>
              The platform is built with modern web technologies to ensure both
              reliability and sustainability.
            </p>
            <p className={paragraphCSS}>
              These lists are designed to be both useful and educational, making
              the exploration of words an engaging and enriching experience.
            </p>
          </div>

          <p className={subtileParagraphCSS}>
            <BookOpen className='paragraph-icon' />
            <span className='text'>
              Whether you’re here to manage content, contribute, or simply
              explore, we hope this application meets your needs. Enjoy your
              exploration and happy browsing!
            </span>
          </p>
        </div>

        <div className={imageContainerCSS}>
          <img
            src={book}
            alt='Collaborative French Dictionary'
            width='300'
            height='400'
            className={imageCSS}
            loading='lazy'
          />
        </div>
      </div>
    </div>
  )
}

export default Typewriter
