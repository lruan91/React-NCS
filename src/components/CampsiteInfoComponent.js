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
  
  //Task 3: A description will appear on the right side of the description card
  renderComments(comments) {
    if(comments) {
      return (
        <div className='col-md-5 m-1'>
          <h4>Comments</h4>
          {comments.map(comment => <div key={comment.id}>{comment.text}<br />
          -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
            <div>
              {<br />}
            </div>
          </div>)}
        </div>
      )
    } else {
      return (
        <div>

        </div>
      );
    }
  }

  //Task 1: Checking to see if campsite is evaluated as truthy/falsy (logic)
  //If statement will return empty <div> w/bootrap row if truthy and falsy will return empty <div>

  //Task 2: Calling renderCampsite: The campsite will appear below the 4 cards with an img+description
  render() {
    if(this.props.campsite){
      return (
        <div className='row'>
          {this.renderCampsite(this.props.campsite)}
          {this.renderComments(this.props.campsite.comments)}
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