import { parseISO } from "date-fns";


export const convertDate = (date) => {

    const newDate = parseISO(date);

    return newDate.toLocaleDateString();
}