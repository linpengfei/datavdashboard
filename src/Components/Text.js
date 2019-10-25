/**
 * @author:lpf
 * @flow
 *
 **/
import React from 'react';

type Props = {
    title: string,
};

function text(props: Props) {
    return <div style={{ backgroundColor: 'rgb(255,255,255)'}}>
        {props.title}
    </div>
}
const config = {
  style: {
    width: 100,
    height: 50,
  }
};
export default text;
export { config };
