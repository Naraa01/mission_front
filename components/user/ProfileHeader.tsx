import React from 'react'
import Image from 'next/image'
import { useAuthGuard } from '../../lib/auth/auth'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid'

export const ProfileHeader = () => {
  const { user, logout } = useAuthGuard({ middleware: 'guest' })

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="flex justify-between items-center ">
      <div className=" flex-1 flex gap-2 items-center">
        <div>
          <Image
            src={user?.profileImageUrl || '/assets/user.png'}
            width={40}
            height={40}
            alt=""
            className="rounded-full"
          />
        </div>
        <div>
          <p className="font-semibold text-black">{`${user?.firstName || ''} ${user?.lastName || ''}`}</p>
          <p className="text-black">{user?.email}</p>
        </div>
      </div>
      <div className="cursor-pointer hover:text-primary-600" onClick={() => handleLogout()}>
        <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
      </div>
    </div>
  )
}
