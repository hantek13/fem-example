//calculator: 3 things going on at once 

let runningTotal = 0;//add a bunch of numbers together 
let buffer = "0";//waiting for user input...keep trucking of what the user typing in 
let previousOperator = null;//null = nothing is assigned here //keep trucking the last thing the user pressed 
const screen = document.querySelector('.screen');


document
  .querySelector('.calc-buttons')
  .addEventListener('click', function(event){
  buttonClick(event.target.innerText);

   
})//bind up eventListner 

function buttonClick(value){
    console.log(value);
if(isNaN(parseInt(value))){
handelSymbol(value);
}
else{
 handelNumber(value);
 console.log(value);   
}
rerender();

}//two diferent things: if it is a number/symbole go down a diffrent code path 

function handelNumber(value){
    console.log(value);
    if(buffer === "0"){
      buffer = value; 
      console.log("buffer: " + buffer)
    }
    else{
        buffer += value;
        console.log("buffer+=: " + buffer)

    }
}

function handelSymbol(value){
 switch(value)  //switch different code block based on value  //instead of if else oif else statment, better to use in this case switch  
  { 
    case 'C':
        buffer = "0";
        runningTotal = 0;
        previousOperator = null;
        break;
    case "=": 
        if(previousOperator === null){
            return;//skip the rest of this function, do nothing
        }
        flushOperation(parseInt(buffer)); // i had previous oprator, i want you to comit that/do that
        previousOperator = null;
        buffer = "" + runningTotal;
        runningTotal = 0;
        break;
    case "←":
        if(buffer.length === 1){
          buffer = "0";
        }
        else{
            buffer = buffer.substring(0, buffer.length - 1);
        }
        break;
        default:
            handleMath(value);
            console.log(value);
        break;
  }
}

function handleMath(value){
    const intBuffer = parseInt(buffer);
    console.log(intBuffer);
    if(runningTotal === 0){
        runningTotal = intBuffer;
        console.log("run.. " + runningTotal);
    }else{
        flushOperation(intBuffer); // do some sort of mathematic to get the new value     
    }
    previousOperator = value;
    console.log("pre.." + previousOperator);
    
    buffer = "0"; // ready for the next number to come in 
}

function flushOperation (intBuffer) //the comiting of maths
{
    if(previousOperator === "+"){
        console.log(intBuffer);
        console.log(runningTotal);
        runningTotal += intBuffer;
        console.log(runningTotal);
    } else if(previousOperator === "-"){
        runningTotal -= intBuffer;
    }else if(previousOperator === "×"){
        runningTotal *= intBuffer;
        console.log(runningTotal);
    }else{
        runningTotal /= intBuffer;
    }
}

function rerender(){
    screen.innerText = buffer;
}