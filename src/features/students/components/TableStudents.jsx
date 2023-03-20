import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack,
    Button
  } from '@mui/material';

// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

import { useStudentsStore } from "../../../core/hooks"

import { ButtonEdit, ButtonDelete } from "./";


export const TableStudents = () => {
    const navigate = useNavigate();
    const { getStudents, students } = useStudentsStore();

    const goToCreate = () => navigate('/alumnos/crear-alumno');
  
    useEffect(() => {
        getStudents();
    }, []);


    return (
        <>
            <div className="container mt-5">
                <div className="row mb-5">
                    <Stack spacing={2} direction="row">
                        <Button
                            onClick={ goToCreate } 
                            variant="contained"
                        > Crear Alumno
                        </Button>
                    </Stack>
                </div>
                <div className="row">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>NOMBRE</TableCell>
                                <TableCell>APELLIDO</TableCell>
                                <TableCell>DNI</TableCell>
                                <TableCell>ACCIONES</TableCell>
                                
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {students.map((student) => (
                                <TableRow
                                    key={student._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {student.nombre}
                                </TableCell>
                                <TableCell>{student.apellido}</TableCell>
                                <TableCell>{student.dni}</TableCell>
                                <TableCell>{<ButtonEdit {...student}/>} {<ButtonDelete student = { student }/>} </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    )
}
