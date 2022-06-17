import { Actions, ActionType } from "../actions/types";
import * as types from "./types"; //tipos del state   NO BORRAR

//tengo que importar las interfaces de las propiedades dentro de los objetos del initial state

//necesito los actions types para seguir agregando switch cases

interface State {
  query: string;
  searchResults: any;
  album_playlist: swAlbum | swPlaylist | any;
  library_artist: types.LibraryArtist | any;
  queue: swSong[];
  home: types.Home;
  adminOption: types.AdminOption;
  genre: any;
  top: any;
  user: types.User;
}

const initialState: State = {
  query: "", //párametro de búsqueda : string
  queue: [], //cola de reproduccion : track[]
  searchResults: {},
  // {
  //   artistData: [],  //  artist[]
  //   albumData: [],   //  album[]
  //   songData: [],   //  track[]
  //   playlistData: []
  // },
  album_playlist: {},
  library_artist: {
    list: [], // favs   -  top       // track[]
    card: [], // playlist - albums   // album[]
  },
  home: {
    last: [],
    genres: [],
    chart: [],
  },
  adminOption: { home: true, user: false },
  genre: [],
  top: [],
  user: {
    username: '',
    image: '',
    rol: '',
    favorites: [],
    playlist: [],
  }
};

const Reducer = (state: any = initialState, action: Actions) => {
  switch (action.type) {
    case ActionType.CLEAN_GENRE:
      return {
        ...state,
        genre: [],
      };
    case ActionType.GET_GENRE:
      return {
        ...state,
        genre: action.payload,
      };
    case ActionType.GET_GENRES:
      return {
        ...state,
        home: {
          ...state.home,
          genres: action.payload,
        },
      };
    case ActionType.GET_LAST_SONGS:
      return {
        ...state,
        home: {
          ...state.home,
          last: action.payload,
        },
      };
    case ActionType.GET_CHART:
      return {
        ...state,
        home: {
          ...state.home,
          chart: action.payload,
        },
      };
    case ActionType.CHANGE_ADMIN_OPTION:
      return {
        ...state,
        adminOption: action.payload,
      };
    case ActionType.POST_SIGN_UP:
      console.log(action.payload); //hasta que no halla back solo consologea la info
      return {
        ...state,
      };
    case ActionType.POST_LOGIN:
      console.log(action.payload); //hasta que no halla back solo consologea la info
      return {
        ...state,
      };
    case ActionType.PLAY_SONG:
      return {
        ...state,
        queue: [action.payload],
      };
    case ActionType.ADD_TO_QUEUE:
      return {
        ...state,
        queue: [...state.queue, action.payload],
      };
    case ActionType.SEARCH_ALL:
      return {
        ...state,
        searchResults: action.payload,
      };
    case ActionType.GET_LIBRARY:
      return {
        ...state,
        library_artist: {
          list: action.payload.favorite,
          card: action.payload.playlist,
        },
      };
    case ActionType.GET_ALBUM_PLAYLIST:
      return {
        ...state,
        album_playlist: action.payload,
      };
    case ActionType.GET_PlaylistForId:
      return {
        ...state,
        album_playlist: action.payload,
      };
    case ActionType.ADD_TO_PLAYLIST:
      console.log(action.payload);
      return {
        ...state,
      };
    case ActionType.NEW_PLAYLIST:
      console.log(action.payload);
      return {
        ...state,
      };
    case ActionType.GET_TOP:
      return {
        ...state,
        top: action.payload,
      };
    case ActionType.LIKE_SONG:
      return {
        ...state,
        user: {
          ...state.user,
          favorite: action.payload
        },
      }
    case ActionType.GET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case ActionType.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
