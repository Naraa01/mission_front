import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Button } from './Button'

const positionClass = {
  left: 'justify-start',
  center: 'justify-center items-center p-4',
  right: 'justify-end',
}

const transitonStart = {
  left: '-translate-x-full',
  center: 'opacity-0 scale-95',
  right: 'translate-x-full',
}

const transitonEnd = {
  left: 'translate-x-0',
  center: 'opacity-100 scale-100',
  right: 'translate-x-0',
}

interface DialogProps {
  title?: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  sizeClass?: string
  position?: keyof typeof positionClass
  onSubmit?: () => void
  buttonVisible?: boolean
  closeButtonVisible?: boolean
  isLoading?: boolean
  checkForm?: boolean
}

export const ModalBox = ({
  title,
  isOpen,
  onClose,
  children,
  sizeClass = 'max-w-md',
  position = 'center',
  onSubmit,
  buttonVisible = true,
  closeButtonVisible = false,
  checkForm = false,
  isLoading,
}: DialogProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25"></div>
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300"
          enterFrom={transitonStart[position]}
          enterTo={transitonEnd[position]}
          leave="transition ease-in-out duration-500"
          leaveFrom={transitonEnd[position]}
          leaveTo={transitonStart[position]}
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className={`flex min-h-full min-w-full ${sizeClass} ${positionClass[position]} text-center`}>
              <Dialog.Panel
                className={`w-full flex flex-col ${sizeClass} ${
                  position === 'center' && 'rounded-2xl p-6'
                } bg-white text-left align-middle shadow-xl`}
              >
                {title && (
                  <Dialog.Title as="h3" className="flex items-center justify-between border border-b-2 py-4 px-8">
                    {title}
                    {closeButtonVisible && <XMarkIcon className="w-6 h-6 hover:cursor-pointer" onClick={onClose} />}
                  </Dialog.Title>
                )}

                {children}

                {buttonVisible && (
                  <div
                    className={`pt-4 px-8 flex ${position === 'center' ? 'justify-center' : 'justify-end'} space-x-4`}
                  >
                    <Button variant="light" size={position === 'center' ? 'fullWidth' : 'medium'} onClick={onClose}>
                      {'Буцах'}
                    </Button>
                    <Button
                      onClick={onSubmit}
                      size={position === 'center' ? 'fullWidth' : 'medium'}
                      loading={isLoading}
                      disabled={checkForm}
                    >
                      {'Хадгалах'}
                    </Button>
                  </div>
                )}
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
