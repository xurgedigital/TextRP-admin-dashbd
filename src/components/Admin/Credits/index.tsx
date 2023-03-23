import React, { useEffect, useState } from 'react'
import Edit from '@public/Icons/edit.svg'
import Image from 'next/image'
import axios from 'axios'
import Button from '@/components/UI/Button'
import Loader from '@/components/common/Loader'
import { swrFetcher } from '@/helpers'
import useSWR from 'swr'

interface IRowData {
  name: string
  price: number
  available_credits: number
  id: number
}

const CreditComp = () => {
  const { data: creditData, isLoading, mutate } = useSWR('/api/admin/credits', swrFetcher)

  const Row = (props: IRowData) => {
    const { name, price, available_credits, id } = props
    const [isEditable, setIsEditable] = useState(false)
    const [updatePrice, setUpdatePrice] = useState(price)
    const [credits, setCredits] = useState(available_credits)
    const [isSaving, setIsSaving] = useState(false)

    const updateCredits = () => {
      setIsSaving(true)
      axios
        .post(`/api/admin/credits/${id}`, {
          name: name,
          price: updatePrice,
          available_credits: credits,
        })
        .then((res) => {
          setIsSaving(false)
          setIsEditable((prev) => !prev)
          mutate()
          console.log('update_credit', res)
        })
        .catch((err) => {
          setIsSaving(false)
          console.log(err)
        })
    }

    return (
      <tr className="text-sm font-normal mr-3">
        <td className="pb-4">
          {isEditable ? (
            <div className="flex items-start h-[7.6rem]"> {name ?? '-'}</div>
          ) : (
            <span>{name ?? '-'}</span>
          )}
        </td>
        <td className="pb-4">
          {isEditable ? (
            <div className="w-full flex flex-col justify-start h-[7.6rem] pr-3">
              <input
                placeholder={'Ex. 66'}
                value={updatePrice}
                onChange={(e) => setUpdatePrice(Number(e.target.value))}
                className={`p-3 rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text`}
              />
              <div className="flex items-center gap-2 mt-4">
                <Button loading={isSaving} onClick={updateCredits} className="px-6 py-2  rounded">
                  {'Save'}
                </Button>
                <Button
                  onClick={() => {
                    setUpdatePrice(price)
                    setCredits(available_credits)
                    setIsEditable((prev) => !prev)
                  }}
                  variant="blueOutline"
                  className=" px-6 py-2 rounded"
                >
                  {'Cancel'}
                </Button>
              </div>
            </div>
          ) : (
            <span>{price ?? '-'}</span>
          )}
        </td>
        <td className="pb-4">
          {isEditable ? (
            <div className="w-full flex items-start h-[7.6rem]">
              <input
                placeholder={'Ex. 45'}
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
                className={`p-3 rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text`}
              />
            </div>
          ) : (
            <span>{available_credits ?? '-'}</span>
          )}
        </td>
        <td className="pb-4">
          <div className={` ${isEditable ? 'hidden' : 'flex'}  w-full justify-end`}>
            <Image
              onClick={() => setIsEditable((prev) => !prev)}
              src={Edit}
              alt={'edit'}
              className="cursor-pointer"
              quality={100}
            />
          </div>
        </td>
      </tr>
    )
  }

  return (
    <div className="w-full">
      <p className="text-xl sm:text-2xl font-semibold">Credits Pricing</p>
      <div className="max-w-[660px] w-full inline-block align-middle ">
        <div className="overflow-auto shadow-shadow-tertiary rounded-lg p-6 pb-2 bg-white mt-3">
          <table className="table-fixed">
            <thead>
              <tr className="text-sm font-semibold">
                <th>
                  {' '}
                  <div className="min-w-[9rem] text-left mb-4">Package Name</div>
                </th>
                <th>
                  {' '}
                  <div className="min-w-[6rem] text-left mb-4">Price</div>
                </th>
                <th>
                  {' '}
                  <div className="min-w-[9rem] text-left mb-4">Number of Credits</div>
                </th>
                <th>
                  {' '}
                  <div className="w-10 mb-4"></div>{' '}
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                creditData &&
                creditData?.data?.length > 0 &&
                creditData?.data?.map((ci: IRowData, i: number) => <Row {...ci} key={i} />)}
            </tbody>
          </table>
        </div>
        {isLoading ? (
          <div className="w-full flex justify-center items-center p-6 bg-white">
            <Loader />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default CreditComp
