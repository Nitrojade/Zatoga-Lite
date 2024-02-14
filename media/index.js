// Array of games for homepage to scroll over
const games = [ "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers", "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers", "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Geometry Dash", "Moto X3M", "Slope", "Vex 5", "Free Games", "Temple Run 2", "Minecraft", "2048 Game", "Subway Surfers",  "Zatoga Games" ];
// When homepage game scroll is done, it sets to "Play over (max_games_num)+ games"
const max_games_num = 150;

// Can use in an async function (await sleep())
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Handles games scroll on homepage (Play _____)
async function home_scroll_games() {
    let game = document.getElementById("home-game-scroll-item");
    // Text that $game is set to at the end of scroll
  //  let end = `Over ${max_games_num}+ Games`;
  let end = `Unblocked Games `;
    // Makes sure the bottom border only is big enough to contain the longest text that will appear on it
    game.style.width = Math.max(...[
        games
            .map(value => value.length)
            .reduce((prev, curr) => curr > prev ? curr : prev),
        end.length,
    ]) + "ex";
    // Defines the equation for the scroll time, default is just y=600
    // y = time spent on each item in ms, x = index of item
    const home_scroll_curve = (x) => 600;
    for (let i=0; i<games.length; ++i) {
        game.innerHTML = games[i];
        await wait(home_scroll_curve(i));
    }
    game.innerText = end;
}


function play() {
  document.querySelector('nav img.green').classList.remove("green");
  document.querySelector('#home-section').style.display = "none";
  document.querySelector('#home').style.display = "none";
  document.querySelector('#content').style.display = "block";
  document.querySelector('#search input').focus();
  document.querySelector('#play-button').style.display = "none";
  document.querySelector('#close-button').style.display = "block";
}


window.addEventListener("load",function(){
  /* Run Startup Functions */
  //setTimeout(function(){window.scrollTo(0,0);},1);
  home_scroll_games();

  /* Run Connection Test */
  let test = document.getElementById("connection");
  test.classList.add("show");
  function showResult(value) {
    if(value) {
      test.classList.add("complete");
      setTimeout(function(){test.classList.remove("show");},3000)
    } else {
      test.classList.add("failed");
    }
  }
  /* Only functioning as a demo */
  setTimeout(function(){showResult(true)},3000)
});