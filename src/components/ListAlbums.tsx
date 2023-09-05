import { Link } from 'react-router-dom'
import Card from './Card'
import { Album } from '../interfaces'

interface Props {
  album: Album
}

const ListAlbums = ({ album }: Props) => {
  const { id, name, songs } = album

  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between mb-8'>
        <Link to={`/album/${id}`} className='text-2xl font-bold text-white hover:underline'>
          {name}
        </Link>
        <Link
          to={`/album/${id}`}
          className='uppercase text-sm font-bold tracking-[2px] hover:underline'
        >
          Ver todo
        </Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6'>
        {songs.map((song) => (
          <Card key={song.id} music={song} />
        ))}
      </div>
    </div>
  )
}

export default ListAlbums
