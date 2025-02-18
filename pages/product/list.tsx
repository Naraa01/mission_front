import React, { useEffect, useState } from 'react'
import withLayoutAuth from '../../components/hoc/WithLayoutAuth'
import { restClient } from '../../lib/httpClient'
import { Head, Table } from '../../components/common/Table'
import { PageI, ProductResponse } from '../../types/common'
import { Button } from '../../components/common/Button'
import { ModalBox } from '../../components/common/ModalBox'
import { FormInput } from '../../components/common/FormElements'
import { useAlert } from '../../components/hooks/UseAlert'

interface ActionProps {
  rowData?: any
  isOpenCreateModal?: boolean
  isOpenUpdateModal?: boolean
  isOpenDeleteModal?: boolean
  setIsOpenCreateModal?: (data: boolean) => void
  setIsOpenUpdateModal?: (data: boolean) => void
  setIsOpenDeleteModal?: (data: boolean) => void
  refetchList?: () => void
}

interface ModalDataI {
  name?: string
  count?: string
  description?: string
  price?: string
  imageUrl?: string
}

function ActionModal({
  rowData,
  isOpenCreateModal,
  isOpenUpdateModal,
  isOpenDeleteModal,
  setIsOpenCreateModal,
  setIsOpenUpdateModal,
  setIsOpenDeleteModal,
  refetchList,
}: ActionProps) {
  console.log('pppp -> 🚀 ~ ActionModal ~ props:', rowData, isOpenCreateModal, isOpenUpdateModal, isOpenDeleteModal)

  const [show, Alert] = useAlert()

  const defaultModalData = {
    name: '',
    count: '',
    description: '',
    price: '',
    imageUrl: '',
  }
  const [modalData, setModalData] = useState<ModalDataI>(defaultModalData)

  useEffect(() => {
    if (isOpenUpdateModal) {
      setModalData({
        name: rowData?.name || '',
        count: rowData?.count,
        description: rowData?.description,
        price: rowData?.price,
      })
    }

    if (!(isOpenUpdateModal || isOpenDeleteModal)) {
      setModalData(defaultModalData)
    }
  }, [isOpenUpdateModal || isOpenCreateModal])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('🚀 ~ handleClose ~ handleClose:')
    try {
      e.preventDefault()
      // const result = FormValidation.safeParse(modalData)

      if (isOpenCreateModal) {
        console.log('🚀 ~ handleSubmit ~ isOpenCreateModal:', isOpenCreateModal)

        restClient
          .createProduct(modalData)
          .then((data: any) => {
            // setProducts(data)
            setIsOpenCreateModal?.(false)
            refetchList?.()
          })
          .catch((error: any) => {
            // console.error('🚀 ~ onProtected ~ error:', error)
          })

        //         show({ message: t?.createSuccessMessage, type: 'success' })
        // setModalData(defaulFormInput)
      }

      if (isOpenDeleteModal) {
        console.log('🚀 ~ handleSubmit ~ isOpenDeleteModal:', isOpenDeleteModal)

        restClient
          .deleteProduct({ id: rowData?.id || 0 })
          .then((data: any) => {
            console.info('🚀 ~ deleteProduct ~ data:', data)
            setIsOpenDeleteModal?.(false)
            refetchList?.()
          })
          .catch((error: any) => {
            // console.error('🚀 ~ onProtected ~ error:', error)
          })

        // show({ message: t?.deleteSuccessMessage, type: 'success' })
      }

      if (isOpenUpdateModal) {
        console.log('🚀 ~ handleSubmit ~ isOpenUpdateModal:', isOpenUpdateModal)

        restClient
          .updateProduct({ id: rowData?.id || 0, ...modalData })
          .then((data: any) => {
            console.info('🚀 ~ updateProduct ~ data:', data)
            setIsOpenUpdateModal?.(false)
            refetchList?.()
          })
          .catch((error: any) => {
            // console.error('🚀 ~ onProtected ~ error:', error)
          })

        // show({ message: t?.updateSuccessMessage, type: 'success' })
      }

      // refetch()
      // const result = FormValidation.safeParse(modalData)

      // if (isOpenCreateModal) {
      //   if (!result.success) {
      //     const messages = result?.error?.errors?.[0]?.message
      //     show({ message: messages, type: 'error' })
      //     return
      //   }
      //   await create({ botNo, ...modalData }).unwrap()

      //   dispatch(setIsOpenCreateModal(false))
      //   show({ message: t?.createSuccessMessage, type: 'success' })
      //   setModalData(defaulFormInput)
      // }

      // if (isOpenDeleteModal) {
      //   await remove({ botNo, id: rowData?.id as string }).unwrap()
      //   dispatch(setIsOpenDeleteModal(false))
      //   show({ message: t?.deleteSuccessMessage, type: 'success' })
      // }

      // if (isOpenUpdateModal) {
      //   if (!result.success) {
      //     const messages = result?.error?.errors?.[0]?.message
      //     show({ message: messages, type: 'error' })
      //     return
      //   }
      //   await update({ botNo, id: rowData?.id as string, ...modalData }).unwrap()
      //   dispatch(setIsOpenUpdateModal(false))
      //   show({ message: t?.updateSuccessMessage, type: 'success' })
      // }

      // refetch()
    } catch (err) {
      show({ message: err as string, type: 'error' })
      console.error(err)
    }
  }

  const handleClose = () => {
    if (isOpenCreateModal) setIsOpenCreateModal?.(false)
    if (isOpenUpdateModal) setIsOpenUpdateModal?.(false)
    if (isOpenDeleteModal) setIsOpenDeleteModal?.(false)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setModalData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    console.log('🚀 ~ handleClose ~ handleClose:')
  }

  return (
    <>
      <Alert />
      <ModalBox
        title=""
        isOpen={isOpenCreateModal || isOpenUpdateModal || isOpenDeleteModal || false}
        buttonVisible={false}
        onClose={handleClose}
      >
        {/* TODO: Delete item  */}
        {isOpenDeleteModal ? (
          <div className="space-y-4">
            <h2>
              &#34; {rowData?.name} &#34; нэртэй Барааг устгах уу?
              <br />
              Бараа устгавал сэргээх боломжгүйг анхаарна уу!
            </h2>
            <div className="flex justify-end space-x-2">
              <Button onClick={handleSubmit}>
                {/* <Button onClick={handleSubmit} loading={deleteLoading}> */}
                Тийм
              </Button>
              <Button variant="light" onClick={handleClose}>
                Үгүй
              </Button>
            </div>
          </div>
        ) : (
          // TODO: Create & Update
          <form action="" className="space-y-4">
            <h2>{isOpenCreateModal ? 'Бараа нэмэх' : 'Бараа засах'}</h2>
            <FormInput
              name="name"
              type=""
              label="Барааны нэр"
              placeholder="Барааны нэр оруулна уу"
              value={modalData.name}
              onChange={onChange}
            ></FormInput>
            <FormInput
              name="description"
              type=""
              label="Тайлбар"
              placeholder="Тайлбар оруулна уу"
              value={modalData.description}
              onChange={onChange}
            ></FormInput>
            <FormInput
              name="count"
              type=""
              label="Тоо"
              placeholder="Тоо, ширхэг оруулна уу"
              value={modalData.count}
              onChange={onChange}
            ></FormInput>
            <FormInput
              name="price"
              type=""
              label="Үнэ"
              placeholder="Үнэ оруулна уу"
              value={modalData.price}
              onChange={onChange}
            ></FormInput>

            <div className="flex justify-end space-x-2">
              <Button onClick={handleSubmit}>{isOpenCreateModal ? 'Үүсгэх' : 'Хадгалах'}</Button>
              <Button variant="light" onClick={handleClose}>
                {'Буцах'}
              </Button>
            </div>
          </form>
        )}
      </ModalBox>
    </>
  )
}

function ProductList() {
  const [id, setId] = useState<any>()
  const [rowData, setRowData] = useState<any>()
  const [userId, setUserId] = useState<any>()
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)

  const [page, setPage] = useState<number>(1)
  const [q, setQ] = useState<string>('')
  console.log('🚀 ~ Users ~ q:', q)
  const [dragStart, setDragStart] = useState<any>()
  const [dragEnter, setDragEnter] = useState<any>()

  const [products, setProducts] = useState<any>()

  const [isFetched, setIsFetched] = useState<boolean>(false)

  const fetchProduct = async () => {
    const query = q ? { page: page, max: 10, q } : { page: page, max: 10 }

    restClient
      .getProduct(query)
      .then((data: any) => {
        console.info('🚀 ~ .then ~ data:', data)
        setProducts(data)
        setIsFetched(true)
      })
      .catch((error: any) => {
        // console.error('🚀 ~ onProtected ~ error:', error)
      })
  }

  useEffect(() => {
    fetchProduct()
  }, [page, q])

  const theadData: Head<ProductResponse>[] = [
    { name: '№', value: 'id' },
    { name: 'Нэр', value: 'name' },
    { name: 'Тоо ширхэг', value: 'count' },
    { name: 'Үнэ', value: 'price' },
  ]

  return (
    <div>
      <div>
        {products && (
          <Table
            thead={theadData}
            tbody={products as PageI<ProductResponse[]>}
            headerLayout={{ label: 'Жагсаалт', description: 'Жагсаалт харж болно' }}
            // customButton={renderCustomButton(role)}
            button={true}
            action={true}
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
        )}
      </div>

      {(isOpenCreateModal || isOpenUpdateModal || isOpenDeleteModal) && (
        <ActionModal
          rowData={rowData}
          isOpenCreateModal={isOpenCreateModal}
          isOpenUpdateModal={isOpenUpdateModal}
          isOpenDeleteModal={isOpenDeleteModal}
          setIsOpenCreateModal={setIsOpenCreateModal}
          setIsOpenUpdateModal={setIsOpenUpdateModal}
          setIsOpenDeleteModal={setIsOpenDeleteModal}
          refetchList={fetchProduct}
        />
      )}
    </div>
  )
}

export default withLayoutAuth()(ProductList)
