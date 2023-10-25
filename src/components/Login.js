import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ListAssignment from './ListAssignment';
import GradeAssignment from './GradeAssignment';
import EditAssignment from './EditAssignment';
import AddAssignment from './AddAssignment';
import { SERVER_URL } from '../constants';

function Login() {
    const [user, setUser] = useState({ username: '', password: '' });
    const [isAuthenticated, setAuth] = useState(false);

    const onChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const login = () => {
        fetch(`${SERVER_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => {
            const jwtToken = res.headers.get('Authorization');
            if (jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }
        })
        .catch(err => console.log(err));
    }

    if (isAuthenticated) {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={ListAssignment} />
                    <Route path="/gradeAssignment/:assignmentId" component={GradeAssignment} />
                    <Route path="/editAssignment/:assignmentId" component={EditAssignment} />
                    <Route path="/addAssignment" component={AddAssignment} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        );
    } else {
        return (
            <div className="App">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="username">UserName</label>
                            </td>
                            <td>
                                <input type="text" name="username" value={user.username} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="password">Password</label>
                            </td>
                            <td>
                                <input type="password" name="password" value={user.password} onChange={onChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <button id="submit" onClick={login}>Login</button>
            </div>
        );
    }
}

export default Login;
