import React, { useEffect, useMemo, useState } from 'react'
import CommonInput from '@/components/common/CommonInput'
import axios from 'axios'
import Button from '@/components/UI/Button'
import Pagination from '@/components/common/Pagination'
import Loader from '@/components/common/Loader'
import { swrFetcher } from '@/helpers'
import EditIcon from '@public/Icons/editIcon.svg'
import useSWR from 'swr'
import Image from 'next/image'
import { isValidClassicAddress } from 'ripple-address-codec'

interface IDiscount {
  id: number
  discount: number
  address: string
}

const DiscountComp = () => {
  const [showNewDiscount, setShowNewDiscount] = useState(false)
  const [discountInfo, setDiscountInfo] = useState({ discount: 0, address: '' })
  const [meta, setMeta] = useState<any>(null)
  const [page, setPage] = useState(1)
  const LIMIT = 10

  const query = useMemo(() => `/api/admin/discounts?page=${page}&limit=${LIMIT}`, [page])
  const { data: discountData, isLoading, mutate } = useSWR(query, swrFetcher)

  useEffect(() => {
    if (!isLoading && discountData) {
      setMeta(discountData?.meta)
    }
  }, [discountData, isLoading])

  const SetNewDiscount = ({
    discountInfo,
    setDiscountInfo,
  }: {
    discountInfo: { address: string; discount: number }
    setDiscountInfo: Function
  }) => {
    const [address, setAddress] = useState('')
    const [addressError, setAddressError] = useState(false)
    const [discount, setDiscount] = useState(0)
    const [isSaving, setIsSaving] = useState(false)

    const handleSetDiscount = () => {
      setIsSaving(true)
      if (!isValidClassicAddress(address)) {
        setAddressError(true)
        setIsSaving(false)
        return
      }

      axios
        .post(`/api/admin/discounts`, {
          address: address,
          discount: discount,
        })
        .then((res) => {
          console.log('set_discount', res)
          setIsSaving(false)
          setShowNewDiscount((prev) => !prev)
          mutate()
        })
        .catch((err) => {
          setIsSaving(false)
          console.log(err)
        })
    }

    React.useEffect(() => {
      if (discountInfo.address && discountInfo.discount) {
        setAddress(discountInfo.address)
        setDiscount(discountInfo.discount)
      }
    }, [discountInfo])

    return (
      <div className="w-full sm:w-auto">
        <p className="text-2xl font-semibold mt-8">Set New Discount</p>
        <div className="shadow-shadow-tertiary rounded-lg p-6 bg-white mt-3 w-full">
          <CommonInput
            label="Discount %"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            placeholder="10"
            fullWidth
          />
          <CommonInput
            label="Wallet address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
            fullWidth
          />
          {addressError ? (
            <p className=" sm:pl-20 md:pl-30 text-xs text-red-500">Enter valid XRP address !</p>
          ) : null}
          <div className="flex items-center gap-2 mt-4 sm:ml-28">
            <Button
              loading={isSaving}
              onClick={handleSetDiscount}
              className="truncate px-4 py-2  rounded"
            >
              {'Save'}
            </Button>
            <Button
              onClick={() => {
                setShowNewDiscount((prev) => !prev)
                setDiscountInfo({ address: '', discount: '' })
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

  const Row = (props: IDiscount) => {
    const { id, discount, address } = props
    const [isEditable, setIsEditable] = useState(false)
    const [newDiscount, setNewDiscount] = useState(discount)
    const [newAddress, setNewAddress] = useState(address)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState(false)

    const updateDiscount = () => {
      setIsSaving(true)
      if (!isValidClassicAddress(newAddress)) {
        setError(true)
        setIsSaving(false)
        return
      }

      axios
        .post(`/api/admin/discounts/${id}`, {
          discount: newDiscount,
          address: newAddress,
        })
        .then((res) => {
          setIsSaving(false)
          setIsEditable((prev) => !prev)
          mutate()
        })
        .catch((err) => {
          setIsSaving(false)
          console.log(err)
        })
    }

    return (
      <tr className="text-sm font-normal text-secondary-text">
        <td className="pb-4 py-3 pl-4">
          {' '}
          {isEditable ? (
            <div className="w-full flex items-start h-[7.6rem] pr-4">
              <input
                placeholder={'Ex. 45'}
                value={newDiscount}
                onChange={(e) => setNewDiscount(Number(e.target.value))}
                className={`p-3 rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text`}
              />
            </div>
          ) : (
            <span>{discount ?? '-'}</span>
          )}
        </td>
        <td className="pb-4 py-3 pr-4">
          {' '}
          {isEditable ? (
            <div className="w-full flex flex-col justify-start h-[7.6rem] pr-4">
              <input
                placeholder={'Ex. 66'}
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className={`p-3 rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text`}
              />
              {error ? <p className="text-xs text-red-500">Enter valid XRP address !</p> : null}
              <div className="flex items-center gap-2 mt-4">
                <Button loading={isSaving} onClick={updateDiscount} className="px-6 py-2  rounded">
                  {'Save'}
                </Button>
                <Button
                  onClick={() => {
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
            <span>{address ?? '-'}</span>
          )}
        </td>
        <td className="p-4">
          <div className={` ${isEditable ? 'hidden' : 'flex'}  w-full justify-end`}>
            <Image
              onClick={() => {
                setIsEditable((prev) => !prev)
              }}
              className="min-w-fit cursor-pointer"
              height={16}
              width={16}
              src={EditIcon}
              alt=""
            />
          </div>
        </td>
      </tr>
    )
  }

  return (
    <>
      {showNewDiscount ? (
        <SetNewDiscount discountInfo={discountInfo} setDiscountInfo={setDiscountInfo} />
      ) : (
        <div className="w-full">
          <div className="flex flex-col md:flex-row w-full max-w-[600px] gap-y-2  md:items-center md:justify-between">
            <p className="text-xl sm:text-2xl font-semibold">Running Discounts</p>
            <button
              onClick={() => setShowNewDiscount((prev) => !prev)}
              className="bg-primary-blue truncate text-white px-8 py-2 text-sm font-semibold rounded w-max"
            >
              {'Set New Discount'}
            </button>
          </div>
          <div className="max-w-[680px] w-full inline-block align-middle ">
            <div className="overflow-auto w-full rounded-lg rounded-b-none border border-b-0  border-primary-gray mt-3">
              <table className="table-auto w-full ">
                <thead className="bg-transparent border-b border-primary-gray">
                  <tr className="text-sm font-semibold">
                    <th>
                      {' '}
                      <div className="min-w-[9rem] text-left py-3 pl-4">Discount %</div>
                    </th>
                    <th>
                      {' '}
                      <div className="min-w-full text-left py-3 pr-4">Wallet address</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-gray bg-white w-full">
                  {discountData &&
                    discountData?.data?.length > 0 &&
                    discountData?.data?.map((di: IDiscount, i: number) => <Row {...di} key={i} />)}
                </tbody>
              </table>
            </div>
            {isLoading ? (
              <div className="w-full flex justify-center items-center p-6 bg-white">
                <Loader />
              </div>
            ) : null}
            <Pagination
              className="border border-primary-gray gap-6 sm:gap-0 justify-center sm:justify-between bg-white rounded-b-lg"
              meta={meta}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default DiscountComp
