import { useEffect, useState } from 'react'
import Img1 from '@public/Images/nft/img1.svg'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'

const NFTsComp = () => {
  const [NftData, setNftData] = useState<any>([1, 2, 3, 4])

  const router = useRouter()
  const getNFT = () => {
    axios
      .get('/api/admin/supported_nfts')
      .then((res) => {
        setNftData(res.data)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.clear()
          router.push('/login')
        }
      })
  }

  const makeNFT = () => {
    const payload = {
      title: 'Test NFT 4',
      description:
        'dhgqgdh ad qid jqkdjkdj ddsdsc hjqsjcj qsckjaskc jkcj qk cjkasjck jhs sjhjf hjashfja fj saddad',
      contract_address: 'powhfjbhvadddaddxddadad0002e9',
      taxon: '0c98wycugehdsbjncdadaq231',
    }
    axios
      .post('/api/admin/supported_nfts', payload)
      .then((res) => {
        // setNftData(res.data)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.clear()
          router.push('/login')
        }
      })
  }

  useEffect(() => {
    getNFT()
  }, [])

  return (
    <div className="w-full">
      <p className="text-xl sm:text-2xl font-semibold mb-3">NFTs</p>
      <div className="w-full bg-white p-6 overflow-auto">
        <table className="table-fixed w-full border-separate min-w-[800px] border-spacing-4">
          <thead>
            <tr className="text-sm font-semibold">
              <th className="min-w-[7rem] text-left mb-4">
                {' '}
                <div onClick={() => makeNFT()}>NFT Image</div>
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
  )
}

export default NFTsComp
