import React, { Component } from 'react';

class CampsiteInfo extends Component {
  //Task 1: Checking to see if campsite is evaluated as truthy/falsy (logic)
  //If statement will return empty <div> w/bootrap row if truthy and falsy will return empty <div>
  render() {
    if(this.props.campsite){
      return (
        <div className='row'>

        </div>
      );
    } else {
      return (
        <div>

        </div>
      );
    }
  }
}

export default CampsiteInfo;