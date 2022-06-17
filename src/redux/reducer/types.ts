export interface SearchResult {
  artistData: swArtist[];
  albumData: swAlbum[];
  songData: swSong[];
  playlistData?: swPlaylist[]
}
export interface LibraryArtist {
  playlist: any
  favorite: any
  list: swSong[];
  card: any;
}
export interface AdminOption {
  home: boolean;
  user: boolean;
}
export interface Home {
  last?: swSong[],
  genres?: swGenre[],
  chart?: swSong[],
}
export interface User {
  username?: string;
  image?: string;
  rol?: string;
  favorites?: number[],
  playlist?: any[]
}
