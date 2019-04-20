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
  transform: translateX(${p=>p.left}px);
  // overflow: hidden;
  position: relative;
  transition: transform 100ms
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
    this.state = {
      clientX : 0,
      clientEnterX : 0,
      clientY : 0,
      clientEnterY : 0,

      width: 0,
      height: 0,
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

  // On desktop

  dragStart = (e) =>{

    this.setState({
      clientEnterX: e.pageX,
      clientEnterY: e.pageY,
    })

    // const crt = this.Swipe.cloneNode(true);
    // crt.style.opacity = 0; /* or visibility: hidden, or any of the above */
    // document.body.appendChild(crt);
    // e.dataTransfer.setDragImage(crt, 0, 0);
  }

  drag = (e) =>{
    e.preventDefault();
    e.stopPropagation();

    if(e.pageX !== 0)
      this.setState({
        clientX: e.pageX - this.state.clientEnterX,
        clientY: e.pageY - this.state.clientEnterY,
      })
  }


  // On Mobile
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
      clientX: e.touches[0].pageX - this.state.clientEnterX,
      clientY: e.touches[0].pageY - this.state.clientEnterY,
    })
  }

  end = () => {
    if(Math.abs(this.state.clientX * 100 / this.state.width) > 40)
      alert('debería cambiar de diapo')

    this.setState({
      clientX: 0,
      clientY: 0,
    })
  }

  render(){
    return(
      <Wrapper>
        <Example
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
          Client X = {this.state.clientX}
          Client Y = {this.state.clientY}
          Client Enter X  = {this.state.clientEnterX}
          Client Enter Y = {this.state.clientEnterY}


          <Slide backgroundColor={'red'} className={'prev'} />
          <Slide backgroundColor={'green'} className={'current'} />
          <Slide backgroundColor={'orange'} className={'next'}/>

        </Example>
      </Wrapper>
    )
  }
}

export default Swiper;