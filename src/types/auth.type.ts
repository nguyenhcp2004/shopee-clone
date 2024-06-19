import { User } from './user.type'
import { SucccessResponse } from './utils.type'

export type AuthResponse = SucccessResponse<{
  access_token: string
  refresh_token: string
  expires_refresh_token: number
  expires: string
  user: User
}>

export type RefreshTokenReponse = SucccessResponse<{ access_token: string }>
