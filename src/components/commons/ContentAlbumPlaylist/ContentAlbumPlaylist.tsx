import styles from "./ContentAlbumPlaylist.module.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useParams, useLocation } from "react-router";
import * as actionCreator from "../../../redux/actions/action_player";
import * as actionCreator2 from "../../../redux/actions/action_user";
import ListItemContainer from "../ListItemContainer/ListItemContainer";
import Swal from "sweetalert2";
import imgPlaylist from "../../../assets/coverPl.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

const ContentAlbumPlaylist = () => {
  const { email } = useSelector((state: any) => state.user_info);
  const [edit, setEdit] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { getAlbumPlaylist, updatePlaylist, playAll } = bindActionCreators(
    actionCreator,
    dispatch
  );
  const { deletePlaylist } = bindActionCreators(actionCreator2, dispatch);
  const item = useSelector((state: any) => state.album_playlist);
  const newPlaylist = useSelector((state: any) => state.playlist_update);
  const { id } = useParams();
  const path = useLocation().pathname;
  const isPlaylist = path.includes("playlist");
  useEffect(() => {
    isPlaylist
      ? getAlbumPlaylist(id, "playlist")
      : getAlbumPlaylist(id, "album");
    return () => {
      getAlbumPlaylist("clean", "");
    };
  }, []);
  const toggleEdit = async () => {
    if (edit) {
      if (newPlaylist.length === 0) {
        Swal.fire("No changes!");
        setEdit(false);
        return;
      } else {
        let newSongOrder = newPlaylist.map((song: any) => song.id);
        await axios.post("https://www.javierochoa.me/playlist/update", {
          playlistId: id,
          newSongOrder,
          field: "songOrder",
          email,
        });
        updatePlaylist([]);
        Swal.fire("Playlist updated!");
        setEdit(false);
      }
    } else {
      setEdit(true);
    }
  };
  return Object.keys(item).length > 0 ? (
    <div className={styles.container}>
      <div className={styles.details}>
        <img
          src={isPlaylist ? imgPlaylist : item.image_medium}
          alt={item.name}
        />
        <span>{item.name}</span>
        {item.artists && (
          <Link to={`/artist/${item.artists[item.artists.length - 1].id}`}>
            {item.artists[item.artists.length - 1].name}
          </Link>
        )}
        {/* <span>{item.artists && item.artists[0].name}</span> */}
        <div className={styles.btnContainer}>
          <button onClick={() => playAll(item.songs)} className={styles.btn}>
            Play all
          </button>
          {
            isPlaylist && 
            <Link to={"/playlists"}>
              <button
                onClick={() => email && id && deletePlaylist(id)}
                className={styles.btn}
              >
                Delete Playlist
              </button>
            </Link>
          }
        </div>
        {isPlaylist && (
          <button
            className={edit ? `${styles.edit} ${styles.save}` : styles.edit}
            onClick={toggleEdit}
          >
            {edit ? "Save" : "Edit"}
          </button>
        )}
      </div>
      {item.songs && (
        <ListItemContainer
          content={item.songs}
          header={true}
          nb={true}
          sort={edit}
        />
      )}
    </div>
  ) : (
    <div className={`spinner-border ${styles.loading}`} role="status"></div>
  );
};
export default ContentAlbumPlaylist;
