import { useContext, useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Context } from '../_app'

const LoginLoader = (props: { setLoginData: Function }) => {
  const { setLoginData } = props
  const getQrCode = () => {
    axios.get('/api/login').then((res) => {
      setLoginData(res.data)
    })
  }

  useEffect(() => {
    getQrCode()
  }, [])

  return (
    <div className="bg-primary-blue h-fit">
      <div
        className="bg-opacity-30 flex justify-center items-center py-14 md:py-20 lg:py-60 min-h-screen"
        style={{
          backgroundImage:
            'linear-gradient(rgba(50, 84, 254, 0.93), rgba(50, 84, 254, 0.93)), url(images/loginBg.png)',
        }}
      >
        <div className="bg-white w-[95%] sm:w-[75%] xl:w-[60%] flex flex-col md:flex-row justify-between p-4 sm:p-12 rounded-2xl">
          <div>
            <h2 className=" font-normal text-2xl">Login with QR Code to use TextRP</h2>
            <div className="flex mt-4 text-secondary-text font-normal text-base">
              <div className="mr-2 h-6 min-w-[24px] w-6 rounded-full bg-primary-blue text-white flex justify-center items-center font-semibold text-xs">
                1
              </div>
              Open the XUMM app on your phone
            </div>
            <div className="flex mt-4 text-secondary-text font-normal text-base break-keep">
              <div className="mr-2 h-6 min-w-[24px] w-6 rounded-full bg-primary-blue text-white flex justify-center items-center font-semibold text-xs">
                2
              </div>
              <div className="flex flex-col lg:flex-row">
                <div className="flex">
                  Tap on the <span className="bg-qr-scan-icon h-6 w-6 mx-0.5"></span> center icon
                </div>{' '}
                <div>in bottom navigation</div>
              </div>
            </div>
            <div className="flex mt-4 text-secondary-text font-normal text-base">
              <div className="mr-2 h-6 min-w-[24px] w-6 rounded-full bg-primary-blue text-white flex justify-center items-center font-semibold text-xs">
                3
              </div>
              Tap on the scan QR code button
            </div>
            <div className="flex mt-4 text-secondary-text font-normal text-base">
              <div className="mr-2 h-6 min-w-[24px] w-6 rounded-full bg-primary-blue text-white flex justify-center items-center font-semibold text-xs">
                4
              </div>
              Point your phone camera towards the QR code
            </div>
            <div className="mt-6 flex items-center">
              <input type="checkbox" className="border border-primary-blue h-4 w-4" />
              <label className="text-primary-gray text-base font-normal ml-2">
                Keep me signed in
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center mt-10 md:mt-0 md:w-1/2">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const LoginLoaded = (props: { LoginData: any; setLoginData: Function }) => {
  const { state, dispatch }: any = useContext(Context)
  const router = useRouter()

  const { LoginData, setLoginData } = props

  useWebSocket(LoginData?.data?.refs?.websocket_status, {
    onOpen: () => {
      console.log('WebSocket connection established.')
    },
    onMessage(event) {
      console.log(event.data, 'enet', JSON.parse(event.data))
      if (JSON.parse(event.data).signed) {
        axios.get('/api/login').then((res) => {
          setLoginData(res.data)
          handleSignIn()
        })
      } else if (JSON.parse(event.data).user_token && !JSON.parse(event.data).signed) {
        window.location.reload()
      }
    },
  })

  const handleSignIn = () => {
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: LoginData?.me,
    })
    localStorage.setItem('userData', JSON.stringify(LoginData?.me))
    localStorage.setItem('isLoggedIn', JSON.stringify(true))
    router.push('/')
  }

  return (
    <div className="bg-primary-blue h-fit">
      <div
        className="bg-opacity-30 flex justify-center items-center py-14 md:py-20 lg:py-60 min-h-screen"
        style={{
          backgroundImage:
            'linear-gradient(rgba(50, 84, 254, 0.93), rgba(50, 84, 254, 0.93)), url(images/loginBg.png)',
        }}
      >
        <div className="bg-white w-[95%] sm:w-[75%] xl:w-[60%] flex flex-col md:flex-row justify-between p-4 sm:p-12 rounded-2xl">
          <div>
            <h2 className=" font-normal text-2xl">Login with QR Code to use TextRP</h2>
            <div className="flex mt-4 text-secondary-text font-normal text-base">
              <div className="mr-2 h-6 min-w-[24px] w-6 rounded-full bg-primary-blue text-white flex justify-center items-center font-semibold text-xs">
                1
              </div>
              Open the XUMM app on your phone
            </div>
            <div className="flex mt-4 text-secondary-text font-normal text-base break-keep">
              <div className="mr-2 h-6 min-w-[24px] w-6 rounded-full bg-primary-blue text-white flex justify-center items-center font-semibold text-xs">
                2
              </div>
              <div className="flex flex-col lg:flex-row">
                <div className="flex">
                  Tap on the <span className="bg-qr-scan-icon h-6 w-6 mx-0.5"></span> center icon
                </div>{' '}
                <div>in bottom navigation</div>
              </div>
            </div>
            <div className="flex mt-4 text-secondary-text font-normal text-base">
              <div className="mr-2 h-6 min-w-[24px] w-6 rounded-full bg-primary-blue text-white flex justify-center items-center font-semibold text-xs">
                3
              </div>
              Tap on the scan QR code button
            </div>
            <div className="flex mt-4 text-secondary-text font-normal text-base">
              <div className="mr-2 h-6 min-w-[24px] w-6 rounded-full bg-primary-blue text-white flex justify-center items-center font-semibold text-xs">
                4
              </div>
              Point your phone camera towards the QR code
            </div>
            <div className="mt-6 flex items-center">
              <input type="checkbox" className="border border-primary-blue h-4 w-4" />
              <label className="text-primary-gray text-base font-normal ml-2">
                Keep me signed in
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center mt-10 md:mt-0 md:w-1/2">
            {LoginData ? (
              <a href={LoginData?.data?.next?.always} target="_blank" rel="noopener noreferrer">
                <img src={LoginData?.data?.refs?.qr_png} alt="qr" />
              </a>
            ) : (
              <div>loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const Login = () => {
  const [LoginData, setLoginData] = useState<any>(null)
  const { state, dispatch }: any = useContext(Context)
  const router = useRouter()

  useEffect(() => {
    if (LoginData?.me) {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: LoginData?.me,
      })
      localStorage.setItem('userData', JSON.stringify(LoginData?.me))
      localStorage.setItem('isLoggedIn', JSON.stringify(true))
      router.push('/')
    }
  }, [LoginData])

  return (
    <div>
      {LoginData?.data?.refs ? (
        <LoginLoaded LoginData={LoginData} setLoginData={setLoginData} />
      ) : (
        <LoginLoader setLoginData={setLoginData} />
      )}
    </div>
  )
}

export default Login
