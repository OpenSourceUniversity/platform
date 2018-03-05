/* eslint-disable */

const CoursesStorage = artifacts.require("./courses/CoursesStorage.sol");

contract('TestCoursesStorage', (accounts) => {
  const owner = web3.eth.accounts[0];
  const osu = web3.eth.accounts[1];
  const firstCourse = web3.eth.accounts[2];
  const secondCourse = web3.eth.accounts[3];
  const thirdCourse = web3.eth.accounts[4];
  const proxyAddress = web3.eth.accounts[5];
  const proxyAddress2 = web3.eth.accounts[6];

  var coursesStorageInstance;

//   it('Deployment', function() {
//     return CoursesStorage.deployed(owner, osu).then(function(instance) {
//       coursesStorageInstance = instance;
//     });
//   });
//
//   it('Initial information: owner', () => {
//     return coursesStorageInstance.owner.call().then((result) => {
//       assert.equal(result, owner);
//     });
//   });
//
//   it('Set proxy address', () => {
//     coursesStorageInstance.setProxyAddress(proxyAddress)
//     .then(function(result){
//       assert.equal(Boolean(result), true);
//     });
//   });
//
// /*
//   it('Verify that uninitialized address cant be set as proxy address', () => {
//     coursesStorageInstance.setProxyAddress('0x0')
//   });
// */
//
//   it('Get proxy address', () => {
//     return coursesStorageInstance.getProxyAddress.call().then((result) => {
//       assert.equal(result, proxyAddress);
//     });
//   });
//
//   it('Get proxy address - negative test', () => {
//     return coursesStorageInstance.getProxyAddress.call().then((result) => {
//       assert.notEqual(result, web3.eth.accounts[6]);
//     });
//   });
//
//   it('Test set course view record, call function from proxy address', () => {
//     coursesStorageInstance.setCourseViewRecord(
//       firstCourse,
//       owner,
//       0,
//       0,
//       ['Python', 'Programming'],
//       5,
//       ['Python programming', 'for beginners'],
//       'Category',
//       'SubCategory',
//       {from: proxyAddress}
//     )
//     .then(function (result) {
//         assert.equal(Boolean(result), true, "Test that verify setCourseViewRecord work properly");
//     });
//   });
//
//   it('Test updateUserViewRecord', () => {
//     coursesStorageInstance.updateUserViewRecord(
//       firstCourse,
//       owner,
//       0,
//       0,
//       ['Python', 'Programming'],
//       5,
//       ['Python programming', 'for beginners'],
//       'Category',
//       'SubCategory',
//       {from: proxyAddress}
//     )
//     .then(function(result){
//       assert.equal(Boolean(result), true);
//     });
//   });
//
//   it('Test deleteUserViewRecord', () => {
//     coursesStorageInstance.deleteUserViewRecord(
//       {from: proxyAddress}
//     )
//     .then(function(result){
//         assert.equal(Boolean(result), true);
//     });
//   });
//
// //TODO always return undefined
//   it('Test getCourseViewRecord', () => {
//     coursesStorageInstance.getCourseViewRecord(proxyAddress)
//     .then(function (result) {
//       assert.equal(true, false); //Явно не влиза тук, защото този тест минава, като успешен!?!?!
//       assert.equal(result[0], firstCourse, "Test that verify ower is ok");
//       assert.equal(result[1], owner);
//       assert.equal(result[2].toNumber(), 0);
//       assert.equal(result[3].toNumber(), 0);
//       assert.equal(web3.toUtf8(result[4][0]), 'Python');
//       assert.equal(web3.toUtf8(result[4][1]), 'Programming');
//       assert.equal(result[5].toNumber(), 5);
//       assert.equal(web3.toUtf8(result[6][0]), 'Python programming');
//       assert.equal(web3.toUtf8(result[6][1]), 'for beginners');
//       assert.equal(web3.toUtf8(result[7]), 'Category');
//       assert.equal(web3.toUtf8(result[8]), 'SubCategory');
//     });
//   });



  /*
  //Try to add second record, from new proxy - test failed

  it('Set proxy address', () => {
    coursesStorageInstance.setProxyAddress(proxyAddress2)
    .then(function(result){
      assert.equal(Boolean(result), true);
    });
  });

  it('Test set course view record, call function from proxy address', () => {
    coursesStorageInstance.setCourseViewRecord(
      secondCourse,
      owner,
      0,
      0,
      ['Python', 'Programming'],
      5,
      ['Python programming', 'for beginners'],
      'Category',
      'SubCategory',
      {from: proxyAddress2}
    )
    .then(function (result) {
        assert.equal(Boolean(result), true, "Test that verify setCourseViewRecord work properly");
    });
  });
  */

 });


  /* eslint-enable */
