import { createContext } from 'react'
import { useGlobalAudioPlayer, LoadArguments } from 'react-use-audio-player'

const SongContext = createContext({} as ContextProps)

interface ContextProps {
  seek: (time: number) => void
  load: (...args: LoadArguments) => void
  isLoading: boolean
  isReady: boolean
  duration: number
  volume: number
  looping: boolean
  muted: boolean
  playing: boolean
  getPosition: () => number
  togglePlayPause: () => void
  setVolume: (volume: number) => void
  loop: (loop: boolean) => void
  mute: (mute: boolean) => void
}

interface Props {
  children: React.ReactNode
}

const SongProvider = ({ children }: Props) => {
  // Estados y funciones de react-use-audio-player
  const {
    seek,
    load,
    isLoading,
    isReady,
    duration,
    volume,
    looping,
    muted,
    playing,
    getPosition,
    togglePlayPause,
    setVolume,
    loop,
    mute
  } = useGlobalAudioPlayer()

  return (
    <SongContext.Provider
      value={{
        seek,
        load,
        isLoading,
        isReady,
        duration,
        volume,
        looping,
        muted,
        playing,
        getPosition,
        togglePlayPause,
        setVolume,
        loop,
        mute
      }}
    >
      {children}
    </SongContext.Provider>
  )
}

export { SongContext }
export default SongProvider
