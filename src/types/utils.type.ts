export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export interface SucccessResponse<Data> {
  message: string
  data: Data
}
