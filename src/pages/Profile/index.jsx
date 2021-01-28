import React from "react";
import {
  Col,
  Row,
  Alert,
  Card,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { FadeLoader } from "react-spinners";
import Bio from "../../components/BioCard";
import Experience from "../../components/Experience";
import Feature from "../../components/Featured";
import Sidebar from "../../components/Sidebar";
import EditProfile from "../../components/EditProfile";
import "./styles.css";
import { BiPencil } from "react-icons/bi";
import { IconContext } from "react-icons";
import { Route } from "react-router-dom";
class Body extends React.Component {
  state = {
    profile: {},
    showAlert: null,
    err: false,
    errType: null,
    errMsg: "",
    loading: true,
    myquery: this.props.query,
  };
  searchProfile = (id) => {
    let userId = "";
    this.props.match.params.id === "me" ||
    this.props.location.pathname === "/user/me"
      ? (userId = localStorage.getItem("id"))
      : (userId = id);
    fetch(`${process.env.REACT_APP_API_URL}/profiles/${userId}`, {
      method: "GET",
      headers: new Headers({
        // Authorization: "Basic " + localStorage.getItem("token"),
        ContentType: "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((info) => {
        let profile = { ...info };
        console.log(profile);
        this.setState({ profile: profile, loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
          err: true,
          errType: "danger",
          errMsg: error.messasge,
        });
      });
  };
  componentDidMount = () => {
    this.props.match.params.id &&
      this.searchProfile(this.props.match.params.id);
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.searchProfile(this.props.match.params.id);
    }
  };
  render() {
    const { err, loading, profile, errMsg } = this.state;
    return (
      <div className="bgBody">
        <div className="mainBody">
          {err && <Alert variant="danger">{errMsg}</Alert>}
          {loading && err === true ? (
            <FadeLoader loading={loading} size={60} />
          ) : profile.length !== 0 ? (
            <Row className="rowm">
              <Col md={8} style={{ marginTop: "10vh" }}>
                <Card className="cardProf">
                  <Card.Img
                    className="cardImg"
                    variant="top"
                    src="https://coverfiles.alphacoders.com/372/37275.jpg"
                    style={{ objectFit: "cover" }}
                    alt="placeholder"
                  />
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <div style={{ marginTop: "-130px" }}>
                        <img
                          src={profile.image}
                          alt="placeholder"
                          height="160px"
                          width="160px"
                          style={{
                            borderRadius: "50%",
                            border: "4px solid white",
                            objectFit: "cover",
                          }}
                        ></img>
                      </div>
                    </div>

                    <Card.Text>
                      <Row>
                        <Col xs={12} lg={6}>
                          <h3 className="usrnTxt">
                            {profile.name + " " + profile.surname + " "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 21 21"
                              data-supported-dps="21x21"
                              fill="currentColor"
                              className="mercado-match"
                              width="21"
                              height="21"
                              focusable="false"
                              style={{ color: "#C37D16" }}
                            >
                              <g>
                                <path
                                  class="background-mercado"
                                  d="M19.5 0h-18A1.5 1.5 0 000 1.5v18A1.5 1.5 0 001.5 21h18a1.5 1.5 0 001.5-1.5v-18A1.5 1.5 0 0019.5 0zM6 18H3V8h3zM4.5 6.25a1.75 1.75 0 110-3.5 1.75 1.75 0 110 3.5zM18 18h-3v-5.09c0-1.62-.74-2.44-1.84-2.44A2.31 2.31 0 0011 13v5H8V8h3v1.39a4.06 4.06 0 013.3-1.63c1.77 0 3.66.93 3.66 4z"
                                ></path>
                              </g>
                            </svg>
                          </h3>
                          <div className="roletext">{profile.title}</div>
                          <h6 className="areaTxt">{profile.area}</h6>
                        </Col>
                        <Col lg={6}>
                          <div className="btnBox">
                            <Route path="/user/me">
                              {" "}
                              <DropdownButton
                                className="d-none d-lg-block"
                                id="dropdown-basic-button"
                                size="sm"
                                title="Add profile section"
                              >
                                <Dropdown.Item>Intro</Dropdown.Item>
                                <Dropdown.Item>About</Dropdown.Item>
                                <Dropdown.Item>Featured</Dropdown.Item>
                                <Dropdown.Item>Background</Dropdown.Item>
                                <Dropdown.Item>Skills</Dropdown.Item>
                                <Dropdown.Item>Accomplishments</Dropdown.Item>
                                <Dropdown.Item>
                                  Additional information
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  Supported languages
                                </Dropdown.Item>
                              </DropdownButton>
                              <button className="btnMore">More...</button>
                              <EditProfile
                                profile={profile}
                                refetch={() =>
                                  this.searchProfile(this.props.match.params.id)
                                }
                                color="#0A66CE"
                              />
                            </Route>
                          </div>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Bio
                  bio={profile.bio}
                  profile={profile}
                  refetch={() => this.searchProfile(this.props.match.params.id)}
                />
                <Route path="/user/me">
                  <Feature />
                </Route>
                <Experience profile={profile} />
              </Col>
              <Col
                md={4}
                style={{ marginTop: "10vh" }}
                className="d-none d-md-block"
              >
                <Sidebar />
              </Col>
            </Row>
          ) : (
            this.setState({
              err: true,
              errType: "warning",
              errMsg: "We have encounter a problem, the profile is empty",
            })
          )}
        </div>
      </div>
    );
  }
}
export default Body;
