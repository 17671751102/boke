import React from 'react';
import { Modal, Button ,Icon} from 'antd';

class Modallink extends React.Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  spanShowModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Icon type={this.props.type} onClick={this.showModal}/>
        <span onClick={this.spanShowModal}>{this.props.text}</span>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          width={300}
          style={{margin:'auto'}}
        >
          <img src={this.props.url} style={{width:250,height:250}}/>
        </Modal>
      </div>
    );
  }
}

export default Modallink;