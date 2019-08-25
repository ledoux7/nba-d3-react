import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      foo: '',
      bar: '',
      baz: '',
      json: {   a: 'adv',
                b: '',
                c: ''}
    };
  }

  handleChange = e => {
    const {name, value} = e.target;

    this.setState(() => ({
      [name]: value
    }))


    
  }

  handleSubmit = e => {
    e.preventDefault();
    const {foo, bar, baz} = this.state;
    this.setState(() => ({
      status: `Submitted Foo: ${foo}, Bar: ${bar}, Baz: ${baz}. asd: ${this.state.json.a}`
    }))
  }

  render() {

    const {foo, bar, baz, status} = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Foo:
          <input onChange={this.handleChange} name="foo" value={foo} />
          <br />
          Bar:
          <input onChange={this.handleChange} name="bar" value={bar} />
          <br />
          Baz:
          <input onChange={this.handleChange} name="baz" value={baz} />
          <br />
          <input type="submit" value="submit" />
        </form>
        {status && <div>{status}</div>}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
