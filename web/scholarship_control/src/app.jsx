import './app.scss'
import 'antd/dist/antd.css'
import MyRouter from './routers/index'
import { useReducer } from 'react'
import React from 'react'
import { userReducer } from './redux/reducer'

export const userContext = React.createContext(null)


export default function App() {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <userContext.Provider value={[user, userDispatch]}>
      <div className='app'>
        <MyRouter></MyRouter>
      </div>
    </userContext.Provider>

  )
}


