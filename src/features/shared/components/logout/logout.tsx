import { useLogout } from '@auth/hooks/auth.hooks'
import { useRouter } from '@tanstack/react-router'
import {
  LogoutCSS,
  buttonCSS,
  buttonContentCSS,
  iconCSS,
  spinnerCSS
} from './logout.style'

const LogoutIcon = () => (
  <svg
    className={iconCSS}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
  >
    <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
    <polyline points='16,17 21,12 16,7' />
    <line x1='21' y1='12' x2='9' y2='12' />
  </svg>
)

export default function Logout () {
  const { mutate: logout, isPending } = useLogout()
  const router = useRouter()

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        router.navigate({ to: '/login' })
        setTimeout(() => window.location.reload(), 100)
      },
      onError: error => {
        console.error('Logout failed:', error)
        router.navigate({ to: '/' })
      }
    })
  }

  return (
    <div className={LogoutCSS}>
      <button
        onClick={handleLogout}
        disabled={isPending}
        className={buttonCSS}
        title='Se déconnecter'
      >
        <div className={buttonContentCSS}>
          {isPending ? (
            <>
              <span className={spinnerCSS} />
              Déconnexion...
            </>
          ) : (
            <>
              <LogoutIcon />
              Logout
            </>
          )}
        </div>
      </button>
    </div>
  )
}
