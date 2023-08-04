import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { Context } from '../pages/_app'

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { state, dispatch }: any = useContext(Context)
  const router = useRouter()

  useEffect(() => {
    if (!(state?.user?.isLoggedIn || localStorage.getItem('isLoggedIn') == 'true')) {
      router && !router.pathname.includes('login') && router.push('/login')
    }
    if (router.pathname !== '/login') {
      axios
        .get('/api/me')
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: res.data?.user,
          })
          //   console.log(res, 'hj')
        })
        .catch((err) => {
          if (err) {
            router && router.push('/login')
          }
        })
    }
  }, [state?.user?.isLoggedIn, router])

  return <>{children}</>
}

export default AuthWrapper
