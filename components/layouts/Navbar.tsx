import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
// import { useCommonContext } from '../../context/CommonContext'
// import { useNotifySocket } from '../hooks/UseNotifySocket'
import { useAlert } from '../hooks/UseAlert'
// import { getUnreadCount } from '../../redux/slices/inbox'
// import { useSystemMenusQuery } from '../../redux/services'
// import { SystemMenuCodeEnum, SystemMenuTypeEnum } from '../../types/enum'
// import { menuIcons, MenuIconEnum } from '../../types/menu.type'
// import { MenuI } from '../../types/common'

function Navbar() {
  const router = useRouter()
  const { botNo } = router.query
  // const { t, setMenuChildrens } = useCommonContext()
  // const { liveNoti } = useNotifySocket()
  const [show, Alert] = useAlert(10000)
  // const unReadCount = useSelector(getUnreadCount)

  const { asPath } = router

  const matchUrl = (url: string, pattern: string) => {
    const regex = new RegExp(`^${pattern.replace(/:[^\s/]+/g, '([\\w-]+)')}$`)
    return regex.test(url)
  }

  // const { data: menuData } = useSystemMenusQuery({
  //   type: router?.pathname?.includes('/admin') ? SystemMenuTypeEnum.ADMIN : SystemMenuTypeEnum.BOT,
  // })

  // const prepareMenus = () => {
  //   const menus: MenuI[] = []

  //   menuData?.forEach((menu) => {
  //     const subMenus: MenuI[] = []

  //     if (menu?.children && menu?.children?.length > 0) {
  //       menu.children.forEach((sub) => {
  //         subMenus.push({
  //           id: sub.id || 0,
  //           code: sub?.code,
  //           order: sub.order || 0,
  //           href: sub?.url,
  //           title: sub.name || '',
  //           icon: sub?.icon,
  //         })
  //       })
  //     }

  //     menus.push({
  //       id: menu.id || 0,
  //       code: menu?.code,
  //       order: menu.order || 0,
  //       href: menu?.url,
  //       title: menu.name || '',
  //       icon: menu?.icon,
  //       subMenus,
  //     })

  //     return menu
  //   })

  //   return menus
  // }

  // const menuItems = menuData
  //   ? prepareMenus()
  //   : [
  //       // {
  //       //   href: '',
  //       //   title: t?.home,
  //       //   icon: <HomeIcon />,
  //       // },
  //       {
  //         id: 0,
  //         order: 0,
  //         // code: SystemMenuCodeEnum.action,
  //         href: 'message',
  //         title: t?.messageBlock || '',
  //         icon: '',
  //         // icon: <MessageBlockIcon />,
  //         subMenus: [],
  //       },
  //       // {
  //       //   id: 1,
  //       //   order: 1,
  //       //   href: 'dynamic',
  //       //   title: 'Dynamic content',
  //       //   icon: <BarChartIcon />,
  //       //   subMenus: [
  //       //     {
  //       //       href: 'form',
  //       //       title: 'Форм',
  //       //     },
  //       //     {
  //       //       href: 'intent',
  //       //       title: 'Харилцан яриа',
  //       //     },
  //       //     {
  //       //       href: 'static',
  //       //       title: 'Статик хуудас',
  //       //     },
  //       //     {
  //       //       href: 'sequence',
  //       //       title: 'Захиалгат зурвас',
  //       //     },
  //       //     {
  //       //       href: 'newshop',
  //       //       title: 'Дэлгүүр',
  //       //     },
  //       //     {
  //       //       href: 'action',
  //       //       title: 'Хариу үйлдэл',
  //       //     },
  //       //   ],
  //       // },
  //       // {
  //       //   id: 2,
  //       //   order: 2,
  //       //   href: 'settings',
  //       //   title: t?.settings,
  //       //   icon: <SettingIcon />,
  //       //   subMenus: [],
  //       // },
  //       // {
  //       //   id: 3,
  //       //   order: 3,
  //       //   href: 'sender',
  //       //   title: t?.sender,
  //       //   icon: <UserIcon />,
  //       //   subMenus: [],
  //       // },
  //       // // {
  //       // //   id: 4,
  //       // //   order: 4,
  //       // //   href: 'inbox',
  //       // //   title: t?.liveChat,
  //       // //   icon: <LiveChatIcon count={unReadCount} />,
  //       // // },
  //       // {
  //       //   id: 5,
  //       //   order: 5,
  //       //   href: 'user',
  //       //   title: t?.systemUsers,
  //       //   icon: <UserIcon />,
  //       //   subMenus: [],
  //       // },
  //       // {
  //       //   id: 6,
  //       //   order: 6,
  //       //   href: 'operator',
  //       //   title: t?.operator,
  //       //   icon: <UserGroupIcon className="w-6 h-6 mr-1" />,
  //       //   subMenus: [],
  //       // },
  //     ]
  const menuItems: any[] = [
    // {
    //   href: '',
    //   title: t?.home,
    //   icon: <HomeIcon />,
    // },
    {
      id: 0,
      order: 0,
      code: 'first',
      // code: SystemMenuCodeEnum.action,
      href: 'message',
      title: 'Menu First',
      icon: '',
      // icon: <MessageBlockIcon />,
      subMenus: [],
    },
    // {
    //   id: 1,
    //   order: 1,
    //   href: 'dynamic',
    //   title: 'Dynamic content',
    //   icon: <BarChartIcon />,
    //   subMenus: [
    //     {
    //       href: 'form',
    //       title: 'Форм',
    //     },
    //     {
    //       href: 'intent',
    //       title: 'Харилцан яриа',
    //     },
    //     {
    //       href: 'static',
    //       title: 'Статик хуудас',
    //     },
    //     {
    //       href: 'sequence',
    //       title: 'Захиалгат зурвас',
    //     },
    //     {
    //       href: 'newshop',
    //       title: 'Дэлгүүр',
    //     },
    //     {
    //       href: 'action',
    //       title: 'Хариу үйлдэл',
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   order: 2,
    //   href: 'settings',
    //   title: t?.settings,
    //   icon: <SettingIcon />,
    //   subMenus: [],
    // },
    // {
    //   id: 3,
    //   order: 3,
    //   href: 'sender',
    //   title: t?.sender,
    //   icon: <UserIcon />,
    //   subMenus: [],
    // },
    // // {
    // //   id: 4,
    // //   order: 4,
    // //   href: 'inbox',
    // //   title: t?.liveChat,
    // //   icon: <LiveChatIcon count={unReadCount} />,
    // // },
    // {
    //   id: 5,
    //   order: 5,
    //   href: 'user',
    //   title: t?.systemUsers,
    //   icon: <UserIcon />,
    //   subMenus: [],
    // },
    // {
    //   id: 6,
    //   order: 6,
    //   href: 'operator',
    //   title: t?.operator,
    //   icon: <UserGroupIcon className="w-6 h-6 mr-1" />,
    //   subMenus: [],
    // },
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
        <Link href="/">
          <Image src="/assets/logo.png" width={160} height={40} alt="" className="-mx-1 my-1" />
        </Link>
        <ul>
          {menuItems.map(({ id, code, order, href, title, icon, subMenus }, i) => (
            <li className="bg-white dark:bg-gray-900 text-g6 dark:text-white font-semibold" key={id || href}>
              {subMenus && subMenus?.length > 0 && !href ? (
                <>
                  <label
                    htmlFor={`${id || href || '#'}`}
                    className="w-full flex items-center justify-between p-2 rounded hover:bg-primary-50 hover:text-primary-600 cursor-pointer"
                  >
                    <span className="flex items-center gap-x-2 hover:bg-primary-50 hover:text-primary-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.379 8.379 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
                        />
                      </svg>
                      {/* {typeof icon === 'string' ? menuIcons?.[icon as MenuIconEnum]?.({}) : icon} */}
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
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 20V10m-6 10V4M6 20v-6"
                    />
                  </svg>
                  {/* {typeof icon === 'string' ? menuIcons?.[icon as MenuIconEnum]?.({}) : icon} */}
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
