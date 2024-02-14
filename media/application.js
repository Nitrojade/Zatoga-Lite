// Know if in the app
var inApp = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
var onApp = (location.pathname == "/app/" || location.pathname == "/app/list.html");
var beta = (location.host == "zatoga-beta.irom1.repl.co");
let stable = !beta;

// Add ARC to webpages that are online
if(navigator.onLine && location.pathname != "/app/games/archive/subway-surfers/") {
  let arcScript = document.createElement("script");
  arcScript.async = true;
  arcScript.src = "https://arc.io/widget.min.js#4Jpe4Zp2";
  document.body.appendChild(arcScript);
}

// this event will only fire if the user does not have the pwa installed
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  window.installApp = event;
  document.getElementById("launchApp").style.display = "none";
  document.getElementById("installApp").style.display = "block";
});

// Service worked stuff
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(function(registration) {
		    registration.onupdatefound = function() {
          if(inApp) {
         let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
alert("An update has been found for Zatoga! Click the button below to update. \n Most games and proxies are now unblocked & working as of " + cMonth + "/" + cDay + "/" + cYear + "!");
          document.location.reload(true); 
          }
		    }
	    }, function(err) {
		    console.log('ServiceWorker registration failed: ', err);
      });
  })
}
// App install
window.addEventListener('appinstalled', () => {
  location.href = "/app/";
});

// Resize frame message
function sendResize(width,height) {
  window.parent.postMessage({"width":width,"height":height},"*");
}
// Force app size - function
function resize(width,height,always) {
  var framed = (window.self !== window.top);
  var insideApp = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if(insideApp) {
    window.resizing = true;
    window.resizeTo(width + window.outerWidth - window.innerWidth, height + window.outerHeight - window.innerHeight);
    window.resizing = false;
  }
  if(framed) {
    sendResize(width,height);
  }
  if(always) {
    window.addEventListener('resize', () => {
      if(!window.resizing) {
        window.resizing = true;
        //setTimeout(function(){
          window.resizeTo(width + window.outerWidth - window.innerWidth, height + window.outerHeight - window.innerHeight);
        //},100);
        setTimeout(function(){
          window.resizing = false;
        },20);
      }
    });
  }
}
// Force app size on homepage
/*
if(onApp) {
  resize(422,539,true);
} */

/*
// Online only content
if(navigator.onLine) {
  var x = document.getElementsByClassName("online");
  for(i=0;i<x.length;i++) {
    x[i].classList.remove("disabled");
    x[i].style.visibility = "visible";
    x[i].style.display = "inherit";
    let elem = x[i];
    setTimeout(function(){elem.style.opacity = 1;},500);
  }
// Offline only content
} else {
  x = document.getElementsByClassName("online");
  for(i=0;i<x.length;i++) {
    x[i].style.display = "none";
  }
  var x = document.getElementsByClassName("offline");
  for(i=0;i<x.length;i++) {
    x[i].classList.remove("disabled");
    x[i].style.visibility = "visible";
    x[i].style.display = "inherit";
    let elem = x[i];
    setTimeout(function(){elem.style.opacity = 1;},500);
  }
}
// Beta only content
if(beta) {
  x = document.getElementsByClassName("stable");
  for(i=0;i<x.length;i++) {
    x[i].style.display = "none";
  }
  var x = document.getElementsByClassName("beta");
  for(i=0;i<x.length;i++) {
    x[i].classList.remove("disabled");
    x[i].style.visibility = "visible";
    x[i].style.display = "inherit";
    let elem = x[i];
    setTimeout(function(){elem.style.opacity = 1;},500);
  }
} */


// Message stuff
/*
if(onApp) {
  var messages = [
   "Why don't you play some games now?",
   "Ready to get distracted...?",
    "Check out the Info page!",
    "It's Zatoga time!",
    "Follow @zato.ga on Instagram!",
   "You know it's time to play fun games...",
   "Why do work when you can play?",
   "Play all the latest games anywhere!",
   "It's the easiest way to have fun!",
   "Made by students, made for students.",
   "Check out the Premium page!"
    ];
  var message = document.getElementById("message");
  message.innerText = messages[Math.floor(Math.random() * messages.length)];
}
*/

// Sharing stuff
if(navigator.share) {
  var x = document.getElementsByClassName("share");
  for(i=0;i<x.length;i++) {
    x[i].style.visibility = "visible";
    x[i].addEventListener('click', event => {
      navigator.share({
        title: 'Zatoga',
        text: 'Zatoga - Play all the latest games unblocked- it is the easiest way to have fun!',
        url: 'https://zato.ga/'
      }).then(() => {
        //console.log('Thanks for sharing!');
      }).catch(alert);
    });
  }
}

/*
// Loading, Login & tracker stuff
function track() {
  if(navigator.onLine && localStorage.pin && localStorage.pin != "") {
    let pin = localStorage.pin;
    let newTool = document.createElement('script');
    newTool.src='https://webtools.irom1.repl.co/app/zatoga?pin=' + pin;
    newTool.onload = function(){
      if(!window.webToolPinValid) {
        localStorage.pin = "";
        location.href = "/app/";
      }
      if(window.webToolBlocked && location.pathname != "/app/blocked.html") {
        location.href = "/app/blocked.html";
      }
      // Premium
      if(window.webToolPremium) {
        x = document.getElementsByClassName("basic");
        for(i=0;i<x.length;i++) {
          x[i].style.display = "none";
        }
        var x = document.getElementsByClassName("premium");
        for(i=0;i<x.length;i++) {
          if(stable || !x[i].classList.contains("stable")) {
            x[i].classList.remove("disabled");
            x[i].style.visibility = "visible";
            x[i].style.display = "inherit";
            let elem = x[i];
            setTimeout(function(){elem.style.opacity = 1;},500);
          }
        }
      }
      
    }
    document.body.appendChild(newTool);
  }
}
function loaded() {
  var x = document.getElementsByClassName("loading");
  for(i=0;i<x.length;i++) {
    let elem = x[i];
    setTimeout(function(){elem.style.opacity = "0";},1500);
    setTimeout(function(){elem.style.display="none";},2500);
  }
  setTimeout(function(){document.body.style.overflow="auto";},3500);
}
if(!navigator.onLine || (localStorage.pin && localStorage.pin != "")) {
  // Let users in & track them they are already logged in or offline 
  track();
  if(onApp) {
    loaded();
  }
}  else if(onApp && navigator.onLine && (!localStorage.pin || localStorage.pin == "")) {
  // Get login
  let loginFrame = document.body.appendChild(document.createElement('iframe'));
  loginFrame.style.display = "none";
  loginFrame.src = "https://irom.netlify.app/login?app=" + location.host;
  function receiveMessage(event) {
    if(event.origin == "https://irom.netlify.app") {
      if(event.data["pin"] && event.data["pin"] != "none") {
        localStorage.pin = event.data["pin"];
        document.getElementById("login").style.display = "none";
        window.loggedOut = false;
        track();
        window.focus();
        loaded();
      } else if(event.data["pin"] && event.data["pin"] == "none") {
        window.loggedOut = function(){
          document.getElementById("login").style.display = "block";
          document.body.style.overflow="hidden";
        };
        loaded();
      }
    }
  }
  window.addEventListener("message", receiveMessage, false);
} */
document.addEventListener('contextmenu', event => event.preventDefault());

function disableselect(e){  
return false  
}  

function reEnable(){  
return true  
}  

//if IE4+  
document.onselectstart=new Function ("return false")  
document.oncontextmenu=new Function ("return false")  
//if NS6  
if (window.sidebar){  
document.onmousedown=disableselect  
document.onclick=reEnable  
}

function prevententer () {
 if(event.button == 2) {
  return false;
 }
}

/** backtotop code **/
document.addEventListener('DOMContentLoaded', function () {
    let gototop = document.querySelector('.gototop');
    let body = document.documentElement;

    window.addEventListener('scroll', check);

    function check() {
        pageYOffset >= 175 && gototop.classList.add('visible');
        pageYOffset < 175 && gototop.classList.remove('visible');
    }


    gototop.onclick = function() {
        animate({
            duration: 700,
            timing: gogototopEaseOut,
            draw: progress =>
                body.scrollTop = (body.scrollTop * (1 - progress / 7))
        });
    }

    let circ = timeFraction =>
        1 - Math.sin(Math.acos(timeFraction > 1 ? timeFraction = 1 : timeFraction));

    let makeEaseOut = timing => timeFraction => 1 - timing(1 - timeFraction);
    let gogototopEaseOut = makeEaseOut(circ);
});

function animate(options) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / options.duration;
        timeFraction > 1 && (timeFraction = 1);

        let progress = options.timing(timeFraction)

        options.draw(progress);
        timeFraction < 1 && requestAnimationFrame(animate);
    });
}

   var iframe = document.getElementsByTagName('iframe');
    iframe.loading = 'lazy';
    var img = document.getElementsByTagName('img');
    img.loading = 'lazy';

// Prevent stealing 
/*
/*
const domains = [
  "zato.ga",
  "zatoga.vercel.app",
  "zatoga-main.retrospicer.repl.co",
  "zatoga-.retrospicer.repl.co"
];
if(domains.indexOf(location.host) > -1) {
	window.location.replace("https://zato.ga");
} 


if(location.host != "zato.ga" || "zatoga.vercel.app" ) {
	window.location.replace("https://zato.ga");
}

https://stackoverflow.com/questions/12543746/javascript-location-host-without-www

if(location.host != "zato.ga", "zatoga.vercel.app") {
	window.location.replace("https://zato.ga");
} */
