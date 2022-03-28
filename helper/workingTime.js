const workingTime = (index) => {
  const workingTimes = [
    'Any time',
    'Any time',
    '6:00 ~ 10:00',
    '10:00 ~ 14:00',
    '14:00 ~ 18:00',
    '18:00 ~ 22:00',
  ];
  if (index < 0 || index > workingTimes.length) {
    return 'Any time';
  }
  return workingTimes[index];
};

export default workingTime;
