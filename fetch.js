// var GLOBALVAR = (function () {
  // let task = prompt('Please enter your task:', 'Antrag abgeschickt');
  // if (task == null || task == '') {
  //   prompt('Please enter your task:', 'Antrag abgeschickt');
  // }

  // document.getElementById('task').innerHTML = task;

//   let task_nospace = task.replace(' ', '%20');
//   let url = `https://cataas.com/cat/says/${task_nospace}`;
//   let img_tag = '<img src=' + url + '%20&#8730' + ' />';

//   return {
//     getImage: function () {
//       document.getElementById('cat-image').innerHTML = img_tag;
//     },

//     popup: function () {
//       let popuptags = `<div id="modal-bis" class="modal is-active">
//       <div class="modal-background"></div>
//       <div class="modal-content">
//         <p id="cat-image">
//         </p>
//       </div>
//       <button class="modal-close is-large" aria-label="close"></button>
//     </div>`;

//       document.getElementById('popup').innerHTML = popuptags;
//     },

//     getImage2: function () {
//       document.getElementById('cat-image2').innerHTML = img_tag;
//     },
//   };
// })();

// function fetchTextImage() {
//   let text = 'hi';
//   let gif = document.getElementById('cat-image2');
//   fetch(`https://cataas.com/cat/says/${text}`)
//     .then((resp) => resp.json())
//     .then((json) => (image.src = 'https://cataas.com/cat/gif'));
// }



/*
function fetchImage() {
  let image = document.getElementById('cat-image');
  fetch('https://api.thecatapi.com/v1/images/search')
    .then((resp) => resp.json())
    .then((json) => (image.src = json[0].url));
}
*/
