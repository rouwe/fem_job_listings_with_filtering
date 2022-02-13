const activeFilterCategories = new Set();
const activeFiltersTag = new Set();
const categories = {
    role: ['Frontend', 'Backend', 'Fullstack'],
    level: ['Junior', 'Midweight', 'Senior'],
    languages: ['Python', 'Ruby', 'JavaScript', 'HTML', 'CSS'],
    tools: ['React', 'Sass', 'Vue', 'Django', 'RoR']
};
function addFilter(category, filterValue) {
    // Add a filter button inside filters container
    document.getElementById('filters-container').style.display = 'flex';
    for (let idx = 0; idx < categories[category].length; idx++) {
        const currentTagText = categories[category][idx];
        const currentButton = document.getElementsByClassName(`${category}-filter`)[idx];
        if (currentTagText === filterValue) {
            currentButton.style.display = 'flex';
            activeFilterCategories.add(category);
            activeFiltersTag.add(currentTagText);
            break;
        }
    }
};
function clearFilter() {
    // Clear/reset filters
    document.getElementById('filters-container').style.display = 'none';
    const filtersButtons = $('.filter-box') ;
    for (const filterButton of filtersButtons) {
        filterButton.style.display = "none";
    }
    const jobContainers = document.getElementsByClassName('job-container');
    for (const jobContainer of jobContainers) {
        jobContainer.style.display = "flex";
    }
}
function undoFilter() {
    // Remove a filter
    const parentElement = $(this.parentElement);
    const parentElementText = parentElement[0].childNodes[1].innerHTML;
    const rawCategory = parentElement[0].classList[1];
    const parentCategory = rawCategory.split('-')[0];
    const tagCategories = document.getElementsByClassName('category');
    for (let category of tagCategories) {
        if (category.innerHTML === parentElementText) {
            const jobContainer = $(category).parent().parent();
            jobContainer[0].style.display = "none";
        }
    }
    activeFiltersTag.delete(parentElementText);
    const hasActiveCategoryFilter = categories[parentCategory].some((tag) => {
        if (activeFiltersTag.has(tag)) {
            return true;
        }
    })
    if (!hasActiveCategoryFilter) {
        activeFilterCategories.delete(parentCategory);
    }
    parentElement[0].style.display = "none";
}
function filterByRole() {
    // Filter job lists depending on roles
    const roleTagText = this.innerHTML;
    const notRoleArr = $(`.role:not([data-role="${roleTagText}"])`);
    for (const notRole of notRoleArr) {
        // Hide elements
        $(notRole).parent().parent().css("display", "none");
    }
    addFilter('role', roleTagText);
}
function filterByLevel() {
    // Filter job lists depending on levels
    const levelTagText = this.innerHTML;
    const notLevelArr = $(`.level:not([data-level="${levelTagText}"])`);
    for (const notLevel of notLevelArr) {
        // Hide elements
        $(notLevel).parent().parent().css("display", "none");
    }
    addFilter('level', levelTagText);
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
    addFilter('languages', languageTagText);
}
function filterByTools() {
    // Filter job lists depending on tools
    const toolTagText = this.innerHTML;
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
            if (elementText === toolTagText) {
                toDisplaySet.add($(job).parent());
            }
            counter = counter + 1;
        }
    }
    addFilter('tools', toolTagText);
    // Hide all elements in toCloseSet
    for (const toClose of toCloseSet) {
        $(toClose[0]).css("display", "none");
    }
    // Display all elements in toDisplaySet
    for (const toDisplay of toDisplaySet) {
        $(toDisplay[0]).css("display", "flex");
    }
}