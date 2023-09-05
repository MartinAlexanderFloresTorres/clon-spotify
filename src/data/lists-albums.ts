import { Album } from '../interfaces'

export const listsAlbums: Album[] = [
  {
    id: 1,
    name: 'The Kids Are Coming',
    description:
      'The Kids Are Coming is the debut extended play by Australian singer Tones and I, released on 30 August 2019. The EP was produced by Konstantin Kersting.',
    imageUrl: 'https://i.ytimg.com/vi/ZmDBbnmKpqQ/maxresdefault.jpg',
    songs: [
      {
        id: 1,
        title: 'Musica 1',
        artist: 'nobody',
        albumId: 1,
        duration: 209,
        isFavorite: false,
        imageUrl: 'https://i.ytimg.com/vi/ZmDBbnmKpqQ/maxresdefault.jpg',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      },
      {
        id: 2,
        title: 'Musica 2',
        artist: 'nobody',
        albumId: 1,
        duration: 209,
        isFavorite: false,
        imageUrl: 'https://i.ytimg.com/vi/ZmDBbnmKpqQ/maxresdefault.jpg',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
      }
    ]
  }
]
