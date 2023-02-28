import React, { useState } from 'react'
import CommonInput from '@/components/common/CommonInput';


const DiscountItems = [
    {
        discount: "10 %",
        walletAddress: "0x05f7903195f7110e318fce46973aa72adeafd0e8"
    },
    {
        discount: "10 %",
        walletAddress: "0x05f7903195f7110e318fce46973aa72adeafd0e8"
    },
    {
        discount: "10 %",
        walletAddress: "0x05f7903195f7110e318fce46973aa72adeafd0e8"
    },
    {
        discount: "10 %",
        walletAddress: "0x05f7903195f7110e318fce46973aa72adeafd0e8"
    },
    {
        discount: "10 %",
        walletAddress: "0x05f7903195f7110e318fce46973aa72adeafd0e8"
    },
    {
        discount: "10 %",
        walletAddress: "0x05f7903195f7110e318fce46973aa72adeafd0e8"
    },
    {
        discount: "10 %",
        walletAddress: "0x05f7903195f7110e318fce46973aa72adeafd0e8"
    },
    {
        discount: "10 %",
        walletAddress: "0x05f7903195f7110e318fce46973aa72adeafd0e8"
    },
    {
        discount: "10 %",
        walletAddress: "0x05f7903195f7110e318fce46973aa72adeafd0e8"
    },
    {
        discount: "10 %",
        walletAddress: "0x05f7903195f7110e318fce46973aa72adeafd0e8"
    },

]


const DiscountComp = () => {
    const [showNewDiscount, setShowNewDiscount] = useState(false)

    const SetNewDiscount = () => {
        return (
            <div>
                <p className="text-2xl font-semibold mt-8">Set New Discount</p>
                <div className="shadow-shadow-tertiary rounded-lg p-6 bg-white mt-3">
                    <CommonInput
                        label="Discount %"
                        placeholder="10"
                        fullWidth
                    />
                    <CommonInput
                        label="Wallet address"
                        placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
                        fullWidth
                    />
                    <div className='flex items-center gap-2 mt-4 ml-28'>
                        <button onClick={() => setShowNewDiscount(prev => !prev)} className="bg-primary-blue text-white px-4 py-2 text-sm font-semibold rounded">{"Set New Discount"}</button>
                        <button  onClick={() => setShowNewDiscount(prev => !prev)} className="border border-primary-blue text-primary-blue px-4 py-2 text-sm font-semibold rounded">{"Cancel"}</button>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <>
            {
                showNewDiscount ? (<SetNewDiscount />) : (
                    <div>
                        <div className='flex items-center justify-between'>
                            <p className='text-2xl font-semibold'>Running Discounts</p>
                            <button onClick={() => setShowNewDiscount(prev => !prev)} className="bg-primary-blue text-white px-8 py-2 text-sm font-semibold rounded">{"Set New Discount"}</button>
                        </div>
                        <div className='rounded-lg border w-max border-primary-gray mt-3'>
                            <table className="table-fixed ">
                                <thead className='bg-transparent border-b border-primary-gray'>
                                    <tr className='text-sm font-semibold'>
                                        <th> <div className='min-w-[9rem] text-left py-3 pl-4'>Discount %</div></th>
                                        <th>  <div className='min-w-[10rem] text-left py-3 pr-4'>Wallet address</div></th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-primary-gray bg-white'>
                                    {DiscountItems.map((di, i) => (
                                        <tr key={i} className="text-sm font-normal text-secondary-text">
                                            <td className='pb-4 py-3 pl-4'>{di.discount}</td>
                                            <td className='pb-4 py-3 pr-4'>{di.walletAddress}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='flex items-center gap-6 sm:gap-0 sm:justify-between p-4 bg-white rounded-b-lg border-t border-primary-gray'>
                                <button className="border-2 border-primary-blue text-primary-blue px-4 py-2 text-sm font-semibold rounded-lg">{"Next"}</button>
                                <p className='text-secondary-text text-sm font-normal'>Page 1 of 10</p>
                                <button className="border-2 border-primary-blue text-primary-blue px-4 py-2 text-sm font-semibold rounded-lg">{"Previous"}</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default DiscountComp