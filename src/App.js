// @flow
import React from 'react';
import './App.scss';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from "react-dnd";
import { Header, Editor, ConfigManager, ComponentList } from './DashBoard';
function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
          <div className="datav-header">
              <Header />
          </div>
          <div className="datav-editor-containers">
              <div className="datav-components">
                  <ComponentList />
              </div>
              <div className="datav-editor">
                  <Editor />
              </div>
              <div className="datav-config-manager">
                  <ConfigManager />
              </div>
          </div>
      </DndProvider>
    </div>
  );
}
const config = { a:1, b: 2};
export default App;
export { config };
