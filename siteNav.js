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

class footar extends HTMLElement 
{
    constructor()
    {
        super()
        this.innerHTML =
        `
        <footer>
        <div>
            <p>Copyright 2022-2023 Tyler M. Kormann</p>
          <p>Hosted on <a href="https://github.com/AutisticRobot/AutisticRobot.github.io">Github Pages</a></p>
        </div>
      </footer>
        `
        
    }
}
customElements.define("footer-nav", footar)//these also need to show up AFTER class declaration.

const tabs = document.querySelectorAll(".tabs")[0].childNodes;//query select first element with class "tabs"
 //per click update
  tabs.forEach(tab => {
    if(tab.classList != undefined)//for some reason every even child starting with 0 is just a line break;
    {
      tab.addEventListener('click', () => {

        for(var t = 1; t < tabs.length; t += 2){
            if(tab == tabs[t]){
                clicked = t;
                console.log(clicked);
                //clicked = (2 * clicked) + 1;
            }
        }
        let URL=window.location.origin + "/index.html" + "?local=" + clicked;

        window.location.assign(URL);
    })
}
  })
  