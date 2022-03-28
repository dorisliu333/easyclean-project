const size = {
  sm: '520px',
  ml: '767px',
};
const device = {
  xs: `(max-width: ${size.sm})`,
  sm: `(min-width: ${size.sm})`,
  ml: `(max-width: ${size.ml})`,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { size, device };
