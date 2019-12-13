const { Observable } = require('rxjs');

const obs$ = new Observable(observer => {
let counter = 0;
  const intervalId = setInterval(() => {
    observer.next(counter++);
  }, 200)
  return () => clearInterval(intervalId);
});

const subscription = obs$.subscribe(
  data => console.log(data),
  error => console.log(error),
  () => console.log('complete')
);

setTimeout(() => {
  subscription.unsubscribe()
},1000);


