/* eslint-disable */

const Course = artifacts.require("./courses/Course.sol");

contract('TestCourse', (accounts) => {
  const owner = web3.eth.accounts[0];
  const osu = web3.eth.accounts[1];
  var courseInstance;

  // it('Deployment', function() {
  //   return Course.deployed(owner, osu).then(function(instance) {
  //     courseInstance = instance;
  //   });
  // });
  //
  // it('Initial information: owner', () => {
  //   return courseInstance.owner.call().then((result) => {
  //     assert.equal(result, owner);
  //   });
  // });
  //
  // it('Initial information: !owner', () => {
  //   return courseInstance.owner.call().then((result) => {
  //     assert.notEqual('0xsomeothervaluebutnottherightone', owner);
  //   });
  // });
  //
  // it('Initial information: osu', () => {
  //   return courseInstance.osu.call().then((result) => {
  //     assert.equal(result, osu);
  //   });
  // });
  //
  // it('Test adding a course', () => {
  //   courseInstance.addCourse(
  //     '0x0000000000000000000000000000000000000000',  // Verifier
  //     ['Python', 'Yoga'],
  //     5,
  //     10,
  //     ['Introduction to', 'Python programming & Yoga'],
  //     ['0x0000000000000000000000000000000000000001'],
  //     ['0x0000000000000000000000000000000000000002'],
  //     'Category',
  //     'Subcategory'
  //   );
  // });
  //
  // it('Test adding a course', () => {
  //   courseInstance.addCourse(
  //     '0x0000000000000000000000000000000000000003',  // Verifier
  //     ['Python', 'Testing'],
  //     5,
  //     10,
  //     ['Introduction to', 'Python programming & Testing'],
  //     ['0x0000000000000000000000000000000000000004'],
  //     ['0x0000000000000000000000000000000000000005'],
  //     'Category',
  //     'Subcategory'
  //   );
  // });
  //
  // it('Test length correctly retrieved', () => {
  //   return courseInstance.getCoursesLength.call().then((result) => {
  //     assert.equal(result, 2);
  //   });
  // });
  //
  // it('Test get course creator', () => {
  //   return courseInstance.getCourseCreator.call(0).then((result) => {
  //     assert.equal(result, owner);
  //   });
  // });
  //
  // it('!Test get course creator', () => {
  //   return courseInstance.getCourseCreator.call(0).then((result) => {
  //     assert.notEqual('0xsomeothervaluebutnottherightone', owner);
  //   });
  // });
  //
  // it('Test get course verifier, course(0)', () => {
  //   return courseInstance.getCourseVerifier.call(0).then((result) => {
  //     assert.equal(result, '0x0000000000000000000000000000000000000000');
  //   });
  // });
  //
  // it('Test get course verifier, course(1)', () => {
  //   return courseInstance.getCourseVerifier.call(1).then((result) => {
  //     assert.equal(result, '0x0000000000000000000000000000000000000003');
  //   });
  // });
  //
  // it('Test is the course actve, course(0)', () => {
  //   return courseInstance.isCourseActive.call(0).then((result) => {
  //     assert.equal(result, true);
  //   });
  // });
  //
  // it('Test getNrOfRater)', () => {
  //   return courseInstance.getNrOfRaters.call(0).then((result) => {
  //     assert.equal(result, 0);
  //   });
  // });
  //
  // it('Test getRating', () => {
  //   return courseInstance.getRating.call(0).then((result) => {
  //     assert.equal(result, 0);
  //   });
  // });
  //
  // it('Test getSkills, course(0)', () => {
  //   return courseInstance.getSkills.call(0).then((result) => {
  //     assert.equal(web3.toUtf8(result[0]), 'Python'),
  //     assert.equal(web3.toUtf8(result[1]), 'Yoga');
  //   });
  // });
  //
  // it('Test getSkills, course(1)', () => {
  //   return courseInstance.getSkills.call(1).then((result) => {
  //     assert.equal(web3.toUtf8(result[0]), 'Python');
  //     assert.equal(web3.toUtf8(result[1]), 'Testing');
  //   });
  // });
  //
  // it('Test getLevel', () => {
  //   return courseInstance.getLevel.call(0).then((result) => {
  //     assert.equal(result, 5);
  //   });
  // });
  //
  // it('Test getNrOfLectures', () => {
  //   return courseInstance.getNrOfLectures.call(0).then((result) => {
  //     assert.equal(result, 10);
  //   });
  // });
  //
  // it('Test getTitle, course(0)', () => {
  //   return courseInstance.getTitle.call(0).then((result) => {
  //     assert.equal(web3.toUtf8(result[0]), 'Introduction to'),
  //     assert.equal(web3.toUtf8(result[1]), 'Python programming & Yoga');
  //   });
  // });
  //
  // it('Test getTitle, course(1)', () => {
  //   return courseInstance.getTitle.call(1).then((result) => {
  //     assert.equal(web3.toUtf8(result[0]), 'Introduction to'),
  //     assert.equal(web3.toUtf8(result[1]), 'Python programming & Testing');
  //   });
  // });
  //
  // it('Test getParticipantsCount', () => {
  //   return courseInstance.getParticipantsCount.call(0).then((result) => {
  //     assert.equal(result, 1);
  //   });
  // });
  //
  // it('Test getGraduatesCount', () => {
  //   return courseInstance.getGraduatesCount.call(0).then((result) => {
  //     assert.equal(result, 1);
  //   });
  // });
  //
  //
  // it('Test getGraduatStorage', () => {
  //   return courseInstance.getGraduatStorage.call(0).then((result) => {
  //     assert.equal(result[0], '0x0000000000000000000000000000000000000001');
  //   });
  // });
  //
  // it('Test getCategory', () => {
  //   return courseInstance.getCategory.call(0).then((result) => {
  //     assert.equal(web3.toUtf8(result), 'Category');
  //   });
  // });
  //
  // it('Test getSubcategory', () => {
  //   return courseInstance.getSubcategory.call(0).then((result) => {
  //     assert.equal(web3.toUtf8(result) , 'Subcategory');
  //   });
  // });
  //
  // it('Test updateEntireCourse', () => {
  //     return courseInstance.updateEntireCourse.call(
  //       '0x0000000000000000000000000000000000000000',  // Verifier
  //       0,
  //       0,
  //       ['Python', 'Yoga'],
  //       5,
  //       10,
  //       ['Introduction to', 'Python programming & Yoga'],
  //       ['0x0000000000000000000000000000000000000001'],
  //       ['0x0000000000000000000000000000000000000002'],
  //       'Category',
  //       'Subcategory').then((result) => {
  //       assert.equal(result, true);
  //   });
  // });
  //
  // it('Test deleteCourse', () => {
  //   return courseInstance.deleteCourse.call().then((result) => {
  //     assert.equal(result, true);
  //   });
  // });
  //
  // it('Test setActive', () => {
  //   return courseInstance.setActive.call(0, true).then((result) => {
  //     assert.equal(result, true);
  //   });
  // });
  //
  // it('Test setActive', () => {
  //   return courseInstance.setActive.call(0, false).then((result) => {
  //     assert.equal(result, true);
  //   });
  // });
  //
  // it('Test setCourseAuthority', () => {
  //   return courseInstance.setCourseAuthority.call(0, '0x0000000000000000000000000000000000000006').then((result) => {
  //     assert.equal(result, true);
  //   });
  // });

 });


/* eslint-enable */
