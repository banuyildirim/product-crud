import React, { PureComponent } from 'react';
import { Row, Col, Card, Spin, Tooltip, Button, Icon, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from "axios";
import StandardTable from '../components/table';
import { formatDate, delete_success_notification } from '../global';

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

  handleDelete = value => {
    axios.delete(`https://65005dd518c34dee0cd4cabe.mockapi.io/products/products/${value.id}`).then(
      response => {
        delete_success_notification(response);
        this.getData();
      },
      error => {
        global.fail_notification(error);
        this.setState({ loading: false });
      },
    );
  };

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
        render: (text, value) => <span>{formatDate(value.createdAt)}</span>,
      },      
      {
        title: 'Actions',
        render: (text, record) => (
          <div>
            <Tooltip placement="top" title={'Edit'}>
              <Button
                shape="round"
                style={{ marginRight: '5px' }}
                size="small"
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title={'Delete'}>
              <Popconfirm
                title={'Are_you_sure'}
                onConfirm={() => this.handleDelete(text, record)}
                okText={'Yes'}
                cancelText={'No'}
              >
                <Button shape="round" size="small" type="danger">
                  {' '}
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </Tooltip>
          </div>
        ),
        key: 'actions',
      },
    ];
    return (
      <div>
        <Row className={'content__header'}>
        </Row>
        <Row>
          <Col md={24} sm={24} xs={24}>
            <Card bordered={true} bodyStyle={{ paddingBottom: '60px' }}>
              <Spin size="large" spinning={this.state.tableLoading}>
                <StandardTable 
                  dataSource={this.state.data} 
                  columns={columns} 
                  size="large" 
                />
              </Spin>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
