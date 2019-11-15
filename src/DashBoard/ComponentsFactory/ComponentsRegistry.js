/**
 * @author:lpf
 * @flow
 *
 **/
type Component = {
  id: string,
  type: string,
  resource: string,
  name: string,
  img: string,
};
const type = {
  normal: {
    name: '常规组件'
  },
  chart: {
    name: '图表'
  },
  map: {
    name: '地图'
  },
  media: {
    name: '多媒体'
  }
};
class ComponentsRegistry {
  constructor() {
    this.typeList = new Map<string, Object>();
    this.componentMap = new Map<string, Array<Component>>();
    const keys = Object.keys(type);
    keys.forEach(key => {
      this.typeList.set(key, type[key]);
      this.componentMap.set(key, []);
    })
  }
  registry(type, data) {
    let typeList = this.componentMap.get(type);
    if(!typeList) {
      throw new Error('unregistry type');
    }
    typeList.push(data);
  }
  getTypeList() {
    return Array.from(this.typeList.entries());
  }
  getComponents(type) {
    return this.componentMap.get(type) || [];
  }
}
const ComponentsRegistryInstance = new ComponentsRegistry();
export default ComponentsRegistryInstance;