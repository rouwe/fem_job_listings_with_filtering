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
        buildElement(buildParentClass, buildClass = false, buildCount = 1) {
            /* 
            * Description. Generate one or more element and append it to the provided parent.
            * @param {String} buildParentClass - parent element selector.
            * @param {Array} buildClass - array of class to be inserted.
            * @param {Number} buildCount - number of element to be created
            */
            const parentElement = document.querySelectorAll(`.${buildParentClass}`);
            for (let parentCount = 0; parentCount < parentElement.length; parentCount++) {
                // Iterate over parent(s) count
                for (let i = 0; i < buildCount; i++) {
                    // Iterate over buildCount
                    const element = document.createElement(this.buildName);
                    parentElement[parentCount].appendChild(element);
                    // Add class
                    if (buildClass) {
                        for (let j = 0; j < buildClass.length; j++) {
                            element.classList.add(buildClass[j])
                        }
                    }
                }
            }
        }
        addAttribute(buildParentClass, targetClass, attrName, attrValue) {
            /*
            * Description. Add attributes to an element.
            * @param {String} buildParentClass - parent element selector.
            * @param {String} targetClass - child element selector.
            * @param {String} attrName - attribute to be added.
            * @param {String} attrValue - attribute value.
            */
           const parentElement = document.querySelectorAll(`.${buildParentClass}`);
            if (buildParentClass && targetClass && attrName && attrValue) {
                for (let parentCount = 0; parentCount < parentElement.length; parentCount++) {
                    const targetElement = document.querySelectorAll(`.${targetClass}`);
                    $(targetElement[parentCount]).attr(attrName, attrValue);
                }
            } else {
                throw new Error("Attribute insertion failed: Missing object parameters");
            }
        }
    }
    // Builder TEST
    const createContainer = new ElementBuilder('div');
    const createLogo = new ElementBuilder('img');
    const createSpan = new ElementBuilder('span');
    const createParagraph = new ElementBuilder('p');
    const createUlist = new ElementBuilder('ul');
    const createListItem = new ElementBuilder('li');
    const createHr = new ElementBuilder('hr');

    // Job Container
    createContainer.buildElement('main-container', ['job-container']);
    // Details box
    createContainer.buildElement('job-container', ['details-container']);
    // Image
    createContainer.buildElement('details-container', ['img-box']);
    createLogo.buildElement('img-box', ['logo']);
    createLogo.addAttribute('img-box', 'logo', "src", '../images/photosnap.svg');
    // Details box
    createContainer.buildElement('details-container', ['details-box']);
    createContainer.buildElement('details-box', ['status-box']);
    createSpan.buildElement('status-box', ['company']);
    createSpan.buildElement('status-box', ['new', 'status']);
    createSpan.buildElement('status-box', ['featured', 'status']);
    createParagraph.buildElement('details-box', ['position']);
    createUlist.buildElement('details-box', ['more-info-box']);
    createListItem.buildElement('more-info-box', ['postedAt']);
    createListItem.buildElement('more-info-box', ['contract']);
    createListItem.buildElement('more-info-box', ['location']);
    // Mobile Hrule
    createHr.buildElement('details-container', ['job-hr']);
    // Tags
    createContainer.buildElement('job-container', ['tag-box']);
    createSpan.buildElement('tag-box', ['role']);
    createSpan.buildElement('tag-box', ['level']);
    createSpan.buildElement('tag-box', ['languages'], 3);
    createSpan.buildElement('tag-box', ['tools'], 0);
    // Fetch JSON file
    $.getJSON("../data.json", (result, status) => {
        if (status === "success") {
            // for (const key in result[0]) {
            //     if (key === 'languages' || key === 'tools') {
            //         console.log(result[0][key])
            //     }
            // };
            console.log(result)
        } else {
            console.log(`Error:${status}`);
        }
    });
})