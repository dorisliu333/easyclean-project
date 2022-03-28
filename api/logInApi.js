import requestApi from './fetchDetails';
import errorSimplify from './errorSimplify';
import extractUserData from './extractUserData';

export default function logInApi(data, logInSuccess, logInFail) {
  requestApi
    .post(`/auth`, data)
    .then((res) => {
      logInSuccess(extractUserData(res));
    })
    .catch((err) => {
      logInFail(errorSimplify(err));
    });
}
