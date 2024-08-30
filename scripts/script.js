const menuToggle = document.querySelector('.bx-menu');
const sidebar = document.querySelector('.sidebar');
const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');
const switchMode = document.getElementById('switch-mode');

function applySidebarState() {
    const sidebarState = localStorage.getItem('sidebar-state');
    if (sidebarState === 'closed') {
        sidebar.classList.add('close');
    } else {
        sidebar.classList.remove('close');
    }
}

window.addEventListener('load', () => {
    applySidebarState();

    sidebar.classList.remove('sidebar-initial');

    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark');
        switchMode.checked = true;
    } else {
        document.body.classList.remove('dark');
        switchMode.checked = false;
    }
});

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('close');
    // Armazena o estado da sidebar
    if (sidebar.classList.contains('close')) {
        localStorage.setItem('sidebar-state', 'closed');
    } else {
        localStorage.setItem('sidebar-state', 'open');
    }
});

searchButton.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

if (window.innerWidth < 768) {
    sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

switchMode.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('dark-mode', 'disabled');
    }
});

const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll('.sidebar .nav-links a');

navLinks.forEach(link => {
    link.classList.remove('active');
});

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});
