import React from 'react';
import {bindAll, uniqBy, forIn, get} from 'lodash';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import moment  from 'moment';
import ReactHighcharts from 'react-highcharts/ReactHighstock';
import HighchartsExporting from 'highcharts-exporting';

import bugs from '../home/bugs_for_test.json';
import './styles.less';

HighchartsExporting(ReactHighcharts.Highcharts);

class HomePage extends React.Component {
    static path = '/';

    constructor(props) {
        super(props);
        bindAll(this, ['onChangeSystem', 'onChangeCrit', 'handleData']);
        this.state = {
            bugList: bugs,
            data: [],
            System: '',
            Критичность: ''
        };
    }

    componentWillMount() {
        this.handleData(bugs);
    }

    handleData(bugList) {
        const data = {};
        bugList
            .map((item) => {
                return {
                    time: moment(item['Дата создания']).utc().valueOf(),
                    System: item['System'],
                    Критичность: item['Критичность']
                };
            })
            .sort((a, b) => {
                const c = a.time;
                const d = b.time;
                return c - d;
            })
            .map(item => {
                const date = item.time;
                if (data[date]) {
                    data[date].y++;
                } else {
                    data[date] = {
                        x: date,
                        y: 1,
                        System: item['System'],
                        Критичность: item['Критичность']
                    };
                }
            });
        this.setState({data});
    }

    onChangeCrit(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});

        const bugList = bugs.filter(bug => {
            return (bug['Критичность'].toLowerCase().indexOf(value.toLowerCase()) >= 0) &&
                (bug['System'].toLowerCase().indexOf(this.state['System'].toLowerCase()) >= 0);
        });

        this.handleData(bugList);
    }

    onChangeSystem(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});

        const bugList = bugs.filter(bug => {
            return (bug['System'].toLowerCase().indexOf(value.toLowerCase()) >= 0) &&
                (bug['Критичность'].toLowerCase().indexOf(this.state['Критичность'].toLowerCase()) >= 0);
        });

        this.handleData(bugList);
    }

    render() {
        const data = [];
        forIn(this.state.data, function(val) {
            data.push([val.x, val.y]);
        });

        const std = this.state.data;

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
                    return `<div>
                            <b>${moment.utc(Number(this.x)).format('DD.MM.gggg')}</b></div><br>
                            <div>
                            Ошибок: <b>${this.y}</b></div>
                            `;
                }
            },
            series: [{
                turboThreshold: this.state.data.length,
                name: 'Ошибки',
                data: data,
                dateFormat: 'dd/mm/YYYY'
            }]
        };

        return (
            <section id="HomePage">
                <h1 className="title">Главная</h1>

                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>System</ControlLabel>
                    <FormControl
                        name="System"
                        componentClass="select"
                        onChange={this.onChangeSystem}
                    >
                        <option value="">Выберете систему</option>
                        {uniqBy(bugs, 'System').map((item, i) => (
                            <option key={i} value={item.System}>{item.System}</option>
                        ))}
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Критичность</ControlLabel>
                    <FormControl
                        name="Критичность"
                        componentClass="select"
                        onChange={this.onChangeCrit}
                    >
                        <option value="">Выберете Критичность</option>
                        {uniqBy(bugs, 'Критичность').map((item, i) => (
                            <option key={i} value={item.Критичность}>{item.Критичность}</option>
                        ))}
                    </FormControl>
                </FormGroup>

                <ReactHighcharts config={config}/>
            </section>
        );
    }
}

export default HomePage;
