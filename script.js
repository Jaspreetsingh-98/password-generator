const passwordShow = document.querySelector("[data-passwordShow]");
const copyImg = document.querySelector("[data-copyImg]");
const copyMsg = document.querySelector("[data-copyMsg]");
const passwordLength = document.querySelector("[data-passwordLength]");
const sliderHandel = document.querySelector("[data-sliderHandel]");
const upperCaseletter = document.querySelector("[data-upperCaseletter]");
const lowerCaseletter = document.querySelector("[data-lowerCaseletter]");
const numberBox = document.querySelector("[data-numberBox]");
const symbolBox = document.querySelector("[data-symbolBox]");
const colorStrenght = document.querySelector("[data-colorStrenght]");
const passwordGenrator = document.querySelector("[data-passwordGenrator]");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");
const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passLength = 10;
let checkcount = 0;
handslider();
setindicator("#ccc");

function handslider() {
  sliderHandel.value = passLength;
  passwordLength.innerText = passLength;
  const min = sliderHandel.min;
  const max = sliderHandel.max;
  sliderHandel.style.backgroundSize =
    ((passLength - min) * 100) / (max - min) + "% 100%";
}

function setindicator(color) {
  colorStrenght.style.background = color;
  colorStrenght.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getrandomint(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getrandomnum() {
  return getrandomint(0, 9);
}
function getrandomuppercase() {
  return String.fromCharCode(getrandomint(97, 123));
}
function getrandomlowercase() {
  return String.fromCharCode(getrandomint(65, 91));
}
function getrandomsymbol() {
  const randomint = getrandomint(0, symbol.length);
  return symbol.charAt(randomint);
}

function calcstrength() {
  let upperbox = false;
  let lowerbox = false;
  let numbox = false;
  let symbbox = false;

  if (upperCaseletter.checked) upperbox = true;
  if (lowerCaseletter.checked) lowerbox = true;
  if (numberBox.checked) numbox = true;
  if (symbolBox.checked) symbbox = true;

  if (upperbox && (numbox || symbbox) && lowerbox && passLength >= 13) {
    setindicator("#0f0");
  } else if ((upperbox || lowerbox) && (numbox || symbbox) && passLength >= 8) {
    setindicator("#ff0");
  } else {
    setindicator("#f00");
  }
}

async function copycontent() {
  try {
    await navigator.clipboard.writeText(passwordShow.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "failed";
  }
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

function handelcheckbox() {
  checkcount = 0;
  allcheckBox.forEach((checkbox) => {
    if (checkbox.checked) checkcount++;
  });

  if (passLength < checkcount) {
    passLength = checkcount;
    handslider();
  }
}

function shufflepassword(array) {
  for (i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

allcheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handelcheckbox);
});

copyImg.addEventListener("click", () => {
  if (passwordShow.value) {
    copycontent();
  }
});

sliderHandel.addEventListener("input", (e) => {
  passLength = e.target.value;
  handslider();
});

passwordGenrator.addEventListener("click", () => {
  if (checkcount == 0) return;

  if (passLength < checkcount) {
    passLength = checkcount;
    handslider();
  }
  password = "";
  let passarr = [];

  if (upperCaseletter.checked) passarr.push(getrandomuppercase);
  if (lowerCaseletter.checked) passarr.push(getrandomlowercase);
  if (numberBox.checked) passarr.push(getrandomnum);
  if (symbolBox.checked) passarr.push(getrandomsymbol);

  for (let i = 0; i < passarr.length; i++) {
    password += passarr[i]();
  }

  for (let i = 0; i < passLength - passarr.length; i++) {
    let randomindex = getrandomint(0, passarr.length);
    password += passarr[randomindex]();
  }
  password = shufflepassword(Array.from(password));
  passwordShow.value = password;

  calcstrength();
});
