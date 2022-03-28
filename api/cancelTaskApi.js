import requestApi from './fetchDetails';

export default function taskCancelApi(taskId, cancelTaskSuccess, cancelTaskError) {
  requestApi
    .delete(`/tasks/${taskId}`)
    .then((res) => {
      if (cancelTaskSuccess != null) {
        cancelTaskSuccess(res.data);
      }
    })
    .catch((err) => {
      if (cancelTaskError != null) {
        cancelTaskError(err);
      }
    });
}
