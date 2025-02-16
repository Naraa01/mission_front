import React from 'react'
import LeftMenu from './Left'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex dark:text-white overflow-hidden h-screen">
      <aside className="border-r-g200 element-scroll h-screen justify-between bg-white px-4 pt-2 pb-6 md:flex md:flex-col w-72">
        <LeftMenu />
      </aside>

      <aside className="flex-1 bg-creyscale-100 overflow-y-auto">{children}</aside>
    </section>
  )
}
