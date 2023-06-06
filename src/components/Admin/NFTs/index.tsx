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
}: {
  setEdit: Dispatch<SetStateAction<any>>
  setShowCreateNFT: Dispatch<SetStateAction<boolean>>
  edit?: any
}) => {
  const [title, setTitle] = useState<string>(edit?.title)
  const [description, setDescription] = useState<string>(edit?.description)
  const [contract_address, setContractAddress] = useState<string>(edit?.contract_address)
  const [taxon, setTaxon] = useState<string>(edit?.taxon)
  const [isSaving, setIsSaving] = useState(false)
  const [title_error, setTitleError] = useState(false)
  const [description_error, setDescriptionError] = useState(false)
  const [contract_address_error, setContractAddressError] = useState(false)
  const [taxon_error, setTaxonError] = useState(false)

  const handleCreate = async () => {
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
    await axios.post(`/api/admin/supported_nfts/${edit?.id}`, {
      title,
      description,
      contract_address,
      taxon,
    })
    setShowCreateNFT(false)
    setEdit(false)
    setIsSaving(false)
  }

  return (
    <div className="w-full sm:w-auto">
      <p className="text-2xl font-semibold">Create NFT</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 bg-white mt-3 w-full">
        <CommonInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex. "
          fullWidth
        />
        {title_error ? (
          <p className=" sm:pl-20 md:pl-28 text-xs text-red-500">Enter valid Title!</p>
        ) : null}
        <CommonInput
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex. "
          fullWidth
        />
        {description_error ? (
          <p className=" sm:pl-20 md:pl-28 text-xs text-red-500">Enter valid Description!</p>
        ) : null}
        <CommonInput
          label="Contract Address"
          value={contract_address}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="Ex. "
          fullWidth
        />
        {contract_address_error ? (
          <p className=" sm:pl-20 md:pl-28 text-xs text-red-500">Enter valid Contract Address!</p>
        ) : null}
        <CommonInput
          label="Taxon"
          value={taxon}
          onChange={(e) => setTaxon(e.target.value)}
          placeholder="Ex. "
          fullWidth
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

const NFTsComp = () => {
  const [showCreateNFT, setShowCreateNFT] = useState(false)
  const [edit, setEdit] = useState()
  const { data: NftData, isLoading, mutate } = useSWR('/api/admin/supported_nfts', swrFetcher)

  useEffect(() => {
    if (!edit) mutate()
  }, [edit])
  return (
    <>
      {showCreateNFT || edit ? (
        <CreateNFTSection setShowCreateNFT={setShowCreateNFT} edit={edit} setEdit={setEdit} />
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
                </tr>
              </thead>
              <tbody>
                {NftData && NftData?.data?.length > 0 ? (
                  NftData?.data?.map((ci: any, i: number) => (
                    <tr key={i} className="text-sm font-normal">
                      <td>{ci?.title}</td>
                      <td colSpan={2}>{ci?.description}</td>
                      <td className="break-all text-secondary-text">{ci?.contract_address}</td>
                      <td className="break-all text-secondary-text">{ci?.taxon}</td>
                      <td className="px-4 py-3 text-end">
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
