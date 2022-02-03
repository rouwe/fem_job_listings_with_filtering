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
            const parentElement = document.querySelectorAll(`.${buildParentClass}`);

            console.log(parentElement)
            for (let parentCount = 0; parentCount < parentElement.length; parentCount++) {
                // Iterate over parent(s) count
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
        addAttribute(buildParentClass, targetClass, attrObj) {
            /*
            * Description. Add attributes to an element.
            * @param {String} buildParentClass - parent element selector.
            * @param {String} targetClass - child element selector.
            * @param {Object} attrObj - attributes to be added.
            */
           const parentElement = document.querySelectorAll(`.${buildParentClass}`);
            if (attrObj) {
                // console.log(parentLength)
                for (let parentCount = 0; parentCount < parentElement.length; parentCount++) {
                    // console.log(parent[parentCount])
                    for (const attr in attrObj) {
                        console.log(attrObj[attr])
                    }
                    // SET ATTRIBUTE NODE method
                    // var h1 = document.getElementsByTagName("H1")[0];   // Get the first <h1> element in the document
                    // var att = document.createAttribute("class");       // Create a "class" attribute
                    // att.value = "democlass";                           // Set the value of the class attribute
                    // h1.setAttributeNode(att);                          // Add the class attribute to <h1>
                }
            } else {
                throw new Error("Attribute insertion failed: Missing object parameters");
            }
        }
    }
    // Builder TEST
    const createContainer = new ElementBuilder('div');
    const createLogo = new ElementBuilder('img');

    // Job Container
    createContainer.buildElement('main-container', ['job-container'], 3);
    // Details box & Tags
    createContainer.buildElement('job-container', ['details-container'], 1);
    createContainer.buildElement('job-container', ['tag-box'], 1);
    // Image
    createContainer.buildElement('details-container', ['img-box'], 1);
    createLogo.buildElement('img-box', ['logo'], 1);
    createLogo.addAttribute('job-container', 'logo', {src: '../images/image.jpg'});

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