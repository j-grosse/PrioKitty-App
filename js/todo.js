// Todo list

document.getElementById('input').value = '';
document.getElementById('input').focus();

// accept <Enter> key
addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    newItem();

    // allow only 5 list items
    $(function () {
      $('ol#list li:gt(4)').remove();
    });

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
    list.appendChild(li);  // add li to list
  }

  document.getElementById('input').select();

  // make selected task the current task and start timer
  function selectTask() {
    let pTag = `<p id="pTaskText">${inputValue}</p>`;
    document.getElementById('taskText').innerHTML = pTag;
    app.timer('start'); // start the timer
  }

  // doubleclick to delete task, click to select task
  btn.onclick = (event) => {
    // dbl click to remove li
    // if (event.detail === 2) {
    //   li.remove();
    // } else if (event.detail === 1) {
      selectTask();
    // }
  };

  // delete button "🐾":
  let crossOutButton = document.createElement('crossOutButton');
  crossOutButton.appendChild(document.createTextNode('🐾'));
  li.appendChild(crossOutButton);
  crossOutButton.addEventListener('click', () => li.remove() );

  // make items sortable to re-order them:
  $('#list').sortable();

}

//3(iii). Crossing out an item from the list of items:
// function crossOut() {
//   li.classList.toggle('strike');
// }
//  li.addEventListener("dblclick",crossOut);
