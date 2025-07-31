import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout 