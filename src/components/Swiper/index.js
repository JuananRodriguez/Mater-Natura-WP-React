import React from 'react';
import Styled from 'styled-components';

const Wrapper = Styled('section')`
  width: 100%;
  height: 80vh;
  overflow: hidden;
`;

const Example = Styled('div')`
  height: 100%;
  transform: translateX(0%);
  position: relative;
  ${p=>p.transition && `transition: transform 100ms`}
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
  transition: transform 100ms;
  transform: translateX(${p=>p.left}%);
  background: white;
  
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

class Swiper extends React.PureComponent{

  constructor(props){
    super(props)
    this.Swipe = null;
    this.Ghost = null;
    this.debug = false;

    // Save position of cursor whe move event start
    this.clientEnterX = 0;
    this.clientEnterY = 0;

    // Update position while move
    this.clientX = 0
    this.clientY = 0;

    // Save Last translationX
    this.auxClientX = 0;
    this.state = {
      withTransition:true,
      page:this.props.initialPage,
      width: 0,
      height: 0
    }
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
  dragStart = (e) => {
    e.dataTransfer.setDragImage(this.Ghost, 0, 0);
    this.clientEnterX = e.pageX;
    this.clientEnterY = e.pageY;
    this.Ghost.style.opacity = 0;
  }

  drag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if(e.pageX !== 0) {
      this.calcMove(e.pageX);
      this.clientY = e.pageY - this.clientEnterY;
    }
  }


  /*** On Mobile ***/
  touchMoveStart = (e) =>{
      this.clientEnterX = e.touches[0].pageX;
      this.clientEnterY = e.touches[0].pageY;
  }

  touchMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.calcMove(e.touches[0].pageX);
    this.clientY = e.touches[0].pageY - this.clientEnterY;
  }


  /***** Commons Functions ****/

  calcMove(positionX){
    this.positionX = positionX;
    const result = (positionX - this.clientEnterX) * 100 / this.Swipe.offsetWidth; //Percent
    if ( result < 0 && this.props.children[this.state.page + 1] || result > 0 && this.props.children[this.state.page - 1] ) {
      this.Swipe.style.transform = `translateX(${this.auxClientX + result }%)`
    }
  }


  end = ( result = this.positionX ) => {
    result = (this.positionX - this.clientEnterX) * 100 / this.Swipe.offsetWidth; //Percent
    this.auxClientX = result < -45 ? -100 : result > 45 ? 100 : 0;
    this.Swipe.style.transform = `translateX(${this.auxClientX}%)`;
    console.log(this.Swipe.style.transform);
    this.calcView(result < -45 ? this.state.page + 1 : result > 45 ? this.state.page - 1 : this.state.page);
  }


  calcView = (page) =>{

    /**
    setTimeout(()=> {
      if (this.state.page + 1 === page && this.props.onLeft)
        this.props.onLeft(this.state.page + 1)

      else if (this.state.page - 1 === page && this.props.onRight)
        this.props.onRight(this.state.page - 1)
    },200);*/


    setTimeout(()=>this.setState({
      withTransition: false,
      page: page,
    },this.reset),200);

    setTimeout(()=> this.setState({
      withTransition: true
    }),300);
  }

  reset(){
    this.Swipe.style.transform = `translateX(0%)`;
    this.auxClientX = 0;
  }
  render(){
    const {children} = this.props;
    const {page, withTransition} = this.state;
    return(
      <Wrapper>
        <span ref={(node)=> this.Ghost = node}/>
        <Example
          transition={withTransition}
          ref={(node)=> this.Swipe = node}
          draggable={true}
          onDragStart={this.dragStart}
          onTouchStart={this.touchMoveStart}


          onDrag={this.drag}
          onTouchMove={this.touchMove}


          onDragEnd ={this.end}
          onTouchEnd={this.end}
        >

          { children[page-1] && <Slide  key={'prev'} className={'prev'}> { children[page-1] } </Slide> }
          { <Slide key={'current'} className={'current'}> { children[page]  } </Slide> }
          { children[page+1] && <Slide key={'next'} className={'next'}> { children[page+1] } </Slide> }

        </Example>
      </Wrapper>
    )
  }
}


Swiper.defaultProps = {
  children: [<p>Something</p>,<p>Something2</p>,<p>Something3</p>],
  initialPage: 0,
  onLeft: () => {},
  onRight: () => {},
}

export default Swiper;
