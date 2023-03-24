import React, { Dispatch, SetStateAction, useState } from 'react'
import Edit from '@public/Icons/edit.svg'
import Image from 'next/image'
import axios from 'axios'
import Button from '@/components/UI/Button'
import Loader from '@/components/common/Loader'
import { swrFetcher } from '@/helpers'
import useSWR from 'swr'
import CommonInput from '@/components/common/CommonInput'
import CommonTextArea from '@/components/common/CommonTextArea'
interface IRowprops {
  id: number
  name: string
  description: string
  available_credits: number
  price: number
}

const CreateSubscription = ({
  setShowCreateSubs,
}: {
  setShowCreateSubs: Dispatch<SetStateAction<boolean>>
}) => {
  const { mutate } = useSWR('/api/admin/subscriptions', swrFetcher)
  const [name, setName] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [price, setPrice] = useState<number>()
  const [credits, setCredits] = useState<number>()
  const [isSaving, setIsSaving] = useState(false)

  const handleCreate = () => {
    setIsSaving(true)
    axios
      .post(`/api/admin/subscriptions`, {
        name: name,
        description: description,
        price: price,
        available_credits: credits,
      })
      .then((res) => {
        console.log('set_subs', res)
        setIsSaving(false)
        setShowCreateSubs((prev) => !prev)
        mutate()
      })
      .catch((err) => {
        setIsSaving(false)
        console.log(err)
      })
  }

  return (
    <div className="w-full sm:w-auto">
      <p className="text-2xl font-semibold">Create Subscription</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 bg-white mt-3 w-full">
        <CommonInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex. xyz"
          fullWidth
        />
        <CommonTextArea
          className="mt-3"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex. xyz"
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
        <div className="flex items-center gap-2 mt-4 sm:ml-24">
          <Button loading={isSaving} onClick={handleCreate} className="truncate px-4 py-2 rounded">
            {'Save'}
          </Button>
          <Button
            onClick={() => {
              setShowCreateSubs((prev) => !prev)
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

const SubscriptionComp = () => {
  const {
    data: subscriptionData,
    isLoading,
    mutate,
  } = useSWR('/api/admin/subscriptions', swrFetcher)
  const [showCreateSubs, setShowCreateSubs] = useState(false)

  const Row = (props: IRowprops) => {
    const { id, name, description, available_credits, price } = props
    const [isEditable, setIsEditable] = useState(false)
    const [credits, setCredits] = useState(available_credits)
    const [descript, setDescript] = useState(description)
    const [newPrice, setNewPrice] = useState(price)
    const [isSaving, setIsSaving] = useState(false)

    const updateSubscription = () => {
      setIsSaving(true)
      axios
        .post(`/api/admin/subscriptions/${id}`, {
          name: name,
          description: descript,
          available_credits: credits,
          price: newPrice,
        })
        .then((res) => {
          setIsSaving(false)
          setIsEditable((prev) => !prev)
          mutate()
          console.log('update_subscription', res)
        })
        .catch((err) => {
          setIsSaving(false)
          setIsEditable((prev) => !prev)
          console.log(err)
        })
    }

    return (
      <tr className="text-sm font-normal ">
        <td className="pb-4 capitalize">
          {isEditable ? (
            <div className="flex items-start h-[9.5rem]">{name ?? '-'}</div>
          ) : (
            <span>{name ?? '-'}</span>
          )}
        </td>
        <td className="pb-4">
          {isEditable ? (
            <div className="w-full flex flex-col justify-start h-[9.5rem] pr-3">
              <textarea
                rows={3}
                placeholder={description}
                value={descript}
                onChange={(e) => setDescript(e.target.value)}
                className={`p-3 min-w-[17rem] rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text`}
              />
              <div className="flex items-center gap-2 mt-4">
                <Button
                  loading={isSaving}
                  onClick={updateSubscription}
                  className=" px-6 py-2  rounded"
                >
                  {'Save'}
                </Button>
                <Button
                  onClick={() => {
                    setDescript(description)
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
            <span>{description ?? '-'}</span>
          )}
        </td>
        <td className="pb-4 text-secondary-text">
          {isEditable ? (
            <div className="w-full flex items-start h-[9.5rem] pr-3">
              <input
                placeholder={'Ex. 6'}
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
                className={`p-3 rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text`}
              />
            </div>
          ) : (
            <span>{available_credits ?? '-'}</span>
          )}
        </td>
        <td className="pb-4 text-secondary-text">
          {isEditable ? (
            <div className="w-full flex items-start h-[9.5rem]">
              <input
                placeholder={'Ex. 6'}
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                className={`p-3 rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text`}
              />
            </div>
          ) : (
            <span>{price ?? '-'}</span>
          )}
        </td>
        <td className="pb-4">
          <div
            onClick={() => setIsEditable((prev) => !prev)}
            className={`${isEditable ? 'hidden' : 'flex'} cursor-pointer flex w-full justify-end`}
          >
            <Image src={Edit} alt={'edit'} className="" quality={100} />
          </div>
        </td>
      </tr>
    )
  }

  return (
    <>
      {showCreateSubs ? (
        <CreateSubscription setShowCreateSubs={setShowCreateSubs} />
      ) : (
        <div className="w-full">
          <div className="flex flex-col md:flex-row w-full   gap-y-2  md:items-center md:justify-between">
            <p className="text-xl sm:text-2xl font-semibold">Subscription Pricing</p>
            <Button
              onClick={() => setShowCreateSubs((prev) => !prev)}
              className="truncate px-4 py-2 w-max rounded"
            >
              {'Create Subscription'}
            </Button>
          </div>
          <div className=" w-full inline-block align-middle ">
            <div className=" overflow-auto shadow-shadow-tertiary rounded-lg p-6 pb-2 bg-white mt-3">
              <table className="table-auto ">
                <thead>
                  <tr className="text-sm font-semibold">
                    <th>
                      {' '}
                      <div className="min-w-[9rem] text-left mb-4">Package Name</div>
                    </th>
                    <th>
                      {' '}
                      <div className="min-w-[9rem] text-left mb-4">Package Description</div>
                    </th>
                    <th>
                      {' '}
                      <div className="min-w-[9rem] text-left mb-4">Number of Credits</div>
                    </th>
                    <th>
                      {' '}
                      <div className="min-w-[9rem] text-left mb-4">Price (in XRP) </div>
                    </th>
                    <th>
                      {' '}
                      <div className="w-10 mb-4"></div>{' '}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptionData &&
                    subscriptionData?.data?.length > 0 &&
                    subscriptionData?.data?.map((si: IRowprops, i: number) => (
                      <Row {...si} key={i} />
                    ))}
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

export default SubscriptionComp
