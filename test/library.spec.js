/* global describe, it, before */

import chai from 'chai';
import { resolveTemplate } from '../src/js/vmodal.js';

chai.expect();

const expect = chai.expect;
const fakeFunction = () => {};
const callMe = () => {};
let templatesTest, choosenTemplate;

describe('Given a set of Templates', () => {
  before( () => {
    choosenTemplate = "T2";

    templatesTest = [
      { type: "T1", builder: fakeFunction },
      { type: "T2", builder: callMe },
      { type: "T3", builder: fakeFunction }
    ];
  });

  describe('when I need to know the choosen template', () => {
    it('should return the correct builder', () => {
      expect(resolveTemplate(templatesTest, choosenTemplate)).to.be.equal(callMe);
    });
  });
});