import { instance } from '../instance'
import { handleApiError } from '../helper'

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  token: string;
}

export default {
  async login(payload: LoginPayload): Promise<LoginResponse | undefined> {
    try {
      const response = await instance.post<LoginResponse>('/auth/login', payload)
      return response.data
    } catch (err) {
      handleApiError(err, 'login')
    }
  }
}
