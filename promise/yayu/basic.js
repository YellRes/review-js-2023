function workMyCollection() {
  var resultArr = [];

  Promise.all(arr.map((item) => doSomeThingAsync(item))).then((res) => {
    resultArr = res;
  });
}

/**
 * 题目：红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用 Promise 实现）
 */
function red() {
  console.log("red");
}

function yellow() {
  console.log("yellow");
}

function green() {
  console.log("green");
}

function sleep(time) {
  return new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, time);
  });
}
// function trafficLight() {
//   red();
//   sleep(3000)
//     .then((res) => {
//       green();
//       return sleep(1000);
//     })
//     .then((res) => {
//       yellow();
//       return sleep(2000);
//     })
//     .then((res) => {
//       trafficLight();
//     });
// }

// trafficLight();

// {
//   // await async
//   async function trafficLight() {
//     while (true) {
//       red();
//       await sleep(3000);
//       green();
//       await sleep(1000);
//       yellow();
//       await sleep(2000);
//     }
//   }

//   trafficLight();
// }
