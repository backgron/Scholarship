/** @format */
import { NavBar } from "antd-mobile"
import { useNavigate, useLocation } from "react-router-dom"
import AboutUs from "./components/aboutUs"
import AccountSecurity from "./components/accountSecurity"
import MineGrades from "./components/mineGrades"
import MineInfo from "./components/mineInfo"
import MineRewards from "./components/mineRewards"
import "./index.scss"

const InnerHTMLType = {
  aboutUs: AboutUs,
  accountSecurity: AccountSecurity,
  mineGrades: MineGrades,
  mineInfo: MineInfo,
  mineRewards: MineRewards,
}

export default () => {
  const navigate = useNavigate()
  const location = useLocation()

  const InnerHTML = InnerHTMLType[location.state.pageType]
  console.log(InnerHTML)

  return (
    <div className="InfoPageBox">
      <NavBar className="navBar" onBack={() => navigate(-1)}>
        {location.state.pageTitle}
      </NavBar>
      <div className="innerHTML">
        <InnerHTML />
      </div>
    </div>
  )
}
