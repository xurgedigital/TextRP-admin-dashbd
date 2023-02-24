import Image, { StaticImageData } from "next/image";
import React from "react";
import DefaultImage from "@public/Images/defaultChatImage.png";
import PersonalChat from "../PersonalChat";

interface IPersonalProps {
  ChatSelected: {
    userImage: string | any;
    platformIcon: StaticImageData;
    userName: string;
    lastChat: string;
    time: string;
    unseenMessageCount: number;
    handleSelectChat: Function;
  } | null;
}



const ChatSection = (props: IPersonalProps) => {
  return (
    <div className={` md:transform-none chatSection  flex md:flex-[0.7] lg:flex-[0.75] 3xl:flex-[0.8] justify-center items-center bg-white `}>
      {props.ChatSelected === null ? (
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
      ) : (
        <PersonalChat ChatSelected={props.ChatSelected} />
      )}
    </div>
  );
};

export default ChatSection;
