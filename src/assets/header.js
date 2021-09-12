import React from "react";

function Header(props) {
  if (
    props.body !== "users" &&
    props.body !== "body" &&
    props.body !== "posts"
  ) {
    throw "error";
  } //pour savoir s'il y a un probléme dans props.body
  return (
    <div className="App-header">
      <div className="App-home" onClick={() => props.setBody("body")}>
        Home
      </div>
      <div className="App-user" onClick={() => props.setBody("users")}>
        Users
      </div>
      <div className="App-post" onClick={() => props.setBody("posts")}>
        Posts
      </div>
    </div>
  ); // l'interface de header
}
export default Header;
