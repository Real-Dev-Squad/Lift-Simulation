/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./simulator.ts":
/*!**********************!*\
  !*** ./simulator.ts ***!
  \**********************/
/***/ (() => {

eval("\r\nvar searchParams = new URLSearchParams(window.location.search);\r\nvar floors = Number(searchParams.get(\"floors\"));\r\nvar lifts = Number(searchParams.get(\"lifts\"));\r\nif (!floors || !lifts)\r\n    location.href = \"/\";\r\nvar header = document.getElementById(\"header\");\r\nheader.innerText = \"Floors: \".concat(floors, \" Lifts: \").concat(lifts);\r\nvar app = document.getElementById(\"simulator\");\r\napp.style.gridTemplateRows = \"repeat(\".concat(floors, \",10rem)\");\r\nfor (var i = floors; i > 0; i--) {\r\n    var floor = document.createElement(\"section\");\r\n    floor.classList.add(\"floor\");\r\n    floor.dataset.floorNo = String(i); // data-* the value of data attributes must be string.\r\n    // adding Controls to Floor View (Up,down Btn)\r\n    var btnGoUp = document.createElement(\"button\");\r\n    btnGoUp.innerText = \"UP\";\r\n    var btnGoDown = document.createElement(\"button\");\r\n    btnGoDown.innerText = \"DOWN\";\r\n    var floorControlWrap = document.createElement(\"div\");\r\n    floorControlWrap.classList.add(\"controls\");\r\n    var displayFloorNo = document.createElement(\"h3\");\r\n    displayFloorNo.classList.add(\"floor_no\");\r\n    displayFloorNo.innerText = \"\".concat(i, \".\");\r\n    floorControlWrap.append(btnGoUp, displayFloorNo, btnGoDown);\r\n    floor.append(floorControlWrap);\r\n    // initially place all lifts at bottomth floor\r\n    if (i === 1) {\r\n        // 1st floor\r\n        for (var j = 1; j <= lifts; j++) {\r\n            var lift = document.createElement(\"area\");\r\n            lift.classList.add(\"lift\");\r\n            lift.dataset.lift_no = \"\".concat(j);\r\n            lift.innerHTML = \" <svg width=\\\"100%\\\" stroke=\\\"currentColor\\\" fill=\\\"currentColor\\\" stroke-width=\\\"0\\\" viewBox=\\\"0 0 24 24\\\" height=\\\"1em\\\" width=\\\"1em\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"><path fill=\\\"none\\\" d=\\\"M0 0h24v24H0V0z\\\"></path><path d=\\\"M20 19V5c0-1.1-.9-2-2-2h-5.25v16h-1.5V3H6c-1.1 0-2 .9-2 2v14H3v2h18v-2h-1zm-10-6H8v-2h2v2zm6 0h-2v-2h2v2z\\\"></path></svg> <h4 class=\\\"lift_no\\\">\".concat(j, \"</h4>\");\r\n            floor.appendChild(lift);\r\n        }\r\n    }\r\n    app.appendChild(floor);\r\n}\r\n\n\n//# sourceURL=webpack:///./simulator.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./simulator.ts"]();
/******/ 	
/******/ })()
;