// NOTE: Full JavaScript functionality (form validation, animations, etc.)
// is scoped to Part 3 of this POE, not Part 2.
//
// The one exception is below: a mobile navigation menu that expands/collapses
// on small screens needs *some* JavaScript to toggle visibility, since CSS alone
// cannot respond to a button click. This is limited to just that single interaction.

document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function () {
            mainNav.classList.toggle('open');
        });
    }
});
