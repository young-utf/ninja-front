# ninja-front

The best project ever.

## Getting Started
### On the server
Install the module with: `npm install ninja-front`

```javascript
var ninja_front = require('ninja-front');
ninja_front.awesome(); // "awesome"
```

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/youngmoon/ninja-front/master/dist/ninja-front.min.js
[max]: https://raw.github.com/youngmoon/ninja-front/master/dist/ninja-front.js

In your web page:

```html
<script src="dist/ninja-front.min.js"></script>
<script>
awesome(); // "awesome"
</script>
```

In your code, you can attach ninja-front's methods to any object.

```html
<script>
var exports = Bocoup.utils;
</script>
<script src="dist/ninja-front.min.js"></script>
<script>
Bocoup.utils.awesome(); // "awesome"
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "lib" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 youngmoon  
Licensed under the MIT license.
