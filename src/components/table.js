import React, { PureComponent } from 'react';
import { Space, Table, Tag } from 'antd';

class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.props.columns,
    }
  };

  render() {
    const { dataSource = {} } = this.props;
    let list = [];
    list = dataSource;
    return (
      <Table 
      dataSource={list} 
      columns={this.state.columns}  
      bordered={true}
      className='tableStyle'
      />
    )
  }
}
export default StandardTable;