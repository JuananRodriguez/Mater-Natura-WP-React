import React from 'react';


// credit: http://www.javascriptkit.com/javatutors/touchevents2.shtml
function swipedetect(el, callback){

  var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}

  touchsurface.addEventListener('touchstart', function(e){
    var touchobj = e.changedTouches[0]
    swipedir = 'none'
    var dist = 0
    startX = touchobj.pageX
    startY = touchobj.pageY
    startTime = new Date().getTime() // record time when finger first makes contact with surface
    e.preventDefault()
  }, false)

  touchsurface.addEventListener('touchmove', function(e){
    e.preventDefault() // prevent scrolling when inside DIV
  }, false)

  touchsurface.addEventListener('touchend', function(e){
    var touchobj = e.changedTouches[0]
    distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
    distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
    elapsedTime = new Date().getTime() - startTime // get time elapsed
    if (elapsedTime <= allowedTime){ // first condition for awipe met
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
        swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
      }
      else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
        swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
      }
    }
    handleswipe(swipedir)
    e.preventDefault()
  }, false)
}

class Swipe extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      direction: 'none'
    }
    this.componentMounted = null;
  }

  componentDidMount() {
    swipedetect(this.componentMounted, (direction) => {
      this.setState({
        direction: direction
      })
    })
  }

  componentDidUpdate(){
    switch (this.state.direction){
      case 'right':
        this.props.onRight()
        this.setState({direction: 'none'})
        break;
      case 'up':
        this.props.onUp()
        this.setState({direction: 'none'})
        break;
      case 'left':
        this.props.onLeft();
        this.setState({direction: 'none'})
        break;
      case 'down':
        this.props.onDown();
        this.setState({direction: 'none'})
        break;
      case 'none':
      default:
        this.props.onNone()
    }
  }

  render(){
    const {children} = this.props;
    return(

      <div ref={node => this.componentMounted = node}>
        {children}
      </div>


    )
  }
}

Swipe.defaultProps = {
  onUp: ()=>{},
  onLeft: ()=>{},
  onRight: ()=>{},
  onDown: ()=>{},
  onNone: ()=>{},
}

export default Swipe;