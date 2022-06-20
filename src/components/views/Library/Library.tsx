import React, { useEffect, useState } from "react";
import styles from "../Home/Home.module.css";
import SearchBar from "../../commons/SearchBar/SearchBar";
import SideBar from "../../commons/SideBar/SideBar";
import { ContainerLibrary } from "../../commons/ContainerLibrary/ContainerLibrary";
import { useSelector, useDispatch } from "react-redux";
import SearchResults from "../SearchResults/SearchResults";
import { bindActionCreators } from "redux";
import * as actionCreator from "../../../redux/actions/action_user";
import { useAuth0 } from "@auth0/auth0-react";



const Library = () => {
  const { user, isAuthenticated } = useAuth0();
  const email: string | undefined = user?.email;
  const searchString = useSelector((state: any) => state.query)
  const dispatch = useDispatch();
  const { getLibrary } = bindActionCreators(actionCreator, dispatch);
  useEffect(() => {
    if (email) getLibrary(email);
  }, [isAuthenticated]);

  return (
    <div className={styles.container}>
      <SearchBar />
      <SideBar />
      {
        !searchString ?
          <ContainerLibrary />
          :
          <SearchResults />
      }
    </div>
  );
};
export default Library;
