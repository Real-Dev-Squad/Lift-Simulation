console.log("Hello  from simulatorjs");
console.log(window.location);

const searchParams = new URLSearchParams(window.location.search);

const floors = searchParams.get("floors");
const lifts = searchParams.get("lifts");

if (!floors || !lifts) location.href = "/";
