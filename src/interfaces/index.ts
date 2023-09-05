export interface Music {
  id: number
  title: string
  artist: string
  duration: number
  isFavorite: boolean
  url: string
  imageUrl: string
  albumId: number
}

export interface Album {
  id: number
  name: string
  description: string
  imageUrl: string
  songs: Music[]
}
