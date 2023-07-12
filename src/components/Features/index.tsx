import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import ArrowLeft from '@public/Icons/setting/arrow.svg'
import { useRouter } from 'next/router'
import { swrFetcher } from '@/helpers'
import useSWR from 'swr'
import Loader from '../common/Loader'

const Features = () => {
  const router = useRouter()
  const [isMount, setMount] = React.useState(true)
  const { data: featuresData, isLoading } = useSWR('/api/available-features', swrFetcher)
  useEffect(() => {
    if (isMount) {
      setMount(false)
    }
  }, [])

  const handleBack = () => {
    router.back()
  }
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
          onClick={handleBack}
          quality={100}
        />
        <p className="text-2xl font-semibold">{'Features'}</p>
      </div>
      <div className="overflow-y-auto h-full px-4 md:px-8 ">
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader />
          </div>
        ) : (
          <>
            {featuresData ? (
              featuresData?.features?.map((feature: string, index: number) => (
                <p key={index} className="text-white text-sm my-6 capitalize">
                  {feature.replace('_', ' ')}
                </p>
              ))
            ) : (
              <p className="text-white text-center my-6">{'No data found'}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Features
