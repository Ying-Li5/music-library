import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function AlbumView() {
    const { id } = useParams()
    const [ albumData, setalbumData ] = useState([])
    const navigate = useNavigate()

    const navButtons = () => {
        return(
            <button onClick={() => navigate(-1)}>Back</button>
            |
            <button onClick={() => navigate('/')}>Home</button>
        )
    }

    useEffect(() => {
        const API_URL = 'https://itunes.apple.com/search?term='
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            console.log(resData)
        }
        fetchData()
    })

    const justSongs = albumData.filter(entry => entry.wrapperType === 'track')

    const renderSongs = justSongs.map((song, i) => {
        return(
            <div key={song}>
                <p>{song.trackName}</p>
            </div>
        )
    })
    return (
        <div>
            {/* {albumData.length > 0 ? <h2>{albumData[0].artistName}</h2> : <h2>Loading...</h2>} */}
            {navButtons()}
            {renderSongs}
        </div>
    )
}

export default AlbumView