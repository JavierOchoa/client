import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreator from "../../../redux/actions/action_player";
import style from "./SearchBar.module.css";
import searchIcon from "../../../assets/search_icon.png";
import userIcon from "../../../assets/user_icon.png";
import bellIcon from "../../../assets/bell.png";
import MenuUser from "./MenuUser";
import { useAuth0 } from "@auth0/auth0-react";



const SearchBar = () => {

  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
  const dispatch = useDispatch();
  const { searchAll, setQuery } = bindActionCreators(actionCreator, dispatch);
  function handleChange(e: any): void {
    searchAll(e.target.value);
    setQuery(e.target.value);
  }
  return (
    <nav className={`${style.navbar}`}>
      <form className={style.form} onSubmit={(event)=>event.preventDefault()}>
        <div className={style.search}>
          <img src={searchIcon} width="20px" />
          <input
            className={style.inputSearch}
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleChange}
          />
        </div>
      </form>
      <div className={style.icons}>
        {isAuthenticated ? (<MenuUser username={"username"} />) :
          (<button onClick={() => loginWithRedirect()}
            className="btn btn-outline-warning" >Log In</button>)
        }
      </div>
    </nav>
  );
};

export default SearchBar;
