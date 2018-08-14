import React from 'react';
import { connect } from 'react-redux';

import { getUsers} from './actions/userActions';

import Header from './components/Header';
import Quote from './components/Quote';
import List from './components/List';
import Form from './components/Form';
import Status from './components/Status';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => dispatch(getUsers())
    };
};

class App extends React.Component {
    componentDidMount() {
        this.props.getUsers()
    }
    render() {
        return (
            <React.Fragment>
                <Header/>
                <section>
                    <Quote>User List</Quote>
                    <Form>
                        <Status/>
                    </Form>
                    <List users={this.props.users}/>
                </section>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)