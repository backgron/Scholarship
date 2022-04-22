/** @format */
import { Card } from "antd-mobile"
import { useEffect, useState } from "react"
import "./index.scss"
import { findAllActions } from "../../../../../common/fetch"

export default () => {
  let [actions, setActions] = useState()

  useEffect(() => {
    findAllActions({
      success: (res) => {
        console.log(res.data)
        setActions(res.data)
      },
    })
  }, [])

  return (
    <div className="mineGradesBox">
      <div className="mainBox">
        {actions
          ? actions.map((item, index) => (
              <Card className="card" key={index}>
                <span>{item.name}</span>
                <span className="labelValue">{item.grade}</span>
              </Card>
            ))
          : null}
      </div>
    </div>
  )
}
