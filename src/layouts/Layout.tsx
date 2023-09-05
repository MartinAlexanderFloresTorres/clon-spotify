import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ControlsSong from '../components/ControlsSong'
import useMusics from '../hooks/useMusics'

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false)

  // USE MUSICS CONTEXT
  const { music } = useMusics()
  return (
    <div className='bg-spotify-gray min-h-screen text-gray-300'>
      <Header setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <main>{<Outlet />}</main>

      {music && <ControlsSong music={music} />}
    </div>
  )
}

export default Layout
