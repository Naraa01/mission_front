import React from 'react'
import Image from 'next/image'
import withLayoutAuth from '../../components/hoc/WithLayoutAuth'
import { useAuthGuard } from '../../lib/auth/auth'

function Info() {
  const { user } = useAuthGuard({ middleware: 'guest' })
  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex gap-4">
        <div>
          <Image
            src={user?.profileImageUrl || '/assets/user.png'}
            width={100}
            height={100}
            alt=""
            className="rounded-full"
          />
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <p className="">Овог:</p>
            <p className="font-semibold">{user?.lastName}</p>
          </div>

          <div className="flex gap-2">
            <p className="">Нэр:</p>
            <p className="font-semibold">{user?.firstName}</p>
          </div>

          <div className="flex gap-2">
            <p className="">И-мэйл:</p>
            <p className="font-semibold">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withLayoutAuth()(Info)
