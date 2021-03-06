/** @format */

import { message } from "antd"
import { Input, Form, Button } from "antd-mobile"
import { useState } from "react"
import { changeStuPassword } from "../../../../../common/fetch"
import "./index.scss"

export default () => {
  const stuId = 20181506210411
  const [newPassword, setNewPassword] = useState()

  const required = (_, value) => {
    if (!value || value.length < 0) {
      return Promise.reject()
    }
    return Promise.resolve()
  }

  const rePassword = (_, value) => {
    if (value !== newPassword && value) {
      return Promise.reject()
    }
    return Promise.resolve()
  }

  const passwordType = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject()
    }
    return Promise.resolve()
  }

  return (
    <div className="accountSecurityBox">
      <Form
        layout="horizontal"
        onFinish={(value) => {
          changeStuPassword({
            params: {
              oldPassword: value.oldPassword,
              newPassword: value.newPassword,
            },
            success: (res) => {
              if (res.data.code > 399) {
                return message.error(res.data.message)
              }
              message.success(res.data.message)
            },
          })
        }}
        footer={
          <Button block type="submit" color="primary" size="large">
            修改密码
          </Button>
        }
      >
        <Form.Item label="学号">
          <Input defaultValue={stuId} readOnly autoComplete="username" />
        </Form.Item>
        <Form.Item
          label="旧密码"
          name="oldPassword"
          rules={[
            {
              validator: required,
              message: "旧密码不能为空！",
            },
          ]}
        >
          <Input
            placeholder="请输入旧密码"
            autoComplete="current-password"
            clearable
            type="password"
          />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPassword"
          rules={[
            {
              validator: required,
              message: "新密码不能为空！",
            },
            {
              validator: passwordType,
              message: "密码长度不得小于8位！",
            },
          ]}
        >
          <Input
            placeholder="8位以上新密码"
            onChange={(v) => setNewPassword(v)}
            clearable
            autoComplete="new-password"
            type="password"
          />
        </Form.Item>
        <Form.Item
          label="密码确认"
          name="rePassword"
          rules={[
            {
              validator: rePassword,
              message: "两次输入密码不一致！",
            },
            {
              validator: required,
              message: "请重新输入密码！",
            },
          ]}
        >
          <Input
            placeholder="新密码确认"
            autoComplete="new-password"
            clearable
            type="password"
          />
        </Form.Item>
      </Form>
    </div>
  )
}
