import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { IChatData } from '..'
import Image from 'next/image'

interface IAboutUser {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  className?: string
  data: IChatData | null
}

const AboutUser: React.FC<IAboutUser> = ({ setIsOpen, className, data }) => {
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
    <div
      ref={aboutRef}
      className={`z-50  w-full max-w-sm bg-white dark:bg-gray-bg2-dark border-0.5 dark:border-secondary-text-dark rounded-lg shadow-shadow-primary p-4 ${className}`}
    >
      <IoCloseOutline
        size={26}
        className="absolute top-3 right-5 cursor-pointer"
        onClick={() => setIsOpen(false)}
      />
      <div className="flex flex-col gap-8  items-center">
        <Image src={data?.userImage} alt="user" width={100} height={100} className="rounded-full" />
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
  )
}

export default AboutUser
