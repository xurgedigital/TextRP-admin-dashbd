import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import Chevrondown from '@public/Icons/chevrondown.svg'
import Image, { StaticImageData } from 'next/image'

interface IDropdownProps {
  label?: string
  className?: string
  dropdownList: string[]
  selectedOption: string | undefined
  setSelectedOption: Dispatch<SetStateAction<string | undefined>>
}

const Dropdown: React.FC<IDropdownProps> = ({
  dropdownList,
  setSelectedOption,
  selectedOption,
  label,
  className,
}) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const handleSelectOption = (item: string) => {
    setSelectedOption(item)
    setShowDropdown(false)
  }

  return (
    <div ref={dropdownRef} className={`relative  ${className}`}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className="text-secondary-text  rounded-lg text-base font-normal appearance-none border-[0.5px] bg-gray-bg dark:bg-gray-bg2-dark border-primary-gray dark:border-secondary-text-dark focus:outline-none py-2 px-3 text-center inline-flex justify-between items-center w-full shadow-shadow-primary"
        type="button"
      >
        <span className="truncate">{selectedOption ?? label}</span>
        <div>
          <Image src={Chevrondown} alt={'chevron'} className="" quality={100} />
        </div>
      </button>
      <div
        id="dropdown"
        className={`${
          showDropdown ? 'block' : 'hidden'
        } absolute z-50 bg-gray-bg dark:bg-gray-bg2-dark/80 rounded divide-y divide-gray-100 shadow w-full`}
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-primary-text-dark"
          aria-labelledby="dropdownDefault"
        >
          {dropdownList.map((dl, index) => (
            <li key={`dl-${index}`}>
              <div
                onClick={() => handleSelectOption(dl)}
                className="block cursor-pointer py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-bg2-dark font-medium text-sm"
              >
                {dl}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Dropdown
