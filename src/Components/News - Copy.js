import React, { Component } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner';
import PropTypes  from 'prop-types'

export class News extends Component {

    static defaultProps={
      country: 'in',
      pageSize:9,
      category : 'general'
    }

    static propTypes={
      country :  PropTypes.string,
      pageSize : PropTypes.number,
      category :PropTypes.string
    }

    constructor(props)
    {
        super(props);
        this.state={
            articles:[],
            loading: false,
            page:1
        }
        document.title=`${this.props.category}-NewsMonkey`;
    }
    async updatenews(){
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=14a0457e6f1f4d21bdca3be0c950d8c8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data= await fetch(url);
      let parseData=await data.json();
      this.setState({articles: parseData.articles,
        totalResults : parseData.totalResults,
        loading: false})
    }
    async componentDidMount(){
      this.updatenews();}

    handlenx=async()=>{
    this.setState({page:this.state.page+1});
    this.updatenews();}

    handlepre=async()=>{
    this.setState({page: this.state.page-1});
    this.updatenews();}

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'>NewsMonkey-Top {this.props.category} Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles?.map((element)=>
        {
            return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title} 
            description={element.description} 
            imageurl={element.urlToImage} 
            newsurl={element.url} 
            author={element.author}
            date={element.publishedAt
            }/>
            </div>
        })}
       
        </div>
        <div className='container d-flex justify-content-between '>
        <button disabled={this.state.page<=1} type="button" onClick= {this.handlepre} className="btn btn-outline-dark"> &#8920; Previous</button>
        <button disabled={(this.state.page+1)>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handlenx}
         className="btn btn-outline-dark">Next &#8921;</button>
        </div>
      </div>
    )
  }
}

export default News
