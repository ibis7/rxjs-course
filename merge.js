import { map, merge, timer } from "rxjs";

// Emulate first HTTP request that take 3 sec
let threeSecHTTPRequest = timer(3000).pipe(map(() => "First response"));

// Emulate second HTTP request that takes 1 sec
let oneSecHTTPRequest = timer(1000).pipe(map(() => "Second response"));

merge(threeSecHTTPRequest, oneSecHTTPRequest).subscribe((res) =>
  console.log(res)
);
