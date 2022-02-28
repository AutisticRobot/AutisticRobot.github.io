const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');
var active;
var local = JSON.parse(window.localStorage.getItem('ClickTab'));
if(local == undefined || null || local.clickedTab == undefined || null){

    const global = {
        return: false,
        clickedTab: "#home",
    }
    window.localStorage.setItem('ClickTab', JSON.stringify(global));
}

//per click update
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        var local = JSON.parse(window.localStorage.getItem('ClickTab'));
        local.clickedTab = JSON.stringify(tab.getAttribute("data-tab-target"));
        window.localStorage.setItem('ClickTab', JSON.stringify(local));
        setAct(local.clickedTab);
    })
})

//on load, load clicked tab
if(local.return == true){
    setAct(local.clickedTab);
    local.return = false;
    window.localStorage.setItem('ClickTab', JSON.stringify(local));
}else{
    tabContents.forEach(tabContent => {
        tabContent.classList.remove('active');
    })
    tabs.forEach(tab => {
        tab.classList.remove('active');
    })
    tabs.forEach(test => {
        if (test == tabs[0]){
            const target = document.querySelector(test.dataset.tabTarget);
            test.classList.add('active');
            target.classList.add('active');
        }
    })
}

function setAct(tabAt) {
    console.log(tabAt)
    tabContents.forEach(tabContent => {
        tabContent.classList.remove('active');
    })
    tabs.forEach(tab => {
        tab.classList.remove('active');
    })
    tabs.forEach(test => {
        if (JSON.stringify(test.getAttribute("data-tab-target")) == tabAt){
            const target = document.querySelector(test.dataset.tabTarget);
            test.classList.add('active');
            target.classList.add('active');
        }
    })
}