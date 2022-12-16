# js-doci

Javascript implementation of the doci protocol. See https://github.com/taubyte/go-doci.

### Performs encode, decode and a dns txt lookup

### function encode
```
Encodes a given string and timestamp in SHA-1 returning the base64 representation
```

### function decode
```
Decodes a given hash returning the decoded hash and timestamp
```

### function lookup
```
Performs a DNS TXT record lookup on given DNS and returns decoded record
```

## Installation

```
yarn add git+ssh://git@bitbucket.org/taubyte/js-doci.git


yarn add bitbucket:taubyte/js-doci.git

```

## Update
```
yarn upgrade @taubyte/js-doci
```


## Testing
```
yarn test
```


## Usage

```js
import {decode, encode, lookup} from '@taubyte/js-doci'

var teststring = "Hello World"
var test_time = 1
var encoded = await encode(teststring, test_time)
console.log(encoded)

//>> pWExZGRvY2lhMgFiMTZrSGVsbG8gV29ybGRiNjMBYjY0VhEUCk1VqNd45QIvq3AZd8XYQLvEhtA

var decoded = await decode(encoded)
console.log(decoded)

//>> {"data":"Hello World","timestamp":1}

var testlookup = '__elders__.net.taubyte.com'
var dns = await lookup(testlookup)
console.log(dns)

//>> [{"data":"/ip4/139.178.89.23/tcp/4200/p2p/12D3KooWM3TM4KXHqvnJef72rPKhZ2kkPPupD44nakC29GLMkN5i","timestamp":1635806209},{"data":"/ip4/145.40.64.183/tcp/4200/p2p/12D3KooWQyS1ikgrHf7x7uUtajrQehaMLwN6Bo1cxSTHsoCY72Zt","timestamp":1635806295}]

```

## Generate Documentation
```
yarn doc
```



# Maintainers
 - Tafseer Khan @tafseer-khan
 - Samy Fodil @samyfodil
