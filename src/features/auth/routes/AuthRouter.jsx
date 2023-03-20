import { Navigate, Route, Routes } from 'react-router-dom'; 
import { LoginPage, RegisterPage } from '../pages';

const AuthRouter = () => {
  return (
    <Routes>
        <Route path="/" element={ <Navigate to="sign-in" replace/> }/>
        <Route path="sign-in" element={<LoginPage/>}/>
        <Route path="sign-up" element={ <RegisterPage/> }/>
    </Routes>
  )
}

export default AuthRouter;
