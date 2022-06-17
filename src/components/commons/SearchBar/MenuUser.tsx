import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import style from './MenuUser.module.css';
import userIcon from '../../../assets/user_icon.png'
import likeFull from '../../../assets/likefull.png'
import { useAuth0 } from "@auth0/auth0-react";

interface node {
    contains?: (arg: any) => any
}

interface props {
    children?: React.ReactNode,
    options?: string[],
    username: string
}

const Menu: React.FunctionComponent<props> = (props) => {

    const [open, setOpen] = useState<boolean>(false);
    const container = useRef(document.getElementsByTagName('div')[0]); // obtiene da un nodo html como valor inicial 
    //para que no de error cuando la referencia intente usar  el  metodo contains
    const navigate = useNavigate();
    function click(event: any) {
        if (!container.current.contains(event.target)) {
            setOpen(false);
        }
    }

    const [username, setUsername] = useState('')

    const { user, isAuthenticated, isLoading, logout } = useAuth0();
    // const newUser: any = user
    // console.log('user', user)
    // console.log('autenti', isAuthenticated)
    // console.log('loding', isLoading)
    // console.log(user?.picture)
    // useEffect(() => {
    //   const token = localStorage.getItem('sw-token') || '{}';
    //   if (token !== '{}') {
    //     const decoded:any = jwt_decode(token);
    //     setUsername(decoded.username);
    //     console.log(decoded);
    //   } else{
    //     setUsername('Unregistered')
    //   }
    // }, []);


    useEffect(() => {
        document.body.addEventListener('click', click);
        return () => {
            document.body.removeEventListener('click', click);
        }
    }, [])

    function toggle(event: any): void {
        setOpen(!open)
        console.log(event)
    }

    function handleLogout(): void {
        localStorage.removeItem('sw-token')
        navigate('/')
    }

    function handleLogIn(): void {
        localStorage.removeItem('sw-token')
        navigate('/login')
    }

    function handleSignUp(): void {
        navigate('/signup')
    }

    function handleClick(): void {
        navigate('/settings')
    }

    return (
        <div ref={container}>
            <div onClick={toggle}>
                <img className={style.userImg} src={user?.picture} height='30px' width='30px' />
            </div>
            {
                !open ? null :
                    <div className={style.box} >
                        <div className={style.innerImg}>
                            <img className={style.img} src={user?.picture} />
                        </div>
                        <div className={style.textContainer}>
                            <span>{username}</span>
                            {/* {username !== 'Unregistered' &&  */}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <a>{user?.nickname}</a>
                                <button onClick={handleClick} className={style.btn}>Settings</button>
                                <button onClick={() => logout({ returnTo: window.location.origin })} className={style.btnPrimary}>Logout</button>

                            </div>
                            {/* {username === 'Unregistered' &&
                        <div style={{display: 'flex', flexDirection:'column'}}>
                            <button onClick={handleLogIn} className={style.btnPrimary}>Log In</button>
                            <button onClick={handleSignUp} className={style.btn}>Sign Up</button>
                        </div>
                    } */}
                        </div>
                    </div>
            }
        </div>
    )
}

export default Menu;