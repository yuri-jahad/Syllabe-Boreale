import { useForm } from '@tanstack/react-form'
import { useLogin } from '@auth/hooks/auth.hooks'
import { useNavigate } from '@tanstack/react-router'
import { Route as DashboardRoute } from '@/app/routes/dashboard/home'
import forestImg from '@/assets/images/forest-glacial.png'

import {
  BackgroundCSS,
  FormCSS,
  TitleCSS,
  LineInput,
  ErrorMessageCSS,
  InputContainerCSS,
  InfoTextCSS,
  GuestInfoCSS,
  KeyboardKeyCSS,
  GuestInfoTitleCSS,
  CredentialLabelCSS,
  CredentialValueCSS,
  LoginContainerCSS
} from '@auth/components/form-auth.style'

export default function Login () {
  const loginMutation = useLogin()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await loginMutation.mutateAsync(value)

        console.log(result.data)
        console.log('Login successful!')
        console.log(DashboardRoute.fullPath)
        console.log(DashboardRoute.fullPath)
        navigate({ to: DashboardRoute.fullPath })
      } catch (error) {
        console.error('Login error:', error)
      }
    }
  })

  return (
    <div className={LoginContainerCSS}>
      <img src={forestImg} alt='forest' className={BackgroundCSS} />

      <form
        className={FormCSS}
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className={TitleCSS}>ICE POETRY</div>

        <div
          className={InputContainerCSS}
          style={{ fontFamily: 'JetBrains Mono' }}
        >
          <div>
            <form.Field
              name='username'
              validators={{
                onChange: ({ value }) => (!value ? '' : undefined),
                onBlur: ({ value }) => (value.length < 3 ? '' : undefined)
              }}
              children={field => (
                <div>
                  <input
                    placeholder='Username'
                    className={LineInput}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    autoComplete='username'
                  />
                  {field.state.meta.errors && field.state.meta.isTouched ? (
                    <p className={ErrorMessageCSS}>
                      {field.state.meta.errors.join(', ')}
                    </p>
                  ) : null}
                </div>
              )}
            />
          </div>

          <div>
            <form.Field
              name='password'
              validators={{
                onChange: ({ value }) => (!value ? '' : undefined),
                onBlur: ({ value }) => (value.length < 3 ? '' : undefined)
              }}
              children={field => (
                <div>
                  <input
                    className={LineInput}
                    placeholder='Password'
                    id={field.name}
                    name={field.name}
                    type='password'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    autoComplete='current-password'
                  />
                  {field.state.meta.errors && field.state.meta.isTouched ? (
                    <p className={ErrorMessageCSS}>
                      {field.state.meta.errors.join(', ')}
                    </p>
                  ) : null}
                </div>
              )}
            />
          </div>

          {/* "Press Enter" amélioré */}
          <div className={InfoTextCSS}>
            Press <span className={KeyboardKeyCSS}>Enter</span> to login
          </div>
        </div>

        {loginMutation.isError && (
          <p className={ErrorMessageCSS}>
            {loginMutation.error?.message ?? ''}
          </p>
        )}

        {/* Bouton caché pour la soumission par Enter */}
        <button
          type='submit'
          disabled={loginMutation.isPending}
          style={{
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none'
          }}
        >
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </button>

        {/* Bloc d'information sur mobile, sera repositionné sur desktop par le CSS */}
        <div className={GuestInfoCSS}>
          <p className={GuestInfoTitleCSS}>DEMO ACCOUNT</p>
          <div className={CredentialLabelCSS}>
            Username : <span className={CredentialValueCSS}>guest</span>
          </div>
          <div className={CredentialLabelCSS}>
            Password : <span className={CredentialValueCSS}>hello</span>
          </div>
        </div>
      </form>
    </div>
  )
}
