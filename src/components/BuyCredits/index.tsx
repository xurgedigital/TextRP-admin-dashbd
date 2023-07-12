import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import ArrowLeft from '@public/Icons/setting/arrow.svg'
import { useRouter } from 'next/router'
import Dropdown from '../common/Dropdown'
import { swrFetcher } from '@/helpers'
import useSWR from 'swr'
import Loader from '../common/Loader'
import Button from '../UI/Button'
import axios from 'axios'

const BuyCredits = () => {
  const router = useRouter()
  const [isMount, setMount] = React.useState(true)
  const [isPaying, setIsPaying] = useState(false)
  const { data: userData } = useSWR('/api/user/me', swrFetcher)
  const { data: creditData, isLoading, mutate } = useSWR('/api/admin/credits', swrFetcher)
  const { data: usdXrpPriceData, isLoading: isPriceLoading } = useSWR(
    'https://api.binance.com/api/v3/avgPrice?symbol=XRPUSDT',
    swrFetcher
  )
  const dropdownItems = useMemo(() => {
    return creditData?.data?.map(
      (cd: { available_credits: number; price: number }) =>
        `${cd.available_credits} credits for ${cd.price} XRP`
    )
  }, [creditData])

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    dropdownItems && dropdownItems[0]
  )

  useEffect(() => {
    if (dropdownItems) {
      setSelectedOption(dropdownItems[0])
    }
  }, [dropdownItems])
  useEffect(() => {
    if (isMount) {
      setMount(false)
    }
  }, [])

  const handleBuyCredits = () => {
    setIsPaying(true)
    const CREDIT_ID = creditData?.data[dropdownItems.indexOf(selectedOption)]?.id
    axios
      .post(`/api/user/creditPayment/${CREDIT_ID}`)
      .then((res) => {
        if (!isMount && window) {
          window.open(res?.data?.data?.next?.always, '_blank')
          router.back()
          setIsPaying(false)
        }
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
        setIsPaying(false)
      })
  }

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
        <p className="text-2xl font-semibold">{'Buy Credits'}</p>
      </div>

      <div className="overflow-y-auto h-full px-4 md:px-8 ">
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader />
          </div>
        ) : (
          <>
            <div className="text-base font-normal my-8">
              <p className="">Your credits balance</p>
              <p className="font-semibold">{userData?.user?.credit?.balance}</p>
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
              <p className="font-semibold">{`${
                creditData?.data[dropdownItems.indexOf(selectedOption)]?.price
              } XRP (${
                !isPriceLoading && usdXrpPriceData?.price
                  ? (
                      usdXrpPriceData?.price *
                      creditData?.data[dropdownItems.indexOf(selectedOption)]?.price
                    ).toFixed(2)
                  : '-'
              } USD)`}</p>
            </div>
            <div className="text-base font-normal my-8">
              <p className="">Your new credits balance will be</p>
              <p className="font-semibold">{`${
                creditData?.data[dropdownItems.indexOf(selectedOption)]?.available_credits +
                parseFloat(userData?.user?.credit?.balance ?? 0)
              }`}</p>
            </div>
            <Button
              onClick={handleBuyCredits}
              loading={isPaying}
              className="outline-none text-base font-normal rounded p-2 bg-primary-blue text-white w-full flex justify-center"
            >
              Buy Credits
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default BuyCredits
