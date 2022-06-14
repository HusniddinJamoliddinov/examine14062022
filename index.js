const min = document.querySelector(".min");
const sec = document.querySelector(".sec");
const pomodoro = document.getElementById("pomodoro");
const short = document.getElementById("short");
const long = document.getElementById("long");
const timeDisplay = document.querySelector(".time-display");
const hero = document.querySelector(".hero");

const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");

let timer, m, s;
let count = 0;
m = +localStorage.getItem("min");
s = +localStorage.getItem("sec");
let isWork = localStorage.getItem("isWork");

const tts = (x) => {
  if (x < 10) return "0" + x;
  else return x;
};

const changeUI = () => {
  min.innerHTML = tts(m);
  sec.innerHTML = tts(s);
  localStorage.setItem("sec", s);
  localStorage.setItem("min", m);
};
changeUI();

const start = () => {
  timer = setInterval(() => {
    s--;
    if (s == -1) {
      m--;
      s = 59;
    }
    if (m == -1) {
      if (isWork) {
        if(count == 3){
          m = 15;
          count = 0;
          long.classList.add("active");
        }else{
          m = 5;
          short.classList.add("active");
          count++;
        }
        pomodoro.classList.remove("active");
        timeDisplay.style.color = "#0f0";
        hero.style.backgroundColor = "#0f0";
      } else {
        m = 24;
        pomodoro.classList.add("active");
        short.classList.remove("active");
        long.classList.remove("active");
        timeDisplay.style.color = "#c44747";
        hero.style.backgroundColor = "#c44747";
      }
      isWork = !isWork;
      localStorage.setItem("isWork", !isWork);
    }
    changeUI();
  }, 1);
};

const pause = () => {
  clearInterval(timer);
};

const stop = () => {
  clearInterval(timer);
  m = 25;
  s = 0;
  timeDisplay.style.color = "#c44747";
  hero.style.backgroundColor = "#c44747";
  pomodoro.classList.add("active");
  long.classList.remove("active");
  short.classList.remove("active");
  pauseBtn.classList.add("hide");
  startBtn.classList.remove("hide");
  changeUI();
};

startBtn.addEventListener("click", () => {
  start();
  startBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});

pauseBtn.addEventListener("click", () => {
  pause();
  pauseBtn.classList.add("hide");
  startBtn.classList.remove("hide");
});

stopBtn.addEventListener("click", ()=>{
  stop();
})

