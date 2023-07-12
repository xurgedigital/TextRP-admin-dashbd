import { ChangeEventHandler } from 'react'

interface IInputProps {
  label?: string
  placeholder?: string
  message?: string
  fullWidth?: boolean
  value?: string | number
  onChange?: ChangeEventHandler<HTMLInputElement>
  type?: string
  name?: string
}

const CommonInput = (props: IInputProps) => {
  return (
    <div
      className={`text-sm font-normal ${
        !props?.fullWidth && 'sm:pr-20 lg:pr-40'
      } flex flex-col sm:flex-row justify-between items-start mt-3 ${props?.message && 'mb-10'}`}
    >
      <label className="pr-6 text-black capitalize">{props?.label?.replace('_', ' ')}</label>
      <div className="relative w-full sm:w-auto">
        <input
          placeholder={props?.placeholder}
          value={props?.value}
          type={props?.type}
          name={props?.name}
          onChange={props?.onChange}
          className={`p-3 rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text ${
            props?.fullWidth
              ? 'min-w-full sm:min-w-[290px] lg:min-w-[360px]'
              : 'min-w-full sm:min-w-[200px]'
          }`}
        />
        <p className="absolute text-secondary-text text-xs font-normal pt-1">{props?.message}</p>
      </div>
    </div>
  )
}

export default CommonInput
