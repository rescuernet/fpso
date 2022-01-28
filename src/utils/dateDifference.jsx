export const dateDifference = (start, end)=> {
    if((start && start !== '') && (end && end !== '')){
        const date1 = new Date(start);
        const date2 = new Date(end);
        const oneDay = 1000 * 60 * 60 * 24;
        const diffInTime = date2.getTime() - date1.getTime();
        const num =  Math.round(diffInTime / oneDay + 1);
        if(num > 0){
            return num
        }
    }
    return 0
}