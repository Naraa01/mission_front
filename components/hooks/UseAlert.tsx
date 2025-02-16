import { useState } from 'react'

const styles = {
  success: 'bg-green-100 text-green-800',
  error: 'text-red-700 bg-red-100',
  warning: 'bg-yellow-100 text-yellow-800',
}

export type AlertType = keyof typeof styles

export type AlertProps = {
  message?: string
  type: AlertType
}

export type AlertShowProps = {
  show: () => void
}

export const useAlert = (timeout = 3000) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [setting, setSetting] = useState<AlertProps>({
    message: 'Амжиллтай хадгаллаа',
    type: 'success',
  })

  const show = ({ message = 'Амжиллтай хадгаллаа', type = 'success' }: AlertProps) => {
    setIsShow(true)
    setSetting({ message, type })
    setTimeout(() => {
      setIsShow(false)
    }, timeout)
  }

  // eslint-disable-next-line arrow-body-style
  const Alert = () => {
    return isShow ? (
      <div className="fixed top-10 right-10 z-[100]">
        <div className={`py-3 px-6 w-96 sm:w-64 leading-normal rounded-lg text-center ${styles[setting.type]}`}>
          {setting.message}
        </div>
      </div>
    ) : (
      <></>
    )
  }

  return [show, Alert] as [typeof show, typeof Alert]
}
