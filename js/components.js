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
    });

function generateContainer() {
    // Generate containers for each available job
    const parentElement = document.getElementById("main-container");

    const container = document.createElement('div');
    parentElement.appendChild(container);
    console.log(parentElement, container)
}
// generateContainer()