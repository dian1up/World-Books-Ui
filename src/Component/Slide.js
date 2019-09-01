import React from 'react'
import { Slide } from 'react-slideshow-image'
import '../App.css'

const properties = {
  duration: 1500,
  transitionDuration: 500,
  infinite: true,
  indicators: false,
  arrows: false,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`)
  }
}

const Slideshow = () => {
  return (
    <div className='slide-container'>
      <Slide {...properties}>
        <div className='each-slide'>
          <div style={{ backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0051/7692/products/aba-000007-pp-2_660x@2x.progressive.jpg?v=1482333680)' }} />
        </div>
        <div className='each-slide'>
          <div style={{ backgroundImage: 'url(https://kali.training/wp-content/uploads/2017/06/kali-linux-revealed-book-mock-3.png)' }} />
        </div>
        <div className='each-slide'>
          <div style={{ backgroundImage: 'url(https://brenebrown.com/wp-content/uploads/2018/05/braving-the-wilderness-image.jpg)' }} />
        </div>
      </Slide>
    </div>
  )
}

export default Slideshow
