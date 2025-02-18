import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ChevronRightIcon, GlobeAmericasIcon, UserCircleIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import { useAlert } from '../hooks/UseAlert'

function Navbar() {
  const router = useRouter()
  const { botNo } = router.query
  const [show, Alert] = useAlert(10000)

  const { asPath } = router

  const matchUrl = (url: string, pattern: string) => {
    const regex = new RegExp(`^${pattern.replace(/:[^\s/]+/g, '([\\w-]+)')}$`)
    return regex.test(url)
  }

  const menuItems: any[] = [
    {
      id: 1,
      order: 1,
      code: 'dashboard',
      href: '/',
      title: 'Dashboard',
      icon: <UserGroupIcon className={`h-4 w-4 `} />,
      subMenus: [],
    },
    {
      id: 2,
      order: 2,
      code: 'users',
      href: 'users',
      title: 'Users',
      icon: <UserGroupIcon className={`h-4 w-4 `} />,
      subMenus: [],
    },
    {
      id: 3,
      order: 3,
      code: 'products',
      href: 'product/list',
      title: 'Product',
      icon: <GlobeAmericasIcon className={`h-4 w-4 `} />,
      subMenus: [],
    },
    {
      id: 4,
      order: 4,
      code: 'user_profile',
      // href: 'user/profile',
      title: 'User Profile',
      icon: <UserCircleIcon className={`h-4 w-4 `} />,
      subMenus: [
        { href: 'user/info', title: 'User detail' },
        { href: 'user/change/password', title: 'ChangePassword' },
      ],
    },
  ]

  const [checkedMenu, setCheckedMenu] = useState<number[]>([])

  const handleMenuChildren = (id: number) => {
    if (menuItems?.length > 0) {
      const menu = menuItems.find((menuItem) => id === menuItem?.id || 0)

      if (menu?.subMenus && menu?.subMenus?.length > 0) {
        // setMenuChildrens?.(menu?.subMenus)
      }
    }
  }

  const updateCheckedChange = () => {
    if (menuItems?.length > 0) {
      const menu = menuItems.find((item) =>
        item?.subMenus?.some((subMenu: any) => matchUrl(asPath, subMenu?.href || '')),
      )

      if (menu) {
        handleMenuChildren(menu?.id || 0)

        setCheckedMenu([menu?.id || 0])
      }
    }
  }

  useEffect(() => {
    if (checkedMenu?.length === 0) {
      updateCheckedChange()
    }
  }, [])
  // }, [menuData])

  const handleOnChange = (id: number) => {
    setCheckedMenu((prev) => {
      if (prev?.includes(id)) {
        return prev.filter((p) => p !== id)
      }

      return [...prev, id]
    })

    // setCheckedState(updatedCheckedState)
  }

  const closeAllMenus = (id: number) => {
    // const closeAllMenus = (selectedMenu?: MenuI) => {
    handleMenuChildren(id)

    setCheckedMenu([])
  }

  const handleChildChange = (id: number) => {
    handleMenuChildren(id)
    setCheckedMenu([id])
  }

  const convertHref = (href: string) => {
    let updatedHref = href

    if (botNo && href?.includes(':botNo')) {
      updatedHref = updatedHref.replace(':botNo', botNo ? (botNo as string) : '')
    }

    if (href?.includes(':id')) {
      updatedHref = updatedHref.replace(':id', '0')
    }

    return updatedHref
  }

  return (
    <section>
      <Alert />
      <nav>
        <ul>
          {menuItems.map(({ id, code, order, href, title, icon, subMenus }, i) => (
            <li className="bg-white text-g6 text-black font-semibold" key={id || href}>
              {subMenus && subMenus?.length > 0 && !href ? (
                <>
                  <label
                    htmlFor={`${id || href || '#'}`}
                    className="w-full flex items-center justify-between p-2 rounded hover:bg-primary-50 hover:text-primary-600 cursor-pointer"
                  >
                    <span className="flex items-center gap-x-2 hover:bg-primary-50 hover:text-primary-600">
                      {icon}
                      {title}
                    </span>
                    <ChevronRightIcon
                      className={`h-4 w-4 ${checkedMenu?.find((_id) => id === _id) && 'rotate-90 transform'}`}
                    />
                  </label>
                  <input
                    id={`${id || href}`}
                    type="checkbox"
                    // checked={checkedState[i]}
                    onChange={() => handleOnChange(id)}
                    className="hidden"
                  />

                  <ul
                    // className={`overflow-y-hidden transition-[max-height] duration-300`}
                    style={{
                      overflow: 'hidden',
                      transitionProperty: 'all',
                      transitionDuration: '300ms',
                      height: checkedMenu?.find((_id) => id === _id) ? `${40 * (subMenus?.length || 1)}px` : '0',
                    }}
                  >
                    {subMenus?.map((subMenu: any, idx: any) => (
                      <li key={idx}>
                        <Link
                          href={convertHref(subMenu?.href || '') || '#'}
                          className={`w-full flex items-center text-left pl-11 py-2 rounded gap-x-2 ${
                            matchUrl(asPath, subMenu?.href || '') && 'bg-primary-50 text-primary-600'
                          } hover:bg-primary-50 hover:text-primary-600 cursor-pointer`}
                          onClick={() => handleChildChange(id)}
                        >
                          {subMenu.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  href={convertHref(href || '') || '#'}
                  className={`w-full flex items-center text-left p-2 rounded gap-x-2 ${
                    matchUrl(asPath, href || '') && 'bg-primary-50 text-primary-500 font-semibold'
                  } hover:bg-primary-50 hover:text-primary-600 cursor-pointer`}
                  onClick={() => closeAllMenus(id)}
                  // onClick={() => closeAllMenus({ id, code, order, href, title, icon })}
                >
                  {icon}
                  {title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}

export default Navbar
