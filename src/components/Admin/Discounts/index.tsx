import React, { useEffect, useState } from 'react'
import CommonInput from '@/components/common/CommonInput';
import axios from "axios";
import { useRouter } from 'next/router';
import Button from '@/components/UI/Button';
import Pagination from '@/components/common/Pagination';
import Loader from '@/components/common/Loader';

const DiscountComp = () => {
    const [showNewDiscount, setShowNewDiscount] = useState(false)
    const [loading, setLoading] = useState(false)
    const [discountData, setDiscountData] = useState<{
        discount: number;
        address: string
    }[]>([])
    const [meta, setMeta] = useState<any>(null)
    const router = useRouter()
    const [fetch, setFetch] = useState(false)
    const [page, setPage] = useState(1)
    const LIMIT = 10


    const getDiscounts = () => {
        setLoading(true)
        axios.get(`/api/admin/discounts?page=${page}&limit=${LIMIT}`).then((res) => {
            setDiscountData(res.data.data)
            setMeta(res.data.meta)
            setLoading(false)
        }).catch(
            (err) => {
                console.log(err);
                setLoading(false)
                if (err.response.status === 401) {
                    localStorage.clear()
                    router.push("/login")
                }
            }
        )
    };

    useEffect(() => {
        getDiscounts()
    }, [fetch, page])


    const SetNewDiscount = () => {
        const [address, setAddress] = useState("")
        const [discount, setDiscount] = useState(0)
        const [isSaving, setIsSaving] = useState(false)

        const handleSetDiscount = () => {
            setIsSaving(true)
            axios.post(`/api/admin/discounts`, {
                address: address,
                discount: discount,
            }).then((res) => {
                console.log("set_discount", res)
                setIsSaving(false)
                setShowNewDiscount(prev => !prev)
                setFetch(prev => !prev)
            }).catch(
                (err) => {
                    setIsSaving(false)
                    console.log(err);
                }
            )
        };

        return (
            <div className='w-full sm:w-auto'>
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
                    <div className='flex items-center gap-2 mt-4 sm:ml-28'>
                        <Button loading={isSaving} onClick={handleSetDiscount} className="truncate px-4 py-2  rounded">{"Save"}</Button>
                        <Button onClick={() => setShowNewDiscount(prev => !prev)} variant="blueOutline" className="px-4 py-2 rounded">{"Cancel"}</Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {
                showNewDiscount ? (<SetNewDiscount />) : (
                    <div className='w-full'>
                        <div className='flex flex-col md:flex-row w-full max-w-[600px] gap-y-2  md:items-center md:justify-between'>
                            <p className='text-xl sm:text-2xl font-semibold'>Running Discounts</p>
                            <button onClick={() => setShowNewDiscount(prev => !prev)} className="bg-primary-blue truncate text-white px-8 py-2 text-sm font-semibold rounded w-max">{"Set New Discount"}</button>
                        </div>
                        <div className="max-w-[600px] w-full inline-block align-middle ">
                            <div className='overflow-auto w-full rounded-lg rounded-b-none border border-b-0  border-primary-gray mt-3'>
                                <table className="table-auto w-full ">
                                    <thead className='bg-transparent border-b border-primary-gray'>
                                        <tr className='text-sm font-semibold'>
                                            <th> <div className='min-w-[9rem] text-left py-3 pl-4'>Discount %</div></th>
                                            <th> <div className='min-w-full text-left py-3 pr-4'>Wallet address</div></th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-primary-gray bg-white w-full'>
                                        {discountData && discountData?.length > 0 && discountData?.map((di, i) => (
                                            <tr key={i} className="text-sm font-normal text-secondary-text">
                                                <td className='pb-4 py-3 pl-4'>{di.discount}</td>
                                                <td className='pb-4 py-3 pr-4'>{di.address}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {loading ? (
                                <div className='w-full flex justify-center items-center p-6 bg-white'>
                                    <Loader />
                                </div>
                            ) : null}
                            <Pagination className='border border-primary-gray gap-6 sm:gap-0 justify-center sm:justify-between bg-white rounded-b-lg' meta={meta} page={page} setPage={setPage} />
                        </div>
                    </div>

                )
            }
        </>
    )
}

export default DiscountComp