import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import HomePage from './pages/HomePage'
import MusicsProvider from './providers/MusicsProvider'
import SongProvider from './providers/SongProvider'

const App = () => {
  return (
    <BrowserRouter>
      <MusicsProvider>
        <SongProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<HomePage />} />
            </Route>
          </Routes>
        </SongProvider>
      </MusicsProvider>
    </BrowserRouter>
  )
}

export default App
