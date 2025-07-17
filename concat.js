import { concat, map, timer } from "rxjs";

const threeSecHTTPRequest = timer(3000).pipe(map(() => "First response"));
const oneSecHTTPRequest = timer(1000).pipe(map(() => "Second response"));

concat(threeSecHTTPRequest, oneSecHTTPRequest).subscribe((res) =>
  console.log(res)
);
