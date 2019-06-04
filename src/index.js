import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import window from 'global/window'

export default class ReactFlickList extends PureComponent {
  reference = 0
  velocity = 0
  offset = 0
  amplitude = 0
  timestamp = null
  ticker = null

  state = {
    min: 0,
    max: 0,
    pressed: false,
    position: 0
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    direction: PropTypes.string,
    allowTaps: PropTypes.bool,
    allowScroll: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    getRef: PropTypes.func,
    ignoreLimits: PropTypes.bool,
    onClick: PropTypes.func,
    onStart: PropTypes.func,
    onScrolling: PropTypes.func,
    onStop: PropTypes.func,
    stop: PropTypes.bool,
    style: PropTypes.object
  }

  static defaultProps = {
    direction: 'y',
    allowTaps: true,
    allowScroll: true,
    max: 0,
    min: 0,
    ignoreLimits: false,
    getRef: () => {},
    onClick: () => {},
    onStart: () => {},
    onScrolling: () => {},
    onStop: () => {}
  }

  componentDidMount () {
    this.calcSize(this.props)

    this.root.addEventListener('touchstart', this.tap)
    this.root.addEventListener('touchmove', this.drag)
    this.root.addEventListener('touchend', this.release)
  }

  componentWillUpdate (nextProps) {
    this.calcSize(nextProps)

    if (nextProps.stop) {
      this.reset()
    }
  }

  componentWillUnmount () {
    this.root.removeEventListener('touchstart', this.tap)
    this.root.removeEventListener('touchmove', this.drag)
    this.root.removeEventListener('touchend', this.release)
  }

  reset = () => {
    this.reference = 0
    this.velocity = 0
    this.offset = 0
    this.amplitude = 0
    this.timestamp = null
    this.ticker = null
  }

  calcSize = () => {
    const offset = this.isDirectionVertical() ? this.root.offsetHeight : this.root.offsetWidth

    this.setState({ max: this.props.max || offset, min: this.props.min || 0 })
  }

  isDirectionVertical = () => {
    const { direction } = this.props

    return direction === 'y'
  }

  scroll = pos => {
    let t

    if (this.ignoreLimits === true) {
      t = pos
    } else {
      t = (pos > this.state.max) ? this.state.max : (pos < this.state.min && !this.state.pressed) ? this.state.min : pos
    }

    this.offset = t

    this.setState({ position: t })
  }

  tap = event => {
    if (!this.props.allowScroll) return

    this.setState({ pressed: true })

    const { pageY, pageX } = event.touches[0]

    const size = this.isDirectionVertical() ? pageY : pageX

    this.reference = size
    this.amplitude = 0
    this.velocity = 0
    this.frame = this.offset

    clearInterval(this.ticker)

    this.timestamp = Date.now()
    this.ticker = setInterval(this.track, 50)

    if (this.props.allowTaps === false) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  drag = event => {
    event.preventDefault()
    event.stopPropagation()

    if (!this.props.allowScroll) return

    if (this.state.pressed) {
      const { pageY, pageX } = event.touches[0]

      const pos = this.isDirectionVertical() ? pageY : pageX

      this.delta = this.reference - pos

      if (this.delta > 2 || this.delta < -2) {
        this.reference = pos

        let r = this.delta + this.offset || this.delta

        this.scroll(r)
      }

      this.props.onStart()
    }

    // if (this.props.allowTaps === false) {
    //   event.preventDefault()
    //   event.stopPropagation()
    // }
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
        this.props.onScrolling()
      } else {
        this.scroll(this.target)
        this.props.onStop(this.target)
      }
    } else {
      this.props.onStop(this.target)
    }
  }

  getRef = root => {
    this.root = root

    if (this.props.getRef) {
      this.props.getRef(root)
    }
  }

  render () {
    const { style, className, onClick } = this.props

    return (
      <div
        ref={this.getRef}
        style={style}
        className={className}
        onClick={onClick}
      >
        {this.props.children(this.state)}
      </div>
    )
  }
}
