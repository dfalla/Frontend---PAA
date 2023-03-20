import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CalendarPage } from '../../features/calendar';
import { Dashboard, FormStudent, TableStudents } from '../../features/students/components';
import { Layout, Verification } from '../components';
import { useAuthStore } from '../hooks';


const AUTH = lazy(() => import('../../features/auth/routes/AuthRouter'));

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if(status === 'checking'){
    return(
      <Verification/>
    )
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? (
              <>
                <Route path="/auth/*" element={ <AUTH/> }/>
                <Route path="/*" element={<Navigate to="/auth/sign-in"/>}/>
              </>
            )
          : (
              <>
                <Route path="/" element={<Layout/>}>
                  <Route index element={<Dashboard/>}/>
                  <Route path="alumnos" element={<TableStudents/>}/>
                  <Route path="alumnos/crear-alumno" element={<FormStudent/>}/>
                  <Route path="alumno/:id" element={<FormStudent/>}/>
                  <Route path="calendario" element={<CalendarPage/>}/>
                </Route>

                <Route path="/*" element={<Navigate to="/"/>}/>
              </>
            )
      }
    </Routes>
  )
}
