import React from 'react';
import {bindAll, values} from 'lodash';
import {utc} from 'moment';
import ReactHighcharts from 'react-highcharts/ReactHighstock';
import HighchartsExporting from 'highcharts-exporting';

import FilterButtons from './FilterButtons';

import bugs from '../home/bugs_for_test.json';
import './styles.less';

class HomePage extends React.Component {
    static path = '/';

    /** Данные из файла нужные для графика и фильтров */
    static preparedData = [];

    constructor(props) {
        super(props);
        HighchartsExporting(ReactHighcharts.Highcharts);
        bindAll(this, ['onChange', 'handleData', 'prepareData']);
        this.state = {
            data: [],
            System: '',
            Критичность: ''
        };
    }

    prepareData() {
        this.preparedData = bugs
            .map((item) => {
                if (item['Дата создания'] && item['System'] && item['Критичность']) {
                    return {
                        time: Date.parse(item['Дата создания']),
                        System: item['System'],
                        Критичность: item['Критичность']
                    };
                }
            })
            .sort((a, b) => a.time - b.time);
        this.handleData(this.preparedData);
    }

    /**
     * дефолтное значение если нужна будет кнопка сбросить
     * @param bugList array
     */
    handleData(bugList = this.preparedData) {
        const data = [];
        bugList.map(
            (item) => {
                const time = item.time;
                if (data[time]) {
                    data[time][1]++;
                } else {
                    data[time] = [time, 1];
                }
            }
        );
        this.setState({data});
    }

    componentWillMount() {
        this.prepareData();
    }

    onChange(name, value) {
        this.setState({[name]: value}, () => {
            const bugList = this.preparedData.filter((bug) => {
                return (bug['Критичность'].toLowerCase().indexOf(this.state['Критичность'].toLowerCase()) >= 0) &&
                    (bug['System'].toLowerCase().indexOf(this.state['System'].toLowerCase()) >= 0);
            });

            this.handleData(bugList);
        });
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

                <FilterButtons
                    bugs={bugs}
                    onChange={this.onChange}
                />

                <ReactHighcharts config={config}/>
            </section>
        );
    }
}

export default HomePage;
