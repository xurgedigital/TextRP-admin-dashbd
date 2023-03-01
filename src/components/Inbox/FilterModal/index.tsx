import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import FilterIcon from "@public/Icons/filterIcon.svg";
import CrossIcon from "@public/Icons/crossIcon.svg";
import DiscordIcon from "@public/Icons/discordFilterIcon.svg";
import TwitterIcon from "@public/Icons/twitterFilterIcon.svg";
import TwiloIcon from "@public/Icons/twiloFilterIcon.svg";
import XRPIcon from "@public/Icons/xrpFilterIcon.svg";
import Image from "next/image";

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

const FilterModal = () => {
  return (
    <div className="h-4">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md text-base font-medium text-white outline-none `}
            >
              <span>
                <Image
                  src={FilterIcon}
                  width={18}
                  height={16}
                  alt="Filter Icon"
                />
              </span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-10 w-[180px] lg:w-[208px] h-[264px] rounded-lg border-0.5 border-[#ACB1C1] bg-white p-4">
                <div className=" flex justify-between items-center mb-4 ">
                  <span className=" text-base font-semibold text-primary-text cursor-pointer ">
                    Filter Chats
                  </span>
                  <span className=" cursor-pointer " onClick={close}>
                    <Image src={CrossIcon} alt="" />
                  </span>
                </div>
                <div>
                  {platformData.map((platform, index) => {
                    return (
                      <div
                        key={index}
                        className=" mb-4 flex items-center "
                      >
                        <input className=" w-4 h-4" type={"checkbox"} />
                        <span className="w-6 h-6 relative ml-3 mr-2 ">
                          <Image fill src={platform.icon} alt="" />
                        </span>
                        <div className=" text-xs font-normal">
                          {platform.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button className="w-full py-2 flex justify-center items-center bg-primary-blue rounded text-white text-xs font-semibold ">
                  Apply
                </button>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default FilterModal;
