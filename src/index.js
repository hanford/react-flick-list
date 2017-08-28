import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import document from 'global/document'
import window from 'global/window'

class Kinetic extends PureComponent {

  reference = 0
  velocity = 0
  offset = 0
  amplitude = 0
  timestamp = null
  ticker = null

  state = {
    min: 0,
    max: 0,
    pressed: false
  }

  static defaultProps = {
    broadcast: () => {},
    element: document.body,
    direction: 'y',
    allowTaps: true,
    max: 0,
    min: 0
  }

  componentDidMount () {
    const { element } = this.props

    this.calcSize(this.props)

    element.addEventListener('touchstart', this.tap)
    element.addEventListener('touchmove', this.drag)
    element.addEventListener('touchend', this.release)
  }

  componentWillUpdate (nextProps) {
    this.calcSize(nextProps)
  }

  componentWillUnmount () {
    const { element } = this.props

    element.removeEventListener('touchstart', this.tap)
    element.removeEventListener('touchmove', this.drag)
    element.removeEventListener('touchend', this.release)
  }

  calcSize = ({ element }) => {
    const offset = this.isDirectionVertical() ? element.offsetHeight : element.offsetWidth

    this.setState({ max: this.props.max || offset, min: this.props.min || 0 })
  }

  isDirectionVertical = () => {
    const { direction } = this.props

    return direction === 'y'
  }

  scroll = pos => {
    let t = (pos > this.state.max) ? this.state.max : (pos < this.state.min && !this.state.pressed) ? this.state.min : pos

    this.offset = t
    this.position = t

    this.props.broadcast({ position: t, pressed: this.state.pressed })
  }

  tap = event => {
    this.setState({ pressed: true })

    const { pageY, pageX } = event.touches[0]

    const size = this.isDirectionVertical() ? pageY : pageX

    this.reference = size
    this.amplitude = 0
    this.velocity = 0
    this.frame = this.offset // potentially remove

    clearInterval(this.ticker)

    this.timestamp = Date.now()
    this.ticker = setInterval(this.track, 50)

    if (this.props.allowTaps === false) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  drag = event => {
    if (this.state.pressed) {
      const { pageY, pageX } = event.touches[0]

      const pos = this.isDirectionVertical() ? pageY : pageX

      this.delta = this.reference - pos

      if (this.delta > 2 || this.delta < -2) {
        this.reference = pos

        let r = this.delta + this.offset || this.delta

        this.scroll(r)
      }
    }

    if (this.props.allowTaps === false) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  release = event => {
    this.setState({ pressed: false })

    clearInterval(this.ticker)
    this.ticker = null

    if (this.velocity > 10 || this.velocity < -10) {
      this.amplitude = 0.8 * this.velocity

      this.target = Math.round(this.offset + this.amplitude)

      this.timestamp = Date.now()

      window.requestAnimationFrame(this.autoScroll)
    }

    if (this.props.allowTaps === false) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  track = () => {
    const now = Date.now()
    this.elapsed = now - this.timestamp
    this.timestamp = now

    this.delta = this.offset - this.frame
    this.frame = this.offset

    let v = 1000 * this.delta / (1 + this.elapsed)
    this.velocity = 0.8 * v + 0.2 * this.velocity
  }

  autoScroll = () => {
    if (this.amplitude) {
      this.elapsed = Date.now() - this.timestamp
      this.delta = -this.amplitude * Math.exp(-this.elapsed / 325) // ms

      if (this.delta > 0.5 || this.delta < -0.5) {
        this.scroll(this.target + this.delta)

        window.requestAnimationFrame(this.autoScroll)
      } else {
        this.scroll(this.target)
      }
    }
  }

  render () {
    return null
  }
}

export default Kinetic
