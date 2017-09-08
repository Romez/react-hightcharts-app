import React from 'react';
import PropTypes from 'prop-types';
import {Row, Grid, Col} from 'react-bootstrap';

import {Header} from './components/header';
import {DevTools} from './utils';
import 'reset-css';

class App extends React.Component {
    render() {
        return (
            <Grid bsClass="container">
                <Row>
                    <Header/>
                </Row>

                { this.props.children }

                { NODE_ENV === 'development' ? <DevTools/> : null }
            </Grid>
        );
    }
}

App.propTypes = {
    children: PropTypes.any.isRequired
};

export default App;
