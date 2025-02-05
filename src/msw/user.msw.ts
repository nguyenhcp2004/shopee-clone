import { HttpResponse, http } from 'msw'
import config from '~/constants/config'
import { access_token_1s } from './auth.msw'
import { HttpStatusCode } from 'axios'

const meRes = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '64abad6e1afc2e1a1f96b283',
    roles: ['User'],
    email: 'buck@gmail.com',
    createdAt: '2023-07-10T07:04:14.644Z',
    updatedAt: '2023-07-26T09:34:40.346Z',
    avatar: '003f02dd-a5c8-49a8-a284-22e94112014c.jpg',
    name: 'kid buck'
  }
}

const meRequest = http.get(`${config.baseUrl}me`, ({ request }) => {
  const access_token = request.headers.get('authorization')
  if (access_token === access_token_1s) {
    return HttpResponse.json(
      {
        message: 'Lỗi',
        data: {
          message: 'Token hết hạn',
          name: 'EXPIRED_TOKEN'
        }
      },
      { status: HttpStatusCode.Unauthorized }
    )
  }
  return HttpResponse.json(meRes, { status: HttpStatusCode.Ok })
})

const userRequests = [meRequest]

export default userRequests
