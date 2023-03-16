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

eval("\r\nconsole.log(\"Hello  from simulatorjs\");\r\nconsole.log(window.location);\r\nvar searchParams = new URLSearchParams(window.location.search);\r\nvar floors = searchParams.get(\"floors\");\r\nvar lifts = searchParams.get(\"lifts\");\r\nif (!floors || !lifts)\r\n    location.href = \"/\";\r\n\n\n//# sourceURL=webpack:///./simulator.ts?");

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