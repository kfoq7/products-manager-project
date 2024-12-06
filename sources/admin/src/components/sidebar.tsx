'use client'

import React, { useState } from 'react'
import {
  FiMenu,
  FiHome,
  FiShoppingCart,
  FiUser,
  FiSettings,
} from 'react-icons/fi'
import { cn } from '@/lib/utils'

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
          <li className="flex items-center space-x-4 p-3 hover:bg-gray-700 transition cursor-pointer">
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
          </li>
        </ul>
      </nav>
    </div>
  )
}
