/** @format */

import { Table, Popconfirm, Button, Input, Form, message } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import CounselorDetail from "./components/counselorDetail/counselorDetail"
import "./counselorManagement.scss"
import {
  adminGetCounselorInfo,
  adminResetCounselorPassword,
  adminFindCounselorBy,
  adminGetCounselorDetail,
} from "../../../../common/fetch"

export default () => {
  let [data, setData] = useState([])
  const [visible, setVisible] = useState(false)
  const [counselor, setCounselor] = useState(null)

  const confirm = (text) => {
    return new Promise((reslove, reject) => {
      adminResetCounselorPassword({
        params: {
          _id: text._id,
        },
        success: function (res) {
          if (res.data.status === 200) {
            message.success(res.data.msg)
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
    adminFindCounselorBy({
      params: params,
      success: (res) => {
        setData(res.data)
      },
    })
  }

  useEffect(() => {
    adminGetCounselorInfo({
      success: function (res) {
        setData(res.data)
      },
    })
  }, [])

  const onClick = (counselor_id) => {
    setVisible(true)
    adminGetCounselorDetail({
      params: {
        _id: counselor_id,
      },
      success(data) {
        setCounselor(data.data)
      },
    })
  }

  const columns = [
    {
      title: "工号/账号",
      dataIndex: "counselorId",
      key: "counselorId",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "系院",
      dataIndex: "academy",
      key: "academy",
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
            title="确定要重置该账号的密码?"
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
    <div className="counselor_management">
      <div className="search_box">
        <Form layout="inline" onFinish={findBy} className="search_form">
          <Form.Item name="name" label="姓名">
            <Input placeholder="按姓名查找" />
          </Form.Item>
          <Form.Item name="counselorId" label="工号">
            <Input placeholder="按工号查找" />
          </Form.Item>
          <Form.Item name="position.academy" label="系院">
            <Input placeholder="按系院查找" />
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
          rowKey={"_id"}
          scroll={{ y: "300px" }}
          pagination={{ position: ["bottomCenter"], total: data.length }}
        />
      </div>

      <CounselorDetail
        visible={visible}
        setVisible={setVisible}
        counselor={counselor}
      />
    </div>
  )
}
