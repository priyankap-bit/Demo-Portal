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
CImage,
CButton
} from '@coreui/react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faFile, faEdit } from '@fortawesome/free-solid-svg-icons'



function userProject(props) {
    return (
        <>
            <CContainer fluid className="mt-5">
                <div className="d-flex bd-highlight mb-3">
                        <div className="me-auto p-2 ">
                            <CCol sm="auto">
                                <CFormSelect className="project-select">
                                    <option>Week</option>
                                    <option value="1">Month</option>
                                    <option value="2">Year</option>
                                </CFormSelect>
                            </CCol>
                        </div>
                        <div className="p-2 ">
                            <div className="row  d-flex justify-content-end  align-items-center">
                                <div className="col-md-6">
                                    <div className="project-search-bar">
                                        <i className="fa fa-search"></i>
                                        <input type="text" className="form-control searchbar-input" placeholder="Search" />
                                    </div>
                                </div>
                            </div> 
                        </div>
                </div>
                <div className="project-list-table-div" >
            <div className="table-container">
                <CTable className="project-list-table mt-5">
                    <CTableHead  >
                    <CTableRow className="project-list-table-header" >
                      <CTableHeaderCell className="tableheader " scope="col">Project Name</CTableHeaderCell>
                        {/* <CTableHeaderCell className="tableheader" scope="col"></CTableHeaderCell> */}
                        <CTableHeaderCell className="tableheader" scope="col">Description</CTableHeaderCell>
                        <CTableHeaderCell className="tableheader" scope="col">Manager</CTableHeaderCell>
                        <CTableHeaderCell className="tableheader" scope="col">Client</CTableHeaderCell>
                        <CTableHeaderCell className="tableheader" scope="col">Last Activity</CTableHeaderCell>
                        <CTableHeaderCell className="tableheader" scope="col">Unread Count</CTableHeaderCell>
                        <CTableHeaderCell className="tableheader" scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                    </CTableHead>
                      <CTableBody >
                        <CTableRow className="project-list-table-body" >
                          <CTableDataCell className="tablecell pt-4" >Productivity App Development</CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">IT Company Sample</CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">User</CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">Test Client</CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">3 minutes ago</CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">0</CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">
                            <FontAwesomeIcon icon={faHeart} />
                          </CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">
                            <FontAwesomeIcon icon={faFile} />
                          </CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">
                            <FontAwesomeIcon icon={faEdit} />
                          </CTableDataCell>
                          
                        </CTableRow>

                        <CTableRow className="project-list-table-body" >
                          <CTableDataCell className="tablecell pt-4" >Productivity App Development</CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">IT Company Sample</CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">User</CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">Test Client</CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">3 minutes ago</CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">0</CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">
                            <FontAwesomeIcon icon={faHeart} />
                          </CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">
                            <FontAwesomeIcon icon={faFile} />
                          </CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">
                            <FontAwesomeIcon icon={faEdit} />
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
                            <FontAwesomeIcon icon={faHeart} />
                          </CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">
                            <FontAwesomeIcon icon={faFile} />
                          </CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">
                            <FontAwesomeIcon icon={faEdit} />
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
                            <FontAwesomeIcon icon={faHeart} />
                          </CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">
                            <FontAwesomeIcon icon={faFile} />
                          </CTableDataCell>
                          <CTableDataCell className="tablecell pt-4">
                            <FontAwesomeIcon icon={faEdit} />
                          </CTableDataCell>
                          
                        </CTableRow>
                      </CTableBody>                 
                </CTable>
            </div>
        </div>
            </CContainer>
        </>
    );
}

export default userProject;