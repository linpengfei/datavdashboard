/**
 * @author:lpf
 * @flow
 * 组件工厂，抽象屏蔽组件来源
 **/
function ComponentsFactory() {
    this.componentList = new Map<string, Object>();
}
ComponentsFactory.prototype.getComponent = function (componentId) {
    const comp = this.componentList.get(componentId);
    if (comp) {
        return new Promise(function (resolve) {
            resolve(comp);
        });
    }
    switch(componentId) {
        case 'text':
            return import('../../Components/Text').then(app => {
                this.componentList.set(componentId, app);
                return app;
            });
       case 'regular':
       case 'line':  
         return import(/* webpackChunkName: "line" */ '../../Components/Line').then(app => {
           this.componentList.set(componentId, app);
           return app;
         });
      case 'gauge':
        return import(/* webpackChunkName: "Gauge" */ '../../Components/Gauge').then(app => {
          this.componentList.set(componentId, app);
          return app;
        });
      case 'selectLabel':
        return import(/* webpackChunkName: "SelectLabel" */ '../../Components/SelectLabel').then(app => {
          this.componentList.set(componentId, app);
          return app;
        });
        case 'map':
        default:
            return new Promise(function (resolve, reject) {
                reject('error');
            });
    }
};
ComponentsFactory.prototype.destory = function () {
    this.componentList.clear();
};
export default ComponentsFactory;
