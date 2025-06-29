import React from 'react'
import { ModalCSS } from '@shared/components/modal/modal.style'

interface ModalProps {
  children?: React.ReactNode
  onClose?: () => void
  showCloseButton?: boolean
}

export default function Modal ({
  children,
  onClose,
  showCloseButton = true
}: ModalProps) {
  // Lock le scroll du body
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '0px'

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [])

  return (
    <div className={ModalCSS}>
      <div className='modal-overlay' onClick={onClose} />
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        {/* Bouton fermer optimisé */}
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className='absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-slate-700/80 border border-cyan-400/30 rounded-xl text-slate-400 hover:bg-red-600/20 hover:border-red-400/40 hover:text-red-300 transition-all duration-300 z-50 backdrop-blur-sm'
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}
          >
            ✕
          </button>
        )}

        {children}
      </div>
    </div>
  )
}
