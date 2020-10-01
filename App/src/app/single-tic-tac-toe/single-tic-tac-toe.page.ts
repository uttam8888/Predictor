import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-single-tic-tac-toe',
  templateUrl: './single-tic-tac-toe.page.html',
  styleUrls: ['./single-tic-tac-toe.page.scss'],
})
export class SingleTicTacToePage implements OnInit {

  crossImgPath: string = "../assets/images/cross4-red.png";
  circleImgPath: string = "../assets/images/circle3-black.png";

  col_one_enable: boolean = false;
  col_two_enable: boolean = false;
  col_three_enable: boolean = false;
  col_four_enable: boolean = false;
  col_five_enable: boolean = false;
  col_six_enable: boolean = false;
  col_seven_enable: boolean = false;
  col_eight_enable: boolean = false;
  col_nine_enable: boolean = false;

  col_one_cross_enable: boolean = false;
  col_two_cross_enable: boolean = false;
  col_three_cross_enable: boolean = false;
  col_four_cross_enable: boolean = false;
  col_five_cross_enable: boolean = false;
  col_six_cross_enable: boolean = false;
  col_seven_cross_enable: boolean = false;
  col_eight_cross_enable: boolean = false;
  col_nine_cross_enable: boolean = false;

  col_one_entry: boolean = true;
  col_two_entry: boolean = true;
  col_three_entry: boolean = true;
  col_four_entry: boolean = true;
  col_five_entry: boolean = true;
  col_six_entry: boolean = true;
  col_seven_entry: boolean = true;
  col_eight_entry: boolean = true;
  col_nine_entry: boolean = true;

  playerOneName: string = "";
  playerTwoName: string = "Uttam";
  playerOneSign: string = "";
  playerTwoSign: string = "";
  players = {};
  playerOneEnabled: boolean = false;
  showTicTacTable: boolean = false;
  spinnerText: string = "";
  col_Data = [];

  col123 = [];
  col456 = [];
  col789 = [];
  col147 = [];
  col258 = [];
  col369 = [];
  col159 = [];
  col357 = [];

  allCol = [];
  winner: string = "";

  col_one_entry_res: boolean = true;
  col_two_entry_res: boolean = true;
  col_three_entry_res: boolean = true;
  col_four_entry_res: boolean = true;
  col_five_entry_res: boolean = true;
  col_six_entry_res: boolean = true;
  col_seven_entry_res: boolean = true;
  col_eight_entry_res: boolean = true;
  col_nine_entry_res: boolean = true;
  winnerCall: boolean = true;
  startFlag: boolean = false;
  retryFlag: boolean = true;
  playerOneWinCount: number = 0;
  playerTwoWinCount: number = 0;
  // win_col_order = [ [7,8,9], [3,6,9], [1,5,9], [2,5,8], [1,4,7], [1,2,3], [4,5,6], [3,5,7] ];
  win_col_order = [
    {
      axis: "horizontal",
      cols: [7, 8, 9]
    },
    {
      axis: "vertical",
      cols: [3, 6, 9]
    },
    {
      axis: "diagonal",
      cols: [1, 5, 9]
    },
    {
      axis: "vertical",
      cols: [2, 5, 8]
    },
    {
      axis: "vertical",
      cols: [1, 4, 7]
    },
    {
      axis: "horizontal",
      cols: [1, 2, 3]
    },
    {
      axis: "horizontal",
      cols: [4, 5, 6]
    },
    {
      axis: "diagonal",
      cols: [3, 5, 7]
    },
  ];
  winnerIndex: number = 0;

  col_one_horizontal: boolean = false;
  col_two_horizontal: boolean = false;
  col_three_horizontal: boolean = false;
  col_four_horizontal: boolean = false;
  col_five_horizontal: boolean = false;
  col_six_horizontal: boolean = false;
  col_seven_horizontal: boolean = false;
  col_eight_horizontal: boolean = false;
  col_nine_horizontal: boolean = false;

  col_one_vertical: boolean = false;
  col_two_vertical: boolean = false;
  col_three_vertical: boolean = false;
  col_four_vertical: boolean = false;
  col_five_vertical: boolean = false;
  col_six_vertical: boolean = false;
  col_seven_vertical: boolean = false;
  col_eight_vertical: boolean = false;
  col_nine_vertical: boolean = false;

  col_one_diagonal: boolean = false;
  col_three_diagonal: boolean = false;
  col_five_diagonal: boolean = false;
  col_seven_diagonal: boolean = false;
  col_nine_diagonal: boolean = false;
  col_five_diagonal_right: boolean = false;

  timer: number = 0;
  timerClicked : number = 0;
  timerChecked: boolean = false;
  timerClick : boolean = false;
  timeExpMsg: boolean = false;
  setIntervalId;
  setTimeoutId;
  systemEnable : boolean = false;
  showDisableGrid : boolean = false;


  constructor(public toastController: ToastController) { }

  ngOnInit() {

  }



  signChangeOne(event) {
    this.playerOneSign = event.detail.value;
    if (event.detail.value == "circle") {
      this.playerTwoSign = "cross";
    } else {
      this.playerTwoSign = "circle";
    }
  }

  signChangeTwo(event) {
    this.playerTwoSign = event.detail.value;
    if (event.detail.value == "circle") {
      this.playerOneSign = "cross";
    } else {
      this.playerOneSign = "circle";
    }
  }

  signClick() {
    setTimeout(() => {
      var radios = document.getElementsByClassName('alert-radio-label');
      let singrad0 = radios[0];
      let singrad1 = radios[1];
      if (singrad0 != undefined) {
        singrad0.innerHTML = singrad0.innerHTML.concat('<img src=' + this.crossImgPath + ' style="width:25px; position:absolute; right:65px;"/>');
        (singrad0 as HTMLElement).style.fontSize = "20px";
      }

      if (singrad1 != undefined) {
        singrad1.innerHTML = singrad1.innerHTML.concat('<img src=' + this.circleImgPath + ' style="width:25px; position:absolute; right:65px;"/>');
        (singrad1 as HTMLElement).style.fontSize = "20px";
      }


      // for (let index = 0; index < radios.length; index++) {
      //     let singrad = radios[index];
      // singrad.innerHTML = singrad.innerHTML.concat('<img src='+this.test2+' style="width:30px; position:absolute; right:20px;"/>');
      // (singrad as HTMLElement).style.fontSize  = "22px";
      // }

    }, 100);
  }

  start() {
    if (this.playerOneName == "" || this.playerOneName == undefined) {
      this.presentToast("Please enter player1 name .");
      return;
    }
    if (this.playerOneSign == "" || this.playerOneSign == undefined) {
      this.presentToast("Please select player1 sign .");
      return;
    }
    if (this.playerTwoName == "" || this.playerTwoName == undefined) {
      this.presentToast("Please enter player2 name .");
      return;
    }

    if (this.playerTwoSign == "" || this.playerTwoSign == undefined) {
      this.presentToast("Please select player2 sign .");
      return;
    }

    if (this.playerOneName.length > 8) {
      this.presentToast("Please enter Player1 name with maximum 6 characters .");
      return;
    }

    if (this.playerTwoName.length > 8) {
      this.presentToast("Please enter Player2 name with maximum 6 characters .");
      return;
    }

    if (this.timerChecked) {
      if (this.timer == 0) {
        this.presentToast("Please set the time .");
        return;
      }
    }


    this.players = { "playerOne": [{ "name": this.playerOneName, "sign": this.playerOneSign }], "playerTwo": [{ "name": this.playerTwoName, "sign": this.playerTwoSign }] };
    this.playerOneEnabled = true;
    this.showTicTacTable = true;
    this.spinnerText = this.playerOneName + " Click here";
    this.startFlag = true;
    this.showDisableGrid = true;
    if (this.timerChecked) {
      this.setTimer();
      this.timeOverCall();
    }
  }

  col_one() {
    if (this.col_one_entry && this.winnerCall) {
      
      this.col_one_enable = true;
      var sign;
      var name;
      if (this.playerOneEnabled) {
        sign = this.players["playerOne"][0]["sign"];
        name = this.players["playerOne"][0]["name"];
        if (sign == "cross") {
          this.col_one_cross_enable = true;
        } else {
          this.col_one_cross_enable = false;
        }
      } else {
        sign = this.players["playerTwo"][0]["sign"];
        name = this.players["playerTwo"][0]["name"];
        if (sign == "circle") {
          this.col_one_cross_enable = false;
        } else {
          this.col_one_cross_enable = true;
        }
      }

      if (this.playerOneEnabled) {
        this.playerOneEnabled = false;
        this.spinnerText = this.playerTwoName + " Click here";
      } else {
        this.playerOneEnabled = true;
        this.spinnerText = this.playerOneName + " Click here";
      }
      this.col_one_entry = false;
      
      this.col_Data.push({
        col: 1,
        name: name,
        sign: sign
      });
      this.getResult();
      if(!this.playerOneEnabled){
        this.spinnerText = this.playerTwoName + "'s turn";
        this.systemEnable = true;
        setTimeout(() => {
          this.systemCall(1);
        }, 1000);
      }
    }
  }

  col_two() {
    if (this.col_two_entry && this.winnerCall) {
      this.col_two_enable = true;
      var sign;
      var name;
      if (this.playerOneEnabled) {
        sign = this.players["playerOne"][0]["sign"];
        name = this.players["playerOne"][0]["name"];
        if (sign == "cross") {
          this.col_two_cross_enable = true;
        } else {
          this.col_two_cross_enable = false;
        }
      } else {
        sign = this.players["playerTwo"][0]["sign"];
        name = this.players["playerTwo"][0]["name"];
        if (sign == "circle") {
          this.col_two_cross_enable = false;
        } else {
          this.col_two_cross_enable = true;
        }
      }

      if (this.playerOneEnabled) {
        this.playerOneEnabled = false;
        this.spinnerText = this.playerTwoName + " Click here";
      } else {
        this.playerOneEnabled = true;
        this.spinnerText = this.playerOneName + " Click here";
      }

      this.col_two_entry = false;
      this.col_Data.push({
        col: 2,
        name: name,
        sign: sign
      });
      this.getResult();
      if(!this.playerOneEnabled){
        this.spinnerText = this.playerTwoName + "'s turn";
        this.systemEnable = true;
        setTimeout(() => {
          this.systemCall(2);
        }, 1000);
      }
    }

  }
  col_three() {
    if (this.col_three_entry && this.winnerCall) {
      var sign;
      var name;
      this.col_three_enable = true;
      if (this.playerOneEnabled) {
        sign = this.players["playerOne"][0]["sign"];
        name = this.players["playerOne"][0]["name"];
        if (sign == "cross") {
          this.col_three_cross_enable = true;
        } else {
          this.col_three_cross_enable = false;
        }
      } else {
        sign = this.players["playerTwo"][0]["sign"];
        name = this.players["playerTwo"][0]["name"];
        if (sign == "circle") {
          this.col_three_cross_enable = false;
        } else {
          this.col_three_cross_enable = true;
        }
      }

      if (this.playerOneEnabled) {
        this.playerOneEnabled = false;
        this.spinnerText = this.playerTwoName + " Click here";
      } else {
        this.playerOneEnabled = true;
        this.spinnerText = this.playerOneName + " Click here";
      }

      this.col_three_entry = false;
      this.col_Data.push({
        col: 3,
        name: name,
        sign: sign
      });
      this.getResult();
      if(!this.playerOneEnabled){
        this.spinnerText = this.playerTwoName + "'s turn";
        this.systemEnable = true;
        setTimeout(() => {
          this.systemCall(3);
        }, 1000);
      }
    }

  }
  col_four() {
    if (this.col_four_entry && this.winnerCall) {
      var sign;
      var name;
      this.col_four_enable = true;
      if (this.playerOneEnabled) {
        sign = this.players["playerOne"][0]["sign"];
        name = this.players["playerOne"][0]["name"];
        if (sign == "cross") {
          this.col_four_cross_enable = true;
        } else {
          this.col_four_cross_enable = false;
        }
      } else {
        sign = this.players["playerTwo"][0]["sign"];
        name = this.players["playerTwo"][0]["name"];
        if (sign == "circle") {
          this.col_four_cross_enable = false;
        } else {
          this.col_four_cross_enable = true;
        }
      }

      if (this.playerOneEnabled) {
        this.playerOneEnabled = false;
        this.spinnerText = this.playerTwoName + " Click here";
      } else {
        this.playerOneEnabled = true;
        this.spinnerText = this.playerOneName + " Click here";
      }

      this.col_four_entry = false;
      this.col_Data.push({
        col: 4,
        name: name,
        sign: sign
      });
      this.getResult();
      if(!this.playerOneEnabled){
        this.spinnerText = this.playerTwoName + "'s turn";
        this.systemEnable = true;
        setTimeout(() => {
          this.systemCall(4);
        }, 1000);
      }
    }

  }

  col_five() {
    if (this.col_five_entry && this.winnerCall) {
      var sign;
      var name;
      this.col_five_enable = true;
      if (this.playerOneEnabled) {
        sign = this.players["playerOne"][0]["sign"];
        name = this.players["playerOne"][0]["name"];
        if (sign == "cross") {
          this.col_five_cross_enable = true;
        } else {
          this.col_five_cross_enable = false;
        }
      } else {
        sign = this.players["playerTwo"][0]["sign"];
        name = this.players["playerTwo"][0]["name"];
        if (sign == "circle") {
          this.col_five_cross_enable = false;
        } else {
          this.col_five_cross_enable = true;
        }
      }

      if (this.playerOneEnabled) {
        this.playerOneEnabled = false;
        this.spinnerText = this.playerTwoName + " Click here";
      } else {
        this.playerOneEnabled = true;
        this.spinnerText = this.playerOneName + " Click here";
      }

      this.col_five_entry = false;
      this.col_Data.push({
        col: 5,
        name: name,
        sign: sign
      });
      this.getResult();
      if(!this.playerOneEnabled){
        this.spinnerText = this.playerTwoName + "'s turn";
        this.systemEnable = true;
        setTimeout(() => {
          this.systemCall(5);
        }, 1000);
      }
    }

  }

  col_six() {
    if (this.col_six_entry && this.winnerCall) {
      var sign;
      var name;
      this.col_six_enable = true;
      if (this.playerOneEnabled) {
        sign = this.players["playerOne"][0]["sign"];
        name = this.players["playerOne"][0]["name"];
        if (sign == "cross") {
          this.col_six_cross_enable = true;
        } else {
          this.col_six_cross_enable = false;
        }
      } else {
        sign = this.players["playerTwo"][0]["sign"];
        name = this.players["playerTwo"][0]["name"];
        if (sign == "circle") {
          this.col_six_cross_enable = false;
        } else {
          this.col_six_cross_enable = true;
        }
      }

      if (this.playerOneEnabled) {
        this.playerOneEnabled = false;
        this.spinnerText = this.playerTwoName + " Click here";
      } else {
        this.playerOneEnabled = true;
        this.spinnerText = this.playerOneName + " Click here";
      }

      this.col_six_entry = false;
      this.col_Data.push({
        col: 6,
        name: name,
        sign: sign
      });
      this.getResult();
      if(!this.playerOneEnabled){
        this.spinnerText = this.playerTwoName + "'s turn";
        this.systemEnable = true;
        setTimeout(() => {
          this.systemCall(6);
        }, 1000);
      }
    }

  }

  col_seven() {
    if (this.col_seven_entry && this.winnerCall) {
      var sign;
      var name;
      this.col_seven_enable = true;
      if (this.playerOneEnabled) {
        sign = this.players["playerOne"][0]["sign"];
        name = this.players["playerOne"][0]["name"];
        if (sign == "cross") {
          this.col_seven_cross_enable = true;
        } else {
          this.col_seven_cross_enable = false;
        }
      } else {
        sign = this.players["playerTwo"][0]["sign"];
        name = this.players["playerTwo"][0]["name"];
        if (sign == "circle") {
          this.col_seven_cross_enable = false;
        } else {
          this.col_seven_cross_enable = true;
        }
      }

      if (this.playerOneEnabled) {
        this.playerOneEnabled = false;
        this.spinnerText = this.playerTwoName + " Click here";
      } else {
        this.playerOneEnabled = true;
        this.spinnerText = this.playerOneName + " Click here";
      }

      this.col_seven_entry = false;
      this.col_Data.push({
        col: 7,
        name: name,
        sign: sign
      });
      this.getResult();
      if(!this.playerOneEnabled){
        this.spinnerText = this.playerTwoName + "'s turn";
        this.systemEnable = true;
        setTimeout(() => {
          this.systemCall(7);
        }, 1000);
      }
    }

  }

  col_eight() {
    if (this.col_eight_entry && this.winnerCall) {
      var sign;
      var name;
      this.col_eight_enable = true;
      if (this.playerOneEnabled) {
        sign = this.players["playerOne"][0]["sign"];
        name = this.players["playerOne"][0]["name"];
        if (sign == "cross") {
          this.col_eight_cross_enable = true;
        } else {
          this.col_eight_cross_enable = false;
        }
      } else {
        sign = this.players["playerTwo"][0]["sign"];
        name = this.players["playerTwo"][0]["name"];
        if (sign == "circle") {
          this.col_eight_cross_enable = false;
        } else {
          this.col_eight_cross_enable = true;
        }
      }

      if (this.playerOneEnabled) {
        this.playerOneEnabled = false;
        this.spinnerText = this.playerTwoName + " Click here";
      } else {
        this.playerOneEnabled = true;
        this.spinnerText = this.playerOneName + " Click here";
      }
      this.col_eight_entry = false;
      this.col_Data.push({
        col: 8,
        name: name,
        sign: sign
      });
      this.getResult();
      if(!this.playerOneEnabled){
        this.spinnerText = this.playerTwoName + "'s turn";
        this.systemEnable = true;
        setTimeout(() => {
          this.systemCall(8);
        }, 1000);
      }
    }
  }

  col_nine() {
    if (this.col_nine_entry && this.winnerCall) {
      var sign;
      var name;
      this.col_nine_enable = true;
      if (this.playerOneEnabled) {
        sign = this.players["playerOne"][0]["sign"];
        name = this.players["playerOne"][0]["name"];
        if (sign == "cross") {
          this.col_nine_cross_enable = true;
        } else {
          this.col_nine_cross_enable = false;
        }
      } else {
        sign = this.players["playerTwo"][0]["sign"];
        name = this.players["playerTwo"][0]["name"];
        if (sign == "circle") {
          this.col_nine_cross_enable = false;
        } else {
          this.col_nine_cross_enable = true;
        }
      }

      if (this.playerOneEnabled) {
        this.playerOneEnabled = false;
        this.spinnerText = this.playerTwoName + " Click here";
      } else {
        this.playerOneEnabled = true;
        this.spinnerText = this.playerOneName + " Click here";
      }
      this.col_nine_entry = false;
      this.col_Data.push({
        col: 9,
        name: name,
        sign: sign
      });
      this.getResult();
      if(!this.playerOneEnabled){
        this.spinnerText = this.playerTwoName + "'s turn";
        this.systemEnable = true;
        setTimeout(() => {
          this.systemCall(9);
        }, 1000);
      }
    }
  }

  getResult() {
    this.getResultColumn();
    this.allCol.forEach((item, index) => {
      if (item.length == 3) {
        if (item.every(v => v === item[0])) {
          this.winnerIndex = index;
          if (this.players["playerOne"][0]["sign"] === item[0]) {
            this.playerOneWinCount = this.playerOneWinCount + 1;
            this.winner = this.players["playerOne"][0]["name"];
          } else {
            this.winner = this.players["playerTwo"][0]["name"];
            this.playerTwoWinCount = this.playerTwoWinCount + 1;
          }
        }
      }
    });

    if (this.winner != "" && this.winner != undefined) {
      var win_col = this.win_col_order[this.winnerIndex];
      var axis = win_col["axis"];
      var cols = win_col["cols"];

      if (axis == "horizontal") {

        cols.forEach((item, index) => {
          if (item === 1) {
            this.col_one_horizontal = true;
          } else if (item === 2) {
            this.col_two_horizontal = true;
          } else if (item === 3) {
            this.col_three_horizontal = true;
          } else if (item === 4) {
            this.col_four_horizontal = true;
          } else if (item === 5) {
            this.col_five_horizontal = true;
          } else if (item === 6) {
            this.col_six_horizontal = true;
          } else if (item === 7) {
            this.col_seven_horizontal = true;
          } else if (item === 8) {
            this.col_eight_horizontal = true;
          } else if (item === 9) {
            this.col_nine_horizontal = true;
          }
        });

      } else if (axis == "vertical") {

        cols.forEach((item, index) => {
          if (item === 1) {
            this.col_one_vertical = true;
          } else if (item === 2) {
            this.col_two_vertical = true;
          } else if (item === 3) {
            this.col_three_vertical = true;
          } else if (item === 4) {
            this.col_four_vertical = true;
          } else if (item === 5) {
            this.col_five_vertical = true;
          } else if (item === 6) {
            this.col_six_vertical = true;
          } else if (item === 7) {
            this.col_seven_vertical = true;
          } else if (item === 8) {
            this.col_eight_vertical = true;
          } else if (item === 9) {
            this.col_nine_vertical = true;
          }
        });

      } else if (axis == "diagonal") {

        cols.forEach((item, index) => {
          if (item === 1) {
            this.col_one_diagonal = true;
            this.col_five_diagonal = true;
            this.col_nine_diagonal = true;
          } else if (item === 3) {
            this.col_three_diagonal = true;
            this.col_seven_diagonal = true;
            this.col_five_diagonal_right = true;
          }
        });

      }

      this.presentToast(this.winner + " has won the game .");
      clearInterval(this.setIntervalId);
      clearTimeout(this.setTimeoutId);
      this.winnerCall = false;
      this.retryFlag = false;
      this.spinnerText = "Game Over";
      this.showDisableGrid = false;
    }

    if (this.winner == "" && this.col_Data.length == 9) {
      this.presentToast("Match got draw");
      this.retryFlag = false;
      clearInterval(this.setIntervalId);
      clearTimeout(this.setTimeoutId);
      this.showDisableGrid = false;
    }
    if (this.timerChecked) {
      this.timerClick = true;
    } else{
      this.timerClick = false;
    }
  }

  getResultColumn(){

    this.col_Data.forEach((item, index) => {

      if (item.col == 1 && this.col_one_entry_res) {
        this.col123.push(item.sign);
        this.col147.push(item.sign);
        this.col159.push(item.sign);
        this.col_one_entry_res = false;
      }

      if (item.col == 2 && this.col_two_entry_res) {
        this.col123.push(item.sign);
        this.col258.push(item.sign);
        this.col_two_entry_res = false;
      }

      if (item.col == 3 && this.col_three_entry_res) {
        this.col123.push(item.sign);
        this.col357.push(item.sign);
        this.col369.push(item.sign);
        this.col_three_entry_res = false;
      }

      if (item.col == 4 && this.col_four_entry_res) {
        this.col456.push(item.sign);
        this.col147.push(item.sign);
        this.col_four_entry_res = false;
      }

      if (item.col == 5 && this.col_five_entry_res) {
        this.col159.push(item.sign);
        this.col258.push(item.sign);
        this.col357.push(item.sign);
        this.col456.push(item.sign);
        this.col_five_entry_res = false;
      }

      if (item.col == 6 && this.col_six_entry_res) {
        this.col369.push(item.sign);
        this.col456.push(item.sign);
        this.col_six_entry_res = false;
      }

      if (item.col == 7 && this.col_seven_entry_res) {
        this.col789.push(item.sign);
        this.col147.push(item.sign);
        this.col357.push(item.sign);
        this.col_seven_entry_res = false;
      }

      if (item.col == 8 && this.col_eight_entry_res) {
        this.col789.push(item.sign);
        this.col258.push(item.sign);
        this.col_eight_entry_res = false;
      }

      if (item.col == 9 && this.col_nine_entry_res) {
        this.col159.push(item.sign);
        this.col369.push(item.sign);
        this.col789.push(item.sign);
        this.col_nine_entry_res = false;
      }

    });

    this.allCol = [];
    this.allCol = [this.col789, this.col369, this.col159, this.col258, this.col147, this.col123, this.col456, this.col357];
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "danger",
      position: "bottom"
    });
    toast.present();
  }

  getTime(event) {
    this.timer = event.detail.value;
    this.timerClicked = event.detail.value;
    this.timer = (this.timer * 1000) + 1200;
  }

  setTimer() {
    // let countDownDate = new Date("Sep 9, 2020 12:58:00").getTime();
    let countDownDate = new Date().getTime() + this.timer;
    // Update the count down every 1 second
    this.setIntervalId = setInterval(function () {


      // Get todays date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      // let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      // let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // console.log(now, "now", "countDownDate", countDownDate, "distance", distance, "days", days);

      // Output the result in an element with id="demo"

      // document.getElementById("demo").innerHTML = seconds + "s ";
      // document.getElementById("demo1").setAttribute("value",seconds+"") ;
      if (seconds > 0) {
        document.getElementById("demo2").innerHTML = seconds + "";
        document.getElementById("demo3").innerHTML = seconds + "";
      }
      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(this.setIntervalId);
        // document.getElementById("demo2").innerHTML = "0";
      }
    }, 1000);
  }

  timeOverCall() {
    this.setTimeoutId = setTimeout(() => {
      this.timeOver()
    }, this.timer);
    // this.delay(this.timer).then(any => {
    //   this.timeOver();
    // });
  }

  timeOver() {
    this.presentToast("Time Out - Players");
    this.winnerCall = false;
    this.retryFlag = false;
    this.showDisableGrid = false;
    this.spinnerText = "Game Over";
    if (this.winner.length == 0) {
      this.timeExpMsg = true;
    }
    if (this.timerChecked) {
      this.timerClick = true;
    } else{
      this.timerClick = false;
    }
    
  }

  // async delay(ms: number) {
  //   await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  // }

  getAutoDate(event) {
    var isChecked = event.currentTarget.checked;
    this.timerChecked = !isChecked;
    if(!this.timerChecked){
       this.timerClicked = 0 ;
    }
  }

  retry() {
    if (this.timerChecked) {
      if (this.timer == 0) {
        this.presentToast("Please set the time .");
        return;
      }
      
      clearInterval(this.setIntervalId);
      clearTimeout(this.setTimeoutId);
      this.setTimer();
      this.timeOverCall();
    }
    this.showDisableGrid = true;
    this.timeExpMsg = false;
    this.winner = "";
    this.col_one_enable = false;
    this.col_two_enable = false;
    this.col_three_enable = false;
    this.col_four_enable = false;
    this.col_five_enable = false;
    this.col_six_enable = false;
    this.col_seven_enable = false;
    this.col_eight_enable = false;
    this.col_nine_enable = false;

    this.col_one_cross_enable = false;
    this.col_two_cross_enable = false;
    this.col_three_cross_enable = false;
    this.col_four_cross_enable = false;
    this.col_five_cross_enable = false;
    this.col_six_cross_enable = false;
    this.col_seven_cross_enable = false;
    this.col_eight_cross_enable = false;
    this.col_nine_cross_enable = false;

    this.col_one_entry = true;
    this.col_two_entry = true;
    this.col_three_entry = true;
    this.col_four_entry = true;
    this.col_five_entry = true;
    this.col_six_entry = true;
    this.col_seven_entry = true;
    this.col_eight_entry = true;
    this.col_nine_entry = true;


    this.playerOneEnabled = true;
    this.showTicTacTable = true;
    this.spinnerText = this.playerOneName + " Click here";
    this.col_Data = [];
    this.winnerCall = true;
    this.retryFlag = true;
    this.startFlag = true;

    this.col123 = [];
    this.col456 = [];
    this.col789 = [];
    this.col147 = [];
    this.col258 = [];
    this.col369 = [];
    this.col159 = [];
    this.col357 = [];

    this.allCol = [];

    this.col_one_entry_res = true;
    this.col_two_entry_res = true;
    this.col_three_entry_res = true;
    this.col_four_entry_res = true;
    this.col_five_entry_res = true;
    this.col_six_entry_res = true;
    this.col_seven_entry_res = true;
    this.col_eight_entry_res = true;
    this.col_nine_entry_res = true;

    this.col_one_horizontal = false;
    this.col_two_horizontal = false;
    this.col_three_horizontal = false;
    this.col_four_horizontal = false;
    this.col_five_horizontal = false;
    this.col_six_horizontal = false;
    this.col_seven_horizontal = false;
    this.col_eight_horizontal = false;
    this.col_nine_horizontal = false;

    this.col_one_vertical = false;
    this.col_two_vertical = false;
    this.col_three_vertical = false;
    this.col_four_vertical = false;
    this.col_five_vertical = false;
    this.col_six_vertical = false;
    this.col_seven_vertical = false;
    this.col_eight_vertical = false;
    this.col_nine_vertical = false;

    this.col_one_diagonal = false;
    this.col_three_diagonal = false;
    this.col_five_diagonal = false;
    this.col_seven_diagonal = false;
    this.col_nine_diagonal = false;
    this.col_five_diagonal_right = false;

  }

  systemCall(colNum){
    var col_num = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    this.col_Data.filter(data => {
      if(col_num.includes(data["col"])){
        col_num.splice(col_num.indexOf(data["col"]),1);
      }
    });
    
    if(col_num.length == 8){
      if(colNum == 1 || colNum == 3 || colNum == 7 || colNum == 9){
        this.col_five();
      }else{
        var col = col_num[Math.floor(Math.random()*col_num.length)];
        this.systemSetValue(col);        
      }
      
    }else{
      this.getResultColumn();
      var cols = [];
      this.allCol.forEach((item, index) => {
        if (item.length == 2) {
          if (item.every(v => v === item[0])) {
            var double_col = this.win_col_order[index];
            cols.push({
              "num" : this.players["playerOne"][0]["sign"] === item[0] ? 2 : 1 ,
              "sign" : item[0],
              "cols" : double_col["cols"]
            });
          }
        }
      });

      if(cols.length > 0){
        if(cols.length > 1){
          cols.sort((a,b) => {return a.num - b.num});
          cols.splice(1,1);
        }
        
        cols[0]["cols"].filter(col => {
          if(col == 1){
            if(this.col_one_entry){
              this.col_one();
            }
          }else if(col == 2){
            if(this.col_two_entry){
              this.col_two();
            }
          }else if(col == 3){
            if(this.col_three_entry){
              this.col_three();
            }
          }else if(col == 4){
            if(this.col_four_entry){
              this.col_four();
            }
          }else if(col == 5){
            if(this.col_five_entry){
              this.col_five();
            }
          }else if(col == 6){
            if(this.col_six_entry){
              this.col_six();
            }
          }else if(col == 7){
            if(this.col_seven_entry){
              this.col_seven();
            }
          }else if(col == 8){
            if(this.col_eight_entry){
              this.col_eight();
            }
          }else if(col == 9){
            if(this.col_nine_entry){
              this.col_nine();
            }
          }
        });
      } else{
        var col = col_num[Math.floor(Math.random()*col_num.length)];
        this.systemSetValue(col);
      }
      
    }
    this.systemEnable = false;
  }

  systemSetValue(col){
    if(col == 1){
      this.col_one();
    } else if(col == 2){
      this.col_two();
    } else if(col == 3){
      this.col_three();
    } else if(col == 4){
      this.col_four();
    } else if(col == 5){
      this.col_five();
    } else if(col == 6){
      this.col_six();
    } else if(col == 7){
      this.col_seven();
    } else if(col == 8){
      this.col_eight();
    } else if(col == 9){
      this.col_nine();
    }
  }

}
