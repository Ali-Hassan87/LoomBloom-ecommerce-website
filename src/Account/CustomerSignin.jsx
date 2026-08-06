import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  auth,
  signInWithEmailAndPassword,
  googleProvider,
  facebookProvider,
  signInWithPopup
} from '../firebase/config'

// Icons
const EyeOpen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const EyeClosed = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
)

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#E4405F" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const getFirebaseErrorMessage = (code) => {
  const messages = {
    'auth/invalid-email': 'Invalid email address',
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/invalid-credential': 'Invalid email or password',
    'auth/too-many-requests': 'Too many attempts. Try again later',
    'auth/popup-closed-by-user': 'Sign in cancelled',
    'auth/account-exists-with-different-credential': 'Account exists with different sign-in method',
    'auth/network-request-failed': 'Network error. Check your connection',
  };
  return messages[code] || 'Failed to sign in. Please try again.';
};

const CustomerSignin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const [socialLoading, setSocialLoading] = useState(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      setAuthError('')
      await signInWithEmailAndPassword(auth, data.email, data.password)
      navigate('/')
    } catch (error) {
      setAuthError(getFirebaseErrorMessage(error.code))
    }
  }

  const handleSocialLogin = async (provider, name) => {
    if (name === 'instagram') {
      setAuthError('Instagram login is not available right now.')
      return
    }
    setSocialLoading(name)
    setAuthError('')
    try {
      await signInWithPopup(auth, provider)
      navigate('/')
    } catch (error) {
      setAuthError(getFirebaseErrorMessage(error.code))
    } finally {
      setSocialLoading(null)
    }
  }

  const isLoading = isSubmitting || socialLoading

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Firebase Auth Error */}
      {authError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-red-600 font-medium">{authError}</p>
        </div>
      )}

      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="signin-email" className="block text-sm font-semibold text-[#343B2F] tracking-wide">
          Email Address
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-3.5 text-[#A8B89A]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </span>
          <input
            id="signin-email"
            type="email"
            placeholder="your@email.com"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
            })}
            className={`w-full pl-11 pr-4 py-3 bg-[#FAFAF7] border-2 rounded-xl text-[#343B2F] placeholder-[#A8B89A] outline-none transition-all duration-300 ${errors.email
                ? 'border-red-300 focus:border-red-400'
                : 'border-[#E8EBE3] focus:border-[#C5CEB8] focus:bg-white focus:shadow-[0_0_0_4px_rgba(197,206,184,0.15)]'
              }`}
          />
        </div>
        {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="signin-password" className="block text-sm font-semibold text-[#343B2F] tracking-wide">
            Password
          </label>
          <button type="button" className="text-xs text-[#6B7460] hover:text-[#343B2F] transition-colors underline underline-offset-2">
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <span className="absolute left-3.5 top-3.5 text-[#A8B89A]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </span>
          <input
            id="signin-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register('password', { required: 'Password is required' })}
            className={`w-full pl-11 pr-4 py-3 bg-[#FAFAF7] border-2 rounded-xl text-[#343B2F] placeholder-[#A8B89A] outline-none transition-all duration-300 ${errors.password
                ? 'border-red-300 focus:border-red-400'
                : 'border-[#E8EBE3] focus:border-[#C5CEB8] focus:bg-white focus:shadow-[0_0_0_4px_rgba(197,206,184,0.15)]'
              }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-[#A8B89A] hover:text-[#343B2F] transition-colors duration-200 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <EyeOpen /> : <EyeClosed />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 px-4 bg-[#C5CEB8] hover:bg-[#B5BEA8] text-[#343B2F] font-bold rounded-xl transition-all duration-300 shadow-[0_4px_14px_rgba(197,206,184,0.4)] hover:shadow-[0_6px_20px_rgba(197,206,184,0.5)] disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-[#343B2F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Signing In...
          </span>
        ) : (
          'Sign In'
        )}
      </button>

      {/* Social Login */}
      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E8EBE3]" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-[#41463b] font-medium">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          type="button"
          onClick={() => handleSocialLogin(googleProvider, 'google')}
          disabled={isLoading}
          className="p-3 rounded-xl border border-[#E8EBE3] bg-white hover:bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <GoogleIcon />
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin(facebookProvider, 'facebook')}
          disabled={isLoading}
          className="p-3 rounded-xl border border-[#E8EBE3] bg-white hover:bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FacebookIcon />
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin(null, 'instagram')}
          disabled={isLoading}
          className="p-3 rounded-xl border border-[#E8EBE3] bg-white hover:bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <InstagramIcon />
        </button>
      </div>
    </form>
  )
}

export default CustomerSignin