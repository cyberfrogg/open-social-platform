const GetDateDifference = (date1: Date, date2: Date): number => {
    let time = new Date(date2).getTime() - new Date(date1).getTime();
    return time;
}

export default GetDateDifference;