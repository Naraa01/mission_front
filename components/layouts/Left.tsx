import React from 'react'
import Navbar from './Navbar'
import { ProfileHeader } from '../user/ProfileHeader'
// import Navbar from './Navbar'

export default function LeftMenu() {
  return (
    <>
      <div
        className={`h-[80%] scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full
        scrollbar-thumb-creyscale-200 scrollbar-w-1 overflow-y-scroll`}
      >
        <Navbar />
      </div>
      <div className="text-g400 text-left text-xs font-normal xl:block">
        <ProfileHeader />
      </div>
    </>
  )
}
