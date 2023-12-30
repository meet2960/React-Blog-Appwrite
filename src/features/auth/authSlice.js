import { createSlice } from '@reduxjs/toolkit'
import LogHelper from '@/utility/LogHelper'
const storedUserData = JSON.parse(localStorage.getItem('userData'))

const initialState = {
  status: storedUserData ? true : false,
  userData: storedUserData || null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true
      state.userData = action.payload
      localStorage.setItem('userData', JSON.stringify(action.payload))
    },
    logout: (state, action) => {
      LogHelper.log('action', action)
      state.status = false
      state.userData = null
      localStorage.removeItem('userData')
    }
  }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
