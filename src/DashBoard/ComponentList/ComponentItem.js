/**
 * @author:lpf
 * @flow
 *
 **/
import React from 'react';
import type { Component } from '../../type';
import { DragSource } from 'react-dnd';
type Props = {
    info: Component,
    connectDragSource: Function,
};
function ComponentItem(props: Props) {
    const { info, connectDragSource } = props;
    // const [collectedProp, drag] = useDrag({ item: { id: info.id, type: 'component' }});
    return connectDragSource(<div className="component-item" key={info.id}>
        <img className="component-item" src={info.icon} alt=""/>
        <div className="component-name">{info.name}</div>
    </div>);
}
// export default ComponentItem;
const spec = {
    beginDrag: function(props, monitor, component) {
        console.log(component);
        return { id: props.info.id };
    },
    endDrag: function(props, monitor, component) {
        console.log('position:', monitor.getClientOffset());
        return { position: monitor.getClientOffset() };
    }
};
export default DragSource('create', spec,   (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(ComponentItem);
