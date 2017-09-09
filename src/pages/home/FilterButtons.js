import React from 'react';
import PropTypes from 'prop-types';
import {bindAll, uniqBy} from 'lodash';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class FilterButtons extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, ['onChange']);
    }

    onChange(e) {
        const {name, value} = e.target;
        this.props.onChange(name, value);
    }

    render() {
        const {bugs} = this.props;

        return (
            <section>
                <FormGroup controlId="formControlsSystem">
                    <ControlLabel>System</ControlLabel>
                    <FormControl
                        name="System"
                        componentClass="select"
                        onChange={this.onChange}
                    >
                        <option value="">Выберете систему</option>
                        {uniqBy(bugs, 'System').map(function(bug, i) {
                            const sys = bug['System'];
                            return (<option key={i} value={sys}>{sys}</option>);
                        })}
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsCrit">
                    <ControlLabel>Критичность</ControlLabel>
                    <FormControl
                        name="Критичность"
                        componentClass="select"
                        onChange={this.onChange}
                    >
                        <option value="">Выберете Критичность</option>
                        {uniqBy(bugs, 'Критичность').map(function(bug, i) {
                            const critic = bug['Критичность'];
                            return (<option key={i} value={critic}>{critic}</option>);
                        })}
                    </FormControl>
                </FormGroup>
            </section>
        );
    }
}

FilterButtons.propTypes = {
    bugs: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default FilterButtons;
