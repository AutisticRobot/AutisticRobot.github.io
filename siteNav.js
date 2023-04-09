class siteNav extends HTMLElement 
{
    constructor()
    {
        super()
        this.innerHTML =
        `
        <nav style="padding-top: 16px;">
            <ul class="tabs">
                <li data-tab-target="#home" class="tab">Home</li>
                <li data-tab-target="#blog" class="tab">Blog</li>
                <li data-tab-target="#games" class="tab">Games</li>
            </ul>
        </nav>
        `
    }
}

customElements.define("site-nav", siteNav)//NEEDS to appear BEFORE navigation logic or it wont be detected.

const tabs = document.querySelectorAll(".tabs");//query select first element with class "tabs"
 //per click update
  tabs.forEach(tab => {
      tab.addEventListener('click', () => {

        for(var t = 0; t < tabs.length; t++){
            if(tab == tabs[t]){
                clicked = t;
            }
        }
        let URL=window.location.origin + "/index.html" + "?local=" + clicked;

        window.location.assign(URL);
    })
  })
  