// Renders components from JSON data
$(document).ready(() => {
    (function generateJobList() {
        class ElementBuilder {
            /*
            * Class for building elements.
            * @param {String} buildName - element html tag
            */
            constructor(buildName) {
                this.buildName = buildName;
            }
            buildElement(buildParentClass, buildClass = false, buildCount = 1,iterateOnce = false, targetId = 0) {
                /* 
                * Description. Generate one or more element and append it to the provided parent.
                * @param {String} buildParentClass - parent element selector.
                * @param {Array} buildClass - array of class to be inserted.
                * @param {Number} buildCount - number of element to be created
                * @param {Boolean} iterateOnce - iterate over parent or not
                * @param {Number} targetId - object content identifier for each job 
                */
                const parentElement = document.querySelectorAll(`.${buildParentClass}`);
                if (iterateOnce) {
                    for (let i = 0; i < buildCount; i++) {
                        // Iterate over buildCount
                        const element = document.createElement(this.buildName);
                        parentElement[targetId].appendChild(element);
                        // Add class
                        if (buildClass) {
                            for (let j = 0; j < buildClass.length; j++) {
                                element.classList.add(buildClass[j])
                            }
                        }
                    }
                } else {
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
            }
            addAttribute(targetClass = null, targetId = null, attrName = null, attrValue = null) {
                /*
                * Description. Add attributes to an element.
                * @param {String} targetClass - element selector.
                * @param {Number} targetId - Id to access the result object.
                * @param {String} attrName - attribute to be added.
                * @param {String} attrValue - attribute value.
                */
                if (targetClass === null && targetId === null && textValue === null) {
                    throw new Error("Text insertion failed: Missing object parameters");
                } else {
                    const targetElement = document.querySelectorAll(`.${targetClass}`);
                    $(targetElement[targetId]).attr(attrName, attrValue);
                }
            }
            addText(targetClass = null, targetId = null, textValue = null) {
                /*
                * Description. Add text to an element.
                * @param {String} targetClass - element selector.
                * @param {Number} targetId - Id to access the result object.
                * @param {String} textValue - string to add.
                */
                if (targetClass === null && targetId === null && textValue === null) {
                    throw new Error("Text insertion failed: Missing object parameters");
                } else {
                    const targetElement = document.querySelectorAll(`.${targetClass}`);
                    $(targetElement)[targetId].innerHTML = textValue;
                }
            }
        }
        // Fetch JSON file
        $.getJSON("./data.json", (result, status) => {
            if (status === "success") {
                // Define element builder
                const createContainer = new ElementBuilder('div');
                const createLogo = new ElementBuilder('img');
                const createSpan = new ElementBuilder('span');
                const createParagraph = new ElementBuilder('p');
                const createUlist = new ElementBuilder('ul');
                const createListItem = new ElementBuilder('li');
                const createHr = new ElementBuilder('hr');
    
                const resultLength = result.length;
                createContainer.buildElement('main-container', ['job-container'], resultLength);
                // Details container
                createContainer.buildElement('job-container', ['details-container']);
                // Image box
                createContainer.buildElement('details-container', ['img-box']);
                createLogo.buildElement('img-box', ['logo']);
                // Details box
                createContainer.buildElement('details-container', ['details-box']);
                createContainer.buildElement('details-box', ['status-box']);
                // Status Content
                createSpan.buildElement('status-box', ['company']);
                // Tags
                createContainer.buildElement('job-container', ['tag-box']);
                // Add Content & Attributes
                let langArr = [];
                let toolArr = [];
                for (let id = 0; id < resultLength; id++) {
                    // Image Attribute
                    createLogo.addAttribute('logo', id, "src", result[id]['logo']);
                    // Details box text
                    createSpan.addText('company', id, result[id]['company']);
                    // New Tag
                    if (result[id]['new'] === true) {
                        createSpan.buildElement('status-box', ['new', 'status'], 1, true, id);
                        createParagraph.buildElement('new', ['new-text'], 1, true, id);
                        createSpan.addText('new-text', id, 'New!');
                    }
                    // Featured Tag
                    if (result[id]['featured'] === true) {
                        createSpan.buildElement('status-box', ['featured', 'status'], 1, true, id);
                        createParagraph.buildElement('featured', ['featured-text'], 1, true, id);
                        createSpan.addText('featured-text', id, 'Featured');
                    }
                    // Position
                    createParagraph.buildElement('details-box', ['position'], 1, true, id);
                    createParagraph.addText('position', id, result[id]['position']);
                    // Mobile Hr
                    createHr.buildElement('details-container', ['job-hr'], 1, true, id);
                    // More Info
                    createUlist.buildElement('details-box', ['more-info-box'], 1, true, id);
                    createListItem.buildElement('more-info-box', ['postedAt'], 1, true, id);
                    createListItem.addText('postedAt', id, result[id]['postedAt']);
                    createListItem.buildElement('more-info-box', ['contract'], 1, true, id);
                    createListItem.addText('contract', id, result[id]['contract']);
                    createListItem.buildElement('more-info-box', ['location'], 1, true, id);
                    createListItem.addText('location', id, result[id]['location']);
                    // Tag Box
                    createSpan.buildElement('tag-box', ['role', 'category'], 1, true, id);
                    createSpan.addText('role', id, result[id]['role']);
                    createSpan.addAttribute('role', id, 'data-role', result[id]['role']);
                    createSpan.buildElement('tag-box', ['level', 'category'], 1, true, id);
                    createSpan.addText('level', id, result[id]['level']);
                    createSpan.addAttribute('level', id, 'data-level', result[id]['level']);
                    // Languages & Tools
                    if (result[id]['languages'] !== []) {
                        for (const lang of result[id]['languages']) {
                            createSpan.buildElement('tag-box', ['languages', 'category'], 1, true, id);
                            langArr.push(lang);
                            if (id === 9) {
                                for (let langId = 0; langId < langArr.length; langId++) {
                                    createSpan.addText('languages', langId, langArr[langId]);
                                    createSpan.addAttribute('languages', langId, 'data-languages', langArr[langId]);
                                }
                            }
                        }
                    }
                    if (result[id]['tools'] !== []) {
                        for (const tool of result[id]['tools']) {
                            createSpan.buildElement('tag-box', ['tools', 'category'], 1, true, id);
                            toolArr.push(tool);
                            if (id === 9) {
                                for (let toolId = 0; toolId < toolArr.length; toolId++) {
                                    createSpan.addText('tools', toolId, toolArr[toolId]);
                                    createSpan.addAttribute('tools', toolId, 'data-tools', toolArr[toolId]);
                                }
                            }
                        }
                    }
                }
                // Add Event Listeners
                const [roleCategories, levelCategories, languagesCategories, toolsCategories] = [$('span[data-role]'),  $('span[data-level]'), $('span[data-languages]'), $('span[data-tools]')];
                for (let roleCategory of roleCategories) {
                    roleCategory.addEventListener('click', filterByRole);
                }
                for (let levelCategory of levelCategories) {
                    levelCategory.addEventListener('click', filterByLevel);
                }
                for (let languagesCategory of languagesCategories) {
                    languagesCategory.addEventListener('click', filterByLanguages);
                }
                for (let toolsCategory of toolsCategories) {
                    toolsCategory.addEventListener('click', filterByTools);
                }
                document.getElementsByClassName('btn-reset')[0].addEventListener('click', clearFilter); // Clear Filter
                const toUndoFilters = document.getElementsByClassName('reset-icon-box');
                for (let toUndo of toUndoFilters) {
                    toUndo.addEventListener('click', undoFilter);
                }
            } else {
                throw new Error(`Error:${status}`);
            }
        });
    })();
    })
