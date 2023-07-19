/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react';

import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import axios from 'axios';
import Pagination from 'react-js-pagination';

const User = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [visible, setVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users')
            setUsers(response.data.user)
            console.log(response.data.user) 
        } catch (error) {
            console.error('Error retrieving user data:', error)
        }
    }



    const filteredUsers = users.filter(
        (user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.password.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.department.toLowerCase().includes(searchTerm.toLowerCase())||
            user.position.toLowerCase().includes(searchTerm.toLowerCase())||
            user.status.toLowerCase().includes(searchTerm.toLowerCase())||
            // user.role.toLowerCase().includes(searchTerm.toLowerCase())|| 
            user.creationtime.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    // ...



    // ...

    // Change page
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <div className="p-2   d-flex justify-content-end ">
                <div className="row  d-flex  mt-3  align-items-center">
                    <div className="project-search-bar ">
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
            <CTable className="project-list-table mt-5">
                <CTableHead>
                    <CTableRow className="project-list-table-header">
                        {/* <CTableHeaderCell scope="col">Username</CTableHeaderCell> */}
                        <CTableHeaderCell className="tableheader" scope="col">
                      Username
                        </CTableHeaderCell>
                        <CTableHeaderCell className="tableheader" scope="col">
                        Email
                        </CTableHeaderCell>
                        <CTableHeaderCell className="tableheader" scope="col">
                      Password 
                        </CTableHeaderCell>
                        <CTableHeaderCell className="tableheader" scope="col">
                            Mobile No
                        </CTableHeaderCell>
                        <CTableHeaderCell className="tableheader " scope="col">
                            Department
                        </CTableHeaderCell>
                        <CTableHeaderCell className="tableheader " scope="col">
                            Position
                        </CTableHeaderCell>
                        <CTableHeaderCell className="tableheader " scope="col">
                            Status
                        </CTableHeaderCell>
                        <CTableHeaderCell className="tableheader " scope="col">
                            Role
                        </CTableHeaderCell>
                        <CTableHeaderCell className="tableheader " scope="col">
                            Creation Time
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
                                {user.username}
                            </CTableDataCell>
                            <CTableDataCell className="tablecell pt-4">
                                {user.email}
                            </CTableDataCell>
                            <CTableDataCell className="tablecell pt-4">{user.password}</CTableDataCell>
                            <CTableDataCell className="tablecell pt-4">{user.contact}</CTableDataCell>
                            <CTableDataCell className="tablecell pt-4">{user.department}</CTableDataCell>
                            <CTableDataCell className="tablecell pt-4">{user.position}</CTableDataCell>
                            <CTableDataCell className="tablecell pt-4">{user.status}</CTableDataCell>
                            <CTableDataCell className="tablecell pt-4">{user.role}</CTableDataCell>
                            <CTableDataCell className="tablecell pt-4">{user.creationtime}</CTableDataCell>
                            <CTableDataCell className="tablecell pt-4 ">

                                <FontAwesomeIcon className='pe-4'
                                    onClick={() => setVisible(!visible)}
                                    icon={faEdit}
                                    style={{ cursor: 'pointer', color: '#0f9299' }}
                                />
                                <FontAwesomeIcon className='pe-4'
                                    icon={faTrash}
                                    style={{ cursor: 'pointer', color: '#0f9299' }}
                                />
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>

            </CTable >

            {filteredUsers.length > usersPerPage && (
                <div className="wrapper d-flex justify-content-end">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={10}
                        totalItemsCount={filteredUsers.length}
                        pageRangeDisplayed={5} // Number of page links to display
                        onChange={handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            )}
        </>

    )
}

export default User