import React, { Component } from "react";
import { Button, Image, Card, Col, Row } from "react-bootstrap";
import {
  BiLike,
  BiCommentDetail,
  BiShare,
  BiSend,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import { IconContext } from "react-icons";
import moment from "moment";
import "./styles.css";
export default class FeedCard extends Component {
  render() {
    const { post } = this.props;
    return (
      <div>
        <Card className="w-100 my-2 feedCard" key={`feed${post._id}`}>
          <Card.Header className="d-flex justify-content-between px-3">
            <Row className="ml-1">
              <Image
                src={post.user.image}
                className="feedcardAvatar mr-3 align-self-center"
                roundedCircle
              />
              <Col className="">
                <Row className="mb-0 feedcardName">
                  {post.user.name + " " + post.user.surname}
                </Row>
                <Row className="mb-0 feedcardInfo">{post.user.title}</Row>
                <Row className="mb-0 feedcardInfo">
                  {moment(post.createdAt).fromNow()}
                </Row>
              </Col>
            </Row>
            {/* TODO if user = me */}
            <div onClick={this.props.toggle} className="JumbBiPencilDiv">
              <IconContext.Provider
                value={{
                  size: "24",
                  className: "JumbBiPencil",
                }}
              >
                <BiDotsHorizontalRounded />
              </IconContext.Provider>
            </div>
          </Card.Header>
          {post.image && (
            <Card.Img
              src={post.image}
              alt="PostImage"
              className="feedcardImg"
            />
          )}
          <Card.Text className="p-3">{post.text}</Card.Text>
          <Card.Footer className="cardFooter bg-white">
            <Button variant="none">
              <BiLike size="24" style={{ transform: "scaleX(-1)" }} /> Like
            </Button>
            <Button variant="none">
              <BiCommentDetail size="24" style={{ transform: "scaleX(-1)" }} />{" "}
              Comment
            </Button>
            <Button variant="none">
              <BiShare size="24" style={{ transform: "scaleX(-1)" }} /> Share
            </Button>
            <Button variant="none">
              <BiSend size="24" /> Send
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}