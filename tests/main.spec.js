import { expect } from 'chai';
let calc = require('../src/main.js');

describe('Calc', () => {
  describe('Smoke tests', () => {
    it('should exists the calc lib', () => {
      expect(calc).to.exist;
    });

    it('should exists the method `sum`', () => {
      expect(calc.sum).to.exist;
      expect(calc.sum).to.be.an.function;
    });

    it('should exists the method `sub`', () => {
      expect(calc.sub).to.exist;
      expect(calc.sub).to.be.an.function;
    });

    it('should exists the method `mult`', () => {
      expect(calc.mult).to.exist;
      expect(calc.mult).to.be.an.function;
    });

    it('should exists the method `div`', () => {
      expect(calc.div).to.exist;
      expect(calc.div).to.be.an.function;
    });
  });

  describe('Sum', () => {
    it('should return 4 when `sum(2,2)`', () => {
      expect(calc.sum(2,2)).to.be.equal(4);
    });
  });

  describe('Sub', () => {
    it('should return 4 when `sub(6,2)`', () => {
      expect(calc.sub(6,2)).to.be.equal(4);
    });

    it('should return -4 when `sub(6,10)`', () => {
      expect(calc.sub(6,2)).to.be.equal(4);
    });
  });

  describe('Mult', () => {
    it('should return 4 when `mult(2,2)`', () => {
      expect(calc.mult(2,2)).to.be.equal(4);
    });
  });

  describe('Div', () => {
    it('should return 4 when `div(4,2)`', () => {
      expect(calc.div(4,2)).to.be.equal(2);
    });
  });
});
