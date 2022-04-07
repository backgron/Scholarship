/** @format */

import "./login.scss"
import { Form, Input, Button, message, Spin } from "antd"
import { login } from "../../common/fetch"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { userContext } from "../../app"
import { useEffect } from "react"
import { UserOutlined, LockOutlined } from "@ant-design/icons/lib/icons"
import { useSessionStorageState } from "ahooks"

export default () => {
  // 是否为登录请求中
  const [ing, setIng] = useState(false)

  const navigate = useNavigate()

  // 获取全局用户信息
  const [user, userDispatch] = useContext(userContext)
  const [userInfo, setUserInfo] = useSessionStorageState("userInfo")

  const LoginButton = () => {
    if (ing) {
      return <Spin size="small" />
    } else {
      return "登录"
    }
  }

  //发送表单 验证用户名和密码
  const onFinish = (values) => {
    // 判断是否为空
    if (!(values.username && values.password)) {
      message.error("请输入正确的用户名和密码")
      return
    }
    setIng(true)

    //发送请求
    login({
      params: {
        username: values.username,
        password: values.password,
      },
      success: async function ({ data: { data } }) {
        setIng(false)
        await userDispatch({
          type: "set",
          user: data,
        })
        console.log(data)
        if (
          data &&
          (data.userType === "admin" || data.userType === "counselor")
        ) {
          localStorage.setItem("username", values.username)
          sessionStorage.setItem("userType", data.userType)
          setUserInfo(data)
          navigate("/index")
        } else if (data && data.userType === "student") {
          localStorage.setItem("username", values.username)
          sessionStorage.setItem("userType", data.userType)
          setUserInfo(data)
          navigate("/show/home")
        }
        if (data.statusCode === 400) {
          message.error("账号或密码错误")
          setIng(false)
        }
        message.success("每天都要开开心心")
      },
      error: function ({ data }) {
        if (data.statusCode === 400) {
          message.error("账号或密码错误")
          setIng(false)
        }
      },
    })
  }

  return (
    <div className="login_page">
      <div className="backgroundImg"></div>
      <div className="login_main">
        <div className="login_title">
          <div className="logo"></div>
          <span className="split">|</span>
          <div className="page_name">河南财政金融学院奖助学金管理系统</div>
        </div>

        <div className="login_box">
          <div className="notice">
            <h5>简介</h5>
            <hr />
            <p>
              欢迎访问河南财政金融学院奖助学金管理系统，校内用户访问请使用我校统一分配的工号（学号）进行登录！
            </p>
            <p>
              Welcome to the scholarship management system of Henan Institute of
              Finance and finance. Please log in with the job number (student
              number) uniformly assigned by our university!
            </p>
          </div>
          <div className="login">
            <h5>登录</h5>
            <hr />
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              autoComplete="off"
              // initialValues={{ 'username': localStorage.getItem('username') }}
              initialValues={{ username: "20181506210411", password: "123456" }}
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ require: true, message: "请输入用户名" }]}
              >
                <Input
                  placeholder="请输入用户名"
                  autoComplete="true"
                  prefix={
                    <UserOutlined style={{ color: "rgba(191, 191, 191)" }} />
                  }
                />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[{ require: true, message: "请输入密码" }]}
              >
                <Input.Password
                  placeholder="请输入密码"
                  autoComplete="true"
                  prefix={
                    <LockOutlined style={{ color: "rgba(191, 191, 191)" }} />
                  }
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  <LoginButton />
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="login_foot">
          Copyright © 2022 Backgron All Rights Reserved
        </div>
      </div>
    </div>
  )
}
