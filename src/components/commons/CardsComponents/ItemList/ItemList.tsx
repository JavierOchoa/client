import React from 'react'
import s from './ItemList.module.css'
import like from '../../../assets/like.png'
import likefull from '../../../../assets/likefull.png'
import time from '../../../../assets/time.png'
import DropDownButton from '../../DropDownButton/DropDownButton'
import { Link } from 'react-router-dom'

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
  console.log(props)
  const formatDuration = (duration: string): string => {
    let num = parseInt(duration);
    let minutes: number = Math.floor(num / 60)
    let seconds: number = num - (minutes * 60);
    let minStr: string = minutes.toString();
    let secStr: string = seconds.toString();
    return `${minStr.length == 1 ? '0' + minStr : minStr}:${secStr.length == 1 ? '0' + secStr : secStr}`
  }

  let tipo = props.item.type

  switch (tipo) {
    case "track":
      return (
        <div className={s.itemListContainer}>
          <Link className={s.links} to={'/song/:id'}>
            <div className={s.imageAndNameContainer}>
              <div>
                <div><img className={s.image} src={props.item.image_small} alt="" /></div>
              </div>
              <div>
                <div className={s.songName}>{props.item.title}</div>
                <span className={s.spanArtistName}>{props.item.artist}</span>
              </div>
            </div>
          </Link>


          <div className={s.controllerContainer}>
            <div>
              <DropDownButton />
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