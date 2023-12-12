import authService from '@/appwrite/auth'
import { toast } from 'react-toastify'
import { authSlice } from './authSlice'
const { actions } = authSlice

export const login = data => dispatch => {
  return authService
    .login(data)
    .then(loginData => {
      if (loginData) {
        return authService
          .getCurrentUser()
          .then(currUser => {
            dispatch(actions.login(currUser))
            return currUser
          })
          .catch(error => {
            toast.error(error.message)
          })
      } else {
        toast.error('Something Went Wrong')
      }
    })
    .catch(error => {
      toast.error(error.message)
    })
}
