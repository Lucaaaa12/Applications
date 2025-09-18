const decreasebtn = document.getElementById("decrement-button");
const increasebtn = document.getElementById("increment-button");
const resetbtn = document.getElementById("reset-button");
const counter = document.getElementById("count-label");
let count = 0;

decreasebtn.onclick = function () {
  count--;
  counter.textContent = count;
};

increasebtn.onclick = function () {
  count++;
  counter.textContent = count;
};

resetbtn.onclick = function () {
  count = 0;
  counter.textContent = count;
};
