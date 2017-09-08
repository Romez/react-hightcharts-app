import React from 'react';
import {has, uniqBy} from 'lodash';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

import bugs from '../home/bugs_for_test.json';
import './styles.less';

class TablePage extends React.Component {
    static path = '/table';

    constructor(props) {
        super(props);
        this.state = {
            rows: bugs
        };
    }

    getSelect(name) {
        const list = {};
        uniqBy(bugs, name).map((bug) => {
            list[bug[name]] = bug[name];
        });
        return list;
    }

    render() {
        return (
            <section id="TablePage">
                <h2 className="title">Таблица</h2>

                <BootstrapTable
                    data={this.state.rows}
                    pagination
                >
                    <TableHeaderColumn
                        dataField="ID"
                        isKey={true}
                        dataSort={true}
                        filter={{type: 'TextFilter'}}
                    >ID</TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="System"
                        dataSort={true}
                        filter={{type: 'SelectFilter', options: this.getSelect('System')}}
                    >System</TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="Summary"
                        dataSort={true}
                        filter={{type: 'SelectFilter', options: this.getSelect('Summary')}}
                    >Summary</TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="Состояние"
                        dataSort={true}
                        filter={{type: 'SelectFilter', options: this.getSelect('Состояние')}}
                    >Состояние</TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="Найдено при"
                        dataSort={true}
                        filter={{type: 'SelectFilter', options: this.getSelect('Найдено при')}}
                    >Найдено при</TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="Критичность"
                        dataSort={true}
                        filter={{type: 'SelectFilter', options: this.getSelect('Критичность')}}
                    >Критичность</TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="Тип Дефекта"
                        dataSort={true}
                        filter={{type: 'SelectFilter', options: this.getSelect('Тип Дефекта')}}
                    >Тип Дефекта</TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="Дата создания"
                        dataSort={true}
                        filter={{type: 'TextFilter'}}
                    >Дата создания</TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="Дата изменения"
                        dataSort={true}
                        filter={{type: 'TextFilter'}}
                    >Дата изменения</TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="Дата закрытия"
                        dataSort={true}
                        filter={{type: 'TextFilter'}}
                    >Дата закрытия</TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="Метод обнаружения"
                        dataSort={true}
                        filter={{type: 'SelectFilter', options: this.getSelect('Метод обнаружения')}}
                    >Метод обнаружения</TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="reopens_amount"
                        dataSort={true}
                        filter={{type: 'SelectFilter', options: this.getSelect('reopens_amount')}}
                    >reopens_amount</TableHeaderColumn>
                </BootstrapTable>
            </section>
        );
    }
}

export default TablePage;
