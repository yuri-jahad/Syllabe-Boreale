// components/StoreInitializer.tsx
import { useEffect } from 'react'
import { useAuth } from '@auth/hooks/auth.hooks'
import { useStore } from '@/store/store'

export const StoreInitializer = ({
  children
}: {
  children: React.ReactNode
}) => {
  const { user } = useAuth()
  const { setAvatar, setBio, setLocation, setSyllableColor } = useStore()

  useEffect(() => {
    if (user) {
      // Données du profil
      setBio(user.bio || '')
      setLocation(user.location || '')
      setSyllableColor(user.syllable_color || '#3b82f6')

      // Avatar pour le header
      if (user.image_path) {
        setAvatar(user.image_path)
      }

      // CSS variable pour les syllabes
      document.documentElement.style.setProperty(
        '--syllable-color',
        user.syllable_color || '#3b82f6'
      )
    }
  }, [user, setAvatar, setBio, setLocation, setSyllableColor])

  return <>{children}</>
}
