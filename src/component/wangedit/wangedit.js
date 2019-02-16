
import React, { Component } from 'react';
import $ from 'jquery'
import E from 'wangeditor'
import { connect } from 'react-redux'
class Wangeditor extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editorContent: '',
      isFull: true,
      isFullText: '全屏'
    }
}

 
render() {
  const style = {
    width:  '700px',
    height:  '400px', 
    extAlign: 'left',
    position: 'relative',
  }
  const styles={
    width: '1100px',
    height: '100%',
    textAlign: 'left',
    position:'fixed',
    top:'0px',
    left:'50%',
    backgroundColor:'#fff',
    zIndex: '999',
    marginLeft:'-550px'
  }
  const stys={
    float: 'right',
    zIndex: '1000001',
    position: 'fixed',
    top: '6px',
    left: '50%',
    cursor: 'pointer',
    width:'80px',
    marginLeft:'33px',
    textAlign:'center'
  }
  const sty={
    float: 'right',
    zIndex: '1000001',
    position: 'absolute',
    top: '4px',
    left: '600px',
    cursor: 'pointer',
    width:'50px'
  }
  const black={
    position:'fixed',
    top:'0',
    left:'0',
    right:'0',
    bottom:'0',
    backgroundColor:'rgba(0,0,0,0.6)',
    zIndex:9
  }
    return (
        <div className="Wangeditor">
          <div className="App" style={this.state.isFull?{}:black}>
            {/* 将生成编辑器 */}
            <div className='k_btn' style={this.state.isFull?sty:stys} onClick={this.clickFullScreen.bind(this)}>{this.state.isFullText}</div>
            <div ref="editorElem" style = {this.state.isFull?style:styles} className='fullScreen'>
            
            </div>
          </div>
      </div>
    );
  }

  componentDidMount() {
    const elem = this.refs.editorElem
    const editor = new E(elem)
    
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      })
    }
    // editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
    editor.customConfig.uploadImgServer = this.props.baseurl+"Blog/fuJianShangChuan.form" // 上传图片到服务器
    editor.customConfig.showLinkImg = false // 隐藏“网络图片”tab
    editor.customConfig.uploadImgMaxLength = 5 // 限制一次最多上传 5 张图片
    editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024 //限制图片的大小

    editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        // 'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        // 'video',  // 插入视频
        // 'code',  // 插入代码
        'undo',  // 撤销
        'redo',  // 重复
    ]
    editor.create()
  }

  clickHandle() {
      alert(this.state.editorContent)
  }
  clickFullScreen() {
    this.setState({isFull:!this.state.isFull});
    this.setState({isFullText: !this.state.isFull?'全屏': '取消全屏'});
  }

}
const mapStateToProps = (state) => {
  return {
    baseurl:state.baseurl
  }
}
Wangeditor = connect(mapStateToProps)(Wangeditor)
export default Wangeditor