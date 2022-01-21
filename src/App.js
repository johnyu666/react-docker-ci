import React, { Component } from 'react'
import {UpCircleTwoTone,DownCircleTwoTone,WarningTwoTone} from '@ant-design/icons'
import './App.css'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={albums:[],page:1}
    this._page=1;
    this._limit=4;
    this._count=8;
    this._order='asc'
    this._sort='id'
  }
  componentDidMount(){
    this._fetch()
  }
  _fetch=()=>{
    fetch(`http://localhost:3000/albums?_sort=${this._sort}&_order=${this._order}&_page=${this._page}&_limit=${this._limit}`)
    .then(resp=>resp.json())
    .then(albums=>this.setState({albums}))
  }
  nextPage=()=>{
    this.setState({page:++this._page})
    this._fetch();
  }
  prevPage=()=>{
    this.setState({page:--this._page})
    this._fetch();
  }
  goPage=(event,page)=>{
    event.preventDefault();
    this._page=page
    this.setState({page:page})
    this._fetch()
  }
  spPage=()=>{
    let ss=[]
    for(let i=1;i<=4;i++){
      ss.push(<li className={this.state.page===i?'current':''}><a onClick={event=>this.goPage(event,i)} href='#'>{i}</a></li>)
    }
    return ss;
  }
  sortAlbums=pro=>{
    if(pro===this._sort){
      this._order=this._order==='asc'?'desc':'asc'
      this._fetch()
      return;
    }
    this._sort=pro;
    this._order='asc'
    this._fetch()
  }
  showIcon=(prop)=>{
    if(prop===this._sort){
      if(this._order==='asc'){
        return <UpCircleTwoTone twoToneColor="red"/>
      }
      else{
        return <DownCircleTwoTone twoToneColor="green"/>
      }
    }
    else{
      return <WarningTwoTone />
    }
  }
  render() {
    return (
      <div id="shower">
          <h2>功能列表</h2>
          <p>
             <ol>
               <li>后端分页(每次向服务器请求新数据)</li>
               <li>点击表头动态排序</li>
               <li>容器化（前端容器+后端容器）</li>
             </ol>
          </p>
          <table>
            <thead>
              <tr>
                <th onClick={()=>this.sortAlbums('id')}>ID {this.showIcon('id')}</th>
                <th onClick={()=>this.sortAlbums('name')}>专辑名称 {this.showIcon('name')}</th>
                <th onClick={()=>this.sortAlbums('price')}>专辑价格 {this.showIcon('price')}</th>
              </tr>
            </thead>
            <tbody>
              {this.state.albums.map(album=><tr key={album.id}>
                <td>{album.id}</td>
                <td>{album.name}</td>
                <td>{album.price}</td>
              </tr>)}
            </tbody>
          </table>
          <button onClick={this.prevPage}>上一页</button>
          <ul>
          {this.spPage()}
          </ul>
          
          <button onClick={this.nextPage}>下一页</button>
      </div>
    )
  }
}
