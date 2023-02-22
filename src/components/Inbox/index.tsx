import Image, { StaticImageData } from "next/image";
import React from "react";
import FilterIcon from "@public/Icons/filterIcon.svg";
import SearchIcon from "@public/Icons/searchIcon.svg";
import TwitterIcon from "@public/Icons/twitterChatIcon.svg";
import UserImage from "@public/Images/userImage.png";
import ChatImage from "@public/Images/chatImg.png";

const dummyData: IInboxChatProps[] = [
  {
    userImage: UserImage,
    platformIcon: TwitterIcon,
    userName: "Leslie Alexander",
    lastChat: "Lorem ipsum dolor sit amet, consec...",
    time: "11:21 pm",
    unseenMessageCount: 2,
  },
  {
    userImage: UserImage,
    platformIcon: TwitterIcon,
    userName: "Leslie Alexander",
    lastChat: "Lorem ipsum dolor sit amet, consec...",
    time: "11:21 pm",
    unseenMessageCount: 0,
  },
  {
    userImage: UserImage,
    platformIcon: TwitterIcon,
    userName: "Leslie Alexander",
    lastChat: "Lorem ipsum dolor sit amet, consec...",
    time: "11:21 pm",
    unseenMessageCount: 100,
  },
  {
    userImage: UserImage,
    platformIcon: TwitterIcon,
    userName: "Leslie Alexander",
    lastChat: "Lorem ipsum dolor sit amet, consec...",
    time: "11:21 pm",
    unseenMessageCount: 2,
  },
  {
    userImage: UserImage,
    platformIcon: TwitterIcon,
    userName: "Leslie Alexander",
    lastChat: "Lorem ipsum dolor sit amet, consec...",
    time: "11:21 pm",
    unseenMessageCount: 2,
  },
  {
    userImage: UserImage,
    platformIcon: TwitterIcon,
    userName: "Leslie Alexander",
    lastChat: "Lorem ipsum dolor sit amet, consec...",
    time: "11:21 pm",
    unseenMessageCount: 2,
  },
];

interface IInboxChatProps {
  userImage: StaticImageData;
  platformIcon: StaticImageData;
  userName: string;
  lastChat: string;
  time: string;
  unseenMessageCount: number;
}

const InboxCompChat = (props: IInboxChatProps) => {
  const {
    userImage,
    userName,
    lastChat,
    time,
    platformIcon,
    unseenMessageCount,
  } = props;

  return (
    <div className="flex mb-7 items-center">
      <div className="rounded-full h-12 w-12 relative min-w-[48px] ">
        <Image src={userImage} alt="Filter Icon" fill />
        <div className=" rounded-full h-4 w-4 absolute right-0 bottom-0 ">
          <Image src={platformIcon} fill alt="Filter Icon" />
        </div>
      </div>
      <div className="ml-3 w-full">
        <div className="text-base text-primary-text font-semibold ">
          {userName}
        </div>
        <div className=" text-xs text-secondary-text font-normal">
          {lastChat}
        </div>
      </div>
      <div className=" min-w-max text-end">
        {unseenMessageCount > 0 && (
          <div className=" inline-flex justify-center items-center rounded-[50px] bg-primary-blue text-white min-w-[20px] h-5 min-h-[20px] text-xs px-1.5 ">
            {unseenMessageCount}
          </div>
        )}
        <div className=" text-xs text-secondary-text font-normal mt-1">
          {time}
        </div>
      </div>
    </div>
  );
};

const InboxComp = () => {
  return (
    <div className="md:flex-[0.25] lg:flex-[0.2] min-h-screen bg-gray-bg px-8 py-6">
      <div className="flex justify-between items-center mb-5">
        <div className=" text-primary-text font-semibold text-3xl">Chats</div>
        <div className="flex items-center gap-5">
          <span>
            <Image src={FilterIcon} width={18} height={16} alt="Filter Icon" />
          </span>
          <span className=" overflow-hidden rounded-full h-8 w-8 ">
            <Image src={UserImage} width={32} height={32} alt="Filter Icon" />
          </span>
        </div>
      </div>
      <div className="flex border border-[#ACB1C1] rounded-lg h-12 items-center overflow-hidden bg-white ">
        <span className="mr-2.5 ml-5">
          <Image src={SearchIcon} width={16} height={16} alt="Filter Icon" />
        </span>
        <input
          type="text"
          className=" border-none outline-none h-full w-full bg-transparent text-sm text-secondary-text "
        />
      </div>
      <div className="mt-8">
        {dummyData.map((data, index) => {
          return <InboxCompChat key={index} {...data} />;
        })}
      </div>
    </div>
  );
};

export default InboxComp;
