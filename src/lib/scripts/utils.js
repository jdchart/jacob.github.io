export const shift_element_down = (arr, index) => {
    if (index < 0 || index >= arr.length - 1) {
        return arr;
    }
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    return arr;
}

export const shift_element_up = (arr, index) => {
    if (index <= 0 || index >= arr.length) {
        return arr;
    }
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    return arr;
}