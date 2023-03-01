// Pomodoro Timer
function popup() {
  let taskText = document.getElementById('taskText').textContent;
  let task_nospace = taskText.replace(' ', '%20');
  let url = `https://cataas.com/cat/says/${task_nospace}`;
  let imageTag = '<img id="cat" src=' + url + '%20&#8730' + '?type=md />';

  document.getElementById('modal-card-body').innerHTML = imageTag;

  // bulma modal
  // var btn = document.querySelector('#showModal');
  var modalDlg = document.querySelector('#image-modal');
  var imageModalCloseBtn = document.querySelector('#image-modal-close');

  modalDlg.classList.add('is-active');

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

let duration = 25; //0.05;
let pause_dur = 5; //0.05;
let minute = 60;

let vol = 0.5;
var meow = document.getElementById('meow');
var purr = document.getElementById('purr');
// purr.currentTime = 0;
var dub = document.getElementById('dub');
dub.volume = vol;
var jazz = document.getElementById('jazz');
jazz.volume = vol;


// function for audio buttons
function togglePlay(genre) {
  document.querySelectorAll('audio').forEach(el => el.pause());
  document.getElementById('input').focus();
  return genre.paused ? genre.play() : genre.pause();
}

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
          // play & pause audio
          meow.pause();

          dub.play();

          jazz.pause();

          if (!this.timer_running) {
            this.timer_id = setInterval(this.tick, 1000);
            this.timer_running = true;
          }
          break;

        case 'pause':
          if (this.timer_running) this.timer_paused = !this.timer_paused;
          break;

        case 'reset':
          meow.play();

          dub.pause();
          dub.currentTime = 0;

          // jazz.pause();
          // jazz.currentTime = 0;

          clearInterval(this.timer_id);
          this.timer_id = null;
          this.time_remaining = duration * minute;
          this.timer_running = false;
          this.timer_paused = false;
          this.timer_state = 'work';
          break;

        case 'skip':
          popup();

          jazz.play();

          dub.pause();

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
        this.timer_state == 'work' ? (pause_dur * minute) : (duration * minute);
      this.timer_state =
        this.timer_state == 'work' ? 'rest' : this.timer('reset');
      // this.timer_state = this.timer_state == 'work' ? 'rest' : 'work';
      this.timer('skip');

      // skip: function () {
      //   this.time_remaining =
      //     this.timer_state == 'work' ? (5 * minute) : (25 * minute);
      //   this.timer_state = this.timer_state == 'work' ? 'rest' : 'work';

      spawnNotification(
        this.timer_state == 'work'
          ? 'Time to get back to work 🖥️'
          : 'Time to take a break 🏖',
        'Pomodoro Timer'
      );
    },
  },
});

Notification.requestPermission().then(function (result) {
  console.log(result);
});

function spawnNotification(body, icon, title) {
  var options = {
    body: body,
    icon: icon,
  };
  var n = new Notification(title, options);
}
