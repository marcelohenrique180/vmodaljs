/* global describe, it, before */

import chai from 'chai';
import {Instance} from '../lib/vmodaljs.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of my Instance library', () => {
  before(() => {
    lib = new Instance();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('Instance');
    });
  });
});