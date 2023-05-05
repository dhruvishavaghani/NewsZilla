import React, { Component } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner'
import PropTypes  from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

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
            page:1,
            totalResults:0
        }
        document.title=`${this.props.category}-NewsMonkey`;
    }
    async updatenews(){
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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
    this.updatenews()}

   fetchMoreData=async()=>{
    this.setState({page:this.state.page+1})
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parseData=await data.json();
    this.setState({articles: this.state.articles.concat (parseData.articles),
      totalResults : parseData.totalResults,
      loading: false})
   };

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'>NewsMonkey-Top {this.props.category} Headlines</h2>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length!==this.state.totalResults}
        loader={<Spinner/>}
        >
        <div className='container'>
        <div className="row">
        {this.state.articles?.map((element)=>
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
        </div>
        </InfiniteScroll>

      </div>
    )
  }
}

export default News
