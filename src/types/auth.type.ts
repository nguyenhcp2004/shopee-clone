import { User } from './user.type'
import { SucccessResponse } from './utils.type'

export type AuthResponse = SucccessResponse<{
  access_token: string
  expires: string
  user: User
}>
