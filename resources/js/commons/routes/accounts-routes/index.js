import React from 'react'
import {Route} from 'react-router-dom'
import Dashboard from "../../../components/accounts/dashboard";
import AllRecords from "../../../components/accounts/records/all-records";
import PageWrapper from "../../../components/admin/page-wrapper";
import RecordsDetail from "../../../components/accounts/records/detail";

export default [
    <Route key={'accounts'} path='accounts'>
        <Route index element={<Dashboard/>}/>
        <Route path='js/*' element={<Dashboard/>}/>
        <Route path='home' element={<Dashboard/>}/>
        <Route element={<PageWrapper/>}>
            <Route exact path='records' element={<AllRecords/>}/>
            <Route exact path='records/:id/details' element={<RecordsDetail/>}/>
        </Route>
    </Route>
]
