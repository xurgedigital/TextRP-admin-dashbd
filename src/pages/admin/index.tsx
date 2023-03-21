import Admin from '@/components/Admin'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { Context } from '../_app'

const AdminPage = () => {
  const router = useRouter()
  const { state, dispatch }: any = useContext(Context)

  useEffect(() => {
    if (!(state.user.isLoggedIn || localStorage.getItem('isLoggedIn') == 'true')) {
      router.push('/login')
    }
  })
  return <></>
}

export default AdminPage
