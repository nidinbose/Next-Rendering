'use client'

import { useRouter } from 'next/navigation'  
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { GoArrowUpRight } from 'react-icons/go'
import { FaUserMd } from 'react-icons/fa'

export default function DoctorsList() {
  const router = useRouter()
  const [data, setData] = useState([])
  const token=localStorage.getItem("token")

  if(!token){
    router.push(`/Login`)
  }
  const getDoctors = async () => {
    try {
      const res = await axios.get('/api/doctors') 
      setData(Array.isArray(res.data) ? res.data : [])
    } catch (error) {
      console.error('Failed to fetch doctors:', error)
      setData([])
    }
  }

  useEffect(() => {
    getDoctors()
  }, [])

  return (
    <div className="mt-6 p-4 bg-full min-h-full md:h-full container mx-auto">
      <h2 className="mb-12 p-4 bg-[#031b4e] w-60 rounded-full text-white font-semibold text-md text-center">
        Schedule Appointment
      </h2>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center text-gray-500">
          <FaUserMd className="text-6xl mb-4 text-blue-400" />
          <h3 className="text-2xl font-semibold mb-2">No Doctors Available</h3>
          <p className="text-gray-600">
            Please check back later or contact support for more information.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {data.map((item, index) => (
            <Link key={index} href={`/Doctors/${item._id}`}>
              <div className="rounded-3xl bg-white shadow-md overflow-hidden max-w-md mx-auto hover:border hover:border-teal-400 transition">
                <div className="relative">
                  <img
                    src={item.image || '/placeholder.jpg'}
                    alt={item.title || item.name}
                    className="h-90 w-full bg-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-1 text-sm font-semibold flex items-center gap-1 shadow">
                    Available <span className="text-lime-400 font-extrabold">.</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-white/70 backdrop-blur-md px-4 py-2 rounded-full">
                    <button className="font-semibold text-lg truncate">{item.name}</button>
                    <GoArrowUpRight className="w-5 h-5 bg-white p-1 rounded-full shadow" />
                  </div>
                </div>
                <div className="p-4 flex justify-end items-center">
                  <div className="text-center w-full border p-2 rounded-full flex items-center justify-between text-gray-800 font-medium hover:bg-gray-50 transition">
                    {item.stream}
                    <GoArrowUpRight className="w-5 h-5 bg-white p-1 rounded-full shadow ml-2" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
