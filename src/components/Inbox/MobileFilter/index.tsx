import Image from 'next/image'
import React from 'react'
import XRPIcon from '@public/Icons/MobileFilter/xrpMobileFilter.svg'
import TwitterIcon from '@public/Icons/MobileFilter/twitterMobileFilter.svg'
import DiscordIcon from '@public/Icons/MobileFilter/discordMobileFilter.svg'
import DiscordWhiteIcon from '@public/Icons/MobileFilter/discordWhite.svg'
import TwilioIcon from '@public/Icons/MobileFilter/tiwiloMobileFilter.svg'

interface ITabsProps extends IMobileFilter {
  image?: string
  title: string
}

interface IMobileFilter {
  filter: string
  setFilter: (value: string) => void
}

const FilterTab = (props: ITabsProps) => {
  const { image, title, filter, setFilter } = props
  return (
    <div
      onClick={() => setFilter(title)}
      className={`flex p-2 rounded min-w-fit gap-2 ${
        filter == title ? 'bg-primary-blue' : 'bg-[#F3F5FF]'
      } `}
    >
      {image && (
        <span className=" h-4 w-4 relative">
          <Image src={image} alt="" />
        </span>
      )}
      <div
        className={`text-xs font-semibold  ${
          filter == title ? 'text-white' : 'text-secondary-text'
        }`}
      >
        {title}
      </div>
    </div>
  )
}

const MobileFilter = (props: IMobileFilter) => {
  const { filter, setFilter } = props
  return (
    <div className=" md:hidden overflow-x-auto pb-4">
      <div className="flex mt-6 gap-2">
        <FilterTab filter={filter} setFilter={setFilter} title="All Chats" />
        <FilterTab filter={filter} setFilter={setFilter} title="XRP" image={XRPIcon} />
        <FilterTab filter={filter} setFilter={setFilter} title="Twitter" image={TwitterIcon} />
        <FilterTab
          filter={filter}
          setFilter={setFilter}
          title="Discord"
          image={filter == 'Discord' ? DiscordWhiteIcon : DiscordIcon}
        />
        <FilterTab filter={filter} setFilter={setFilter} title="Twilio" image={TwilioIcon} />
      </div>
    </div>
  )
}

export default MobileFilter
