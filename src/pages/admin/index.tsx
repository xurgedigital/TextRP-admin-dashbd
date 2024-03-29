import Admin from '@/components/Admin'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { Context } from '../_app'

const AdminPage = () => {
  const router = useRouter()
  const { state, dispatch }: any = useContext(Context)

  useEffect(() => {
    if (!(state?.user?.isLoggedIn || localStorage.getItem('isLoggedIn') == 'true')) {
      router && router.push('/login')
    } else {
      router && router.push('admin/user-management')
    }
  }, [router, state?.user?.isLoggedIn])
  return <></>
}

export default AdminPage
