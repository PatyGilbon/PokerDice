$(document).ready(function() {
  window.onload = function () {
    var game = new GameCubilete();
  };
//Initializes the game.
  function GameCubilete () {
    this.pokerHand = [];
    this.pokerHand2=[];
    this.playerHand = [];
    this.playerHand2=[];
    this.score = 0;
    this.score2=0;
    this.repeated =0;
    this.repeated2=0;
    this.pointsPair=[];
    this.pointsThrees=[];
    this.player1=0;
    this.player2=0;
    this.won1=false;
    this.won2=false;
  }
//Rolls the dice and generates hand.
  GameCubilete.prototype._rollTheDice = function () {
    for(i=0;i<5;i++){
        var rand = Math.floor(Math.random() * 6 + 0);
        switch (rand) {
          case 0:
            this.pokerHand[i]="9";
          break;
          case 1:
            this.pokerHand[i]="10";
          break;
          case 2:
            this.pokerHand[i]="J";
          break;
          case 3:
            this.pokerHand[i]="Q";
          break;
          case 4:
            this.pokerHand[i]="K";
          break;
          case 5:
            this.pokerHand[i]="A";
          break;
        }
    }
    console.log("initial hand " +this.pokerHand);
    game.drawCards();
    return this.pokerHand;
  };
  GameCubilete.prototype.drawCards = function() {
    var currentDice;
    for(i=0;i<this.pokerHand.length;i++){
      var z = i+1;
      currentDice = ".dice:nth-child(" + z +")";
      switch (this.pokerHand[i]) {
        case "9":
          $(currentDice).removeClass("start");
          $(currentDice).addClass("nine");
        break;
        case "10":
          $(currentDice).removeClass("start");
          $(currentDice).addClass("ten");
        break;
        case "J":
          $(currentDice).removeClass("start");
          $(currentDice).addClass("jack");
        break;
        case "Q":
          $(currentDice).removeClass("start");
          $(currentDice).addClass("queen");
        break;
        case "K":
          $(currentDice).removeClass("start");
          $(currentDice).addClass("king");
        break;
        case "A":
          $(currentDice).removeClass("start");
          $(currentDice).addClass("ace");
        break;
        }
      }
   };
  //finds repeated numbers in pokerHand and stores them in a new array.
  GameCubilete.prototype._findRepeated= function () {
      this.repeated=[];
      for(j=0;j<this.pokerHand.length;j++){
        for(i=0;i<this.pokerHand.length;i++){
          if(this.pokerHand[j]===this.pokerHand[i] && i!=j){
            this.repeated.push(this.pokerHand[i]);
            break;
          }
        }
      }
      return this.repeated;
    };
//finds if there are five of a kind.
  GameCubilete.prototype._findQuintilla = function () {
    var hand=this._findRepeated();
        if(hand[0]==="A"){
          document.getElementById("score").innerHTML = "aces full!";
          this.score=36;
        }else if(hand[0]==="K"){
          document.getElementById("score").innerHTML = "kings full!";
          this.score=35;
        }else if(hand[0]==="Q"){
          document.getElementById("score").innerHTML = "queens full!";
          this.score=34;
        }else if(hand[0]==="J"){
          document.getElementById("score").innerHTML = "jacks full!";
          this.score=33;
        }else if(hand[0]==="10"){
          document.getElementById("score").innerHTML = "tens full!";
          this.score=32;
        }else if(hand[0]==="9"){
          document.getElementById("score").innerHTML = "nines full!";
          this.score=31;
        }
        return this.score;
    };
//finds if there are four of a kind.
  GameCubilete.prototype._findFours = function () {
       var hand=this._findRepeated();
           if(hand[0]==="A"){
             document.getElementById("score").innerHTML = "four aces";
             this.score=30;
           }else if(hand[0]==="K"){
             document.getElementById("score").innerHTML = "four kings";
             this.score=29;
           }else if(hand[0]==="Q"){
             document.getElementById("score").innerHTML = "four queens";
             this.score=28;
           }else if(hand[0]==="J"){
             document.getElementById("score").innerHTML = "four jacks";
             this.score=27;
           }else if(hand[0]==="10"){
             document.getElementById("score").innerHTML = "four tens";
             this.score=26;
           }else if(hand[0]==="9"){
             document.getElementById("score").innerHTML = "four nines";
             this.score=25;
           }
      return this.score;
  };
//finds if there are three of a kind.
  GameCubilete.prototype._findThrees = function () {
      var hand=this._findRepeated();
          if(hand[0]==="A"){
            document.getElementById("score").innerHTML = "three aces";
            this.score=18;
          }else if(hand[0]==="K"){
            document.getElementById("score").innerHTML = "three kings";
            this.score=17;
          }else if(hand[0]==="Q"){
            document.getElementById("score").innerHTML = "three queens";
            this.score=16;
          }else if(hand[0]==="J"){
            document.getElementById("score").innerHTML = "three jacks";
            this.score=15;
          }else if(hand[0]==="10"){
            document.getElementById("score").innerHTML = "three tens";
            this.score=14;
          }else if(hand[0]==="9"){
            document.getElementById("score").innerHTML = "three nines";
            this.score=13;
          }
      return this.score;
  };
//finds if there is a pair.
  GameCubilete.prototype._findPair = function (){
    var hand=this._findRepeated();
        if(hand[0]==="A"){
          document.getElementById("score").innerHTML = "pair of aces";
          this.score=6;
        }else if(hand[0]==="K"){
          document.getElementById("score").innerHTML = "pair of kings";
          this.score=5;
        }else if(hand[0]==="Q"){
          document.getElementById("score").innerHTML = "pair of queens";
          this.score=4;
        }else if(hand[0]==="J"){
          document.getElementById("score").innerHTML = "pair of jacks";
          this.score=3;
        }else if(hand[0]==="10"){
          document.getElementById("score").innerHTML = "pair of tens";
          this.score=2;
        }else if(hand[0]==="9"){
          document.getElementById("score").innerHTML = "pair of nines";
          this.score=1;
        }
      return this.score;
  };
//finds if there is a full.
  GameCubilete.prototype._findFull = function () {
    var hand=this._findRepeated();
    var pair1=[];
    var pair2=[];
    var par=[];
    var tercia=[];
    for(i=1;i<5;i++){
      if(hand[0]===hand[i]){
        pair1.push(hand[i]);
      }else{
        pair2.push(hand[i]);
      }
    }
    if(hand[0]===pair1[0]){
      pair1.push(hand[0]);
    }else{
      pair2.push(hand[0]);
    }
    var length1=pair1.length;
    var length2=pair2.length;
    if(length1>length2){
      tercia=pair1;
      par=pair2;
    }else{
      par=pair1;
      tercia=pair2;
    }

    var a=0;
    var b=0;
    var c=0;
    var d=0;
    if(tercia[0]==="A"){
      a="three aces";
      c=18;
    }else if(tercia[0]==="K"){
      a="three kings";
      c=17;
    }else if(tercia[0]==="Q"){
      a="three queens";
      c=16;
    }else if(tercia[0]==="J"){
      a="three jacks";
      c=15;
    }else if(tercia[0]==="10"){
      a="three tens";
      c=14;
    }else if(tercia[0]==="9"){
      a="three nines";
      c=13;
    }
    if(par[0]==="A"){
      b="pair of aces";
      d=6;
    }else if(par[0]==="K"){
      b="pair of kings";
      d=5;
    }else if(par[0]==="Q"){
      b="pair of queens";
      d=4;
    }else if(par[0]==="J"){
      b="pair of jacks";
      d=3;
    }else if(par[0]==="10"){
      b="pair of tens";
      d=2;
    }else if(par[0]==="9"){
      b="pair of nines";
      d=1;
    }
    this.score=c+d;
    document.getElementById("score").innerHTML = a+" and ";
    document.getElementById("score3").innerHTML = b;
    console.log(a+" and a "+b);
    return this.score;
  };
//finds if there are two pairs.
  GameCubilete.prototype._findTwoPairs = function () {
    var hand=this._findRepeated();
    var pair1=[];
    var pair2=[];
    for(i=1;i<hand.length;i++){
      if(hand[0]===hand[i]){
        pair1.push(hand[i]);
        pair1.push(hand[0]);
      }else{
        pair2.push(hand[i]);
      }
    }
    var a=0;
    var b=0;
    var c=0;
    var d=0;

    if(pair1[0]==="A"){
      a="pair of aces";
      c=6;
    }else if(pair1[0]==="K"){
      a="pair of kings";
      c=5;
    }else if(pair1[0]==="Q"){
      a="pair of queens";
      c=4;
    }else if(pair1[0]==="J"){
      a="pair of jacks";
      c=3;
    }else if(pair1[0]==="10"){
      a="pair of tens";
      c=2;
    }else if(pair1[0]==="9"){
      a="pair of nines";
      c=1;
    }

    if(pair2[0]==="A"){
      b="pair of aces";
      d=6;
    }else if(pair2[0]==="K"){
      b="pair of kings";
      d=5;
    }else if(pair2[0]==="Q"){
      b="pair of queens";
      d=4;
    }else if(pair2[0]==="J"){
      b="pair of jacks";
      d=3;
    }else if(pair2[0]==="10"){
      b="pair of tens";
      d=2;
    }else if(pair2[0]==="9"){
      b="pair of nines";
      d=1;
    }
    this.score=c+d;
    console.log(a+" and "+b);
    document.getElementById("score").innerHTML = a+" and ";
    document.getElementById("score3").innerHTML = b;
    return this.score;
};
$("#first-game").on("click",function(){
  game._rollTheDice();
});
var game = new GameCubilete();
//looks for all the possible solutions.
GameCubilete.prototype._checkGame = function () {
    var count=0;
    var hand=this._findRepeated();
    console.log(hand);
    var length=hand.length;
    switch(length){
      case(0):
        document.getElementById("score").innerHTML = " ";
        this.score=0;
      break;
      case(2):
        game._findPair();
      break;
      case (3):
        game._findThrees();
      break;
      case (4):
         for(i=1;i<hand.length;i++){
               if(hand[0]===this.repeated[i]){
                   count=count+1;
               }
            }
         if(count===3){
           game._findFours();
         } else{
           game._findTwoPairs();
         }
      break;
      case(5):
          for(i=1;i<this.pokerHand.length;i++){
                if(this.pokerHand[0]===this.pokerHand[i]){
                    count=count+1;
                }
            }
          if(count===4){
            game._findQuintilla();
            if(this.won===true){
              console.log("you win, thanks for playing!");
            }
          } else{
            game._findFull();
          }
      break;
    }
    console.log("this.score");
    document.getElementById("score1").innerHTML = this.score;
    console.log(this.score);
    this.player=this.score;
    return this.score;
  };
GameCubilete.prototype._selectDice = function(){
  $(".dice").on("click", function(){
    $(this).toggleClass("selected");
  });
};
game._selectDice();
GameCubilete.prototype.getSelection= function(){
  var pokerHand = this.pokerHand;
  var contador=0;
    $("#throw").on("click",function(){
      contador+=1;
      if(contador>1){
      $("#throw").prop( "disabled", true );
      }
        this.playerHand = [];
        for(i=0;i<pokerHand.length;i++){
          var count=i+1;
          if($(".dice:nth-child("+count+")").hasClass("selected")!==true){
            this.playerHand.push(pokerHand[i]);
            var rand = Math.floor(Math.random() * 6 + 0);
            switch (rand) {
              case 0:
                pokerHand[i]="9";
              break;
              case 1:
                pokerHand[i]="10";
              break;
              case 2:
                pokerHand[i]="J";
              break;
              case 3:
                pokerHand[i]="Q";
              break;
              case 4:
                pokerHand[i]="K";
              break;
              case 5:
                pokerHand[i]="A";
              break;
            }
            $(".dice:nth-child("+count+")").removeClass().addClass("dice");
          }
       }
       if(this.playerHand.length===0){
         var r=confirm("Do you want to keep this hand?");
         if(r===true){
            $("#throw").prop( "disabled", true );
         }
       }
       console.log("unselected");
       console.log(this.playerHand);
       console.log("new throw");
       console.log(pokerHand);
       game._checkGame();
        //change classes of new dices
        for(i=0;i<pokerHand.length;i++){
          var z = i+1;
          currentDice = ".dice:nth-child(" + z +")";
          if($(".dice:nth-child("+z+")").hasClass("selected")!==true){
            switch (pokerHand[i]) {
              case "9":
                $(currentDice).addClass("nine");
              break;
              case "10":
                $(currentDice).addClass("ten");
              break;
              case "J":
                $(currentDice).addClass("jack");
              break;
              case "Q":
                $(currentDice).addClass("queen");
              break;
              case "K":
                $(currentDice).addClass("king");
              break;
              case "A":
                $(currentDice).addClass("ace");
              break;
              }
          } else{
            $(currentDice).removeClass("selected");
          }
        }
          return this.score;
    });
};
game.getSelection();

//second player
GameCubilete.prototype._rollTheDice2 = function () {
  for(i=0;i<5;i++){
      var rand = Math.floor(Math.random() * 6 + 0);
      switch (rand) {
        case 0:
          this.pokerHand2[i]="9";
        break;
        case 1:
          this.pokerHand2[i]="10";
        break;
        case 2:
          this.pokerHand2[i]="J";
        break;
        case 3:
          this.pokerHand2[i]="Q";
        break;
        case 4:
          this.pokerHand2[i]="K";
        break;
        case 5:
          this.pokerHand2[i]="A";
        break;
      }
  }
  console.log("initial hand " +this.pokerHand2);
  game2.drawCards2();
  return this.pokerHand2;
};
GameCubilete.prototype.drawCards2 = function() {
  var currentDice;
  for(i=0;i<this.pokerHand2.length;i++){
    var z = i+1;
    currentDice = ".dice2:nth-child(" + z +")";
    switch (this.pokerHand2[i]) {
      case "9":
        $(currentDice).removeClass("start");
        $(currentDice).addClass("nine");
      break;
      case "10":
        $(currentDice).removeClass("start");
        $(currentDice).addClass("ten");
      break;
      case "J":
        $(currentDice).removeClass("start");
        $(currentDice).addClass("jack");
      break;
      case "Q":
        $(currentDice).removeClass("start");
        $(currentDice).addClass("queen");
      break;
      case "K":
        $(currentDice).removeClass("start");
        $(currentDice).addClass("king");
      break;
      case "A":
        $(currentDice).removeClass("start");
        $(currentDice).addClass("ace");
      break;
      }
    }
 };
GameCubilete.prototype._findRepeated2= function () {
     this.repeated2=[];
     for(j=0;j<this.pokerHand2.length;j++){
       for(i=0;i<this.pokerHand2.length;i++){
         if(this.pokerHand2[j]===this.pokerHand2[i] && i!=j){
           this.repeated2.push(this.pokerHand2[i]);
           break;
         }
       }
     }
     return this.repeated2;
   };
GameCubilete.prototype._findQuintilla2 = function () {
     var hand=this._findRepeated2();
     var a=0;
         if(hand[0]==="A"){
           a="aces full";
           this.score2=36;
         }else if(hand[0]==="K"){
           a="kings full";
           this.score2=35;
         }else if(hand[0]==="Q"){
           a="queens full";
           this.score2=34;
         }else if(hand[0]==="J"){
           a="jacks full";
           this.score2=33;
         }else if(hand[0]==="10"){
           a="tens full";
           this.score2=32;
         }else if(hand[0]==="9"){
           a="nines full";
           this.score2=31;
         }
         document.getElementById("score2").innerHTML = a;
         return this.score2;
     };
GameCubilete.prototype._findFours2 = function () {
          var a=0;
          var hand=this._findRepeated2();
              if(hand[0]==="A"){
                a="four aces";
                this.score2=30;
              }else if(hand[0]==="K"){
                a="four kings";
                this.score2=29;
              }else if(hand[0]==="Q"){
                a="four queens ";
                this.score2=28;
              }else if(hand[0]==="J"){
                a="four jacks";
                this.score2=27;
              }else if(hand[0]==="10"){
                a="four tens";
                this.score2=26;
              }else if(hand[0]==="9"){
                a="four nines";
                this.score2=25;
              }
         document.getElementById("score2").innerHTML = a;
         return this.score2;
     };
GameCubilete.prototype._findThrees2 = function () {
         var hand=this._findRepeated2();
         var a=0;
             if(hand[0]==="A"){
               a="three aces";
               this.score2=18;
             }else if(hand[0]==="K"){
               a="three kings";
               this.score2=17;
             }else if(hand[0]==="Q"){
               a="three queens";
               this.score2=16;
             }else if(hand[0]==="J"){
               a="three jacks";
               this.score2=15;
             }else if(hand[0]==="10"){
               a="three tens";
               this.score2=14;
             }else if(hand[0]==="9"){
               a="three nines";
               this.score2=13;
             }
         document.getElementById("score2").innerHTML = a;
         return this.score;
     };
GameCubilete.prototype._findPair2 = function (){
       var hand2=this._findRepeated2();
       var a=0;
           if(hand2[0]==="A"){
             a="pair of aces";
             this.score2=6;
           }else if(hand2[0]==="K"){
             a="pair of kings";
             this.score2=5;
           }else if(hand2[0]==="Q"){
             a="pair of queens";
             this.score2=4;
           }else if(hand2[0]==="J"){
             a="pair of jacks";
             this.score2=3;
           }else if(hand2[0]==="10"){
             a="pair of tens";
             this.score2=2;
           }else if(hand2[0]==="9"){
             a="pair of nines";
             this.score2=1;
           }
        document.getElementById("score2").innerHTML = a;
         return this.score2;
     };
GameCubilete.prototype._findFull2 = function () {
       var hand=this._findRepeated2();
       var pair1=[];
       var pair2=[];
       var par=[];
       var tercia=[];
       for(i=1;i<5;i++){
         if(hand[0]===hand[i]){
           pair1.push(hand[i]);
         }else{
           pair2.push(hand[i]);
         }
       }
       if(hand[0]===pair1[0]){
         pair1.push(hand[0]);
       }else{
         pair2.push(hand[0]);
       }
       var length1=pair1.length;
       var length2=pair2.length;
       if(length1>length2){
         tercia=pair1;
         par=pair2;
       }else{
         par=pair1;
         tercia=pair2;
       }

       var a=0;
       var b=0;
       var c=0;
       var d=0;
       if(tercia[0]==="A"){
         a="three aces";
         c=18;
       }else if(tercia[0]==="K"){
         a="three kings";
         c=17;
       }else if(tercia[0]==="Q"){
         a="three queens";
         c=16;
       }else if(tercia[0]==="J"){
         a="three jacks";
         c=15;
       }else if(tercia[0]==="10"){
         a="three tens";
         c=14;
       }else if(tercia[0]==="9"){
         a="three nines";
         c=13;
       }
       if(par[0]==="A"){
         b="pair of aces";
         d=6;
       }else if(par[0]==="K"){
         b="pair of kings";
         d=5;
       }else if(par[0]==="Q"){
         b="pair of queens";
         d=4;
       }else if(par[0]==="J"){
         b="pair of jacks";
         d=3;
       }else if(par[0]==="10"){
         b="pair of tens";
         d=2;
       }else if(par[0]==="9"){
         b="pair of nines";
         d=1;
       }
       this.score2=c+d;
       document.getElementById("score2").innerHTML = a+" and ";
       document.getElementById("score4").innerHTML = b;
       console.log(a+" and a "+b);
       return this.score2;
     };
GameCubilete.prototype._findTwoPairs2 = function () {
       var hand=this._findRepeated2();
       var pair1=[];
       var pair2=[];
       for(i=1;i<hand.length;i++){
         if(hand[0]===hand[i]){
           pair1.push(hand[i]);
           pair1.push(hand[0]);
         }else{
           pair2.push(hand[i]);
         }
       }
       var a=0;
       var b=0;
       var c=0;
       var d=0;

       if(pair1[0]==="A"){
         a="pair of aces";
         c=6;
       }else if(pair1[0]==="K"){
         a="pair of kings";
         c=5;
       }else if(pair1[0]==="Q"){
         a="pair of queens";
         c=4;
       }else if(pair1[0]==="J"){
         a="pair of jacks";
         c=3;
       }else if(pair1[0]==="10"){
         a="pair of tens";
         c=2;
       }else if(pair1[0]==="9"){
         a="pair of nines";
         c=1;
       }

       if(pair2[0]==="A"){
         b="pair of aces";
         d=6;
       }else if(pair2[0]==="K"){
         b="pair of kings";
         d=5;
       }else if(pair2[0]==="Q"){
         b="pair of queens";
         d=4;
       }else if(pair2[0]==="J"){
         b="pair of jacks";
         d=3;
       }else if(pair2[0]==="10"){
         b="pair of tens";
         d=2;
       }else if(pair2[0]==="9"){
         b="pair of nines";
         d=1;
       }
       this.score2=c+d;
       document.getElementById("score2").innerHTML = a+" and ";
       document.getElementById("score4").innerHTML = b;
       console.log(a+" and "+b);
       return this.score2;
     };
$("#second-game").on("click",function(){
    game2._rollTheDice2();
});
var game2 = new GameCubilete();
GameCubilete.prototype._checkGame2 = function () {
    var count=0;
    var hand2=this._findRepeated2();
    console.log(hand2);
    var length2=hand2.length;
    switch(length2){
      case(0):
        document.getElementById("score2").innerHTML = " ";
        this.score=0;
      break;
      case(2):
        game2._findPair2();
      break;
      case (3):
        game2._findThrees2();
      break;
      case (4):
         for(i=1;i<hand2.length;i++){
               if(hand2[0]===this.repeated2[i]){
                   count=count+1;
               }
            }
         if(count===3){
           game2._findFours2();
         } else{
           game2._findTwoPairs2();
         }
      break;
      case(5):
          for(i=1;i<this.pokerHand2.length;i++){
                if(this.pokerHand2[0]===this.pokerHand2[i]){
                    count=count+1;
                }
            }
          if(count===4){
            game2._findQuintilla2();
            if(this.won2===true){
              console.log("you win, thanks for playing!");
            }
          } else{
            game2._findFull2();
          }
      break;
    }
    console.log("this.score2");
    console.log(this.score2);
    this.player2=this.score2;
    return this.score2;

  };
GameCubilete.prototype._selectDice2 = function(){
     $(".dice2").on("click", function(){
       $(this).toggleClass("selected");
     });
   };
game2._selectDice2();
GameCubilete.prototype.compareResult = function(){
  document.getElementById("winner").style.display = "block";
  document.getElementById("test").innerHTML = "Play Again";
  var player1=parseInt($("#score1").text());
  if(player1>this.score2){
    document.getElementById("finalWinner").innerHTML = "Player 1!";
  } else if(player1<this.score2){
    document.getElementById("finalWinner").innerHTML = "Player 2!";
  } 
};
GameCubilete.prototype.getSelection2= function(){
  var won=false;
  var pokerHand2 = this.pokerHand2;
  var contador=0;
    $("#throw2").on("click",function(){
      contador+=1;
      if(contador>1){
      $("#throw2").prop( "disabled", true );
      }
        this.playerHand2 = [];
        for(i=0;i<pokerHand2.length;i++){
          var count=i+1;
          if($(".dice2:nth-child("+count+")").hasClass("selected")!==true){
            this.playerHand2.push(pokerHand2[i]);
            var rand = Math.floor(Math.random() * 6 + 0);
            switch (rand) {
              case 0:
                pokerHand2[i]="9";
              break;
              case 1:
                pokerHand2[i]="10";
              break;
              case 2:
                pokerHand2[i]="J";
              break;
              case 3:
                pokerHand2[i]="Q";
              break;
              case 4:
                pokerHand2[i]="K";
              break;
              case 5:
                pokerHand2[i]="A";
              break;
            }
            $(".dice2:nth-child("+count+")").removeClass().addClass("dice2");
          }
       }
       if(this.playerHand2.length===0){
         var r=confirm("Do you want to keep this hand?");
         if(r===true){
            $("#throw2").prop( "disabled", true );
         }
       }
       console.log("unselected 2");
       console.log(this.playerHand2);
       console.log("new throw 2");
       console.log(pokerHand2);
       game2._checkGame2();
        //change classes of new dices
        for(i=0;i<pokerHand2.length;i++){
          var z = i+1;
          currentDice = ".dice2:nth-child(" + z +")";
          if($(".dice2:nth-child("+z+")").hasClass("selected")!==true){
            switch (pokerHand2[i]) {
              case "9":
                $(currentDice).addClass("nine");
              break;
              case "10":
                $(currentDice).addClass("ten");
              break;
              case "J":
                $(currentDice).addClass("jack");
              break;
              case "Q":
                $(currentDice).addClass("queen");
              break;
              case "K":
                $(currentDice).addClass("king");
              break;
              case "A":
                $(currentDice).addClass("ace");
              break;
              }
          } else{
            $(currentDice).removeClass("selected");
          }
        }
        if($("#throw2").prop( "disabled")===true){
          game2.compareResult(this.score);
          document.getElementById("score").style.display = "block";
          document.getElementById("score2").style.display = "block";
          document.getElementById("score3").style.display = "block";
          document.getElementById("score4").style.display = "block";
        }
    });
};
game2.getSelection2();
$("#instructions").on("click",function(){
       $("p").toggle();
});
});
$("#test").on('click',function(){
  location.reload();
});
