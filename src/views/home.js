import React, { PureComponent } from 'react';
import { Row, Col, Card, Spin } from 'antd';
import axios from "axios";
import StandardTable from '../components/table';
import global from '../global';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tableLoading: true,
      basketObject: {},
      basketData: [],
      totalData: 0,
      dataClickable: false
    }
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.basketObject !== this.state.basketObject) {
      this.setState({basketData: [...this.state.basketData, this.state.basketObject]})
    }
    if(prevState.basketData !== this.state.basketData) {
      // Calculation and updating of total data
      if(this.state.basketData.length === 1) {
        this.setState({totalData: this.state.basketData[0]['rate'] })
      } else {
        const sum = this.state.basketData.reduce((accumulator, object) => {
          return accumulator + Number(object.rate);
        }, 0);
        this.setState({totalData: sum})
      }
    }
  }

  getData = () => {
    axios.get(`https://65005dd518c34dee0cd4cabe.mockapi.io/products/products`)
    .then(res => {
      this.setState({ data:  res.data});
      res.data ? this.setState({ tableLoading: false }) : this.setState({ tableLoading: true });
    })
  }

  render() {    
    let columns = [
      {
        title: 'Name',
        key: 'name',
        render: (text, value) => <span>{value.name} </span>,
      },
      {
        title: 'ID',
        key: 'id',
        render: (text, value) => <span>{value.id}</span>,
      },
      {
        title: 'Oluşturulma Tarihi',
        key: 'createdAt',
        render: (text, value) => <span>{global.formatDate(value.createdAt)}</span>,
      },      
    ];
    return (
      <div>
        <Row className={'content__header'}>
        </Row>
        <div className={'content__table'}>
          <Row>
          <Spin size="large" spinning={this.state.tableLoading}>
            <StandardTable 
              dataSource={this.state.data} 
              columns={columns} 
              size="middle" 
            />
          </Spin>
          </Row>
        </div>
      </div>
    );
  }
}

export default Home;
