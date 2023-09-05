import ListAlbums from '../components/ListAlbums'
import useMusics from '../hooks/useMusics'

const HomePage = () => {
  // USE MUSICS CONTEXT
  const { albums } = useMusics()

  return (
    <div className='pt-28 md:pl-72 p-8'>
      {albums.length > 0 && albums.map((album) => <ListAlbums key={album.id} album={album} />)}
    </div>
  )
}

export default HomePage
