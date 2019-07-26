/**
 * @author:lpf
 * @flow
 *
 **/
export const TypeInfo = {
  regular: "常规图表", // http://img.alicdn.com/tfs/TB1SQ6NJ7CWBuNjy0FaXXXUlXXa-270-160.png
  map: "地图", // http://img.alicdn.com/tfs/TB1yMfxXc4IxuRjHxuRXXb_jXXa-270-160.png
  text: "文本", // http://img.alicdn.com/tfs/TB1RSuyJuuSBuNjy1XcXXcYjFXa-270-160.png
  media: "媒体",// http://img.alicdn.com/tfs/TB1I93wJv5TBuNjSspmXXaDRVXa-270-160.png
};
type ComponentType = 'text' | 'map' | 'regular' | 'media';
export type Component = {
    id: string,
    type: ComponentType,
    resource: string,
    name: string,
    icon: string,
};
