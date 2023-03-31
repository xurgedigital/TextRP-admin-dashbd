import Image, { StaticImageData } from 'next/image'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import FilterIcon from '@public/Icons/filterIcon.svg'
import SearchIcon from '@public/Icons/searchIcon.svg'
import TwitterIcon from '@public/Icons/twitterChatIcon.svg'
import TwilioIcon from '@public/Icons/twiloFilterIcon.svg'
import DiscordIcon from '@public/Icons/discordIcon.svg'
import ChatIcon from '@public/Icons/chatIcon.svg'
import UserImage from '@public/Images/userImage.png'
import DummyUserImage from '@public/Images/dummyUser.jpg'
import DummyUser2Image from '@public/Images/dummyUser2.jpg'
import Link from 'next/link'
import MobileFilter from './MobileFilter'
import AddChat from './AddChat'
import AddChatModal from './AddChatModal'
import useWidth from '@/hooks/useWidth'
import FilterModal from './FilterModal'
import ThemeChanger from '../ThemeChanger'
import { Context } from '@/pages/_app'
import { useTwilio } from 'twilio-conversations-hooks'
import { Conversation } from '@twilio/conversations/lib'
import moment from 'moment'

const dummyData: IInboxChatProps[] = [
  {
    userImage: `https://picsum.photos/2031`,
    userName: 'Admin',
    lastChat: 'Lorem ipsum dolor sit amet, consec...',
    time: '11:21 pm',
    unseenMessageCount: 2,
  },
  {
    userImage: `https://picsum.photos/201`,
    platformIcon: TwitterIcon,
    userName: 'Leslie Alexander',
    lastChat: 'Lorem ipsum dolor sit amet, consec...',
    time: '11:21 pm',
    unseenMessageCount: 2,
  },
  {
    userImage: `https://picsum.photos/202`,
    platformIcon: DiscordIcon,
    userName: 'Amit Sebastian',
    lastChat: 'Lorem ipsum dolor sit amet, consec...',
    time: '11:21 pm',
    unseenMessageCount: 1,
  },
  {
    userImage: `https://picsum.photos/203`,
    platformIcon: TwitterIcon,
    userName: 'Sigfrido Sarala',
    lastChat: 'Lorem ipsum dolor sit amet, consec...',
    time: '11:21 pm',
    unseenMessageCount: 0,
  },
  {
    userImage: `https://picsum.photos/204`,
    platformIcon: DiscordIcon,
    userName: 'Levi Kain',
    lastChat: 'Lorem ipsum dolor sit amet, consec...',
    time: '11:21 pm',
    unseenMessageCount: 0,
  },
  {
    userImage: `https://picsum.photos/205`,
    platformIcon: TwitterIcon,
    userName: 'Apollon Salome',
    lastChat: 'Lorem ipsum dolor sit amet, consec...',
    time: '11:21 pm',
    unseenMessageCount: 0,
  },
  {
    userImage: `https://picsum.photos/206`,
    platformIcon: DiscordIcon,
    userName: 'Bernarda Uta',
    lastChat: 'Lorem ipsum dolor sit amet, consec...',
    time: '11:21 pm',
    unseenMessageCount: 0,
  },
  {
    userImage: `https://picsum.photos/207`,
    platformIcon: TwitterIcon,
    userName: 'Zoran Prabhu',
    lastChat: 'Lorem ipsum dolor sit amet, consec...',
    time: '11:21 pm',
    unseenMessageCount: 0,
  },
  {
    userImage: `https://picsum.photos/208`,
    platformIcon: DiscordIcon,
    userName: 'Jedidah Raisa',
    lastChat: 'Lorem ipsum dolor sit amet, consec...',
    time: '11:21 pm',
    unseenMessageCount: 0,
  },
]

interface IInboxChatProps {
  userImage: string
  platformIcon?: StaticImageData
  userName: string
  lastChat: string
  time: string
  unseenMessageCount: number
}

interface IInboxChatCompProps {
  conversation: Conversation
  platformIcon?: StaticImageData
  handleSelectChat: Function
  ChatSelected?: Conversation
}

const InboxCompChat = (props: IInboxChatCompProps) => {
  const { conversation, platformIcon, handleSelectChat, ChatSelected } = props

  const { state } = useContext(Context)
  const [unseenMessageCount, setUnreadMessagesCount] = useState<number>(0)
  useEffect(() => {
    conversation.getUnreadMessagesCount().then((count) => setUnreadMessagesCount(count || 0))
  }, [])
  const participantsAddress = useMemo(() => {
    const users = conversation.uniqueName.split('-')
    if (users[0] === state?.user?.address) {
      return users[1]
    }
    return users[0]
  }, [conversation.uniqueName, state?.user?.address])
  return (
    <div
      className={` flex py-3.5 items-center justify-between cursor-pointer px-4 lg:px-8 overflow-hidden ${
        ChatSelected?.uniqueName == conversation.uniqueName
          ? 'bg-white dark:bg-gray-bg2-dark/40'
          : ''
      } `}
      onClick={() => handleSelectChat(conversation)}
    >
      <div className="flex">
        <div className="relative">
          <div className="rounded-full h-12 w-12 relative min-w-[40px] lg:min-w-[48px] overflow-hidden ">
            <Image
              src={`https://xumm.app/avatar/${participantsAddress}.png`}
              alt="User Image"
              fill
              className=" object-cover"
              quality={100}
            />
          </div>
          {platformIcon && (
            <div className=" rounded-full h-4 w-4 absolute right-0 bottom-0 ">
              <Image src={platformIcon} fill alt="Filter Icon" />
            </div>
          )}
        </div>
        <div className="ml-3 grid ">
          <span className="text-base font-semibold truncate ">{participantsAddress}</span>
          <div className=" text-xs text-secondary-text dark:text-secondary-text-dark  font-normal max-w-[75%] truncate  ">
            {conversation?.lastMessage?.index}
          </div>
        </div>
      </div>
      <div className=" min-w-max text-end">
        {unseenMessageCount > 0 && (
          <div className=" inline-flex justify-center items-center rounded-[50px] bg-primary-blue text-white min-w-[20px] h-5 min-h-[20px] text-xs px-1.5 ">
            {unseenMessageCount}
          </div>
        )}
        <div className=" text-xs text-secondary-text dark:text-secondary-text-dark  font-normal mt-1">
          {moment(conversation?.lastMessage?.dateCreated).format('D/M/Y')}
        </div>
      </div>
    </div>
  )
}

interface IInboxCompProps {
  setChatSelected: Function
  ChatSelected?: Conversation
}

const InboxComp = (props: IInboxCompProps) => {
  const [filter, setFilter] = useState<string>('All Chats')
  const [openNewChatModal, setOpenNewChatModal] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [mounted, setMounted] = useState(false)
  const { conversations } = useTwilio()

  const { state } = useContext(Context)
  const currentUser = state?.user?.address
  useEffect(() => {
    setMounted(true)
  }, [])

  const width = useWidth()

  const handleSelectChat = (name: string) => {
    props?.setChatSelected(name)
  }

  console.log('conversations', conversations)

  return (
    <>
      <div className=" border-r dark:border-secondary-text-dark flex-1 md:flex-[0.35] xl:flex-[0.25] flex flex-col 3xl:flex-[0.2] min-h-screen max-h-screen md:bg-gray-bg dark:bg-gray-bg-dark pt-6 relative overflow-hidden">
        <div className="px-4 lg:px-8">
          <div className=" hidden md:flex justify-between items-center mb-5">
            <div className="font-semibold text-3xl">Chats</div>
            <div className="flex items-center gap-5">
              {mounted && <ThemeChanger />}
              <FilterModal />
              <Link href={'/setting'}>
                <span className=" overflow-hidden rounded-full h-8 w-8 ">
                  <Image
                    src={`https://xumm.app/avatar/${currentUser}.png`}
                    width={32}
                    height={32}
                    alt="Filter Icon"
                  />
                </span>
              </Link>
            </div>
          </div>
          <div className="flex items-center border border-primary-gray dark:border-secondary-text-dark rounded-lg h-12  overflow-hidden bg-gray-bg dark:bg-gray-bg2-dark md:bg-white ">
            <span className=" min-w-fit mr-2.5 ml-5">
              <Image src={SearchIcon} width={16} height={16} alt="Filter Icon" />
            </span>
            <input
              type="text"
              className=" border-none outline-none h-full w-full bg-transparent text-secondary-text dark:text-secondary-text-dark text-base "
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <span className=" md:hidden min-w-fit mr-2 overflow-hidden rounded-full h-8 w-8 ">
              <Link href={'/setting'}>
                <Image
                  src={`https://xumm.app/avatar/${currentUser}.png`}
                  width={32}
                  height={32}
                  alt="Filter Icon"
                />
              </Link>
            </span>
          </div>
          <MobileFilter filter={filter} setFilter={setFilter} />
        </div>
        {!searchText ? (
          <div className="mt-2 md:mt-8 overflow-y-auto">
            {conversations.map((data, index) => {
              return (
                <InboxCompChat
                  key={index}
                  ChatSelected={props.ChatSelected}
                  handleSelectChat={handleSelectChat}
                  conversation={data}
                  platformIcon={TwilioIcon}
                />
              )
            })}
          </div>
        ) : (
          <div className="mt-2 md:mt-8 overflow-y-auto px-8">
            <div className=" text-base font-normal text-secondary-text dark:text-secondary-text-dark  mb-4 mt-6">
              Groups
            </div>
            <div className="flex items-center gap-3 mb-4 cursor-pointer ">
              <span>
                <Image height={40} width={40} src={UserImage} alt="" />
              </span>
              <div className="text-base font-semibold ">Leslie Last222</div>
            </div>
            <div className=" text-base font-normal text-secondary-text dark:text-secondary-text-dark mb-4 mt-6">
              Contacts
            </div>
            {Array.apply(null, Array(5)).map((contact, index) => {
              return (
                <div key={index} className="flex items-center gap-3 mb-4 cursor-pointer ">
                  <span>
                    <Image height={40} width={40} src={UserImage} alt="" />
                  </span>
                  <div className="text-base font-semibold ">Leslie Last222</div>
                </div>
              )
            })}
            <div className=" text-base font-normal text-secondary-text dark:text-secondary-text-dark mt-6 mb-4">
              Messages
            </div>
            {Array.apply(null, Array(2)).map((contact, index) => {
              return (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-base font-semibold ">Leslie Alexander</span>
                    <span className="text-xs font-normal text-secondary-text dark:text-secondary-text-dark">
                      11:21 pm
                    </span>
                  </div>
                  <p className="text-secondary-text text-xs font-normal">
                    Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                    amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, lorem ipsum dolor
                    sit amet. Lorem ipsum dolor sit...
                  </p>
                </div>
              )
            })}
          </div>
        )}
        {width >= 768 ? (
          <AddChat />
        ) : (
          <div
            onClick={() => setOpenNewChatModal(true)}
            className="w-12 h-12  bg-primary-blue rounded-full absolute bottom-4 right-4 flex justify-center items-center"
          >
            <Image height={20} width={20} src={ChatIcon} alt="" />
          </div>
        )}

        {openNewChatModal && width < 786 && (
          <AddChatModal
            openNewChatModal={openNewChatModal}
            setOpenNewChatModal={setOpenNewChatModal}
          />
        )}
      </div>
    </>
  )
}

export default InboxComp
