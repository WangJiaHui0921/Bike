import React from 'react';
class App extends React.Component {
  render() {
    console.log(this.props.children);
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default App;
