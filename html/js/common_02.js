document.addEventListener("DOMContentLoaded", () => {

    const treeMenu = (containerId) => {
        if (!containerId) {
            return;
        }
    
        const container = document.querySelector(containerId);
        if (!container) {
            return;
        }
    
        const menuAll = container.querySelector('.one-depth.all');
        const twoDepthMenuButtons = container.querySelectorAll('.two-depth-button');
        const treeDepthMenuList = container.querySelectorAll('.tree-depth-list');
        const treeDepthMenus = container.querySelectorAll('.tree-depth-list li a');
    
        if (menuAll) {
            menuAll.addEventListener('click', () => {
                menuAll.classList.toggle('is-active');
                twoDepthMenuButtons.forEach(button => {
                    button.classList.toggle('is-active');
                });
                treeDepthMenuList.forEach(list => {
                    list.classList.toggle('is-active');
                });
            });
        }
    
        twoDepthMenuButtons.forEach(menu => {
            menu.addEventListener('click', () => {
                menu.classList.toggle('is-active');
                if (menu.nextElementSibling) {
                    menu.nextElementSibling.classList.toggle('is-active');
                }
            });
        });
    
        treeDepthMenus.forEach(menu => {
            menu.addEventListener('click', () => {
                const activeItem = container.querySelector('.tree-menu li.is-active');
                if (activeItem) {
                    activeItem.classList.remove('is-active');
                }
                menu.parentElement.classList.add('is-active');
                const selectData = menu.textContent;
                const lawContent = document.querySelector('.law-content .table_cont');
                if (lawContent) {
                    lawContent.setAttribute('data-name', selectData);
                }
            });
        });
    };
    
    treeMenu('#coverment');
    treeMenu('#law-list');
    

    // 탭
    // 탭메뉴
    function tabMenus(tabGroupSelector) {
        const tabGroup = document.querySelector(tabGroupSelector);
        if (!tabGroup) return; 

        const tabButtons = tabGroup.querySelectorAll('.tree-tab-head button');
        const tabPanes = tabGroup.querySelectorAll('.tree-menu');

        if (!tabButtons.length || !tabPanes.length) return; 

        tabButtons.forEach((button, index) => {
            button.addEventListener('click', event => {
                event.preventDefault();
                handleTabClick(index);
            });
        });

        function handleTabClick(index) {
            tabButtons.forEach(btn => btn.classList.remove('is-active'));
            tabButtons[index].classList.add('is-active');
            tabPanes.forEach(pane => pane.classList.remove('is-active'));
            tabPanes[index].classList.add('is-active');
        }
    }
    tabMenus('.law-tree-menu')
});