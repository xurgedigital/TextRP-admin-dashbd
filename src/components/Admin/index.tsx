import React, { useState } from 'react'
import UserManagement from "@public/Icons/admin/user.svg";
import Nft from "@public/Icons/admin/nft.svg";
import Credit from "@public/Icons/admin/credit.svg";
import Subscription from "@public/Icons/admin/subscription.svg";
import Platform from "@public/Icons/admin/platform.svg";
import Discount from "@public/Icons/admin/discount.svg";
import Logout from "@public/Icons/logout.svg";
import Image, { StaticImageData } from "next/image";
import AdminIcon from '@public/Icons/admin';
import UserManagementComp from './UserManagement';
import CreditComp from './Credits';
import PlatformSettingsComp from './PlatformSettings';



const AdminItems = [
    {
        title: "User Management",
        icon: UserManagement
    },
    {
        title: "NFTs",
        icon: Nft
    },
    {
        title: "Credits",
        icon: Credit
    },
    {
        title: "Subscriptions",
        icon: Subscription
    },
    {
        title: "Discounts",
        icon: Discount
    },
    {
        title: "Platform Settings",
        icon: Platform
    },
]

interface ITabProps {
    title: string
    icon?: StaticImageData;
}

const Admin = () => {
    const [selectedTab, setSelectedTab] = useState("User Management")

    const TabSection = (props: ITabProps) => {
        const { title } = props
        return (
            <div onClick={() => setSelectedTab(title)} className={`flex items-center gap-3 cursor-pointer p-3 ${selectedTab === title ? " bg-primary-blue rounded-lg text-white" : " text-black"}`}>
                <div className='relative text-white'>
                    <AdminIcon name={title.toLowerCase()} colorCode={`${selectedTab === title ? "#ffffff" : "#000000"}`} />
                </div>
                <p className='text-sm font-normal truncate'>{title}</p>
            </div>
        )
    }


    return (
        <div className='flex'>
            {/* left panel */}
            <div className="flex-1 h-full min-h-screen px-4 lg:px-8 md:flex-[0.16]  shadow-shadow-secondary py-6">
                <div className='flex flex-col h-[92vh] justify-between'>
                    <div>
                        <p className='text-primary-blue text-2xl font-semibold'>TextRP Logo</p>
                        <div className='mt-8 flex flex-col gap-4'>
                            {AdminItems.map((ai, i) => (
                                <TabSection {...ai} key={i} />
                            ))}
                        </div>
                    </div>
                    <div className='flex cursor-pointer items-center gap-3 p-3'>
                        <div className='relative'>
                            <Image
                                src={Logout}
                                alt={"logout"}
                                className=""
                                quality={100}
                            />
                        </div>
                        <p className='text-sm font-normal'>{"Logout"}</p>
                    </div>
                </div>

            </div>

            <div className='flex w-full py-6 px-8 bg-gray-bg'>
                {selectedTab === "User Management" && <UserManagementComp />}
                {selectedTab === "Credits" && <CreditComp />}
                {selectedTab === "Platform Settings" && <PlatformSettingsComp/>}
            </div>

        </div>
    )
}

export default Admin