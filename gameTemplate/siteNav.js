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
        local.clickedTab = tab.getAttribute("data-tab-target");
        local.return = true;
        window.localStorage.setItem('ClickTab', JSON.stringify(local));
        console.log(local.clickedTab);
        window.location.href = "/index.html";
      })
  })
  