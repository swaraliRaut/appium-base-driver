import log from './logger';
import validator from 'validate.js';
import B from 'bluebird';


let desiredCapabilityConstraints = {
  platformName: {
    presence: true,
    isString: true,
  },
  deviceName: {
    isString: true
  },
  platformVersion: {
    isString: true
  },
  newCommandTimeout: {
    isNumber: true
  },
  automationName: {
    isString: true
  },
  autoLaunch: {
    isBoolean: true
  },
  udid: {
    isString: true
  },
  orientation: {
    inclusion: [
      'LANDSCAPE',
      'PORTRAIT'
    ]
  },
  autoWebview: {
    isBoolean: true
  },
  noReset: {
    isBoolean: true
  },
  fullReset: {
    isBoolean: true
  },
  language: {
    isString: true
  },
  locale: {
    isString: true
  },
  eventTimings: {
    isBoolean: true
  },
  printPageSourceOnFindFailure: {
    isBoolean: true
  },
  skipAppUninstall: {
    isBoolean: true
  },
};

validator.validators.isString = function isString (value) {
  if (typeof value === 'string') {
    return null;
  }

  if (typeof value === 'undefined') {
    return null;
  }

  return 'must be of type string';
};
validator.validators.isNumber = function isNumber (value) {
  if (typeof value === 'number') {
    return null;
  }

  if (typeof value === 'undefined') {
    return null;
  }

  // allow a string value
  if (typeof value === 'string' && !isNaN(value)) {
    log.warn('Number capability passed in as string. Functionality may be compromised.');
    return null;
  }

  return 'must be of type number';
};
validator.validators.isBoolean = function isBoolean (value) {
  if (typeof value === 'boolean') {
    return null;
  }

  // allow a string value
  if (typeof value === 'string' && ['true', 'false', ''].includes(value)) {
    return null;
  }

  if (typeof value === 'undefined') {
    return null;
  }

  return 'must be of type boolean';
};
validator.validators.isObject = function isObject (value) {
  if (typeof value === 'object') {
    return null;
  }

  if (typeof value === 'undefined') {
    return null;
  }

  return 'must be of type object';
};
validator.validators.isArray = function isArray (value) {
  if (Array.isArray(value)) {
    return null;
  }

  if (typeof value === 'undefined') {
    return null;
  }

  return 'must be of type array';
};
validator.validators.deprecated = function deprecated (value, options, key) {
  if (options) {
    log.warn(`${key} is a deprecated capability`);
  }
  return null;
};
validator.validators.inclusionCaseInsensitive = function inclusionCaseInsensitive (value, options) {
  if (typeof value === 'undefined') {
    return null;
  } else if (typeof value !== 'string') {
    return 'unrecognised';
  }
  for (let option of options) {
    if (option.toLowerCase() === value.toLowerCase()) {
      return null;
    }
  }
  return `${value} not part of ${options.toString()}`;
};

validator.promise = B;
validator.prettify = function prettify (val) {
  return val;
};


export { desiredCapabilityConstraints, validator };
