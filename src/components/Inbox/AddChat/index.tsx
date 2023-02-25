import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import ChatIcon from "@public/Icons/chatIcon.svg";
import Image from "next/image";
import DiscordIcon from "@public/Icons/discordFilterIcon.svg";
import TwitterIcon from "@public/Icons/twitterFilterIcon.svg";
import TwiloIcon from "@public/Icons/twiloFilterIcon.svg";
import XRPIcon from "@public/Icons/xrpFilterIcon.svg";

const AddChat = (props: { openNewChatModal: boolean }) => {
    const { openNewChatModal} = props;
  return (
    <div className=" absolute right-8 bottom-8">
      <Popover className="">
        {({ open  }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <div className="w-12 lg:w-16 h-12 lg:h-16 bg-primary-blue rounded-full  flex justify-center items-center">
                <Image src={ChatIcon} alt="" />
              </div>
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
              <Popover.Panel className="absolute -right-4 -bottom-4 z-10  ">
                <div className=" bg-white w-[208px] h-[216px] border p-4 rounded-lg ">
                  <div className="text-base font-semibold mb-4">
                    Choose Platform
                  </div>
                  <div className=" mb-4 flex items-center gap-2">
                    <span>
                      <Image src={DiscordIcon} alt="" />
                    </span>
                    <div className=" text-xs font-normal">Discord</div>
                  </div>
                  <div className=" mb-4 flex items-center gap-2">
                    <span>
                      <Image src={TwitterIcon} alt="" />
                    </span>
                    <div className=" text-xs font-normal">Twitter</div>
                  </div>
                  <div className=" mb-4 flex items-center gap-2">
                    <span>
                      <Image src={TwiloIcon} alt="" />
                    </span>
                    <div className=" text-xs font-normal">Twilio</div>
                  </div>
                  <div className=" mb-4 flex items-center gap-2">
                    <span>
                      <Image src={XRPIcon} alt="" />
                    </span>
                    <div className=" text-xs font-normal">XRP</div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default AddChat;
