/**
 * Name: Jun Hong
 * ID : 100327129
 * Date: 04-05-2022
 */

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const width = canvas.width
const height = canvas.height
const centerX = width / 2
const centerY = height / 2
let menuY_list = [4]
let menuX = 200
let menuY = 50
let timer;

//sounds
let bgSound = new Audio("serenity-ilya-kuznetsov.mp3")
let menuSound = new Audio("clickSound1.mp3")

//dafault setting
let hand = true;
let circleColor = "red"

//exit button values
let exitX,exitY,exitH,exitW

let bgColor = "rgba(50,150,240,0.2)"

function Easy(){
    this.name = "Easy"
    this.target = 10
    this.time = 3000
    this.load = function(){
        play(this)
    }
}
function Medium(){
    this.name = "Medium"
    this.target = 15
    this.time = 2000
    this.load = function(){
        play(this)
    }
}
function Hard(){
    this.name = "Hard"
    this.target = 20
    this.time = 1000
    this.load = function(){
        play(this)
    }
}
function circle(){
    this.x = Math.round(Math.random()*(width-100)) + 50;
    this.y = Math.round(Math.random()*(centerY-50)) + 30;
    this.radius = 30
    this.color = circleColor;

    this.draw = function (){
        ctx.beginPath()
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.fill()
    }
}
function Practice(){
    this.name = "Practice"
    this.target = 20
    this.time = 500
    this.load = function(){
        play(this)
    }
}

/**
 * clear the canvas
 */
 function clear(){
    ctx.clearRect(0,0,width,height)
    ctx.beginPath()
}

/**
 * Start Page
 */
function startPage(){
    clear()
    ctx.strokeStyle = "rgba(50,150,240,1)"
    ctx.strokeRect(centerX-menuX, menuY, menuX * 2, menuY)

    ctx.fillStyle = "rgba(250,50,240,1)"
    ctx.font = "30px Comic Sans MS"
    ctx.textAlign = "center"
    ctx.fillText("Aim Tester", centerX, menuY + 35)

    ctx.fillStyle = bgColor
    ctx.fillRect(0,0,width,height)

    let robot = new Image()
    robot.src = "robot1.png"
    let crosshair = new Image()
    crosshair.src = "crosshair.png"

    robot.onload = function() {
        ctx.drawImage(robot,0,0,400,400,centerX-100,centerY-250,200,200)
    }
    crosshair.onload = function(){
        ctx.drawImage(crosshair,0,0,980,980,centerX-120,centerY-270,240,240)
    }

    ctx.fillStyle = "rgba(250,50,240,1)"
    ctx.font = "30px Comic Sans MS"
    ctx.textAlign = "center"
    ctx.fillText("Welcome to Aim Tester", centerX, centerY + 80)
    ctx.fillText("Press Start to Test your Aim!", centerX, centerY + 180)

    ctx.fillStyle = "rgba(250,0,0,0.3)"
    ctx.fillRect(centerX - 100, centerY + 200, 200, 50)
    ctx.fillStyle = "rgba(250,50,240,1)"
    
    ctx.fillText("Start", centerX, centerY + 235)

    canvas.onclick = function(event){
        let x = event.offsetX
        let y = event.offsetY

        if (x >= centerX - 100 && x <= centerX + 100 && y >= centerY+200 && y <= centerY + 250){
            menuSound.play()
            mainPage()
        }
    }

}

/**
 * Main Page
 */
function mainPage(){

    clear()
    ctx.fillStyle = "rgba(50,150,240,0.2)"
    ctx.fillRect(0,0,width,height)
    

    let robot = new Image()
    robot.src = "robot1.png"
    let crosshair = new Image()
    crosshair.src = "crosshair.png"

    robot.onload = function() {
        ctx.drawImage(robot,0,0,400,400,centerX-100,centerY-250,200,200)
        
    }
    crosshair.onload = function(){
        ctx.drawImage(crosshair,0,0,980,980,centerX-120,centerY-270,240,240)
    }
    
    ctx.strokeStyle = "rgba(50,150,240,1)"
    ctx.strokeRect(centerX-menuX, menuY, menuX * 2, menuY)

    ctx.fillStyle = "rgba(250,50,240,1)"
    ctx.font = "30px Comic Sans MS"
    ctx.textAlign = "center"
    ctx.fillText("Aim Tester", centerX, menuY + 35)
    
    let menuList = ["SELECT LEVEL", "PRACTICE MODE", "HOW TO PLAY", "OPTION"]

    for (let i = 0; i < menuList.length; i++){
        ctx.beginPath()
        ctx.fillStyle = "rgba(250,0,0,0.3)"
        ctx.fillRect(centerX-menuX, 30 + centerY + menuY * 2 * i, menuX * 2, menuY)
        menuY_list[i] = 30 + centerY + menuY * 2 * i 
        
        ctx.fillStyle = "rgba(0,0,250,1)"
        ctx.font = "30px Comic Sans MS"
        ctx.textAlign = "center"
        ctx.fillText(menuList[i], centerX, 30 + centerY + menuY * 2 * i + 35)
    }

    canvas.onclick = function(event){
        
        x = event.offsetX
        y = event.offsetY

        if (x >= 200 && x <=600){
            menuSound.play()
            if (y >= menuY_list[0] && y <= menuY_list[0]+menuY){
                levels()
            }
            else if (y >= menuY_list[1] && y <= menuY_list[1]+menuY){
                doPractice()
            }
            else if (y >= menuY_list[2] && y <= menuY_list[2]+menuY){
                instruction()
            }
            else if (y >= menuY_list[3] && y <= menuY_list[3]+menuY){
                option()
            }
        }
    }
}

/**
 * Level Page that make user to choose the levels (Easy, Medium, Hard)
 */
function levels(){
    clear()
    ctx.fillStyle = "rgba(50,150,240,0.2)"
    ctx.fillRect(0,0,width,height)
    exit()

    let robot = new Image()
    robot.src = "robot1.png"
    let crosshair = new Image()
    crosshair.src = "crosshair.png"

    robot.onload = function() {
        ctx.drawImage(robot,0,0,400,400,centerX-100,centerY-250,200,200)
    }
    crosshair.onload = function(){
        ctx.drawImage(crosshair,0,0,980,980,centerX-120,centerY-270,240,240)
    }
    
    ctx.strokeStyle = "rgba(50,150,240,1)"
    ctx.strokeRect(centerX-menuX, menuY, menuX * 2, menuY)

    ctx.fillStyle = "rgba(250,50,240,1)"
    ctx.font = "30px Comic Sans MS"
    ctx.textAlign = "center"
    ctx.fillText("Aim Tester", centerX, menuY + 35)
    
    let menuList = ["EASY", "MEDIUM", "HARD"]


    for (let i = 0; i < 3; i++){
        ctx.beginPath()
        ctx.fillStyle = "rgba(250,0,0,0.3)"
        ctx.fillRect(centerX-menuX, 30 + centerY + menuY * 2 * i, menuX * 2, menuY)
        menuY_list[i] = 30 + centerY + menuY * 2 * i 
        
        ctx.fillStyle = "rgba(0,0,250,1)"
        ctx.font = "30px Comic Sans MS"
        ctx.textAlign = "center"
        ctx.fillText(menuList[i], centerX, 30 + centerY + menuY * 2 * i + 35)
    }

    canvas.onclick = function(event){
        x = event.offsetX
        y = event.offsetY
        if (x >= 200 && x <=600){
            menuSound.play()
            if (y >= menuY_list[0] && y <= menuY_list[0]+menuY){
                let easy = new Easy();
                easy.load()
            }
            else if (y >= menuY_list[1] && y <= menuY_list[1]+menuY){
                let medium = new Medium();
                medium.load()
            }
            else if (y >= menuY_list[2] && y <= menuY_list[2]+menuY){
                let hard = new Hard();
                hard.load()
            }
        }
        else if(x > exitX && x < exitX + exitW && y > exitY && y < exitY+exitH){
            menuSound.play()
            mainPage()
        }
    }
}

/**
 * After click the Practice from the main Page. This gives user a bit 
 * time for preparation, not to start immediately. 
 */
function doPractice(){
    clear()
    exit()
    ctx.fillStyle = bgColor
    ctx.fillRect(0,0,width,height)

    let robot = new Image()
    robot.src = "robot1.png"
    let crosshair = new Image()
    crosshair.src = "crosshair.png"

    robot.onload = function() {
        ctx.drawImage(robot,0,0,400,400,centerX-100,centerY-250,200,200)
    }
    crosshair.onload = function(){
        ctx.drawImage(crosshair,0,0,980,980,centerX-120,centerY-270,240,240)
    }
    
    ctx.strokeStyle = "rgba(50,150,240,1)"
    ctx.strokeRect(centerX-menuX, menuY, menuX * 2, menuY)

    ctx.fillStyle = "rgba(250,50,240,1)"
    ctx.font = "30px Comic Sans MS"
    ctx.textAlign = "center"
    ctx.fillText("Aim Tester", centerX, menuY + 35)

    ctx.beginPath()
    ctx.fillStyle = "rgba(250,0,0,0.3)"
    ctx.fillRect(centerX-menuX, 30 + centerY + menuY * 2, menuX * 2, menuY)

    ctx.fillStyle = "rgba(0,0,250,1)"
    ctx.font = "30px Comic Sans MS"
    ctx.textAlign = "center"
    ctx.fillText("START", centerX, 30 + centerY + menuY * 2 + 35)

    canvas.onclick = function(event){
        x = event.offsetX
        y = event.offsetY

        if (x >= 200 && x <=600){
            menuSound.play()
            if (y >= menuY_list[1] && y <= menuY_list[1]+menuY){
                let practice = new Practice();
                practice.load()
            }
        }
        else if(x > exitX && x < exitX + exitW && y > exitY && y < exitY+exitH){
            menuSound.play()
            mainPage()
        }
    }
}

/**
 * Main play page that user can play 
 * @param difficulty levels (Easy, Medium, Hard) or Pratice
 */
function play(difficulty){
    clear()
    drawHand()
    exit()
    let counter = 0;
    let score = 0;
    timer = setInterval(function(){
        ctx.fillStyle = bgColor
        ctx.fillRect(0,0,width,height)
        let flag;   //to prevent scoring more than once
        if (counter <= difficulty.target-1){
            flag = true;
            clear()
            drawHand()
            exit()
            let temp = new circle()
            temp.draw()
            counter++
            canvas.onclick = function(event){
                let x = event.offsetX
                let y = event.offsetY
    
                if (x > (temp.x - temp.radius) && x < (temp.x + temp.radius) && y > (temp.y - temp.radius) && y < (temp.y + temp.radius)){
                    clear()
                    drawHand()
                    exit()
                    if (flag){
                        score++;
                    }
                    flag = false;
                }
                else if(x > exitX && x < exitX + exitW && y > exitY && y < exitY+exitH){
                    menuSound.play()
                    clearInterval(timer)
                    clear()
                    mainPage()
                }
            }
        }
        else{
            clearInterval(timer)
            timer = undefined;
            clear()
            nextPlay(score, difficulty)
        }
    }, difficulty.time)
}

/**
 * draws the hand
 */
function drawHand(){
    ctx.fillStyle = bgColor
    ctx.fillRect(0,0,width,height)
    let gun = new Image()
    if (hand){
        gun.src = "gun_right.png"
        gun.onload = function() {
            ctx.drawImage(gun,0,0,545,624,width-200,height-200,200,200)
        }
    }
    else{
        gun.src = "gun_left.png"
        gun.onload = function() {
            ctx.drawImage(gun,0,0,545,624,0,height-200,200,200)
        }
    }
    ctx.beginPath()
    ctx.strokeStyle=circleColor
    ctx.moveTo(0,centerY+100)
    ctx.lineTo(width,centerY+100)
    ctx.stroke()
}

/**
 * How to Play page
 */
function instruction(){
    clear()
    ctx.fillStyle = "rgba(50,150,240,0.2)"
    ctx.fillRect(0,0,width,height)
    ctx.strokeStyle="red"
    ctx.strokeRect(100,50,width-200, height-100)

    let intruc = new Array()
    intruc.push("Select the level you want to play")
    intruc.push(" ")
    intruc.push("     EASY LEVEL - 10 targets appear with 3 seconds interval")
    intruc.push(" ")
    intruc.push("     Medium LEVEL - 15 targets appear with 2 seconds interval")
    intruc.push(" ")
    intruc.push("     Hard LEVEL - 20 targets appear with 1 seconds interval")
    intruc.push(" ")
    intruc.push(" ")
    intruc.push(" ")
    intruc.push("Practice Mode - 20 targets appear with 0.5 seconds interval ")
    intruc.push(" ")
    intruc.push("Click the target before they disappear!!")
    intruc.push(" ")
    intruc.push("And get your final report at the end")
    intruc.push(" ")
    intruc.push(" ")
    intruc.push(" ")
    intruc.push(" ")
    intruc.push(" ")
    intruc.push(" ")
    intruc.push("Click anywhere to go back to the main")
    

    ctx.fillStyle = "rgba(0,0,250,1)"
    ctx.font = "20px Comic Sans MS"
    ctx.textAlign = "left"

    for (let i = 0; i < intruc.length; i++){
        
        if (i > intruc.length-3){
            ctx.fillStyle = "rgba(250,0,0,1)"
            ctx.textAlign = "center"
            ctx.fillText(intruc[i], centerX, 100 + 30 * (i+2))
        }
        else
            ctx.fillText(intruc[i], 105, 100 + 30 * i)
    }

    canvas.onclick = function(event){
        x = event.offsetX
        y = event.offsetY
        mainPage()
    }
    
}

/**
 * Option Page, makes user to change their preference of handed and 
 * color of target
 */
function option(){
    clear()
    ctx.fillStyle = bgColor
    ctx.fillRect(0,0,width,height)

    let robot = new Image()
    robot.src = "robot1.png"
    let crosshair = new Image()
    crosshair.src = "crosshair.png"

    robot.onload = function() {
        ctx.drawImage(robot,0,0,400,400,centerX-100,centerY-250,200,200)
        
    }
    crosshair.onload = function(){
        ctx.drawImage(crosshair,0,0,980,980,centerX-120,centerY-270,240,240)
    }
    
    ctx.strokeStyle = "rgba(50,150,240,1)"
    ctx.strokeRect(centerX-menuX, menuY, menuX * 2, menuY)

    ctx.fillStyle = "rgba(250,50,240,1)"
    ctx.font = "30px Comic Sans MS"
    ctx.textAlign = "center"
    ctx.fillText("Aim Tester", centerX, menuY + 35)
    
    let handOption = ["left", "right"]
    let colorOption = ["red", "blue"]

    for (let i = 0; i < 4; i++){

        switch(i){
            case 0:
                ctx.beginPath()
                ctx.fillStyle = "rgba(250,0,0,0.3)"
                ctx.fillRect(centerX-menuX, 30 + centerY + menuY * 2 * i, menuX*2, menuY)

                ctx.fillStyle = "rgba(0,0,250,1)"
                ctx.font = "30px Comic Sans MS"
                ctx.textAlign = "center"
                ctx.fillText("Prefer Handed", centerX, 30 + centerY + 35)
                break;
            case 1:
                ctx.beginPath()
                ctx.fillStyle = "rgba(250,0,0,0.3)"
                ctx.fillRect(centerX-menuX-1, 30 + centerY + menuY * 2 * i - 30, menuX, menuY)
                ctx.fillRect(centerX+1, 30 + centerY + menuY * 2 * i - 30, menuX, menuY)

                ctx.fillStyle = "rgba(0,0,250,1)"
                ctx.font = "30px Comic Sans MS"
                ctx.textAlign = "center"
                ctx.fillText(handOption[0], centerX - menuX/2, 30 + centerY + menuY * 2 * i + 5)
                ctx.fillText(handOption[1], centerX + menuX/2, 30 + centerY + menuY * 2 * i + 5)
                break;
            case 2:
                ctx.beginPath()
                ctx.fillStyle = "rgba(250,0,0,0.3)"
                ctx.fillRect(centerX-menuX, 30 + centerY + menuY * 2 * i, menuX*2, menuY)

                ctx.fillStyle = "rgba(0,0,250,1)"
                ctx.font = "30px Comic Sans MS"
                ctx.textAlign = "center"
                ctx.fillText("Prefer Color of target", centerX, 30 + centerY + menuY * 2 * i + 35)
                break;
            case 3:
                ctx.beginPath()
                ctx.fillStyle = "rgba(250,0,0,0.3)"
                ctx.fillRect(centerX-menuX-1, 30 + centerY + menuY * 2 * i - 30, menuX, menuY)
                ctx.fillRect(centerX+1, 30 + centerY + menuY * 2 * i - 30, menuX, menuY)

                ctx.fillStyle = "rgba(0,0,250,1)"
                ctx.font = "30px Comic Sans MS"
                ctx.textAlign = "center"
                ctx.fillText(colorOption[0], centerX - menuX/2, 30 + centerY + menuY * 2 * i + 5)
                ctx.fillText(colorOption[1], centerX + menuX/2, 30 + centerY + menuY * 2 * i + 5)
                break;
                
        }

        
    }

    canvas.onclick = function(event){
        x = event.offsetX
        y = event.offsetY

        if (x > 200 && x < 399 && y > 500 && y < 550){
            menuSound.play()
            hand = false;
            mainPage()
        }
        else if(x > 401 && x < 600 && y > 500 && y < 550){
            menuSound.play()
            hand = true;
            mainPage()
        }
        else if (x > 200 && x < 399 && y > 700 && y < 750){
            menuSound.play()
            circleColor = "red"
            mainPage()
        }
        else if(x > 401 && x < 600 && y > 700 && y < 750){
            menuSound.play()
            circleColor = "blue"
            mainPage()
        }
        
    }
}

/**
 * exit button which goes back to the Main Page
 */
function exit(){

    ctx.fillStyle="rgba(255,0,0,0.5)"

    if (hand){
        exitX = 50
        exitY = 700
        exitW = 100
        exitH = 50
    }
    else{
        exitX = width-50-100
        exitY = height-100-50
        exitW = 100
        exitH = 50
    }
    ctx.fillRect(exitX,exitY,exitW,exitH)
    ctx.fillStyle = "rgba(0,50,240,1)"
    ctx.font = "15px Comic Sans MS"
    ctx.textAlign = "center"
    ctx.fillText("EXIT", exitX+exitW/2, exitY+exitH/2+5)
}

/**
 * page after play is done
 */
function nextPlay(score, mode){
    clear()
    ctx.fillStyle = bgColor
    ctx.fillRect(0,0,width,height)

    let robot = new Image()
    robot.src = "robot1.png"
    let crosshair = new Image()
    crosshair.src = "crosshair.png"

    robot.onload = function() {
        ctx.drawImage(robot,0,0,400,400,centerX-100,centerY-250,200,200)
        
    }
    crosshair.onload = function(){
        ctx.drawImage(crosshair,0,0,980,980,centerX-120,centerY-270,240,240)
    }

    ctx.strokeStyle = "rgba(50,150,240,1)"
    ctx.strokeRect(centerX-menuX, menuY, menuX * 2, menuY)

    ctx.fillStyle = "rgba(250,50,240,1)"
    ctx.font = "30px Comic Sans MS"
    ctx.textAlign = "center"
    ctx.fillText("Aim Tester", centerX, menuY + 35)

    let menuList = ["Result", "Select Levels", "Play Again", "Main Page"]

    for (let i = 0; i < menuList.length; i++){
        ctx.beginPath()
        ctx.fillStyle = "rgba(250,0,0,0.3)"
        ctx.fillRect(centerX-menuX, 30 + centerY + menuY * 2 * i, menuX * 2, menuY)
        menuY_list[i] = 30 + centerY + menuY * 2 * i 
        
        ctx.fillStyle = "rgba(0,0,250,1)"
        ctx.font = "30px Comic Sans MS"
        ctx.textAlign = "center"
        ctx.fillText(menuList[i], centerX, 30 + centerY + menuY * 2 * i + 35)
    }

    canvas.onclick = function(event){
        x = event.offsetX
        y = event.offsetY

        if (x >= 200 && x <=600){
            if (y >= menuY_list[0] && y <= menuY_list[0]+menuY){
                menuSound.play()
                showResult(score, mode)
            }
            else if (y >= menuY_list[1] && y <= menuY_list[1]+menuY){
                menuSound.play()
                levels()
            }
            else if (y >= menuY_list[2] && y <= menuY_list[2]+menuY){
                menuSound.play()
                switch(mode.name){
                    case "Practice":
                        doPractice()
                        break;
                    default:
                        levels()
                }
            }
            else if (y >= menuY_list[3] && y <= menuY_list[3]+menuY){
                menuSound.play()
                mainPage()
            }
        }
    }
}

/**
 * Result page
 * @param score the number of targets that user hit 
 * @param mode the levels or practice
 */
function showResult(score, mode){

    clear()
    let accuracy = (score / mode.target * 100)
    
    ctx.fillStyle = bgColor
    ctx.fillRect(0,0,width,height)
    ctx.font = "20px Comic Sans MS"
    ctx.fillStyle = "rgba(100,150,240,0.2)"
    ctx.fillRect(100,50,width-200, height-100)

    resultText = new Array()

    resultText.push("RESULTS")
    ctx.fillStyle = "rgba(250,0,0,1)"
    ctx.textAlign = "center"
    ctx.fillText(resultText[0], centerX, 100)

    resultText.push("Played mode:      " + mode.name)
    resultText.push(" ")
    resultText.push(" ")
    resultText.push("You hit:    " + score)
    resultText.push(" ")
    resultText.push(" ")
    resultText.push("Number of targets:    " + mode.target)
    resultText.push(" ")
    resultText.push(" ")
    resultText.push("Your accuracy:    " + accuracy.toFixed(1) + "%")
    resultText.push(" ")
    resultText.push(" ")

    if (mode.name == "Practice"){

        if (accuracy >= 95){
            resultText.push("PERFECT!")
            resultText.push("You are PRO.")
        }
        else if(accuracy >= 80){
            resultText.push("GREAT!")
            resultText.push("You almost hit everything")
        }
        else if(accuracy >= 60){
            resultText.push("Not bad!")
            resultText.push("At least you hit more than half")
        }
        else if(accuracy >= 40){
            resultText.push("Close to half!")
            resultText.push("How about go back try the Hard mode?")
        }
        else if(accuracy >= 20){
            resultText.push("Fair Enough!")
            resultText.push("You'd better to try the Medium Mode!")
        }
        else {
            resultText.push("Hmm...")
            resultText.push("EASY mode is strongly recommended")
        }
    }

    for (let i = 1; i < resultText.length; i++){
        
        ctx.fillStyle = "rgba(130,30,130)"
        ctx.textAlign = "center"
        ctx.fillText(resultText[i], centerX, 100 + 30 * (i+2))

    }

    resultText.push("Click anywhere to go back to the main")
    ctx.fillStyle = "rgba(250,0,0,1)"
    ctx.textAlign = "center"
    ctx.fillText(resultText[resultText.length-1], centerX, height-75)

    canvas.onclick = function(event){
        menuSound.play()
        mainPage()
    }
}

/**
 * event for background sound button to play
 */
function soundPlay(){
    bgSound.play()
}

/**
 * event for background sound button to pause
 */
function soundPause(){
    bgSound.pause()
}

