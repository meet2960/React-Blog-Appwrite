import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { InputField } from '../index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Card, Col, Row } from 'react-bootstrap'
import LoadingButton from '../Common/LoadingButton'
import { toast } from 'react-toastify'
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs'
import { login } from '../../features/auth/action'
const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [togglePassword, setTogglePassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      // email: 'meet@gmail.com',
      // password: 'meet@122'
    }
  })

  const handleLogin = async data => {
    return dispatch(login(data)).then(currentUser => {
      if (currentUser) {
        toast.success('Login Successfully')
        navigate('/')
      }
    })
  }

  return (
    <div className='login-form'>
      <Row className=''>
        <Col xs={12} md={8} lg={6} className='mx-auto'>
          <Card>
            <Card.Body className='p-lg-5'>
              <h3 className='text-center'>Sign in</h3>
              <form onSubmit={handleSubmit(handleLogin)}>
                <Row className='gy-3'>
                  <Col lg={12}>
                    <InputField
                      label='Email'
                      placeholder='Enter Email'
                      type='email'
                      {...register('email', {
                        required: true,
                        validate: {
                          matchPatern: value =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            'Email address must be a valid address'
                        }
                      })}
                    />
                  </Col>
                  <Col lg={12}>
                    <div className='password-field'>
                      <InputField
                        label='Password'
                        placeholder='Enter Password'
                        type={togglePassword ? 'text' : 'password'}
                        {...register('password', {
                          required: true
                        })}
                      />
                      <div className='eye-icon' onClick={() => setTogglePassword(prev => !prev)}>
                        {togglePassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                      </div>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className='d-flex justify-content-center align-items-center'>
                      <LoadingButton className='w-100' type='submit' loading={isSubmitting} disabled={isSubmitting}>
                        Submit
                      </LoadingButton>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className='d-flex justify-content-center'>
                      <p className='me-1 mb-0'>Don&apos;t have an account?</p>
                      <Link to={'/signup'}>Sign Up</Link>
                    </div>
                  </Col>
                </Row>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default LoginForm
