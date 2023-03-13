import React, { useEffect, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import ArrowLeft from '@public/Icons/setting/arrow.svg'
import Img1 from '@public/Images/nft/img1.svg'
import Img2 from '@public/Images/nft/img2.svg'
import Img3 from '@public/Images/nft/img3.svg'
import Img4 from '@public/Images/nft/img4.svg'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { swrFetcher } from '@/helpers'

interface INftCard {
  imgSrc: StaticImageData
  title: string
  description: string
}

const NFTItems = [
  {
    imgSrc: Img1,
    title: 'NFT Title',
    subTitle: 'NFT description can go here and be upto 3 lines. Lorem ipsum dolor sit amet.',
  },
  {
    imgSrc: Img2,
    title: 'NFT Title',
    subTitle: 'NFT description can go here and be upto 3 lines. Lorem ipsum dolor sit amet.',
  },
  {
    imgSrc: Img3,
    title: 'NFT Title',
    subTitle: 'NFT description can go here and be upto 3 lines. Lorem ipsum dolor sit amet.',
  },
  {
    imgSrc: Img4,
    title: 'NFT Title',
    subTitle: 'NFT description can go here and be upto 3 lines. Lorem ipsum dolor sit amet.',
  },
]

const NFTSection = () => {
  const router = useRouter()
  const [NftData, setNftData] = useState<any>([1, 2, 3, 4])
  // const [NftLoading, setNftLoading] = useState(false)
  const [isMount, setMount] = React.useState(true)

  const { data, isLoading } = useSWR(['/api/admin/supported_nfts'], swrFetcher)

  useEffect(() => {
    setNftData(data)
  }, [data])

  useEffect(() => {
    if (isMount) {
      setMount(false)
    }
  }, [])

  const NFTCard = (props: INftCard) => {
    const { imgSrc, title, description } = props
    return (
      <div>
        <div>
          <Image
            src={Img1}
            alt="arrow-left"
            className="cursor-pointer object-cover border border-primary-gray"
            quality={100}
          />
        </div>
        <div className="mt-2">
          <p className="text-base font-semibold">{title}</p>
          <p className="text-secondary-text text-xs font-normal">{description}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`md:transform-none flex-1 md:flex-[0.3] lg:flex-[0.25] 3xl:flex-[0.2]  min-h-screen  bg-white dark:bg-gray-bg-dark py-6 px-4 md:px-8 relative border-r-[0.5px]  border-primary-gray dark:border-secondary-text-dark cursor-pointer ${
        isMount ? 'translate-x-full' : 'translate-x-0'
      }  transition duration-300`}
    >
      <div className="flex gap-5 items-center">
        <Image
          src={ArrowLeft}
          alt="arrow-left"
          className="cursor-pointer"
          onClick={() => router.back()}
          quality={100}
        />
        <p className="text-2xl font-semibold">My NFTs</p>
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
      <div className="grid grid-cols-2 gap-4 my-8">
        {NftData?.data?.map((ni: any, i: number) => (
          <NFTCard {...ni} key={i} />
        ))}
      </div>
    </div>
  )
}

export default NFTSection
