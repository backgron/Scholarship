
import { Menu } from 'antd'
import React from 'react'
import './nav.scss'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../../../../app'
import navConfig from './nav.config'

const { SubMenu } = Menu

export default () => {
  const [openKeys, setOpenKeys] = React.useState(['sub0'])

  const [user, userDispatch] = useContext(userContext)

  const rootSubmenuKeys = ['sub0', 'sub1', 'sub2', 'sub3', 'sub4']

  const onOpenChange = keys => {
    console.log(openKeys)
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const rouleMenu = (config) => {
    return config.map((item) => {
      if ((user && item.role && item.role.includes(user.userType)) || item.role.includes(sessionStorage.getItem('userType'))) {
        if (item.type === 'MenuItem') {
          return (
            <Menu.Item key={item.key} icon={item.icon ? <item.icon /> : null}>
              <Link to={item.path}> {item.innerHtml}</Link>
            </Menu.Item>
          )
        } else if (item.type === 'SubMenu') {
          return (
            <SubMenu key={item.key} icon={item.icon ? <item.icon /> : null} title={item.title}>
              {rouleMenu(item.innerHtml)}
            </SubMenu>
          )
        }
      }

    })
  }

  return (
    <Menu mode="inline" openKeys={openKeys} defaultSelectedKeys={['sub0']} onOpenChange={onOpenChange} style={{ width: '100%', background: '#0000', color: '#fff' }}>
      {rouleMenu(navConfig)}

      {/* <Menu.Item key="sub0" icon={<DeploymentUnitOutlined />}>
        首页
      </Menu.Item>
      <SubMenu key="sub1" icon={<MailOutlined />} title="用户账号管理">
        <Menu.Item key="1"><Link to='counselorManagement'>学生账号管理</Link></Menu.Item>
        <Menu.Item key="2"><Link to='studentManagement'>导员账号管理</Link></Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="奖助学金管理">
        <Menu.Item key="3">奖助学金历史</Menu.Item>
        <Menu.Item key="4">奖助学金审批</Menu.Item>
      </SubMenu>
      <SubMenu key="sub3" icon={<SettingOutlined />} title="学生成绩管理">
        <Menu.Item key="5">学生成绩审批</Menu.Item>
      </SubMenu>
      <SubMenu key="sub4" icon={<CalendarOutlined />} title="官网公告管理">
        <Menu.Item key="6">公告管理</Menu.Item>
      </SubMenu> */}
    </Menu>
  )
}