import React from 'react'
import {Route, Routes} from 'react-router-dom'
import EmployeeForm from "../../components/employees/employee-form";
import MemberForm from "../../components/members/member-form";
import RecordForm from "../../components/accounts/records/record-form";
import MoneyForm from "../../components/accounts/records/detail/money-form";

export const ModalRoutes = () => {
  return (
        <Routes>
            <Route exact path="staff">
                <Route exact path="add" element={<EmployeeForm/>}/>
                <Route exact path="edit" element={<EmployeeForm/>}/>
            </Route>
            <Route exact path="members">
                <Route exact path="form" element={<MemberForm/>}/>
            </Route>
            <Route exact path="accounts/records">
                <Route exact path="form" element={<RecordForm/>}/>
                <Route exact path=":id/details/form" element={<MoneyForm/>}/>
            </Route>
        </Routes>
  )
}
