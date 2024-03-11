const userActionsOptions = [
  "click",
  "Mouse over",
  "dragDrop",
  "keyPress",
  "Assign",
  "Capture Screenshot",
  "Execute Javascript",
  "Pause (Time in ms)",
  "ExitTest",
  "Go To URL",
  "goBack",
  "refresh",
  // "openNewTab",
  // "closeTab",
  "Element is present",
  "Element is not Present",
  "Element is visible",
  "Element is not visible",
  "Element text equal",
  "Element text does not equal",
  "Element text contains",
  "Element text does not contains",
  "JavaScript returns true",
  "Check accessibility",
  "Set variable",
  "Extract from element",
  "Extract from javaScript",
  "Import steps from test"
].map((action) => ({ label: action, value: action }));

const keyList =  [
  'Enter', 'Tab', 'Spacebar', 'Backspace', 'End', 'Escape','Home',
  'Shift', 'Ctrl', 'Alt', 'Meta', 'CapsLock', 'NumLock', 'ScrollLock', 'PrintScreen', 'Pause',
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', "'", '"', ',', '<', '.', '>', '/', '?'
].map((key) => ({ label: key, value: key }));

const accessibilityList =[
  'Fail if critical issues are found',
  'Fail if serious or critical issues are found',
  'Fail if moderate, serious, or critical issues are found',
  'Fail if any issues are found, including minor issues'

].map((item) => ({ label: item, value: item }));
const selectorTypeList = [
  'Xpath',
  "ID",
  'Class',
  'Css',
  "Name"
].map((item) => ({ label: item, value: item }));

const testCases = [
  'Test Case 1',
  'Test Case 2',
  'Test Case 3',
  'Test Case 4',
  'Test Case 5',
].map((item) => ({ label: item, value: item }));
export {userActionsOptions,keyList,accessibilityList,testCases,selectorTypeList};


