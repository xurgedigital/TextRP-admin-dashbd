import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
import { MdEdit } from 'react-icons/md'
import { IoCloseSharp } from 'react-icons/io5'
import Button from '../UI/Button'
import { swrFetcher } from '@/helpers'
import useSWR from 'swr'
import axios from 'axios'
import Loader from '../common/Loader'

interface ILinkCardProps {
  icon: StaticImageData
  title: string
  isEditable?: boolean
  value?: string
  setValue?: Dispatch<SetStateAction<string>>
}

const EditCard = (props: ILinkCardProps) => {
  const { icon, title, isEditable, value, setValue } = props
  const [showEdit, setShowEdit] = useState(false)

  const handleOnchange = (e: { target: { value: React.SetStateAction<string> } }) => {
    if (setValue !== undefined) {
      setValue(e.target.value)
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-4">
        <Image src={icon} alt={title} quality={100} className="h-4 w-4" />
        <div className="w-full">
          <p className="text-sm font-semibold">{title}</p>
          {showEdit && isEditable ? (
            <input
              placeholder={'Ex. xyz'}
              value={value}
              onChange={handleOnchange}
              className={`p-2 mt-2 text-sm w-full rounded-lg bg-gray-bg dark:bg-gray-bg2-dark outline-none border border-primary-gray dark:border-secondary-text-dark text-secondary-text dark:text-secondary-text-dark`}
            />
          ) : (
            <p className="text-xs text-secondary-text dark:text-secondary-text-dark font-normal">
              {value}
            </p>
          )}
        </div>
      </div>
      {isEditable && (
        <div
          className="text-secondary-text dark:text-secondary-text-dark cursor-pointer"
          onClick={() => {
            setShowEdit((prev) => !prev)
          }}
        >
          {!showEdit ? <MdEdit /> : <IoCloseSharp />}
        </div>
      )}
    </div>
  )
}

const Profile = () => {
  const router = useRouter()
  const { data: userData, isLoading, mutate } = useSWR('/api/user/me', swrFetcher)
  const [isMount, setMount] = React.useState(true)
  const [image, setImage] = useState<string>()
  const [isEditing, setIsEditing] = useState(false)
  const [isSave, setIsSave] = useState(false)
  const [name, setName] = useState<string>('unknown')
  const [userName, setUserName] = useState('@alex134')
  const [about, setAbout] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit')

  useEffect(() => {
    if (!isLoading && userData) {
      setName(userData?.user?.name)
    }
  }, [userData])

  React.useEffect(() => {
    if (isMount) {
      setMount(false)
    }
  }, [])

  const LinkItems = [
    {
      title: 'Full Name',
      value: name,
      setValue: setName,
      icon: UserProfile,
      isEditable: isEditing,
    },
    {
      title: 'TextRP Username',
      value: userName,
      setValue: setUserName,
      icon: Username,
      isEditable: isEditing,
    },
    {
      title: 'About',
      value: about,
      setValue: setAbout,
      icon: About,
      isEditable: isEditing,
    },
    {
      title: 'Wallet Address',
      value: userData?.user?.address,
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

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = URL.createObjectURL(e.target.files[0])
      setImage(file)
    }
  }

  const handleSave = () => {
    setIsSave(true)
    axios
      .post(`/api/user/update`, { name: name })
      .then((res) => {
        console.log(res)
        setIsSave(false)
        setIsEditing(false)
        mutate()
      })
      .catch((err) => {
        console.log(err)
      })
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
      {isLoading ? (
        <div className="w-full flex justify-center items-center p-6">
          <Loader />
        </div>
      ) : (
        <div className="overflow-y-auto h-full px-4 md:px-8 relative">
          <div
            onClick={() => setIsEditing((prev) => !prev)}
            className="absolute right-4 md:right-8 top-3 text-secondary-text dark:text-secondary-text-dark cursor-pointer"
          >
            {!isEditing ? <MdEdit size={26} /> : <IoCloseSharp size={26} />}
          </div>
          <div className="relative w-full flex justify-center my-8">
            <div className="rounded-full h-28 w-28 relative min-w-[6rem] overflow-hidden ">
              <Image
                src={image ?? 'https://picsum.photos/204'}
                alt="User Image"
                fill
                className=" object-cover"
                quality={100}
              />
            </div>
            {isEditing && (
              <>
                <label
                  htmlFor={'upload-image'}
                  className=" rounded-full h-7 w-7 cursor-pointer absolute right-[40%] md:right-[30%] bottom-0"
                >
                  <Image src={Camera} alt="Filter Icon" />
                </label>
                <input
                  type={'file'}
                  hidden
                  accept="image/*"
                  id={'upload-image'}
                  onChange={handleImage}
                />
              </>
            )}
          </div>
          <div className="flex flex-col gap-8 my-8 w-full ">
            {LinkItems.map((li, i) => (
              <EditCard {...li} key={i} />
            ))}
          </div>
          {isEditing && (
            <div className="flex items-center gap-2 my-6">
              <Button onClick={handleSave} loading={isSave} className="px-6 py-2  rounded">
                {'Save'}
              </Button>
              <Button
                onClick={() => {
                  mutate()
                  setIsEditing(false)
                }}
                variant="blueOutline"
                className=" px-6 py-2 rounded"
              >
                {'Cancel'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Profile
