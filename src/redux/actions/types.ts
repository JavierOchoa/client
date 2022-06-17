import { LibraryArtist } from "../reducer/types";


export type Actions = getUser | GetGenres | GetAlbumPlaylist | ChangeAdminOption | PostSignUp | PostLogin | SearchAll | GetChart | GetLastSongs | SendPrevPlay | PlaySong | AddToQueue | getLibrary | get_PlaylistForId | GetGenre | CleanGenre | AddToPlaylist | NewPlaylist | LikeSong | GetTop | SetQuery;



export enum ActionType {
  CLEAN_GENRE = 'CLEAN_GENRE',
  GET_GENRE = 'GET_GENRE',
  GET_GENRES = 'GET_GENRES',
  GET_CHART = 'GET_CHART',
  GET_LAST_SONGS = 'GET_LAST_SONGS',
  GET_ALBUM_PLAYLIST = 'GET_ALBUM_PLAYLIST',
  CHANGE_ADMIN_OPTION = 'CHANGE_ADMIN_OPTION',
  POST_SIGN_UP = 'POST_SIGN_UP',
  POST_LOGIN = 'POST_LOGIN',
  SEARCH_ALL = 'SEARCH_ALL',
  SEND_PREV_PLAY = 'SEND_PREV_PLAY',
  PLAY_SONG = 'PLAY_SONG',
  ADD_TO_QUEUE = 'ADD_TO_QUEUE',
  GET_LIBRARY = 'GET_LIBRARY',
  GET_PlaylistForId = 'GET_PlaylistForId',
  ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST',
  NEW_PLAYLIST = 'NEW_PLAYLIST',
  UPDATE_USER = 'UPDATE_USER',
  GET_TOP = 'GET_TOP',
  LIKE_SONG = 'LIKE_SONG',
  SET_QUERY = 'SET_QUERY',
  GET_USER = 'GET_USER'
}


export interface userOption { //opciones del componente AdminPanel
  home: boolean,
  user: boolean
}
interface CleanGenre {
  type: ActionType.CLEAN_GENRE;
}
interface GetGenre {
  type: ActionType.GET_GENRE;
  payload?: any
}
interface GetGenres {
  type: ActionType.GET_GENRES;
  payload?: swGenre[]
}
interface GetChart {
  type: ActionType.GET_CHART;
  payload?: swSong[]
}
interface GetLastSongs {
  type: ActionType.GET_LAST_SONGS;
  payload?: swSong[]
}
interface GetAlbumPlaylist {
  type: ActionType.GET_ALBUM_PLAYLIST;
  payload: swAlbum[]
}
interface ChangeAdminOption {
  type: ActionType.CHANGE_ADMIN_OPTION;
  payload?: any
}
interface PostSignUp {
  type: ActionType.POST_SIGN_UP,
  payload: any
}
interface PostLogin {
  type: ActionType.POST_LOGIN,
  payload: any
}
interface SearchAll {
  type: ActionType.SEARCH_ALL,
  payload: { data: Object, query: string }
}
interface SendPrevPlay {
  type: ActionType.SEND_PREV_PLAY,
  payload: object
}
interface PlaySong {
  type: ActionType.PLAY_SONG
  payload: swSong
}
interface AddToQueue {
  type: ActionType.ADD_TO_QUEUE,
  payload: swSong
}
interface getLibrary {
  type: ActionType.GET_LIBRARY,
  payload: LibraryArtist
}
interface get_PlaylistForId {
  type: ActionType.GET_PlaylistForId,
  payload: any
}
interface AddToPlaylist {
  type: ActionType.ADD_TO_PLAYLIST,
  payload: any
}
interface NewPlaylist {
  type: ActionType.NEW_PLAYLIST,
  payload: any
}
interface GetTop {
  type: ActionType.GET_TOP,
  payload: any
}
interface LikeSong {
  type: ActionType.LIKE_SONG,
  payload: any
}
interface SetQuery {
  type: ActionType.SET_QUERY,
  payload: string
}
interface getUser {
  type: ActionType.GET_USER,
  payload: any
}
