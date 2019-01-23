import React from 'react';
import { Comment, Tooltip, List ,Icon} from 'antd';
import moment from 'moment';
class CommentList extends React.Component{
    constructor(){
        super()
        this.state={
            data:[],
            likes: 0,
            dislikes: 0,
            action: null,
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
    }

    getData=()=>{
        const { likes, dislikes, action } = this.state;
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
                        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                        {likes}
                        </span>
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
                    <span >Reply to</span>
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
                ),
            }]
        })
    }
    
    
    render(){
        return(
           <List
            className="comment-list"
            header={`${this.state.data.length} replies`}
            itemLayout="horizontal"
            dataSource={this.state.data}
            renderItem={item => (
                <Comment
                    actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                />
            )}
        />
        )
    }
}
export default CommentList;
