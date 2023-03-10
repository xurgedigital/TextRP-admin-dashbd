import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import ArrowLeft from '@public/Icons/setting/arrow.svg'
import Pointer from '@public/Icons/pointer.svg'
import Circle from '@public/Icons/circle.svg'
import Tick from '@public/Icons/tick.svg'
import { useRouter } from 'next/router'

interface ISubscriptionCard {
  time: string
  price: string
  pointers: string[]
  bestDeal?: boolean
}

const subsData = [
  {
    time: 'Monthly',
    price: 'USD $6.99/month',
    pointers: ['Get 25 bonus credits'],
  },
  {
    time: 'Semi-Annually',
    price: 'USD $5.99/month',
    pointers: ['Get 50 bonus credits', 'Save 14%'],
  },
  {
    time: 'Annually',
    price: 'USD $4.99/month',
    pointers: ['Get 200 bonus credits', 'Save 29%'],
    bestDeal: true,
  },
]

const Subscriptions = () => {
  const router = useRouter()
  const [selectCard, setSelectCard] = useState('')
  const [isMount, setMount] = React.useState(true)

  React.useEffect(() => {
    if (isMount) {
      setMount(false)
    }
  }, [])
  const SubscriptionCard = (props: ISubscriptionCard) => {
    const { time, price, pointers, bestDeal } = props
    return (
      <>
        {bestDeal ? (
          <div className="text-center bg-primary-green text-sm font-semibold py-1 rounded-t-lg">
            Best Deal!
          </div>
        ) : null}
        <div
          onClick={() => setSelectCard(time)}
          className={`p-4 shadow-shadow-primary ${
            selectCard === time
              ? 'border-2 border-primary-blue bg-gray-bg'
              : 'border-[0.5px] border-primary-gray'
          }  rounded-lg mb-4 ${bestDeal ? 'rounded-t-none' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase text-xs text-secondary-text mb-1">{time}</p>
              <p className="text-base font-semibold text-primary-blue">{price}</p>
            </div>
            <div className={`${selectCard === time ? 'hidden' : 'block'}`}>
              <Image src={Circle} alt={'circle'} className="" quality={100} />
            </div>
            <div
              className={`${
                selectCard === time
                  ? 'flex items-center justify-center h-6 w-6 rounded-full bg-primary-blue'
                  : 'hidden'
              }`}
            >
              <Image src={Tick} alt={'tick'} className="" quality={100} />
            </div>
          </div>
          <div className="mt-4">
            {pointers.map((pt, i) => (
              <div key={i} className="flex items-center gap-3">
                <Image src={Pointer} alt={'pointer'} className="" quality={100} />
                <p className="text-base font-normal">{pt}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <div
      className={`md:transform-none  flex-1 md:flex-[0.3] lg:flex-[0.25] 3xl:flex-[0.2] min-h-screen h-full  bg-white py-6 px-4 md:px-8  relative border-r-[0.5px]  border-primary-gray cursor-pointer`}
    >
      <div className="flex gap-5 items-center">
        <Image
          src={ArrowLeft}
          alt="arrow-left"
          className="cursor-pointer"
          onClick={() => router.back()}
          quality={100}
        />
        <p className="text-2xl font-semibold">Subscriptions</p>
      </div>
      <div className="my-8 flex flex-col">
        {subsData.map((sub, i) => (
          <SubscriptionCard {...sub} key={i} />
        ))}
      </div>
      <button className="outline-none text-base font-normal rounded p-2 bg-primary-blue text-white w-full flex justify-center">
        Subscribe
      </button>
      <p className="text-sm text-secondary-text mt-4">
        You will be charged USD $59.88 (151.17 XRP)
      </p>
    </div>
  )
}

export default Subscriptions
