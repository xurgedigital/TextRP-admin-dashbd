import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Img1 from '@public/Images/nft/img1.svg'
import Image from 'next/image'
import axios from 'axios'
import Button from '@/components/UI/Button'
import CommonInput from '@/components/common/CommonInput'
import { swrFetcher } from '@/helpers'
import useSWR from 'swr'
import { isValidClassicAddress } from 'ripple-address-codec'
import EditIcon from '@public/Icons/editIcon.svg'

const CreateNFTSection = ({
  setShowCreateNFT,
  setEdit,
  edit,
  showCreateNFT,
}: {
  setEdit: Dispatch<SetStateAction<any>>
  setShowCreateNFT: Dispatch<SetStateAction<boolean>>
  edit?: any
  showCreateNFT: boolean
}) => {
  const { data: featuresData, isLoading } = useSWR('/api/available-features', swrFetcher)
  const [title, setTitle] = useState<string>(edit?.title)
  const [description, setDescription] = useState<string>(edit?.description)
  const [contract_address, setContractAddress] = useState<string>(edit?.contract_address)
  const [taxon, setTaxon] = useState<string>(edit?.taxon)
  const [features, setFeatures] = useState<string>(
    Array.isArray(edit?.features) ? edit?.features[0] : edit?.features
  )
  const [image_link, setImageLink] = useState<string>(edit?.image_link || '')
  const [isSaving, setIsSaving] = useState(false)
  const [title_error, setTitleError] = useState(false)
  const [description_error, setDescriptionError] = useState(false)
  const [contract_address_error, setContractAddressError] = useState(false)
  const [taxon_error, setTaxonError] = useState(false)
  const [rules, setRules] = useState<string[]>(['always enabled', 'always disabled', 'NFT enabled'])
  const [selectedRule, setSelectedRule] = useState<string>('')

  let apiEndpoint: string

  const handleCreate = async () => {
    if (showCreateNFT) {
      apiEndpoint = `/api/admin/supported_nfts`
    } else {
      apiEndpoint = `/api/admin/supported_nfts/${edit?.id}`
    }

    setIsSaving(true)
    if (contract_address && !isValidClassicAddress(contract_address)) {
      setContractAddressError(true)
      setIsSaving(false)
      return
    }
    if (!title || !description || !taxon) {
      if (!title) setTitleError(true)
      if (!description) setDescriptionError(true)
      if (!taxon) setTaxonError(true)
      setIsSaving(false)
      return
    }
    await axios.post(apiEndpoint, {
      title,
      description,
      contract_address,
      taxon,
      features,
      image_link,
    })
    setShowCreateNFT(false)
    setEdit(false)
    setIsSaving(false)
  }
  // console.log(features, 'FFF')

  const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)

  return (
    <div className="w-full sm:w-auto">
      <p className="text-2xl font-semibold"> {edit ? 'Edit Feature' : 'Create Feature'}</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 bg-white mt-3 w-full">
        <div
          className={`text-sm font-normal flex flex-col sm:flex-row justify-between items-start mt-3`}
        >
          <label className="pr-6 text-black capitalize">Feature</label>
          <div className="relative w-full sm:w-auto">
            <select
              onClick={(e) => setFeatures((e.target as HTMLInputElement).value)}
              className="p-3 rounded-lg outline-none border border-primary-gray min-w-full sm:min-w-[290px] lg:min-w-[360px] overflow-y-auto"
            >
              {featuresData?.features?.map((feature: string, i: number) => (
                <option
                  selected={feature === features}
                  key={i}
                  value={feature}
                  className="capitalize cursor-pointer border-b"
                >
                  {capitalizeFirstLetter(feature.replace('_', ' '))}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className={`text-sm font-normal flex flex-col sm:flex-row justify-between items-start mt-3`}
        >
          <label className="pr-6 text-black capitalize">Rule</label>
          <div className="relative w-full sm:w-auto">
            <select
              onClick={(e) => 
                setSelectedRule((e.target as HTMLInputElement).value)
              }
              className="p-3 rounded-lg outline-none border border-primary-gray min-w-full sm:min-w-[290px] lg:min-w-[360px] overflow-y-auto"
            >
              {rules.map((rule: string, i: number) => (
                <option key={i} value={rule} className="capitalize cursor-pointer border-b">
                  {capitalizeFirstLetter(rule)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <CommonInput
          label="NFT Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex. "
          disabled={selectedRule !== rules[2]}
          fullWidth
        />
        {title_error ? (
          <p className=" sm:pl-20 md:pl-28 text-xs text-red-500">Enter valid Title!</p>
        ) : null}
        <CommonInput
          label="NFT Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex. "
          disabled={selectedRule !== rules[2]}
          fullWidth
        />
        {description_error ? (
          <p className=" sm:pl-20 md:pl-28 text-xs text-red-500">Enter valid Description!</p>
        ) : null}
        <CommonInput
          label="NFT Contract Address"
          value={contract_address}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="Ex. "
          disabled={selectedRule !== rules[2]}
          fullWidth
        />
        {contract_address_error ? (
          <p className=" sm:pl-20 md:pl-28 text-xs text-red-500">Enter valid Contract Address!</p>
        ) : null}
        <CommonInput
          label="NFT Taxon"
          value={taxon}
          onChange={(e) => setTaxon(e.target.value)}
          placeholder="Ex. "
          fullWidth
          disabled={selectedRule !== rules[2]}
        />
        <CommonInput
          label="NFT Image Link"
          value={image_link}
          onChange={(e) => setImageLink(e.target.value)}
          placeholder="Ex. "
          fullWidth
          disabled={selectedRule !== rules[2]}
        />

        {taxon_error ? (
          <p className=" sm:pl-20 md:pl-28 text-xs text-red-500">Enter valid Taxon!</p>
        ) : null}

        <div className="flex items-center gap-2 mt-4 sm:ml-24">
          <Button onClick={handleCreate} loading={isSaving} className="truncate px-4 py-2 rounded">
            {'Save'}
          </Button>
          <Button
            onClick={() => {
              setEdit(undefined)
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

const NFTFeaturesComp = () => {
  const [showCreateNFT, setShowCreateNFT] = useState(false)
  const [edit, setEdit] = useState()
  const { data: NftData, isLoading, mutate } = useSWR('/api/admin/supported_nfts', swrFetcher)

  useEffect(() => {
    if (!edit) mutate()
  }, [edit])
  return (
    <>
      {showCreateNFT || edit ? (
        <CreateNFTSection
          setShowCreateNFT={setShowCreateNFT}
          edit={edit}
          setEdit={setEdit}
          showCreateNFT={showCreateNFT}
        />
      ) : (
        <div className="w-full">
          <div className="flex flex-col md:flex-row w-full gap-y-2 mb-3  md:items-center md:justify-between">
            <p className="text-xl sm:text-2xl font-semibold">Features</p>
            <Button
              onClick={() => setShowCreateNFT((prev) => !prev)}
              className="truncate px-4 py-2 mr-0 w-max rounded"
            >
              Add Feature Permission
            </Button>
          </div>
          <div className="w-full bg-white mt-8 overflow-auto">
            <table border={1} className="table-fixed w-full min-w-[800px]  border-spacing-4 border-[2px] ">
              <thead>
                <tr className="bg-blue-100 text-sm font-semibold">
                  <th className=" border-[1px] py-2 px-4  text-left mb-4">
                    {' '}
                    <div>Features</div>
                  </th>
                  <th className="border-[1px] p-2 text-left mb-4">
                    {' '}
                    <div>Rules</div>
                  </th>
                  <th className="border-[1px] p-2  text-left mb-4">
                    {' '}
                    <div>NFT Title</div>
                  </th>
              
                  <th className="border-[1px] p-2  text-left mb-4">
                    {' '}
                    <div>Address</div>
                  </th>
                  <th className="w-[60px] border-[1px] p-2  text-left mb-4">
                    {' '}
                    <div>Taxon</div>
                  </th>
                  <th className="border-[1px] w-[30px] p-2  text-left mb-4">
                    {' '}
                    <div></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {NftData && NftData?.data?.length > 0 ? (
                  NftData?.data?.map((ci: any, i: number) => (
                    <tr key={i} className="text-sm p-4 font-normal">
                      <td className="break-all p-4">
                        {ci?.features
                          ? ci?.features?.map((f: string, i: number) => (
                              <span key={i}>{`${f} `}</span>
                            ))
                          : '-'}
                      </td>
                      <td className='p-4'>Always Enabled</td>
                      <td className='p-4'>{ci?.title}</td>
                      <td className="p-4 w-[300px] overflow-hidden">{ci?.contract_address}</td>
                      <td className="p-4 text-center">{ci?.taxon}</td>

                      <td className="px-4 py-4 text-end">
                        <div className="flex justify-end ">
                          <Image
                            onClick={() => {
                              setEdit(ci)
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
                  ))
                ) : (
                  <tr className="p-4">
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

export default NFTFeaturesComp
