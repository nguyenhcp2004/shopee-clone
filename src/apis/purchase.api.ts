import { Purchase, PurchaseListStatus } from '~/types/purchase.type'
import { SucccessResponse } from '~/types/utils.type'
import http from '~/utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SucccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SucccessResponse<Purchase[]>>(`${URL}`, {
      params
    })
  },
  buyProduct(body: { product_id: string; buy_count: number }[]) {
    return http.post<SucccessResponse<Purchase[]>>(`${URL}/buy-products`, body)
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<SucccessResponse<Purchase>>(`${URL}/update-purchase`, body)
  },
  deletePurchase(purchaseIds: string[]) {
    return http.delete<SucccessResponse<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}

export default purchaseApi
