function ready(){
    // takes user to data gathering page
    window.location = "imc.html"
}
function goToHistory() {
    window.location = "history.html"
}

function clearHistory(){
    //does this really need a comment?
    localStorage.clear();
    location.reload();
}
function imcCalc(){
    // gathering user input
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    let imc = 0;
    const currentDate = new Date();

    //calculate imc
    imc = (weight / ((height / 100) * (height / 100)));
    let roundedIMC = Math.round(imc * 10) / 10

    //save value on to localStorage
    localStorage.setItem('savedIMC' , roundedIMC);

    //Save history
    const userInput = {
        date: currentDate.toISOString(),
        weight: weight,
        height: height,
        imc: roundedIMC
    }
    //get older inputs
    const existingInputs = JSON.parse(localStorage.getItem('userInputs')) || [];

    //save updated array back to the storage
    existingInputs.push(userInput);
    localStorage.setItem('userInputs', JSON.stringify(existingInputs));

    //calling function to redirect to result page
    showResults(roundedIMC);
}

function showResults(roundedIMC) {
    // Redirects user to result page

    if (roundedIMC < 18.5){
        window.location = "underWeight.html"
    }
    if (roundedIMC > 18.5 && roundedIMC < 24.9){
        window.location = "normalWeight.html"
    }
    if (roundedIMC > 25 && roundedIMC < 29.9){
        window.location = "overWeight.html"
    }
    if (roundedIMC > 30 && roundedIMC < 34.9){
        window.location = "ob1.html"
    }
    if (roundedIMC > 35 && roundedIMC < 39.9){
        window.location = "ob2.html"
    }
    if (roundedIMC >= 40){
        window.location = "ob3.html"
    }
}

function writeResults(){
    // writes imc on landed page
    document.getElementById("result").append(localStorage.getItem("savedIMC"));
    console.log(localStorage.getItem("savedIMC"));

    // Retrieve user inputs from local storage
    const storedUserInputs = JSON.parse(localStorage.getItem('userInputs')) || [];

    // Display stored user inputs
    console.log(storedUserInputs);

}

function writeHistory(){
    const storedUserInputs = JSON.parse(localStorage.getItem('userInputs')) || [];
    const userInputsDisplay = document.getElementById("historyHolder");

    // Iterate through stored user inputs and append them to the display element
    storedUserInputs.forEach(input => {
        const inputElement = document.createElement('p');
        inputElement.textContent = `Weight: ${input.weight}, Height: ${input.height}, Date: ${input.date}, IMC: ${input.imc}`;
        userInputsDisplay.appendChild(inputElement);
    });
}