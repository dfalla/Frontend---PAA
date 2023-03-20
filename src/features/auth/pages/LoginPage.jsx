import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthLayout } from '../layout';
import { useAuthStore } from '../../../core/hooks';

const initialValues = {
  email: '',
  password: ''
}

const validationSchema = Yup
.object()
.shape({
  email: Yup.string().email('Formato de email inválido').required('Este campo es requerido'),
  password: Yup.string().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,'La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter de caso especial').required('Este campo es requerido')

})

export const LoginPage = () => {
  const{ startLogin, errorMessage } = useAuthStore();
  const ref = useRef();
  const { touched, errors, getFieldProps, handleSubmit } = useFormik({
    initialValues,

    onSubmit: (values) => {
      const{ email, password } = values;
      startLogin({ email, password });
    },

    validationSchema,
  });

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <AuthLayout title='Iniciar Sesión' msg='¿ No tienes una cuenta ?' path='/auth/sign-up'>
      <form onSubmit={ handleSubmit }>
        <div className="form-group mb-2">
          <label htmlFor="email">Email</label>
          <input       
                  type="text"
                  name='email'
                  ref={ ref }
                  placeholder='email' 
                  autoComplete="off"
                  className={ `mt-2 form-control ${ touched.email && errors.email ? "is-invalid" : "" }`}
                  {...getFieldProps('email')}
          />

          <div
            name='email'
            className="invalid-feedback"
          >
            { errors.email }
          </div>

        </div>
        <div className="form-group">
        <label htmlFor="password">Password</label>
          <input
            type="password"
            name='password'
            placeholder="password" 
            className={ `mt-2 form-control ${ touched.password && errors.password ? "is-invalid" : "" }` }
            {...getFieldProps('password')}
          />

          <div
            name='password'
            className="invalid-feedback"
          >
            { errors.password }
          </div>
        </div>
        <div className="d-grid gap-2">
          <input
            type='submit'
            value='Sign In'
            className='btn btn-primary btn-block mt-4'
          />
        </div>
      </form>
    </AuthLayout>
  )
}
