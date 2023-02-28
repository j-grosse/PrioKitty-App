// Pomodoro Timer

let vol = 0.5;

function popup() {
  let taskText = document.getElementById('taskText').textContent;
  let task_nospace = taskText.replace(' ', '%20');
  let url = `https://cataas.com/cat/says/${task_nospace}`;
  let imageTag = '<img id="cat" src=' + url + '%20&#8730' + '?type=md />';

  document.getElementById('modal-card-body').innerHTML = imageTag;
  // document.getElementById('cat-image').innerHTML = imageTag;

  // bulma modal
  // var btn = document.querySelector('#showModal');
  var modalDlg = document.querySelector('#image-modal');
  var imageModalCloseBtn = document.querySelector('#image-modal-close');

  // btn.addEventListener('click', function () {
  modalDlg.classList.add('is-active');
  // });

  imageModalCloseBtn.addEventListener('click', function () {
    modalDlg.classList.remove('is-active');
  });

  // click anywhere to close modal popup
  window.addEventListener('mouseup', function () {
    modalDlg.classList.remove('is-active');
  });
}

var app = new Vue({
  el: '#app',
  data: {
    time_remaining: 1500, // 25 minutes = 60 * 25
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
          var sound_dub = document.getElementById('dub');
          sound_dub.volume = vol;
          sound_dub.play();
          var sound = document.getElementById('jazz');
          sound.pause();
          sound.currentTime = 0;

          if (!this.timer_running) {
            this.timer_id = setInterval(this.tick, 1000);
            this.timer_running = true;
          }
          break;
        case 'pause':
          if (this.timer_running) this.timer_paused = !this.timer_paused;
          break;
        case 'reset':
          var sound_dub = document.getElementById('dub');
          sound_dub.pause();
          sound_dub.currentTime = 0;

          var sound = document.getElementById('jazz');
          sound.pause();
          sound.currentTime = 0;

          var sound_purr = document.getElementById('purr');
          sound_purr.pause();
          sound_purr.currentTime = 0;

          clearInterval(this.timer_id);
          this.timer_id = null;
          this.time_remaining = 1500;
          this.timer_running = false;
          this.timer_paused = false;
          this.timer_state = 'work';
          break;
        case 'skip':
          popup();
          // var sound_purr = new Audio("purr.mp3")
          // sound_purr.play();

          var sound_dub = document.getElementById('jazz');
          sound_dub.volume = vol;
          sound_dub.play();
          var sound = document.getElementById('dub');
          sound.pause();
          sound.currentTime = 0;

          if (this.timer_running && !this.timer_paused) {
            this.skip();
          }
          break;
        default:
          break;
      }
    },
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
      this.time_remaining = this.timer_state == 'work' ? 300 : 1500;
      this.timer_state = this.timer_state == 'work' ? 'rest' : 'work';

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
