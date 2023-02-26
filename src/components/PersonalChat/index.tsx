import Image, { StaticImageData } from "next/image";
import React, { useEffect, useRef, useState } from "react";
import MicImage from "@public/Images/mic.jpg";
import ThreeDotedIcon from "@public/Icons/threedotedIcon.svg";
import LeftArrorwIcon from "@public/Icons/leftArrowIcon.svg";
import SearchIcon from "@public/Icons/searchIcon.svg";

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
  setChatSelected: Function;
}

const PersonalChat = (props: IPersonalProps) => {
  const [InputValue, setInputValue] = useState("");

  const [sampleMsgs, setSampleMsgs] = useState([
    {
      sender: "test",
      msg: "Lorem ipsum dolor sit amet.",
      time: "2023-02-23T11:07:56.697Z",
    },
    {
      sender: "test",
      msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius nisi faucibus odio placerat pretium.",
      time: "2023-02-23T11:37:56.697Z",
    },
    {
      sender: "me",
      msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "2023-02-23T13:09:56.697Z",
    },
    {
      sender: "test",
      msg: "Lorem ipsum dolor sit amet,. Maecenas varius nisi faucibus odio placerat pretium.",
      time: "2023-02-23T13:46:37.761Z",
    },
    {
      sender: "me",
      msg: "Maecenas varius nisi faucibus odio placerat pretium.",
      time: "2023-02-23T13:07:56.697Z",
    },
    {
      sender: "test",
      msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius nisi faucibus odio placerat pretium.",
      time: "2023-02-23T13:17:56.697Z",
    },
    {
      sender: "me",
      msg: "Consectetur adipiscing elit. Maecenas varius nisi faucibus odio placerat pretium.",
      time: "2023-02-23T13:32:56.697Z",
    },
    {
      sender: "me",
      msg: "Lorem ipsum dolor sit amet. Maecenas varius nisi faucibus odio placerat pretium.",
      time: "2023-02-23T13:37:56.697Z",
    },
  ]);

  const [messageCount, setMessageCount] = useState(sampleMsgs.length);

  const ref = React.useRef<any>();
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messageCount]);

  const onAction = (event: any) => {
    if (event.key === "Enter" && InputValue) {
      let arr = sampleMsgs;
      arr.push({
        sender: "me",
        msg: InputValue,
        time: new Date().toISOString(),
      });
      setSampleMsgs(arr);
      setInputValue("");
      setMessageCount((prev) => prev + 1);
    }
  };

  function formatAMPM(date: any) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }


  return (
    <div className="flex flex-col justify-between w-full min-h-screen max-h-screen relative py-16 md:py-20">
      <div className=" absolute top-0 right-0 border h-16 lg:h-20 w-full flex justify-between items-center px-6 bg-[#F8FAFD] ">
        <div className="flex items-center">
          <span
            onClick={() => props.setChatSelected(null)}
            className="h-[17px] mr-3 cursor-pointer md:hidden"
          >
            <Image src={LeftArrorwIcon} alt="" />
          </span>
          <Image
            src={props?.ChatSelected?.userImage}
            alt="user"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="ml-2">
            <h4 className="text-lg font-semibold">
              {props?.ChatSelected?.userName}
            </h4>
            <div className="flex items-center">
              <div className="bg-primary-green h-2 w-2 rounded-full mr-2"></div>
              <p className="text-sm font-normal text-secondary-text">Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-7">
          <Image height={20} width={20} alt="mic" src={SearchIcon} />
          <Image alt="mic" src={ThreeDotedIcon} className="mr-5" />
        </div>
      </div>
      <div
      ref={ref}
        className="flex-1 flex flex-col px-6 overflow-y-auto pb-4"
        id="chatBox"
      >
        {sampleMsgs
          .sort(
            (msg1, msg2) =>
              new Date(msg1.time).getTime() - new Date(msg2.time).getTime()
          )
          .map((msg, index) => {
            const isMe = msg.sender === "me";
            return (
              <div
                key={index}
                className={`p-4 max-w-[60%] ${
                  isMe
                    ? "self-end rounded-br-none text-white bg-primary-blue"
                    : "self-start rounded-bl-none text-black bg-gray-bg"
                } my-2 rounded-lg`}
              >
                <div> {msg?.msg}</div>
                <div
                  className={`font-normal text-xs ${
                    isMe ? "text-[#E6FFFFFF]" : "text-secondary-text"
                  } flex w-full justify-end`}
                >
                  {formatAMPM(new Date(msg?.time))}
                </div>
              </div>
            );
          })}
      </div>
      <div className=" absolute bottom-0 right-0 border h-16 lg:h-20 w-full flex justify-between items-center px-6">
        <input
          placeholder="Type a message"
          className="outline-none w-full font-normal text-sm h-full"
          onChange={(e) => setInputValue(e.target.value)}
          value={InputValue}
          onKeyDown={onAction}
        />
        <Image alt="mic" src={MicImage} />
      </div>
    </div>
  );
};

export default PersonalChat;
