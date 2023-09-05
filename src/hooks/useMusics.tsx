import { useContext } from 'react'
import { MusicsContext } from '../providers/MusicsProvider'

const useMusics = () => useContext(MusicsContext)

export default useMusics
