/** @format */

import {
  Table,
  Popconfirm,
  Button,
  Input,
  Form,
  message,
  Select,
  Modal,
  Tag,
  Row,
  Col,
} from "antd"
import { useState } from "react"
import { useEffect } from "react"
import "./noticeManagement.scss"
import {
  adminUpdateNotice,
  adminFindNoticelorBy,
  adminCreateNotices,
} from "../../../common/fetch"
import { formatDate } from "../../../common/util"

const { Option } = Select

export default (props) => {
  let [data, setData] = useState([])
  const [visible, setVisible] = useState(false)
  const [notice, setNotice] = useState(null)
  const [isAdd, setIsAdd] = useState(false)
  const [updateRender, setUpdateRender] = useState(false)

  const unUseConfirm = (record) => {
    return new Promise((reslove, reject) => {
      reslove()
      console.log(record)
      adminUpdateNotice({
        params: {
          _id: record._id,
          status: 0,
          main: record.main,
          type: record.type,
        },
        success: (res) => {
          message.success(res.data.message)
          setUpdateRender(!updateRender)
          findBy()
        },
      })
    })
  }

  useEffect(() => {
    findBy()
  }, [])

  const findBy = (value) => {
    console.log(value)
    let params = {}
    for (let key in value) {
      if (value[key]) {
        params[key] = value[key]
      }
    }

    console.log(params)

    adminFindNoticelorBy({
      params: params,
      success: (res) => {
        console.log(res)
        setData(
          res.data.map((item) => {
            return { ...item, time: formatDate(new Date(parseInt(item.time))) }
          })
        )
      },
    })
  }

  const columns = [
    {
      title: "类型",
      dataIndex: "type",
    },
    {
      title: "创建时间",
      dataIndex: "time",
    },
    {
      title: "内容",
      dataIndex: "main",
      width: 200,
      ellipsis: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (text, record) => (
        <div>
          {((status = record.status) => {
            if (status === 1) {
              return <Tag color="#87d068">正在使用</Tag>
            } else if (status === 0) {
              return <Tag color="#f50">已禁用</Tag>
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
          <Button
            type="primary"
            className="pass_btn"
            onClick={() => {
              setIsAdd(false)
              setNotice(record)
              setVisible(true)
            }}
            size={"small"}
          >
            修改
          </Button>
          <Popconfirm
            title="确定要禁用?"
            onConfirm={() => unUseConfirm(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="danger" className="resetBtn" size={"small"}>
              禁用
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <div className="noticeManagement">
      <div className="search_box">
        <Form layout="inline" onFinish={findBy} className="search_form">
          <Form.Item name="main" label="关键字">
            <Input placeholder="关键字" />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select defaultValue="所有状态" style={{ width: 120 }}>
              <Option value="">所有状态</Option>
              <Option value={"0"}>已禁用</Option>
              <Option value="1">正在使用</Option>
            </Select>
          </Form.Item>
          <Form.Item name="type" label="类型">
            <Select defaultValue="所有类型" style={{ width: 120 }}>
              <Option value="">所有类型</Option>
              <Option value="公告">公告</Option>
              <Option value="通知">通知</Option>
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
        <Button
          className="resetBtn"
          onClick={() => {
            setNotice(null)
            setIsAdd(true)
            setVisible(true)
          }}
          style={{
            float: "right",
            marginRight: "30px",
            marginBottom: "5px",
          }}
        >
          添加公告
        </Button>
        <Table
          columns={columns}
          dataSource={data}
          size="small"
          rowKey={"_id"}
          scroll={{ y: "300px" }}
          pagination={{ position: ["bottomCenter"], total: data.length }}
        />
      </div>

      <Modal
        title="修改公告"
        visible={visible}
        footer={null}
        destroyOnClose
        onCancel={() => setVisible(false)}
      >
        <Form
          preserve={false}
          initialValues={notice}
          onFinish={(v) => {
            if (isAdd) {
              adminCreateNotices({
                params: v,
                success: (res) => {
                  message.success.apply(res.data.message)
                  setVisible(false)
                  findBy()
                },
              })
            } else {
              adminUpdateNotice({
                params: { ...v, _id: notice._id },
                success: (res) => {
                  message.success(res.data.message)
                  setVisible(false)
                  findBy()
                },
              })
            }
          }}
        >
          <Form.Item
            label="类型"
            name="type"
            rules={[{ required: true, message: "请选择类型" }]}
          >
            <Select>
              <Option value="公告">公告</Option>
              <Option value="通知">通知</Option>
            </Select>
          </Form.Item>
          {isAdd ? null : (
            <Form.Item
              label="状态"
              name="status"
              rules={[{ required: true, message: "请选择状态" }]}
            >
              <Select>
                <Option value={0}>禁用</Option>
                <Option value={1}>启用</Option>
              </Select>
            </Form.Item>
          )}
          <Form.Item
            label="内容"
            name="main"
            rules={[{ required: true, message: "内容不能为空" }]}
          >
            <Input.TextArea maxLength={40} showCount></Input.TextArea>
          </Form.Item>
          <Form.Item>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button type="primary" htmlType="submit">
                  {isAdd ? "添加" : "修改"}
                </Button>
                <Button
                  style={{ margin: "0 8px" }}
                  onClick={() => {
                    setVisible(false)
                  }}
                >
                  取消
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
