// @flow
import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Redirect, Route} from "react-router-dom";
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from "react-dnd";
import { Header, Editor, ConfigManager, ComponentList } from './DashBoard';
import Project from './Project';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/dashboard/:id">
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
          </Route>
          <Route path="/">
            <Project />
          </Route>
          <Redirect to="/"/>
        </Switch>
      </div>
    </Router>
  );
}
const config = { a:1, b: 2};
export default App;
export { config };
