export default function errorSimplify(err) {
  return (
    (err.response && err.response.data) ||
    (err.request && err.request.data) ||
    (err.message && err.message.data) ||
    (err.config && err.config.data) ||
    'Un-Expected Error'
  );
}
