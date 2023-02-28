import React, { useState } from 'react'
import Edit from "@public/Icons/edit.svg";
import Image from "next/image";

interface IRowProps {
    packageName: string;
    numberOfCredits1: string;
    numberOfCredits2: string;
}

const CreditItems = [
    {
        packageName: "Credits Package 1",
        numberOfCredits1: "50",
        numberOfCredits2: "3",
    },
    {
        packageName: "Credits Package 2",
        numberOfCredits1: "60",
        numberOfCredits2: "5",
    },
    {
        packageName: "Credits Package 3",
        numberOfCredits1: "70",
        numberOfCredits2: "2",
    },
    {
        packageName: "Credits Package 4",
        numberOfCredits1: "40",
        numberOfCredits2: "6",
    },
]

const CreditComp = () => {

    const Row = (props: IRowProps) => {
        const { packageName, numberOfCredits1, numberOfCredits2 } = props
        const [isEditable, setIsEditable] = useState(false)

        return (
            <tr className="text-sm font-normal mr-3">
                <td className='pb-4'>
                    {isEditable ?
                        <div className='flex items-start h-[7.6rem]'> {packageName}</div> : <span>{packageName}</span>
                    }
                </td>
                <td className='pb-4'>{
                    isEditable ? (
                        <div className='w-full flex flex-col justify-start h-[7.6rem] pr-3'>
                            <input
                                placeholder={numberOfCredits1}
                                value={numberOfCredits1}
                                className={`p-3 rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text`}
                            />
                            <div className='flex items-center gap-2 mt-4'>
                                <button onClick={() => setIsEditable(prev => !prev)} className="bg-primary-blue text-white px-6 py-2 text-sm font-semibold rounded">{"Save"}</button>
                                <button onClick={() => setIsEditable(prev => !prev)} className="border border-primary-blue text-primary-blue px-6 py-2 text-sm font-semibold rounded">{"Cancel"}</button>
                            </div>
                        </div>
                    ) : (
                        <span>
                            {numberOfCredits1}
                        </span>
                    )}
                </td>
                <td className='pb-4'>
                    {
                        isEditable ? (
                            <div className='w-full flex items-start h-[7.6rem]'>
                                <input
                                    placeholder={numberOfCredits2}
                                    value={numberOfCredits2}
                                    className={`p-3 rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text`}
                                />
                            </div>
                        ) : (
                            <span>
                                {numberOfCredits2}
                            </span>
                        )}
                </td>
                <td className='pb-4'>
                    <div className={` ${isEditable ? "hidden" : "flex"} cursor-pointer  w-full justify-end`} onClick={() => setIsEditable(prev => !prev)}>
                        <Image
                            src={Edit}
                            alt={"edit"}
                            className=""
                            quality={100}
                        />
                    </div>
                </td>
            </tr >
        )
    }

    return (
        <div>
            <p className='text-2xl font-semibold'>Credits Pricing</p>
            <div className='shadow-shadow-tertiary rounded-lg p-6 pb-2 bg-white mt-3'>
                <table className="table-fixed ">
                    <thead>
                        <tr className='text-sm font-semibold'>
                            <th> <div className='min-w-[9rem] text-left mb-4'>Package Name</div></th>
                            <th> <div className='min-w-[9rem] text-left mb-4'>Number of Credits</div></th>
                            <th> <div className='min-w-[9rem] text-left mb-4'>Number of Credits</div></th>
                            <th> <div className='w-10 mb-4'></div> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {CreditItems.map((ci, i) => (
                            <Row {...ci} key={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CreditComp