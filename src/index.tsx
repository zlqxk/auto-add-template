import React, { useState, ReactNode, FC } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
// script_start
import ReactChild from './components/ReactChild/index';
import clone from './components/clone/index';
const componentMap = [
{lable: 'ReactChild', value: ReactChild},
{lable: 'clone', value: clone},
]
// script_end
const App: FC = props => {
  const [nodeState, setNodeState] = useState<ReactNode>(null)
  const renderNode = (ReactChild: ReactNode) => {
    setNodeState(ReactChild)
  };
  return (
    <div className="app">
      <div className="app-menu">
        {Array.isArray(componentMap) && componentMap.map(item => (
          <React.Fragment key={item.lable}>
            <p onClick={() => renderNode(item.value)}>{item.lable}</p>
            <hr />
          </React.Fragment>
        ))}
      </div>
      <div className="app-content">
        {nodeState}
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
