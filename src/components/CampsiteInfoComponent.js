import React, { Component }  from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
  Button} from 'reactstrap';
import { Link } from 'react-router-dom';

  //Task 2: Moved card code from directory to here
  function RenderCampsite({campsite}) {
    return(
      <div className='col-md-5 m-1'>
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  //Task 3: A description will appear on the right side of the description card once rendered
  function RenderComments({comments}) {
    if(comments) {
      return (
        <div className='col-md-5 m-1'>
          <h4>Comments</h4>
          {comments.map(comment => {
            return(
              <div key={comment.id}>
                <p>
                  {comment.text}<br />
                  -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                </p>
                </div>
            );
          })}
          <CommentForm />
        </div>
      );
    }
    return <div />
  }

  //Task 1: Checking to see if campsite is evaluated as truthy/falsy (logic)
  //If statement will return empty <div> w/bootrap row if truthy and falsy will return empty <div>

  //Task 2: Calling renderCampsite: The campsite will appear below the 4 cards with an img+description
  function CampsiteInfo(props) {
    if(props.campsite){
      return (
        <div className='container'>
          <div className='row'>   
            <div className="col">
              <Breadcrumb>
                <BreadcrumbItem><Link to='/directory'>Directory</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
              </Breadcrumb>
                <h2>{props.campsite.name}</h2>
                <hr />
            </div>
          </div>
          <div className='row'>
            <RenderCampsite campsite={props.campsite} />
            <RenderComments comments={props.comments} />
          </div>
        </div>
      );
    } 
    return <div />
  }

  //Week 4 Task 1: Rendering CommentForm to display the button
  class CommentForm extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <>
          <Button outline className='fa-lg'>
            <i className="fa fa-pencil"> Submit Comment</i>
          </Button>
        </>
      )
    }
  }
  
export default CampsiteInfo;