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
            const response = await axios.get('https://dummyjson.com/users')
            setUsers(response.data.users)
            console.log(response.data)
        } catch (error) {
            console.error('Error retrieving user data:', error)
        }
    }

   

    const filteredUsers = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.maidenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.toLowerCase().includes(searchTerm.toLowerCase())
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
            <CTable className="project-list-table mt-5">
                <CTableHead>
                    <CTableRow className="project-list-table-header">
                        <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                        <CTableHeaderCell className="tableheader" scope="col">
                            Last Name
                        </CTableHeaderCell>
                        <CTableHeaderCell className="tableheader" scope="col">
                            Midean Name
                        </CTableHeaderCell>
                        <CTableHeaderCell className="tableheader" scope="col">
                            Gender
                        </CTableHeaderCell>
                        <CTableHeaderCell className="tableheader" scope="col">
                            Phone
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
                                {user.firstName}
                            </CTableDataCell>
                            <CTableDataCell className="tablecell pt-4">
                                {user.lastName}
                            </CTableDataCell>
                            <CTableDataCell className="tablecell pt-4">{user.maidenName}</CTableDataCell>
                            <CTableDataCell className="tablecell pt-4">{user.gender}</CTableDataCell>
                            <CTableDataCell className="tablecell pt-4">{user.phone}</CTableDataCell>
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