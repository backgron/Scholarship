/** @format */

import {
  Table,
  Popconfirm,
  Button,
  Input,
  Form,
  message,
  Select,
  Tag,
} from "antd"
import { useState } from "react"
import { useEffect } from "react"
import "./gradeManagement.scss"
import { findAllGradeApply } from "../../../common/fetch"

const { Option } = Select

export default (props) => {
  let [data, setData] = useState([])
  const [visible, setVisible] = useState(false)
  const [counselor, setCounselor] = useState(null)

  const confirm = (text) => {
    return new Promise((reslove, reject) => {
      // adminResetCounselorPassword({
      //   params: {
      //     _id: text._id
      //   },
      //   success: function (res) {
      //     if (res.data.status === 200) {
      //       message.success(res.data.msg)
      //       reslove()
      //     }
      //   },
      //   error: function (error) {
      //     message.error('重置密码失败')
      //     reject()
      //   }
      // })
    })
  }

  useEffect(() => {
    findAllGradeApply({
      success: function (res) {
        setData(res.data.map((item) => ({ ...item, ...item.classStatus })))
      },
    })
  }, [])

  const onClick = (counselor_id) => {
    setVisible(true)
    // adminGetCounselorDetail({
    //   params: {
    //     _id: counselor_id
    //   },
    //   success(data) {
    //     setCounselor(data.data)
    //   }
    // })
  }

  const findBy = (value) => {
    let params = {}
    for (let key in value) {
      if (value[key]) {
        params[key] = value[key]
      }
    }
    // adminFindCounselorBy({
    //   params: params,
    //   success: (res) => {
    //     console.log(res)
    //     setData(res.data)
    //   }
    // })
  }

  const columns = [
    {
      title: "学生姓名",
      dataIndex: "stuName",
    },
    {
      title: "课程名称",
      dataIndex: "className",
    },
    {
      title: "现成绩",
      dataIndex: "classGrade",
    },
    {
      title: "修改成绩",
      dataIndex: "newGrade",
    },
    {
      title: "一级审批人",
      dataIndex: "counselorName",
    },
    {
      title: "二级审批人",
      dataIndex: "adminName",
    },
    {
      title: "审批进度",
      dataIndex: "status",
      render: (text, record) => (
        <div>
          {((status = record.status) => {
            if (status === -1) {
              return <Tag color="#f50">已驳回</Tag>
            } else if (status === 0) {
              return <Tag color="#108ee9">学生已申请</Tag>
            } else if (status === 1) {
              return <Tag color="#108ee9">辅导员已审批</Tag>
            } else if ((status = 2)) {
              return <Tag color="#87d068">申请已通过</Tag>
            }
          })()}
        </div>
      ),
    },
    {
      title: "操作",
      dataIndex: "_id",
      render: (text, record) => (
        <div>
          <Popconfirm
            title="确定要通过申请?"
            onConfirm={() => confirm(text)}
            okText="通过"
            cancelText="取消"
          >
            <Button type="primary" className="pass_btn" size={"small"}>
              通过
            </Button>
          </Popconfirm>
          <Popconfirm
            title="确定要驳回申请?"
            onConfirm={() => confirm(text)}
            okText="驳回"
            cancelText="取消"
          >
            <Button type="danger" className="resetBtn" size={"small"}>
              驳回
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <div className="gradeManagement">
      <div className="search_box">
        <Form layout="inline" onFinish={findBy} className="search_form">
          <Form.Item name="stuName" label="姓名">
            <Input placeholder="按姓名查找" />
          </Form.Item>
          <Form.Item name="className" label="课程">
            <Input placeholder="按课程找查" />
          </Form.Item>
          <Form.Item name="status" label="审批进度">
            <Select defaultValue="所有申请" style={{ width: 120 }}>
              <Option value="">所有申请</Option>
              <Option value="0">已申请</Option>
              <Option value="1">导员已审批</Option>
              <Option value="2">管理员已审批</Option>
              <Option value="-1">已驳回</Option>
            </Select>
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
    </div>
  )
}
