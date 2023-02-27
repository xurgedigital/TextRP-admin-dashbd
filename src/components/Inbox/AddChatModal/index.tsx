import React, { Fragment, useState } from "react";
import Image from "next/image";
import DiscordIcon from "@public/Icons/discordFilterIcon.svg";
import TwitterIcon from "@public/Icons/twitterFilterIcon.svg";
import TwiloIcon from "@public/Icons/twiloFilterIcon.svg";
import XRPIcon from "@public/Icons/xrpFilterIcon.svg";
import LeftArrorwIcon from "@public/Icons/leftArrowIcon.svg";
import SearchIcon from "@public/Icons/searchIcon.svg";
import GroupIcon from "@public/Icons/groupIcon.svg";
import UserImage from "@public/Images/userImage.png";
import { Transition } from "@headlessui/react";

const platformData = [
  {
    icon: DiscordIcon,
    title: "Discord",
  },
  {
    icon: TwitterIcon,
    title: "Twitter",
  },
  {
    icon: TwiloIcon,
    title: "Twilio",
  },
  {
    icon: XRPIcon,
    title: "XRP",
  },
];
interface Iprops {
  openNewChatModal: boolean;
  setOpenNewChatModal: (value: boolean) => void;
}
const AddChatModal = (props: Iprops) => {
  const [isMount, setMount] = useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedPlatform, setSelectedPlatform] = React.useState("");

  React.useEffect(() => {
    if (isMount) {
      setMount(false);
    }
  }, []);

  const ref = React.useRef<any>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current?.contains(event.target)) {
      props.setOpenNewChatModal(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <>
      {currentIndex == 0 && (
        <div className="absolute z-10 h-full w-full top-0 right-0 blurBG  ">
          <div
            ref={ref}
            className={`absolute z-50 bottom-0 left-0 w-full border-[#ACB1C1] border-0.5 p-6 newChatMobile bg-white opacity-100 transition duration-300 ${
              isMount ? "translate-y-full" : "translate-y-0"
            } `}
          >
            <div className="text-base font-semibold mb-4">Choose Platform</div>
            {platformData.map((platform, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedPlatform(platform.title);
                    setCurrentIndex(1);
                  }}
                  key={index}
                  className=" mb-4 flex items-center gap-4"
                >
                  <span className="w-8 h-8 relative">
                    <Image fill src={platform.icon} alt="" />
                  </span>
                  <div className=" text-xs font-normal">{platform.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Transition
        as={Fragment}
        show={currentIndex == 1}
        enter="transition ease-out duration-300"
        enterFrom=" translate-x-full"
        enterTo=" translate-x-0"
        leave="transition ease-in duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className=" absolute z-10 h-screen w-full top-0 right-0 bg-white max-h-screen ">
          <div className="flex justify-between items-center bg-[#F8FAFD] px-5 py-2 ">
            <div className="flex items-center gap-5">
              <span onClick={() => props.setOpenNewChatModal(false)}>
                <Image width={20} src={LeftArrorwIcon} alt="" />
              </span>
              <div>
                <div className=" text-lg font-semibold">New chat</div>
                <div className=" text-[#606885] text-xs font-normal">
                  648 contacts
                </div>
              </div>
            </div>
            <Image width={20} src={SearchIcon} alt="" />
          </div>
          {selectedPlatform == "Twilio" && (
            <div className="flex gap-2 items-center p-4">
              <span>
                <Image height={40} width={40} src={GroupIcon} alt="" />
              </span>
              <span className=" text-base font-semibold ">New group</span>
            </div>
          )}
            <div className=" pt-4 px-4 h-[calc(100vh-60px)] overflow-y-auto ">
              <div className=" text-sm text-secondary-text mb-4">
                All Contacts
              </div>
              <div className="flex items-center gap-3 mb-4 cursor-pointer ">
                <span>
                  <Image height={40} width={40} src={UserImage} alt="" />
                </span>
                <div className="text-base font-semibold ">Leslie Alexander</div>
              </div>
              <div className="flex items-center gap-3 mb-4 cursor-pointer ">
                <span>
                  <Image height={40} width={40} src={UserImage} alt="" />
                </span>
                <div className="text-base font-semibold ">Leslie Alexander</div>
              </div>
              <div className="flex items-center gap-3 mb-4 cursor-pointer ">
                <span>
                  <Image height={40} width={40} src={UserImage} alt="" />
                </span>
                <div className="text-base font-semibold ">Leslie Alexander</div>
              </div>
              <div className="flex items-center gap-3 mb-4 cursor-pointer ">
                <span>
                  <Image height={40} width={40} src={UserImage} alt="" />
                </span>
                <div className="text-base font-semibold ">Leslie Alexander</div>
              </div>
              <div className="flex items-center gap-3 mb-4 cursor-pointer ">
                <span>
                  <Image height={40} width={40} src={UserImage} alt="" />
                </span>
                <div className="text-base font-semibold ">Leslie Alexander</div>
              </div>
              <div className="flex items-center gap-3 mb-4 cursor-pointer ">
                <span>
                  <Image height={40} width={40} src={UserImage} alt="" />
                </span>
                <div className="text-base font-semibold ">Leslie Alexander</div>
              </div>
              <div className="flex items-center gap-3 mb-4 cursor-pointer ">
                <span>
                  <Image height={40} width={40} src={UserImage} alt="" />
                </span>
                <div className="text-base font-semibold ">Leslie Alexander</div>
              </div>
              <div className="flex items-center gap-3 mb-4 cursor-pointer ">
                <span>
                  <Image height={40} width={40} src={UserImage} alt="" />
                </span>
                <div className="text-base font-semibold ">Leslie Last</div>
              </div>
              <div className="flex items-center gap-3 mb-4 cursor-pointer ">
                <span>
                  <Image height={40} width={40} src={UserImage} alt="" />
                </span>
                <div className="text-base font-semibold ">Leslie Last</div>
              </div>
              <div className="flex items-center gap-3 mb-4 cursor-pointer ">
                <span>
                  <Image height={40} width={40} src={UserImage} alt="" />
                </span>
                <div className="text-base font-semibold ">Leslie Last</div>
              </div>
              <div className="flex items-center gap-3 mb-4 cursor-pointer ">
                <span>
                  <Image height={40} width={40} src={UserImage} alt="" />
                </span>
                <div className="text-base font-semibold ">Leslie Last222</div>
              </div>
            </div>
          </div>
      </Transition>
    </>
  );
};

export default AddChatModal;
