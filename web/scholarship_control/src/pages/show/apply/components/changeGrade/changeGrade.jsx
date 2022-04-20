/** @format */
import { useState, useEffect } from "react"
import { useSessionStorageState } from "ahooks"
import { Card, Picker, Button } from "antd-mobile"
import {
  findStuAllGradesById,
  studentChangeGrade,
} from "../../../../../common/fetch"
import "./changeGrade.scss"
import { message } from "antd"

const gradeColumns = [[]]
for (let i = 0; i < 101; i++) {
  gradeColumns[0].push({ label: i, value: i })
}

export default () => {
  const [{ user, userType }, setUserInfo] = useSessionStorageState("userInfo")
  const [visible, setVisible] = useState(false)
  const [newGradeVisible, setNewGradeVisible] = useState(false)
  const [newGrade, setNewGrade] = useState(undefined)
  const [selectId, setSelectId] = useState()
  const [data, setData] = useState()
  const [basicColumns, setBasicColums] = useState([[]])

  useEffect(() => {
    findStuAllGradesById({
      params: {
        _id: user._id,
      },
      success: (res) => {
        setData(res.data)
        let colums = res?.data?.map((item, index) => ({
          label: item.className,
          value: index,
          oldGrade: item.classGrade,
          _id: item._id,
        }))
        setBasicColums([colums])
      },
    })
  }, [])

  return (
    <div className="changeGrade">
      <Card
        className="card"
        onClick={() => {
          setVisible(true)
        }}
      >
        <span>课程</span>
        <span className="labelValue">
          {selectId !== undefined ? basicColumns[0][selectId].label : "选择"}
        </span>
      </Card>
      {selectId !== undefined ? (
        <>
          <Card className="card">
            <span>成绩</span>
            <span className="labelValue">
              {basicColumns[0][selectId].oldGrade}
            </span>
          </Card>
          <Card
            className="card"
            onClick={() => {
              setNewGradeVisible(true)
            }}
          >
            <span>新成绩：</span>
            <span className="labelValue">{newGrade}</span>
          </Card>
          <Button
            className="subBtn"
            block
            color="primary"
            size="large"
            onClick={() => {
              studentChangeGrade({
                params: {
                  grade_id: basicColumns[0][selectId]._id,
                  newGrade,
                },
                success: (res) => {
                  message.success(res?.data?.message)
                },
              })
            }}
          >
            提交申请
          </Button>
        </>
      ) : null}
      <Picker
        columns={basicColumns}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        value={selectId}
        onConfirm={(value) => {
          setNewGrade(basicColumns[0][value].oldGrade)
          setSelectId(value)
        }}
      />
      <Picker
        columns={gradeColumns}
        visible={newGradeVisible}
        onClose={() => {
          setNewGradeVisible(false)
        }}
        onConfirm={(value) => {
          setNewGrade(value[0] + "")
        }}
      />
    </div>
  )
}
