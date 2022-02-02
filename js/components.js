// Renders components from JSON data
$(document).ready(() => {
    class ElementBuilder {
        /* Class for building elements
           :param buildName: String - element name
           :param buildClass: String - class to add in element
           :param buildCount: Number - number of elements 
        */
        constructor(buildName, buildClass, buildCount) {
            this.buildName = buildName;
            this.buildClass = buildClass;
            this.buildCount = buildCount;
        }
        generateContainer() {
            // Generate containers for each available job
            const parentElement = document.getElementById("main-container");
            const container = document.createElement('div');
            parentElement.appendChild(container);
            container.classList.add()
            console.log(parentElement, container)
        }
    }
    const test = new ElementBuilder('div', 'job-container', 1);
    console.log(test.constructor)
    // Fetch JSON file
    $.getJSON("../data.json", (result, status) => {
        if (status === "success") {
            // for (const key in result[0]) {
            //     if (key === 'languages' || key === 'tools') {
            //         console.log(result[0][key])
            //     }
            // };
            console.log(result[0])
        } else {
            console.log(`Error:${status}`);
        }
    });
})