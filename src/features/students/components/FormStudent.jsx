import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useStudentsStore } from "../../../core/hooks";
import { convertDate, convertSeconds } from "../../../helpers";




const INITIALVALUES = {
  apellido: '',
  dni: '',
  fecha_ingreso: new Date(),
  imagen: null,
  nombre: ''
};


const validationSchema = Yup.object().shape({
  apellido: Yup.string().required('Este campo es requerido'),
  dni: Yup.string().required('Este campo es requerido'),
  // imagen: Yup.mixed().required("Este campo es requerido"),
  nombre: Yup.string().required('Este campo es requerido')
});

registerLocale('es', es);

export const FormStudent = () => {
  const [initialValues, setinitialValues] = useState(INITIALVALUES);
  const { createStudent, getOneStudent, updateStudent } = useStudentsStore();
  
  const params = useParams();
  const{ errors, touched, handleSubmit, getFieldProps, setFieldValue } = useFormik({
    initialValues,
    onSubmit: (values) => {

      values.fecha_ingreso = convertSeconds(values.fecha_ingreso);

      if(params.id) {
        updateStudent(params.id, values);
      }

      if(!params.id){
        createStudent(values);
      }
    },
    validationSchema,
    enableReinitialize: true
  });

  const onDateChange = ( event, changing ) => {
    setinitialValues({
        ...initialValues,
        [changing]: event
    })
}

  useEffect(() => {
    if(params.id){
        getOneStudent(params.id).then(res => setinitialValues({
          dni: res.alumno.dni,
          fecha_ingreso: new Date(res.alumno.fecha_ingreso),
          nombre: res.alumno.nombre,
          apellido: res.alumno.apellido
        }));
    }
  }, [params.id]);

  return (
    <div className="container">
        <div className="row mt-5">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                  { params.id ? 'Editar' : 'Registrar' } alumno
              </div>
              <div className="card-body">
              <form onSubmit={ handleSubmit }>
                <div className="form-group">
                  <DatePicker
                    {...getFieldProps('fecha_ingreso')}
                    className="form-control mt-2"
                    dateFormat="dd/MM/yyyy"
                    onChange={(event) => onDateChange(event, 'fecha_ingreso')}
                    selected={initialValues.fecha_ingreso}
                  />
                </div>

                <div className="form-group">
                  <input
                    {...getFieldProps('nombre')}
                    className={`mt-2 form-control ${ touched.nombre && errors.nombre ? "is-invalid" : "" } `}
                    placeholder='Escribe tu nombre'
                    type="text" 
                  />
                  <div
                    name='nombre'
                    className="invalid-feedback"
                  >
                    { errors.nombre }
                  </div>
                </div>
                <div className="form-group">
                  <input
                    {...getFieldProps('apellido')}
                    className={`mt-2 form-control ${ touched.apellido && errors.apellido ? "is-invalid" : "" } `}
                    placeholder='Escribe tu apellido'
                    type="text" 
                  />
                  <div
                    name='apellido'
                    className="invalid-feedback"
                  >
                    { errors.apellido }
                  </div>
                </div>
                <div className="form-group">
                  <input
                    {...getFieldProps('dni')}
                    className={`mt-2 form-control ${ touched.dni && errors.dni ? "is-invalid" : "" } `}
                    disabled = { params.id ? true : false }
                    placeholder='Escribe tu dni'
                    type="text" 
                  />
                  <div
                    name='dni'
                    className="invalid-feedback"
                  >
                    { errors.dni }
                  </div>
                </div>
                <div className="form-group">
                  <input
                    className={`mt-2 form-control ${ touched.imagen && errors.imagen ? "is-invalid" : "" } ${params.id ? "visually-hidden" : ""} `}
                    name="imagen"
                    onChange={(e) =>setFieldValue('imagen',e.target.files[0])}
                    type="file" 
                  />
                  <div
                    name='imagen'
                    className="invalid-feedback"
                  >
                    { errors.imagen }
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className='btn btn-outline-primary btn-block mt-4'
                  >
                    { params.id ? 'Editar' : 'Registrar' }
                  </button>
                </div>
              </form>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
    </div>
  )
}
