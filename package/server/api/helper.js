
const flatten = (arr) => {
    const flattenedArr = arr.map(({ start, end }) =>  [start, end]).flat();
    return [...new Set(flattenedArr)]
};


module.exports = { flatten };