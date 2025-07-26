import { Component } from 'react';
class Clock extends Component {
  constructor(props) {
    super(props);
  }
  componentWillUnmount() {
    console.log('⛔ Clock Unmounted');
  }
  render() {
    const { date } = this.props;
    return (
      <div style={{ color: 'white', fontSize: '1.5rem' }}>
        {date.toLocaleTimeString()}
      </div>
    );
  }
}
export default Clock;
