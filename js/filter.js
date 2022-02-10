let filtersApplied = [];
function addFilter(filterValue, roleTag) {
    // Add a filter button inside filters container
    if (!filtersApplied.includes(filterValue)) {
        const filterContainer = $('#filters-container');
        const filterBox = document.createElement('div');
        const resetBox = document.createElement('div');
        $(filterContainer).append(filterBox);
        $(filterBox).attr('class', 'filter-box');
        $(filterContainer).append(resetBox);
        $(resetBox).attr('class', 'reset-box');
        const createButton = document.createElement('button');
        const createResetButton = document.createElement('button');
        $(createButton).attr("class", 'btn-filter');
        $(createButton).text(roleTag);
        $(createResetButton).attr('class', 'btn-reset');
        $(createResetButton).text('Clear');
        filterBox.appendChild(createButton);
        resetBox.appendChild(createResetButton);
        filtersApplied.push(filterValue);
    }
}
function filterByRole() {
    // Filter job lists depending on roles
    const roleTag = this.innerHTML;
    const notRoleArr = $(`.role:not([data-role="${roleTag}"])`);
    for (const notRole of notRoleArr) {
        // Hide elements
        $(notRole).parent().parent().css("display", "none");
    }
    addFilter('role', roleTag);
}
function filterByLevel() {
    // Filter job lists depending on levels
    const levelTag = this.innerHTML;
    const notLevelArr = $(`.level:not([data-level="${levelTag}"])`);
    for (const notLevel of notLevelArr) {
        // Hide elements
        $(notLevel).parent().parent().css("display", "none");
    }
}
function filterByLanguages() {
    // Filter job lists dependng on languages    
    const languageTagText = this.innerHTML;
    const jobContainers = $('.tag-box');
    const toDisplaySet = new Set();
    for (const job of jobContainers) {
        let counter = 2;
        while (counter < $(job)[0].childNodes.length) {
            const firstClass = $(job)[0].childNodes[counter].classList[0];
            const elementText = $(job)[0].childNodes[counter].innerHTML;
            if (firstClass !== 'languages') {
                break;
            }
            $(job).parent().css("display", "none");
            if (elementText === languageTagText) {
                toDisplaySet.add($(job).parent());
            }
            counter = counter + 1;
        }
    }
    for (const toDisplay of toDisplaySet) {
        $(toDisplay[0]).css("display", "flex");
    }
}
function filterByTools() {
    // Filter job lists depending on tools
    const toolsTagText = this.innerHTML;
    const jobContainers = $('.tag-box');
    const toDisplaySet = new Set();
    const toCloseSet = new Set();
    for (const job of jobContainers) {
        let counter = 2;
        while (counter < $(job)[0].childNodes.length) {
            const firstClass = $(job)[0].childNodes[counter].classList[0];
            const elementText = $(job)[0].childNodes[counter].innerHTML;
            if (firstClass !== 'tools') {
                counter = counter + 1;
                toCloseSet.add($(job).parent())
                continue;
            }
            $(job).parent().css("display", "none");
            if (elementText === toolsTagText) {
                toDisplaySet.add($(job).parent());
            }
            counter = counter + 1;
        }
    }
    // Hide all elements in toCloseSet
    for (const toClose of toCloseSet) {
        $(toClose[0]).css("display", "none");
    }
    // Display all elements in toDisplaySet
    for (const toDisplay of toDisplaySet) {
        $(toDisplay[0]).css("display", "flex");
    }
}