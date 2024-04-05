'use strict';

const acceptButton = document.querySelector('.accept-button');
const settingsButton = document.querySelector('.settings-button');
const checkboxOne = document.querySelector('.custom-check-one');
const checkboxTwo = document.querySelector('.custom-check-two');
const checkboxThree = document.querySelector('.custom-check-three');
const checkboxFour = document.querySelector('.custom-check-four');
const saveButton = document.querySelector('.save-preference-button');
const dialogOne = document.querySelector('.custom-dialog-one');
const dialogTwo = document.querySelector('.custom-dialog-two');
const saveBtn = document.querySelector('.save-preferences');


if (navigator.cookieEnabled && document.cookie) {
  console.log('Cookies are enabled and cookies are stored');
  printCookies();
} else {
  console.log('Cookies are not enabled or cookies not found');
  setTimeout(() => {
    dialogOne.showModal();
  }, 2000);
}

function printCookies() {
  if (document.cookie.length > 0) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      console.log(
        decodeURIComponent(cookies[i].split('=')[0]) + ': ' +
        decodeURIComponent(cookies[i].split('=')[1])
      );
    }
  } else {
    console.log('No cookies found');
  }
}

function getBrowserName() {
  const userAgent = navigator.userAgent;
  let browserName;

  switch (true) {
    case userAgent.indexOf("Firefox") !== -1:
      browserName = "Mozilla Firefox";
      break;
    case userAgent.indexOf("Opera") !== -1 || userAgent.indexOf("OPR") !== -1:
      browserName = "Opera";
      break;
    case userAgent.indexOf("Trident") !== -1 || userAgent.indexOf("MSIE") !== -1:
      browserName = "Microsoft Internet Explorer";
      break;
    case userAgent.indexOf("Edge") !== -1:
      browserName = "Microsoft Edge";
      break;
    case userAgent.indexOf("Chrome") !== -1:
      browserName = "Google Chrome";
      break;
    case userAgent.indexOf("Safari") !== -1:
      browserName = "Apple Safari";
      break;
    default:
      browserName = "unknown";
  }

  return browserName;
}

function getOSName() {
  const userAgent = navigator.userAgent;
  let osName = "unknown";
  if (userAgent.indexOf("Win") !== -1) {
    osName = "Windows";
  } else if (userAgent.indexOf("Mac") !== -1) {
    osName = "MacOS";
  } else if (userAgent.indexOf("X11") !== -1) {
    osName = "UNIX";
  } else if (userAgent.indexOf("Linux") !== -1) {
    osName = "Linux";
  }
  return osName;
}

const screenWidth = (screen.width).toString();
const screenHeight = (screen.height).toString();

function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    SameSite: 'Lax',
    ...options
  };

  const keys = Object.keys(options);
  const values = Object.values(options);

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let i = 0; i < keys.length; i++) {
    updatedCookie += `; ${keys[i]}=${values[i]}`;
  }
  document.cookie = updatedCookie;
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
  setCookie(name, '', { 'max-age': -1 });
}

let browser = getBrowserName();
let system = getOSName();

const date = new Date();
date.setSeconds(date.getSeconds() + 15);

acceptButton.addEventListener('click', () => {
  setCookie('Browser', browser, { 'expires': date });
  setCookie('operatingSystem', system, { 'expires': date });
  setCookie('screenWidth', screenWidth, { 'expires': date });
  setCookie('screenHeight', screenHeight, { 'expires': date });

  console.log('Cookies saved successfully');

  console.log(`Browser:` + getCookie('Browser'));
  console.log(`Operating system:` + getCookie('operatingSystem'));
  console.log(`Screen width: ` + getCookie('screenWidth'));
  console.log(`Screen height:` + getCookie('screenHeight'));
  dialogOne.close();
});

settingsButton.addEventListener('click', () => {
  dialogOne.close();
  dialogTwo.showModal();
});

saveBtn.addEventListener('click', () => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + 15);

  if (!checkboxOne.checked && !checkboxTwo.checked && !checkboxThree.checked && !checkboxFour.checked) {
    setCookie('Browser', null, { 'expires': date });
    setCookie('operatingSystem', null, { 'expires': date });
    setCookie('screenWidth', null, { 'expires': date });
    setCookie('screenHeight', null, { 'expires': date });
  } else {
    if (checkboxOne.checked) 
    { setCookie('Browser', browser, { 'expires': date }); }
    if (checkboxTwo.checked) 
    { setCookie('operatingSystem', system, { 'expires': date }); }
    if (checkboxThree.checked) 
    { setCookie('screenWidth', screenWidth, { 'expires': date }); }
    if (checkboxFour.checked) 
    { setCookie('screenHeight', screenHeight, { 'expires': date }); }
  }

  console.log(`Browser: ` + getCookie('Browser'));
  console.log(`Operating system: ` + getCookie('operatingSystem'));
  console.log(`Screen width: ` + getCookie('screenWidth'));
  console.log(`Screen height: ` + getCookie('screenHeight'));
  dialogTwo.close();
});

dialogOne.addEventListener('click', function (e) {
  const rect = this.getBoundingClientRect();

  if (e.clientY < rect.top || e.clientY > rect.bottom ||
    e.clientX < rect.left || e.clientX > rect.right) {
    dialogOne.close();
  }
});

dialogTwo.addEventListener('click', function (e) {
  const rect = this.getBoundingClientRect();

  if (e.clientY < rect.top || e.clientY > rect.bottom ||
    e.clientX < rect.left || e.clientX > rect.right) {
    dialogTwo.close();
  }
});
