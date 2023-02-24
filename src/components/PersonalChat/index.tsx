import Image, { StaticImageData } from "next/image";
import React, { useEffect, useRef, useState } from "react";
import MicImage from "@public/Images/mic.jpg";
import SearchImage from "@public/Images/search.jpg";
import ThreeDotImage from "@public/Images/3dot.jpg";

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

const PersonalChat = (props: IPersonalProps) => {
  const [InputValue, setInputValue] = useState("");
  const [sampleMsgs, setSampleMsgs] = useState([
    {
      sender: "test",
      msg: "Lorem ipsum dolor sit amet.",
      time: '2023-02-23T11:07:56.697Z',
    },
    {
      sender: "test",
      msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius nisi faucibus odio placerat pretium.",
      time: '2023-02-23T11:37:56.697Z',
    },
    {
      sender: "me",
      msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: '2023-02-23T13:09:56.697Z',
    },
    {
      sender: "test",
      msg: "Lorem ipsum dolor sit amet,. Maecenas varius nisi faucibus odio placerat pretium.",
      time:'2023-02-23T13:46:37.761Z',
    },
    {
      sender: "me",
      msg: "Maecenas varius nisi faucibus odio placerat pretium.",
      time: '2023-02-23T13:07:56.697Z',
    },
    {
      sender: "test",
      msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius nisi faucibus odio placerat pretium.",
      time: '2023-02-23T13:17:56.697Z',
    },
    {
      sender: "me",
      msg: "Consectetur adipiscing elit. Maecenas varius nisi faucibus odio placerat pretium.",
      time: '2023-02-23T13:32:56.697Z',
    },
    {
      sender: "me",
      msg: "Lorem ipsum dolor sit amet. Maecenas varius nisi faucibus odio placerat pretium.",
      time: '2023-02-23T13:37:56.697Z',
    },
  ]);

  const bottomRef = useRef(null);
  const noRef = useRef(null)

  const scrollToBottom = () => {
    // bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: 'nearest' });
  };

  const onAction = (event: any) => {
    if (event.key === "Enter") {
      let arr = sampleMsgs;
      arr.push({ sender: "me", msg: InputValue, time: new Date().toISOString() });
      setSampleMsgs(arr);
      setInputValue("");
    }
  };

  function formatAMPM(date: any) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  useEffect(() => {
    scrollToBottom();
  }, [sampleMsgs]);

  return (
    <div className="flex flex-col justify-between w-full min-h-screen">
      <div className="border h-16 lg:h-20 w-full flex justify-between px-6">
        <div className="flex items-center">
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
        <div className="flex items-center">
          <Image alt="mic" src={SearchImage} />
          <Image alt="mic" src={ThreeDotImage} className="ml-2" />
        </div>
      </div>
      <div className="flex flex-col px-6 overflow-y-auto" id="chatBox">
        {sampleMsgs.sort((msg1, msg2) => new Date(msg1.time).getTime() - new Date(msg2.time).getTime())
          .map((msg, index) => {
            const isMe = msg.sender === "me";
            return (
              <div
                key={index}
                className={`p-4 w-2/3 ${
                  isMe
                    ? "self-end rounded-br-none text-white bg-primary-blue"
                    : "self-start rounded-bl-none text-black bg-gray-bg"
                } my-2 rounded-lg`}
                ref={index === sampleMsgs.length - 1 ? bottomRef : noRef}
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
      <div className="border h-16 lg:h-20 w-full flex justify-between items-center px-6">
        <input
          placeholder="Type a message"
          className="outline-none w-full font-normal text-sm"
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
