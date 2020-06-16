export const formatTime = (time) => {
  const createTime = new Date(time);

  const year = createTime.getFullYear();
  const month = createTime.getMonth() + 1;
  const date = createTime.getDate();

  const hour = createTime.getHours() < 10 ? `0${createTime.getHours()}` : createTime.getHours();
  const minutes = createTime.getMinutes() < 10 ? `0${createTime.getMinutes()}` : createTime.getMinutes();
  const seconds = createTime.getSeconds() < 10 ? `0${createTime.getSeconds()}` : createTime.getSeconds();

  return `${month}.${date}.${year} @ ${hour}:${minutes}:${seconds}`
}