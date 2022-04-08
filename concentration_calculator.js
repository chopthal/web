const inputConcVolume = document.querySelector('.input_conc_volume');
const inputConcMass = document.querySelector('.input_conc_mass');
const inputConcConcentration = document.querySelector('.input_conc_concentration');

const selectConcVolume = document.querySelector('.select_conc_volume');
const selectConcMass = document.querySelector('.select_conc_mass');
const selectConcConcentration = document.querySelector('.select_conc_concentration');

const buttonConcCalculate = document.querySelector('.button_conc_calculate');
buttonConcCalculate.addEventListener('click', buttonCalculateClickEvent);

function buttonCalculateClickEvent() {
    const inputArray = [
        inputConcVolume, 
        inputConcMass, 
        inputConcConcentration, 
    ];
    const selectArray = [
        selectConcVolume, 
        selectConcMass, 
        selectConcConcentration,
    ];
    let countEmpty = 0;
    let blankIndex = 0;
    for(let i=0; i<inputArray.length; i++){
        if(!inputArray[i].value){
            countEmpty += 1;                        
            blankIndex = i;
        }
    }
    if (countEmpty>1){
        alert('Fill the blank inputs except for one!')
        return;
    }
    if (countEmpty==0){
        alert('One input should be empty!')
        return;
    }

    if(blankIndex == 0){                        
        const mass = parseFloat(inputArray[1].value) * Math.pow(10, parseInt(selectArray[1].options[selectArray[1].selectedIndex].value));
        const concentration = parseFloat(inputArray[2].value) * Math.pow(10, parseInt(selectArray[2].options[selectArray[2].selectedIndex].value));
        const volume = mass / concentration / Math.pow(10, parseInt(selectArray[0].options[selectArray[0].selectedIndex].value));
        inputArray[blankIndex].value = volume;
    }else if(blankIndex == 1){        
        const volume = parseFloat(inputArray[0].value) * Math.pow(10, parseInt(selectArray[0].options[selectArray[0].selectedIndex].value));
        const concentration = parseFloat(inputArray[2].value) * Math.pow(10, parseInt(selectArray[2].options[selectArray[2].selectedIndex].value));
        const mass = volume * concentration / Math.pow(10, parseInt(selectArray[1].options[selectArray[1].selectedIndex].value));
        inputArray[blankIndex].value = mass;
    }else if(blankIndex == 2){
        const volume = parseFloat(inputArray[0].value) * Math.pow(10, parseInt(selectArray[0].options[selectArray[0].selectedIndex].value));
        const mass = parseFloat(inputArray[1].value) * Math.pow(10, parseInt(selectArray[1].options[selectArray[1].selectedIndex].value));
        const concentration = mass / volume / Math.pow(10, parseInt(selectArray[2].options[selectArray[2].selectedIndex].value));
        inputArray[blankIndex].value = concentration;
    }
}
