import { useState } from "react";
import {XummPkce} from "xumm-oauth2-pkce"

const Login = () => {
  const [ButtonMsg, setButtonMsg] = useState("Sign In");
  
  var auth = new XummPkce('b19848bd-6133-4267-aa72-2bb4a5183893')
  var sdk = null

  function signedInHandler (authorized: any) {
    // Assign to global,
    // please don't do this but for the sake of the demo it's easy
    sdk = authorized.sdk

    console.log('Authorized', /* authorized.jwt, */ authorized.me)

    setButtonMsg("Signed In!")

    console.log(authorized, "auth data")
    // document.getElementById('trypayload').style.display = 'block'
    // document.getElementById('logout').style.display = 'block'

    sdk.ping().then((pong: any) => console.log({pong}))
  }


  const go = () => {
       setButtonMsg('Signing in...')

       auth.authorize()?.then(signedInHandler).catch(e => {
        console.log('Auth error', e)

        setButtonMsg("Sign In")

        alert("error in authentication")
       })

       auth.on('error', error => {
        console.log('error', error)
      })
    
      auth.on('success', async () => {
        console.log('success')
        auth.state()?.then(state => {
          if (state?.me) {
            console.log('success, me', JSON.stringify(state.me))
          }
        })
      })
    
      auth.on('retrieved', async () => {
        // Redirect, e.g. mobile. Mobile may return to new tab, this
        // must retrieve the state and process it like normally the authorize method
        // would do
        console.log('Results are in, mobile flow, process sign in')
    
        auth.state()?.then(state => {
          console.log(state)
          if (state) {
            console.log('retrieved, me:', JSON.stringify(state.me))
            signedInHandler(state)
          }
        })
      })
  };

  return (
    <div className="bg-primary-blue h-fit">
      <div
        className="bg-opacity-30 flex justify-center items-center py-14 md:py-20 lg:py-60 min-h-screen"
        style={{
          backgroundImage:
            "linear-gradient(rgba(50, 84, 254, 0.93), rgba(50, 84, 254, 0.93)), url(images/loginBg.png)",
        }}
      >
        <div className="bg-white w-[95%] sm:w-[75%] xl:w-[60%] flex flex-col md:flex-row justify-between p-4 sm:p-12 rounded-2xl">
          <div>
            <h2 className=" font-normal text-2xl">
              Login with QR Code to use TextRP
            </h2>
            <p className="flex mt-4 text-secondary-text font-normal text-base">
              <div className="mr-2 h-6 min-w-[24px] w-6 rounded-full bg-primary-blue text-white flex justify-center items-center font-semibold text-xs">
                1
              </div>
              Open the XUMM app on your phone
            </p>
            <p className="flex mt-4 text-secondary-text font-normal text-base break-keep">
              <div className="mr-2 h-6 min-w-[24px] w-6 rounded-full bg-primary-blue text-white flex justify-center items-center font-semibold text-xs">
                2
              </div>
              <div className="flex flex-col lg:flex-row">
                <div className="flex">
                  Tap on the{" "}
                  <span className="bg-qr-scan-icon h-6 w-6 mx-0.5"></span>{" "}
                  center icon
                </div>{" "}
                <div>in bottom navigation</div>
              </div>
            </p>
            <p className="flex mt-4 text-secondary-text font-normal text-base">
              <div className="mr-2 h-6 min-w-[24px] w-6 rounded-full bg-primary-blue text-white flex justify-center items-center font-semibold text-xs">
                3
              </div>
              Tap on the scan QR code button
            </p>
            <p className="flex mt-4 text-secondary-text font-normal text-base">
              <div className="mr-2 h-6 min-w-[24px] w-6 rounded-full bg-primary-blue text-white flex justify-center items-center font-semibold text-xs">
                4
              </div>
              Point your phone camera towards the QR code
            </p>
            <div className="mt-6 flex items-center">
              <input
                type="checkbox"
                className="border border-primary-blue h-4 w-4"
              />
              <label className="text-primary-gray text-base font-normal ml-2">
                Keep me signed in
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center mt-10 md:mt-0 md:w-1/2">
            <button
              className="bg-primary-blue p-6  py-3 outline-none rounded-lg text-white"
              onClick={() => go()}
            >
              {ButtonMsg}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
