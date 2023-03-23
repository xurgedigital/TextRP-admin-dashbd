import React from 'react'
import Admin from '@/components/Admin'
import EditPage from '@/components/Admin/UserManagement/EditPage'
import { useRouter } from 'next/router'

const UserEdit = () => {
  const { query } = useRouter()

  return (
    <Admin>
      <EditPage ActiveEditId={query?.userId} />
    </Admin>
  )
}

export default UserEdit
