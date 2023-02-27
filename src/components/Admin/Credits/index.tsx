import React from 'react'
import Edit from "@public/Icons/edit.svg";
import Image, { StaticImageData } from "next/image";


const CreditItems = [
    {
        packageName: "Credits Package 1",
        numberOfCredits1: 50,
        numberOfCredits2: 3,
    },
    {
        packageName: "Credits Package 2",
        numberOfCredits1: 60,
        numberOfCredits2: 5,
    },
    {
        packageName: "Credits Package 3",
        numberOfCredits1: 70,
        numberOfCredits2: 2,
    },
    {
        packageName: "Credits Package 4",
        numberOfCredits1: 40,
        numberOfCredits2: 6,
    },
]

const CreditComp = () => {
    return (
        <div>
            <p className='text-2xl font-semibold'>Credits Pricing</p>
            <div className='shadow-shadow-tertiary rounded-lg p-6 bg-white mt-3'>
                <table className="table-fixed ">
                    <thead>
                        <tr className='text-sm font-semibold'>
                            <th> <div className='min-w-[9rem] text-left mb-4'>Package Name</div></th>
                            <th>  <div className='min-w-[9rem] text-left mb-4'>Number of Credits</div></th>
                            <th> <div className='min-w-[9rem] text-left mb-4'>Number of Credits</div></th>
                            <th> <div className='w-20 mb-4'></div> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {CreditItems.map((ci, i) => (
                            <tr key={i} className="text-sm font-normal">
                                <td className='pb-4'>{ci.packageName}</td>
                                <td className='pb-4'>{ci.numberOfCredits1}</td>
                                <td className='pb-4'>{ci.numberOfCredits2}</td>
                                <td className='pb-4'>
                                    <div className='cursor-pointer'>
                                        <Image
                                            src={Edit}
                                            alt={"edit"}
                                            className=""
                                            quality={100}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CreditComp