import { useContext } from "react"
import { Outlet } from "react-router"
import { userContext } from "../../app"
import MyInfo from "./components/myInfo/myInfo"
import Nav from "./components/nav/nav"
import './index.scss'

export default () => {
  const [user, userDispatch] = useContext(userContext)

  return (
    <div className='index_main'>
      <div className="header">
        <div className="logo"></div>
        <div className="myInfo">
          <MyInfo user={user}></MyInfo>
        </div>
      </div>
      <div className="nav">
        <Nav></Nav>
      </div>
      <div className="main">
        <Outlet></Outlet>
      </div>
      <div className="foot">
        <span>Copyright © 2022 Backgron All Rights Reserved</span>
      </div>
    </div>
  )
}