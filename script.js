// Todo list


function newItem(){

  
//1. Adding a new item to the list of items: 
   let li = document.createElement("li");
   let inputValue = document.getElementById("input").value;
   let text = document.createTextNode(inputValue);
   li.appendChild(text);

   if (inputValue === '') {
     alert("You must write something!");
   } else { 
   let list = document.querySelector('#list');
      list.appendChild(li);
   }
  
 //2. Crossing out an item from the list of items:
   function crossOut() {
 		li.classList.toggle("strike");
 	}
 	li.addEventListener("dblclick",crossOut);

 //3(i). Adding the delete button "X": 
   let crossOutButton = document.createElement("crossOutButton");
 	  crossOutButton.appendChild(document.createTextNode("🐈 X"));
 	  li.appendChild(crossOutButton);

 	crossOutButton.addEventListener("click", deleteListItem);
 //3(ii). Adding CLASS DELETE (DISPLAY: NONE) from the css:
   function deleteListItem(){
 		li.classList.add("delete")
 	}
 // 4. Reordering the items: 
   $('#list').sortable();
}


// Pomodoro Timer

var app = new Vue({
  el: '#app',
  data: {
    time_remaining: 1500, // 25 minutes = 60 * 25
    timer_state: 'work', //'work' or 'rest'
    timer_running: false,
    timer_paused: false,
    timer_id: null
  },
  methods: {
    timer: function (action) {
      switch(action) {
        case 'start':
          if(!this.timer_running) {
            this.timer_id = setInterval(this.tick, 1000)
            this.timer_running = true
          }
          break;
        case 'pause':
          if(this.timer_running) this.timer_paused = !this.timer_paused
          break;
        case 'reset':
          clearInterval(this.timer_id)
          this.timer_id = null
          this.time_remaining = 1500
          this.timer_running = false
          this.timer_paused = false
          this.timer_state = 'work'
          break;
        case 'skip':
          if(this.timer_running && !this.timer_paused) {
            this.skip()
          }
          break;
        default:
          break;
      }
    },
    tick: function() {
      if(this.timer_running && !this.timer_paused) {
        if(this.time_remaining > 0) {
          this.time_remaining--;
        } else {
          //timer ran out
          this.skip()
          
        }
      }
    },
    skip: function() {
      this.time_remaining = (this.timer_state == 'work') ? 300 : 1500
      this.timer_state = (this.timer_state == 'work') ? 'rest' : 'work'

      spawnNotification((this.timer_state == 'work') ? 'Time to get back to work 🖥️' : 'Time to take a break 🏖', 'Pomodoro Timer')
    }
  }
})

Notification.requestPermission().then(function(result) {
  console.log(result);
});

function spawnNotification(body, icon, title) {
  var options = {
      body: body,
      icon: icon
  };
  var n = new Notification(title, options);
}