import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import purchaseApi from '~/apis/purchase.api'
import Button from '~/components/Button'
import QuantityController from '~/components/QuantityController'
import path from '~/constants/path'
import { purchasesStatus } from '~/constants/purchase'
import { Purchase } from '~/types/purchase.type'
import { formatCurrency, generateNameId } from '~/utils/utils'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { toast } from 'react-toastify'
import { AppContext } from '~/contexts/app.context'

export default function Cart() {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const { data: purchaseInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const buyProductMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1500
      })
    }
  })
  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const location = useLocation()
  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string | null })?.purchaseId
  const purchaseInCart = purchaseInCartData?.data.data
  const isAllChecked = useMemo(
    () => extendedPurchases.length > 0 && extendedPurchases.every((purchase) => purchase.checked),
    [extendedPurchases]
  )
  const checkedPurchases = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((total, purchase) => {
        return total + purchase.price * purchase.buy_count
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((total, purchase) => {
        return total + (purchase.price_before_discount - purchase.price) * purchase.buy_count
      }, 0),
    [checkedPurchases]
  )

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchaseInCart?.map((purchase) => {
          const isChoosenPurchaseFromLocation = choosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosenPurchaseFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchaseInCart, choosenPurchaseIdFromLocation, setExtendedPurchases])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const hanldeCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const hanldeCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }

  const handleDeleteManyPurchases = () => {
    const purchasesIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchasesIds)
  }

  const handleBuyPurchases = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductMutation.mutate(body)
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {extendedPurchases.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={isAllChecked}
                          onChange={hanldeCheckAll}
                        />
                      </div>
                      <div className='flex-grow text-black'>Sản phẩm</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>Số lượng</div>
                      <div className='col-span-1'>Số tiền</div>
                      <div className='col-span-1'>Thao tác</div>
                    </div>
                  </div>
                </div>

                {extendedPurchases.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow'>
                    {extendedPurchases.map((purchase, index) => (
                      <div
                        key={purchase._id}
                        className='grid items-center grid-cols-12 rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0 mb-5'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex items-center'>
                              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                                <input
                                  type='checkbox'
                                  className='h-5 w-5 accent-orange'
                                  checked={purchase.checked}
                                  onChange={hanldeCheck(index)}
                                />
                              </div>
                              <div className='flex-grow'>
                                <div className='flex'>
                                  <Link
                                    className='h-20 w-20 flex-shrink-0'
                                    to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                                  >
                                    <img src={purchase.product.image} alt={purchase.product.name} />
                                  </Link>
                                  <div className='px-2 pt-1 pb-2 flex-grow'>
                                    <Link
                                      to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                                      className='line-clamp-2 text-left'
                                    >
                                      {purchase.product.name}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='col-span-6'>
                          <div className='grid grid-cols-5 items-center'>
                            <div className='col-span-2'>
                              <div className='flex items-center justify-center'>
                                <span className='text-gray-300 line-through'>
                                  ₫{formatCurrency(purchase.price_before_discount)}
                                </span>
                                <span className='ml-3'> ₫{formatCurrency(purchase.price)}</span>
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <QuantityController
                                max={purchase.product.quantity}
                                value={purchase.buy_count}
                                classNameWrapper='flex items-center'
                                onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                                onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                onType={handleTypeQuantity(index)}
                                disabled={purchase.disabled}
                                onFocusOut={(value) =>
                                  handleQuantity(
                                    index,
                                    value,
                                    value <= purchase.product.quantity &&
                                      value >= 1 &&
                                      value !== (purchaseInCart as Purchase[])[index].buy_count
                                  )
                                }
                              />
                            </div>
                            <div className='col-span-1'>
                              <div className='text-orange'>₫{formatCurrency(purchase.price * purchase.buy_count)}</div>
                            </div>
                            <div className='col-span-1'>
                              <button
                                onClick={handleDelete(index)}
                                className='bg-none text-black transition-colors hover:text-orange'
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='sticky bottom-0 flex flex-col sm:flex-row sm:items-center rounded-sm border border-gray-100 bg-white p-5 shadow mt-8'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange'
                    checked={isAllChecked}
                    onClick={hanldeCheckAll}
                  />
                </div>
                <button className='mx-3 border-none bg-none'>Chọn tất cả</button>
                <button className='mx-3 border-none bg-none' onClick={handleDeleteManyPurchases}>
                  Xóa
                </button>
              </div>

              <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div>Tổng thanh toán ({checkedPurchasesCount} sản phẩm):</div>
                    <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
                  </div>
                  <div className='flex items-center sm:justify-end'>
                    <div className='text-gray-500'>Tiết kiệm</div>
                    <div className='ml-6 text-orange'>₫{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
                  </div>
                </div>
                <Button
                  className='w-52 h-10 text-center mt-5 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center sm:mt-0 sm:ml-4'
                  onClick={handleBuyPurchases}
                  disabled={buyProductMutation.isPending}
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <div className='text-center mt-5 '>
              <img
                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/c44984f18d2d2211.png'
                alt='no-product'
                className='w-24 h-24 mx-auto'
              />
            </div>
            <div className='font-bold text-gray-500 mt-5'>Giỏ hàng của bạn còn trống</div>
            <div className='mt-5 text-center'>
              <Link
                to={path.home}
                className='px-10 py-2 uppercase text-white bg-orange hover:bg-orange/80 transition-all '
              >
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
