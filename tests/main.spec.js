import { expect } from 'chai';

describe('Main', () => {
  let arr;

  beforeEach(()=>{
    arr = [1,2,3];
  });

  it('should an array', () => {
    expect(arr).to.be.an('array');
  });

  it('should have a size of 4 when push another value to the array', () => {
    arr.push(4);
    expect(arr).to.have.lengthOf(4);
  });

  it('should remove the value 3 when use pop in the array', () => {
    arr.pop();
    expect(arr).to.not.include(3);
  });

  it('should have a size of 2 when pop a value from the array', () => {
    arr.pop();
    expect(arr).to.have.lengthOf(2);
  });
});
