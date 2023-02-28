import React, { useState } from 'react'
import Edit from "@public/Icons/edit.svg";
import Image from "next/image";

interface IRowprops {
    packageName: string;
    packageDescription: string;
    numberOfCredits: string;
    price: string;

}
const SubscriptionItems = [
    {
        packageName: "Monthly",
        packageDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus odio lectus, eu mattis nulla laoreet id. Phasellus imperdiet erat risus, sed sagittis justo blandit.",
        numberOfCredits: "25",
        price: "6.99",
    },
    {
        packageName: "Semi-Annual",
        packageDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus odio lectus, eu mattis nulla laoreet id. Phasellus imperdiet erat risus, sed sagittis justo blandit.",
        numberOfCredits: "25",
        price: "6.99",
    },
    {
        packageName: "Annual",
        packageDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus odio lectus, eu mattis nulla laoreet id. Phasellus imperdiet erat risus, sed sagittis justo blandit.",
        numberOfCredits: "25",
        price: "6.99",
    },
]

const SubscriptionComp = () => {

    const Row = (props: IRowprops) => {
        const { packageName, packageDescription, numberOfCredits, price } = props
        const [isEditable, setIsEditable] = useState(false)

        return (
            <tr className="text-sm font-normal">
                <td className='pb-4'>
                    {isEditable ?
                        <div className='flex items-start h-[9.5rem]'>{packageName}</div> : <span>{packageName}</span>
                    }
                </td>
                <td className='pb-4'>
                    {
                        isEditable ? (
                            <div className='w-full flex flex-col justify-start h-[9.5rem] pr-3'>
                                <textarea
                                    rows={3}
                                    placeholder={packageDescription}
                                    value={packageDescription}
                                    className={`p-3 w-[17rem] rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text`}
                                />
                                <div className='flex items-center gap-2 mt-4'>
                                    <button onClick={() => setIsEditable(prev => !prev)} className="bg-primary-blue text-white px-6 py-2 text-sm font-semibold rounded">{"Save"}</button>
                                    <button onClick={() => setIsEditable(prev => !prev)} className="border border-primary-blue text-primary-blue px-6 py-2 text-sm font-semibold rounded">{"Cancel"}</button>
                                </div>
                            </div>
                        ) : (
                            <span>
                                {packageDescription}
                            </span>
                        )}
                </td>
                <td className='pb-4 text-secondary-text'>
                    {
                        isEditable ? (
                            <div className='w-full flex items-start h-[9.5rem] pr-3'>
                                <input
                                    placeholder={numberOfCredits}
                                    value={numberOfCredits}
                                    className={`p-3 rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text`}
                                />
                            </div>
                        ) : (
                            <span>
                                {numberOfCredits}
                            </span>
                        )}
                </td>
                <td className='pb-4 text-secondary-text'>
                    {
                        isEditable ? (
                            <div className='w-full flex items-start h-[9.5rem]'>
                                <input
                                    placeholder={price}
                                    value={price}
                                    className={`p-3 rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text`}
                                />
                            </div>
                        ) : (
                            <span>
                                {price}
                            </span>
                        )}
                </td>
                <td className='pb-4'>
                    <div onClick={() => setIsEditable(prev => !prev)} className={`${isEditable ? "hidden" : "flex"} cursor-pointer flex w-full justify-end`}>
                        <Image
                            src={Edit}
                            alt={"edit"}
                            className=""
                            quality={100}
                        />
                    </div>
                </td>
            </tr>
        )
    }

    return (
        <div className='w-full'>
            <p className='text-2xl font-semibold'>Subscription Pricing</p>
            <div className=" w-full inline-block align-middle ">
                <div className=' overflow-auto shadow-shadow-tertiary rounded-lg p-6 pb-2 bg-white mt-3'>
                    <table className="table-auto ">
                        <thead>
                            <tr className='text-sm font-semibold'>
                                <th> <div className='min-w-[9rem] text-left mb-4'>Package Name</div></th>
                                <th> <div className='min-w-[10rem] text-left mb-4'>Package Description</div></th>
                                <th> <div className='min-w-[9rem] text-left mb-4'>Number of Credits</div></th>
                                <th> <div className='min-w-[9rem] text-left mb-4'>Price (in USD $) </div></th>
                                <th> <div className='w-10 mb-4'></div> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {SubscriptionItems.map((si, i) => (
                                <Row {...si} key={i} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionComp