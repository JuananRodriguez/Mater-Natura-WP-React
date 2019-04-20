import React from 'react';
import Styled from 'styled-components';

const Wrapper = Styled('section')`
  width: 100%;
  height: 80vh;
  overflow: hidden;
`;

const Example = Styled('div')`
  // width: 100vw;
  height: 100%;
  transform: translateX(${p=>p.left}%);
  // overflow: hidden;
  position: relative;
  ${p=> p.transition && `transition: transform 100ms`};
`;

const Slide = Styled('div')`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: inline;
  float:left;
  top: 0;
  left: 0;
  position: absolute;
  transform: translateX(${p=>p.left}%);
  background: ${p=>p.backgroundColor}
  
  &.prev{
    transform: translateX(-100%);
  }
  
  &.current{
    transform: translateX(0%);
  }
  
  &.next{
    transform: translateX(100%);
  }
`;

class Swiper extends React.Component{

  constructor(props){
    super(props)
    this.Swipe = null;
    this.Ghost = null;
    this.state = { withTransition:true, page:1, clientX : 0,  clientEnterX : 0, clientY : 0,  clientEnterY : 0, width: 0, height: 0 }
  }

  componentDidMount(){
    if(this.Swipe){
      this.setState({
        width: this.Swipe.offsetWidth,
        height: this.Swipe.offsetHeight
      })
    }
  }

  /*** On desktop ***/
  dragStart = (e) =>{
    this.setState({
      clientEnterX: e.pageX,
      clientEnterY: e.pageY,
    })
    this.Ghost.style.opacity = 0;
    e.dataTransfer.setDragImage(this.Ghost, 0, 0);
  }

  drag = (e) =>{
    e.preventDefault();
    e.stopPropagation();

    if(e.pageX !== 0)
      this.setState({
        clientX: this.calcMove(e.pageX),
        clientY: e.pageY - this.state.clientEnterY,
      })
  }



  /*** On Mobile ***/
  touchMoveStart = (e) =>{
    this.setState({
      clientEnterX: e.touches[0].pageX,
      clientEnterY: e.touches[0].pageY,
    })
  }

  touchMove = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      clientX: this.calcMove(e.touches[0].pageX),
      clientY: e.touches[0].pageY - this.state.clientEnterY,
    })
  }

  /***** Commons Functions ****/

  calcMove(positionX){
    const result = (positionX - this.state.clientEnterX) * 100 / this.Swipe.offsetWidth;
    if ( result < 0 && this.props.children[this.state.page + 1] ||
      result > 0 && this.props.children[this.state.page - 1] )
      return result;
    return this.state.clientX;
  }


  end = () => {
    setTimeout(()=> {
      if (this.state.clientX < -45 && this.props.onLeft)
        console.log('on Left')

      else if (this.state.clientX > 45 && this.props.onRight)
        console.log('on Right')
    },200);


    this.setState({
      clientX: this.state.clientX < -45 ? -100 : this.state.clientX > 45 ? 100 : 0,
      clientY: 0,
    }, () => this.calcView (this.state.clientX < -45 ? this.state.page + 1 : this.state.clientX > 45 ? this.state.page - 1 : this.state.page))

  }

  calcView = (page) =>{
    setTimeout(()=>this.setState({
      withTransition: false,
      clientX: 0,
      clientY: 0,
      page: page,
    }),200);

    setTimeout(()=> this.setState({
      withTransition: true
    }),300);
  }

  buildContent = () =>{
    const {children} = this.props;
    const toReturn = [];

    children.forEach((d, i) =>{
      if(i === this.state.page){
        if(children[i-1])
          toReturn.push(<Slide key={'prev-slide'} className={'prev'}> {children[i-1]} </Slide>);

        toReturn.push(<Slide key={'current-slide'} className={'current'}> {d} </Slide>);

        if(children[i+1])
          toReturn.push(<Slide key={'next-slide'} className={'next'}> {children[i+1]} </Slide>);
      }
    })

    return toReturn;


  }

  render(){
    return(
      <Wrapper>
        <span ref={(node)=> this.Ghost = node}/>
        <Example
          transition={this.state.withTransition}
          left={this.state.clientX}
          ref={(node)=> this.Swipe = node}
          draggable={true}
          onDragStart={this.dragStart}
          onTouchStart={this.touchMoveStart}
          onDrag={this.drag}
          onTouchMove={this.touchMove}





          onDragEnd ={this.end}
          onTouchEnd={this.end}
        >
          {this.buildContent()}
        </Example>
      </Wrapper>
    )
  }
}


Swiper.defaultProps = {
  data: [<p>Something</p>,<p>Something2</p>,<p>Something3</p>],
  onLeft: () => {},
  onRight: () => {},
}

export default Swiper;
