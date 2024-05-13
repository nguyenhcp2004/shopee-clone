import { Product, ProductList, ProductListConfig } from '~/types/product.type'
import { SucccessResponse } from '~/types/utils.type'
import http from '~/utils/http'

const URL = 'products'
const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SucccessResponse<ProductList>>(URL, {
      params
    })
  },

  getProductDetail(id: string) {
    return http.get<SucccessResponse<Product>>(`${URL}/${id}`)
  }
}

export default productApi
