import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function ArtistView() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])

    useEffect(() => {
        const API_URL = 'https://itunes.apple.com/search?term='
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            console.log(resData)
        }
        fetchData()
    }, [id])

    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album')

    const renderAlbums = justAlbums.map((album, i) => {
        return(
            <div key={album}>
                <Link to={`album/${album.collectionId}`} >
                    <p>{album.collectionName}</p>
                </Link>
            </div>
        )
    })

    const navButtons = () => {
        return(
            <button onClick={() => navigate(-1)}>Back</button>
            |
            <button onClick={() => navigate('/')}>Home</button>
        )
    }


    return (
        <div>
            {/* {artistData.length > 0 ? <h2>{artistData[0].artistName}</h2> : <h2>Loading...</h2>} */}
            {navButtons()}
            {renderAlbums}
        </div>
    )
}

export default ArtistView