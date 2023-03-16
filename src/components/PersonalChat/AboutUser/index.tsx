import React, { Dispatch, Fragment, SetStateAction, useEffect, useRef } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { IChatData } from '..'
import Image from 'next/image'
import { Transition } from '@headlessui/react'
import LeftArrorwIcon from '@public/Icons/leftArrowIcon.svg'

interface IAboutUser {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  className?: string
  data: IChatData | null
}

const AboutUser: React.FC<IAboutUser> = ({ isOpen, setIsOpen, className, data }) => {
  const aboutRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <Transition
      as={Fragment}
      show={isOpen}
      enter="transition md:transition-none ease-out duration-300"
      enterFrom=" md:transition-none md:translate-x-0 translate-x-full"
      enterTo=" md:transition-none translate-x-0"
      leave="md:transition-none transition ease-in duration-300"
      leaveFrom="md:transition-none translate-x-0"
      leaveTo="md:transition-none md:translate-x-0  translate-x-full"
    >
      <div
        ref={aboutRef}
        className={`z-50 h-full md:h-auto w-full md:max-w-sm bg-white dark:bg-gray-bg2-dark md:border-0.5 dark:border-secondary-text-dark md:rounded-lg shadow-shadow-primary p-4 ${
          isOpen ? 'block' : 'hidden'
        } absolute top-0 md:top-24 ${className}`}
      >
        <IoCloseOutline
          size={26}
          className="hidden md:block absolute top-3 right-5 cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
        <Image src={LeftArrorwIcon} alt="" onClick={() => setIsOpen(false)} />
        <div className="w-full flex flex-col gap-8  items-center">
          <Image
            src={data?.userImage}
            alt="user"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <p className="text-center text-2xl font-semibold">{data?.userName}</p>
            {data?.platformIcon && (
              <div className="flex items-center gap-3 text-secondary-text dark:text-secondary-text-dark text-base font-normal">
                <Image src={data?.platformIcon} height={20} width={20} alt="Filter Icon" />
                <p>{data?.userName}</p>
              </div>
            )}
          </div>
          <div>
            <p className="text-left text-lg">About</p>
            <p className="text-base font-normal text-secondary-text dark:text-secondary-text-dark">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto explicabo,
              exercitationem consectetur quisquam fugiat harum veritatis at neque quos autem fuga
              quidem, ipsum nostrum enim mollitia doloribus similique eius dolorem.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default AboutUser
