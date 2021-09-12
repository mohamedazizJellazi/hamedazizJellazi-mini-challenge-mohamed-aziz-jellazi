import Body from "../components/body";
import Users from "../components/users";
import Posts from "../components/posts";
import React from "react";
import ErrorBoundary from "../components/errorbounday";
function Content(props) {
  return (
    <div>
      {props.body === "body" ? (
        <ErrorBoundary>
          <Body />
        </ErrorBoundary>
      ) : props.body === "users" ? (
        <ErrorBoundary>
          <Users />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <Posts />
        </ErrorBoundary>
      )}
    </div>
  );
} // l'interface de content

export default Content;
