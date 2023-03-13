import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import ArrowLeft from '@public/Icons/setting/arrow.svg'
import Chevrondown from '@public/Icons/chevrondown.svg'
import { useRouter } from 'next/router'
import Dropdown from '../common/Dropdown'

const BuyCredits = () => {
  const router = useRouter()
  const dropdownItems = ['50 credits for USD $3 (7.537 XRP)']
  const [selectedOption, setSelectedOption] = useState<string | undefined>(dropdownItems[0])
  const [isMount, setMount] = React.useState(true)

  React.useEffect(() => {
    if (isMount) {
      setMount(false)
    }
  }, [])

  return (
    <div
      className={` md:transform-none settingPanel min-h-screen max-h-screen overflow-hidden bg-white dark:bg-gray-bg-dark py-6  relative border-r-[0.5px] border-primary-gray dark:border-secondary-text ${
        isMount ? 'translate-x-full' : 'translate-x-0'
      } transition duration-300`}
    >
      <div className="flex gap-5 items-center px-4 md:px-8 ">
        <Image
          src={ArrowLeft}
          alt="arrow-left"
          className="cursor-pointer"
          onClick={() => router.back()}
          quality={100}
        />
        <p className="text-2xl font-semibold">Buy Credits</p>
      </div>

      <div className="overflow-y-auto h-full px-4 md:px-8 ">
        <div className="text-base font-normal my-8">
          <p className="">Your credits balance</p>
          <p className="font-semibold">10</p>
        </div>
        <div className="text-base font-normal my-8">
          <p className="mb-2">Select the amount to buy</p>
          <Dropdown
            dropdownList={dropdownItems}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
        <div className="text-base font-normal my-8">
          <p className="">You will be charged</p>
          <p className="font-semibold">USD $3 (7.537 XRP)</p>
        </div>
        <div className="text-base font-normal my-8">
          <p className="">Your new credits balance will be</p>
          <p className="font-semibold">60</p>
        </div>
        <div className="text-base font-normal my-8">
          <p className="">These connects will expire on</p>
          <p className="font-semibold">January 23, 2024</p>
        </div>
        <button className="outline-none text-base font-normal rounded p-2 bg-primary-blue text-white w-full flex justify-center">
          Buy Credits
        </button>
      </div>
    </div>
  )
}

export default BuyCredits
