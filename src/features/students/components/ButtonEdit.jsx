import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import './styles/styles.css'
export const ButtonEdit = ({_id}) => {
  const navigate = useNavigate();

  const goToEdit = () =>{
    navigate(`/alumno/${_id}`);
  }
  return (
  <Tooltip title="Edit">
      <IconButton
        onClick={ goToEdit }
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  )
}
