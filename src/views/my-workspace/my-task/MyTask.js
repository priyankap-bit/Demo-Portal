// import React from 'react'

// const MyTask = () => {
//   return (
//     <>
//       <h1>my task</h1>
//     </>
//   )
// }

// export default MyTask

import React, { useState, useEffect } from 'react'
import { Pagination } from 'react-bootstrap'
import {
  CCol,
  CContainer,
  CFormSelect,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  // CImage,
  CButton,
  CModal,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormInput,
  CFormCheck,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faFolderOpen, faEdit } from '@fortawesome/free-solid-svg-icons'
import '../../../views/css/mansi.css'

const MyTask = () => {
  const [visible, setVisible] = useState(false)

  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Fetch your table data from an API or other source
  //   useEffect(() => {
  //     fetchData() // Implement your data fetching logic here
  //   }, [])

  // Filter the data based on the filter value
  const filteredData = data.filter((row) => row.value.toString().includes(filter))

  // Update pagination when filter or data changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filter, data])

  // Calculate the index range of the current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  // Handle filter value change
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    // <div>
    //   <input type="text" value={filter} onChange={handleFilterChange} placeholder="Filter..." />
    //   <table>
    //     {/* Render your table headers */}
    //     <thead>
    //       <tr>
    //         <th>Column 1</th>
    //         <th>Column 2</th>
    //         {/* ... */}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {/* Render your table rows */}
    //       {currentItems.map((row) => (
    //         <tr key={row.id}>
    //           <td>{row.value}</td>
    //           {/* ... */}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>

    //   {/* Render your pagination component */}
    //   <Pagination
    //     currentPage={currentPage}
    //     itemsPerPage={itemsPerPage}
    //     totalItems={filteredData.length}
    //     onPageChange={(page) => setCurrentPage(page)}
    //   />
    // </div>
    <CContainer fluid className="mt-5">
      {/* <div className="d-flex bd-highlight mb-3">
                        <div className="me-auto d-flex p-2 ">
                            <CCol sm="auto" >
                                <CButton className="add-project-btn">Add Project</CButton>
                            </CCol>
                            <CCol sm="auto" className="px-3">
                                <CFormSelect className="project-select">
                                    <option>Week</option>
                                    <option value="1">Month</option>
                                    <option value="2">Year</option>
                                </CFormSelect>
                            </CCol>                            
                        </div>
                        <div className="p-2 " >
                            <div className="row  d-flex   align-items-center" >
                                <div className="col-md-6 d-flex" >
                                    <div className="mt-2 px-3">
                                        <p>Search:</p>
                                    </div>
                                    <div className="project-search-bar">                                        
                                        <i className="fa fa-search"></i>
                                        <input type="text" className="form-control searchbar-input"  />
                                    </div>
                                </div>
                            </div> 
                        </div>
                </div> */}
      <div className="table-scroll">
        <div className="project-list-table-div">
          <div className="table-container">
            <CTable className="project-list-table mt-5">
              <CTableHead>
                <CTableRow className="project-list-table-header">
                  <CTableHeaderCell className="tableheader " scope="col">
                    Project Name
                  </CTableHeaderCell>
                  {/* <CTableHeaderCell className="tableheader" scope="col"></CTableHeaderCell> */}
                  <CTableHeaderCell className="tableheader" scope="col">
                    Description
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tableheader" scope="col">
                    Manager
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tableheader" scope="col">
                    Client
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tableheader" scope="col">
                    Last Activity
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tableheader" scope="col">
                    Unread Count
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tableheader" scope="col"></CTableHeaderCell>
                  <CTableHeaderCell className="tableheader text-center" scope="col">
                    Action
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tableheader" scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow className="project-list-table-body">
                  <CTableDataCell className="tablecell pt-4">
                    Productivity App Development
                  </CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">IT Company Sample</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">User</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">Test Client</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">3 minutes ago</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">0</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">
                    <FontAwesomeIcon icon={faHeart} style={{ cursor: 'pointer' }} />
                  </CTableDataCell>
                  <CTableDataCell className="tablecell text-center pt-4">
                    <FontAwesomeIcon icon={faFolderOpen} style={{ cursor: 'pointer' }} />
                  </CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">
                    <FontAwesomeIcon
                      onClick={() => setVisible(!visible)}
                      icon={faEdit}
                      style={{ cursor: 'pointer' }}
                    />
                  </CTableDataCell>
                </CTableRow>

                <CTableRow className="project-list-table-body">
                  <CTableDataCell className="tablecell pt-4">
                    Productivity App Development
                  </CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">IT Company Sample</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">User</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">Test Client</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">3 minutes ago</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4 ">0</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">
                    <FontAwesomeIcon icon={faHeart} style={{ cursor: 'pointer' }} />
                  </CTableDataCell>
                  <CTableDataCell className="tablecell text-center pt-4">
                    <FontAwesomeIcon icon={faFolderOpen} style={{ cursor: 'pointer' }} />
                  </CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">
                    <FontAwesomeIcon
                      onClick={() => setVisible(!visible)}
                      icon={faEdit}
                      style={{ cursor: 'pointer' }}
                    />
                  </CTableDataCell>
                </CTableRow>

                <CTableRow className="vehicle-list-table-body">
                  <CTableDataCell className="tablecell pt-4">
                    Productivity App Development
                  </CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">IT Company Sample</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">User</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">Test Client</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">3 minutes ago</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">0</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">
                    <FontAwesomeIcon icon={faHeart} style={{ cursor: 'pointer' }} />
                  </CTableDataCell>
                  <CTableDataCell className="tablecell text-center pt-4">
                    <FontAwesomeIcon icon={faFolderOpen} style={{ cursor: 'pointer' }} />
                  </CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">
                    <FontAwesomeIcon
                      onClick={() => setVisible(!visible)}
                      icon={faEdit}
                      style={{ cursor: 'pointer' }}
                    />
                  </CTableDataCell>
                </CTableRow>

                <CTableRow className="vehicle-list-table-body">
                  <CTableDataCell className="tablecell pt-4">
                    Productivity App Development
                  </CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">IT Company Sample</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">User</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">Test Client</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">3 minutes ago</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">0</CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">
                    <FontAwesomeIcon icon={faHeart} style={{ cursor: 'pointer' }} />
                  </CTableDataCell>
                  <CTableDataCell className="tablecell text-center pt-4">
                    <FontAwesomeIcon icon={faFolderOpen} style={{ cursor: 'pointer' }} />
                  </CTableDataCell>
                  <CTableDataCell className="tablecell pt-4">
                    {/* <CButton className="edit-icon-btn" onClick={() => setVisible(!visible)} > */}
                    <FontAwesomeIcon
                      onClick={() => setVisible(!visible)}
                      icon={faEdit}
                      style={{ cursor: 'pointer' }}
                    />
                    {/* </CButton> */}
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>

            <CModal
              alignment="center"
              className="edit-modal"
              scrollable
              visible={visible}
              onClose={() => setVisible(false)}
            >
              <CModalHeader>
                <CModalTitle>Edit Project</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="row edit-project-input">
                  <CFormInput className="edit-input" type="text" label="Name" />
                </div>
                <div className="row mt-3 edit-project-input">
                  <CFormInput className="edit-input" type="text" label="Description" />
                </div>
                <div className="row mt-3 edit-project-input">
                  <CFormInput className="edit-input" type="text" label="Manager" />
                </div>
                <div className="row mt-3">
                  <div>
                    <p>Team Members</p>
                  </div>
                  <div className="col-6 edit-checkbox">
                    <CFormCheck
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      label="Add All Team Members"
                    />
                  </div>
                  <div className="col-6 edit-checkbox">
                    <CFormCheck
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      label="Select Specific Team Members"
                    />
                  </div>
                </div>
                <div className="row mt-3 edit-project-input">
                  <CFormInput className="edit-input" type="text" label="Client" />
                </div>
                <div className="row mt-3 edit-project-input">
                  <CFormInput
                    className="edit-input"
                    type="text"
                    label="Co-Client"
                    style={{ width: '300px' }}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton className="edit-btn">Update</CButton>
                <CButton className="edit-btn" onClick={() => setVisible(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
          </div>
        </div>
      </div>
    </CContainer>
  )
}

export default MyTask
