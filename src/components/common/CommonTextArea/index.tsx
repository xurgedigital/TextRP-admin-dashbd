import { ChangeEventHandler } from 'react'

interface IInputProps {
  label?: string
  className?: string
  placeholder?: string
  message?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  value?: string
}

const CommonTextArea = (props: IInputProps) => {
  return (
    <div
      className={`text-sm font-normal lg:pr-30 flex flex-col sm:flex-row justify-between items-start ${
        props.className
      } ${props?.message && 'mb-10'}`}
    >
      <label className="pr-6 text-black">{props?.label}</label>
      <div className="relative w-full sm:w-auto">
        <textarea
          placeholder={props?.placeholder}
          value={props?.value}
          onChange={props?.onChange}
          className={`p-3 rounded-lg w-full bg-gray-bg outline-none border border-primary-gray text-secondary-text min-w-full sm:min-w-[290px] lg:min-w-[360px]`}
        />
        <p className="absolute text-secondary-text text-xs font-normal pt-1">{props?.message}</p>
      </div>
    </div>
  )
}

export default CommonTextArea
