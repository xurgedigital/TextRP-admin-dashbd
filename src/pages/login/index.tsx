import { useSignIn } from "xumm-react";

const Login = () => {
  const { signIn, signInData: { xummPayload } = {} } = useSignIn();
  const qr = xummPayload?.refs?.qr_png;

  const fakeqr = "https://cdn.ttgtmedia.com/rms/misc/qr_code_barcode.jpg";

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
                  <span className="bg-qr-scan-icon h-6 w-6 mx-0.5"></span> center
                  icon
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
          <div className="flex items-center justify-center mt-10 md:mt-0">
          <img
            src={qr ?? fakeqr}
            style={{ width: 248, height: 248 }}
            alt="xumm-qr"
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
