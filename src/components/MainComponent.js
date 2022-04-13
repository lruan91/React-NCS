import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CAMPSITES } from '../shared/campsites';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
    };
  }

  //Locally Scoped -This component is being defined inside of the main component so it's only accessible inside the main component 
  render() {
    const HomePage = () => {
      return (
        <Home />
      );
    }

    //Any routing request will go through the switch component until it finds a matching route
    //If there are none, it will end up at the redirect component - goes to home
    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites}/> } />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  };
}

export default Main;
