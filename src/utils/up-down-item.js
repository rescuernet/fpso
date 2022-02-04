export const moveItemUp = (index,array) => {
    let val = array[index];
    array.splice(index,1)
    array.splice(index - 1, 0, val)
}

export const moveItemDown = (index,array) => {
    let val = array[index];
    array.splice(index,1)
    array.splice(index + 1, 0, val)
}