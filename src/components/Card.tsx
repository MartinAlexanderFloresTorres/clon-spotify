import { Link } from 'react-router-dom'
import { RiPauseFill, RiPlayFill } from 'react-icons/ri'
import useMusics from '../hooks/useMusics'
import { Music } from '../interfaces'
import useSong from '../hooks/useSong'

interface Props {
  music: Music
}
const Card = ({ music }: Props) => {
  // USE MUSICS CONTEXT
  const { playMusic, music: selected } = useMusics()

  const { playing, togglePlayPause } = useSong()

  return (
    <Link
      to='/'
      className='bg-spotify-lightgray rounded-lg p-4 hover:bg-spotify-lightgrayHover transition-all group'
    >
      <div className='mb-4 relative'>
        <img
          src={music.imageUrl}
          width={200}
          height={350}
          alt='Album'
          className='rounded drop-shadow-2xl mx-auto'
        />

        <button
          onClick={() => {
            if (selected) {
              togglePlayPause()
            }
            playMusic(music)
          }}
          className='p-3 text-3xl bg-spotify-green rounded-full text-spotify-gray absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 ease-out'
        >
          {selected?.id === music.id && playing ? <RiPauseFill /> : <RiPlayFill />}
        </button>
      </div>
      <div>
        <h5 className='font-medium text-gray-100 mb-2'>
          {music.title.length > 20 ? music.title.slice(0, 10) + '...' : music.title}
        </h5>
        <p className='text-gray-400 text-sm w-[18ch]'>{music.artist}</p>
      </div>
    </Link>
  )
}

export default Card
