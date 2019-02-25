import React from 'react';
import { Comment, Tooltip, List ,Icon} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import Commenttext from '@js/userindex/components/comment/commenttext'
class CommentList extends React.Component{
    constructor(){
        super()
        this.state={
            data:[],
            likes: 0,
            dislikes: 0,
            action: null,
            promessage:false
        }
    }
    like = () => {
        this.setState({
          likes: 1,
          dislikes: 0,
          action: 'liked',
        },()=>{
            this.getData()
        });
      }
    
    dislike = () => {
        this.setState({
            likes: 0,
            dislikes: 1,
            action: 'disliked',
        },()=>{
            this.getData()
        });
    }
    componentDidMount(){
        this.getData()
        console.log(this.props)
    }
    handleTogeter=()=>{
        this.setState({promessage:!this.state.promessage},()=>{
            this.getData()
        })
    }
    getData=()=>{
        const { likes, dislikes, action } = this.state;
        const value=this.props.value
        this.setState({
            data:[{
                actions: [
                    <span>
                        <Tooltip title="Like">
                        <Icon
                            type="like"
                            theme={action === 'liked' ? 'filled' : 'outlined'}
                            onClick={this.like}
                        />
                        </Tooltip>
                        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
                    </span>,
                    <span>
                        <Tooltip title="Dislike">
                        <Icon
                            type="dislike"
                            theme={action === 'disliked' ? 'filled' : 'outlined'}
                            onClick={this.dislike}
                        />
                        </Tooltip>
                        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                        {dislikes}
                        </span>
                    </span>,    
                    <span onClick={this.handleTogeter}>留言</span>
            ],
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: (
                <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
                ),
                datetime: (
                <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().subtract(1, 'days').fromNow()}</span>
                </Tooltip>
                )
            }]
        })
    }
    render(){
        return(
           <List
            className="comment-list"
            // header={`${this.props.value.length} 留言`}
            itemLayout="horizontal"
            dataSource={this.state.data}
            renderItem={item => (
                <Comment
                    actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                >
                {this.props.children}
                </Comment>
            )}
        />
        )
    }
}
const mapStateToProps = (state) => {
    return {
      baseurl:state.baseurl
    }
}
CommentList = connect(mapStateToProps)(CommentList)
export default CommentList;
