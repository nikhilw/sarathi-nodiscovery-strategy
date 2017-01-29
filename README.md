# sarathi-nodiscovery-strategy
Implementation of Sarathi's discovery API with direct links for when no discovery server is used.

[![Build Status](https://travis-ci.org/nikhilw/sarathi-nodiscovery-strategy.svg?branch=master)](https://travis-ci.org/nikhilw/sarathi-nodiscovery-strategy) [![Coverage Status](https://coveralls.io/repos/github/nikhilw/sarathi-nodiscovery-strategy/badge.svg?branch=master)](https://coveralls.io/github/nikhilw/sarathi-nodiscovery-strategy?branch=master)

## Installation
```npm
npm install --save sarathi-nodiscovery-strategy
```
## Features
Enables using [Sarathi](https://www.npmjs.com/package/sarathi) as declarative rest client, even when no discovery server is being used. Allows for setting service instances directly and make use of load balancing capabilities of Sarathi.

## Usage
```javascript
var NodiscoveryStrategy = require("sarathi-nodiscovery-strategy").DiscoveryStrategy;
var ds = new NodiscoveryStrategy({instances: ["http://localhost:3000", "http://localhost:3001"]})
sarathiClientBuilder.setDiscoveryStrategy(ds);
```
## Options
* instances: ```Array[String]``` An array of urls pointing to servers of the service. This is basically the hardcoded discovery.

## API
### StrategyBuilder
A builder exposed by the package: ```require("sarathi-nodiscovery-strategy").StrategyBuilder```

#### StrategyBuilder#setInstances#setInstances(instances)
Same as ```instances``` option.

#### StrategyBuilder#setInstances#build()
Returns instance of DiscoveryStrategy.
