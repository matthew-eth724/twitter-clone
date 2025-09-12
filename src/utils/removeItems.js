const removeItem = (array, item) => {
    let newArray = []
    for (i = 0; i < array.length; i++) {
        if (array[i] != item)
            newArray.push(array[i])
    }
    return newArray
}

module.exports = removeItem