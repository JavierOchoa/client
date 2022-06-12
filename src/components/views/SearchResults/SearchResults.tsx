import React from 'react'

import ArtistCard from '../../commons/CardsComponents/ArtistCard/ArtistCard'
import AlbumCard from '../../commons/CardsComponents/AlbumCard/AlbumCard'
import s from './SearchResults.module.css'

import { Link } from 'react-router-dom'
import ItemList from '../../commons/CardsComponents/ItemList/ItemList';
import { useSelector } from 'react-redux'


const SearchResults = () => {
  const { songData, artistData, albumData} = useSelector((state: any) => state.searchResults)
  console.log(songData)
  return (
    <div className={s.divContainer}>
      {
        (songData.length<1 && artistData.length<1 && albumData.length<1) &&
        <div className={s.sectionTitle}>No Results Found.</div>
      }
      {
        songData.length>0 &&
        <div className={s.divText}>
          <Link className={s.links} to={'/moreinfotracks'}>
            <div className={s.sectionTitle}>{`Tracks >`}</div>
          </Link>
        </div>
      }

      {
        songData.slice(0, 4).map((song: any) => {
          return <ItemList item={song}/>
        })
      }
      {
        artistData.length>0 &&
        <div className={s.divText}>
          <Link className={s.links} to={'/moreinfoartists'}>
            <div className={s.sectionTitle}>{`Artists >`}</div>
          </Link>
        </div>
      }
      {
        artistData.slice(0, 4).map((artist: any) => {
          return <ItemList item={artist}/>
        })
      }
      {
        albumData.length>0 &&
        <div className={s.divText}>
          <Link className={s.links} to={'/moreinfoalbums'}>
            <div className={s.sectionTitle}>{`Albums >`}</div>
          </Link>
        </div>
      }
      {
        albumData.slice(0, 4).map((albums: any) => {
          return <ItemList item={albums}/>
        })
      }
    </div>
  )
}

export default SearchResults