// let duration = 25;
let duration = 0.05;
// let pause_dur = 5; 
let pause_dur = 0.05; 
let minute = 60;

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


function localStorage(url) {
  // get image from harddisk
  const imgPath = url;
  // // 'choose file' dialog:
  // const imgPath = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();
  // when file is read, covert and save image
  reader.addEventListener("load", function () {

    // convert image file to base64 string and save to localStorage
    localStorage.setItem("image", reader.result);
  }, false);
  
  if (imgPath) {
    reader.readAsDataURL(imgPath);
  }
  
  // load image from localStorage
  let img = document.getElementById('image');
  img.src = localStorage.getItem('image');
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
//   const recentImageDataUrl = localStorage.getItem("resent-image");

//   if (recentImageDataUrl) {
//     document.querySelector("#imgPreview").setAttribute("src", recentImageDataUrl);
//   }
// });



function popup() {
  // get task text for popup image
  let taskText = document.getElementById('taskText').textContent;
  let task_nospace = taskText.replace(' ', '%20');
  let url = `https://cataas.com/cat/says/${task_nospace}`;
  
  // localStorage("https://cataas.com/cat/says/hi");

  // fetchImage(url);
  localStorage(url);

  let imageTag = '<img id="cat" src=' + url + '%20&#8730' + '?type=md />';
  document.getElementById('modal-card-body').innerHTML = imageTag;


  // bulma modal
  var modalDlg = document.querySelector('#image-modal');
  var imageModalCloseBtn = document.querySelector('#image-modal-close');

  modalDlg.classList.add('is-active'); // open modal popup

  imageModalCloseBtn.addEventListener('click', function () {
    modalDlg.classList.remove('is-active');
    document.getElementById('input').focus();
  });

  // click anywhere to close modal popup
  window.addEventListener('mouseup', function () {
    modalDlg.classList.remove('is-active');
    document.getElementById('input').focus();
  });
}

// Vue.js Pomodoro Timer

var app = new Vue({
  el: '#app',
  data: {
    time_remaining: duration * minute,
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

        // case 'pause':
        //   if (this.timer_running) this.timer_paused = !this.timer_paused;
        //   break;

        case 'reset':
          dub.pause();
          meow.play();

          clearInterval(this.timer_id);
          this.timer_id = null;
          this.time_remaining = duration * minute;
          this.timer_running = false;
          this.timer_paused = false;
          this.timer_state = 'work';
          break;

        case 'skip':
          togglePlay(jazz);
          popup();

          if (this.timer_running && !this.timer_paused) {
            // this.skip();
          }
          break;
        default:
          break;
      }
    },

    // if timer is running count down remaining time
    // else skip to break timer
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
        this.timer_state == 'work' ? pause_dur * minute : duration * minute;
      this.timer_state =
        this.timer_state == 'work' ? 'rest' : this.timer('reset');
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
