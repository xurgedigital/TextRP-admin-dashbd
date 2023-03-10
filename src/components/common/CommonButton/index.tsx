import { MouseEventHandler } from 'react'

interface IInputProps {
  label?: string
  placeholder?: string
  message?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  disabled?: boolean
  isLoading?: boolean
}

const CommonButton = (props: IInputProps) => {
  return (
    <div
      className={`text-sm font-normal sm:pr-20 lg:pr-40 flex flex-col sm:flex-row justify-between items-start mt-3 ${
        props?.message && 'mb-10'
      }`}
      onClick={props?.onClick}
    >
      <label className="pr-6 text-black hidden sm:block sm:invisible">{props?.label}</label>
      <div className="flex min-w-[200px] justify-start">
        <button
          className="bg-primary-blue disabled:bg-slate-400 text-white px-8 py-2 text-sm font-semibold rounded min-w-[100px]"
          disabled={props?.disabled}
        >
          {props?.isLoading ? (
            <div
              className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          ) : (
            props?.label
          )}
        </button>
      </div>
    </div>
  )
}

export default CommonButton
