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



function userProject(props) {
  const [visible, setVisible] = useState(false)
  const [visibleaddpro, setVisibleaddpro] = useState(false)
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectManager, setProjectManager] = useState('')
  const [projectId, setProjectId] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newProjectManager, setNewProjectManager] = useState('');














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




  const updateProject = async () => {
    try {
      const updatedProject = {
        project_name: projectName,
        project_desc: projectDescription,
        manager: projectManager,
      };

      // Make an API request to update the project
      await axios.put(`http://localhost:5000/projectsdetails/${projectId}`, updatedProject);

      // Handle the response and any necessary actions
      console.log('Project updated successfully');

      // Clear the input fields and close the modal
      setProjectName('');
      setProjectDescription('');
      setProjectManager('');
      setVisible(false);

      // Fetch the updated data
      fetchData();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      // Make an API request to delete the project
      await axios.delete(`http://localhost:5000/projectsdetails/${projectId}`);

      // Handle the response and any necessary actions
      console.log('Project deleted successfully');

      // Fetch the updated data
      fetchData();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const addProject = async () => {
    try {
      const newProject = {
        project_name: newProjectName,
        project_desc: newProjectDescription,
        manager: newProjectManager,
      };

      // Make an API request to add the project
      await axios.post('http://localhost:5000/projectsdetails', newProject);

      // Handle the response and any necessary actions
      console.log('Project added successfully');

      // Clear the input fields and close the modal
      setNewProjectName('');
      setNewProjectDescription('');
      setNewProjectManager('');
      setVisibleaddpro(false);

      // Fetch the updated data
      fetchData();
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };




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
                    <CTableHeaderCell className="tableheader " scope="col">
                      Action
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentUsers.map((user) => (
                    <CTableRow className="project-list-table-body" key={user.projectId}>
                      <CTableDataCell className="tablecell pt-4">
                        {user.project_name}
                      </CTableDataCell>
                      <CTableDataCell className="tablecell pt-4">
                        {user.project_desc}
                      </CTableDataCell>
                      <CTableDataCell className="tablecell pt-4">{user.manager}</CTableDataCell>
                      <CTableDataCell className="tablecell pt-4">{user.client}</CTableDataCell>
                      <CTableDataCell className="tablecell pt-4">{user.unread_cnt}</CTableDataCell>
                      <CTableDataCell className="tablecell pt-4 ">
                        <FontAwesomeIcon className='pe-4'
                          icon={faEye}
                          style={{ cursor: 'pointer', color: '#0f9299' }}
                        />
                        <FontAwesomeIcon
                          className='pe-4'
                          onClick={() => {
                            setVisible(!visible)
                            setProjectName(user.project_name)
                            setProjectDescription(user.project_desc)
                            setProjectManager(user.manager)
                            setProjectId(user.projectId); // Pass the projectId value
                          }}
                          icon={faEdit}
                          style={{ cursor: 'pointer', color: '#0f9299' }}
                        />
                        <FontAwesomeIcon
                          className='pe-4'
                          onClick={() => {
                            deleteProject(user.projectId); // Call the deleteProject function with the projectId
                          }}
                          icon={faTrash}
                          style={{ cursor: 'pointer', color: '#0f9299' }}
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
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
                    <CFormInput
                      className="edit-input"
                      type="text"
                      label="Name"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>
                  <div className="row mt-3 edit-project-input">
                    <CFormInput
                      className="edit-input"
                      type="text"
                      label="Description"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                    />
                  </div>
                  <div className="row mt-3 edit-project-input">
                    <CFormInput
                      className="edit-input"
                      type="text"
                      label="Manager"
                      value={projectManager}
                      onChange={(e) => setProjectManager(e.target.value)}
                    />
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
                </CModalBody>
                <CModalFooter>
                  <CButton className="edit-btn" onClick={updateProject}>
                    Update
                  </CButton>
                  <CButton className="edit-btn" onClick={() => setVisible(false)}>
                    Close
                  </CButton>
                </CModalFooter>
              </CModal>













              <CModal
                alignment="center"
                className="edit-modal"
                scrollable
                visible={visibleaddpro}
                onClose={() => setVisibleaddpro(false)}
              >
                <CModalHeader>
                  <CModalTitle>Add New Project</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <div className="row edit-project-input">
                    <CFormInput
                      className="edit-input"
                      type="text"
                      label="Project Name"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                    />
                  </div>
                  <div className="row mt-3 edit-project-input">
                    <CFormInput
                      className="edit-input"
                      type="text"
                      label="Description"
                      value={newProjectDescription}
                      onChange={(e) => setNewProjectDescription(e.target.value)}
                    />
                  </div>
                  <div className="row mt-3 edit-project-input">
                    <CFormInput
                      className="edit-input"
                      type="text"
                      label="Manager"
                      value={newProjectManager}
                      onChange={(e) => setNewProjectManager(e.target.value)}
                    />
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
                </CModalBody>
                <CModalFooter>
                  <div className="wrapper d-flex justify-content-center">
                    <CButton className="edit-btn" onClick={addProject}>
                      Add
                    </CButton>
                    <CButton className="edit-btn ms-3" onClick={() => setVisibleaddpro(false)}>
                      Close
                    </CButton>
                  </div>
                </CModalFooter>
              </CModal>
            </div>
          </div>
        </div>


















        {/* Pagination  */}
        <nav>
          <ul className="pagination">
            <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={currentPage === i + 1 ? 'page-item active' : 'page-item'}>
                <button className="page-link" onClick={() => paginate(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={currentPage === totalPages ? 'page-item disabled' : 'page-item'}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </CContainer>
    </>
  )
}

export default userProject
