// Todo list

document.getElementById('input').value = '';
document.getElementById('input').focus();

// accept <Enter> key
addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    newItem();
  }
});

function newItem() {
  // Adding a new item to the list of items:
  let li = document.createElement('li');
  let inputValue = document.getElementById('input').value;
  let text = document.createTextNode(inputValue);

  var btn = document.createElement('div');
  btn.id = 'button';
  // btn.style = 'background-color: hsl(30, 54%, 48%); padding: 0px 8px;';

  btn.appendChild(text);
  li.appendChild(btn);

  if (inputValue === '') {
    // alert('You must write something!');
  } else {
    let list = document.querySelector('#list');
    list.appendChild(li);
  }

  document.getElementById('input').select();

  
  //onclick add task as goal & start timer
  function selectTask() {
    let ptag = `<p id="taskText">${inputValue}</p>`;
    document.getElementById('taskText').innerHTML = ptag;
    
    app.timer('start');
  }

  // click to select, doubleclick to delete task
  btn.onclick = (event) => {
    if (event.detail === 2) {
      deleteListItem();
    } else if (event.detail === 1) {
      selectTask();
    }
  };

  function deleteListItem() {
    li.classList.add('delete');
  }
  /*
  //3(i). Adding the delete button "X":
  let crossOutButton = document.createElement('crossOutButton');
  crossOutButton.appendChild(document.createTextNode('🗑️'));
  li.appendChild(crossOutButton);

  crossOutButton.addEventListener('click', deleteListItem);
  //3(ii). Adding CLASS DELETE (DISPLAY: NONE) from the css:
  */
}
//3(iii). Crossing out an item from the list of items:
// function crossOut() {
//   li.classList.toggle('strike');
// }
//  li.addEventListener("dblclick",crossOut);

// 4. Reordering the items:
// $('#list').sortable();
