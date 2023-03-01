import React from 'react'
import Image, { StaticImageData } from "next/image";
import ArrowLeft from "@public/Icons/setting/arrow.svg";
import BuyCredit from "@public/Icons/setting/buy-credits.svg";
import Chevron from "@public/Icons/setting/chevron-right.svg";
import LinkedAccount from "@public/Icons/setting/linked.svg";
import Logout from "@public/Icons/setting/logout.svg";
import MyNFT from "@public/Icons/setting/my-nft.svg";
import Profile from "@public/Icons/setting/profile.svg";
import Subscriptions from "@public/Icons/setting/subscriptions.svg";
import { useRouter } from 'next/router';
import Link from 'next/link';


interface ISettingsProps {
    setShowSetting: Function;
}
interface ISItemsProps {
    title: string,
    icon: StaticImageData
    link?: string
}


const settingItems = [
    {
        title: "Profile",
        icon: Profile,
        link: "/"
    },
    {
        title: "Linked accounts",
        icon: LinkedAccount,
        link: "/setting/linked-accounts"

    },
    {
        title: "My NFTs",
        icon: MyNFT,
        link: "/setting/my-nft"

    },
    {
        title: "Buy credits",
        icon: BuyCredit,
        link: "/setting/buy-credits"

    },
    {
        title: "Subscriptions",
        icon: Subscriptions,
        link: "/setting/subscriptions"

    },
    {
        title: "Log out",
        icon: Logout,
    },
]


const SettingItems = (props: ISItemsProps) => {
    const { title, icon, link } = props

    const ShowButtons = () => {
        if (title === "Buy credits") {
            return (
                <div className='text-xs mr-4  truncate rounded p-2 font-semibold text-primary-blue bg-gray-bg'>
                    Bal: 10
                </div>
            )
        } else if (title === "Subscriptions") {
            return (
                <div className='text-xs  mr-4 truncate font-normal rounded p-2 bg-primary-blue text-white'>
                    Upgrade
                </div>
            )
        } else {
            return <></>
        }

    }

    return (
        <Link href={link ?? "/"}>
            <div className='flex items-center justify-between my-8 cursor-pointer'>
                <div className='flex items-center justify-between sm:gap-2 md:justify-between w-full' >
                    <div className='flex items-center gap-5'>
                        <Image
                            src={icon}
                            alt={title}
                            className=""
                            quality={100}
                        />
                        <p className='text-base font-normal truncate'>{title}</p>
                    </div>
                    <ShowButtons />
                </div>

                <div className='flex flex-shrink-0 items-center'>


                    <Image
                        src={Chevron}
                        alt="chevron"
                        className=""
                        quality={100}
                    />
                </div>
            </div>
        </Link>
    )
}


const Settings = () => {
    const router = useRouter()
    const [isMount, setMount] = React.useState(true);

    React.useEffect(() => {
        if (isMount) {
            setMount(false);
        }
    }, []);

    return (
        <div className={`md:transform-none flex-1 md:flex-[0.3] lg:flex-[0.25] 3xl:flex-[0.2]  min-h-screen max-h-screen bg-white py-6 px-4 md:px-8  relative border-[0.5px] border-primary-gray ${isMount ? "translate-x-full" : "translate-x-0"
            } transition duration-300`}>
            <div className='flex gap-5 items-center'>
                <Image
                    src={ArrowLeft}
                    alt="arrow-left"
                    className="cursor-pointer"
                    quality={100}
                    onClick={() => router.back()}
                />
                <p className='text-2xl font-semibold'>Settings</p>
            </div>
            {
                settingItems.map((si, i) => (
                    <SettingItems key={i} {...si} />
                ))
            }
        </div>
    )
}

export default Settings