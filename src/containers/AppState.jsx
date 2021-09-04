import React from 'react';
import That from './That';
import Leaderboard from './Leaderboard';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Connect from '../components/Connect';

class AppState extends React.Component {

  constructor(props) {
    super();
    this.state = {
      address: undefined,
    };
  }

  addressUpdated = (address) => {
    this.setState({
      address: address
    });
  }

  render() {

    const { address } = this.state;
    return (
      <div>
       <Connect addressUpdate={(address) => this.addressUpdated(address)}/>
       <Switch>
         <Route path='/' component={() => <That address={address} />} exact />
         <Route path='/nouns/leaderboard' component={Leaderboard} exact />
       </Switch>
      </div>
    )
  }
}

export default AppState;
