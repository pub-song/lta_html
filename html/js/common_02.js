document.addEventListener("DOMContentLoaded", () => {

    const treeMenu = (containerId) => {
        if (!containerId) {
            return;
        }
    
        const container = document.querySelector(containerId);
        if (!container) {
            return;
        }
    
        const menuAll = container.querySelector('.all-tree');
        const oneDepth = container.querySelector('.two-depth-list')
        const twoDepthMenuButtons = container.querySelectorAll('.two-depth-button');
        const treeDepthMenuList = container.querySelectorAll('.tree-depth-list');
        const treeDepthMenus = container.querySelectorAll('.tree-depth-list li a');
        const depthTreeMenus = container.querySelectorAll('.depthmenu03 li a');
        console.log(menuAll, oneDepth)
        if (menuAll) {
            menuAll.addEventListener('click', () => {
                menuAll.classList.toggle('is-active');
                // twoDepthMenuButtons.forEach(button => {
                //     button.classList.toggle('is-active');
                // });
                oneDepth.classList.toggle('is-active');
                // treeDepthMenuList.forEach(list => {      
                //     list.classList.toggle('is-active');
                // });
            });
        }
    
        twoDepthMenuButtons.forEach(menu => {
            menu.addEventListener('click', () => {
                menu.classList.toggle('is-active');
                if (menu.parentElement.nextElementSibling) {
                    menu.parentElement.nextElementSibling.classList.toggle('is-active');
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

        depthTreeMenus.forEach(menu => {
            menu.addEventListener('click', () => {
                menu.classList.toggle('is-active');
                if (menu.parentElement.nextElementSibling) {
                    menu.parentElement.nextElementSibling.classList.toggle('is-active');
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
    tabMenus('.law-tree-menu');

    const checkFormValLength = () => {
        const formEls = document.querySelectorAll('.form-table input[type="text"]');
    
        formEls.forEach(el => {
            const countVal = parseInt(el.value.length);
            const countEl = el.closest('.input-multi').querySelector('.input-text-count .current');
            if(countEl) {
                countEl.innerText = countVal;
            } 
        });
    
        formEls.forEach(el => {            
            el.addEventListener('input', event => {
                const countVal = parseInt(el.value.length);
                const countEl = el.closest('.input-multi').querySelector('.input-text-count .current');
                if(countEl) {
                    countEl.innerText = countVal;
                }
                const total = parseInt(el.closest('.input-multi').querySelector('.input-text-count .total').textContent);
    
                if (countVal > total) {
                    el.value = el.value.substring(0, total);
                }               
            })         
        })
    }
    
    checkFormValLength();
    
    // 파일 첨부
    const fileListWrap = document.querySelector('.file-list');

    // 파일명 표시 기능
    const addFileNameListener = (fileInput) => {
        fileInput.addEventListener('change', () => {
            const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : '';
            const textInput = fileInput.closest('li').querySelector('.input-type input[type="text"]');
            if (textInput) {
                textInput.value = fileName;
            }
        });
    };

    // 기존 파일 입력란에 이벤트 리스너 추가
    const fileLists = document.querySelectorAll('.file-list li input[type=file]');
    fileLists.forEach(el => {
        addFileNameListener(el);
    });

    // 파일 입력란 추가 기능
    const addFileAddListener = (button) => {
        button.addEventListener('click', () => {
            const newListItem = document.createElement('li');
            newListItem.innerHTML = `
                <input type="file" name="" class="file" />
                <div class="form-element__wrap">                                  
                    <div class="input-multi file-up">
                        <span class="form-element__inner input-type">
                            <input type="text" placeholder="" title="파일첨부">
                        </span>
                        <button type="button" class="btn-border-gray">
                            <i class="icon-file"></i>
                            파일찾기
                        </button>
                        <button type="button" class="btn-dark-light file-remove">
                            <i class="ico-minus"></i>
                            삭제
                        </button>
                        <button type="button" class="btn-dark-light btn-add">
                            <i class="ico-plus"></i>
                            추가
                        </button>
                    </div>
                </div>  
            `;
            fileListWrap.appendChild(newListItem);

            // 새로 추가된 파일 입력란과 버튼에 이벤트 리스너 추가
            const newFileInput = newListItem.querySelector('input[type="file"]');
            addFileNameListener(newFileInput);

            const newAddButton = newListItem.querySelector('.btn-add');
            addFileAddListener(newAddButton);

            const newRemoveButton = newListItem.querySelector('.file-remove');
            addFileRemoveListener(newRemoveButton);
        });
    };

    const fileAddButtons = document.querySelectorAll('.file-list li .btn-add');
    fileAddButtons.forEach(button => {
        addFileAddListener(button);
    });

    // 파일 입력란 삭제 기능
    const addFileRemoveListener = (button) => {
        button.addEventListener('click', () => {
            button.closest('li').remove();
        });
    };

    const fileRemoveButtons = document.querySelectorAll('.file-list li .file-remove');
    fileRemoveButtons.forEach(button => {
        addFileRemoveListener(button);
    });   
    

});