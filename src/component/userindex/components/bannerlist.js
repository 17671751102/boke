import React from 'react';
import {
    List, Avatar, Button, Skeleton,
  } from 'antd';
  import { Link} from 'react-router-dom';
  import { connect } from 'react-redux'
  import axios from 'axios'
  // 用来转换axios参数格式与ajax格式一致
  import qs from 'qs'
  //用来点击增加请求列表数量
  const count = 3;  
  class Bannerlist extends React.Component {
    state = {
      initLoading: true,
      loading: false,
      data: [],
      list: [],
      page:1,
      pageSize:3,
      bottom:false
    }
  
    componentDidMount() {
      this.getData((res) => {
        this.setState({
          initLoading: false,
          data: res.data.wzlst,
          list: res.data.wzlst,
        });
      });
    }
  
    getData = (callback,a) => {
      axios.post(this.props.baseurl+'Blog/showWenZhangList.form',qs.stringify({
        biaoQian:'',
        dqy:this.state.page,
        pageSize:a||this.state.pageSize
      }))
      .then((json)=>{
        callback(json);
      })
    }
    onLoadMore = () => {
      this.setState({
        loading: true,
        pageSize:this.state.pageSize+count,
        list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, abc: {} }))),
      });
      var a=this.state.pageSize+1
      this.getData((res) => {
        if(this.state.data.length==res.data.wzlst.length){
          this.setState({
            bottom:true,
            loading:false,
            data:res.data.wzlst,
            list: res.data.wzlst,
          })
        }else{
          this.setState({
            list: res.data.wzlst,
            loading: false,
            data:res.data.wzlst
          });
        }
      },a);
    }
  
    render() {
      var { initLoading, loading, list,bottom } = this.state;
      const loadMore = !initLoading && !loading&&!bottom ? (
        <div style={{
          textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
        }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : 
      <div style={{
        textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
      }}
      >
        做人呢！当然是快乐最重要~
      </div>;
      return (
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="vertical"
          loadMore={loadMore}
          dataSource={list}
          renderItem={abc => (
            <List.Item actions={[<span>20190101</span>]} extra={<span><a>edit</a><span className='blank'>|</span><a>more</a></span>}>
              <Skeleton avatar title={false} loading={abc.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={ <Link to={`/index/${abc.wZId}`}>{abc.wZTitle}</Link>}
                  description={abc.WZJJ}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      );
    }
  }
  const mapStateToProps = (state) => {
    return {
      baseurl: state.baseurl
    }
  }
  Bannerlist = connect(mapStateToProps)(Bannerlist)
  export default Bannerlist;