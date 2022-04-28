/** @format */
import "./index.scss"
import { CaretRightFilled } from "@ant-design/icons"
import { Card, CascadePicker, Input, Form, Modal, Button } from "antd-mobile"
import { useState } from "react"
import { upDateInfo } from "../../../../../common/fetch"
import { message } from "antd"
import { useSessionStorageState } from "ahooks"

const options = [
  {
    label: "计算机学院",
    value: "计算机学院",
    children: [
      {
        label: "计算机科学与技术",
        value: "计算机科学与技术",
        children: [
          { label: "18计科1班", value: "18计科1班" },
          { label: "18计科2班", value: "18计科2班" },
          { label: "18计科3班", value: "18计科3班" },
          { label: "18计科4班", value: "18计科4班" },
        ],
      },
      {
        label: "软件工程",
        value: "软件工程",
        children: [
          { label: "18软件1班", value: "18软件1班" },
          { label: "18软件2班", value: "18软件2班" },
          { label: "18软件3班", value: "18软件3班" },
          { label: "18软件4班", value: "18软件4班" },
        ],
      },
    ],
  },
  {
    label: "会计学院",
    value: "会计学院",
    children: [
      {
        label: "会计专业",
        value: "会计专业",
        children: [
          { label: "18会计1班", value: "18会计1班" },
          { label: "18会计2班", value: "18会计2班" },
          { label: "18会计3班", value: "18会计3班" },
          { label: "18会计4班", value: "18会计4班" },
        ],
      },
      {
        label: "财税专业",
        value: "财税专业",
        children: [
          { label: "18财税1班", value: "18财税1班" },
          { label: "18财税2班", value: "18财税2班" },
        ],
      },
    ],
  },
  {
    label: "体育学院",
    value: "体育学院",
    children: [
      {
        label: "田径类专业",
        value: "田径类专业",
        children: [{ label: "18田径1班", value: "18田径1班" }],
      },
      {
        label: "球类专业",
        value: "球类专业",
        children: [
          { label: "18篮球1班", value: "18篮球1班" },
          { label: "18足球1班", value: "18足球1班" },
          { label: "18排球1班", value: "18排球1班" },
        ],
      },
    ],
  },
  {
    label: "艺术学院",
    value: "艺术学院",
    children: [
      {
        label: "图画专业",
        value: "图画专业",
        children: [{ label: "18图画1班", value: "18图画1班" }],
      },
      {
        label: "声乐专业",
        value: "声乐专业",
        children: [{ label: "18声乐1班", value: "18声乐1班" }],
      },
      {
        label: "器乐专业",
        value: "器乐专业",
        children: [{ label: "18器乐1班", value: "18器乐1班" }],
      },
      {
        label: "影视艺术专业",
        value: "影视艺术专业",
        children: [{ label: "18影视1班", value: "18影视1班" }],
      },
    ],
  },
]

const checkAge = (_, value) => {
  if (!value || (value > 0 && value < 99)) {
    return Promise.resolve()
  }
  return Promise.reject(new Error("请输入正确年龄!"))
}

const checkPhone = (_, value) => {
  if (!value || /^1[34578]\d{9}$/.test(value)) {
    return Promise.resolve()
  }
  return Promise.reject(new Error("请输入正确手机号!"))
}

export default () => {
  const user = JSON.parse(sessionStorage.getItem("userInfo")).user
  const [visible, setVisible] = useState(false)
  const [changeVisible, setChangeVisible] = useState(false)
  const [position, setPosition] = useState(user.position)
  const [phone, setPhone] = useState(user.phone)
  const [age, setAge] = useState(user.age)
  const [isAge, setIsAge] = useState()

  const [session, setSession] = useSessionStorageState("userInfo")

  return (
    <div className="mineInfoBox">
      <Card className="infoItem">
        <span className="keySpan">姓名</span>
        <div>
          <span className="valueSpan">{user.name}</span>
        </div>
      </Card>
      <Card className="infoItem">
        <span className="keySpan">学号</span>
        <div>
          <span className="valueSpan">{user.stuId}</span>
        </div>
      </Card>
      <Card
        className="infoItem"
        onClick={() => {
          setChangeVisible(true)
          setIsAge(true)
        }}
      >
        <span className="keySpan">年龄</span>
        <div>
          <span className="valueSpan">{age}</span>
          <CaretRightFilled />
        </div>
      </Card>
      <Card className="infoItem">
        <span className="keySpan">性别</span>
        <div>
          <span className="valueSpan">{user.sex}</span>
        </div>
      </Card>

      <Card
        className="infoItem"
        onClick={() => {
          setChangeVisible(true)
          setIsAge(false)
        }}
      >
        <span className="keySpan">手机号</span>
        <div>
          <span className="valueSpan">{phone}</span>
          <CaretRightFilled />
        </div>
      </Card>
      <Card className="infoItem" onClick={() => setVisible(true)}>
        <span className="keySpan">学院</span>
        <div>
          <span className="valueSpan">{position.academy}</span>
          <CaretRightFilled />
        </div>
      </Card>
      <Card className="infoItem" onClick={() => setVisible(true)}>
        <span className="keySpan">专业</span>
        <div>
          <span className="valueSpan">{position.major}</span>
          <CaretRightFilled />
        </div>
      </Card>
      <Card className="infoItem" onClick={() => setVisible(true)}>
        <span className="keySpan">班级</span>
        <div>
          <span className="valueSpan">{position._class}</span>
          <CaretRightFilled />
        </div>
      </Card>
      <Button
        className="subBtn"
        block
        color="primary"
        size="large"
        onClick={() => {
          upDateInfo({
            params: {
              name: user.name,
              age: age - 0,
              position: position,
              phone: phone,
            },
            success: (res) => {
              message.success(res.data.message)
              setSession(res.data.user)
            },
          })
        }}
      >
        提交修改
      </Button>

      <CascadePicker
        title="级联选择"
        options={options}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        onConfirm={(value) => {
          setPosition({
            academy: value[0],
            major: value[1],
            _class: value[2],
          })
        }}
      />

      <Modal
        visible={changeVisible}
        closeOnMaskClick
        content={
          <Form
            onFinish={(value) => {
              console.log(value)
              isAge ? setAge(value.age) : setPhone(value.phone)
              setChangeVisible(false)
            }}
            footer={
              <Button block type="submit" color="primary" size="large">
                确定
              </Button>
            }
          >
            <Form.Item
              name={isAge ? "age" : "phone"}
              rules={[
                { required: true, message: "不能为空" },
                { validator: isAge ? checkAge : checkPhone },
              ]}
            >
              <Input
                autoComplete="off"
                placeholder={"请输入" + (isAge ? "年龄" : "手机号")}
              />
            </Form.Item>
          </Form>
        }
        closeOnAction
        onClose={() => {
          setChangeVisible(false)
        }}
      />
    </div>
  )
}
