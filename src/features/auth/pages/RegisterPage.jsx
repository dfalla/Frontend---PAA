import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { AuthLayout } from "../layout";
import { useAuthStore } from "../../../core/hooks";

const initialValues = {
  name: '',
  email: '',
  password: ''
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Este campo es requerido'),
  email: Yup.string().email('Ingrese un formato válido').required('Este campo es requerido'),
  password: Yup.string().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,'La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter de caso especial').required('Este campo es requerido')
})

export const RegisterPage = () => {
  const{ startRegister, errorMessage } = useAuthStore();
  const ref = useRef();

  const { touched, errors, getFieldProps, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      const{name, email, password} = values;
      startRegister({name, email, password})
    },
    validationSchema
  });

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <AuthLayout title='Registro' msg='¿ Tienes una cuenta ?' path='/auth/sign-in'>
      <form onSubmit={ handleSubmit }>
                <div className="form-group mb-2">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text" 
                    ref={ref}
                    placeholder='Escribe tu nombre' 
                    autoComplete="off"
                    className={ `mt-2 form-control ${ touched.name && errors.name ? "is-invalid" : "" }`}
                    id='name'
                    {...getFieldProps('name')}
                  />
                  <div
                    name='name'
                    className="invalid-feedback"
                  >
                    { errors.name }
                  </div>
                </div>

                <div className="form-group mb-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder='Escribe tu email' 
                    autoComplete="off"
                    className={ `mt-2 form-control ${ touched.email && errors.email ? "is-invalid" : "" }`}
                    id='email'
                    {...getFieldProps('email')} 
                  />
                  <div
                    name='email'
                    className="invalid-feedback"
                  >
                    { errors.email}
                  </div>
                </div>

                <div className="form-group mb-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder='Escribe tu password' 
                    autoComplete="off"
                    className={ `mt-2 form-control ${ touched.password && errors.password ? "is-invalid" : "" }`}
                    id='password'
                    {...getFieldProps('password')} 
                  />
                  <div
                    name='password'
                    className="invalid-feedback"
                  >
                    { errors.password}
                  </div>
                </div>
                <div className='d-grid gap-2'>
                  <input
                    type="submit"
                    className='btn btn-primary btn-block mt-4'
                    value="Sing Up" 
                  />
                </div>
              </form>
    </AuthLayout>
  )
}
