export const convertSeconds = (time) => {
    const newTime = new Date(time);
    return newTime.getTime();
}