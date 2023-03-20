import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import Http from "../../common/http";
import { modalNotification } from "../../helpers";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar, onLogoutStudents } from "../store";

export const useAuthStore = () => {
    

    const { status, user, errorMessage } = useSelector(state => state.auth);

    const dispatch = useDispatch();


    const startLogin = async({ email, password }) => {
        dispatch(onChecking());

        try {
            const { data } = await Http.post('/auth', {email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({name: data.name, uid: data.uid, token: data.token}));
           

            console.log(data);
        } catch (error) {
            console.log(error);

            dispatch(onLogout('Email o password incorrectos'))
            modalNotification(error.response.data.msg, 'error', 'center');
           
        }
    };


    const startRegister = async({ name, email, password }) => {
        dispatch(onChecking());

        try {
            const { data } = await Http.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid, token: data.token }));

            console.log(data);

        } catch (error) {
            console.log(error);
            modalNotification(error.response.data.msg, 'warning');
            dispatch(onLogout( error.response.data?.msg || 'Error al registrar al usuario' ));
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    };

    const checkAuthToken = async() => {

        const token = localStorage.getItem('token');

        if(!token)  return dispatch(onLogout());

        try {
            const { data } = await Http.get('/auth/renew');

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
        
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    };

    const startLogout = () => {
        Swal.fire({
            title: `¿Desea cerrar sesión?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Salir',
            cancelButtonText: 'Cancelar',
          }).then(( result )=>{
            if(result.isConfirmed) {
                localStorage.clear();
                dispatch( onLogout() );
                dispatch(onLogoutCalendar());
                dispatch(onLogoutStudents());
            }
          });
    }

  return {
    status,
    user,
    errorMessage,

    startLogin,
    startRegister,
    checkAuthToken,
    startLogout

  }
}
