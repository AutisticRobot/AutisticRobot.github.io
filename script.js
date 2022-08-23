const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');
const params = new URLSearchParams(window.location.search);
var active;
var local = params.get("local");

//per click update
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        let URL=window.location.origin + window.location.pathname + "?local=" + JSON.stringify(tab.getAttribute("data-tab-target"));

        window.location.assign(URL);
    })
})

//on load, load clicked tab
if(params.has("local")){
    setAct(local);
}else{
    setAct(JSON.stringify(tabs[0].getAttribute("data-tab-target")));
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