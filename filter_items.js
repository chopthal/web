buttons = document.querySelector(".buttons");
// console.log(buttons);

buttons.addEventListener("click", onClickButtons);

function onClickButtons(event) {
  console.log(event.srcElement.id);
}