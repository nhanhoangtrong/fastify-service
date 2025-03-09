function printNumber(num) {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
}

function formatVNDay(date = new Date()) {
  // Convert to +7 GTM
  const vnTime = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + 420 * 60 * 1000);
  return `${printNumber(vnTime.getHours())}:${printNumber(vnTime.getMinutes())}:${printNumber(vnTime.getSeconds())} ${vnTime.getDate()}/${
    vnTime.getMonth() + 1
  }/${vnTime.getFullYear()}`;
}

export { formatVNDay };
