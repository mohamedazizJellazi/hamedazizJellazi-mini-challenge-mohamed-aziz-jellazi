import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  } //savoir s'il ya une erreur

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
  } //catch l'erreur et ses information

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
} //l'interface de l'erreur
export default ErrorBoundary;
