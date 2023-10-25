import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ListAssignment from './components/ListAssignment';
import GradeAssignment from './components/GradeAssignment';
import AddAssignment from './components/AddAssignment';
import EditAssignment from './components/EditAssignment';
import Login from './components/Login'; // Assuming you've kept Login.js inside the 'components' directory.
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("jwt"));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    )} />
  );

  return (
    <div className="App">
      <h2>Gradebook</h2>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/login" render={(props) => <Login onLogin={handleLogin} {...props} />} />
            <ProtectedRoute exact path="/" component={ListAssignment} />
            <ProtectedRoute path="/addAssignment" component={AddAssignment} />
            <ProtectedRoute path="/editAssignment/:id" component={EditAssignment} />
            <ProtectedRoute path="/gradeAssignment" component={GradeAssignment} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
      {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
}

export default App;
