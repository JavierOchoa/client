import React, { useEffect, useState } from "react";
import styles from "../Home/Home.module.css";
import SearchBar from "../../commons/SearchBar/SearchBar";
import SideBar from "../../commons/SideBar/SideBar";
import { ArtistPage } from "../../commons/ArtistPage/ArtistPage";
import SearchResults from "../SearchResults/SearchResults";
import { bindActionCreators } from "redux";
import * as actionCreator from "../../../redux/actions/action_user";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";




const Artist = () => {
  const dispatch = useDispatch();
  const { getLibrary } = bindActionCreators(actionCreator, dispatch);
  const { user, isAuthenticated } = useAuth0();
  const email: string | undefined = user?.email;

  useEffect(() => {
    if (email) getLibrary(email);
  }, [isAuthenticated]);

  const searchString = useSelector((state: any) => state.query)
  return (
    <div className={styles.container}>
      <SearchBar />
      <SideBar />
      {
        !searchString ?
          isAuthenticated ? <ArtistPage /> : null
          :
          <SearchResults />
      }
    </div>
  );
};
export default Artist;