import '@/styles/globals.css'
import AuthWrapper from '@/wrappers/authWrapper'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import React, { createContext, useReducer } from 'react'
import { user } from '../reducers/user'

const Context = createContext({})

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

const initialState = {
  user: {
    token: null,
    isLoggedIn: false,
  },
}

const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer(combineReducers(user), initialState) // pass more reducers combineReducers(user, blogs, products)
  const value = { state, dispatch }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Provider>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </Provider>
    </ThemeProvider>
  )
}

export { Context, Provider }
