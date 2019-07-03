# idisk
Get information about disk usage in Node.JS.

## Install
```
npm install idisk
```

## Usage
```javascript
const idisk = require('idisk')

//Using default path ('C:' for Windows and '/' for Linux)
idisk().then(info => {
	console.log(info.free)
	console.log(info.used)
	console.log(info.total)
})

//Using a specific path
idisk('C:').then(info => {
	console.log(info.free)
	console.log(info.used)
	console.log(info.total)
})
```