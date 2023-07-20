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
}
  from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../views/css/mansi.css'
import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux';
import "../../views/css/pagiantion.css"

function userProject(props) {
  const [visible, setVisible] = useState(false)
  const [visibleaddpro, setVisibleaddpro] = useState(false)
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  // const [selectedType, setSelectedType] = useState('');
  // const [dropdownLabel, setDropdownLabel] = useState('CATEGORY');
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)


  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    projectLanguage: '',
    projectCategory: '',
    projectPriority: '',
    projectCategoryBy: '',
    startDate: '',
    deadline: '',
    // attachFile: null,
  });

  const [selectedProject, setSelectedProject] = useState({
    project_name: '',
    project_desc: '',
    created_by: '',
    // Add other project fields as needed
  });

  // Event handler for handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      console.log(formData)
      // // Send the form data to the backend server using Axios
      const response = await axios.post('http://localhost:5000/projectsdetails', formData)


      setFormData({
        projectName: '',
        projectDescription: '',
        projectLanguage: '',
        projectPriority: '',
        projectCreatedBy: '',
        startDate: '',
        deadline: '',
        // attachFile: null,
      });




      // Optionally, handle the response from the server here (e.g., show a success message)
      // console.log('Response from server:', response.data);

      // Reset the form fields after successful submission


      // Optionally, update the user interface (e.g., refresh the data or show a success message)
      // fetchData();
      setVisible(false)
    } catch (error) {
      // Handle any error that might occur during form submission
      console.error('Error submitting form:', error);
    }
  };

  // Event handler for updating form data as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  // Event handler for updating the 'attachFile' state when a file is selected
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachFile: e.target.files[0],
    });
  };

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

  const handleEditClick = (project) => {
    setSelectedProject(project); // Set the selected project data
    setVisible(true); // Show the modal
  };

  const handleUpdate = async () => {
    try {
      // Send the updated project data to the backend server using Axios
      const response = await axios.put(`http://localhost:5000/projectsdetails/${selectedProject.id}`, selectedProject);

      // Optionally, handle the response from the server here (e.g., show a success message)
      console.log('Response from server:', response.data);

      // Refresh the data after successful update
      fetchData();

      // Close the modal
      setVisible(false);
    } catch (error) {
      // Handle any error that might occur during the update process
      console.error('Error updating project:', error);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      // Send a DELETE request to the backend server to delete the project with the given ID
      const response = await axios.delete(`http://localhost:5000/projectsdetails/${projectId}`);

      // Optionally, handle the response from the server here (e.g., show a success message)
      console.log('Response from server:', response.data);

      // Refresh the data after successful deletion
      fetchData();
    } catch (error) {
      // Handle any error that might occur during the deletion process
      console.error('Error deleting project:', error);
    }
  };

  return (
    <>
      <CContainer fluid className="mt-2">
        <div className="d-flex bd-highlight flex-column flex-md-row mb-3">
          <div className="me-auto d-flex p-2 ">
            <CCol sm="auto">
              <CButton onClick={() => setVisibleaddpro(!visibleaddpro)}
                type="button"
                className='add-project-btn'
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                Add Project
              </CButton>
            </CCol>
            {/* <CCol sm="auto" className="mx-3">
              <CFormSelect className="project-select">
                <option>Week</option>
                <option value="1">Month</option>
                <option value="2">Year</option>
              </CFormSelect>
            </CCol> */}
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
                      Language
                    </CTableHeaderCell>
                    <CTableHeaderCell className="tableheader" scope="col">
                      Created by
                    </CTableHeaderCell>
                    <CTableHeaderCell className="tableheader" scope="col">
                      Members
                    </CTableHeaderCell>
                    <CTableHeaderCell className="tableheader" scope="col">
                      Priority
                    </CTableHeaderCell>
                    <CTableHeaderCell className="tableheader" scope="col">
                      Start Date
                    </CTableHeaderCell>
                    <CTableHeaderCell className="tableheader" scope="col">
                      Deadline
                    </CTableHeaderCell>
                    <CTableHeaderCell className="tableheader" scope="col">
                      Documents
                    </CTableHeaderCell>
                    <CTableHeaderCell className="tableheader " scope="col">
                      Action
                    </CTableHeaderCell>
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
                      <CTableDataCell className="tablecell pt-4">{user.language}</CTableDataCell>
                      <CTableDataCell className="tablecell pt-4">{user.created_by}</CTableDataCell>
                      <CTableDataCell className="tablecell pt-4">{user.members}</CTableDataCell>
                      <CTableDataCell className="tablecell pt-4">{user.priority}</CTableDataCell>
                      <CTableDataCell className="tablecell pt-4">{user.start_date}</CTableDataCell>
                      <CTableDataCell className="tablecell pt-4">{user.deadline}</CTableDataCell>
                      <CTableDataCell className="tablecell pt-4">{user.documents}</CTableDataCell>
                      <CTableDataCell className="tablecell pt-4 ">
                        <FontAwesomeIcon className='pe-4'
                          icon={faEye}
                          style={{ cursor: 'pointer', color: '#0f9299' }}
                        />
                        <FontAwesomeIcon
                          className="pe-4"
                          icon={faEdit}
                          style={{ cursor: 'pointer', color: '#0f9299' }}
                          onClick={() => handleEditClick(user)} // Call handleEditClick with the current project data
                        />
                        <FontAwesomeIcon
                          className='pe-4'
                          icon={faTrash}
                          style={{ cursor: 'pointer', color: '#0f9299' }}
                          onClick={() => handleDelete(user.id)} // Call handleDelete with the project ID to be deleted
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
                      value={selectedProject.project_name}
                      onChange={(e) =>
                        setSelectedProject({ ...selectedProject, project_name: e.target.value })
                      }
                    />
                  </div>
                  <div className="row mt-3 edit-project-input">
                    <CFormInput
                      className="edit-input"
                      type="text"
                      label="Description"
                      value={selectedProject.project_desc}
                      onChange={(e) =>
                        setSelectedProject({ ...selectedProject, project_desc: e.target.value })
                      }
                    />
                  </div>
                  <div className="row mt-3 edit-project-input">
                    <CFormInput
                      className="edit-input"
                      type="text"
                      label="Manager"
                      value={selectedProject.created_by}
                      onChange={(e) =>
                        setSelectedProject({ ...selectedProject, created_by: e.target.value })
                      }
                    />
                  </div>
                </CModalBody>
                <CModalFooter>
                  <CButton className="edit-btn" onClick={handleUpdate}>Update</CButton>
                  <CButton className="edit-btn" onClick={() => setVisible(false)}>
                    Close
                  </CButton>
                </CModalFooter>
              </CModal>

              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header border-0 pb-0 px-4">
                      <h3 className="modal-title text-secondary" id="exampleModalLabel">
                        <b>Add New Project</b>
                      </h3>
                      <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body px-5">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label htmlFor="projectName">Project Name</label>
                          <input
                            name='projectName'
                            value={formData.projectName}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-lg mt-2"
                            id="projectName"
                            required
                          />
                        </div>
                        <div className="mt-3">
                          <label htmlFor="projectDescription">Project Description</label>
                          <textarea
                            name='projectDescription'
                            value={formData.projectDescription}
                            onChange={handleChange}
                            className="form-control form-control-lg mt-2"
                            id="projectDescription"
                            required
                            rows="5"
                          />
                        </div>
                        <div className="row mt-3">
                          <div className="form-group col-lg-6">
                            <label htmlFor="projectLanguage">Language</label>
                            <select
                              value={formData.projectLanguage}
                              name='projectLanguage'
                              onChange={handleChange}
                              className="form-control form-select form-control-lg mt-2"
                              id="projectLanguage"
                              required
                            >
                              <option value="">Select Language</option>
                              <option>React Js</option>
                              <option>Node Js</option>
                              <option>Mern Stack</option>
                            </select>
                          </div>
                          <div className="form-group col-lg-6">
                            <label htmlFor="projectCategory">Created by</label>
                            <select
                              value={formData.projectCreatedBy}
                              onChange={handleChange}
                              name='projectCreatedBy'
                              className="form-control form-select form-control-lg mt-2"
                              id="projectCategory"
                              required
                            >
                              <option value="">Created by</option>
                              <option>Manager</option>
                              <option>Team Leader</option>
                              <option>P.O.</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="form-group col-lg-6">
                            <label htmlFor="projectPriority">Priority</label>
                            <select
                              value={formData.projectPriority}
                              name='projectPriority'
                              onChange={handleChange}
                              className="form-control form-select form-control-lg mt-2"
                              id="projectPriority"
                              required
                            >
                              <option value="">Select Priority</option>
                              <option>High</option>
                              <option>Medium</option>
                              <option>Low</option>
                            </select>
                          </div>
                          <div className="form-group col-lg-6">
                            <label htmlFor="projectCategoryBy">Member</label>
                            <select
                              value={formData.projectCategoryBy}
                              onChange={handleChange}
                              name='projectCategoryBy'
                              className="form-control form-select form-control-lg mt-2"
                              id="projectCategoryBy"
                              required
                            >
                              <option value="">Select Member</option>
                              <option>Manager</option>
                              <option>Team Leader</option>
                              <option>P.O.</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="form-group col-lg-6">
                            <label htmlFor="startDate">Start Date</label>
                            <input
                              name='startDate'
                              value={formData.startDate}
                              onChange={handleChange}
                              type="date"
                              className="form-control form-control-lg mt-2"
                              id="startDate"
                              required
                            />
                          </div>
                          <div className="form-group col-lg-6">
                            <label htmlFor="endDate">End Date</label>
                            <input
                              name='endDate'
                              value={formData.endDate}
                              onChange={handleChange}
                              type="date"
                              className="form-control form-control-lg mt-2"
                              id="endDate"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="attachFile">Attach File</label>
                          <input
                            name="attachFile"
                            onChange={handleFileChange}
                            type="file"
                            className="form-control form-control-lg mt-2"
                            id="attachFile"
                          />
                        </div>
                        <div className="modal-footer mb-3 border-0 text-center justify-content-center">
                          <CButton type='submit' data-bs-dismiss="modal" className="edit-btn">Add</CButton>
                          <CButton className="edit-btn" data-bs-dismiss="modal" onClick={() => setVisible(false)}>
                            Close
                          </CButton>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pagination  */}
        <nav>
          <ul className="pagination pagination-new">
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
      </CContainer >
    </>
  )
}



export default userProject
