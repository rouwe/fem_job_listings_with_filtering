function filterByRole() {
    // Filter job lists depending on roles
    const roleTag = this.innerHTML;
    const notRoleArr = $(`.role:not([data-role="${roleTag}"])`);
    for (const notRole of notRoleArr) {
        // Hide elements
        $(notRole).parent().parent().css("display", "none");
    }
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
}
function filterByTools() {
    // Filter job lists depending on tools
}