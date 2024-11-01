import React from 'react'
import SupportTicketView from '../../components/SupportTicketView'
import AdminSupportHeader from '../../components/AdminSupportHeader'

const AdminSupportViewPage = () => {
  return (
    <SupportTicketView HeaderComponent={AdminSupportHeader} />
  )
}

export default AdminSupportViewPage