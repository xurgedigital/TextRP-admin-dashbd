import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import ChatIcon from '@public/Icons/chatIcon.svg'
import Image from 'next/image'
import DiscordIcon from '@public/Icons/discordFilterIcon.svg'
import TwitterIcon from '@public/Icons/twitterFilterIcon.svg'
import TwiloIcon from '@public/Icons/twiloFilterIcon.svg'
import XRPIcon from '@public/Icons/xrpFilterIcon.svg'
import GroupIcon from '@public/Icons/groupIcon.svg'
import UserImage from '@public/Images/userImage.png'

const platformData = [
  {
    icon: DiscordIcon,
    title: 'Discord',
  },
  {
    icon: TwitterIcon,
    title: 'Twitter',
  },
  {
    icon: TwiloIcon,
    title: 'Twilio',
  },
  {
    icon: XRPIcon,
    title: 'XRP',
  },
]

const AddChat = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [platform, setPlatform] = React.useState('')
  return (
    <div className=" absolute right-8 bottom-8">
      <Popover className="">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md text-base font-medium text-white outline-none `}
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
                {currentIndex == 0 && (
                  <div className=" bg-white dark:bg-gray-bg2-dark w-[208px]  border dark:border-secondary-text-dark p-4 rounded-lg ">
                    <div className="text-base font-semibold mb-4">Choose Platform</div>
                    {platformData.map((item, index) => {
                      return (
                        <div
                          onClick={() => {
                            setCurrentIndex(1)
                            setPlatform(item.title)
                          }}
                          key={index}
                          className=" mb-4 flex items-center gap-2 cursor-pointer "
                        >
                          <span>
                            <Image src={item.icon} alt="" />
                          </span>
                          <div className=" text-xs font-normal">{item.title}</div>
                        </div>
                      )
                    })}
                  </div>
                )}
                {currentIndex == 1 && (
                  <div className=" bg-white dark:bg-gray-bg2-dark w-[208px] border dark:border-secondary-text-dark p-4 rounded-lg ">
                    <input
                      type="text"
                      placeholder="Search"
                      className=" bg-gray-bg dark:bg-gray-bg-dark h-6 rounded text-xs px-2 w-full outline-none mb-4"
                    />
                    {platform == 'Twilio' && (
                      <div className="flex gap-2 items-center mb-4">
                        <span>
                          <Image height={24} width={24} src={GroupIcon} alt="" />
                        </span>
                        <span className=" text-xs font-normal ">New group</span>
                      </div>
                    )}
                    <div className=" text-[10px] font-normal mb-2">All contacts</div>
                    <div className="flex items-center gap-2 mb-2 cursor-pointer ">
                      <span>
                        <Image height={24} width={24} src={UserImage} alt="" />
                      </span>
                      <div className="text-xs font-normal">Leslie Alexander</div>
                    </div>
                    <div className="flex items-center gap-2 mb-2 cursor-pointer ">
                      <span>
                        <Image height={24} width={24} src={UserImage} alt="" />
                      </span>
                      <div className="text-xs font-normal">Leslie Alexander</div>
                    </div>
                    <div className="flex items-center gap-2 mb-2 cursor-pointer ">
                      <span>
                        <Image height={24} width={24} src={UserImage} alt="" />
                      </span>
                      <div className="text-xs font-normal">Leslie Alexander</div>
                    </div>
                    <div className="flex items-center gap-2 mb-2 cursor-pointer ">
                      <span>
                        <Image height={24} width={24} src={UserImage} alt="" />
                      </span>
                      <div className="text-xs font-normal">Leslie Alexander</div>
                    </div>
                    <div className="flex items-center gap-2 mb-2 cursor-pointer ">
                      <span>
                        <Image height={24} width={24} src={UserImage} alt="" />
                      </span>
                      <div className="text-xs font-normal">Leslie Alexander</div>
                    </div>
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default AddChat
