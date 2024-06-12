import { User } from '~/types/user.type'
import { SucccessResponse } from '~/types/utils.type'
import http from '~/utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const userApi = {
  getProfile() {
    return http.get<SucccessResponse<User>>('me')
  },

  updateProfile(body: BodyUpdateProfile) {
    return http.put<SucccessResponse<User>>('user', body)
  },

  uploadAvatar(body: FormData) {
    return http.post<SucccessResponse<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
export default userApi
