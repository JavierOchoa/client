import style from './ArtistCardContainer.module.css'
import { useSelector } from 'react-redux'
import CardContainer from './../../CardContainer/CardContainer';
import ItemList from '../../CardsComponents/ItemList/ItemList';
// import ListItem from '../../ListItemContainer/ListItem'
// import ItemList from "../CardsComponents/ItemList/ItemList";

const ArtistCardContainer = ({ props }: any) => {
  const artist = useSelector((state: any) => state.artist)
  const artistTop = useSelector((state: any) => state.artistTop)
  console.log(props)
  switch (props) {
    case 'Top':
      return (
        <div>
          {artistTop.length > 0 ? artistTop.slice(0, 5)?.map((song: any) => <div className={style.listDiv}><ItemList item={song} /></div>) : <h1>cargando</h1>}
        </div>
      )
    case 'Albums':
      return (
        <div>
          {<CardContainer content={artist.albums} />}
        </div>
      )
    case 'Singles':
      return (
        <div>
          {artist.songs.length > 0 ? artist.songs?.map((song: any) => <div className={style.listDiv} ><ItemList item={song} /></div>) : <h1>cargando</h1>}
        </div>
      )
    case 'Description':
      return (
        <div>
          <h1>Description... proximamente solo en cines. esperalo :b</h1>
        </div>
      )
    default:
      return (<></>)
  }



}
export default ArtistCardContainer
