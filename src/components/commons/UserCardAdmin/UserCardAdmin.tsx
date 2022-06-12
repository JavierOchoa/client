import m from './UserCardAdmin.module.css'
import Swal from 'sweetalert2'

interface user{
  id:string,
  type:string,
  username:string,
  email:string,
  songNumber:number
}

const UserCardAdmin = (user:user)=>{
  const clickEdit= ()=>{

  }
  const clickDelete= ()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  return(
    <div className={m.container}>
      <div className={m.infoContainer}>
          <div className={m.divType}>
            <span>{user.type}</span>
          </div>
          <div className={m.divId}>
            <span className={m.span}>Id: {user.id}</span>
          </div>
          <div className={m.divUsername}>
            <span className={m.span}>Username: {user.username}</span>
          </div>
          <div className={m.divEmail}>
            <span className={m.span}>Email: {user.email}</span>
          </div>
          <div className={m.divSong}>
            <span className={m.span}>Songs number: {user.songNumber}</span>
          </div>
          <button onClick={clickEdit} className={m.button}><img className={m.img} src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png" alt="edit" /></button>
          <button onClick={clickDelete} className={m.button}><img className={m.img} src="https://cdn-icons.flaticon.com/png/512/542/premium/542724.png?token=exp=1654784155~hmac=6cbdff0d6916b7b638a797e3a99baeae" alt="delete" /></button>

      </div>
    </div>
  )
}
export default UserCardAdmin