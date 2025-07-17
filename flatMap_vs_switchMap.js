import { interval } from "rxjs";
import { map, mergeMap, take } from "rxjs/operators";

let outer = interval(1000).pipe(take(2));

let combined = outer.pipe(
  mergeMap((x) => {
    return interval(400).pipe(
      take(3),
      map((y) => `outer ${x}: inner ${y}`)
    );
  })
);

combined.subscribe((result) => console.log(`result ${result} `));

/*
 * Although the third value of the inner observable is emmited after the outer observable emits new value,
 * all emissions of the inner observable are present in the merged output.
 *
 * Change flatMap to switchMap and the third value of the inner observable is not emitted because
 * the outer observable emitted new value and the inner one starts handling it.
 * */
