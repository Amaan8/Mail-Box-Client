import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Header from "./components/Header";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          {!isLoggedIn && <Redirect to="/auth" />}
          {isLoggedIn && <Redirect to="/home/inbox" />}
        </Route>
        {!isLoggedIn && (
          <Route path="/auth">
            <Auth />
          </Route>
        )}
        <Route path="/home">
          {!isLoggedIn && <Redirect to="/auth" />}
          <Home />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
