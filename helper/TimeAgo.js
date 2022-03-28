// a function to calculate time ago since now
const TimeAgo = (time) => {
  const currentTime = new Date().getTime();
  const prevTime = Date.parse(time);
  // Convert to a positive integer
  const timeDiff = Math.abs(currentTime - prevTime);
  let humanTime;
  let units;

  // if there are years
  if (timeDiff > 1000 * 60 * 60 * 24 * 365) {
    humanTime = parseInt(timeDiff / (1000 * 60 * 60 * 24 * 365), 10);
    units = 'years';
  }

  // if there are months
  else if (timeDiff > 1000 * 60 * 60 * 24 * 30) {
    humanTime = parseInt(timeDiff / (1000 * 60 * 60 * 24 * 30), 10);
    units = 'months';
  }

  // if there are weeks
  else if (timeDiff > 1000 * 60 * 60 * 24 * 7) {
    humanTime = parseInt(timeDiff / (1000 * 60 * 60 * 24 * 7), 10);
    units = 'weeks';
  }

  // if there are days
  else if (timeDiff > 1000 * 60 * 60 * 24) {
    humanTime = parseInt(timeDiff / (1000 * 60 * 60 * 24), 10);
    units = 'days';
  }

  // if there are hours
  else if (timeDiff > 1000 * 60 * 60) {
    humanTime = parseInt(timeDiff / (1000 * 60 * 60), 10);
    units = 'hours';
  }
  // if there are minutes
  else if (timeDiff > 1000 * 60) {
    humanTime = parseInt(timeDiff / (1000 * 60), 10);
    units = 'minutes';
  }
  // otherwise, use seconds
  else {
    humanTime = parseInt(time / 1000, 10);
    units = 'seconds';
  }

  return `${humanTime} ${units} ago`;
};

export default TimeAgo;
