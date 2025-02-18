import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import withLayoutAuth from '../../components/hoc/WithLayoutAuth'
import { Head, Table } from '../../components/common/Table'
import { Role, UserResponse } from '../../models/UserResponse'
import { PageI } from '../../types/common'
import { restClient } from '../../lib/httpClient'

function Users() {
  const [id, setId] = useState<any>()
  const [rowData, setRowData] = useState<any>()
  const [userId, setUserId] = useState<any>()
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)

  const [page, setPage] = useState<number>(1)
  const [q, setQ] = useState<string>('')
  // console.log('🚀 ~ Users ~ q:', q)
  const [dragStart, setDragStart] = useState<any>()
  const [dragEnter, setDragEnter] = useState<any>()

  const dummyArray: UserResponse[] = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: (index + 1).toString(),
    firstName: index + 1 + '1',
    lastName: 'Noah',
    email: 'noah@g.com',
    role: Role.USER,
    profileImageUrl: '',
    connectedAccounts: [],
    authorities: [],
  }))

  const data = { list: dummyArray, page: 1, total: 20, max: 10 }

  console.log(dummyArray)

  const theadData: Head<UserResponse>[] = [
    { name: '№', value: 'id' },
    { name: 'И-мэйл', value: 'email' },
    { name: 'Овог', value: 'lastName' },
    { name: 'Нэр', value: 'firstName' },
    // {
    //   name: 'Хэрэглэгчийн мэдээлэл',
    //   component: (key, id, rowData?: UserI) => (
    //     <div className="flex items-center space-x-2">
    //       <Image
    //         src={`${rowData?.profilePic || '/assets/mobile-logo.png'}`}
    //         width={36}
    //         height={36}
    //         alt=""
    //         className="rounded-full"
    //       />
    //       <div className="text-sm">
    //         <div className="text-creyscale-900 font-semibold truncate">{rowData?.firstName}</div>
    //         <div className="text-creyscale-500">{rowData?.lastName}</div>
    //       </div>
    //     </div>
    //   ),
    // },
    // { name: 'Утас', value: 'phone' },
    // {
    //   name: 'Үйлдэл',
    //   component: (key, id, row?: SystemMenuI) => (
    //     <>
    //       <div className="flex items-center text-g6">
    //         <Button
    //           icon={<PencilIcon />}
    //           outline={true}
    //           borderStyle="none"
    //           onClick={() => handleClick('update', row)}
    //           variant="light"
    //           size="small"
    //         />

    //         <Button
    //           icon={<TrashIcon />}
    //           onClick={() => handleClick('delete', row)}
    //           variant="light"
    //           size="small"
    //           outline={true}
    //           borderStyle="none"
    //         />

    //         {row?.isPrivate && (
    //           <Button
    //             icon={<KeyIcon />}
    //             outline={true}
    //             borderStyle="none"
    //             onClick={() => handlePerm(row)}
    //             variant="light"
    //             size="small"
    //           />
    //         )}
    //       </div>
    //     </>
    //   ),
    // },
  ]

  return (
    <div>
      <div>
        <Table
          thead={theadData}
          tbody={data as PageI<UserResponse[]>}
          action={false}
          headerLayout={{ label: 'Хэрэглэгчийн жагсаалт', description: 'Хэрэглэгчийн жагсаалт харж болно' }}
          // customButton={renderCustomButton(role)}
          setId={setId}
          setRowData={setRowData}
          setUserId={setUserId}
          setIsOpenCreateModal={setIsOpenCreateModal}
          setIsOpenUpdateModal={setIsOpenUpdateModal}
          setIsOpenDeleteModal={setIsOpenDeleteModal}
          page={page}
          setPage={setPage}
          q={true}
          setQ={setQ}
          setDragStart={setDragStart}
          setDragEnter={setDragEnter}
        />
      </div>
    </div>
  )
}

export default withLayoutAuth()(Users)
