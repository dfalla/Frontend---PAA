import { useEffect } from "react";
import { useStudentsStore } from "../../../core/hooks"
import { convertDate } from "../../../helpers";

import './styles/styles.css';



export const Dashboard = () => {
    
    const { getStudents, students } = useStudentsStore();

    useEffect(() => {
        getStudents();
    }, []);

    if(students.length === 0) return <h1 className="cantidad">No hay Alumnos registrados</h1>
    
  return (
    <>
        <h1 className="cantidad">
            Bienvenidos a la academia Pañuelos al Aire
        </h1>

        <h4 className="cantidad">
            Actualmente hay { students.length } alumnos registrados
        </h4>
        
        <div className="container mt-4">
            <div className="row">
                {
                students.map((student) => (
                    <div key={student.dni} className="col-md-3 mb-4">
                    <div className="card card-style">
                        <img src={student.image.url} alt={`${student.nombre} ${student.apellido}`} className="imagen-style"/>
                        <div className="card-body">
                            <h5 className="card-title">{`${student.nombre} ${student.apellido}`}</h5>
                            <p className="card-text"><b>Fecha de Ingreso</b> - <small>{convertDate(student.fecha_ingreso)}</small></p>
                        </div>
                    </div>
                    </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}



