import { Link } from 'react-router-dom';
import styles from './Landing.module.css';
import NavBar from '../../commons/NavBar/NavBar';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'

export default function Landing() {
  // const { loginWithRedirect, logout } = useAuth0();
  // const useAuth: any = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0()
  // const newUser: any = user
  // console.log('user', user)
  // console.log('autenti', isAuthenticated)
  // console.log('loding', isLoading)
  // console.log(user?.picture)
  function userLogin() {
    console.log('cristian')
    axios.post("http://143.198.158.238:3001/login/userRegister", {
      name: user?.name,
      username: user?.nickname,
      email: user?.email,
      image: user?.picture,
    })
  }



  return (
    <div className={styles.containerBig}>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.title}>SoundWave</h1>
        <p className={styles.p}>Sign up now on the best platform to play and share your favorite music</p>
        <div>
          <img src={user?.picture} alt={user?.name} />
          <h3>{user?.nickname}</h3>
        </div>
        <div className={styles.button}>
          {isAuthenticated ? <Link to='/home' className={styles.button} onClick={() => userLogin()}>Open Player</Link> :
            <Link to='/home' className={styles.button}>Open Player</Link>}
        </div>
      </div>
    </div>
  )
}
