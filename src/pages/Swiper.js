import React from 'react'
import Swiper from '../components/Swiper';


class Page extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      posts: []
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
          posts: [...post[0], ...this.state.posts]
        })
        console.log(post[0])
        post[0].next_post && this.getNextPost(post[0].next_post);
        // post[0].prev_post && this.getPostById(post[0].prev_post);
      });
  }

  getNextPost = async (id) => {

    let result = this.state.posts.find(post => post.id === id)
    if(!result) {
      result = await this.getPostById(id);
      this.setState({
        posts: [...this.state.posts, ...result]
      })
    }
  }

  getPostById = async(id) => {
    let params = {
      include: id,
    };

    const url = new URL('http://www.juananrodriguez.es/wp-json/wp/v2/posts')

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(post => {
        return post[0]
      });
  }

  render(){
    const {posts} = this.state;
    return(
      <Swiper
        onRight = {(page)=>console.log(page)}
        onLeft = {(page)=>this.getNextPost(posts[page].next_post)}
      >
        {posts.map(post =>(
          <div key={post.id}>
            {post.full && <img src={post.full} />}
            <p>ID: {post.id}</p>
            <p>Title: {post.title.rendered}</p>
          </div>
        ))}
      </Swiper>
    )
  }
}

export default Page;