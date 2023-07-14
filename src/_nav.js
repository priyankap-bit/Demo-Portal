/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilApplications,
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
    to: '/dashboard',
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
    component: CNavGroup,
    name: 'My Workspace',
    to: '/my-workspace',
    icon: <CIcon icon={cilApplications} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'My Task',
        to: '/my-workspace/my-task',
      },
    ],
  },
]

export default _nav
