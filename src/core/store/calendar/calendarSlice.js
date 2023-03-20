import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
   name: 'calendar',
   initialState: {
      isLoadingEvents: true,
      events: [
        // tempEvent
      ],
      activeEvent: null
    },
   reducers: {
    onSetActiveEvent: (state, { payload }) => {
        state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push( payload );
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map( event => {
        
        if(event.id === payload.id){
          return payload;
        }

        return event;
      })

      console.log({events: state.events});
    },
    onDeleteEvent: (state) => {
      if(state.activeEvent) {
        state.events = state.events.filter(event => event.id !== state.activeEvent.id);
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      // state.events = payload;
      payload.forEach(event => {
        //regresa un valor booleano si lo encuentra (true) o false si no lo encuentra
        const exists = state.events.some( dbEvent => dbEvent.id === event.id );

        if( !exists ){
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents= true;
      state.events= [];
      state.activeEvent= null;
    }
   },
});

export const { 
  onAddNewEvent, 
  onDeleteEvent, 
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent, 
  onUpdateEvent, 
} = calendarSlice.actions