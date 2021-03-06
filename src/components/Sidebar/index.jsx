import React, { Component } from "react";
import { Row } from "react-bootstrap";
import "./styles.css";
import { Link } from "react-router-dom";
import vid1 from "../../assets/vid1.png";
import vid2 from "../../assets/vid2.png";
import vid3 from "../../assets/vid3.png";
class Sidebar extends Component {
  state = {
    users: [],
    selected: "me",
  };
  componentDidMount = () => {
    fetch(`${process.env.REACT_APP_API_URL}/profiles`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + localStorage.getItem("token"),
        ContentType: "application/json",
      }),
    })
      .then((response) => response.json())
      .then((info) => {
        this.setState({ users: info });
      });
  };
  render() {
    return (
      <>
        <div className="usersDiv w-100">
          <p className="divTitle">Add to your feed</p>
          {this.state.users &&
            this.state.users.slice(0, 6).map((user, index) => (
              <div className="userdiv2" key={`suggestUsers${index}`}>
                <Link to={`/user/${user._id}`}>
                  <Row className="flex-nowrap">
                    <img className="userimg" src={user.image} alt="user"></img>
                    <div className="userText">
                      <p className="sugUsers" id={`suggestUsers${index}name`}>
                        {user.name}
                      </p>
                      <small className="ranking">{user.bio}</small>
                      <p className="usersp">{user.title}</p>
                    </div>
                  </Row>
                </Link>
              </div>
            ))}
        </div>
        <div className="lrn-div">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            data-supported-dps="14x14"
            className="mercado-match"
            focusable="false"
          >
            <g>
              <path
                className="background-mercado"
                d="M14 1v12a1 1 0 01-1 1H1a1 1 0 01-1-1V1a1 1 0 011-1h12a1 1 0 011 1zM4 5H2v7h2zm.25-2A1.27 1.27 0 003 1.8 1.27 1.27 0 001.75 3 1.27 1.27 0 003 4.2 1.27 1.27 0 004.25 3zM12 8.29c0-2.2-.73-3.49-2.86-3.49A2.71 2.71 0 006.89 6V5H5v7h2V8.73A1.74 1.74 0 018.66 6.8C9.82 6.8 10 7.94 10 8.73V12h2z"
              ></path>
            </g>
          </svg>
          <h6 className="lrn-h6">LEARNING</h6>
          <h5 className="lrn-h5">Add new skills with these courses</h5>
          <div className="row no-gutters">
            <div className="col-lg-6 row-md">
              <img className="vid-img" alt="" src={vid1}></img>
            </div>
            <div className="col-lg-6 row-md">
              <h4 className="vid-txt">
                Building Angular and ASP.NET Core Applications
              </h4>
              <small className="vid-sml">3,895</small>
            </div>
            <div className="col-lg-6 row-md">
              <img className="vid-img" alt="" src={vid2}></img>
            </div>
            <div className="col-lg-6 row-md">
              <h4 className="vid-txt">
                Building Angular and ASP.NET Core Applications
              </h4>
              <small className="vid-sml">4,985</small>
            </div>
            <div className="col-lg-6 row-md">
              <img className="vid-img" alt="" src={vid3}></img>
            </div>
            <div className="col-lg-6 row-md">
              <h4 className="vid-txt">
                Building Angular and ASP.NET Core Applications
              </h4>
              <small className="vid-sml">12,464</small>
            </div>
          </div>
        </div>
        {/* <div className="ad-div">
          <img
            className="ad"
            src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg"
            alt="Advertise on LinkedIn"
            border={0}
          />
        </div> */}
      </>
    );
  }
}

export default Sidebar;
