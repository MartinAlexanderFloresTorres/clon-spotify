import { useContext } from 'react'
import { SongContext } from '../providers/SongProvider'

const useSong = () => {
  return useContext(SongContext)
}

export default useSong
