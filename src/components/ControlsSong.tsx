import { useEffect, useState } from 'react'
import {
  BsSuitHeart,
  /*   BsSuitHeartFill, */
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsFillVolumeDownFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
  BsRepeat
} from 'react-icons/bs'
import { BiShuffle } from 'react-icons/bi'
import { Music } from '../interfaces'
import useMusics from '../hooks/useMusics'
import format from 'format-duration'
import useSong from '../hooks/useSong'

interface Props {
  music: Music
}

const ControlsSong = ({ music }: Props) => {
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
  } = useSong()

  // Estado para el volumen inicial
  const [initialVolume, setInitialVolume] = useState<number>(0.5)

  // Estado para el índice de la canción actual
  const [songIndex, setSongIndex] = useState<number>(0)

  // Estado para el valor actual del input range
  const [currentRangeValue, setCurrentRangeValue] = useState<number>(0)

  // Función para actualizar el valor del input range
  const updateRangeValue = () => {
    if (isReady && playing) {
      // Obtener la posición actual y actualizar el valor del input range
      const currentPosition = getPosition()
      const percentage = (currentPosition / duration) * 100
      setCurrentRangeValue(percentage)
    }
  }

  // Efecto para actualizar continuamente el valor del input range mientras se reproduce la música
  useEffect(() => {
    const updateInterval = setInterval(updateRangeValue, 1000) // Actualizar cada segundo
    return () => clearInterval(updateInterval) // Limpiar el temporizador cuando el componente se desmonta
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, playing, duration])

  // USE MUSICS CONTEXT
  const { musics, playMusic } = useMusics()

  // effect load
  useEffect(() => {
    // Si no hay musica no hacemos nada
    if (!music) return

    // Si hay musica la cargamos
    load(music.url, {
      autoplay: true,
      onload: () => {
        mute(false)
        // Buscamos el indice de la cancion
        setSongIndex(musics.findIndex((song) => song.id === music.id))
      },
      onend: () => console.log('Acabo')
    })
  }, [load, music.url, mute, musics, music])

  // effect muted
  useEffect(() => {
    if (muted) {
      setVolume(0)
    } else {
      setVolume(initialVolume)
    }
  }, [muted, setVolume, initialVolume])

  // handleVolume
  const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setVolume(value / 100)
    setInitialVolume(value / 100)
  }

  // change song
  const handleChangeSong = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    // Calculamos la duracion total de la cancion
    const duracionTotal = duration * 1000
    // Calculamos la nueva duracion
    const nuevaDuracion = (duracionTotal * (value / 100)) / 1000
    seek(nuevaDuracion)
  }

  // Next music
  const nextMusic = () => {
    // Si es la ultima cancion volvemos a la primera
    if (songIndex + 1 >= musics.length) {
      playMusic(musics[0])
      setSongIndex(0)
      return
    }

    // Si no es la ultima cancion
    playMusic(musics[songIndex + 1])
    setSongIndex(songIndex + 1)
  }

  // Prev music
  const prevMusic = () => {
    // Si es la primera cancion volvemos a la ultima
    if (songIndex - 1 < 0) {
      playMusic(musics[musics.length - 1])
      setSongIndex(musics.length - 1)
      return
    }

    // Si no es la primera cancion
    playMusic(musics[songIndex - 1])
    setSongIndex(songIndex - 1)
  }

  if (isLoading || !isReady) {
    return (
      <div className='fixed bottom-0 left-0 right-0 bg-black z-50 text-white p-4 flex items-center justify-between'>
        <div className='flex items-center justify-between gap-2 itc'>
          <div className='flex items-center space-x-4'>
            <div className='animate-pulse flex space-x-4'>
              <div className='rounded-full bg-slate-700 h-10 w-10'></div>
            </div>

            <div className='animate-pulse flex flex-col gap-1 w-20'>
              <div className='bg-slate-700 h-2 w-20 rounded-sm'></div>
              <div className='bg-slate-700 h-2 w-10 rounded-sm'></div>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='animate-pulse flex space-x-4'>
              <div className='rounded-full bg-slate-700 h-6 w-6'></div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 items-center justify-between flex-1'>
          <div className='flex items-center space-x-4'>
            <div className='animate-pulse flex space-x-4'>
              <div className='rounded-full bg-gray-800 h-8 w-8'></div>
            </div>

            <div className='animate-pulse flex space-x-4'>
              <div className='rounded-full bg-gray-800 h-8 w-8'></div>
            </div>

            <div className='animate-pulse flex space-x-4'>
              <div className='rounded-full bg-green-600 h-12 w-12'></div>
            </div>

            <div className='animate-pulse flex space-x-4'>
              <div className='rounded-full bg-gray-800 h-8 w-8'></div>
            </div>

            <div className='animate-pulse flex space-x-4'>
              <div className='rounded-full bg-gray-800 h-8 w-8'></div>
            </div>
          </div>

          <div className='flex items-center gap-2 text-gray-300 text-sm w-full max-w-lg'>
            <span className='text-gray-300'>0:00</span>
            <div className='animate-pulse flex space-x-4 w-full'>
              <div className='rounded-lg bg-gray-800 h-3 w-full'></div>
            </div>
            <span className='text-gray-300'>0:00</span>
          </div>
        </div>

        <div className='flex items-center justify-between gap-2'>
          <div className='animate-pulse flex space-x-4'>
            <div className='rounded-full bg-gray-800 h-8 w-8'></div>
          </div>

          <div className='animate-pulse flex space-x-4'>
            <div className='rounded-lg bg-gray-800 h-3 w-32'></div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-black z-50 text-white p-4 flex items-center justify-between'>
      <div className='flex items-center justify-between gap-2 itc'>
        <div className='flex items-center space-x-4'>
          <img src='/vite.svg' alt='song' className='w-6 h-6 rounded' />
          <div>
            <h2 className='text-sm font-semibold truncate w-20'>{music.title}</h2>
            <p className='text-gray-300 text-xs truncate w-20'> {music.artist}</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <button className='text-gray-300 hover:text-white  text-1xl p-2 transition-all'>
            <BsSuitHeart />
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-2 items-center justify-between flex-1'>
        <div className='flex items-center space-x-4'>
          <button className='text-gray-300 hover:text-white text-2xl p-2 transition-all'>
            <BiShuffle />
          </button>

          <button
            className='text-gray-300 hover:text-white text-3xl p-2 transition-all'
            onClick={prevMusic}
          >
            <BsFillSkipStartFill />
          </button>

          <button
            className='text-white bg-green-500 hover:scale-[1.1] transition-all rounded-full text-3xl p-2'
            onClick={() => togglePlayPause()}
          >
            {playing ? <BsFillPauseFill /> : <BsFillPlayFill />}
          </button>

          <button
            className='text-gray-300 hover:text-white text-3xl p-2 transition-all'
            onClick={nextMusic}
          >
            <BsFillSkipEndFill />
          </button>

          <button
            className={`text-gray-300  text-2xl p-2 transition-all ${
              looping ? 'text-green-500' : 'hover:text-white'
            }`}
            onClick={() => loop(!looping)}
          >
            <BsRepeat />
          </button>
        </div>

        <div className='flex items-center gap-2 text-gray-300 text-sm w-full max-w-lg'>
          <span>{format(getPosition() * 1000)}</span>
          <input
            type='range'
            value={currentRangeValue}
            min={0}
            step={0.01} // Puedes ajustar el paso según tus necesidades
            onChange={handleChangeSong}
            className='h-2 bg-gray-600 w-full'
            disabled={!playing} // Deshabilitamos el input si no está reproduciendo
          />
          <span>{format(duration * 1000)}</span>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <button
          className='text-gray-300 hover:text-white text-3xl p-2 transition-all'
          onClick={() => mute(!muted)}
        >
          {volume === 0 || muted ? (
            <BsFillVolumeMuteFill />
          ) : volume < 0.5 ? (
            <BsFillVolumeDownFill />
          ) : (
            <BsFillVolumeUpFill />
          )}
        </button>
        <input
          type='range'
          value={volume * 100}
          onChange={handleChangeVolume}
          className='h-2 bg-gray-600 w-full'
        />
      </div>
    </div>
  )
}

export default ControlsSong
