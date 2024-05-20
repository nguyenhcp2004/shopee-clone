export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export interface SucccessResponse<Data> {
  message: string
  data: Data
}

//cú pháp `-? sẽ loại bỏ undefined key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
