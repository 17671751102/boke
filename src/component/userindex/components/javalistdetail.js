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
                    this.props.page(page)
                },
                pageSize: 6,
                total:this.props.listData.num
                }}
                dataSource={this.props.listData}
                renderItem={item => (
                <List.Item
                    key={item.wZId}
                    actions={[
                    <span><IconText type="user" />{item.users.usName}</span>,
                    <IconText type="like-o" text={item.zan} />, <IconText type="eye" text={item.see} />,
                    sessionStorage.getItem('logtoken')?
                    <span style={{marginLeft:30}}><Link to={`/admin_edit/${item.wZId}`}>编辑</Link><span className='blank'>|
                    </span><Delete id={item.wZId}/></span>:'']}
                    extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                >
                    <List.Item.Meta
                    avatar={<Avatar src={item.users.head} />}
                    title={<Link to={`/${this.props.type}/${item.wZId}`}>{item.wZTitle}</Link>}
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
