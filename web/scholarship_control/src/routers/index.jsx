/** @format */

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"

import { useContext, useState } from "react"
import { userContext } from "../app"
import NotFoundPage from "../pages/404"
import routerConfig from "./routers.config"

const Router = (props) => {
  const [user, userDispatch] = useContext(userContext)

  const userType = sessionStorage.getItem("userType")

  const roleRoute = (config) => {
    return config.map((item) => {
      if (
        item.role.includes(userType) ||
        (user && item.role.includes(user.userType)) ||
        item.role.length === 0
      ) {
        return (
          <Route key={item.path} path={item.path} element={<item.Element />}>
            {item.children ? roleRoute(item.children) : ""}
          </Route>
        )
      } else {
        return
      }
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        {roleRoute(routerConfig)}
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
