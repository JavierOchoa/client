import styles from "./PopUp.module.css";
import * as actionCreator from "../../../../redux/actions/action_artist";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Upload = () => {
  const dispatch = useDispatch();
  const { launchPopUp, uploadMusic } = bindActionCreators(actionCreator, dispatch);
  const {albums} = useSelector((state: any) => state.panel_artist);
  const {email} = useSelector((state: any) => state.user_info);
  const [files, setFiles] = useState<any>([]);
  const [sameAlbum, setSameAlbum] = useState<boolean>(false);
  const [albumForAll, setAlbumForAll] = useState<string>('');
  // useEffect(()=>{
    
  // },[files])
  const playPause = (e:any) => {
    e.classList.toggle(styles.btnPlay);
    e.classList.toggle(styles.btnPause);
    let player = e.firstChild;
    if (player.paused) player.play()
    else {
      player.pause();
      player.currentTime = 0;
    }
  }
  const changeKey = (key: string, value:string|boolean, i:number) => {
    let newFiles = [...files];
    newFiles[i] = {
      ...newFiles[i],
      [key]: value
    }
    setFiles(newFiles);
    console.log(files)
  }
  const removeItem = (i:number) => {
    let newFiles = [...files];
    newFiles.splice(i, 1);
    setFiles(newFiles);
  }
  const saveMusic = async () => {
    for (let i = 0; i < files.length; i++) {
      const song = files[i];
      const data = new FormData();
      data.append("file", song.data);
      data.append("upload_preset", "new_songs");
      uploadMusic({email, name:song.name}, data);
    }
    await new Promise(res => setTimeout(res,1500));
    // getPanelInfo(artist?.id, email);
    launchPopUp(false);
  }
  return (
    <div className={styles.background}>
      <div className={styles.floating} style={{'width': '800px', 'height': 'auto'}}>
        <h3>Upload your music</h3>
        <div className={styles.uploadMusic}>
          <label className={styles.selectFiles}>Select files
            <input type="file" accept="audio/*" multiple onChange={(e)=>{
              let local = e.target.files;
              if (local?.length) {
                let newFiles: any[] = [];
                for (let i = 0; i < local.length || 0; i++) {

                  newFiles.push({audio: URL.createObjectURL(local[i]), album: '', name:'', isSingle:false, data:local[i]});
                }
                setFiles([...files, ...newFiles]);
              };
            }}/>
          </label>
          {
            files.length>0 &&
            <div className={styles.albumOptions}>
              <label>Same album</label>
              <input type="checkbox" checked={sameAlbum} onChange={(e:any) => setSameAlbum(e.target.checked)}/>    
              <select value={sameAlbum?albumForAll:''} disabled={!sameAlbum} onChange={(e:any)=>setAlbumForAll(e.target.value)}>
                  <option>{''}</option>
                {
                  albums?.map((e:any, i:number) => (
                    <option key={i} value={e.name}>{e.name}</option>
                  ))
                }
              </select>
            </div>
          }
          <div>
          { files.length>0 &&
            files.map((e:any,i:number) => (
              <div className={styles.itemUpload}>
                <button className={styles.btnPlay} onClick={(e:any) => playPause(e.target)}>
                  <audio key={i} src={e.audio} controls style={{"display":"none"}}></audio>
                </button>
                <input type="text" value={e.name} placeholder='Song title...' onChange={(ev:any) => changeKey('name', ev.target.value, i)}/>
                <select value={!e.isSingle?e.album:e.name?.trim()?e.name+' - Single':''} disabled={sameAlbum || e.isSingle}
                onChange={(ev:any) => changeKey('album', ev.target.value, i)}>
                    <option>{!e.isSingle?'':e.name?.trim()?e.name+' - Single':''}</option>
                  {
                    albums?.map((e:any, i:number) => (
                      <option key={i} value={e.name}>{e.name}</option>
                    ))
                  }
                </select>
                <input type="checkbox" disabled={sameAlbum} checked={e.isSingle} onChange={(ev:any) => changeKey('isSingle', ev.target.checked, i)}/>
                <button className={styles.btnRemove} onClick={()=>removeItem(i)}></button>
              </div>
            ))
          }
          </div>
        </div>
        <div>
          <button className={styles.btn} onClick={undefined}>Upload</button>
          <button className={styles.btn} style={{"backgroundColor":"orange"}} onClick={()=>launchPopUp(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )
};
export default Upload;
