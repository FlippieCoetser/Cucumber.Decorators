"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var action = (function () {
    function action() {
    }
    action.Open = function (type, page) {
        var url = (type === 'url') ? page : browser.options.baseUrl + page;
        browser.url(url);
    };
    ;
    action.ClearElement = function (element) {
        browser.clearElement(element);
    };
    action.ClickElement = function (action, type, element) {
        var elem = (type === 'link') ? "=" + element : element;
        var method = (action === 'click') ? 'click' : 'doubleClick';
        var nrOfElements = browser.elements(element).value;
        chai_1.expect(nrOfElements).to.have.length.of.at.least(1, "Element with selector \"" + element + "\" should exist on the page");
        browser[method](elem);
    };
    ;
    action.DeleteCookie = function (name) {
        browser.deleteCookie(name);
    };
    ;
    action.DragAndDrop = function (source, destination) {
        browser.dragAndDrop(source, destination);
    };
    ;
    action.HandleModal = function (action, modalType) {
        var command = "alert" + action.slice(0, 1).toUpperCase() + action.slice(1);
        if (modalType === 'alertbox') {
            command = 'alertAccept';
        }
        browser[command]();
    };
    ;
    action.MoveToElement = function (element, x, y) {
        var intX = parseInt(x, 10) || undefined;
        var intY = parseInt(y, 10) || undefined;
        browser.moveToObject(element, intX, intY);
    };
    ;
    action.Pause = function (ms) {
        var intMs = parseInt(ms, 10);
        browser.pause(intMs);
    };
    ;
    action.PressButton = function (key) {
        browser.keys(key);
    };
    ;
    action.ResizeScreen = function (screenWidth, screenHeight) {
        browser.windowHandleSize({
            width: parseInt(screenWidth, 10),
            height: parseInt(screenHeight, 10),
        });
    };
    ;
    action.Scroll = function (selector) {
        browser.scroll(selector);
    };
    ;
    action.SelectOption = function (selectionType, selectionValue, selectElem) {
        var commandArguments = [
            selectElem,
            selectionValue,
        ];
        var command = '';
        switch (selectionType) {
            case 'name': {
                command = 'selectByAttribute';
                commandArguments.splice(1, 0, 'name');
                break;
            }
            case 'value': {
                command = 'selectByValue';
                break;
            }
            case 'text': {
                command = 'selectByVisibleText';
                break;
            }
            default: {
                throw new Error("Unknown selection type \"" + selectionType + "\"");
            }
        }
        browser[command].apply(browser, commandArguments);
    };
    ;
    action.SelectOptionByIndex = function (index, obsolete, selectElem) {
        var optionIndex = parseInt(index, 10);
        browser.selectByIndex(selectElem, optionIndex);
    };
    ;
    action.SetCookie = function (cookieName, cookieContent) {
        browser.setCookie({
            name: cookieName,
            value: cookieContent,
        });
    };
    ;
    action.SetInputField = function (method, value, element) {
        var command = (method === 'add') ? 'addValue' : 'setValue';
        var checkValue = value;
        var nrOfElements = browser.elements(element).value;
        chai_1.expect(nrOfElements).to.have.lengthOf(1, "Element with selector \"" + element + "\" should exist exactly " +
            "1 time(s)");
        if (!value) {
            checkValue = '';
        }
        browser[command](element, checkValue);
    };
    ;
    action.SetPromptText = function (modalText) {
        try {
            browser.alertText(modalText);
        }
        catch (e) {
            throw new Error('A prompt was not open when it should have been open');
        }
    };
    ;
    action.SubmitForm = function (form) {
        browser.submitForm(form);
    };
    ;
    action.WaitFor = function (elem, ms, falseState, state) {
        var intMs = parseInt(ms, 10) || 3000;
        var command = 'waitForExist';
        var boolFalseState = !!falseState;
        var parsedState = '';
        if (falseState || state) {
            parsedState = state.indexOf(' ') > -1
                ? state.split(/\s/)[state.split(/\s/).length - 1]
                : state;
            if (parsedState === 'checked') {
                parsedState = 'selected';
            }
            if (parsedState) {
                command = "waitFor" + parsedState[0].toUpperCase() +
                    ("" + parsedState.slice(1));
            }
        }
        if (typeof falseState === 'undefined') {
            boolFalseState = false;
        }
        browser[command](elem, intMs, boolFalseState);
    };
    ;
    action.WaitForVisible = function (elem, falseCase) {
        var ms = 10000;
        browser.waitForVisible(elem, ms, !!falseCase);
    };
    ;
    return action;
}());
exports.default = action;
