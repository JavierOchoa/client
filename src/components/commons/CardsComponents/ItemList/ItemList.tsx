import React, { useEffect, useState } from 'react'
import s from './ItemList.module.css'
import likefull from '../../../../assets/likefull.png'
import time from '../../../../assets/time.png'
import DropDownButton from '../../DropDownButton/DropDownButton'
import { Link } from 'react-router-dom'
import play from '../../../../assets/play.png'
import * as actionCreator from '../../../../redux/actions/action_player'
import * as actionCreatorUser from '../../../../redux/actions/action_user'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'

// interface Item {
//     position: number;
//     image: string;
//     name: string;
//     timeLapse:string;
//     cantidad?: string;
// }

interface myProps {
  item: any;
}

const ItemList: React.FC<myProps> = (props: myProps) => {
  const formatDuration = (duration: string): string => {
    let num = parseInt(duration);
    let minutes: number = Math.floor(num / 60)
    let seconds: number = num - (minutes * 60);
    let minStr: string = minutes.toString();
    let secStr: string = seconds.toString();
    return `${minStr.length == 1 ? '0' + minStr : minStr}:${secStr.length == 1 ? '0' + secStr : secStr}`
  }
  const dispatch = useDispatch();
  const { playSong, likeSong } = bindActionCreators(actionCreator, dispatch);
  const { user } = useAuth0();
  const userId: string | undefined = user?.sub?.slice(6);
  let tipo = props.item.type

  const state= useSelector((state:any)=>state)

  const [estado,setEstado]=useState<any>()
  const { getLibrary } = bindActionCreators(actionCreatorUser, dispatch);


  useEffect(()=>{
    getLibrary(user?.email)
    


    state.library_artist.list.liked_songs && setEstado(state.library_artist.list.liked_songs.map((e:any)=> e.dz_Id ))
  },[])






  switch (tipo) {
    case "track":
      return (
        <div className={s.itemListContainer}>
          {/* <Link className={s.links} to={'/song/:id'}> */}
            <div className={s.imageAndNameContainer}>
              <div>

                <div ><img className={s.image} src={props.item.image_small} alt="" /><img src={play} className={s.Play} /> </div>

              </div>
              <div>
                <div onClick={() => playSong(props.item)} className={s.songName}>{props.item.name}</div>
                <span className={s.spanArtistName}>{props.item.name}</span> 
              </div>
            </div>
          {/* </Link> */}


          <div className={s.controllerContainer}>
            {userId && <button className={s.likeBtn} onClick={() => likeSong(props.item.dz_Id, user?.email)}><p className={estado?.includes(props.item.dz_Id) ? s.likeImgInclude:s.likeImg}     >♥</p></button>}
            <div>
              <DropDownButton item={props.item}/>
            </div>
            <div>
              <div className={s.duration}>{formatDuration(props.item.duration)}</div>
            </div>
            <div>
              <img className={s.timeImg} src={time} alt="time icon" />
            </div>
          </div>
        </div>
      )
    case "album":
      return (
        <div className={s.itemListContainer}>
          <Link className={s.links} to={'/album/:id'}>
            <div className={s.imageAndNameContainer}>
              <div>
                <div><img className={s.image} src={props.item.image_small} alt="" /></div>
              </div>
              <div>
                <div className={s.songName}>{props.item.name}</div>
              </div>
            </div>
          </Link>


          <div className={s.controllerContainer}>

            <div className={s.dbTracks}>
              {props.item.nb_tracks}
            </div>
          </div>
        </div>
      )
    case "artist":
      return (
        <div className={s.itemListContainer}>
          <Link className={s.links} to={'/artist/:id'}>
            <div className={s.imageAndNameContainer}>
              <div>
                <div><img className={s.image} src={props.item.image_small} alt="" /></div>
              </div>
              <div>
                <div className={s.songName}>{props.item.name}</div>
              </div>
            </div>
          </Link>
          <div className={s.controllerContainer}>
          </div>
        </div>
      )

    default:
      return (
        <>nada</>
      )
  }
}
export default ItemList