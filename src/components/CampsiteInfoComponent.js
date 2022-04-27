import React, { Component }  from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
  Button, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

  //Week 4 Task 3: Validation
  // Making sure the length is no less than 2, or greater than 15 letters
  const required = val => val && val.length;                                        
  const maxLength = len => val => !val || (val.length <= len);
  const minLength = len => val => val && (val.length >= len);

  //Task 2: Moved card code from directory to here
  function RenderCampsite({campsite}) {
    return(
      <div className='col-md-5 m-1'>
        <Card>
          <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
          <CardBody>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  //Task 3: A description will appear on the right side of the description card once rendered
  function RenderComments({comments, postComment, campsiteId}) {
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
          <CommentForm campsiteId={campsiteId} postComment={postComment}/>
        </div>
      );
    }
    return <div />
  }

  //Task 1: Checking to see if campsite is evaluated as truthy/falsy (logic)
  //If statement will return empty <div> w/bootrap row if truthy and falsy will return empty <div>

  //Task 2: Calling renderCampsite: The campsite will appear below the 4 cards with an img+description
  function CampsiteInfo(props) {
    if(props.isLoading) {
      return (
        <div className='container'>
          <div className='row'>
            <Loading />
          </div>
        </div>
      );
    }
    if(props.errMess) {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h4>{props.errMess}</h4>
            </div>
          </div>
        </div>
      );
    }
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
            <RenderComments 
            comments={props.comments}
            postComment={props.postComment}
            campsiteId={props.campsite.id}
            />
          </div>
        </div>
      );
    } 
    return <div />
  }

  //Week 4 Task 1: Created a CommentForm class comp. with a button
  class CommentForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        rating: '',
        author: '',
        text: '',
        isModalOpen: false,
        touched: {
          author: false
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
    handleSubmit(values) {
      this.toggleModal();
      this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {
      return (
        <>
          <Button outline onClick={this.toggleModal} className='fa-lg'>
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
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Control.select>
                  </div>
                  <div className='form-group'>
                    <Label htmlFor="author" md={5}>Your Name</Label>
                      <Control.text model='.author' id='author' name='author'
                        placeholder='Your Name'
                        className='form-control'
                        validators={{
                          required,
                          minLength: minLength(2),
                          maxLength: maxLength(15)
                        }}
                      />
                      <Errors
                        className='text-danger'
                        model='.author'
                        show='touched'
                        component='div'
                        messages={{
                          required: 'Required',
                          minLength: 'Must be at least 2 characters',
                          maxLength: 'Must be 15 characters or less'
                      }}
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