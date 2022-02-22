import React from 'react'
import { Modal } from 'antd'
import './counselorDetail.scss'




export default ({ visible, setVisible, counselor }) => {
  const hasProp = prop => {
    return prop ? prop : '暂未收录'
  }

  const _Class = ({ _class }) => {
    if (_class !== '暂未收录') {
      return (
        <li><span>管理班级</span>
          <div>
            <table>
              /{_class.map((item, index) => (
                <td key={index}><span>{item}</span>/</td>
              ))}
            </table>
          </div>
        </li >
      )
    } else {
      return null
    }
  }

  if (counselor) {
    return (
      <Modal
        visible={visible}
        title="导员详情"
        okText="确定"
        cancelButtonProps={{ className: 'cancelBtn' }}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <div className='detail_box'>
          <ul>
            <li><span>姓名：</span><span>{hasProp(counselor.name)}</span></li>
            <li><span>工号：</span><span>{hasProp(counselor.counselorId)}</span></li>
            <li><span>性别：</span><span>{hasProp(counselor.sex)}</span></li>
            <li><span>系院：</span><span>{hasProp(counselor?.position?.academy)}</span></li>
            <li><span>专业：</span><span>{hasProp(counselor?.position?.major)}</span></li>
            <_Class _class={hasProp(counselor?.position?._class)} />
            <li><span>手机：</span><span>{hasProp(counselor.phone)}</span></li>
          </ul>
        </div>
      </Modal >
    )
  } else {
    return null
  }

}
