import { Dispatch, SetStateAction, useState } from 'react'
import Img1 from '@public/Images/nft/img1.svg'
import Image from 'next/image'
import axios from 'axios'
import Button from '@/components/UI/Button'
import CommonInput from '@/components/common/CommonInput'
import { swrFetcher } from '@/helpers'
import useSWR from 'swr'
import { isValidClassicAddress } from 'ripple-address-codec'

const CreateNFTSection = ({
  setShowCreateNFT,
}: {
  setShowCreateNFT: Dispatch<SetStateAction<boolean>>
}) => {
  const [address, setAddress] = useState<string>()
  const [isSaving, setIsSaving] = useState(false)
  const [addressError, setAddressError] = useState(false)

  const handleCreate = () => {
    setIsSaving(true)
    if (address && !isValidClassicAddress(address)) {
      setAddressError(true)
      setIsSaving(false)
      return
    }
    //  todo: API
  }

  return (
    <div className="w-full sm:w-auto">
      <p className="text-2xl font-semibold">Create NFT</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 bg-white mt-3 w-full">
        <CommonInput
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Ex. 0xcdc1db9bf67E0f71e8E2e166f"
          fullWidth
        />
        {addressError ? (
          <p className=" sm:pl-20 md:pl-28 text-xs text-red-500">Enter valid XRP address !</p>
        ) : null}
        <div className="flex items-center gap-2 mt-4 sm:ml-24">
          <Button onClick={handleCreate} loading={isSaving} className="truncate px-4 py-2 rounded">
            {'Save'}
          </Button>
          <Button
            onClick={() => {
              setShowCreateNFT((prev) => !prev)
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

const NFTsComp = () => {
  const [showCreateNFT, setShowCreateNFT] = useState(false)
  const { data: NftData, isLoading, mutate } = useSWR('/api/admin/supported_nfts', swrFetcher)

  return (
    <>
      {showCreateNFT ? (
        <CreateNFTSection setShowCreateNFT={setShowCreateNFT} />
      ) : (
        <div className="w-full">
          <div className="flex flex-col md:flex-row w-full gap-y-2 mb-3  md:items-center md:justify-between">
            <p className="text-xl sm:text-2xl font-semibold">NFTs</p>
            <Button
              onClick={() => setShowCreateNFT((prev) => !prev)}
              className="truncate px-4 py-2 w-max rounded"
            >
              {'Create NFTs'}
            </Button>
          </div>
          <div className="w-full bg-white p-6 overflow-auto">
            <table className="table-fixed w-full border-separate min-w-[800px] border-spacing-4">
              <thead>
                <tr className="text-sm font-semibold">
                  <th className="min-w-[7rem] text-left mb-4">
                    {' '}
                    <div>NFT Image</div>
                  </th>
                  <th className="min-w-[7rem] text-left mb-4">
                    {' '}
                    <div>NFT Title</div>
                  </th>
                  <th className="min-w-[19rem] text-left mb-4" colSpan={2}>
                    {' '}
                    <div>NFT Description</div>
                  </th>
                  <th className="min-w-[7rem] text-left mb-4">
                    {' '}
                    <div>Address</div>
                  </th>
                  <th className="min-w-[7rem] text-left mb-4">
                    {' '}
                    <div>Taxon</div>
                  </th>
                  <th className="min-w-[7rem] text-left mb-4">
                    {' '}
                    <div>Remaining Count</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {NftData && NftData?.data?.length > 0 ? (
                  NftData?.data?.map((ci: any, i: number) => (
                    <tr key={i} className="text-sm font-normal">
                      <td>
                        <Image
                          src={Img1}
                          alt="arrow-left"
                          className="cursor-pointer object-cover h-24 w-24"
                          quality={100}
                        />
                      </td>
                      <td>{ci?.title}</td>
                      <td colSpan={2}>{ci?.description}</td>
                      <td className="break-all text-secondary-text">{ci?.contract_address}</td>
                      <td className="break-all text-secondary-text">{ci?.taxon}</td>
                      <td className="text-secondary-text">1000</td>
                    </tr>
                  ))
                ) : (
                  <tr className="w-full">
                    <td colSpan={7} className="w-full">
                      <div className="text-base font-medium w-full text-center p-8">No Data</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}

export default NFTsComp
