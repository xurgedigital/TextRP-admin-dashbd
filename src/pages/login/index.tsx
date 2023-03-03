import { useState } from "react";
import useWebSocket from 'react-use-websocket';
import { useRouter } from 'next/router'

const Login = () => {
  const [ButtonMsg, setButtonMsg] = useState("Sign In");

  const router = useRouter()
  
  const static_payload = {
    data: {
      uuid: "0b6b861a-9aa5-4b5b-a6b3-e868a7d26f2f",
      next: {
        always: "https://xumm.app/sign/0b6b861a-9aa5-4b5b-a6b3-e868a7d26f2f",
      },
      refs: {
        qr_png:
          "https://xumm.app/sign/0b6b861a-9aa5-4b5b-a6b3-e868a7d26f2f_q.png",
        qr_matrix:
          "https://xumm.app/sign/0b6b861a-9aa5-4b5b-a6b3-e868a7d26f2f_q.json",
        qr_uri_quality_opts: ["m", "q", "h"],
        websocket_status:
          "wss://xumm.app/sign/0b6b861a-9aa5-4b5b-a6b3-e868a7d26f2f",
      },
      pushed: false,
    },
  };

  useWebSocket(static_payload?.data?.refs?.websocket_status, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    onMessage(event) {
      console.log(event, "enet")
    },
  });

  const handleSignIn = () => {
    let testData = {

    }
    let token = "gfhgjhjkl"
    localStorage.setItem("userData", JSON.stringify(testData))
    localStorage.setItem("token", token)
    router.push("/")
  }

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
                  Tap on the{" "}
                  <span className="bg-qr-scan-icon h-6 w-6 mx-0.5"></span>{" "}
                  center icon
                </div>{" "}
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
            <img src={static_payload.data.refs.qr_png} alt="qr" onClick={() => handleSignIn()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
