import { parseISO } from "date-fns";


export const convertEventsToDateEvents = (events = []) => {

    return events.map( event => {

        //convertir una fecha de segundos a fecha en Date().
        event.end = parseISO( event.end );
        event.start = parseISO( event.start );

        return event;
    } )
}