import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { Context } from '../pages/_app'

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { state, dispatch }: any = useContext(Context)
  const router = useRouter()

  useEffect(() => {
    if (!(state?.user?.isLoggedIn || localStorage.getItem('isLoggedIn') == 'true')) {
      router.push('/login')
    }
  })

  return <>{children}</>
}

export default AuthWrapper
