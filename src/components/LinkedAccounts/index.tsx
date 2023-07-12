import React from 'react'
import Image, { StaticImageData } from 'next/image'
import ArrowLeft from '@public/Icons/setting/arrow.svg'
import Twitter from '@public/Icons/twitter.svg'
import Discord from '@public/Icons/discord.svg'
import Xrp from '@public/Icons/xrp.svg'
import Twilio from '@public/Icons/twilio.svg'
import { useRouter } from 'next/router'

interface ILinkCardProps {
  icon: StaticImageData
  title: string
}

const LinkItems = [
  {
    title: 'Twitter',
    icon: Twitter,
  },
  {
    title: 'Discord',
    icon: Discord,
  },
  {
    title: 'Twilio',
    icon: Twilio,
  },
  {
    title: 'Xrp Wallet',
    icon: Xrp,
  },
]

const LinkedAccounts = () => {
  const router = useRouter()
  const [isMount, setMount] = React.useState(true)

  React.useEffect(() => {
    if (isMount) {
      setMount(false)
    }
  }, [])

  const LinkCard = (props: ILinkCardProps) => {
    const { icon, title } = props
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src={icon} alt={title} className="cursor-pointer" quality={100} />
          <p className="text-base font-normal">{title}</p>
        </div>
        <button className="text-xs outline-none font-normal rounded p-2 bg-primary-blue text-white">
          Connect
        </button>
      </div>
    )
  }

  return (
    <div
      className={`md:transform-none settingPanel ${
        isMount ? 'translate-x-full' : 'translate-x-0'
      } transition duration-300 min-h-screen max-h-screen overflow-hidden bg-white dark:bg-gray-bg-dark py-6   relative border-r-[0.5px]  border-primary-gray dark:border-secondary-text-dark cursor-pointer`}
    >
      <div className="flex gap-5 items-center px-4 md:px-8">
        <Image
          src={ArrowLeft}
          alt="arrow-left"
          className="cursor-pointer"
          onClick={() => router.back()}
          quality={100}
        />
        <p className="text-2xl font-semibold">Linked Accounts</p>
      </div>

      <div className="flex flex-col gap-8 my-8 px-4 md:px-8 h-full overflow-y-auto">
        {LinkItems.map((li, i) => (
          <LinkCard {...li} key={i} />
        ))}
      </div>
    </div>
  )
}

export default LinkedAccounts
