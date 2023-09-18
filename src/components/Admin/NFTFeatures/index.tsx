/* eslint-disable no-console */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AiFillEdit, AiOutlineLoading } from 'react-icons/ai'
import Image from 'next/image'
import axios from 'axios'
import Button from '@/components/UI/Button'
import CommonInput from '@/components/common/CommonInput'
import { swrFetcher } from '@/helpers'
import useSWR from 'swr'
import { isValidClassicAddress } from 'ripple-address-codec'
import EditIcon from '@public/Icons/editIcon.svg'
import { toast } from 'react-toastify'
import { BsPencilFill, BsTrash2Fill, BsTrashFill } from 'react-icons/bs'

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
    Array.isArray(edit?.features) ? edit?.features[0] : edit?.feature
  )
  const [image_link, setImageLink] = useState<string>(edit?.image_link || '')
  const [nftLink, setNftLink] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [title_error, setTitleError] = useState(false)
  const [description_error, setDescriptionError] = useState(false)
  const [contract_address_error, setContractAddressError] = useState(false)
  const [taxon_error, setTaxonError] = useState(false)
  const [image_error, setImageError] = useState(false)
  const [rules, setRules] = useState<string[]>(['always enabled', 'always disabled', 'NFT enabled'])
  const [selectedRule, setSelectedRule] = useState<string>(edit?.rule || '')

  let apiEndpoint: string

  const handleCreate = async () => {
    if (showCreateNFT) {
      apiEndpoint = `/api/admin/supported_nfts`
    } else {
      apiEndpoint = `/api/admin/supported_nfts/${edit?.id}`
    }

    setIsSaving(true)
    // if (contract_address && !isValidClassicAddress(contract_address)) {
    //   setContractAddressError(true)
    //   setIsSaving(false)
    //   return
    // }

    if (selectedRule === rules[2]) {
      setTitleError(!title)
      setContractAddressError(!contract_address)
      setDescriptionError(!description)
      setTaxonError(!taxon)
      setIsSaving(false)

      if (title_error || contract_address_error || description_error || taxon_error) {
        return
      }
    }
    await axios
      .post(apiEndpoint, {
        title,
        description,
        contract_address,
        taxon,
        url: nftLink,
        feature: features,
        rule: selectedRule,
        image_link,
      })
      .then((res) => {
        toast.success(`Feature ${edit ? 'Updated' : 'Created'} Successfully`, {
          position: 'top-center',
        })
        setShowCreateNFT(false)
        setEdit(false)
      })
      .catch((e) => {
        console.log(e)
        toast.error(`Failed to ${edit ? 'edit' : 'create'} features, Please try again`, {
          position: 'top-center',
        })
      })
    setIsSaving(false)
  }

  const fetchDataFromURL = async () => {
    await axios
      .post('/api/URLtoNFTData/', {
        url: nftLink,
      })
      .then((res) => {
        console.log(res.data)
        setTitle(res.data.title)
        setDescription(res.data.description)
        setContractAddress(res.data.contract_address)
        setTaxon(res.data.taxon)
        setImageLink(res.data.image_link)
      })
      .catch((e) => {
        console.log(e)
        toast.error('Failed to fetch data from url, Please try again', {
          position: 'top-center',
        })
      })
    setIsSaving(false)
  }

  const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)  
  return (
    <div className="w-[600px] sm:w-auto">
      <p className="text-2xl font-semibold"> {edit ? 'Edit Feature' : 'Create Feature'}</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 bg-white mt-3 w-full">
        <div
          className={`text-sm font-normal flex flex-col sm:flex-row justify-between items-start mt-3`}
        >
          <label className="pr-6 text-black capitalize">Feature</label>
          <div className="relative w-full sm:w-auto">
            <select
              disabled={edit}
              onClick={(e) => setFeatures((e.target as HTMLInputElement).value)}
              className={`p-3 rounded-lg outline-none border border-primary-gray min-w-full sm:min-w-[290px] lg:min-w-[360px] overflow-y-auto ${
                edit ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'cursor-pointer'
              }`}
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
              onClick={(e) => setSelectedRule((e.target as HTMLInputElement).value)}
              className="p-3 rounded-lg outline-none border border-primary-gray min-w-full sm:min-w-[290px] lg:min-w-[360px] overflow-y-auto"
            >
              {rules.map((rule: string, i: number) => (
                <option
                  key={i}
                  selected={rule === selectedRule}
                  value={rule}
                  className="capitalize cursor-pointer border-b"
                >
                  {capitalizeFirstLetter(rule)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <CommonInput
          label="NFT URL"
          value={nftLink}
          onChange={(e) => setNftLink(e.target.value)}
          placeholder="Ex. "
          disabled={selectedRule !== rules[2]}
          fullWidth
          customStyle={{ width: '80px !important' }}
          hasFetchBtn={true}
          onFetchBtn={fetchDataFromURL}
        />{' '}
        <CommonInput
          label="NFT Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex. "
          disabled={selectedRule !== rules[2]}
          fullWidth
        />
        {title_error ? (
          <p className=" sm:pl-40 md:pl-38 text-xs text-red-500">Enter valid Title!</p>
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
          <p className=" sm:pl-20 md:pl-40 text-xs text-red-500">Enter valid Description!</p>
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
          <p className=" sm:pl-20 md:pl-40 text-xs text-red-500">Enter valid Contract Address!</p>
        ) : null}
        <CommonInput
          label="NFT Taxon"
          value={taxon}
          onChange={(e) => setTaxon(e.target.value)}
          placeholder="Ex. "
          fullWidth
          disabled={selectedRule !== rules[2]}
        />
        {taxon_error ? (
          <p className=" sm:pl-20 md:pl-40 text-xs text-red-500">Enter valid Taxon!</p>
        ) : null}
        <CommonInput
          label="NFT Image Link"
          value={image_link}
          onChange={(e) => setImageLink(e.target.value)}
          placeholder="Ex. "
          fullWidth
          optional={true}
          disabled={selectedRule !== rules[2]}
        />
        {image_error ? (
          <p className=" sm:pl-20 md:pl-40 text-xs text-red-500">Enter Image Link!</p>
        ) : null}
        <div className="flex items-center gap-2 mt-4 sm:ml-24">
          <Button onClick={handleCreate} loading={isSaving} className="truncate px-4 py-2 rounded">
            {'Save'}
          </Button>
          <Button
            onClick={() => {
              setEdit(undefined)
              setShowCreateNFT(false)
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
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    if (!edit) mutate()
  }, [edit, mutate])

  const deleteFeature = async (id: number) => {
    await axios
      .delete(`/api/admin/supported_nfts/${id}`)
      .then((res) => {
        mutate()
        toast.success('Feature Pack Deleted', { position: 'top-center' })
      })
      .catch((err) => toast.error('Cannot Delete Feature Pack', { position: 'top-center' }))
  }

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
            <p className="text-xl sm:text-2xl font-semibold">Feature Packs</p>
            {/* <Button
              onClick={() => setShowCreateNFT((prev) => !prev)}
              className="truncate px-4 py-2 mr-0 w-max rounded"
            >
              Create Feature Pack
            </Button> */}
          </div>
          <div className="w-full bg-white mt-8 overflow-auto rounded-md">
            <table className="table border-collapse rounded-md border-1 w-full border-spacing-4 border-[2px] ">
              <thead>
                <tr className="border-1 bg-blue-100 text-sm font-semibold">
                  <th className=" border-[1px] py-2 px-4  text-left mb-4">
                    {' '}
                    <div>Feature</div>
                  </th>
                  <th className="border-[1px] p-2 text-left mb-4">
                    {' '}
                    <div>Rules</div>
                  </th>
                  <th className="border-[1px] p-2  text-left mb-4">
                    {' '}
                    <div>NFT Title</div>
                  </th>

                  <th className="border-[1px] p-2 text-left mb-4">
                    {' '}
                    <div>Address</div>
                  </th>
                  <th className="w-[60px] border-[1px] p-2  text-left mb-4">
                    {' '}
                    <div>Taxon</div>
                  </th>
                  <th className="border-[1px] w-[30px] p-2 text-center mb-4">
                    {' '}
                    <div>Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="border-1">
                {NftData && NftData?.data?.length > 0 ? (
                  NftData?.data?.map((ci: any, i: number) => (
                    <tr
                      key={i}
                      className="text-sm p-4 font-normal border-b-0.5 border-[#ACB1C1] text-secondary-text"
                    >
                      <td className="break-all p-4" style={{ textTransform: 'capitalize' }}>
                        {ci?.feature || '--'}
                      </td>
                      <td className="p-4">{ci?.rule || '--'}</td>
                      <td className="p-4">{ci?.title}</td>
                      <td className="p-4 w-[300px] overflow-hidden">{ci?.contract_address}</td>
                      <td className="p-4 text-center">{ci?.taxon}</td>

                      <td className="px-4 py-4 w-[120px] text-end">
                        <div className="flex justify-around text-[16px] ">
                          <BsPencilFill
                            className="text-[blue] cursor-pointer"
                            onClick={() => {
                              setEdit(ci)
                            }}
                          />
                          {/* <BsTrashFill
                            onClick={() => deleteFeature(parseInt(ci.id))}
                            className="text-[blue] cursor-pointer"
                            style={{ color: 'Red' }}
                          /> */}
                          {/* <Image
                            onClick={() => {
                              setEdit(ci)
                            }}
                            className="min-w-fit cursor-pointer"
                            height={26}
                            width={26}
                            src={EditIcon}
                            alt=""
                          /> */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="p-4">
                    <td colSpan={7} className="w-full">
                      <div className="text-base font-medium w-full text-center p-8">
                        {' '}
                        {loading ? (
                          <div className="inline-flex h-full">
                            <div className="animate-spin inline-flex h-full">
                              <AiOutlineLoading style={{ fontSize: '26px', color: '#3052FF' }} />
                            </div>{' '}
                            &nbsp; Fetching Data...
                          </div>
                        ) : (
                          'No Data'
                        )}
                      </div>
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
