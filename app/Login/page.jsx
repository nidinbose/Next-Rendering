'use client'

import { useState } from 'react'
import { FaGoogle, FaApple, FaLock, FaEnvelope } from 'react-icons/fa'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post(`/api/user/login`, { email, password })

      console.log('Login success:', response.data)
      localStorage.setItem('token', response.data.user.token)
      localStorage.setItem('role', response.data.user.role)

      router.push('/')
    } catch (err) {
      console.error('Login failed:', err)
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-full mt-12 xl:mt-0 xl:h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] max-w-md md:max-w-xl p-8 rounded-[30px] bg-[#031b4e] shadow-lg mt-12 md:mt-0"
      >
        <h1 className="mt-12 text-white text-xl font-bold mb-6">Sign into My Doctor</h1>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <h2 className="text-white font-semibold text-lg mb-2">Email</h2>
        <div className="flex items-center bg-white rounded-full px-4 py-2 mb-4">
          <FaEnvelope className="text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm p-1"
            required
          />
        </div>

        <h2 className="text-white font-semibold text-lg mb-2">Password</h2>
        <div className="flex items-center bg-white rounded-full px-4 py-2 mb-2">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm p-1"
            required
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center text-white text-sm">
            <input type="checkbox" className="mr-2 accent-blue-500" />
            Remember me
          </label>
          <a href="#" className="text-white text-sm font-semibold">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full border-2 border-white text-white font-semibold rounded-full py-2 mb-6 hover:bg-white hover:text-orange-500 transition"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <Link href="/Signup">
          <div className="text-center text-white text-sm mb-4 cursor-pointer">
            Don't have an account?{' '}
            <p className="text-white font-semibold underline">Sign Up</p>
          </div>
        </Link>

        <p className="text-center text-white text-sm mb-4">Or With</p>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-white text-black w-1/2 py-3 rounded-full font-medium"
          >
            <FaGoogle />
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-white text-black w-1/2 py-3 rounded-full font-medium"
          >
            <FaApple />
            Apple
          </button>
        </div>
      </form>
    </div>
  )
}
