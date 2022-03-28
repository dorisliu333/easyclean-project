export default function extractUserData(res) {
  return {
    // eslint-disable-next-line no-underscore-dangle
    id: res.data.user._id,
    userName: res.data.user.username,
    postCode: res.data.user.postcode,
    eMail: res.data.user.email,
    tasks: res.data.user.tasks,
    userType: res.data.user.Type,
  };
}
