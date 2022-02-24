const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');
var active;
if(JSON.parse(window.localStorage.getItem('ClickTab')) == undefined || null){
    const global = {
        return: false,
        clickedTab: "none",
    }
    window.localStorage.setItem('ClickTab', JSON.stringify(global));
}

//per click update
tabs.forEach(tab => {
    tab.addEventListener('click', () => {

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active');
        })
        tabs.forEach(tab => {
            tab.classList.remove('active');
        })
        var local = JSON.parse(window.localStorage.getItem('ClickTab'));
        local.clickedTab = JSON.stringify(tab.getAttribute("data-tab-target"));
        local.return = true;
        window.localStorage.setItem('ClickTab', JSON.stringify(local));
        setAct(local.clickedTab);
    })
})

//on load, load clicked tab
document.addEventListener("load", () => {
    var local = JSON.parse(window.localStorage.getItem('ClickTab'));
    if(local.return = true){
        setAct(local.clickedTab);
        //local.return = false;
        window.localStorage.setItem('ClickTab', JSON.stringify(local));
    }
})

function setAct(tabAt) {
    var tab;
    tabs.forEach(test => {
        if (JSON.stringify(test.getAttribute("data-tab-target")) == tabAt){
            tab = test;
        }
    })
    const target = document.querySelector(tab.dataset.tabTarget);
    tab.classList.add('active');
    target.classList.add('active');
}