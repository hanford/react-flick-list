## react-flick-list

> react bindings for kinetic scrolling

This library implements native like scrolling inertia / momentum entirely in JavaScript. It's useful if you have an absolutely positioned element and need to animate/transform it in a way that feels natural. I couldn't have done it without this [article](https://ariya.io/2013/11/javascript-kinetic-scrolling-part-2)

<br />

## Install

```
$ npm install react-flick-list --save
```

## Usage

```js
import Kinetic from 'react-flick-list'

..

transformElement = ({ position }) => {
  this.setState({ position })
}

render () {
  const { position } = this.state

  return (
    <div style={{ transform: `translateY(${position}px)` }}>
      {this.list && <Kinetic element={this.list} broadcast={this.transformElement}/>}

      <List ref={c => this.list = c} {...props} />
    </div>
  )
}
```

![preview](https://github.com/hanford/react-flick-list/blob/master/example.gif)

## API
| Param          | Type    | functionality | required |
|----------------|---------|-----------------|-----------------|
| direction      | String ('y', 'x') | tell the library to calculate sizes based on height or width of element | false |
| broadcast       | function    | notify HOC of position changes | true |
| max | Number | maxiumum amount to allow library to scroll | false |
| min | Number | minimum amount to allow library to scroll | false |
| element | ref | element to measure / record scrolls on | true |

## License

MIT © [Jack Hanford](http://jackhanford.com)
