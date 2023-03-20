import { Route, Routes } from 'react-router-dom';
import { TableStudents } from '../components';

export const StudentsRoutes = () => {
  return (
    <Routes>
        <Route index element={<TableStudents/>}/>
        <Route path='/crear-alumno' element={<p>FormStudents</p>}/>
        <Route path='/alumno/:id' element={<p>FormStudents</p>}/>
    </Routes>
  )
}
