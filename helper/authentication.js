import fetchDetails from '../api/fetchDetails';

export default function Authentication(jwt) {
  fetchDetails
    .get('/getUser', { headers: { authorization: `Bearer ${jwt}` } })
    .then((response) => response.data.id)
    .catch(() => '');
}