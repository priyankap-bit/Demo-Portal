/* eslint-disable prettier/prettier */
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge, CContainer } from '@coreui/react'

export const AppSidebarNav = ({ items }) => {

  const location = useLocation()
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {Notification}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}

  

//   return (
//     <>
//       <CContainer fluid>
//         <div className=" sidebarnav mt-5" >
//           <div className="d-flex">
//             <div className="px-3">
//               <i className="fas fa-home"></i>
//             </div>
//             <div>
//               <p>Home</p>
//             </div>
//           </div>

//           <div className="d-flex">
//             <div className="px-3">
//               <i className="far fa-check-circle"></i>
//             </div>
//             <div>
//               <p>My Task</p>
//             </div>
//           </div>

//           <div className="d-flex">
//             <div className="px-3">
//               <i className="far fa-bell"></i>
//             </div>
//             <div>
//               <p>Inbox</p>
//             </div>
//           </div>

//           <hr />

//           <div className="row">
//             <div>
//               <p>Project</p>
//             </div>
//           </div>

//         </div>

//       </CContainer>
//     </>
//   )
// }

// AppSidebarNav.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.any).isRequired,
// }
