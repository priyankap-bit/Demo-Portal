/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCheckCircle, faCircle, faFolder, faHome, faSignOut } from '@fortawesome/free-solid-svg-icons'
// import { faCircleTrash } from '@fortawesome/free-solid-svg-icons'


const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/home',
    icon: <FontAwesomeIcon icon={faHome} style={{ paddingRight:"20px"}} /> ,
  },
  {
    component: CNavItem,
    name: 'My Task',
    to: '/task',
    icon: <FontAwesomeIcon icon={faCheckCircle} style={{ paddingRight:"20px"}} />,
  },
  {
    component: CNavItem,
    name: 'Inbox',
    to: '/inbox',
    icon: <FontAwesomeIcon icon={faBell} style={{ paddingRight:"20px"}} />,
  },
  {
    component: CNavItem,
    name: 'Project',
    to: '/project',
    icon: <FontAwesomeIcon icon={faFolder} style={{ paddingRight:"20px"}} />,
  },
  {
    component: CNavItem,
    name: "Logout",
    // to: "/login", // Replace with your desired dummy route
    icon: <FontAwesomeIcon icon={faSignOut} rotation={180} style={{ paddingLeft:"20px"}} />,
    onClick: 'logout'
  }

]

export default _nav
