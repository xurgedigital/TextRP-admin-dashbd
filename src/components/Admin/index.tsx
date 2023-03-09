import React, { useEffect, useState } from 'react'
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
import SubscriptionComp from './Subscriptions';
import DiscountComp from './Discounts';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import useWidth from '@/hooks/useWidth';
import NFTsComp from './NFTs';



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
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const width = useWidth();

    useEffect(() => {
        if (width < 1024) {
            setIsDrawerOpen(false);
        } else {
            setIsDrawerOpen(true);
        }
    }, [width]);


    const TabSection = (props: ITabProps) => {
        const { title } = props
        return (
            <div onClick={() => {
                setSelectedTab(title)
                if (width < 768) {
                    setIsDrawerOpen(prev => !prev)
                }
            }} className={`flex items-center gap-3 cursor-pointer p-3 ${selectedTab === title ? " bg-primary-blue rounded-lg text-white" : " text-black"}`}>
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
            {isDrawerOpen ?
                (<div className='z-30 flex fixed left-4 top-2 lg:hidden bg-white p-2' onClick={() => setIsDrawerOpen(prev => !prev)}>
                    <AiOutlineMenuFold size={24} className="cursor-pointer" />
                </div>) :
                (<div className='z-30 flex fixed left-4 top-2 lg:hidden bg-white  shadow-shadow-tertiary p-2 rounded' onClick={() => setIsDrawerOpen(prev => !prev)}>
                    <AiOutlineMenuUnfold size={24} className="cursor-pointer" />
                </div>)
            }
            {isDrawerOpen && (
                <div className="fixed top-0 z-20 h-full min-h-screen px-4 lg:px-8 md:w-[14.5rem] shadow-shadow-secondary py-6 pt-12 bg-white">
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
            )}
            <div className={`overflow-y-auto min-h-screen flex w-full py-6 pt-14 px-4 lg:px-8 bg-gray-bg transition-all ease-linear duration-200 ${isDrawerOpen ? "lg:ml-[14.5rem]" : "ml-0"
                } `}>
                {selectedTab === "User Management" && <UserManagementComp />}
                {selectedTab === "Credits" && <CreditComp />}
                {selectedTab === "Subscriptions" && <SubscriptionComp />}
                {selectedTab === "Discounts" && <DiscountComp />}
                {selectedTab === "Platform Settings" && <PlatformSettingsComp />}
                {selectedTab === "NFTs" && <NFTsComp />}
            </div>
        </div>
    )
}

export default Admin