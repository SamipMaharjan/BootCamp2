const x = 0;

//resolve reject pending
const promise = new Promise((resolve, reject) => {
  if (x >= 1) {
    resolve("x is greater than 1");
  } else if (x < 1) {
    reject("x is less than 1");
  }
});

function func() {
  return promise;
}

async function callAsyncFunc() {
  try {
    const res = await func();
    console.log(res);
  } catch (err) {
    console.error("rejected:", err);
  }
}
callAsyncFunc();

// promise
//   .then((resolveValue) => console.log("resolveValue:", resolveValue))
//   .catch((rejectValue) => console.log("rejectValue:", rejectValue));
