// Renders components from JSON data
let dataObject = [];
fetch('../data.json')
// Get data
    .then(data => data.json())
    .then(data => {
        for(const obj of data) {
            dataObject.push(obj);
        }
    })
    .catch(data => {
        dataObject = {};
        console.log(error);
    })
console.log(dataObject)