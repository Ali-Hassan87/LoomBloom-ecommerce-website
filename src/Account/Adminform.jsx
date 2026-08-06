import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { query, where, getDocs, collection, getDoc, doc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import { useNavigate } from 'react-router-dom'

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

const Adminform = () => {
  const [authError, setAuthError] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    setAuthError('')
    setAuthenticated(false)

    try {
      // 1. Firebase Auth login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      const firebaseUser = userCredential.user

      // 2. Firestore se admin data lo
      const q = query(
        collection(db, 'admins'),
        where('email', '==', firebaseUser.email)
      )
      let querySnapshot = await getDocs(q)
      let adminData = null

      if (!querySnapshot.empty) {
        adminData = querySnapshot.docs[0].data()
      } else {
        // UID se try karo
        const docRef = doc(db, 'admins', firebaseUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          adminData = docSnap.data()
        }
      }

      if (!adminData) {
        setAuthError('Admin access denied. You are not authorized.')
        await signOut(auth)  // ✅ FIX: signOut(auth) not auth.signOut()
        return
      }

      // 3. localStorage mein save karo
      const adminUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: adminData.name || 'Admin',
        photoURL: adminData.photoURL || null,
        role: adminData.role || 'admin',
      }

      localStorage.setItem('adminUser', JSON.stringify(adminUser))

      // 🔥 FIX: Custom event fire karo taake UserDropdown ko pata chale
      window.dispatchEvent(new Event('admin-login'))

      setAuthenticated(true)

      setTimeout(() => {
        navigate('/')
      }, 1000)

    } catch (error) {
      console.error(error)
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        setAuthError('Invalid email or password')
      } else if (error.code === 'auth/wrong-password') {
        setAuthError('Invalid password')
      } else {
        setAuthError('Authentication failed: ' + error.message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-semibold text-[#343B2F] tracking-wide">
          Admin Email
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder="Enter admin email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className={`w-full px-4 py-3 bg-[#FAFAF7] border-2 rounded-xl text-[#343B2F] placeholder-[#A8B89A] outline-none transition-all duration-300 ${errors.email
                ? 'border-red-300 focus:border-red-400'
                : 'border-[#E8EBE3] focus:border-[#C5CEB8] focus:bg-white focus:shadow-[0_0_0_4px_rgba(197,206,184,0.15)]'
              }`}
          />
          {errors.email && (
            <span className="absolute right-3 top-3.5 text-red-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </span>
          )}
        </div>
        {errors.email && (
          <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-semibold text-[#343B2F] tracking-wide">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            {...register('password', {
              required: 'Password is required',
            })}
            className={`w-full px-4 py-3 bg-[#FAFAF7] border-2 rounded-xl text-[#343B2F] placeholder-[#A8B89A] outline-none transition-all duration-300 ${errors.password
                ? 'border-red-300 focus:border-red-400'
                : 'border-[#E8EBE3] focus:border-[#C5CEB8] focus:bg-white focus:shadow-[0_0_0_4px_rgba(197,206,184,0.15)]'
              }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-10 top-3.5 text-[#A8B89A] hover:text-[#343B2F] transition-colors duration-200 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <EyeOpen /> : <EyeClosed />}
          </button>

          {errors.password && (
            <span className="absolute right-3 top-3.5 text-red-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </span>
          )}
        </div>
        {errors.password && (
          <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>
        )}
      </div>

      {/* Auth Error */}
      {authError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 animate-pulse">
          <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-red-600 font-medium">{authError}</p>
        </div>
      )}

      {/* Success */}
      {authenticated && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs text-green-600 font-medium">Admin authenticated successfully! Redirecting...</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-4 bg-[#343B2F] hover:bg-[#4a5240] text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_4px_14px_rgba(52,59,47,0.25)] hover:shadow-[0_6px_20px_rgba(52,59,47,0.35)] disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Authenticating...
          </span>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  )
}

export default Adminform