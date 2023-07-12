import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import ArrowLeft from '@public/Icons/setting/arrow.svg'
import { useRouter } from 'next/router'
import { swrFetcher } from '@/helpers'
import useSWR from 'swr'
import Loader from '../common/Loader'
import { isBoolean } from 'lodash'

const Features = () => {
  const router = useRouter()
  const [NftData, setNftData] = useState<any>([1, 2, 3, 4])
  // const [NftLoading, setNftLoading] = useState(false)
  const [isMount, setMount] = React.useState(true)

  const { data: userData } = useSWR('/api/user/me', swrFetcher)
  const { data: featuresData, isLoading } = useSWR(
    `/api/my-features/${userData?.user?.address}/main`,
    swrFetcher
  )

  useEffect(() => {
    if (isMount) {
      setMount(false)
    }
  }, [])

  const NFTCard = (props: {
    contract_address: string
    discord: boolean
    twitter: boolean
    twilio: boolean
    dark_mode: boolean
  }) => {
    return (
      <div>
        {Object.keys(props).map((v) => (
          // eslint-disable-next-line react/jsx-key
          <div className="mt-2">
            <p className="text-base font-semibold">{v}</p>
            <p className="text-secondary-text text-xs font-normal">
              {/* @ts-ignore               */}
              {isBoolean(props[v]) ? (props[v] === true ? 'Yes' : 'No') : props[v]}
            </p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className={`md:transform-none settingPanel min-h-screen  bg-white dark:bg-gray-bg-dark py-6  relative border-r-[0.5px]  border-primary-gray dark:border-secondary-text-dark cursor-pointer ${
        isMount ? 'translate-x-full' : 'translate-x-0'
      }  transition duration-300 max-h-screen overflow-hidden`}
    >
      <div className="flex gap-5 items-center px-4 md:px-8">
        <Image
          src={ArrowLeft}
          alt="arrow-left"
          className="cursor-pointer"
          onClick={() => router.back()}
          quality={100}
        />
        <p className="text-2xl font-semibold">{'Features'}</p>
      </div>
      {isLoading && (
        <div className="w-full flex justify-center mt-16">
          <div
            className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
      <div className="h-full overflow-y-auto px-4 md:px-8">
        <div className="grid grid-cols-2 gap-4 my-8 ">
          {featuresData?.nfts?.map((ni: any, i: number) => (
            <NFTCard {...ni} key={i} />
          ))}
          {featuresData?.nfts?.length === 0 || (!featuresData && !isLoading)
            ? 'No NFTs found on your address'
            : ''}
        </div>
      </div>
    </div>
  )
}

export default Features
