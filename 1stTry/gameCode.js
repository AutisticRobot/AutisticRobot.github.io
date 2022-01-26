var WIDTH = 900;
      var HEIGHT = 500;

      var canvas = document.getElementById("ctx");
      var ctx = canvas.getContext("2d");
      canvas.focus();
      canvas.addEventListener("keydown", movePlayer);

      //player vars
      var player = {
        xPos: 50,
        yPos: 50
      }

      var keys = {
        up: false,
        right: false,
        left: false,
        down: false
      }

      //movements
      var isJumping = false;
      var speed = 10;
      
      function movePlayer(event){
        switch(event.keyCode){
          case 39:
            keys["right"] = true;
            break;
          case 38:
            isJumping = true;
            keys["up"] = true;
            break;
          case 40:
            keys["down"] = true;
            break;
          case 37:
            keys["left"] = true;
            break;
        }
      }

      function keyUp(event){
        switch(event.keyCode){
          case 39:
            keys["right"] = false;
            break;
          case 38:
            isJumping = false;
            keys["up"] = false;
            break;
          case 40:
          keys["down"] = false;
            break;
          case 37:
            keys["left"] = false;
            break;
        }
      }

      // game loop
      function update(){
        window.requestAnimationFrame(update);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        // player
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.fillRect(player.xPos, player.yPos, 50, 50);

        //ground
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.fillRect(0, 490, WIDTH, 10);

        //movement
        if(keys["up"]){
          player.yPos -= speed;
        }
        if(keys["down"]){
          player.yPos += speed;
        }
        if(keys["right"]){
          player.xPos += speed;
        }
        if(keys["left"]){
          player.xPos -= speed;
        }

        if(keys["down"]){
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.fillRect(10, 30, 50, 50);
        }
      }

      window.requestAnimationFrame(update);
