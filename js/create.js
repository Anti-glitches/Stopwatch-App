import {start, pause, reset} from './stopwatch.js'

const generateButton = document.querySelector('#generate');
const container = document.querySelector('.module-container');


let count = 0;

export function createBox(){
    const accordianItem = document.createElement('div');
    const input = document.querySelector('#inputText');

    if(input.value.length === 0){
        errMsg.innerHTML = "Your stopwatch begs you to give it a name as it cries in despair. &#128557"
    } else{
        errMsg.innerHTML = ""


        accordianItem.classList.add('accordian-item');

        accordianItem.innerHTML = `
                <div class="accordian-item-head">
                    <div class="item-head-display">
                        <h1>${input.value}</h1>
                        <p>time saved: <span class='saved savedDisplay${count}'>00:00:00</span> <span class="circle"></p> 
                    </div>
                    <div class="item-head-toggle">
                        <i class="fas fa-caret-down item-head-arrow"></i>
                        <p>open</p>  
                    </div>    
                </div>
                <div class="accordian-item-body">
                    <div class="accordian-body-display">
                        <div class="item-body-stopwatch">
                            <span class='display display${count}'>00:00:00</span>
                            <div class="stopwatch-buttons">
                                <button class='playPauseButton playPause${count}'>start</button>
                                <button class='resetButton reset${count}'>save</button>
                            </div>
                        </div>
                        <div class="item-body-textarea">
                            <textarea name="" id="" cols="45" rows="9" placeholder="Write some notes here"></textarea>
                        </div>
                    </div>
                    <div class="delete">
                        <i title="Please don't delete me"class="fas fa-trash delete-icon delete${count}"></i>
                    </div>
                </div>`
            
        container.prepend(accordianItem)

        allStuff()
    }
}

function stopwatch(playPauseNum, resetNum, displayNum, savedDisplayNum){
    let display = document.querySelector(`.${displayNum}`);
    let playPauseButton = document.querySelector(`.${playPauseNum}`);
    let savedDisplay = document.querySelector(`.${savedDisplayNum}`);

    document.querySelector(`.${playPauseNum}`).addEventListener('click', ()=>{
        display.classList.toggle('active');

        if (display.classList.contains('active')){
            display.style.backgroundColor = '#ffc2c2'; // red background
            playPauseButton.style.backgroundColor = '#F44B59'; // red button
            playPauseButton.innerHTML = "pause"
            savedDisplay.nextElementSibling.style.backgroundColor = '#F44B59'; //red dot
            start(`.${displayNum}`, `${displayNum}`.slice(-1));
        } else{
            display.style.backgroundColor = '#c7ffc2'; // green background
            playPauseButton.style.backgroundColor = '#59F44B'; // green button
            playPauseButton.innerHTML = "start";
            savedDisplay.nextElementSibling.style.backgroundColor = '#59F44B'; //green dot
            pause(`${displayNum}`.slice(-1));
        }
    });
    document.querySelector(`.${resetNum}`).addEventListener('click', ()=>{
        if (display.classList.contains('active')){     
            display.classList.toggle('active');
            display.style.backgroundColor = '#fffec2';  // yellow commit background
            playPauseButton.style.backgroundColor = '#59F44B';  // green button
            playPauseButton.innerHTML = "start" 
            savedDisplay.nextElementSibling.style.backgroundColor = '#59F44B'; //green dot
            reset(`.${displayNum}`,`.${savedDisplayNum}`, `${displayNum}`.slice(-1));
        } else{
            reset(`.${displayNum}`, `.${savedDisplayNum}`, `${displayNum}`.slice(-1));
            display.style.backgroundColor = '#fffec2';
        }
    });
}

function disableButton(){
    const accordianItem = document.querySelectorAll('.accordian-item');
    if (accordianItem.length > 4){
        generateButton.disabled = true;
        generateButton.style.backgroundColor = 'lightgrey';
    } else{
        generateButton.disabled = false;
        generateButton.style.backgroundColor = 'white';
    }
}

function deleteaccordianItem(displayNum, savedDisplayNum, deleteNum){
    let deleteIcon = document.querySelector(`.${deleteNum}`);
    deleteIcon.addEventListener('click', ()=>{
        deleteIcon.parentElement.parentElement.parentElement.remove()
        generateButton.style.backgroundColor ='white'
        generateButton.disabled = false;
        reset(`.${displayNum}`,`.${savedDisplayNum}`, `${displayNum}`.slice(-1));
    })
}

function allStuff(){
    stopwatch(`playPause${count}`,`reset${count}`, `display${count}`, `savedDisplay${count}`);
    // console.log(`playPause${count}`,`reset${count}`, `display${count}`, `savedDisplay${count}`)

    disableButton();

    deleteaccordianItem(`display${count}`, `savedDisplay${count}`, `delete${count}`);

    changeColor()
    count++;
}

function changeColor(){
    let colorCount = document.querySelector('.item-head-display')

    let colorArr = [255, 233]
    let randnum = Math.floor(Math.random()*23 + 233)
    colorArr.push(randnum)

    shuffle(colorArr)
    // console.log(colorArr)

    colorCount.style.backgroundColor = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
    colorArr = []
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}