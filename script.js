const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');
const params = new URLSearchParams(window.location.search);
var active;
var local = params.get("local");
var clicked;

//per click update
tabs.forEach(tab => {
    tab.addEventListener('click', () => {

        for(var t = 0; t < tabs.length; t++){
            if(tab == tabs[t]){
                clicked = t;
            }
        }
        let URL=window.location.origin + window.location.pathname + "?local=" + clicked;

        window.location.assign(URL);
    })
})

//on load, load clicked tab
if(params.has("local")){
    setAct(local);
}else{
    setAct(0);
}

function setAct(tabAt) {
    console.log(tabAt)
    tabContents.forEach(tabContent => {
        tabContent.classList.remove('active');
    })
    tabs.forEach(tab => {
        tab.classList.remove('active');
    })
    const tab = tabs[tabAt];
    const target = document.querySelector(tab.dataset.tabTarget);
    tab.classList.add('active');
    target.classList.add('active');
}