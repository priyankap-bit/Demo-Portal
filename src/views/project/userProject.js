/* eslint-disable prettier/prettier */
import { CCol, CContainer, CFormSelect } from '@coreui/react';
import React from 'react';

function userProject(props) {
    return (
        <>
            <CContainer fluid>
                <div className="d-flex">
                    <CCol sm="auto">
                        <CFormSelect aria-label="Default select example">
                            <option>Week</option>
                            <option value="1">Month</option>
                            <option value="2">Year</option>
                        </CFormSelect>
                    </CCol>
                    <div className="justify-content-end">
                        <div className="row height d-flex justify-content-end  align-items-center">

                            <div className="col-md-6">

                            <div className="form">
                                <i className="fa fa-search"></i>
                                <input type="text" className="form-control " placeholder="Search" />
                            </div>
                            
                            </div>

                        </div>
                    </div>
                </div>
            </CContainer>
        </>
    );
}

export default userProject;