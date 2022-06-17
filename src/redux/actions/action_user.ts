import { Dispatch } from "react";
import { ActionType, Actions } from "./types";
import axios from "axios";
import useAuth0 from '@auth0/auth0-react';

let PonerID = "882f59cd-9e4e-4f11-87e9-0f24eb1fca75";

export const getLibrary = (email: any) => {
  //hay que poner el id del usuario creado hasta que se pueda haceder a el
  console.log(email)
  return (dispatch: Dispatch<Actions>) => {
    const favorite = axios.post("http://localhost:3001/favorite", {
      email: email,
    });
    const playlist = axios.post("http://localhost:3001/playlist", {
      email: email,
    });
    Promise.all([favorite, playlist])
      .then((response) =>
        dispatch({
          type: ActionType.GET_LIBRARY,
          payload: {
            favorite: response[0].data,
            playlist: response[1].data,
          } as any,
        })
      )
      .catch((error) => console.log(error));
  };
};
export const getPlaylist = (id: any) => {
  return (dispatch: Dispatch<Actions>) => {
    axios.get(`http://localhost:3001/playlist/${id}`)
      .then((response) =>
        dispatch({
          type: ActionType.GET_PlaylistForId,
          payload: response.data,
        })
      )
      .catch((error) => console.log(error));
  };
};
export const newPlaylist = (email: any, playlistName: string) => {
  return (dispatch: Dispatch<Actions>) => {
    axios.post('http://localhost:3001/playlist/create', { email: email, playlistName: playlistName })
      .then(response => dispatch({
        type: ActionType.NEW_PLAYLIST,
        payload: response.data
      }))
  }
}
export const updateUser = (payload: any) => {
  return async function (dispatch: Dispatch<Actions>) {
    const update = await axios.post("http://143.198.158.238:3001/update", payload)
    return {
      type: ActionType.UPDATE_USER,
      payload: update
    }
  }
}
export const getUser = (email: any) => {
  return (dispatch: Dispatch<Actions>) => {
    axios.post(`http://localhost:3001/user`, {
      email: email,
    })
      .then((response) =>
        dispatch({
          type: ActionType.GET_USER,
          payload: response.data,
        })
      )
      .catch((error) => console.log(error));
  };
};