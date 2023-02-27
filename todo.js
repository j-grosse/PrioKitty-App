// Todo list

function newItem() {
  //1. Adding a new item to the list of items:
  let li = document.createElement('li');
  let inputValue = document.getElementById('input').value;
  let text = document.createTextNode(inputValue);
  li.appendChild(text);

  if (inputValue === '') {
    // alert('You must write something!');
  } else {
    let list = document.querySelector('#list');
    list.appendChild(li);

    // list.addEventListener('keydown', (e) => {
    //   if (e.key === 13) {
    //     let text = document.createTextNode(inputValue);
    //     list.appendChild(li);
    //   }
    // });
  }

  //2. Crossing out an item from the list of items:
  function crossOut() {
    li.classList.toggle('strike');
  }

  li.addEventListener('click', add_start_text);

  function add_start_text() {
    let ptag = `<p>${inputValue}</p>`;
    document.getElementById('task').innerHTML = ptag;

    let task_nospace = inputValue.replace(' ', '%20');
    let url = `https://cataas.com/cat/says/${task_nospace}`;
    let img_tag = '<img id="cat" src=' + url + '%20&#8730' + ' />';
    // document.getElementById('cat-image').innerHTML = img_tag;
    app.timer('start');
    // document.getElementById('cat').style.visibility='visible';
  }
  //  li.addEventListener("dblclick",crossOut);

  //3(i). Adding the delete button "X":
  let crossOutButton = document.createElement('crossOutButton');
  crossOutButton.appendChild(document.createTextNode('🐈  X'));
  li.appendChild(crossOutButton);

  crossOutButton.addEventListener('click', deleteListItem);
  //3(ii). Adding CLASS DELETE (DISPLAY: NONE) from the css:
  function deleteListItem() {
    li.classList.add('delete');
  }
  // // 4. Reordering the items:
  // $('#list').sortable();
}
