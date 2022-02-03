// Renders components from JSON data
$(document).ready(() => {
    class ElementBuilder {
        /*
        * Class for building elements.
        * @param {String} buildName - element html tag
        */
        constructor(buildName) {
            this.buildName = buildName;
        }
        buildElement(buildParentClass, buildClass, buildCount) {
            /* 
            * Description. Generate one or more element and append it to the provided parent.
            * @param {String} buildParentClass - parent element selector.
            * @param {Array} buildClass - array of class to be inserted.
            * @param {Number} buildCount - number of element to be created
            */
            const parentLength = document.querySelectorAll(`.${buildParentClass}`).length;
            const parentElement = document.querySelectorAll(`.${buildParentClass}`);

            for (let parentCount = 0; parentCount < parentLength; parentCount++) {
                // Iterate over parent(s) count
                console.log(parentElement[parentCount])
                for (let i = 0; i < buildCount; i++) {
                    // Iterate over buildCount
                    const element = document.createElement(this.buildName);
                    parentElement[parentCount].appendChild(element);
                    // Add class
                    for (let j = 0; j < buildClass.length; j++) {
                        element.classList.add(buildClass[j])
                    }
                }
            }
        }
    }
    // Builder TEST
    const createContainer = new ElementBuilder('div');
    const createLogo = new ElementBuilder('img');

    // Job Container
    createContainer.buildElement('main-container', ['job-container'], 2);
    // Details box & Tags
    createContainer.buildElement('job-container', ['details-container'], 1);
    createContainer.buildElement('job-container', ['tag-box'], 1);
    // Image
    createContainer.buildElement('details-container', ['img-box'], 1);
    createLogo.buildElement('img-box', ['logo'], 1);

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