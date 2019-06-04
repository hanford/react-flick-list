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
import FlickList from 'react-flick-list'

..

render () {
  return (
    <FlickList>
      {({ position }) => (
        <List componentStyle={{transform: `translateY(-${position}px)`}}/>
      )}
    </FlickList>
  )
}
```

![preview](https://github.com/hanford/react-flick-list/blob/master/example.gif)

## API

| Param          | Type    | functionality | required |
|----------------|---------|-----------------|-----------------|
| direction      | String ('y', 'x') | tell the library to calculate sizes based on height or width of element | false |
| max | Number | maxiumum amount to allow library to scroll | false |
| min | Number | minimum amount to allow library to scroll | false |
| allowScroll | Boolean | useful for programmatically disallowing scrolling | false |
| className | String | add custom class to wrapper element | false |
| getRef | Function | Add a reference to the list element | false |
| ignoreLimits | Boolean | Ignore min/max limitations when set to true (default is false) | false |
| getRef | Function | Add a reference to the list element | false |
| onStart | Function | Method called when scroll is started | false |
| onScrolling | Function | Method is called while element is scrolling | false |
| onStop | Function | Method is called when scroll has stopped | false |
| style | Object | add custom style object to the div element | false |

## License

MIT © [Jack Hanford](http://jackhanford.com)
