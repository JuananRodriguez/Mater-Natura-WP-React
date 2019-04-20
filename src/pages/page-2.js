import React from "react"
// import { Link } from "gatsby"
import './page2.css'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Swiper from "../components/Swipe"

class SecondPage extends React.Component{

  constructor(props){
    super(props)
    this.state={
      post: null,
      div1: 'prev',
      div2: 'active',
      div3: 'next',
    }
  }

  componentDidMount(){
    this.getFirstPost()
  }

  getFirstPost = async() =>{
    let params = {
      orderby: "date",
      per_page: 1
    };
    const url = new URL ( 'http://www.juananrodriguez.es/wp-json/wp/v2/posts')

    Object.keys( params ).forEach( key => url.searchParams.append( key, params[ key ] ) );

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(post => {
        this.setState({
          post: post[0]
        })
      });
  }

  getPostById = async(id) => {
    let params = {
      include: id,
    };

    const url = new URL('http://www.juananrodriguez.es/wp-json/wp/v2/posts')

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(post => {
        this.setState({
          post: post[0],
        })
      });
  }

  changePages(dir){
    const { div1 } = this.state

    if(dir==='next'){
      if( div1 === 'prev') this.setState({
        div1: 'next',
        div2: 'prev',
        div3: 'active',
      })
      else if( div1 === 'active') this.setState({
        div1: 'prev',
        div2: 'active',
        div3: 'next',
      })
      else if( div1 === 'next') this.setState({
        div1: 'active',
        div2: 'next',
        div3: 'prev',
      })
    }
  }

  nextPage = () => {
    console.log('next')
    this.changePages('next')


    // post.next_post && this.getPostById(post.next_post)
  }

  prevPage = () => {
    // post.prev_post && this.getPostById(post.prev_post)
  }

  render(){

    const { post, div1, div2, div3 } = this.state;
    return (
      <Layout>
        <SEO title="Page two" />
        <Swiper
          onUp={()=> console.log('on up')}
          onRight={this.nextPage}
          onLeft={this.prevPage}
          onDown={()=> console.log('on down')}
        >
          <div className={'WrapperPosts'}>
            <div className={`${div1} post blue`}>
              post 1
            </div>

            <div className={`${div2} post green`}>
              post 2
            </div>

            <div className={`${div3} post orange`}>
              post 3
            </div>
          </div>
          {
            post &&
            <>
              {post.full && <img src={post.full} />}
              <p>ID: {post.id}</p>
              <p>Title: {post.title.rendered}</p>
              {post.next_post && <button onClick={()=>this.getPostById(post.next_post)}>Next</button>}
              {post.prev_post && <button onClick={()=>this.getPostById(post.prev_post)}>Prev</button>}
            </>
          }

        </Swiper>

      </Layout>
    )
  }
}

export default SecondPage
