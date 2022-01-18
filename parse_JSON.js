buttons = document.querySelector(".buttons");
storeButton = document.querySelector(".logo");
// console.log(buttons);

buttons.addEventListener("click", onClickButtons);
storeButton.addEventListener("click", onClickStoreButton);

onClickStoreButton();

function onClickButtons(event) {
  fetch('item_list.json')
  .then(function(response) {
    return response.json();
  })
  .then( (myJson) =>
    {
      let filteredItems = "";
      const items = myJson.items;
      filteredItems = items.filter(item => {
        if (item.color == event.srcElement.id || item.type == event.srcElement.id) {
          return item;
        }
      })
      DisplayItems(filteredItems);
    })
}

function onClickStoreButton() { 
  fetch('item_list.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    const items = myJson.items;
    DisplayItems(items);
    });
}


function DisplayItems(items){
  let addhtml = "";
  items.forEach((item) => {
    addhtml += `<li><img src="${item.img}"/><span>${item.gender} / ${item.color}</span></li>`;
    });
  itemList = document.querySelector(".item-list");
  itemList.innerHTML = addhtml;
}