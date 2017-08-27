import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import document from 'global/document'
import window from 'global/window'

class Kinetic extends PureComponent {
  state = {
    min: 0,
    max: 0,
    reference: 0,
    velocity: 0,
    offset: 0,
    amplitude: 0,
    timestamp: null,
    ticker: null,
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
    const { pressed } = this.state

    let t = (pos > this.state.max) ? this.state.max : (pos < this.state.min && !pressed) ? this.state.min : pos

    this.setState({ offset: t })

    this.props.broadcast({position: t, pressed})
  }

  tap = event => {
    this.setState({ pressed: true })

    const { pageY, pageX } = event.touches[0]

    const size = this.isDirectionVertical() ? pageY : pageX

    this.setState({ reference: size, amplitude: 0, velocity: 0 })

    this.state.frame = this.state.offset

    clearInterval(this.state.ticker)

    this.setState({ timestamp: Date.now(), ticker: setInterval(this.track, 50) })

    if (this.props.allowTaps === false) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  drag = event => {
    if (this.state.pressed) {
      const { pageY, pageX } = event.touches[0]

      const pos = this.isDirectionVertical() ? pageY : pageX

      const { reference } = this.state

      this.delta = reference - pos

      if (this.delta > 2 || this.delta < -2) {
        this.setState({ reference: pos })

        let r = this.delta + this.state.offset || this.delta
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

    clearInterval(this.state.ticker)

    if (this.state.velocity > 10 || this.state.velocity < -10) {
      this.setState({ amplitude: 0.8 * this.state.velocity })

      this.target = Math.round(this.state.offset + this.state.amplitude)

      this.setState({ timestamp: Date.now() })

      window.requestAnimationFrame(this.autoScroll)
    }

    this.setState({ ticker: null })

    if (this.props.allowTaps === false) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  track = () => {
    const now = Date.now()
    this.elapsed = now - this.state.timestamp
    this.setState({ timestamp: now })

    let delta = this.state.offset - this.state.frame
    let frame = this.state.offset

    let v = 1000 * delta / (1 + this.elapsed)
    let velocity = 0.8 * v + 0.2 * this.state.velocity

    this.setState({ velocity, frame, delta })
  }

  autoScroll = () => {
    if (this.state.amplitude) {
      this.elapsed = Date.now() - this.state.timestamp
      this.delta = -this.state.amplitude * Math.exp(-this.elapsed / 325) // ms

      if (this.delta > 0.5 || this.delta < -0.5) {
        this.scroll(this.target + this.delta)

        // ayy recursion
        requestAnimationFrame(this.autoScroll)
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
