import React from 'react';
import { List, Avatar, Icon } from 'antd';
import {Link} from 'react-router-dom'
import Delete from '@js/userindex/components/delete';
import { connect } from 'react-redux'
const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
    );
class Javalistdetail extends React.Component {
    render(){
        return(
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: (page) => {
                    console.log(page)
                    this.props.page(page)
                },
                pageSize: 6,
                // total:7
                }}
                dataSource={this.props.listData}
                renderItem={item => (
                <List.Item
                    key={item.wZId}
                    actions={[
                    <span><IconText type="user" />{item.users.usName}</span>,
                    <IconText type="like-o" text="156" />, <IconText type="message" text="2" />,
                    sessionStorage.getItem('logtoken')?
                    <span style={{marginLeft:30}}><Link to={`/admin_edit/${item.wZId}`}>编辑</Link><span className='blank'>|
                    </span><Delete id={item.wZId}/></span>:'']}
                    extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                >
                    <List.Item.Meta
                    avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                    title={<Link to={`/java/${item.wZId}`}>{item.wZTitle}</Link>}
                    description={item.WZJJ}
                    />
                    {this.props.children}
                </List.Item>
                )}
            />
        )
    }
}
const mapStateToProps = (state) => {
    return {
      baseurl: state.baseurl
    }
}
Javalistdetail = connect(mapStateToProps)(Javalistdetail)
export default Javalistdetail
