import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

type IVariant = 'blueOutline' | 'primary'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode | string
  type?: 'button' | 'submit' | 'reset'
  variant?: IVariant
  disabled?: boolean
  onClick?: (e: React.FormEvent<HTMLButtonElement>) => void
  loading?: boolean
}

const Button: React.FC<IButtonProps> = ({
  className,
  children,
  type = 'button',
  disabled,
  variant = 'primary',
  onClick,
  loading,
  ...rest
}) => {
  const returnBg = (variant: IVariant) => {
    switch (variant) {
      case 'primary':
        return 'rounded bg-primary-blue text-white text-sm '
      case 'blueOutline':
        return 'text-primary-blue bg-white border-2 border-primary-blue text-sm font-medium'
    }
  }

  return (
    <button
      onClick={onClick}
      className={` ${returnBg(variant)} ${className} disabled:opacity-30`}
      disabled={disabled}
      {...rest}
    >
      {loading ? (
        <div className="animate-spin inline-flex h-full">
          <AiOutlineLoading className="font-bold" size={20} />
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
