import Image from "next/image";
import React from "react";
import DefaultImage from "@public/Images/defaultChatImage.png"

const ChatSection = () => {
  return (
    <div className="flex md:flex-[0.75] lg:flex-[0.8] justify-center items-center">
      <div>
        <div className="relative h-[360px] w-[360px]">
            <Image src={DefaultImage} fill alt=""  />
        </div>
        <div className="text-center max-w-[420px]">
          <div className="text-3xl font-semibold mb-5">Keep your phone connected</div>
          <div className=" text-secondary-text text-lg font-normal">
            TextRP connects to your phone to sync messages. To reduce data usage
            connect your phone to Wi-Fi.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
