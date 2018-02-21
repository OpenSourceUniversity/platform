/* eslint-disable */

const Course = artifacts.require("./courses/Course.sol");

contract('TestCourse', (accounts) => {
  const owner = web3.eth.accounts[0];
  const osu = web3.eth.accounts[1];
  var courseInstance;

  it('Deployment', function() {
    return Course.deployed(owner, osu).then(function(instance) {
      courseInstance = instance;
    });
  });

  it('Initial information: owner', () => {
    return courseInstance.owner.call().then((result) => {
      assert.equal(result, owner);
    });
  });

  it('Initial information: !owner', () => {
    return courseInstance.owner.call().then((result) => {
      assert.notEqual('0xsomeothervaluebutnottherightone', owner);
    });
  });

  it('Initial information: osu', () => {
    return courseInstance.osu.call().then((result) => {
      assert.equal(result, osu);
    });
  });

  it('Test adding a course', () => {
    return courseInstance.addCourse(
      '0x0000000000000000000000000000000000000000',  // Verifier
      ['Python', 'Yoga'],
      5,
      10,
      ['Introduction to', ' Python programming & Yoga'],
      ['0x0000000000000000000000000000000000000001'],
      ['0x0000000000000000000000000000000000000002'],
      'Category',
      'Subcategory'
    );
  });

  it('Test length correctly retrieved', () => {
    return courseInstance.getLength.call().then((result) => {
      assert.equal(result, 1);
    });
  });

});

/* eslint-enable */
