'use client'

import React, { useState } from 'react'
import {
  FiMenu,
  FiHome,
  FiShoppingCart,
  FiShoppingBag,
  // FiUser,
  // FiSettings,
} from 'react-icons/fi'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const links = [
  {
    name: 'Inicio',
    to: '/',
    icon: <FiHome />,
  },
  {
    name: 'Ventas',
    to: '/sales',
    icon: <FiShoppingCart />,
  },
  {
    name: 'Productos',
    to: '/products',
    icon: <FiShoppingBag />,
  },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div
      className={cn(
        `bg-gray-800 text-white min-h-screen transition-all duration-300`,
        isOpen ? 'w-64' : 'w-16',
      )}
    >
      <div className="p-4 flex justify-between items-center">
        <button className="text-xl focus:outline-none" onClick={toggleSidebar}>
          <FiMenu />
        </button>
      </div>

      <nav className="mt-4">
        <ul>
          {links.map(({ name, to, icon }) => (
            <li key={name}>
              <Link
                href={to}
                className="flex items-center space-x-4 p-3 hover:bg-gray-700 transition cursor-pointer"
              >
                {icon}
                {isOpen && <span>{name}</span>}
              </Link>
            </li>
          ))}
          {/* <li className="flex items-center space-x-4 p-3 hover:bg-gray-700 transition cursor-pointer">
            <FiHome />
            {isOpen && <span>Home</span>}
          </li>
          <li className="flex items-center space-x-4 p-3 hover:bg-gray-700 transition cursor-pointer">
            <FiShoppingCart />
            {isOpen && <span>Shop</span>}
          </li>
          <li className="flex items-center space-x-4 p-3 hover:bg-gray-700 transition cursor-pointer">
            <FiUser />
            {isOpen && <span>Profile</span>}
          </li>
          <li className="flex items-center space-x-4 p-3 hover:bg-gray-700 transition cursor-pointer">
            <FiSettings />
            {isOpen && <span>Settings</span>}
          </li> */}
        </ul>
      </nav>
    </div>
  )
}
