import React from 'react';
import {bindAll, uniqBy, values, orderBy} from 'lodash';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {utc} from 'moment';
import ReactHighcharts from 'react-highcharts/ReactHighstock';
import HighchartsExporting from 'highcharts-exporting';

import bugs from '../home/bugs_for_test.json';
import './styles.less';

class HomePage extends React.Component {
    static path = '/';

    constructor(props) {
        super(props);
        HighchartsExporting(ReactHighcharts.Highcharts);
        bindAll(this, ['onChange', 'handleData']);
        this.state = {
            data: [],
            System: '',
            Критичность: ''
        };
    }

    componentWillMount() {
        this.handleData();
    }

    onChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value}, () => {
            const bugList = bugs.filter(bug => {
                return (bug['Критичность'].toLowerCase().indexOf(this.state['Критичность'].toLowerCase()) >= 0) &&
                    (bug['System'].toLowerCase().indexOf(this.state['System'].toLowerCase()) >= 0);
            });

            this.handleData(bugList);
        });
    }

    handleData(bugList = bugs) {
        const data = [];
        bugList
            .map(item => Date.parse(item['Дата создания']))
            .sort((a, b) => a - b)
            .map(utcTime => {
                if (data[utcTime]) {
                    data[utcTime].y++;
                } else {
                    data[utcTime] = {
                        x: utcTime,
                        y: 1
                    };
                }
            });

        this.setState({data});
    }

    render() {
        const {data} = this.state;
        const config = {
            chart: {
                type: 'line',
                zoomType: 'x'
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    format: '{value:%d.%m.%Y}',
                    align: 'left'
                },
                title: {
                    text: 'Date'
                }
            },
            tooltip: {
                formatter: function() {
                    const {x, y} = this;
                    return `
                        <div>
                            <div>
                                <b>${utc(Number(x)).format('DD.MM.gggg')}</b>
                            </div>
                            <br/>
                            <div>
                                Ошибок: <b>${y}</b>
                            </div>
                        </div>
                    `;
                }
            },
            series: [{
                turboThreshold: data.length,
                name: 'Ошибки',
                data: values(data)
            }]
        };

        return (
            <section id="HomePage">
                <h1 className="title">Главная</h1>

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

                <ReactHighcharts config={config}/>
            </section>
        );
    }
}

export default HomePage;
