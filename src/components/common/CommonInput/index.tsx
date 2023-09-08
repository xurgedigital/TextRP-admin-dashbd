import { ChangeEventHandler } from 'react'
import Button from '@/components/UI/Button'

interface IInputProps {
  label?: string
  placeholder?: string
  message?: string
  fullWidth?: boolean
  value?: string | number
  onChange?: ChangeEventHandler<HTMLInputElement>
  type?: string
  name?: string
  customStyle?: {}
  hasFetchBtn?: boolean
  disabled?: boolean
  onFetchBtn?: () => {}
}

const CommonInput = (props: IInputProps) => {
  return (
    <div
      className={`text-sm font-normal ${
        !props?.fullWidth && 'sm:pr-20 lg:pr-40'
      } flex flex-col w-[520px] sm:flex-row justify-between items-start mt-3 ${
        props?.message && 'mb-10'
      }`}
    >
      <label className="pr-6 text-black capitalize">{props?.label?.replace('_', ' ')}</label>
      <div className="relative w-full sm:w-auto">
        <div className="flex items-center">
          <input
            placeholder={props?.placeholder}
            value={props?.value}
            type={props?.type}
            name={props?.name}
            disabled={props?.disabled}
            onChange={props?.onChange}
            className={`p-3 rounded-lg ${
              props?.disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'cursor-pointer'
            } outline-none border border-primary-gray  ${
              props?.fullWidth && !props.hasFetchBtn
                ? 'min-w-full sm:min-w-[290px] lg:min-w-[360px]'
                : 'min-w-[260px] sm:min-w-[260px]'
            }`}
          />
          {props.hasFetchBtn && (
            <Button
              onClick={() => props.onFetchBtn && props.onFetchBtn()}
              className="truncate px-4 mt-1 h-[42px]"
            >
              {'Fetch Data'}
            </Button>
          )}
        </div>
        {/* <p className=" text-secondary-text text-xs font-normal pt-1">{props?.message}</p> */}
      </div>
    </div>
  )
}

export default CommonInput
