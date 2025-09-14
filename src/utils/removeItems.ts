export const removeItem = (array: any[], item: any): any[] => {
    let newArray: any[] = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] != item) {
            newArray.push(array[i]);
        }
    }
    return newArray;
};

export default removeItem;
