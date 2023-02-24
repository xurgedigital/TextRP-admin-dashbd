import React from 'react'
import Image, { StaticImageData } from "next/image";
import ArrowLeft from "@public/Icons/setting/arrow.svg";
import Chevrondown from "@public/Icons/chevrondown.svg";
import { useRouter } from 'next/router';


const BuyCredits = () => {
    const router = useRouter()
    return (
        <div className="md:flex-[0.25]  min-h-screen max-h-screen bg-white py-6 px-8 relative border-[0.5px] border-primary-gray">
            <div className='flex gap-5 items-center'>
                <Image
                    src={ArrowLeft}
                    alt="arrow-left"
                    className="cursor-pointer"
                    onClick={() => router.back()}
                    quality={100}
                />
                <p className='text-2xl font-semibold'>Buy Credits</p>
            </div>
            <div className='text-base font-normal my-8'>
                <p className=''>Your credits balance</p>
                <p className='font-semibold'>10</p>
            </div>
            <div className='text-base font-normal my-8'>
                <p className='mb-2'>Select the amount to buy</p>
                <div className='border-[0.5px] px-3 py-2 border-primary-gray rounded-lg bg-gray-bg text-secondary-text flex items-center justify-between shadow-shadow-primary'>
                    <p>
                        50 credits for USD $3 (7.537 XRP)
                    </p>
                    <div>
                        <Image
                            src={Chevrondown}
                            alt={""}
                            className=""
                            quality={100}
                        />
                    </div>
                </div>
            </div>
            <div className='text-base font-normal my-8'>
                <p className=''>You will be charged</p>
                <p className='font-semibold'>USD $3 (7.537 XRP)</p>
            </div>
            <div className='text-base font-normal my-8'>
                <p className=''>Your new credits balance will be</p>
                <p className='font-semibold'>60</p>
            </div>
            <div className='text-base font-normal my-8'>
                <p className=''>These connects will expire on</p>
                <p className='font-semibold'>January 23, 2024</p>
            </div>
            <button className='outline-none text-base font-normal rounded p-2 bg-primary-blue text-white w-full flex justify-center'>
                Buy Credits
            </button>

        </div>
    )
}

export default BuyCredits