import { Category } from '~/types/category.type'
import { SucccessResponse } from '~/types/utils.type'
import http from '~/utils/http'

const URL = 'categories'

export const categoryApi = {
  getCategory() {
    return http.get<SucccessResponse<Category[]>>(URL)
  }
}
