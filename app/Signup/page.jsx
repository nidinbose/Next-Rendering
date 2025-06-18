'use client'

import { useState } from 'react'
import { FaGoogle, FaApple, FaLock, FaEnvelope, FaUser } from 'react-icons/fa'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Signup() {
  const [userName, setUserName] = useState('')
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
      const response = await axios.post('/api/user', { userName, email, password,role:'user' })
      console.log('Signup success:', response.data)
      router.push('/Login') 
    } catch (err) {
      console.error('Signup failed:', err)
      setError('Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-full mt-10 xl:mt-0 xl:h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] max-w-md md:max-w-xl p-8 rounded-[30px] bg-[#031b4e] shadow-lg mt-12 md:mt-0"
      >
        <h1 className="mt-12 text-white text-xl font-bold mb-6">Create an Account</h1>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <h2 className="text-white font-semibold text-lg mb-2">Username</h2>
        <div className="flex items-center bg-white rounded-full px-4 py-2 mb-4">
          <FaUser className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Enter your Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm p-1"
            required
          />
        </div>

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
        <div className="flex items-center bg-white rounded-full px-4 py-2 mb-4">
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

        <button
          type="submit"
          disabled={loading}
          className="w-full border-2 border-white text-white font-semibold rounded-full py-2 mb-6 hover:bg-white hover:text-orange-500 transition mt-10"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
<Link href={`/Login`}>
       
        <div className="text-center text-white text-sm mb-4">
          Already have an account?{' '}
          <p className="text-white font-semibold">
            Sign In
          </p>
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
