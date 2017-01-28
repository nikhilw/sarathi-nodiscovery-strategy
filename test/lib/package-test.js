var chai = require("chai");
chai.should();

var Strategy = require("../../lib/index");
var SarathiDiscoveryStrategy = require("sarathi-discovery-strategy");
var StrategyBuilder = Strategy.StrategyBuilder;

describe("nodiscovery-discovery-strategy", function() {
	it("should export DiscoveryStrategy constructor directly from package.", function () {
		Strategy.should.be.a("function");
		Strategy.should.be.equal(Strategy.DiscoveryStrategy);
	});

	it("should export DiscoveryStrategy constructor", function () {
		Strategy.DiscoveryStrategy.should.be.a("function");
	});

	it("should export StrategyBuilder constructor", function () {
		Strategy.StrategyBuilder.should.be.a("function");
	});
});

describe("Strategy", function () {
	var nodiscoveryStrategy;

	beforeEach(function () {
		nodiscoveryStrategy = new Strategy({instances: ["url1", "url2"]});
	});

	it("should throw exception if instances is not passed", function () {
		(function () {
			new Strategy({});
		}).should.Throw(Error, "instances must be defined for direct discovery");
	});

	it("should throw exception if instances is blank", function () {
		(function () {
			new Strategy({instances:[]});
		}).should.Throw(Error, "instances must be defined for direct discovery");
	});

	it("should be an instance of consul-discovery-strategy", function () {
		nodiscoveryStrategy.should.be.an.instanceOf(SarathiDiscoveryStrategy);
	});

	it("#discoverInstances should start discovery", function(callback) {
		nodiscoveryStrategy.getDiscoveredInstances().should.be.empty;
		(function () {
			nodiscoveryStrategy.discoveryDone();
		}).should.Throw(Error);

		nodiscoveryStrategy.discoverInstances();

		nodiscoveryStrategy.getDiscoveredInstances().length.should.equal(2);
		nodiscoveryStrategy.discoveryDone((function() {
			var done = false;

			setTimeout(function () {
				if(!done) {
					return callback(new Error("Timeout, discovery promise not resolved."));
				}
			}, 200);

			return function () {
				done = true;
				return callback();
			}
		})());
	});
});

describe("StrategyBuilder", function () {
	var builder;
	beforeEach(function () {
		builder = new StrategyBuilder();
	});

	it("#setInstances should return builder to all chaining", function () {
		var testBuilder = builder.setInstances(["url1", "url2"]);
		testBuilder.should.equal(builder);
	});

	it("#build should return instance of Strategy built with provided properties.", function () {
		var instances = ["url1", "url2"];
		var strategy = builder.setInstances(instances).build();
		strategy.should.be.an.instanceOf(Strategy);
		strategy._discoveryConfig.instances.should.eql(instances);
	});
});
