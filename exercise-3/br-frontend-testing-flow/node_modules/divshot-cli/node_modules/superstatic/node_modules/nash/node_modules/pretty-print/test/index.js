var print = require('../');

// var data = {
//   one: '1',
//   two: '2',
//   three: '3',
//   four: '4'
// };

// var data = [{
//   name: 'name1',
//   desc: 'desc1'
// },
// {
//   name: 'name2',
//   desc: 'desc2'
// }];


// var data = ['name1', 'name2'];

data = {
  name: 'Scott',
  age: 30,
  emails: ['scottcorgan@gmail.com', 'scott@divshot.com', 'scott@lakeshorecitychurch.com'],
  wife: 'Lindsay'
}


print(data, {
  // padding: 3,
  leftPadding: 2,
  rightPadding: 2,
  key: 'name',
  value: 'desc'
});