
class siteNav extends HTMLElement 
{
    constructor()
    {
        super()
        this.innerHTML =
        `
        <nav style="padding-top: 16px;">
            <ul class="tabs">
                <li data-tab-target="#home" class="tab active">Home</li>
                <li data-tab-target="#blog" class="tab">Blog</li>
                <li data-tab-target="#games" class="tab">Games</li>
            </ul>
        </nav>
        `
    }
}
customElements.define("site-nav", siteNav)//NEEDS to appear BEFORE navigation logic or it wont be detected.

const tabs = document.querySelectorAll(".tabs")[0].childNodes;
const tabContents = document.querySelectorAll('[data-tab-content]');
const params = new URLSearchParams(window.location.search);
var active;
var local = params.get("local");
var clicked;

//per click update
tabs.forEach(tab => {
    if(tab.classList != undefined)
    {
        tab.addEventListener('click', () => {

            for(var t = 1; t < tabs.length; t += 2){
                if(tab == tabs[t]){
                    clicked = t;
                }
            }
            let URL=window.location.origin + window.location.pathname + "?local=" + clicked;

            window.location.assign(URL);
        })
    }
})

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
