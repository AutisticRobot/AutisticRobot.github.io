const tabContents = document.querySelectorAll('[data-tab-content]');
const params = new URLSearchParams(window.location.search);
var active;
var local = params.get("local");
var clicked;

//on load, load clicked tab
if(params.has("local")){
    setAct(local);
}else{
    setAct(1);
}

function setAct(tabAt) {
    tabContents.forEach(tabContent => {
        tabContent.classList.remove('active');
    })
    tabs.forEach(tab => {
        if(tab.classList != undefined || null)
        {
        tab.classList.remove('active');
        }
    })
    //tabAt = 1 + ( tabAt * 2 );
    const tab = tabs[tabAt];

    const target = document.querySelector(tab.dataset.tabTarget);
    tab.classList.add('active');
    target.classList.add('active');
}
