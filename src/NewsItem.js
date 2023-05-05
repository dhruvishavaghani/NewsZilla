import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageurl,newsurl,author,date} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
           <img src={!imageurl?"https://c.ndtvimg.com/2022-11/g0mnea4o_bidensunak-meet_625x300_16_November_22.jpg":imageurl} className="card-img-top" alt="..."/>
           <div className="card-body">
           <h5 className="card-title">{title}</h5>
           <p className="card-text">{description}</p>
           <p className="card-text"><small class="text-muted">  By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
           <a rel="noreferrer" href={newsurl} target="_blank"className="btn btn-sm btn-dark">Read More</a>
          </div>
          </div>
          </div>
    )
  }
}

export default NewsItem
