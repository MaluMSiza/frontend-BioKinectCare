function toggleNav() {
    var navItems = document.querySelectorAll('.main-nav li:not(:first-child)');
    navItems.forEach(function(item) {
        item.classList.toggle('show');
    });
}
