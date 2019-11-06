/**
 * @author:lpf
 * @flow
 *
 **/
import {Subject, Subscription} from 'rxjs';

const subject = new Subject<{ type: 'string', data: Object }>();

function emit(data: Object): void {
  console.log('propsName:', data);
  subject.next(data);
}

function on(fn: Function | Object): Subscription {
  return subject.asObservable().subscribe(fn);
}

export default { emit, on };