export function replacePathParams(path: any, newData: any) {
  let newPath = path;
  console.log('show old path', path);
  console.log('show newdata', newData);
  Object.keys(newData).forEach((it) => {
    newPath = newPath.replace(`:${it}`, newData[it]);
    console.log('show newPath', newPath);
  });
  return newPath;
}
