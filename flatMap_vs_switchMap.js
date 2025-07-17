import { interval } from "rxjs";
import { concatWith, map, mergeMap, switchMap, take } from "rxjs/operators";

let outer = interval(1000).pipe(take(2));

let combined = outer.pipe(
  mergeMap((x) => {
    return interval(400).pipe(
      take(3),
      map((y) => `result: outer ${x}: inner ${y}`)
    );
  })
);

let combined2 = outer.pipe(
  switchMap((x) => {
    return interval(400).pipe(
      take(3),
      map((y) => `result2: outer ${x}: inner ${y}`)
    );
  })
);

combined.pipe(concatWith(combined2)).subscribe((result) => console.log(result));

/*
 * Although the third value of the inner observable is emmited after the outer observable emits new value,
 * all emissions of the inner observable are present in the merged output.
 *
 * Change flatMap to switchMap and the third value of the inner observable is not emitted because
 * the outer observable emitted new value and the inner one starts handling it.
 * */
