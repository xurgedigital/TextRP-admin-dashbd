import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@public/Icons/searchIcon.svg'
import Button from '@/components/UI/Button'
import EditIcon from '@public/Icons/editIcon.svg'
import EditPage from './EditPage'
import useWidth from '@/hooks/useWidth'
import axios from 'axios'
import { useRouter } from 'next/router'
import { swrFetcher, trimAddress } from '@/helpers'
import useSWR from 'swr'

const UserManagementComp = () => {
  const [openEditSection, setOpenEditSection] = React.useState(false)
  // const [UserList, setUserList] = useState<any>(null)
  const [ActiveEditId, setActiveEditId] = useState(0)
  const [ActiveUser, setActiveUser] = useState('')
  const [query, setQuery] = useState('')
  const [searchText, setSearchText] = useState('')
  const width = useWidth()
  const router = useRouter()

  const {
    data: UserList,
    isLoading,
    mutate,
  } = useSWR(`/api/admin/users?search=${searchText}`, swrFetcher)

  // const getUserList = () => {
  //   axios
  //     .get(`/api/admin/users`, { params: { name: query } })
  //     .then((res) => {
  //       setUserList(res.data)
  //       console.log('YYYYYY', res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       if (err.response.status === 401) {
  //         localStorage.clear()
  //         router.push('/login')
  //       }
  //     })
  // }

  // useEffect(() => {
  //   getUserList()
  // }, [])

  // const handleSearch = (e: any) => {
  //   let txt = e.target.value
  //   if (txt === '') {
  //     setQuery(txt)
  //     mutate()
  //   } else {
  //     setQuery(txt)
  //   }
  // }

  return (
    <>
      {!openEditSection ? (
        <div className="w-full">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-3">
            <span className=" text-xl font-semibold">User Management</span>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="flex items-center border border-[#ACB1C1] rounded h-11 overflow-hidden bg-white w-full md:w-[280px] ">
                <span className=" min-w-fit mr-2.5 ml-3">
                  <Image src={SearchIcon} width={16} height={16} alt="Filter Icon" />
                </span>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setSearchText(query)
                    }
                  }}
                  type="text"
                  className=" border-none outline-none h-full w-full bg-transparent text-secondary-text text-sm "
                  placeholder="Name or wallet address"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Button className="p-3" onClick={() => setSearchText(query)}>
                Search
              </Button>
            </div>
          </div>
          <div className=" border-0.5 border-[#ACB1C1] rounded-lg ">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b-0.5 border-[#ACB1C1]">
                  <tr>
                    <th className="text-start text-sm text-semibold px-4 py-3 w-[30%] ">
                      Account Name
                    </th>
                    <th className="text-start text-sm text-semibold px-4 py-3 ">Wallet address</th>
                    <th className="text-start text-sm text-semibold px-4 py-3 w-[15%]">
                      Subscription
                    </th>
                    <th className="w-[10%]"></th>
                  </tr>
                </thead>
                <tbody>
                  {UserList?.data?.map((user: any, index: number) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b-0.5 border-[#ACB1C1] text-xs text-secondary-text font-normal "
                      >
                        <td className="px-4 py-3">
                          <div className="flex gap-2 flex-col md:flex-row min-w-max ">
                            <span>{user?.name}</span>
                            {/* <span>Last Name</span> */}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {width > 768 ? user?.address : trimAddress(user?.address)}
                        </td>
                        <td className="px-4 py-3">
                          {user?.subscriptions?.length > 0 ? 'Yes' : 'No'}
                        </td>
                        <td className="px-4 py-3 text-end">
                          <div className="flex justify-end ">
                            <Image
                              onClick={() => {
                                setActiveUser(user)
                                setOpenEditSection(true)
                                setActiveEditId(user?.id)
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
                  })}
                </tbody>
              </table>
            </div>
            {!UserList?.data && (
              <div className="flex w-full justify-center items-center p-4 bg-white">
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
            <div className="flex justify-between items-center px-4 py-3">
              <Button
                variant="blueOutline"
                className="py-2 px-4 rounded-lg"
                disabled={UserList?.meta?.current_page === 1}
              >
                Previous
              </Button>
              <div className="hidden md:block">
                Page {UserList?.meta?.current_page || '0'} of {UserList?.meta?.last_page || '0'}
              </div>
              <div className="md:hidden">
                {UserList?.meta?.current_page || '0'} / {UserList?.meta?.last_page || '0'}
              </div>
              <Button
                variant="blueOutline"
                className="py-2 px-4 rounded-lg"
                disabled={UserList?.meta?.current_page === UserList?.meta?.last_page}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <EditPage ActiveEditId={ActiveEditId} ActiveUser={ActiveUser} />
      )}
    </>
  )
}

export default UserManagementComp
