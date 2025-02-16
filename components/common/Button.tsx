import React from 'react'
import { ButtonSpinner } from './icons'

const roundedClass = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

const sizeClass = {
  small: 'text-xs py-1 px-2',
  medium: 'font-medium text-xs md:text-sm py-1.5 px-3 md:py-2.5 md:px-4',
  large: 'font-medium text-sm md:text-base py-2.5 px-4 md:py-3 md:px-5',
  fullWidth: 'w-full font-medium text-xs md:text-sm py-1.5 px-3 md:py-2.5 md:px-4',
}

const positionClass = {
  left: 'justify-start items-center',
  center: 'justify-center items-center',
  right: 'justify-end items-center',
}

const variantClass = {
  primary: {
    class: 'bg-primary-600 focus:ring-primary/50 text-white',
    outlineClass: 'text-primary hover:text-white border-primary hover:bg-primary focus',
  },
  secondary: {
    class:
      'bg-primary-50 border border-primary-50 hover:border hover:border-primary-200 focus:ring-secondary/50 text-primary-600',
    outlineClass: 'text-secondary hover:text-white border-g3 hover:bg-secondary focus:ring-secondary/50',
  },
  danger: {
    class: 'bg-danger focus:ring-danger/50 text-white',
    outlineClass: 'text-danger border-danger hover:bg-danger hover:text-white focus:ring-danger/50',
  },
  warning: {
    class: 'bg-warning focus:ring-warning/50 text-white',
    outlineClass: 'text-warning border-warning hover:bg-warning hover:text-white focus:ring-warning/50',
  },
  info: {
    class: 'bg-info focus:ring-info/50 text-white',
    outlineClass: 'text-info border-info hover:bg-info focus:ring-info/50',
  },
  success: {
    class: 'bg-success focus:ring-success/50 text-white',
    outlineClass: 'text-success hover:text-white border-success hover:bg-success focus:ring-success/50',
  },
  light: {
    class: 'text-g600 border border-white hover:bg-creyscale-50 hover:border hover:border-creyscale-200',
    outlineClass: 'border-g300',
  },
  ghost: {
    class: 'text-g600 hover:bg-creyscale-50 border border-creyscale-200 hover:border-creyscale-300',
    outlineClass: 'border-g300',
  },
}

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined
  variant?: keyof typeof variantClass
  rounded?: keyof typeof roundedClass
  size?: keyof typeof sizeClass
  position?: keyof typeof positionClass
  children?: any
  // children?: React.ReactNode
  // onClick?: (e: React.MouseEvent<HTMLElement>) => void
  ghost?: boolean
  outline?: boolean
  borderStyle?: 'dashed' | 'dotted' | 'solid' | 'none'
  icon?: any
  // icon?: React.ReactNode
  loading?: boolean
  [key: string]: null | undefined | object | string | boolean | number
}

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  outline,
  borderStyle = 'solid',
  icon,
  rounded = 'xl',
  size = 'medium',
  position = 'center',
  loading = false,
  ...rest
}: ButtonProps) => {
  // text-white bg-gradient-to-br from-primary to-socondarыy
  const primaryClass = `
    ${variantClass[variant].class}
    disabled:cursor-not-allowed
    disabled:bg-g100
    disabled:text-g500
    focus:outline-none       
    hover:bg-gradient-to-bl
    `

  const primaryOutlineClass = `
  ${variantClass[variant].outlineClass}
    border
    border-${borderStyle}
    focus:outline-none       
    focus:ring-2 
  `

  const outlineOrNot = variant && !outline ? primaryClass : primaryOutlineClass

  return (
    <button
      className={`
        flex relative
        ${outlineOrNot} 
        ${roundedClass[rounded]} 
        ${sizeClass[size]}
        ${positionClass[position]}
      `}
      type={type}
      disabled={loading}
      {...rest}
    >
      {/* <div className={`w-full flex ${positionClass[position]} space-x-2`}> */}
      {icon && <span className="flex items-center mr-2">{icon}</span>}
      {children}
      {/* </div> */}

      {loading && (
        <div className="absolute right-0">
          <ButtonSpinner />
        </div>
      )}
    </button>
  )
}
