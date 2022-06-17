import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CardItem from '../CardContainer/CardItem'
import ItemList from '../CardsComponents/ItemList/ItemList'
import Styled from '../ContainerLibrary/ContainerLibrary.module.css'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import * as actionCreator from '../../../redux/actions/action_user'
import { useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'



export const ContainerLibrary = () => {
  const { user ,isAuthenticated} = useAuth0();
  const userId: string | undefined = user?.sub?.slice(6);

  
  const {library_artist:{card}} = useSelector((state):any=>state)
  const {library_artist:{list}} = useSelector((state):any=>state)

  const state = useSelector((state):any=>state)
  const location = useLocation()
  const dispatch = useDispatch();
 const  { getLibrary } = bindActionCreators(actionCreator,dispatch);
  useEffect(()=>{
    console.log(user)
    getLibrary(user?.email)
    console.log(state)
  },[])


  
switch (location.pathname) {
  case '/favorites':
    
    return (
      <div className={Styled.ContainerLibrary} >
  
  <div  className={Styled.User} >
    <img src={isAuthenticated ?user?.picture:"https://cdn.discordapp.com/attachments/974053763335716884/985759356895260713/token_1_3.png"} alt="" />
    {state.library_artist.list.username ? <h1>{state.library_artist.list.username}</h1>:null}

     </div>
  
      <div className={Styled.ToolBar}>
  
      <div> <NavLink to={'/favorites'}   > <h4 className={Styled.actived } >Favorite songs</h4></NavLink> </div>
      <div> <NavLink to={'/playlists'}   > <h4 className={Styled.desatived } >Playlists</h4></NavLink> </div>
      </div>

  
          <div className={Styled.Column}>
          <h4>Name</h4>
          <h4>Duration</h4>

          </div>


      { state?.library_artist?.list?.liked_songs?.map((s:any)=>(  <div className={Styled.ContainerFavorite}> <ItemList item={s}></ItemList> </div>   ) )}





      </div>
    )

  case '/playlists':

    return (
    <div className={Styled.ContainerLibrary} >

<div  className={Styled.User} >
<img src={isAuthenticated ?user?.picture:"https://cdn.discordapp.com/attachments/974053763335716884/985759356895260713/token_1_3.png"} alt="" />
 {state.library_artist.list.username ? <h1>{state.library_artist.list.username}</h1>:null}
    
     </div>

    <div className={Styled.ToolBar}>

    <div> <NavLink to={'/favorites'}   > <h4 className={ Styled.desatived } >Favorite songs</h4></NavLink> </div>
    <div> <NavLink to={'/playlists'}   > <h4 className={ Styled.actived } >Playlists</h4></NavLink> </div>
    </div>


      <div className={Styled.ContainerPlaylist}>
      {state?.library_artist?.card?.map((e:any)=> (<CardItem  item={e }></CardItem>)   )}
    </div>

    </div>
  )

  


  



  default:
    return(<div></div>)
}

}
