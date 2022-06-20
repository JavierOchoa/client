import { Dispatch } from "react";
import { ActionType, Actions } from "./types";
import axios from "axios";

export const getArtist = (id:any)=>{
  return(dispatch: Dispatch<any>)=>{
    axios.get('http://143.198.158.238:3001/artist/'+id)
    .then(response => 
      dispatch({
        type: ActionType.GET_ARTIST,
        payload: response.data
      })
      )
  }
}
export const getArtistTop = (id:any)=>{
  return(dispatch: Dispatch<any>)=>{
    axios.get('http://143.198.158.238:3001/artist/'+id+'/top')
    .then(response => 
      dispatch({
        type: ActionType.GET_ARTIST_TOP,
        payload: response.data
      })
      )
  }
}
export const updateSong = (info: any) => {
  return (dispatch: Dispatch<Actions>) => {
    axios.post("http://143.198.158.238:3001/artistpanel/song/update",{
      email: info.email,
      songId: info.id,
      songName: info.name,
      albumId: info.album,
    }).then((response) =>
        dispatch({
          type: ActionType.UPDATE_SONG,
        })
      )
      .catch((error) => console.log(error));
  };
};
