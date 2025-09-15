import { useStore } from '@/store/store'
import { useAuth } from '@auth/hooks/auth.hooks'
import {
  AvatarCSS,
  HeaderCSS,
  UserSection,
  RoleText,
  UsernameText,
  HeaderContentCSS
} from '@shared/components/header/header.style'

export default function Header () {
  const { user, isAuthenticated, isLoading } = useAuth()
  const { avatar } = useStore()

  const avatarUrl = avatar || user?.image_path
  console.log(avatarUrl)

  if (isLoading) {
    return (
      <header className={HeaderCSS}>
        <div className={HeaderContentCSS}>
          <div className={RoleText}>Loading...</div>
          <div className={UserSection}>
            <div className={UsernameText}>Loading...</div>
            <div className={AvatarCSS} />
          </div>
        </div>
      </header>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <header className={HeaderCSS}>
      <div className={HeaderContentCSS}>
        <div className={RoleText}>{user.role}</div>

        <div className={UserSection}>
          <div className={UsernameText}>{user.username}</div>
          {avatarUrl && (
            <picture>
              {avatarUrl.includes('.avif') && (
                <source srcSet={avatarUrl} type='image/avif' />
              )}
              {avatarUrl.includes('.webp') && (
                <source srcSet={avatarUrl} type='image/webp' />
              )}
              {avatarUrl.includes('.webm') ? (
                <video
                  className={AvatarCSS}
                  src={avatarUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  className={AvatarCSS}
                  src={avatarUrl}
                  alt={`Avatar de ${user.username}`}
                  onError={e => {
                    const target = e.target as HTMLImageElement
                    target.src = ''
                  }}
                />
              )}
            </picture>
          )}
        </div>
      </div>
    </header>
  )
}
