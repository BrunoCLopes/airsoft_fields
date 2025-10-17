document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeSidebarButton = document.getElementById('close-sidebar-button');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    function openSidebar() {
        sidebar.classList.remove('-translate-x-full');
        mobileMenuButton.classList.add('hidden');
        overlay.classList.remove('hidden');
    }

    function closeSidebar() {
        mobileMenuButton.classList.remove('hidden');
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    }

    mobileMenuButton.addEventListener('click', openSidebar);
    closeSidebarButton.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    document.querySelectorAll('#sidebar a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                closeSidebar();
            }
        });
    });
});