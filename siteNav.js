const tabs = document.querySelectorAll('[data-tab-target]');
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
  