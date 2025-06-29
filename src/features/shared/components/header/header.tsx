import { useAuth } from '@auth/hooks/auth.hooks'
import {
  AvatarCSS,
  HeaderCSS,
  UserSection,
  RoleText,
  UsernameText
} from '@shared/components/header/header.style'

export default function Header () {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {isAuthenticated && user && (
        <header className={HeaderCSS}>
          <div className={RoleText}>{user.role}</div>
          <div className={UserSection}>
            <div className={UsernameText}>{user.username}</div>
            <img className={AvatarCSS} src={user.avatar} alt='User avatar' />
          </div>
        </header>
      )}
    </>
  )
}
