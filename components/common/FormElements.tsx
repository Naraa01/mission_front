import React, { ChangeEvent, Fragment, ReactElement, useEffect, useState } from 'react'
import { EyeIcon } from './icons'

interface FormInputProps {
  label?: string
  name: string
  className?: string
  type?: string
  autoFocus?: boolean | false
  value?: string | number | undefined
  required?: boolean
  searchIcon?: boolean
  isClearIcon?: boolean
  placeholder?: string
  onChange?: (el: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  autoComplete?: string | 'on'
  error?: string
  disabled?: boolean | false
  inputClassName?: string
  labelClassName?: string
  tabIndex?: number
  readOnly?: boolean
  onSearch?: () => void
  [key: string]: null | undefined | object | string | boolean | number
}

export const FormInput = ({
  label,
  name,
  className = 'text-gray-900',
  inputClassName,
  labelClassName,
  type = 'text',
  autoFocus,
  value,
  required,
  placeholder,
  onChange,
  onBlur,
  autoComplete,
  error,
  disabled,
  readOnly,
  onSearch,
  ...rest
}: FormInputProps) => {
  const handleKeyPress = (e: React.FormEvent<HTMLInputElement>) => {
    if (onSearch) {
      // TODO: tur haaw
      // if (e.key === 'Enter') {
      //   onSearch()
      // }
    }
  }

  const [passwordShow, setPasswordShow] = useState(true)
  const [inputType, setInputType] = useState(type)

  return (
    <label className={`block relative text-sm ${className}`}>
      {label && (
        <>
          {label} {required && <span className={`${labelClassName} form-required text-primary `}>*</span>}
        </>
      )}

      <input
        type={inputType}
        className={`form-input focus:border-primary focus:ring-primary-400 mt-3 block w-full rounded-xl border-gray-300 text-xs text-gray-700 ${inputClassName}
        shadow-sm placeholder:text-gray-400 focus:ring-opacity-50 md:text-sm ${
          disabled ? 'disabled:opacity-50 cursor-not-allowed bg-slate-100' : ''
        } ${type === 'password' && 'pr-10'}`}
        name={name}
        autoFocus={autoFocus}
        value={value}
        placeholder={placeholder || ''}
        onChange={onChange || undefined}
        onBlur={onBlur || undefined}
        autoComplete={autoComplete}
        disabled={disabled}
        readOnly={readOnly || false}
        // TODO: Tur haaw
        // onKeyPress={handleKeyPress}
        {...rest}
      />
      {type === 'password' && (
        <span
          onClick={() => {
            setPasswordShow(!passwordShow)
            setInputType(passwordShow ? 'text' : 'password')
          }}
          className="hover:cursor-pointer"
        >
          <EyeIcon isOpen={passwordShow} className="w-6 h-6 absolute right-3 top-11" />
        </span>
      )}
      {error && <div className="mt-2 text-xs text-red-500">{error}</div>}
    </label>
  )
}