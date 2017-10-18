import React, { PureComponent } from 'react'

export default class List extends PureComponent {
  render () {
    const { componentStyle } = this.props

    return (
      <div style={{ ...componentStyle}}>
        <div className='list-item'>Alabama</div>
        <div className='list-item'>Alaska</div>
        <div className='list-item'>Arizona</div>
        <div className='list-item'>Arkansas</div>
        <div className='list-item'>California</div>
        <div className='list-item'>Colorado</div>
        <div className='list-item'>Connecticut</div>
        <div className='list-item'>Delaware</div>
        <div className='list-item'>Florida</div>
        <div className='list-item'>Georgia</div>
        <div className='list-item'>Hawaii</div>
        <div className='list-item'>Idaho</div>
        <div className='list-item'>Illinois Indiana</div>
        <div className='list-item'>Iowa</div>
        <div className='list-item'>Kansas</div>
        <div className='list-item'>Kentucky</div>
        <div className='list-item'>Louisiana</div>
        <div className='list-item'>Maine</div>
        <div className='list-item'>Maryland</div>
        <div className='list-item'>Massachusetts</div>
        <div className='list-item'>Michigan</div>
        <div className='list-item'>Minnesota</div>
        <div className='list-item'>Mississippi</div>
        <div className='list-item'>Missouri</div>
        <div className='list-item'>Montana Nebraska</div>
        <div className='list-item'>Nevada</div>
        <div className='list-item'>New Hampshire</div>
        <div className='list-item'>New Jersey</div>
        <div className='list-item'>New Mexico</div>
        <div className='list-item'>New York</div>
        <div className='list-item'>North Carolina</div>
        <div className='list-item'>North Dakota</div>
        <div className='list-item'>Ohio</div>
        <div className='list-item'>Oklahoma</div>
        <div className='list-item'>Oregon</div>
        <div className='list-item'>Pennsylvania Rhode Island</div>
        <div className='list-item'>South Carolina</div>
        <div className='list-item'>South Dakota</div>
        <div className='list-item'>Tennessee</div>
        <div className='list-item'>Texas</div>
        <div className='list-item'>Utah</div>
        <div className='list-item'>Vermont</div>
        <div className='list-item'>Virginia</div>
        <div className='list-item'>Washington</div>
        <div className='list-item'>West Virginia</div>
        <div className='list-item'>Wisconsin</div>
        <div className='list-item'>Wyoming</div>
      </div>
    )
  }
}

