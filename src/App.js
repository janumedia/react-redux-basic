import React from 'react';
import { connect } from 'react-redux';

import { addUser} from './actions/user';

import Header from './components/Header';
import Quote from './components/Quote';
import List from './components/List';
import Form from './components/Form';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
    return {
        addUser: user => dispatch(addUser(user))
    };
};

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <section>
                    <Quote>User List</Quote>
                    <Form/>
                    <List users={this.props.users}/>
                </section>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)