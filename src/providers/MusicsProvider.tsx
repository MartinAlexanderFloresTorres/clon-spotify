import { createContext, useState } from 'react'
import { Album, Music } from '../interfaces'
import { listsAlbums } from '../data/lists-albums'

const MusicsContext = createContext<ContextProps>({} as ContextProps)

interface Props {
  children: React.ReactNode
}

interface ContextProps {
  albums: Album[]
  playMusic: (music: Music) => void
  music: Music | null
  musics: Music[]
  clearMusic: () => void
}

const MusicsProvider = ({ children }: Props) => {
  // ESTADOS
  const [albums] = useState<Album[]>(listsAlbums)
  const [musics, setMusics] = useState<Music[]>([])
  const [music, setMusic] = useState<Music | null>(null)

  // FUNCIONES
  const playMusic = (music: Music) => {
    // Guardar la musica
    setMusic(music)

    // Buscar el album
    const album = albums.find((album) => album.id === music.albumId)

    // Si existe el album guardamos las canciones
    if (album) {
      setMusics(album.songs)
    }
  }

  const clearMusic = () => {
    setMusic(null)
  }

  // RETORNO
  return (
    <MusicsContext.Provider value={{ albums, music, musics, playMusic, clearMusic }}>
      {children}
    </MusicsContext.Provider>
  )
}

export { MusicsContext }
export default MusicsProvider
