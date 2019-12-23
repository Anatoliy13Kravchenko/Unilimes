import React from 'react';
import { Route, Switch } from 'react-router';
import Container from './Container';
import Home from './Home';

export default class Main extends React.PureComponent {

    public render() {
        return (
            <Switch>
                <Route path="/container/:color" component={Container} />
                <Route exact path="/" component={Home} />
            </Switch>
        );
    }
}
