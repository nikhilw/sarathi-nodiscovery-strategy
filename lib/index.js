// @flow
"use strict";
var util = require("util");
var discoveryStrategy = require("sarathi-discovery-strategy");
var _ = require("lodash");
var Promise = require("promise");

var discoveryDefaults = {
	instances: undefined
};


function NodiscoveryDiscoveryStrategy(options) {
	var discoveryConfig = {};

	if (options) {
		_.merge(discoveryConfig, discoveryDefaults, options);
	}

	if (!(_.isArray(discoveryConfig.instances) && discoveryConfig.instances.length > 0)) {
		throw new Error("instances must be defined for direct discovery");
	}

	var instance = this;
	instance._discoveryConfig = discoveryConfig;
	instance.serviceDiscovery = {
		nodes: [],
		status: undefined
	};
}

util.inherits(NodiscoveryDiscoveryStrategy, discoveryStrategy);

NodiscoveryDiscoveryStrategy.prototype.discoveryDone = function (cb) {
	return this.serviceDiscovery.status.done(cb);
}

NodiscoveryDiscoveryStrategy.prototype.getDiscoveredInstances = function () {
	return this.serviceDiscovery.nodes;
}

NodiscoveryDiscoveryStrategy.prototype.discoverInstances = function () {
	var instance = this;

	_.forEach(instance._discoveryConfig.instances, function(link) {
		instance.serviceDiscovery.nodes.push({
			url: link
		});
	});

	instance.serviceDiscovery.status = new Promise(
		function (resolve, reject) {
			return resolve(instance.serviceDiscovery.nodes);
		}
	)
};


function StrategyBuilder() {
	var discoveryConfig = {};

	this.setInstances = function(instances) {
		discoveryConfig.instances = instances;
	};

	this.build = function () {
		return new NodiscoveryDiscoveryStrategy(discoveryConfig);
	}
}

var exports = module.exports = NodiscoveryDiscoveryStrategy;
exports.DiscoveryStrategy = NodiscoveryDiscoveryStrategy;
exports.StrategyBuilder = StrategyBuilder;
