/**
 * @author:lpf
 * @flow
 *
 **/
let cbMap = new Map<string, Function>();
onmessage = function(event) {
  console.log(event.data);
  const { type, id, data } = event.data;
  if(type === 'cb') {
    try {
      const cb = cbMap.get(id);
      if(cb) {
        const ret = cb(JSON.parse(data));
      }
      cb &&  cb()
    } catch(e) {}
  }
}
// console.log(self);
// console.log(postMessage);