import Player from '@vimeo/player';
// import {throttle} from "lodash.throttle";

var throttle = require('lodash.throttle');
const iframe = document.querySelector('iframe');
console.log(iframe);

const player = new Player(iframe);

player.on('timeupdate', throttle(function(data) 
{
  // console.log(data.seconds);
  localStorage.setItem("videoplayer-current-time", JSON.stringify(data.seconds));
}, 1000
));

// console.log(localStorage.getItem('videoplayer-current-time'));

player.setCurrentTime(localStorage.getItem('videoplayer-current-time')).then(function(seconds) {
  // seconds = the actual time that the player seeked to
}).catch(function(error) {
  switch (error.name) {
      case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

      default:
          // some other error occurred
          break;
  }
});


// Tested adding stuff to localStorage
// let nameName = {name: "Nox", lastname: "Walter"};
// localStorage.setItem("videoplayer-current-time", JSON.stringify(nameName));


// tested Play function
// player.on('play', function() {
//   console.log('played the video!');
// });


// player.on('timeupdate', function(data) {
//   console.log(data.seconds);
// });
