import '@/styles/globals.css'
import AuthWrapper from '@/wrappers/authWrapper'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import React, { createContext, useReducer } from 'react'
import { user } from '@/reducers/user'
import Head from 'next/head'
import { TwilioProvider } from 'twilio-conversations-hooks'
import { SWRConfig } from 'swr'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Context = createContext<{
  state: IRootState
  dispatch: Function
}>({
  dispatch: () => {},
  state: {
    token: null,
  },
})

const combineReducers =
  (
    ...reducers: Array<{
      (state: any, action: any): any
      (arg0: any, arg1: any): any
    }>
  ) =>
  (state: any, action: any) => {
    for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action)
    return state
  }

export interface User {
  id: number
  address: string
  email: null
  name: null
  rememberMeToken: null
  profilePicture: null
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  textRpUsername: null
  about: null
  discount: null
  subscriptions: any[]
  credit: Credit
}

export interface Credit {
  id: number
  userID: string
  balance: number
  createdAt: Date
  updatedAt: Date
}

interface IRootState {
  user?: User
  token: null | string
}
const initialState: IRootState = {
  token: null,
}

const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer(combineReducers(user), initialState) // pass more reducers combineReducers(user, blogs, products)
  const value = { state, dispatch }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* @ts-ignore */}
      <TwilioProvider>
        <SWRConfig
          value={{
            fetcher: (url, init) => axios.get(url).then((res) => res.data),
          }}
        >
          <>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1"
              ></meta>
            </Head>
            <ThemeProvider attribute="class">
              <Provider>
                <AuthWrapper>
                  <Component {...pageProps} /> <ToastContainer />
                </AuthWrapper>
              </Provider>
            </ThemeProvider>
          </>
        </SWRConfig>
      </TwilioProvider>
    </>
  )
}

export { Context, Provider }
