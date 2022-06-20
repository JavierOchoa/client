import { Dispatch } from "react";
import { ActionType, Actions } from "./types";
import axios from "axios";

export const getArtist = (id: any) => {
  return (dispatch: Dispatch<any>) => {
    axios.get('http://localhost:3001/artist/' + id)
      .then(response =>
        dispatch({
          type: ActionType.GET_ARTIST,
          payload: response.data
        })
      )
  }
}
export const getArtistTop = (id: any) => {
  return (dispatch: Dispatch<any>) => {
    axios.get('http://localhost:3001/artist/' + id + '/top')
      .then(response =>
        dispatch({
          type: ActionType.GET_ARTIST_TOP,
          payload: response.data
        })
      )
  }
}
