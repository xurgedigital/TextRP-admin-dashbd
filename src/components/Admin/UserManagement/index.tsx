import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import SearchIcon from '@public/Icons/searchIcon.svg'
import Button from '@/components/UI/Button'
import EditIcon from '@public/Icons/editIcon.svg'
import { AiOutlineLoading } from 'react-icons/ai'
import useWidth from '@/hooks/useWidth'
import { useRouter } from 'next/router'
import { swrFetcher, trimAddress } from '@/helpers'
import useSWR from 'swr'
import Pagination from '@/components/common/Pagination'

const UserManagementComp = () => {
  const [query, setQuery] = useState('')
  const [searchText, setSearchText] = useState('')
  const width = useWidth()
  const router = useRouter()
  const [page, setPage] = useState(1)
  const LIMIT = 10

  const endPoint = useMemo(
    () => `/api/admin/users?search=${searchText}&page=${page}&limit=${LIMIT}`,
    [page, searchText]
  )
  const { data: UserList, isLoading, mutate } = useSWR(endPoint, swrFetcher)

  return (
    <>
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
            <Button className="px-6" onClick={() => setSearchText(query)}>
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
                              router.push(`user-management/${user?.id}`)
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
          {isLoading && !UserList?.data && (
            <div className="flex w-full justify-center items-center p-4 bg-white">
              <div className="inline-flex h-full">
                <div className="animate-spin inline-flex h-full">
                  <AiOutlineLoading style={{ fontSize: '26px', color: '#3052FF' }} />
                </div>{' '}
                &nbsp; Fetching Data...
              </div>
            </div>
          )}
          {UserList?.data && <Pagination meta={UserList?.meta} page={page} setPage={setPage} />}
        </div>
      </div>
    </>
  )
}

export default UserManagementComp
