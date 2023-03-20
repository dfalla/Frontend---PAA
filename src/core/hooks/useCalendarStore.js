import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import Http from '../../common/http';
import { convertEventsToDateEvents, modalNotificationSuccess } from "../../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import { modalNotification } from '../../helpers';



export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { activeEvent, events } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    };

    const startSavingEvent = async( calendarEvent ) => {

        try {
          console.log({calendarEvent});
          //Todo bien
          if(calendarEvent.id){
            //Actualizando
           const {data} = await Http.put(`/events/${calendarEvent.id}`, calendarEvent);
            dispatch( onUpdateEvent( { ...calendarEvent, user } ) )
            modalNotification(data.msg, 'success');
    
            return;
          } 
          //Creando
    
          const { data } = await Http.post('/events', calendarEvent);
          
          
          dispatch( onAddNewEvent({ 
            ...calendarEvent, 
            id: data.evento.id,
            user
          }))
          modalNotificationSuccess(data.msg);
          
        } catch (error) {
          console.log(error)
          modalNotification(error.response.data?.msg, 'error')
        }
        
    
        
       
    }

    const startDeletingEvent = async() => {
        //TODO: llegar al backend
        try {
          Swal.fire({
            title: `Desea eliminar la nota?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
          }).then(async( result )=>{
            if(result.isConfirmed) {
              const { data } = await Http.delete(`/events/${activeEvent.id}`);
              dispatch ( onDeleteEvent() ) ;
              modalNotification(data.msg, 'success');
            }
          });
        
        } catch (error) {
          console.log(error)
          modalNotification(error.response.data?.msg, 'error');
        }
    }

    const startLoadingEvents = async() => {
        try {
    
          const { data } = await Http.get('/events');
          const events = convertEventsToDateEvents(data.eventos);
          dispatch( onLoadEvents(events) );
          
        } catch (error) {
          console.log(error);
          console.log("Error cargando eventos");
        }
    }


  return{
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
}
