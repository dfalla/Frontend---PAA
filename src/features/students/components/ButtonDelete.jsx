import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Swal from 'sweetalert2';
import { useStudentsStore } from '../../../core/hooks';
import './styles/styles.css';

export const ButtonDelete = ({student}) => {
  const { nombre, apellido, _id } = student;
  
  const { removeStudent } = useStudentsStore();

  const deleteStudent = () => {
    Swal.fire({
      title: `Desea eliminar a ${nombre} ${apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then(( result )=>{
      if(result.isConfirmed) {
        removeStudent(_id);
      }
    });

  };
  
  return (
    <Tooltip title="Delete">
      <IconButton
        onClick = { deleteStudent }
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>

  )
}
