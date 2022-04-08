const inputMolarMass = document.querySelector('.input_molar_mass');
const inputMolarConcentration = document.querySelector('.input_molar_concentration');
const inputMolarVolume = document.querySelector('.input_molar_volume');
const inputMolarMolecularWeight = document.querySelector('.input_molar_molecular_weight');

const selectMolarMass = document.querySelector('.select_molar_mass');
const selectMolarConcentration = document.querySelector('.select_molar_concentration');
const selectMolarVolume = document.querySelector('.select_molar_volume');

const buttonMolarCalculate = document.querySelector('.button_molar_calculate');
buttonMolarCalculate.addEventListener('click', buttonCalculateClickEvent);

function buttonCalculateClickEvent() {
    if(!inputMolarMolecularWeight.value){
        alert('Molecular Weight is required!')
        inputMolecularWeight.focus();
        return;
    }

    const inputArray = [
        inputMolarMass, 
        inputMolarConcentration, 
        inputMolarVolume, 
        inputMolarMolecularWeight,
    ];
    const selectArray = [
        selectMolarMass, 
        selectMolarConcentration, 
        selectMolarVolume, 
    ];
    let countEmpty = 0;
    let blankIndex = 0;
    for(let i=0; i<4; i++){
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
        const concentration = parseFloat(inputArray[1].value) * Math.pow(10, parseInt(selectArray[1].options[selectArray[1].selectedIndex].value));
        const volume = parseFloat(inputArray[2].value) * Math.pow(10, parseInt(selectArray[2].options[selectArray[2].selectedIndex].value));
        const molecular_weight = parseFloat(inputArray[3].value);
        const mass = concentration * volume * molecular_weight / Math.pow(10, parseInt(selectArray[0].options[selectArray[0].selectedIndex].value));
        inputArray[blankIndex].value = mass;
    }else if(blankIndex == 1){        
        const mass = parseFloat(inputArray[0].value) * Math.pow(10, parseInt(selectArray[0].options[selectArray[0].selectedIndex].value));
        const volume = parseFloat(inputArray[2].value) * Math.pow(10, parseInt(selectArray[2].options[selectArray[2].selectedIndex].value));
        const molecular_weight = parseFloat(inputArray[3].value);        
        const concentration = mass / volume / molecular_weight / Math.pow(10, parseInt(selectArray[1].options[selectArray[1].selectedIndex].value));
        inputArray[blankIndex].value = concentration;
    }else if(blankIndex == 2){
        const mass = parseFloat(inputArray[0].value) * Math.pow(10, parseInt(selectArray[0].options[selectArray[0].selectedIndex].value));
        const concentration = parseFloat(inputArray[1].value) * Math.pow(10, parseInt(selectArray[1].options[selectArray[1].selectedIndex].value));
        const molecular_weight = parseFloat(inputArray[3].value);        
        const volume = mass / concentration / molecular_weight / Math.pow(10, parseInt(selectArray[2].options[selectArray[2].selectedIndex].value));
        inputArray[blankIndex].value = volume;
    }
}
