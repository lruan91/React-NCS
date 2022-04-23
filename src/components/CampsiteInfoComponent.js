import React, { Component }  from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
  Button, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';

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
      this.state={
        rating: '',
        author: '',
        text: '',
      isModalOpen: false,
      touched: {
        rating: false,
        author: false,
        text: false
      }
      };
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
    }

    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }
    

    render() {
      return (
        <>
          <Button outline className='fa-lg'>
            <i className="fa fa-pencil"> Submit Comment</i>
          </Button>
          {/* Week 4 Task 2: Setting up a modal with author, text and textarea */}
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                  <div className='form-group'>
                    <Label htmlFor="rating" md={5}>Rating</Label>
                      <Control.select model='.rating' id='rating' name='rating'
                        className='form-control'>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                      </Control.select>
                  </div>
                  <div className='form-group'>
                    <Label htmlFor="author" md={5}>Your Name</Label>
                      <Control.text model='.author' id='author' name='author'
                        placeholder='Your Name'
                        className='form-control'
                      />
                  </div>
                  <div className='form-group'>
                    <Label htmlFor="text" md={2}>Comment</Label>
                      <Control.textarea model='.text' id='text' name='text'
                        className='form-control' rows='6' />
                  </div>
                  <Button type="submit" value="submit" color="primary">Submit</Button>
                </LocalForm>
              </ModalBody>
          </Modal>
        </>
      )
    }
  }
  
export default CampsiteInfo;