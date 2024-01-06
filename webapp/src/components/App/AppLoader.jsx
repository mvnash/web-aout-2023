import { ProviderWrapper } from "contexts/jokeContext";
import { BrowserRouter as Router } from "react-router-dom";
import App from "components/App/App";

const AppLoader = () => {
  return (
    <Router>
      <ProviderWrapper>
        <App />
      </ProviderWrapper>
    </Router>
  );
};

export default AppLoader;
