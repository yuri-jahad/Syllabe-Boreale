import { css } from '~styled-system/css'

export const searchContainerCSS = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '100%',
  maxWidth: '500px'
})

export const inputWrapperCSS = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  background: 'transparent',
  border: 'none',
  borderBottom: '2px solid rgba(148, 163, 184, 0.15)',
  borderRadius: '0',
  padding: '18px 0 14px 0',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: '50%',
    width: '0',
    height: '2px',
    background:
      'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translateX(-50%)'
  },

  '&:hover': {
    borderBottomColor: 'rgba(148, 163, 184, 0.3)',

    '&::before': {
      width: '20%'
    }
  },

  '&.focused': {
    borderBottomColor: 'rgba(59, 130, 246, 0.4)',

    '&::before': {
      width: '100%'
    }
  }
})

export const modernInputCSS = css({
  flex: 1,
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#f8fafc',
  fontSize: '18px',
  fontWeight: '400',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  lineHeight: '1.4',
  padding: '0',
  letterSpacing: '0.3px',

  '&::placeholder': {
    color: 'rgba(148, 163, 184, 0.4)',
    fontWeight: '400',
    fontSize: '18px'
  },

  '&:focus::placeholder': {
    color: 'rgba(148, 163, 184, 0.25)',
    transform: 'translateY(-1px)'
  },

  '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus': {
    WebkitTextFillColor: '#f8fafc !important'
  }
})

export const clearButtonCSS = css({
  width: '24px',
  height: '24px',
  marginLeft: '12px',
  background: 'rgba(148, 163, 184, 0.08)',
  border: 'none',
  borderRadius: '6px',
  color: 'rgba(148, 163, 184, 0.5)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  flexShrink: 0,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 0,
  transform: 'scale(0.8)',
  fontWeight: '600',

  '&.visible': {
    opacity: 1,
    transform: 'scale(1)'
  },

  '&:hover': {
    color: '#ef4444',
    background: 'rgba(239, 68, 68, 0.1)',
    transform: 'scale(1.1)',
    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.15)'
  },

  '&:active': {
    transform: 'scale(0.95)'
  }
})

export const metaInfoCSS = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0 0 0',
  minHeight: '20px',
  opacity: 0.8
})

export const counterCSS = css({
  fontSize: '11px',
  color: 'rgba(148, 163, 184, 0.4)',
  fontWeight: '500',
  fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
  letterSpacing: '0.5px',

  '&.warning': {
    color: 'rgba(245, 158, 11, 0.6)'
  },

  '&.error': {
    color: 'rgba(239, 68, 68, 0.6)'
  }
})

export const suggestionCSS = css({
  fontSize: '11px',
  color: 'rgba(148, 163, 184, 0.4)',
  fontWeight: '400',
  fontStyle: 'italic',
  letterSpacing: '0.2px'
})

import { useState, useCallback, useRef } from 'react'
import type { ChangeEvent } from 'react'

interface SearchInputProps {
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  maxLength?: number
  minLength?: number
  showSuggestion?: boolean
}

export default function SearchInput ({
  handleOnChange,
  placeholder = 'Search for a word...',
  maxLength = 30,
  minLength = 1,
  showSuggestion = true
}: SearchInputProps) {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      setValue(newValue)
      handleOnChange(event)
    },
    [handleOnChange]
  )

  const handleClear = useCallback(() => {
    setValue('')
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()

      const syntheticEvent = {
        target: inputRef.current,
        currentTarget: inputRef.current
      } as ChangeEvent<HTMLInputElement>

      handleOnChange(syntheticEvent)
    }
  }, [handleOnChange])

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape' && value) {
        event.preventDefault()
        handleClear()
      }
    },
    [value, handleClear]
  )

  const charCount = value.length
  const isWarning = charCount >= maxLength * 0.8
  const isError = charCount >= maxLength

  const counterClass = isError ? 'error' : isWarning ? 'warning' : ''

  const getSuggestion = () => {
    if (!showSuggestion) return ''

    if (charCount < minLength) {
      const remaining = minLength - charCount
      return `${remaining} character${remaining > 1 ? 's' : ''} minimum`
    }
    if (isError) return 'limit reached'

    return ''
  }

  return (
    <div className={searchContainerCSS}>
      <div className={`${inputWrapperCSS} ${isFocused ? 'focused' : ''}`}>
        <input
          ref={inputRef}
          className={modernInputCSS}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          maxLength={maxLength}
          autoComplete='off'
          spellCheck='false'
        />

        {value && (
          <button
            className={`${clearButtonCSS} visible`}
            onClick={handleClear}
            tabIndex={-1}
            aria-label='Clear (Escape)'
            title='Clear'
          >
            ×
          </button>
        )}
      </div>

      {showSuggestion && (
        <div className={metaInfoCSS}>
          <div className={suggestionCSS}>{getSuggestion()}</div>
          <div className={`${counterCSS} ${counterClass}`}>
            {charCount}/{maxLength}
          </div>
        </div>
      )}
    </div>
  )
}