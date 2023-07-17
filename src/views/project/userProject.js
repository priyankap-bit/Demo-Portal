/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
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
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../views/css/mansi.css'
import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux';

function userProject(props) {
  const [visible, setVisible] = useState(false)
  const [visibleaddpro, setVisibleaddpro] = useState(false)
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  // const [selectedType, setSelectedType] = useState('');
  // const [dropdownLabel, setDropdownLabel] = useState('CATEGORY');
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)
  // const dispatch = useDispatch();

  // fetch data from database..
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/projectsdetails')
      setUsers(response.data)
    } catch (error) {
      console.error('Error retrieving user data:', error)
    }
  }

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const filteredUsers = users.filter(
    (user) =>
      user.project_name && user.project_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <CContainer fluid className="mt-5">
        <div className="d-flex bd-highlight flex-column flex-md-row mb-3">
          <div className="me-auto d-flex p-2 ">
            <CCol sm="auto">
              <CButton onClick={() => setVisibleaddpro(!visibleaddpro)} className="add-project-btn">
                Add Project
              </CButton>
            </CCol>
            <CCol sm="auto" className="px-3">
              <CFormSelect className="project-select">
                <option>Week</option>
                <option value="1">Month</option>
                <option value="2">Year</option>
              </CFormSelect>
            </CCol>
          </div>
          <div className="p-2 ">
            <div className="row  d-flex   align-items-center">
              <div className="col-md-6 d-flex">
                <div className="project-search-bar">
                  <i className="fa fa-search"></i>
                  <input
                    type="text"
                    className="form-control searchbar-input"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-scroll">
          <div className="project-list-table-div">
            <div className="table-container">
              <CTable className="project-list-table mt-5">
                <CTableHead>
                  <CTableRow className="project-list-table-header">
                    <CTableHeaderCell scope="col">Project Name</CTableHeaderCell>
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
                  {currentUsers.map((user) => (
                    <CTableRow className="project-list-table-body" key={user.id}>
                      <CTableDataCell className="tablecell pt-4">
                        {user.project_name}
                      </CTableDataCell>
                      <CTableDataCell className="tablecell pt-4">
                        {user.project_desc}
                      </CTableDataCell>
                      <CTableDataCell className="tablecell pt-4">{user.manager}</CTableDataCell>
                      <CTableDataCell className="tablecell pt-4">{user.client}</CTableDataCell>
                      <CTableDataCell className="tablecell pt-4">{user.unread_cnt}</CTableDataCell>
                      <CTableDataCell className="tablecell pt-4">
                        <FontAwesomeIcon
                          icon={faEye}
                          style={{ cursor: 'pointer', color: '#0f9299' }}
                        />
                      </CTableDataCell>
                      <CTableDataCell className="tablecell text-center pt-4">
                        <FontAwesomeIcon
                          onClick={() => setVisible(!visible)}
                          icon={faEdit}
                          style={{ cursor: 'pointer', color: '#0f9299' }}
                        />
                      </CTableDataCell>
                      <CTableDataCell className="tablecell pt-4">
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ cursor: 'pointer', color: '#0f9299' }}
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

                                    </CTableRow>

                                    <CTableRow className="project-list-table-body" >
                                        <CTableDataCell className="tablecell pt-4" >Productivity App Development</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">IT Company Sample</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">User</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">Test Client</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">3 minutes ago</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4 ">0</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">
                                            <FontAwesomeIcon icon={faEye} style={{ cursor: "pointer", color: '#0f9299' }} />
                                        </CTableDataCell>
                                        <CTableDataCell className="tablecell text-center pt-4">
                                            <FontAwesomeIcon onClick={() => setVisible(!visible)} icon={faEdit} style={{ cursor: "pointer", color: '#0f9299' }} />
                                        </CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">
                                            <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: '#0f9299' }} />
                                        </CTableDataCell>

                                    </CTableRow>

                                    <CTableRow className="vehicle-list-table-body" >
                                        <CTableDataCell className="tablecell pt-4" >Productivity App Development</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">IT Company Sample</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">User</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">Test Client</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">3 minutes ago</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">0</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">
                                            <FontAwesomeIcon icon={faEye} style={{ cursor: "pointer", color: '#0f9299' }} />
                                        </CTableDataCell>
                                        <CTableDataCell className="tablecell text-center pt-4">
                                            <FontAwesomeIcon onClick={() => setVisible(!visible)} icon={faEdit} style={{ cursor: "pointer", color: '#0f9299' }} />
                                        </CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">
                                            <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: '#0f9299' }} />
                                        </CTableDataCell>

                                    </CTableRow>

                                    <CTableRow className="vehicle-list-table-body" >
                                        <CTableDataCell className="tablecell pt-4" >Productivity App Development</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">IT Company Sample</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">User</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">Test Client</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">3 minutes ago</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">0</CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4" >
                                            <FontAwesomeIcon icon={faEye} style={{ cursor: "pointer", color: '#0f9299' }} />
                                        </CTableDataCell>
                                        <CTableDataCell className="tablecell text-center pt-4">
                                            <FontAwesomeIcon onClick={() => setVisible(!visible)} icon={faEdit} style={{ cursor: "pointer", color: '#0f9299' }} />
                                        </CTableDataCell>
                                        <CTableDataCell className="tablecell pt-4">
                                            {/* <CButton className="edit-icon-btn" onClick={() => setVisible(!visible)} > */}
                                            <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: '#0f9299' }} />
                                            {/* </CButton> */}

                                        </CTableDataCell>

                                    </CTableRow>
                                </CTableBody>
                            </CTable>


                            <CModal alignment="center" className="edit-modal" scrollable visible={visible} onClose={() => setVisible(false)}>
                                <CModalHeader>
                                    <CModalTitle className='fs-2 px-3'>Edit Project</CModalTitle>
                                </CModalHeader>
                                <CModalBody className='px-5'>
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
                                        <div className="col-6 edit-checkbox" >
                                            <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault1" label="Add All Team Members" />
                                        </div>
                                        <div className="col-6 edit-checkbox">
                                            <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault2" label="Select Specific Team Members" />
                                        </div>

                                    </div>
                                    {/* <div className="row mt-3 edit-project-input">
                                            <CFormInput className="edit-input" type="text" label="Client" />
                                        </div>
                                        <div className="row mt-3 edit-project-input">
                                            <CFormInput className="edit-input" type="text" label="Co-Client" style={{ width: "300px" }} />
                                        </div> */}
                                </CModalBody>
                                <CModalFooter >
                                   

                                    <CButton className="edit-btn" >Update</CButton>
                                    <CButton className="edit-btn" onClick={() => setVisible(false)}>
                                        Close
                                    </CButton>
                                   
                                </CModalFooter>
                            </CModal>


                            <CModal alignment="center" className="edit-modal"  scrollable visible={visibleaddpro} onClose={() => setVisibleaddpro(false)}>
                                <CModalHeader>
                                    <CModalTitle className='fs-2 px-3'>Add New Project</CModalTitle>
                                </CModalHeader>
                                <CModalBody className='px-5'>
                                    <div className="row edit-project-input">
                                        <CFormInput className="edit-input" type="text" label="Project Name" />
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
                                        <div className="col-6 edit-checkbox" >
                                            <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault1" label="Add All Team Members" />
                                        </div>
                                        <div className="col-6 edit-checkbox">
                                            <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault2" label="Select Specific Team Members" />
                                        </div>

                                    </div>
                                    {/* <div className="row mt-3 edit-project-input">
                                            <CFormInput className="edit-input" type="text" label="Client" />
                                        </div>
                                        <div className="row mt-3 edit-project-input">
                                            <CFormInput className="edit-input" type="text" label="Co-Client" style={{ width: "300px" }} />
                                        </div> */}
                                </CModalBody>
                                <CModalFooter className='d-flex justify-content-center'>
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
        </>
    );
}

export default userProject
