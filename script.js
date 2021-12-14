function selectionChangeFunction(value) {
    if (value === "custom" ) {
        const customInput = document.querySelector(".hidden");
        customInput.className = "";
    }
}

const orderForm = document.querySelector(".orderForm");
orderForm.addEventListener("submit", submitButtonClicked)

function submitButtonClicked(event){
    event.preventDefault();
    console.log(event);
}