import React from 'react'
import { DropdownButton, Dropdown, SplitButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreator from '../../../redux/actions/action_player';
import * as actionCreatorUser from '../../../redux/actions/action_user';
import Swal from 'sweetalert2';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import styles from './DropDownButton.module.css';

interface myProps {
  item: any
}

const DropDownButton: React.FC<myProps> = (props: myProps) => {
  const playlists = useSelector((state: any) => state.library_artist.card)
  const { user, isAuthenticated } = useAuth0();
  const email: string | undefined = user?.email;
  const dispatch = useDispatch();
  const { addToQueue, addToPlaylist } = bindActionCreators(actionCreator, dispatch);
  const { newPlaylist } = bindActionCreators(actionCreatorUser, dispatch)
  async function addPlaylist() {
    if (email !== undefined) {
      const { value: playlistName } = await Swal.fire({
        title: 'New Playlist',
        input: 'text'
      })
      if (playlistName) {
        Swal.fire('Playlist created!');
        newPlaylist(email, playlistName);
      }
    }
  }
  return (
    <div>
      <DropdownButton id="dropdown-basic-button" variant="warning" title="">
        <Dropdown.Item ><Link className={styles.link} to={`/artist/${props.item.artists[0].id}`}>Go to Artist</Link></Dropdown.Item>
        <Dropdown.Item ><Link className={styles.link} to={`/album/${props.item.albumId}`}>Go to Album</Link></Dropdown.Item>
        <Dropdown.Item onClick={() => addToQueue(props.item)}>Add to queue</Dropdown.Item>
        {isAuthenticated &&
          <div>
            {['end'].map((direction) => (
              <SplitButton
                key={direction}
                id={`dropdown-button-drop-${direction}`}
                drop={'end'}
                variant="warning"
                title='➕ Playlist'
              >
                {playlists.length ? playlists.map((p: any) => { return <Dropdown.Item onClick={() => addToPlaylist(p.id, props.item.id)}>{p.name}</Dropdown.Item> }) : null}
                <Dropdown.Item onClick={addPlaylist}>New Playlist</Dropdown.Item>
              </SplitButton>
            ))}
          </div>
        }
      </DropdownButton>
    </div>
  )
}

export default DropDownButton