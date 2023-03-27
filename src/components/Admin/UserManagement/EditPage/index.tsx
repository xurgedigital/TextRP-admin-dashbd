import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import EditIcon from '@public/Icons/editIcon.svg'
import Switch from 'react-switch'
import NFT1 from '@public/Images/nft/img1.svg'
import NFT2 from '@public/Images/nft/img2.svg'
import NFT3 from '@public/Images/nft/img3.svg'
import NFT4 from '@public/Images/nft/img4.svg'
import useWidth from '@/hooks/useWidth'
import Button from '@/components/UI/Button'
import axios from 'axios'
import { useRouter } from 'next/router'
import { trimAddress } from '@/helpers'
import moment from 'moment'
import { swrFetcher } from '@/helpers'
import useSWR from 'swr'

interface IEditProps {
  ActiveEditId?: string | string[]
}

const EditPage = (props: IEditProps) => {
  const {
    data: ActiveUser,
    isLoading,
    mutate,
  } = useSWR(`/api/admin/users/${props?.ActiveEditId}`, swrFetcher)

  const [active, setActive] = React.useState<boolean>(false)
  const [isEditingUser, setIsEditingUser] = React.useState(false)
  const [isEditingCredit, setIsEditingCredit] = React.useState(false)
  const [isEditingDiscount, setIsEditingDiscount] = React.useState(false)
  const [isEditingNFT, setisEditingNFT] = React.useState(false)
  const [UserName, setUserName] = useState(ActiveUser?.name)
  const [UserNameLoader, setUserNameLoader] = useState(false)
  const [Credits, setCredits] = useState(ActiveUser?.credit?.balance)
  const [CreditsLoader, setCreditsLoader] = useState(false)
  const [Discount, setDiscount] = useState(ActiveUser?.discount?.discount)
  const [DiscountLoader, setDiscountLoader] = useState(false)
  const width = useWidth()
  const router = useRouter()

  useEffect(() => {
    if (ActiveUser && !isLoading) {
      setUserName(ActiveUser?.name)
      setCredits(ActiveUser?.credit?.balance)
      setDiscount(ActiveUser?.discount?.discount)
      setActive(ActiveUser?.is_active)
    }
  }, [ActiveUser])

  const updateActiveStatus = () => {
    if (ActiveUser?.is_active !== active) {
      let payload = {
        is_active: active,
      }
      axios
        .post(`/api/admin/users/${props?.ActiveEditId}`, payload)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    updateActiveStatus()
  }, [active])

  const handleSaveUserName = () => {
    setUserNameLoader(true)
    let payload = {
      name: UserName,
    }
    axios
      .post(`/api/admin/users/${props?.ActiveEditId}`, payload)
      .then((res) => {
        console.log(res.data)
        setUserNameLoader(false)
        setIsEditingUser(false)
      })
      .catch((err) => {
        console.log(err)
        setUserNameLoader(false)
        setIsEditingUser(false)
      })
  }

  const handleSaveCredits = () => {
    setCreditsLoader(true)
    let payload = {
      balance: JSON.parse(Credits),
    }
    if (ActiveUser?.credit == null) {
      axios
        .post(`/api/admin/users/${props?.ActiveEditId}/create_credit`, payload)
        .then((res) => {
          console.log(res.data)
          setCreditsLoader(false)
          setIsEditingCredit(false)
        })
        .catch((err) => {
          console.log(err)
          setCreditsLoader(false)
          setIsEditingCredit(false)
        })
    } else {
      axios
        .post(`/api/admin/users/${props?.ActiveEditId}/credits/${ActiveUser?.credit?.id}`, payload)
        .then((res) => {
          console.log(res.data)
          setCreditsLoader(false)
          setIsEditingCredit(false)
        })
        .catch((err) => {
          console.log(err)
          setCreditsLoader(false)
          setIsEditingCredit(false)
        })
    }
  }

  const handleSaveDiscount = () => {
    setDiscountLoader(true)
    let payload = {
      discount: JSON.parse(Discount),
    }
    if (ActiveUser?.discount == null) {
      axios
        .post(`/api/admin/users/${props?.ActiveEditId}/create_discount`, payload)
        .then((res) => {
          console.log(res.data)
          setDiscountLoader(false)
          setIsEditingDiscount(false)
        })
        .catch((err) => {
          console.log(err)
          setDiscountLoader(false)
          setIsEditingDiscount(false)
        })
    } else {
      axios
        .post(
          `/api/admin/users/${props?.ActiveEditId}/discounts/${ActiveUser?.discount?.id}`,
          payload
        )
        .then((res) => {
          console.log(res.data)
          setDiscountLoader(false)
          setIsEditingDiscount(false)
        })
        .catch((err) => {
          console.log(err)
          setDiscountLoader(false)
          setIsEditingDiscount(false)
        })
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="lg:flex-[0.6]">
          <span className=" text-xl font-semibold mb-3">Edit User</span>
          <div className=" rounded-lg shadow-shadow-tertiary p-6 mt-3 bg-white">
            <div className="text-sm text-primary-text font-normal ">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
                <div className="flex-[0.4]">Account Name</div>
                {!isEditingUser ? (
                  <div className="flex flex-[0.6] justify-between items-center">
                    <div className="">{ActiveUser?.name}</div>
                    <span onClick={() => setIsEditingUser(true)} className="cursor-pointer">
                      <Image height={16} width={16} src={EditIcon} alt="" />
                    </span>
                  </div>
                ) : (
                  <div className="flex-[0.6]">
                    <input
                      className=" bg-[#F3F5FF] h-11 rounded-lg w-full p-3 outline-none border-0.5 border-[#ACB1C1] "
                      type="text"
                      value={UserName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <div className=" inline-flex gap-2 mt-2">
                      <Button
                        className="px-6 py-2 rounded"
                        onClick={() => {
                          handleSaveUserName()
                        }}
                        disabled={UserName?.length === 0}
                        loading={UserNameLoader}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setIsEditingUser(false)}
                        variant="blueOutline"
                        className="px-6 py-2 rounded"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3 mb-4">
                <div className="flex-[0.4]">Wallet Address</div>
                <div className="flex-[0.6]">
                  {width > 1250 ? ActiveUser?.address : trimAddress(ActiveUser?.address)}
                </div>
              </div>
              <div className="flex gap-3 mb-4">
                <div className="flex-[0.4]">Subscription</div>
                <div className="flex-[0.6]">Active</div>
              </div>
              <div className="flex gap-3 mb-4">
                <div className="flex-[0.4]">Subscription Plan</div>
                <div className="flex-[0.6]">Monthly</div>
              </div>
              <div className="flex gap-3 mb-4">
                <div className="flex-[0.4]">Subscription Start Date</div>
                <div className="flex-[0.6]">25 Jan 2023, 01:00 PM</div>
              </div>
              <div className="flex gap-3 mb-4">
                <div className="flex-[0.4]">Account Creation Date</div>
                <div className="flex-[0.6]">
                  {moment(ActiveUser?.created_at).format('DD MMM YYYY, HH:mm A')}
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-[0.4]">Active</div>
                <div className="flex-[0.6]">
                  <Switch
                    onChange={setActive}
                    checked={active}
                    onColor="#3052FF"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    handleDiameter={16}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:flex-[0.4]">
          <span className=" text-xl font-semibold mb-3">Credits & Discount</span>
          <div className=" rounded-lg shadow-shadow-tertiary p-6 mt-3 bg-white">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-4">
              <div className="flex-[0.3]">Credits Balance</div>
              {!isEditingCredit ? (
                <div className="flex justify-between items-center gap-2 md:w-1/2">
                  <div>{ActiveUser?.credit?.balance || 0}</div>
                  <span onClick={() => setIsEditingCredit(true)} className="cursor-pointer">
                    <Image height={16} width={16} src={EditIcon} alt="" />
                  </span>
                </div>
              ) : (
                <div className="flex-[0.6]">
                  <input
                    className="bg-[#F3F5FF] h-11 rounded-lg w-full p-3 outline-none border-0.5 border-[#ACB1C1] "
                    type="text"
                    value={Credits}
                    onChange={(e) => setCredits(e.target.value)}
                  />
                  <div className="inline-flex gap-2 mt-2">
                    <Button
                      className="px-6 py-2 rounded"
                      onClick={() => handleSaveCredits()}
                      loading={CreditsLoader}
                      disabled={Credits?.length === 0}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setIsEditingCredit(false)}
                      variant="blueOutline"
                      className="px-6 py-2 rounded"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 ">
              <div className="flex-[0.3]">Discount %</div>
              {!isEditingDiscount ? (
                <div className="flex justify-between items-center gap-2 md:w-1/2">
                  <div>{ActiveUser?.discount?.discount || 0}</div>
                  <span onClick={() => setIsEditingDiscount(true)} className="cursor-pointer">
                    <Image height={16} width={16} src={EditIcon} alt="" />
                  </span>
                </div>
              ) : (
                <div className="flex-[0.6]">
                  <input
                    className="bg-[#F3F5FF] h-11 rounded-lg w-full p-3 outline-none border-0.5 border-[#ACB1C1] "
                    type="text"
                    value={Discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                  <div className="inline-flex gap-2 mt-2">
                    <Button
                      className="px-6 py-2 rounded"
                      onClick={() => handleSaveDiscount()}
                      loading={DiscountLoader}
                      disabled={Discount?.length === 0}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setIsEditingDiscount(false)}
                      variant="blueOutline"
                      className="px-6 py-2 rounded"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:gap-8">
        <div className="lg:flex-[0.6] w-full">
          <div className="flex justify-between items-center">
            <span className=" text-xl font-semibold mb-3">Assigned NFTs</span>
            {!isEditingNFT && (
              <span onClick={() => setisEditingNFT(true)} className=" cursor-pointer">
                <Image height={24} width={24} src={EditIcon} alt="" />
              </span>
            )}
          </div>
          <div className=" rounded-lg shadow-shadow-tertiary p-6 bg-white mt-3">
            <div className="flex flex-wrap gap-2">
              <span className="relative">
                <Image height={96} width={96} src={NFT1} alt="" />
                {isEditingNFT && <input className="absolute top-1 left-1" type="checkbox" />}
              </span>
              <span className="relative">
                <Image height={96} width={96} src={NFT2} alt="" />
                {isEditingNFT && <input className="absolute top-1 left-1" type="checkbox" />}
              </span>
              <span className="relative">
                <Image height={96} width={96} src={NFT3} alt="" />
                {isEditingNFT && <input className="absolute top-1 left-1" type="checkbox" />}
              </span>
              <span className="relative">
                <Image height={96} width={96} src={NFT4} alt="" />
                {isEditingNFT && <input className="absolute top-1 left-1" type="checkbox" />}
              </span>
            </div>
            {isEditingNFT && (
              <div className=" inline-flex gap-2 mt-4">
                <Button className="px-6 py-2 rounded">Save</Button>
                <Button
                  onClick={() => setisEditingNFT(false)}
                  variant="blueOutline"
                  className="px-6 py-2 rounded"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className=" hidden lg:block flex-[0.4]"></div>
      </div>
    </div>
  )
}

export default EditPage
