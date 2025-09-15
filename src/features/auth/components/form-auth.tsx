import { useForm } from '@tanstack/react-form'
import { useLogin } from '@auth/hooks/auth.hooks'
import { useNavigate } from '@tanstack/react-router'
import { Route as DashboardRoute } from '@/app/routes/dashboard/home'
import forestImg from '@/assets/images/forest-glacial.webp'

import {
  BackgroundCSS,
  FormCSS,
  TitleCSS,
  LineInput,
  ErrorMessageCSS,
  InputContainerCSS,
  InfoTextCSS,
  DemoInfoCSS,
  KeyboardKeyCSS,
  DemoInfoTitleCSS,
  CredentialLabelCSS,
  CredentialValueCSS,
  LoginContainerCSS
} from '@auth/components/form-auth.style'

export default function Login () {
  const loginMutation = useLogin()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      username: 'demo',
      password: 'demo'
    },
    onSubmit: async ({ value }) => {
      try {
        await loginMutation.mutateAsync(value)
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
        <div className={TitleCSS}>Syllabe Boréale</div>

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

          <div className={InfoTextCSS}>
            Press <span className={KeyboardKeyCSS}>Enter</span> to login
          </div>
        </div>

        {loginMutation.isError && (
          <p className={ErrorMessageCSS}>
            {loginMutation.error?.message ?? ''}
          </p>
        )}

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

        <div className={DemoInfoCSS}>
          <p className={DemoInfoTitleCSS}>DEMO ACCOUNT</p>
          <div className={CredentialLabelCSS}>
            Username : <span className={CredentialValueCSS}>demo</span>
          </div>
          <div className={CredentialLabelCSS}>
            Password : <span className={CredentialValueCSS}>demo</span>
          </div>
        </div>
      </form>
    </div>
  )
}
