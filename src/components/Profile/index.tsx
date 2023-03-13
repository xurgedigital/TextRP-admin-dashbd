import React from 'react'
import Image, { StaticImageData } from 'next/image'
import ArrowLeft from '@public/Icons/setting/arrow.svg'
import Twitter from '@public/Icons/twitter.svg'
import Discord from '@public/Icons/discord.svg'
import Xrp from '@public/Icons/xrp.svg'
import Twilio from '@public/Icons/twilio.svg'

import UserProfile from '@public/Icons/profile/profile.svg'
import About from '@public/Icons/profile/about.svg'
import Wallet from '@public/Icons/profile/wallet.svg'
import Username from '@public/Icons/profile/username.svg'
import Camera from '@public/Icons/profile/camera.svg'

import { useRouter } from 'next/router'
import TwitterIcon from '@public/Icons/twitterChatIcon.svg'
import { MdEdit } from 'react-icons/md'

interface ILinkCardProps {
  icon: StaticImageData
  title: string
  isEditable?: boolean
  value?: string
}

const LinkItems = [
  {
    title: 'Full Name',
    value: 'Alex',
    icon: UserProfile,
    isEditable: true,
  },
  {
    title: 'TextRP Username',
    value: '@alex134',
    icon: Username,
    isEditable: true,
  },
  {
    title: 'About',
    value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    icon: About,
    isEditable: true,
  },
  {
    title: 'Wallet Address',
    value: '0xCAdCbhvyuf667C441BEF69bDfFf67E0f71e8E',
    icon: Wallet,
  },

  {
    title: 'Twitter',
    icon: Twitter,
    value: '@alex134',
  },
  {
    title: 'Discord',
    icon: Discord,
    value: '@alex134',
  },
  {
    title: 'Twilio',
    icon: Twilio,
    value: '@alex134',
  },
  {
    title: 'Xrp Wallet',
    icon: Xrp,
    value: '@alex134',
  },
]

const Profile = () => {
  const router = useRouter()
  const [isMount, setMount] = React.useState(true)

  React.useEffect(() => {
    if (isMount) {
      setMount(false)
    }
  }, [])

  const EditCard = (props: ILinkCardProps) => {
    const { icon, title, isEditable, value } = props
    return (
      <div className="flex items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-4">
          <Image src={icon} alt={title} quality={100} className="h-4 w-4" />
          <div className="w-full">
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-secondary-text dark:text-secondary-text-dark font-normal">
              {value}
            </p>
          </div>
        </div>
        {isEditable ? (
          <div>
            <MdEdit className="text-secondary-text dark:text-secondary-text-dark cursor-pointer" />
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div
      className={`md:transform-none settingPanel ${
        isMount ? 'translate-x-full' : 'translate-x-0'
      } min-h-screen max-h-screen overflow-hidden transition duration-300   bg-white dark:bg-gray-bg-dark py-6   relative border-r-[0.5px]  border-primary-gray dark:border-secondary-text-dark`}
    >
      <div className="flex gap-5 items-center px-4 md:px-8">
        <Image
          src={ArrowLeft}
          alt="arrow-left"
          className="cursor-pointer"
          onClick={() => router.back()}
          quality={100}
        />
        <p className="text-2xl font-semibold">Edit Profile</p>
      </div>
      <div className="overflow-y-auto h-full px-4 md:px-8">
        <div className="relative w-full flex justify-center my-8">
          <div className="rounded-full h-28 w-28 relative min-w-[6rem] overflow-hidden ">
            <Image
              src={`https://picsum.photos/204`}
              alt="User Image"
              fill
              className=" object-cover"
              quality={100}
            />
          </div>
          <div className=" rounded-full h-7 w-7 cursor-pointer absolute right-[40%] md:right-[30%] bottom-0">
            <Image src={Camera} alt="Filter Icon" />
          </div>
        </div>
        <div className="flex flex-col gap-8 my-8 w-full ">
          {LinkItems.map((li, i) => (
            <EditCard {...li} key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
