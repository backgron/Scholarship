/** @format */
import { Card } from "antd-mobile"
import { useEffect, useState } from "react"
import "./index.scss"
import { findAllGrades } from "../../../../../common/fetch"

export default () => {
  let [grades, setGrades] = useState()

  useEffect(() => {
    findAllGrades({
      success: (res) => {
        setGrades(res.data)
      },
    })
  }, [])

  return (
    <div className="mineGradesBox">
      <div className="mainBox">
        {grades
          ? grades.map((item) => (
              <Card className="card" key={item._id}>
                <span>{item.className}</span>
                <span className="labelValue">{item.classGrade}</span>
              </Card>
            ))
          : null}
      </div>
    </div>
  )
}
