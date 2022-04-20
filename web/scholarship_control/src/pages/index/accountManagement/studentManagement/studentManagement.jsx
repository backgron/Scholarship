/** @format */

import { Table, Tag, Popconfirm, Button, Input, Form, message } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import StudentDetail from "./components/studentDetail/studentDetail"
import "./studentManagement.scss"
import {
  getStudentInfo,
  resetStuPassword,
  adminFindStuBy,
  adminGetStudentDetail,
} from "../../../../common/fetch"

export default () => {
  let [data, setData] = useState([])
  const [visible, setVisible] = useState(false)
  const [stu, setStu] = useState(null)

  const confirm = (text) => {
    return new Promise((reslove, reject) => {
      resetStuPassword({
        params: {
          _id: text._id,
        },
        success: function (res) {
          if (res.data.status === 200) {
            message.success("重置密码成功")
            reslove()
          }
        },
        error: function (error) {
          message.error("重置密码失败")
          reject()
        },
      })
    })
  }

  const findBy = (value) => {
    let params = {}
    for (let key in value) {
      if (value[key]) {
        params[key] = value[key]
      }
    }
    adminFindStuBy({
      params: params,
      success: (res) => {
        setData(res.data)
      },
    })
  }

  const onClick = (stu_id) => {
    setVisible(true)
    adminGetStudentDetail({
      params: {
        _id: stu_id,
      },
      success(data) {
        setStu(data.data)
      },
    })
  }

  useEffect(() => {
    getStudentInfo(
      {
        success: function (res) {
          setData(res.data)
        },
      },
      sessionStorage.getItem("userType")
    )
  }, [])

  const columns = [
    {
      title: "学号/账号",
      dataIndex: "stuId",
    },
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "班级",
      dataIndex: "_class",
    },
    {
      title: "操作",
      dataIndex: "_id",
      render: (text, record) => (
        <div>
          <Button
            className="detailBtn"
            type="primary"
            size="small"
            onClick={() => onClick(record._id)}
          >
            详情
          </Button>
          <Popconfirm
            title="确定要重置该学生的密码?"
            onConfirm={() => confirm(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="danger" className="resetBtn" size={"small"}>
              重置密码
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <div className="student_management">
      <div className="search_box">
        <Form layout="inline" onFinish={findBy} className="search_form">
          <Form.Item name="name" label="姓名">
            <Input placeholder="按姓名查找" />
          </Form.Item>
          <Form.Item name="stuId" label="学号">
            <Input placeholder="按学号查找" />
          </Form.Item>
          <Form.Item name="position._class" label="班级">
            <Input placeholder="班级" />
          </Form.Item>

          <Form.Item>
            <Button
              className="resetBtn"
              htmlType="submit"
              style={{ float: "right", marginRight: "30px" }}
            >
              查找
            </Button>
          </Form.Item>
        </Form>
      </div>
      <hr />
      <div className="table">
        <Table
          columns={columns}
          dataSource={data}
          size="small"
          rowKey={(recored) => recored._id}
          scroll={{ y: "300px" }}
          pagination={{ position: ["bottomCenter"], total: data.length }}
        />
      </div>
      <StudentDetail visible={visible} setVisible={setVisible} stu={stu} />
    </div>
  )
}
