import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Edit from '@public/Icons/edit.svg'
import Image from 'next/image'
import axios from 'axios'
import Button from '@/components/UI/Button'
import Loader from '@/components/common/Loader'
import { swrFetcher } from '@/helpers'
import useSWR from 'swr'
import CommonInput from '@/components/common/CommonInput'

interface IRowData {
  name: string
  price: number
  available_credits: number
  id: number
}

const CreateCredit = ({
  setShowCreateCredit,
}: {
  setShowCreateCredit: Dispatch<SetStateAction<boolean>>
}) => {
  const { mutate } = useSWR('/api/admin/credits', swrFetcher)
  const [name, setName] = useState<string>()
  const [price, setPrice] = useState<number>()
  const [credits, setCredits] = useState<number>()
  const [isSaving, setIsSaving] = useState(false)

  const handleCreate = () => {
    setIsSaving(true)
    axios
      .post(`/api/admin/credits`, {
        name: name,
        price: price,
        available_credits: credits,
      })
      .then((res) => {
        console.log('set_credit', res)
        setIsSaving(false)
        setShowCreateCredit((prev) => !prev)
        mutate()
      })
      .catch((err) => {
        setIsSaving(false)
        console.log(err)
      })
  }

  return (
    <div className="w-full sm:w-auto">
      <p className="text-2xl font-semibold">Create Discount</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 bg-white mt-3 w-full">
        <CommonInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex. xyz"
          fullWidth
        />
        <CommonInput
          label="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Ex. 10"
          fullWidth
        />
        <CommonInput
          label="Credit"
          value={credits}
          onChange={(e) => setCredits(Number(e.target.value))}
          placeholder="Ex. 39"
          fullWidth
        />
        <div className="flex items-center gap-2 mt-4 sm:ml-28">
          <Button loading={isSaving} onClick={handleCreate} className="truncate px-4 py-2 rounded">
            {'Save'}
          </Button>
          <Button
            onClick={() => {
              setShowCreateCredit((prev) => !prev)
            }}
            variant="blueOutline"
            className="px-4 py-2 rounded"
          >
            {'Cancel'}
          </Button>
        </div>
      </div>
    </div>
  )
}

const CreditComp = () => {
  const { data: creditData, isLoading, mutate } = useSWR('/api/admin/credits', swrFetcher)
  const [showCreateCredit, setShowCreateCredit] = useState(false)

  const Row = (props: IRowData) => {
    const { name, price: xrpPrice, available_credits, id } = props
    const price = xrpPrice
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
                type="number"
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
                <Button onClick={() => {}} variant="redOutline" className=" px-6 py-2 rounded">
                  {'Delete'}
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
    <>
      {showCreateCredit ? (
        <CreateCredit setShowCreateCredit={setShowCreateCredit} />
      ) : (
        <div className="w-full max-w-[860px]">
          <div className="flex flex-col md:flex-row w-full   gap-y-2  md:items-center md:justify-between">
            <p className="text-xl sm:text-2xl font-semibold">Credits Pricing</p>
            <Button
              onClick={() => setShowCreateCredit((prev) => !prev)}
              className="truncate px-4 py-2 w-max rounded"
            >
              {'Create Credit'}
            </Button>
          </div>
          <div className=" w-full inline-block align-middle ">
            <div className="overflow-auto shadow-shadow-tertiary rounded-lg p-6 pb-2 bg-white mt-3">
              <table className="table-fixed w-full min-w-[800px]  border-spacing-4 border-[2px] ">
                <thead>
                  <tr className="bg-blue-100 text-sm font-semibold">
                    <th className=" border-[1px] py-2 px-4  text-left mb-4">
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
      )}
    </>
  )
}

export default CreditComp
