import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import Http from "../../common/http";
import { convertSeconds, modalNotification, modalNotificationSuccess } from "../../helpers";


import { addStudent, loadStudents, loadingStudents, setStudents, editStudent, deleteStudent } from "../store";


export const useStudentsStore = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { students, isStudentsLoaded, isStudentsLoading } = useSelector(state => state.student);

    const getStudents = async() => {
        dispatch(loadingStudents());
    
        try {
            const { data } = await Http.get('/students');
            dispatch(setStudents(data.alumnos));
            
            
        } catch (error) {
            console.log(error);
        }

        dispatch(loadStudents());
    }


    const createStudent = async(values) => {
        const { apellido, nombre, dni, fecha_ingreso, image } = values;
        const formData = new FormData();

        for (let key in values){
            formData.append(key, values[key]);
        }

        try {
            
            const { data } = await Http.post('/students', formData,{
                    headers: {
                      "Content-Type" : "multipart/form-data"
                    }
            });
            dispatch(addStudent({apellido, nombre, dni, fecha_ingreso, image}));
            modalNotificationSuccess(data.msg)
            navigate('/alumnos');
        } catch (error) {
            console.log(error)
            const { response } = error;
            if(!response.data.errors){
                modalNotification(error.response.data?.error, 'warning');
            }
            modalNotification(error.response.data.errors.dni.msg, 'warning');
        }
    }

    const updateStudent = async(id, body) => {
        console.log({body});
        const { apellido, dni, nombre, fecha_ingreso } = body;
        
        try {
            
            const { data } = await Http.put(`/students/${id}`, {apellido, dni, nombre, fecha_ingreso: convertSeconds(fecha_ingreso)});
            dispatch(editStudent(body));
            modalNotification(data.msg, 'success');
            navigate('/alumnos');
            
        } catch (error) {
            modalNotification(error.response.data.error, 'error');
            console.log(error);
        }
    }


    const getOneStudent = async(id) => {
        try {
            const { data } = await Http.get(`/students/${id}`);
            return data;
        } catch (error) {
            console.log(error)
        }
    }


    const removeStudent = async(id) => {
        try {
           const { data } =  await Http.delete(`/students/${id}`);
            dispatch(deleteStudent(id));
            modalNotification(data.msg, 'success');
        } catch (error) {
            console.log(error)
        }
    }

    return {
        students, 
        isStudentsLoaded, 
        isStudentsLoading,

        getStudents,
        createStudent,
        updateStudent,
        getOneStudent,
        removeStudent
    }
}
