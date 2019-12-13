const { Observable } = require('rxjs');

const okPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('data');
  }, 500)
});

function toObservable(promise) {
  return new Observable(observer => {
    promise.then(
      data => {
        observer.next(data)
        observer.complete()
      },
      error => observer.next(error)
    )
  });
}

const obs$ = toObservable(okPromise);

obs$.subscribe(
  data => console.log('success', data),
  error => console.log('error', error),
  () => console.log('complete')
);