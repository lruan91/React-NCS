import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class CampsiteInfo extends Component {
  
  //Task 2: Moved card code from directory to here
  renderCampsite(campsite) {
    return(
      <div className='col-md-5 m-1'>
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardTitle>{campsite.name}</CardTitle>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    )
  }
  
  //Task 1: Checking to see if campsite is evaluated as truthy/falsy (logic)
  //If statement will return empty <div> w/bootrap row if truthy and falsy will return empty <div>

  //Task 2: Calling renderCampsite: The campsite will appear below the 4 cards with an img+description
  render() {
    if(this.props.campsite){
      return (
        <div className='row'>
          {this.renderCampsite(this.props.campsite)}
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