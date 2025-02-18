import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import Pagination from './Pagination'
import { PageI } from '../../types/common'
// import {
//   setPage,
//   setQ,
//   setId,
//   setRowData,
//   setIsOpenDeleteModal,
//   setIsOpenUpdateModal,
//   setUserId,
//   setIsOpenCreateModal,
//   setDragStart,
//   setDragEnter,
// } from '../../redux/slices/table'
// import { RootState } from '../../redux/store'
import { Button } from './Button'
import { ArrowDownIcon, ArrowIcon, FilterIcon, PencilIcon, TrashIcon } from './icons'
import { LoadingSpin } from './Skeleton'
import { debounce } from '../../utils/DebounceUtil'
import Search from './Search'

export interface Head<T> {
  name: string
  value?: keyof T
  type?: 'text' | 'number' | 'date' | 'component'
  format?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: (key?: boolean | string | string[] | T[] | any, id?: string, data?: T) => React.ReactNode
  className?: string
  colClassname?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Props<T = any[]> = {
  thead: Head<T>[]
  tbody: PageI<T>
  action?: boolean
  headerLayout?: { label?: string; visible?: boolean; description?: string }
  q?: boolean
  filter?: { isOpen: boolean; setIsOpen: (value: boolean) => void; children: React.ReactNode }
  button?: boolean
  customButton?: React.ReactNode
  idFromIndex?: boolean
  childrenList?: boolean
  pagination?: boolean
  drag?: boolean
  additionalAction?: (data: T) => React.ReactNode
  isLoading?: boolean
  handleDrag?: () => void
  setId: (data: any) => void
  setRowData: (data: any) => void
  setUserId: (data: any) => void
  setIsOpenCreateModal: (data: boolean) => void
  setIsOpenUpdateModal: (data: boolean) => void
  setIsOpenDeleteModal: (data: boolean) => void
  page: number
  setPage: (data: number) => void
  setQ: (data: string) => void
  setDragStart?: (data: any) => void
  setDragEnter?: (data: any) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionProps<T = any> = {
  id: string
  userId: string
  data: T
  additionalAction?: (data: T) => React.ReactNode
  setId: (data: any) => void
  setRowData: (data: any) => void
  setUserId: (data: any) => void
  setIsOpenUpdateModal: (data: boolean) => void
  setIsOpenDeleteModal: (data: boolean) => void
  pagination?: boolean
  drag?: boolean
  setDrag: (value: boolean) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TableProps<T = any> = React.FC<Props<T>>

function Actions({
  data,
  id,
  userId,
  additionalAction,
  pagination,
  drag,
  setDrag,
  setIsOpenDeleteModal,
  setIsOpenUpdateModal,
  setId,
  setRowData,
  setUserId,
}: ActionProps) {
  const handleClick = (type: string) => {
    if (type === 'delete') {
      setIsOpenDeleteModal?.(true)
    } else if (type === 'update') {
      setIsOpenUpdateModal?.(true)
    }
    setId?.(id)
    setRowData?.(data)
    if (userId) setUserId?.(userId)
  }

  return (
    <div className="flex items-center text-g6">
      <Button
        icon={<PencilIcon />}
        outline={true}
        borderStyle="none"
        onClick={() => handleClick('update')}
        variant="light"
        size="small"
      />
      <Button
        icon={<TrashIcon />}
        onClick={() => handleClick('delete')}
        variant="light"
        size="small"
        outline={true}
        borderStyle="none"
      />
      {additionalAction?.(data)}
      {!pagination && drag && (
        <i
          className="cursor-move px-2 hover:text-secondary"
          onMouseDown={() => {
            setDrag?.(true)
          }}
        >
          <ArrowIcon />
        </i>
      )}
    </div>
  )
}

export const Table: TableProps = ({
  thead,
  tbody,
  action = false,
  headerLayout = { visible: true },
  button,
  customButton,
  q,
  filter,
  additionalAction,
  isLoading,
  idFromIndex = true,
  childrenList = false,
  pagination = true,
  drag = false,
  handleDrag,
  page,
  setPage,
  setQ,
  setDragStart,
  setDragEnter,
  setId,
  setRowData,
  setUserId,
  setIsOpenCreateModal,
  setIsOpenUpdateModal,
  setIsOpenDeleteModal,
}: Props) => {
  // const { page } = useSelector((state: RootState) => state.tablePage)

  const { list, total } = tbody || [[], 0, 10]
  const max = 10
  // const { list, total, max } = tbody || [[], 0, 10]

  const [isDrag, setIsDrag] = useState<boolean>(false)
  const [hiddenClass, setHiddenClass] = useState<string[]>([])

  // const dispatch = useDispatch()

  const onPageChange = (_page: number) => {
    setPage?.(_page)
  }

  const handleChange = debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ?.(e.target.value)
    setPage?.(1)
  }, 1000)

  const handleOpenFilter = () => {
    filter?.setIsOpen?.(!filter?.isOpen)
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    setDragStart?.(id)
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    setDragEnter?.(id)
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    handleDrag?.()
    setIsDrag(false)
  }

  const handleChild = (id: number | string, length: number) => {
    if (length === 0) {
      return
    }

    const _id = String(id)
    setHiddenClass((prev) => {
      const exist = prev?.some((hid) => hid === _id)

      return exist ? prev?.filter((hid) => hid !== _id) : [...prev, _id]
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderNodes = (_data: any[], level = 0) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_data || []).map((data: any, index: number) => {
      const childrenCheck = !!(childrenList && data?.children && data?.children.length > 0)
      const check = hiddenClass?.some((id) => data?.id === +id)

      const padStyle = () => {
        switch (level) {
          case 1:
            return 'pl-8 pr-1'
          case 2:
            return 'pl-12 pr-1'
          default:
            return ''
        }
      }

      return (
        <React.Fragment key={data.id}>
          <tr
            key={data.id}
            className={`odd:bg-white bg-creyscale-100 ${level >= 1 && hiddenClass}`}
            draggable={isDrag}
            onDragStart={(e) => handleDragStart(e, data.id)}
            onDragEnter={(e) => handleDragEnter(e, data.id)}
            onDragEnd={(e) => handleDragEnd(e)}
          >
            {thead.map((col, i) => {
              const indexNumber = index + 1 + (page - 1) * (max || 10)

              const bottomRoundedCheckLeft = (total || 0) <= 10 && (list?.length || 1) - 1 === index && i === 0
              const bottomRoundedCheckRight =
                (total || 0) <= 10 && (list?.length || 1) - 1 === index && (thead?.length || 1) - 1 === i

              return (
                <td
                  key={i}
                  className={`first:text-center text-sm font-medium text-ellipsis py-4 px-1 ${i === 0 && padStyle()} ${
                    bottomRoundedCheckLeft && 'rounded-bl-lg'
                  } ${bottomRoundedCheckRight && 'rounded-br-lg'} ${idFromIndex && i === 0 && 'w-14'} ${
                    col?.className
                  }`}
                >
                  {idFromIndex && i === 0 ? (
                    <div
                      className="flex justify-center items-center cursor-pointer"
                      onClick={() => handleChild(data?.id || 0, data?.children?.length || 0)}
                    >
                      <div className={'pt-1 pr-[2px]'}>
                        {childrenCheck && i === 0 ? (
                          <ArrowDownIcon className={` h-5 w-3 ${!check && '-rotate-90'}`} />
                        ) : (
                          <div className=""></div>
                        )}
                      </div>

                      <p>{indexNumber}</p>
                    </div>
                  ) : (
                    (() => {
                      const renderArrowIcon = (
                        <div className={'pt-1 pr-[2px]'}>
                          {childrenCheck && i === 0 ? (
                            <ArrowDownIcon className={` h-5 w-5 ${!check && '-rotate-90'}`} />
                          ) : (
                            <div className=""></div>
                          )}
                        </div>
                      )

                      switch (col.type) {
                        case 'date':
                          return moment(data[col?.value || '']).format(col.format || 'YYYY-MM-DD')
                        default:
                          return (
                            <>
                              {childrenList && i === 0 ? (
                                <div
                                  className={`flex justify-center items-center cursor-pointer
                                    ${col?.colClassname}`}
                                  onClick={() => handleChild(data?.id || 0, data?.children?.length || 0)}
                                >
                                  {renderArrowIcon}
                                  {col?.component?.(data[col?.value || ''], data.id, data) ||
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    (data[col?.value || ''] as any)}
                                </div>
                              ) : (
                                <div className={`${col?.colClassname}`}>
                                  {col?.component?.(data[col?.value || ''], data.id, data) ||
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    (data[col?.value || ''] as any)}
                                </div>
                              )}
                            </>
                          )
                      }
                    })()
                  )}
                </td>
              )
            })}
            {action && (
              <td>
                <Actions
                  additionalAction={additionalAction}
                  data={data}
                  id={data.id}
                  userId={data.userId || data.id}
                  pagination={pagination}
                  drag={drag}
                  setDrag={setIsDrag}
                  setId={setId}
                  setRowData={setRowData}
                  setUserId={setUserId}
                  setIsOpenUpdateModal={setIsOpenUpdateModal}
                  setIsOpenDeleteModal={setIsOpenDeleteModal}
                />
              </td>
            )}
          </tr>

          {childrenCheck && check && renderNodes(data?.children, level + 1)}
        </React.Fragment>
      )
    })

  return (
    <div className="container mx-auto border rounded-t-lg rounded-b-lg">
      <div
        className={`bg-white border border-creyscale-100 rounded-t-lg items-center flex py-5 px-6 ${
          headerLayout ? 'justify-between' : 'justify-end'
        }`}
      >
        {headerLayout && (
          <div>
            <div className="flex gap-1 text-xl font-semibold">
              <p>{headerLayout?.label}</p>
            </div>
            <p className="text-sm font-medium text-creyscale-500">{headerLayout?.description}</p>
          </div>
        )}
        <div className="flex gap-3">
          {q && <Search onChange={handleChange} />}

          {filter && (
            <Button variant="secondary" icon={<FilterIcon />} onClick={handleOpenFilter}>
              Шүүлтүүр
            </Button>
          )}

          {button ? (
            <Button onClick={() => setIsOpenCreateModal?.(true)} variant="secondary">
              Шинээр үүсгэх
            </Button>
          ) : (
            customButton
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="rounded-lg text-left table-auto w-full">
          <thead>
            <tr className="text-base bg-creyscale-100">
              {thead.map((h, i) => (
                <th key={i} className={`first:px-4 first:text-center py-4 px-1 font-semibold ${h.className}`}>
                  {h.name}
                </th>
              ))}
              {action && <th className="font-semibold py-3 w-72">Үйлдэл</th>}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="border-t">
                <td colSpan={action ? thead.length + 1 : thead.length} className="text-center py-24">
                  <LoadingSpin />
                </td>
              </tr>
            ) : (
              <>
                {list?.length > 0 ? (
                  <>{renderNodes(list)}</>
                ) : (
                  <tr className="border-t">
                    <td colSpan={action ? thead.length + 1 : thead.length} className="text-center py-14">
                      No data Found
                    </td>
                  </tr>
                )}
              </>
            )}
            {pagination ? (
            // {total > 10 && pagination ? (
              <tr className="bg-white">
                <td className="rounded-b-lg" colSpan={action ? thead.length + 1 : thead.length}>
                  <Pagination total={total || 0} pageSize={max} onChange={onPageChange} current={page} />
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {filter?.isOpen && filter?.children}
    </div>
  )
}

// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import moment from 'moment'
// import Pagination from './Pagination'
// import { PageI } from '../../types/common'
// import {
//   setPage,
//   setQ,
//   setId,
//   setRowData,
//   setIsOpenDeleteModal,
//   setIsOpenUpdateModal,
//   setUserId,
//   setIsOpenCreateModal,
//   setDragStart,
//   setDragEnter,
// } from '../../redux/slices/table'
// import { RootState } from '../../redux/store'
// import { Button } from './Button'
// import { ArrowDownIcon, ArrowIcon, FilterIcon, PencilIcon, TrashIcon } from '../icons/icons'
// import { debounce } from '../../utils/DebounceUtil'
// import { LoadingSpin } from './Skeleton'
// import Search from './Search'

// export interface Head<T> {
//   name: string
//   value?: keyof T
//   type?: 'text' | 'number' | 'date' | 'component'
//   format?: string
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   component?: (key?: boolean | string | string[] | T[] | any, id?: string, data?: T) => React.ReactNode
//   className?: string
//   colClassname?: string
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export type Props<T = any[]> = {
//   thead: Head<T>[]
//   tbody: PageI<T>
//   action?: boolean
//   headerLayout?: { label?: string; visible?: boolean; description?: string }
//   q?: boolean
//   filter?: { isOpen: boolean; setIsOpen: (value: boolean) => void; children: React.ReactNode }
//   button?: boolean
//   customButton?: React.ReactNode
//   idFromIndex?: boolean
//   childrenList?: boolean
//   pagination?: boolean
//   drag?: boolean
//   additionalAction?: (data: T) => React.ReactNode
//   isLoading?: boolean
//   handleDrag?: () => void
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// type ActionProps<T = any> = {
//   id: string
//   userId: string
//   data: T
//   additionalAction?: (data: T) => React.ReactNode
//   pagination?: boolean
//   drag?: boolean
//   setDrag: (value: boolean) => void
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// type TableProps<T = any> = React.FC<Props<T>>

// function Actions({ data, id, userId, additionalAction, pagination, drag, setDrag }: ActionProps) {
//   const dispatch = useDispatch()

//   const handleClick = (type: string) => {
//     if (type === 'delete') {
//       dispatch(setIsOpenDeleteModal(true))
//     } else if (type === 'update') {
//       dispatch(setIsOpenUpdateModal(true))
//     }
//     dispatch(setId(id))
//     dispatch(setRowData(data))
//     if (userId) dispatch(setUserId(userId))
//   }

//   return (
//     <div className="flex items-center text-g6">
//       <Button
//         icon={<PencilIcon />}
//         outline={true}
//         borderStyle="none"
//         onClick={() => handleClick('update')}
//         variant="light"
//         size="small"
//       />
//       <Button
//         icon={<TrashIcon />}
//         onClick={() => handleClick('delete')}
//         variant="light"
//         size="small"
//         outline={true}
//         borderStyle="none"
//       />
//       {additionalAction?.(data)}
//       {!pagination && drag && (
//         <i
//           className="cursor-move px-2 hover:text-secondary"
//           onMouseDown={() => {
//             setDrag?.(true)
//           }}
//         >
//           <ArrowIcon />
//         </i>
//       )}
//     </div>
//   )
// }

// export const Table: TableProps = ({
//   thead,
//   tbody,
//   action = false,
//   headerLayout = { visible: true },
//   button,
//   customButton,
//   q,
//   filter,
//   additionalAction,
//   isLoading,
//   idFromIndex = true,
//   childrenList = false,
//   pagination = true,
//   drag = false,
//   handleDrag,
// }: Props) => {
//   const { page } = useSelector((state: RootState) => state.tablePage)

//   const { list, total, max } = tbody || [[], 0, 10]

//   const [isDrag, setIsDrag] = useState<boolean>(false)
//   const [hiddenClass, setHiddenClass] = useState<string[]>([])

//   const dispatch = useDispatch()

//   const onPageChange = (_page: number) => {
//     dispatch(setPage(_page))
//   }

//   const handleChange = debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(setQ(e.target.value))
//     dispatch(setPage(1))
//   }, 1000)

//   const handleOpenFilter = () => {
//     filter?.setIsOpen?.(!filter?.isOpen)
//   }

//   const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
//     dispatch(setDragStart(id))
//   }

//   const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, id: number) => {
//     dispatch(setDragEnter(id))
//   }

//   const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
//     handleDrag?.()
//     setIsDrag(false)
//   }

//   const handleChild = (id: number | string, length: number) => {
//     if (length === 0) {
//       return
//     }

//     const _id = String(id)
//     setHiddenClass((prev) => {
//       const exist = prev?.some((hid) => hid === _id)

//       return exist ? prev?.filter((hid) => hid !== _id) : [...prev, _id]
//     })
//   }

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const renderNodes = (_data: any[], level = 0) =>
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     (_data || []).map((data: any, index: number) => {
//       const childrenCheck = !!(childrenList && data?.children && data?.children.length > 0)
//       const check = hiddenClass?.some((id) => data?.id === +id)

//       const padStyle = () => {
//         switch (level) {
//           case 1:
//             return 'pl-8 pr-1'
//           case 2:
//             return 'pl-12 pr-1'
//           default:
//             return ''
//         }
//       }

//       return (
//         <React.Fragment key={data.id}>
//           <tr
//             key={data.id}
//             className={`odd:bg-white bg-creyscale-100 ${level >= 1 && hiddenClass}`}
//             draggable={isDrag}
//             onDragStart={(e) => handleDragStart(e, data.id)}
//             onDragEnter={(e) => handleDragEnter(e, data.id)}
//             onDragEnd={(e) => handleDragEnd(e)}
//           >
//             {thead.map((col, i) => {
//               const indexNumber = index + 1 + (page - 1) * (max || 10)

//               const bottomRoundedCheckLeft = (total || 0) <= 10 && (list?.length || 1) - 1 === index && i === 0
//               const bottomRoundedCheckRight =
//                 (total || 0) <= 10 && (list?.length || 1) - 1 === index && (thead?.length || 1) - 1 === i

//               return (
//                 <td
//                   key={i}
//                   className={`first:text-center text-sm font-medium text-ellipsis py-4 px-1 ${i === 0 && padStyle()} ${
//                     bottomRoundedCheckLeft && 'rounded-bl-lg'
//                   } ${bottomRoundedCheckRight && 'rounded-br-lg'} ${idFromIndex && i === 0 && 'w-14'} ${
//                     col?.className
//                   }`}
//                 >
//                   {idFromIndex && i === 0 ? (
//                     <div
//                       className="flex justify-center items-center cursor-pointer"
//                       onClick={() => handleChild(data?.id || 0, data?.children?.length || 0)}
//                     >
//                       <div className={'pt-1 pr-[2px]'}>
//                         {childrenCheck && i === 0 ? (
//                           <ArrowDownIcon className={` h-5 w-3 ${!check && '-rotate-90'}`} />
//                         ) : (
//                           <div className=""></div>
//                         )}
//                       </div>

//                       <p>{indexNumber}</p>
//                     </div>
//                   ) : (
//                     (() => {
//                       const renderArrowIcon = (
//                         <div className={'pt-1 pr-[2px]'}>
//                           {childrenCheck && i === 0 ? (
//                             <ArrowDownIcon className={` h-5 w-5 ${!check && '-rotate-90'}`} />
//                           ) : (
//                             <div className=""></div>
//                           )}
//                         </div>
//                       )

//                       switch (col.type) {
//                         case 'date':
//                           return moment(data[col?.value || '']).format(col.format || 'YYYY-MM-DD')
//                         default:
//                           return (
//                             <>
//                               {childrenList && i === 0 ? (
//                                 <div
//                                   className={`flex justify-center items-center cursor-pointer
//                                     ${col?.colClassname}`}
//                                   onClick={() => handleChild(data?.id || 0, data?.children?.length || 0)}
//                                 >
//                                   {renderArrowIcon}
//                                   {col?.component?.(data[col?.value || ''], data.id, data) ||
//                                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                                     (data[col?.value || ''] as any)}
//                                 </div>
//                               ) : (
//                                 <div className={`${col?.colClassname}`}>
//                                   {col?.component?.(data[col?.value || ''], data.id, data) ||
//                                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                                     (data[col?.value || ''] as any)}
//                                 </div>
//                               )}
//                             </>
//                           )
//                       }
//                     })()
//                   )}
//                 </td>
//               )
//             })}
//             {action && (
//               <td>
//                 <Actions
//                   additionalAction={additionalAction}
//                   data={data}
//                   id={data.id}
//                   userId={data.userId || data.id}
//                   pagination={pagination}
//                   drag={drag}
//                   setDrag={setIsDrag}
//                 />
//               </td>
//             )}
//           </tr>

//           {childrenCheck && check && renderNodes(data?.children, level + 1)}
//         </React.Fragment>
//       )
//     })

//   return (
//     <div className="container mx-auto border rounded-t-lg rounded-b-lg">
//       <div
//         className={`bg-white border border-creyscale-100 rounded-t-lg items-center flex py-5 px-6 ${
//           headerLayout ? 'justify-between' : 'justify-end'
//         }`}
//       >
//         {headerLayout && (
//           <div>
//             <div className="flex gap-1 text-xl font-semibold">
//               <p>{headerLayout?.label}</p>
//             </div>
//             <p className="text-sm font-medium text-creyscale-500">{headerLayout?.description}</p>
//           </div>
//         )}
//         <div className="flex gap-3">
//           {q && <Search onChange={handleChange} />}

//           {filter && (
//             <Button variant="secondary" icon={<FilterIcon />} onClick={handleOpenFilter}>
//               Шүүлтүүр
//             </Button>
//           )}

//           {button ? (
//             <Button onClick={() => dispatch(setIsOpenCreateModal(true))} variant="secondary">
//               Шинээр үүсгэх
//             </Button>
//           ) : (
//             customButton
//           )}
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="rounded-lg text-left table-auto w-full">
//           <thead>
//             <tr className="text-base bg-creyscale-100">
//               {thead.map((h, i) => (
//                 <th key={i} className={`first:px-4 first:text-center py-4 px-1 font-semibold ${h.className}`}>
//                   {h.name}
//                 </th>
//               ))}
//               {action && <th className="font-semibold py-3 w-72">Үйлдэл</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {isLoading ? (
//               <tr className="border-t">
//                 <td colSpan={action ? thead.length + 1 : thead.length} className="text-center py-24">
//                   <LoadingSpin />
//                 </td>
//               </tr>
//             ) : (
//               <>
//                 {list?.length > 0 ? (
//                   <>{renderNodes(list)}</>
//                 ) : (
//                   <tr className="border-t">
//                     <td colSpan={action ? thead.length + 1 : thead.length} className="text-center py-14">
//                       No data Found
//                     </td>
//                   </tr>
//                 )}
//               </>
//             )}
//             {total > 10 && pagination ? (
//               <tr className="bg-white">
//                 <td className="rounded-b-lg" colSpan={action ? thead.length + 1 : thead.length}>
//                   <Pagination total={total || 0} pageSize={max} onChange={onPageChange} current={page} />
//                 </td>
//               </tr>
//             ) : null}
//           </tbody>
//         </table>
//       </div>

//       {filter?.isOpen && filter?.children}
//     </div>
//   )
// }
