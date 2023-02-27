import Image from "next/image";
import React from "react";
import DefaultImage from "@public/Images/defaultChatImage.png";

const DummyChatSection = () => {
  const [isMount, setMount] = React.useState(true);

  React.useEffect(() => {
    if (isMount) {
      setMount(false);
    }
  }, []);

  return (
    <div
      className={` md:transform-none chatSection  flex md:flex-[0.65] xl:flex-[0.75] 3xl:flex-[0.8] justify-center items-center bg-white ${
        isMount ? "translate-x-full" : "translate-x-0"
      } transition duration-200 `}
    >
     <div>
          <div className="relative h-[360px] w-[360px]">
            <Image src={DefaultImage} fill alt="" />
          </div>
          <div className="text-center max-w-[420px]">
            <div className="text-3xl font-semibold mb-5">
              Keep your phone connected
            </div>
            <div className=" text-secondary-text text-lg font-normal">
              TextRP connects to your phone to sync messages. To reduce data
              usage connect your phone to Wi-Fi.
            </div>
          </div>
        </div>
    </div>
  );
};

export default DummyChatSection;
