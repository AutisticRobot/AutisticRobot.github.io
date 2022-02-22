const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');
var active;

//per click update
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active');
        })
        tabs.forEach(tab => {
            tab.classList.remove('active');
        })
        setAct(tab);
    })
})

function setAct(tab) {
    const target = document.querySelector(tab.dataset.tabTarget);
    tab.classList.add('active');
    target.classList.add('active');
}