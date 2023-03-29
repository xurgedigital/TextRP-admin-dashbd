import React, { Dispatch, SetStateAction, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import ArrowLeft from '@public/Icons/setting/arrow.svg'
import Pointer from '@public/Icons/pointer.svg'
import Circle from '@public/Icons/circle.svg'
import Tick from '@public/Icons/tick.svg'
import { useRouter } from 'next/router'
import { swrFetcher } from '@/helpers'
import useSWR from 'swr'
import Button from '../UI/Button'
import Loader from '../common/Loader'
import axios from 'axios'

interface ISubscriptionCard {
  name: string
  price: string
  available_credits: number
  description: string
  index: number
  pointers?: string[]
  bestDeal?: boolean
  selectCardIndex: number
  setSelectCardIndex: Dispatch<SetStateAction<number>>
}

const SubscriptionCard = (props: ISubscriptionCard) => {
  const { name, price, bestDeal, selectCardIndex, setSelectCardIndex, index, available_credits } =
    props

  return (
    <>
      {bestDeal ? (
        <div className="text-center bg-primary-green text-sm font-semibold py-1 rounded-t-lg">
          Best Deal!
        </div>
      ) : null}
      <div
        onClick={() => setSelectCardIndex(index)}
        className={`p-4 shadow-shadow-primary ${
          selectCardIndex === index
            ? 'border-2 border-primary-blue bg-gray-bg dark:bg-gray-bg2-dark'
            : 'border-[0.5px] border-primary-gray dark:border-secondary-text-dark'
        }  rounded-lg mb-4 ${bestDeal ? 'rounded-t-none' : ''}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="uppercase text-xs text-secondary-text dark:text-secondary-text-dark mb-1">
              {name}
            </p>
            <p className="text-base font-semibold text-primary-blue">{`${price} XRP`}</p>
          </div>
          <div className={`${selectCardIndex === index ? 'hidden' : 'block'}`}>
            <Image src={Circle} alt={'circle'} className="" quality={100} />
          </div>
          <div
            className={`${
              selectCardIndex === index
                ? 'flex items-center justify-center h-6 w-6 rounded-full bg-primary-blue'
                : 'hidden'
            }`}
          >
            <Image src={Tick} alt={'tick'} className="" quality={100} />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <Image src={Pointer} alt={'pointer'} className="" quality={100} />
            <p className="text-base font-normal">{`Get ${available_credits} credits`}</p>
          </div>
        </div>
      </div>
    </>
  )
}

const Subscriptions = () => {
  const router = useRouter()
  const [selectCardIndex, setSelectCardIndex] = useState(-1)
  const [isMount, setMount] = React.useState(true)
  const [isPayment, setIsPayment] = useState(false)
  const { data: subsData, isLoading, mutate } = useSWR('/api/admin/subscriptions', swrFetcher)

  const handleBuySubscription = () => {
    setIsPayment(true)
    const SUB_ID = subsData?.data[selectCardIndex]?.id
    axios
      .post(`/api/user/subscriptionPayment/${SUB_ID}`)
      .then((res) => {
        if (!isMount && window) {
          window.open(res?.data?.data?.next?.always, '_blank')
          router.back()
        }
        setIsPayment(false)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
        setIsPayment(false)
      })
  }

  React.useEffect(() => {
    if (isMount) {
      setMount(false)
    }
  }, [])

  const handleBack = () => {
    router.back()
  }
  return (
    <div
      className={`md:transform-none  settingPanel bg-white dark:bg-gray-bg-dark py-6   relative border-r-[0.5px]  border-primary-gray cursor-pointer min-h-screen max-h-screen overflow-hidden `}
    >
      <div className="flex gap-5 items-center px-4 md:px-8">
        <Image
          src={ArrowLeft}
          alt="arrow-left"
          className="cursor-pointer"
          onClick={handleBack}
          quality={100}
        />
        <p className="text-2xl font-semibold">{'Subscriptions'}</p>
      </div>
      <div className="overflow-y-auto h-full px-4 md:px-8 pb-8">
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader />
          </div>
        ) : (
          <>
            <div className="my-8 flex flex-col">
              {subsData?.data?.map((sub: ISubscriptionCard, i: number) => (
                <SubscriptionCard
                  {...sub}
                  key={i}
                  index={i}
                  selectCardIndex={selectCardIndex}
                  setSelectCardIndex={setSelectCardIndex}
                />
              ))}
            </div>
            <Button
              onClick={handleBuySubscription}
              disabled={selectCardIndex === -1}
              loading={isPayment}
              className="outline-none text-base font-normal rounded p-2 bg-primary-blue text-white w-full flex justify-center"
            >
              Subscribe
            </Button>
            {selectCardIndex !== -1 && (
              <p className="text-sm text-secondary-text dark:text-secondary-text-dark mt-4">
                {` You will be charged ${subsData?.data[selectCardIndex]?.price} XRP (USD $59.88) `}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Subscriptions
