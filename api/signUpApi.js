import requestApi from './fetchDetails';
import errorSimplify from './errorSimplify';
import extractUserData from './extractUserData';

export default function signUpApi(data, signUpSuccess, signUpFail) {
  requestApi
    .post(`/users`, data)
    .then((res) => {
      signUpSuccess();
    })
    .catch((err) => {
      signUpFail(errorSimplify(err));
    });
}
