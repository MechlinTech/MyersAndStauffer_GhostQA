import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Invitation from '../pages/Invitaion'
import ChangePassword from '../pages/Account/ChangePassword'
import ForgotPassword from '../pages/ForgotPassword'
const Auth = lazy(() => import("../pages/Auth"))

export default function AuthNav() {
  return (
    <Routes>
        <Route path='*' element={<Auth/>}/>
        <Route path="/AcceptInvitation/:toEmail" element={<Invitation />} />
        <Route path="/ChangePassword/:emailId" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  )
}
