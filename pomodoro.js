let main_dur = 25;
// let main_dur = 0.05;
let pause_dur = 5; 
// let pause_dur = 0.05; 
let minute = 60;
let firstRun = false;

const prioBtn = document.querySelector('.prio-button');
prioBtn.addEventListener('click', () => {
    const frag = document.createDocumentFragment();
    const list = document.querySelector("ul");
    const items = list.querySelectorAll("li");

    list.style.display = 'none';
    const prioCat = document.querySelector('#prio-cat')
    prioCat.style.display = 'block';

    const sortedList = Array.from(items).sort(() => Math.random() - 0.5);
    
    // (function(a, b) {
    //   const c = a.textContent,
    //     d = b.textContent;
    //   return c < d ? -1 : c > d ? 1 : 0;
    // });

    for (let item of sortedList) {
      frag.appendChild(item);
    }

    list.appendChild(frag);

    setTimeout(() => {
    

      prioCat.style.display= 'none';
      list.style.display = 'block';
    
  },1500); 
});


// document.querySelector('#prio').style.display = 'none';
// document.querySelector('#list').style.display = 'block';

let i = 0;
let vol = 0.5;
let meow = document.getElementById('meow');
var purr = document.getElementById('purr');
// purr.currentTime = 0;
var dub = document.getElementById('dub');
dub.volume = vol;
var jazz = document.getElementById('jazz');
jazz.volume = vol;


function togglePlay(genre) {
  let isPaused;
  if (genre.paused) {
    isPaused =true
  } else {
    isPaused = false;
  }
  document.querySelectorAll('audio').forEach(el => el.pause());
  let genreId = document.getElementById(`"${genre}"`);
  isPaused ? genre.play() : genre.pause();
};


function fetchImage(url) {
  window.addEventListener("load", function () {
    //checking if the user is connected to the internet and show content respectively
    // if (navigator.onLine) {
      fetch(
        `${url}`
      )
        .then((response) => response.json())
        .then((data) => {
          document.body.style.backgroundImage = `url("${data.url}")`;
          })
        .catch((err) => console.log("Something's wrong with the API"));
  // }
  // //when the user is offline
  // else {
  //   /*THE CODE GOES HERE*/
  // }
})};

async function convertToFile(url){
  let response = await fetch(url);
  console.log("await fetch response:" + response);
  // .then(resp=>{
    // console.log(resp.headers.get('Content-Type')); });
    // console.log(resp.headers.get('Content-Type')); });
  let imgType = response.headers.get('Content-Type');
  let filename = imgType.replace('/', '.');  
  if (filename === "image.jpeg") (filename = "image.jpg");
  let blob = await response.blob();
  return new File([blob], filename, {
    type: imgType // e.g.'image/jpeg'
  });
}

// async function getCatFromTag() {
//   const url = document.getElementById("cat").value; // get file URL somehow
//   const file = await convertToFile(url); // usage of function above

//   const reader = new FileReader();
//   reader.readAsDataURL(file);
// }

async function saveFile(url) {
  const imgFile = await convertToFile(url);
  console.log(imgFile);

  const reader = new FileReader();
  let filename;

  if (imgFile) {
      // save file to reader.result
      reader.readAsDataURL(imgFile);
    }
    // "load" fires when file is read succesfully and starts function to name file
    reader.addEventListener("load", function () { 
    let number = new Date().getTime();
    filename = number + imgFile.name;
    // save to localstorage under this filename
    localStorage.setItem(filename, reader.result);

    console.log(filename);

  }, false);


  
  // load image from localStorage

  // add image as base64 to popup-image tag
  let img = document.getElementById('popup-image');
  img.src = 'data:image/png;base64,' + imgFile.blob;
};

// localStorage.clear();




//   document.querySelector("#myFileInput").addEventListener("change", function () {
//     const reader = new FileReader();
//     reader.addEventListener("load", () => {
//     localStorage.setItem("recent-image", reader.result);
//   });
//   reader.readAsDataUrl(this.files[0]);
  
//   });

//   document.addEventListener("DOMContentLoaded", () => {
//   const recentImageDataUrl = localStorage.getItem("recent-image");

//   if (recentImageDataUrl) {
//     document.querySelector("#imgPreview").setAttribute("src", recentImageDataUrl);
//   }
// });



function popup() {
  // get task text for popup image
  let taskText = document.getElementById('taskText').textContent;
  let task_nospace = taskText.replace(' ', '%20');
  let url = `https://cataas.com/cat/says/${task_nospace}`;
  // saveFile(url);
  saveFile("https://en.wikipedia.org/wiki/File:Cat_August_2010-4.jpg");

  // let imageTag = '<img id="cat" src=' + url + '%20&#8730' + '?type=md />';
  // document.getElementById('modal-card-body').innerHTML = imageTag;

  // display bulma modal popup
  var modalDlg = document.querySelector('#image-modal');
  var imageModalCloseBtn = document.querySelector('#image-modal-close');
  // open modal popup
  modalDlg.classList.add('is-active');
  // click close button
  imageModalCloseBtn.addEventListener('click', function () {
    modalDlg.classList.remove('is-active');
  });
  // click anywhere to close modal popup
  window.addEventListener('mouseup', function () {
    modalDlg.classList.remove('is-active');
  });
}



// Vue.js Pomodoro Timer

var app = new Vue({
  el: '#app',
  data: {
    time_remaining: main_dur * minute,
    timer_state: 'work', //'work' or 'rest'
    timer_running: false,
    timer_paused: false,
    timer_id: null,
  },
  methods: {
    timer: function (action) {
      switch (action) {
        case 'start':
          togglePlay(dub);

          if (!this.timer_running) {
            this.timer_id = setInterval(this.tick, 1000);
            this.timer_running = true;
          }
          break;

        case 'reset':
          // dub.pause();
          meow.play();

          clearInterval(this.timer_id);
          this.timer_id = null;
          this.time_remaining = main_dur * minute;
          this.timer_running = false;
          this.timer_paused = false;
          this.timer_state = 'work';
          break;

        case 'skip':
          if (firstRun) {
            break;
          }
          popup();
          togglePlay(jazz);
          firstRun = true;
          
          this.timer_state == 'work' ? pause_dur * minute : main_dur * minute;
          if (this.timer_running && !this.timer_paused) {
            // this.skip();
          }
          break;

        /*
        case 'pause':
          if (this.timer_running) this.timer_paused = !this.timer_paused;
          break;
        */

        default:
          break;
      }
    },

    // if timer is running count down remaining time
    // else skip to break timer (method block below')
    tick: function () {
      if (this.timer_running && !this.timer_paused) {
        if (this.time_remaining > 0) {
          this.time_remaining--;
        } else {
          //timer ran out
          this.skip();
        }
      }
    },

    skip: function () {
      this.time_remaining =
        this.timer_state == 'work' ? pause_dur * minute : main_dur * minute;
      this.timer_state =
        this.timer_state == 'work' ? 'rest' : setTimeout(() => {
        this.timer('reset');
      }, 1000);
      // this.timer_state = this.timer_state == 'work' ? 'rest' : 'work';
      this.timer('skip');

      //  // original code:
      //  skip: function () {
      //   this.time_remaining =
      //     this.timer_state == 'work' ? (5 * minute) : (25 * minute);
      //   this.timer_state = this.timer_state == 'work' ? 'rest' : 'work';



      // spawnNotification(
      //   this.timer_state == 'work'
      //     ? 'Time to get back to work 🖥️'
      //     : 'Time to take a break 🏖',
      //   'Pomodoro Timer'
      // );
    },
  },
});

// Notification.requestPermission().then(function (result) {
//   console.log(result);
// });

// function spawnNotification(body, icon, title) {
//   var options = {
//     body: body,
//     icon: icon,
//   };
//   var n = new Notification(title, options);
// }
