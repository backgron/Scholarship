/** @format */

import { Menu, Dropdown, message } from "antd"
import { DownOutlined } from "@ant-design/icons"
import "./myInfo.scss"
import { useContext } from "react"
import { userContext } from "../../../../app"
import { useNavigate } from "react-router"

export default (props) => {
  const [user, userDispatch] = useContext(userContext)

  const navigate = useNavigate()

  const onClick = async ({ key }) => {
    if (key === "2") {
      await userDispatch({
        type: "remove",
      })
      sessionStorage.removeItem("userInfo")
      sessionStorage.removeItem("userType")
      message.success("退出成功")
      navigate("/")
    }
  }

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">修改个人信息</Menu.Item>
      <Menu.Item key="2">退出登录</Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {localStorage.getItem("username")} <DownOutlined />
      </a>
    </Dropdown>
  )
}
