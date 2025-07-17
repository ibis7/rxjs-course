import { from, Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";

function getDrinks() {
  let beers = from([
    { name: "Stella", country: "Belgium", price: 9.5 },
    { name: "Sam Adams", country: "USA", price: 8.5 },
    { name: "Bud Light", country: "USA", price: 6.5 },
  ]);

  let softDrinks = from([
    { name: "Coca Cola", country: "USA", price: 1.5 },
    { name: "Fanta", country: "USA", price: 1.5 },
    { name: "Lemonade", country: "France", price: 2.5 },
  ]);

  return new Observable((observer) => {
    observer.next(beers); // pushing the beer pallet (observable)
    observer.next(softDrinks); // pushing the soft drinks pallet (observable)
    observer.complete();
  });
}

// We want to unload each pallet and print the into about each case with drinks

getDrinks()
  .pipe(
    mergeMap((drinks) => drinks) // unloading drinks from pallets
  )
  .subscribe({
    next: (drink) =>
      console.log("Subscriber got " + drink.name + ": " + drink.price),
    error: (error) => console.error(error),
    complete: console.log("The stream of observables is over"),
  });

/*
 // AN alternative (bad) solution with nested subscribtions
 getDrinks()
 .subscribe( pallet =>
 pallet.subscribe(
 drink => console.log("Nested subscriber got " + drink.name + ": " + drink.price ),
 error => console.err(error),
 () => console.log("The stream of nested observables is over"))
 ,
 error => console.err(error),
 () => console.log("The stream of source observables is over")
 );

 */
