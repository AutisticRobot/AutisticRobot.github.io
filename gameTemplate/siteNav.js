const tabs = document.querySelectorAll('[data-tab-target]');

if(window.localStorage.getItem('ClickTab') == undefined || null){
    const global = {
        return: false,
        clickedTab: "none",
    }
    window.localStorage.setItem('ClickTab', JSON.stringify(global));
  }


  //per click update
  tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        var local = JSON.parse(window.localStorage.getItem('ClickTab'));
        local.return = true;
        local.clickedTab = tab;
        window.localStorage.setItem('ClickTab', JSON.stringify(local));
        console.log(tab);
        //window.location.href = "/index.html";
      })
  })