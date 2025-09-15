import { css } from '~styled-system/css'

export const BackgroundCSS = css({
  objectFit: 'cover',
  objectPosition: '0% 100%',
  width: '100%',
  height: '100%',
  zIndex: -1,
  position: 'fixed',
  top: 0,
  left: 0
})

export const LoginContainerCSS = css({
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
  padding: '20px',
  height: '65vh',

  '@media (min-width: 768px)': {
    padding: '0',
    paddingTop: '0'
  }
})

export const FormCSS = css({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  gap: '20px',
  position: 'relative',
  width: 'min(90%, 359px)',
  maxWidth: '359px',

  '@media (min-width: 768px)': {
    marginTop: '80px'
  }
})

export const InputContainerCSS = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0px',
  width: '100%',
  fontFamily: 'JBM-semibold !important'
})

export const TitleCSS = css({
  fontFamily: 'Helvetica',
  textDecoration: 'line-through',
  alignSelf: 'flex-start',
  fontSize: 'clamp(36px, 8vw, 50px)'
})

export const LineInput = css({
  border: 'none',
  borderBottom: '1px solid white',
  bg: 'transparent',
  color: 'white',
  outline: 'none',
  py: 0,
  pb: '4px',
  px: '0',
  lineHeight: '1.2',
  display: 'block',
  verticalAlign: 'bottom',
  marginTop: '40px',
  boxSizing: 'border-box',
  position: 'relative',
  height: 'auto',
  minHeight: '40px',
  width: '100%',
  fontSize: 'clamp(20px, 5vw, 30px)',

  '&::placeholder': {
    color: 'white'
  },

  _placeholder: {
    color: 'white',
    lineHeight: '1.2',
    fontSize: 'inherit'
  },

  _focus: {
    borderColor: 'white',
    borderBottomWidth: '1.5px',
    color: 'white'
  },

  '&[value]:not([value=""])': {
    color: '#FFE361 !important'
  },

  '&:not(:placeholder-shown)': {
    color: '#FFE361 !important'
  },

  boxShadow: '0 0 0 1000px transparent inset',
  WebkitTextFillColor: 'white',
  caretColor: 'white',

  '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active':
    {
      boxShadow: '0 0 0 1000px transparent inset !important',
      WebkitTextFillColor: '#FFE361 !important',
      backgroundColor: 'transparent !important',
      backgroundClip: 'content-box !important',
      border: 'none !important',
      borderBottom: '1px solid white !important',
      transition: 'all 5000s ease-in-out 0s'
    },

  '&:autofill': {
    backgroundColor: 'transparent !important',
    border: 'none !important',
    borderBottom: '1px solid white !important',
    color: '#FFE361 !important'
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '1px',
    backgroundColor: 'transparent',
    pointerEvents: 'none'
  }
})

export const ErrorMessageCSS = css({
  color: 'rgba(255, 100, 100, 1)',
  fontSize: '14px',
  marginTop: '4px',
  fontFamily: 'JBM-semibold'
})

export const InfoTextCSS = css({
  color: 'rgba(255, 255, 255, 0.8)',
  fontFamily: 'Helvetica',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: '20px',
  padding: '6px 0',
  width: '100%',
  fontSize: 'clamp(12px, 3vw, 14px)'
})

export const KeyboardKeyCSS = css({
  display: 'inline-block',
  padding: '2px 8px',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  borderRadius: '2px',
  fontFamily: 'monospace',
  marginLeft: '4px',
  marginRight: '4px',
  color: 'white',
  background: 'rgba(255, 255, 255, 0.1)',
  fontSize: 'clamp(10px, 2.5vw, 12px)'
})

export const DemoInfoCSS = css({
  color: 'rgba(255, 255, 255, 0.75)',
  fontFamily: 'JBM-semibold',
  bottom: '20%',
  padding: '18px 22px',
  left: '50%',
  background: 'rgba(70, 130, 180, 0.15)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  position: 'fixed',
  transform: 'translateX(-50%)',

  zIndex: 5,
  fontSize: 'clamp(11px, 2.8vw, 13px)',

  // Mobile
  width: 'min(calc(100% - 40px), 280px)',

  '@media (min-width: 768px)': {
    width: 'auto',
    minWidth: '280px',
   
  }
})

export const DemoInfoTitleCSS = css({
  margin: 0,
  marginBottom: '12px',
  color: 'rgba(255, 255, 255, 0.9)',
  fontFamily: 'Helvetica',
  fontWeight: 'normal',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  fontSize: 'clamp(13px, 3.2vw, 16px)',

  '@media (min-width: 768px)': {
    fontSize: '16px',
    marginBottom: '16px'
  }
})

export const CredentialLabelCSS = css({
  margin: 0,
  marginBottom: '6px',
  color: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: 'clamp(12px, 3.2vw, 15px)',

  '@media (min-width: 768px)': {
    fontSize: '15px',
    marginBottom: '8px'
  }
})

export const CredentialValueCSS = css({
  color: '#FFE361',
  letterSpacing: '0.5px',
  fontSize: 'clamp(13px, 3.8vw, 16px)',

  '@media (min-width: 768px)': {
    fontSize: '18px'
  }
})

export const UserLoginCSS = css({
  fontSize: 'clamp(24px, 6vw, 30px)'
})
