import { Dispatch } from "react";
import { ActionType, Actions } from "./types";
import axios from "axios";
import * as hc from "./hc_data";
//ej    hc.albumSongs   album con sus canciones como lo enviaría el back
//ej    hc.songList     un arreglo con 12 canciones
//ej    hc.userList     un arreglo con 100 usuarios para el panel admin
// manden un console.log para ver los otros



export const getGenres = () => {
  return (dispatch: Dispatch<any>) => {
    axios.get('http://143.198.158.238:3001/genre/all')
      .then(response =>
        dispatch({
          type: ActionType.GET_GENRES,
          payload: response.data
        })
      )
  }
}
export const getChart = () => {
  return (dispatch: Dispatch<any>) => {
    axios.get('http://143.198.158.238:3001/top')
      .then(response =>
        dispatch({
          type: ActionType.GET_CHART,
          payload: response.data,
        })
      );
  };
};

export const getLastSongs = () => {
  return (dispatch: Dispatch<any>) => {
    axios.get("http://localhost:3001/top").then((response) =>
      dispatch({
        type: ActionType.GET_LAST_SONGS,
        payload: response.data.reverse(),
      })
    );
  };
};

export const searchAll = (input: string) => {
  //hasta que no halla back el axios queda comentado
  return (dispatch: Dispatch<Actions>) => {
    axios.get(`http://localhost:3001/search?all=${input}`)
      .then((response) =>
        dispatch({
          type: ActionType.SEARCH_ALL,
          payload: response.data
        })
      )
      .catch((error) => console.log(error))
      .finally(() => dispatch({
        type: ActionType.LOADING,
        payload: false
      }));
  };
};
export const playSong = (data: swSong) => {
  return (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.PLAY_SONG,
      payload: data,
    });
  };
};
export const addToQueue = (data: swSong) => {
  return (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.ADD_TO_QUEUE,
      payload: data,
    });
  };
};
export const deleteFromQueue = (id: string) => {
  return (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.DELETE_FROM_QUEUE,
      payload: id,
    });
  };
}
export const sortQueue = (data: swSong[]) => {
  return (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.SORT_QUEUE,
      payload: data
    });
  };
};
export const addToPlaylist = (playlistId: string, songId: string) => {
  return (dispatch: Dispatch<Actions>) => {
    axios.post('http://143.198.158.238:3001/playlist/add', { playlistId: playlistId, songId: songId })
      .then(response => dispatch({
        type: ActionType.ADD_TO_PLAYLIST,
        payload: response.data
      }))
  }
}
export const getGenre = (id: any) => { // obtiene un genero para la ruta /genre/:id
  return (dispatch: Dispatch<any>) => {
    axios.get('http://143.198.158.238:3001/genre/' + id)
      .then(response =>
        dispatch({
          type: ActionType.GET_GENRE,
          payload: response.data
        })
      )
  }
}
export const cleanGenre = () => {
  return (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.CLEAN_GENRE
    })
  }
}
export const getAlbumPlaylist = (id: any, type: string) => {
  if (id === 'clean') {
    return (dispatch: Dispatch<Actions>) => {
      dispatch({
        type: ActionType.CLEAN_ALBUM_PLAYLIST
      })
    }
  } else {
    return (dispatch: Dispatch<any>) => {
      axios.get(`http://143.198.158.238:3001/${type}/${id}`)
        .then(response =>
          dispatch({
            type: ActionType.GET_ALBUM_PLAYLIST,
            payload: response.data
          })
        )
    }
  }
}
export const getTop = () => {
  return (dispatch: Dispatch<any>) => {
    axios.get("http://localhost:3001/top").then((response) =>
      dispatch({
        type: ActionType.GET_TOP,
        payload: response.data,
      })
    );
  };
};

export const likeSong = (songId: string, email: string) => {
  return (dispatch: Dispatch<Actions>) => {
    axios.post(`http://localhost:3001/favorite/add/${songId}`, { email: email })
      .then(response => dispatch({
        type: ActionType.LIKE_SONG,
        payload: response.data
      }))
  }
}

export const dislikeSong = (songId: string, email: string) => {
  return (dispatch: Dispatch<Actions>) => {
    axios.post(`http://localhost:3001/favorite/remove/${songId}`, { email: email })
      .then(response => dispatch({
        type: ActionType.DISLIKE_SONG,
        payload: response.data
      }))
  }
}

export const setQuery = (query: string) => {
  return (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.SET_QUERY,
      payload: query
    })
  }
}
export const loading = (value: boolean) => {
  return (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.LOADING,
      payload: value
    })
  }
}
export const updateLike = (likeSong: any[]) => {
  return (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.UPDATE_LIKE,
      payload: likeSong,
    })
  }
}

export const updatePlaylist = (playlist: any) => {
  return (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.UPDATE_PLAYLIST,
      payload: playlist,
    })
  };
};

export const playAll = (data: swSong[]) => {
  return (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.PLAY_ALL,
      payload: data,
    });
  };
};

