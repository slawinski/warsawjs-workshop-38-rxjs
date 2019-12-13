const { Observable } = require('rxjs');

const arr = [1, 2, 3]

const obs$ = new Observable(observer => {
  for(item of arr){
    observer.next(item);
  }
  observer.complete();
});

obs$.subscribe(
  data => console.log(data),
  error => console.log(error),
  () => console.log('complete')
);


