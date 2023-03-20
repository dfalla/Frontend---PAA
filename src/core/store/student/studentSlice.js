import { createSlice } from '@reduxjs/toolkit';

export const studentSlice = createSlice({
   name: 'student',
   initialState: {
      students: [],
      isStudentsLoaded: false,
      isStudentsLoading: false
   },
   reducers: {
    addStudent: (state, { payload }) => {
        state.students.push(payload);
        // return{
        //     ...state,
        //     students:[
        //         ...state.students,
        //         payload
        //     ]
        // }
    },
    loadingStudents: (state) => {
        state.isStudentsLoading = true;
    },
    loadStudents: (state) => {
        state.isStudentsLoading = false;
        state.isStudentsLoaded = true;
    },
    editStudent: (state, { payload }) => {
        const { id, nombre, apellido, dni } = payload;
        
        const foundStudent = state.students.find(( student ) => student.id === id );

        if(foundStudent){
            foundStudent.nombre = nombre;
            foundStudent.apellido = apellido;
            foundStudent.dni = dni;
        }
    },
    setStudents: (state, { payload }) => {
        state.students = payload;
        
    },
    deleteStudent: (state, { payload }) => {
        state.students = state.students.filter((student) => student._id !== payload);
        // return{
        //     ...state,
        //     students
        // }
    },
    onLogoutStudents: (state) =>{
        state.students = [];
    }
   },
});

export const { 
    addStudent,
    loadStudents,
    loadingStudents,
    editStudent,
    setStudents,
    deleteStudent, onLogoutStudents } = studentSlice.actions