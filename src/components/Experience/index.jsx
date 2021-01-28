import React from "react";
import Edit from "../EditExp";
import { Button, Card, Col, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BiPencil } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Route } from "react-router-dom";
import moment from "moment";
import "./styles.css";
class Experience extends React.Component {
  state = {
    showModal: false,
    experiences: [],
    selectedId: null,
    // method: null,
    exp: {},
  };
  // re-order
  grid = 8;

  getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: this.grid * 2,
    margin: `0 0 ${this.grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.experiences,
      result.source.index,
      result.destination.index
    );

    this.setState({
      experiences: items,
    });
  };
  getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: this.grid,
    width: 250,
  });

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  searchExp = async () => {
    await fetch(
      `${process.env.REACT_APP_API_URL}/experiences/${this.props.profile.username}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: "Basic " + localStorage.getItem("token"),
          ContentType: "application/json",
        }),
      }
    )
      .then((response) => response.json())
      .then((experiences) => {
        this.setState({ experiences: experiences });
      });
  };
  componentDidMount = () => {
    this.searchExp();
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.profile._id !== this.props.profile._id) {
      this.searchExp();
    }
  };
  toggleModal = (job) => {
    job !== undefined
      ? this.setState({
          selectedId: job._id,
          showModal: !this.state.showModal,
        })
      : this.setState({
          selectedId: null,
          showModal: !this.state.showModal,
        });
  };

  render() {
    const { experiences } = this.state;
    return (
      <>
        <Card className="bio cardProf mt-2">
          <Card.Body>
            <Row className="d-flex justify-content-between ml-1">
              <div id="expTitle" className="info">
                Experience
              </div>
              <Route path="/user/me">
                <BsPlus
                  className="expIcons"
                  onClick={() => this.toggleModal()}
                />
                <Edit
                  show={this.state.showModal}
                  userId={this.props.profile._id}
                  expId={this.state.selectedId}
                  toggle={() => this.toggleModal()}
                  refetch={() => this.searchExp()}
                  color="#0A66CE"
                  profile={this.props.profile}
                />
              </Route>
            </Row>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {experiences.length > 0 &&
                      experiences.map((experience, index) => (
                        <Draggable
                          key={experience._id}
                          draggableId={experience._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Row
                                noGutters
                                className="justify-content-between"
                              >
                                <div className="expRow">
                                  <img
                                    src={experience.image}
                                    alt=""
                                    className="expImg"
                                  />
                                  <ul id={experience._id} className="exp">
                                    <li className="roleExp">
                                      {experience.role}
                                    </li>
                                    <li className="workplaceExp">
                                      {experience.company}
                                    </li>
                                    <li className="timeExp">
                                      {moment(experience.startDate).format(
                                        "MM/YYYY"
                                      ) +
                                      " - " +
                                      experience.endDate
                                        ? moment(experience.endDate).format(
                                            "MM/YYYY"
                                          )
                                        : "Current"}
                                    </li>
                                    <li className="cityExp">
                                      {experience.area}
                                    </li>
                                    <li className="descExp">
                                      {experience.description}
                                    </li>
                                  </ul>
                                </div>
                                <Route path="/user/me">
                                  <BiPencil
                                    className="expIcons"
                                    onClick={() => this.toggleModal(experience)}
                                  />
                                </Route>
                              </Row>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Card.Body>
        </Card>
      </>
    );
  }
}
export default Experience;
