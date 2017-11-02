"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var check = (function () {
    function check() {
    }
    check.Class = function (elem, falseCase, expectedClassName) {
        var classesList = browser.getAttribute(elem, 'className').split(' ');
        if (falseCase === 'does not have') {
            chai_1.expect(classesList).to.not
                .include(expectedClassName, "Element " + elem + " should not have the class " + expectedClassName);
        }
        else {
            chai_1.expect(classesList).to
                .include(expectedClassName, "Element " + elem + " should have the class " + expectedClassName);
        }
    };
    ;
    check.ContainsAnyText = function (element, falseCase) {
        var command = 'getValue';
        if (browser.getAttribute(element, 'value') === null) {
            command = 'getText';
        }
        var boolFalseCase;
        var text = browser[command](element);
        if (typeof falseCase === 'undefined') {
            boolFalseCase = false;
        }
        else {
            boolFalseCase = !!falseCase;
        }
        if (boolFalseCase) {
            chai_1.expect(text).to.equal('');
        }
        else {
            chai_1.expect(text).to.not.equal('');
        }
    };
    ;
    check.ContainsText = function (element, falseCase, expectedText) {
        var command = 'getValue';
        if (browser.getAttribute(element, 'value') === null) {
            command = 'getText';
        }
        var boolFalseCase;
        var stringExpectedText = expectedText;
        var text = browser[command](element);
        if (typeof expectedText === 'undefined') {
            stringExpectedText = falseCase;
            boolFalseCase = false;
        }
        else {
            boolFalseCase = (falseCase === ' not');
        }
        if (boolFalseCase) {
            chai_1.expect(text).to.not.contain(stringExpectedText);
        }
        else {
            chai_1.expect(text).to.contain(stringExpectedText);
        }
    };
    ;
    check.CookieContent = function (name, falseCase, expectedValue) {
        var cookie = browser.getCookie(name);
        chai_1.expect(cookie.name).to.equal(name, "no cookie found with the name \"" + name + "\"");
        if (falseCase) {
            chai_1.expect(cookie.value).to.not
                .equal(expectedValue, "expected cookie \"" + name + "\" not to have value \"" + expectedValue + "\"");
        }
        else {
            chai_1.expect(cookie.value).to
                .equal(expectedValue, "expected cookie \"" + name + "\" to have value \"" + expectedValue + "\"" +
                (" but got \"" + cookie.value + "\""));
        }
    };
    ;
    check.CookieExist = function (name, falseCase) {
        var cookie = browser.getCookie(name);
        if (falseCase) {
            chai_1.expect(cookie).to.equal(null, "Expected cookie \"" + name + "\" not to exists but it does");
        }
        else {
            chai_1.expect(cookie).to.not.equal(null, "Expected cookie \"" + name + "\" to exists but it does not");
        }
    };
    ;
    check.Dimension = function (elem, falseCase, expectedSize, dimension) {
        var elementSize = browser.getElementSize(elem);
        var intExpectedSize = parseInt(expectedSize, 10);
        var origionalSize = elementSize.height;
        var label = 'height';
        if (dimension === 'broad') {
            origionalSize = elementSize.width;
            label = 'width';
        }
        if (falseCase) {
            chai_1.expect(origionalSize).to.not
                .equal(intExpectedSize, "Element \"" + elem + "\" should not have a " + label + " of " +
                (intExpectedSize + "px"));
        }
        else {
            chai_1.expect(origionalSize).to
                .equal(intExpectedSize, "Element \"" + elem + "\" should have a " + label + " of " +
                (intExpectedSize + "px, but is " + origionalSize + "px"));
        }
    };
    ;
    check.ElementExist = function (isExisting, element) {
        var falseCase = true;
        if (isExisting === 'an') {
            falseCase = false;
        }
        var nrOfElements = browser.elements(element).value;
        if (falseCase === true) {
            chai_1.expect(nrOfElements).to.have.lengthOf(0, "Element with selector \"" + element + "\" should not exist on the page");
        }
        else {
            chai_1.expect(nrOfElements).to.have.length.of.at.least(1, "Element with selector \"" + element + "\" should exist on the page");
        }
    };
    ;
    check.EqualsText = function (element, falseCase, expectedText) {
        var command = 'getValue';
        if (browser.getAttribute(element, 'value') === null) {
            command = 'getText';
        }
        var parsedExpectedText = expectedText;
        var boolFalseCase = !!falseCase;
        if (typeof parsedExpectedText === 'function') {
            parsedExpectedText = '';
            boolFalseCase = !boolFalseCase;
        }
        if (parsedExpectedText === undefined && falseCase === undefined) {
            parsedExpectedText = '';
            boolFalseCase = true;
        }
        var text = browser[command](element);
        if (boolFalseCase) {
            parsedExpectedText.should.not.equal(text);
        }
        else {
            parsedExpectedText.should.equal(text);
        }
    };
    ;
    check.Focus = function (selector, falseCase) {
        var hasFocus = browser.hasFocus(selector);
        if (falseCase) {
            chai_1.expect(hasFocus).to.not
                .equal(true, 'Expected element to not be focused, but it is');
        }
        else {
            chai_1.expect(hasFocus).to
                .equal(true, 'Expected element to be focused, but it is not');
        }
    };
    ;
    check.InURLPath = function (falseCase, expectedUrlPart) {
        var currentUrl = browser.url().value;
        if (falseCase) {
            chai_1.expect(currentUrl).to.not
                .contain(expectedUrlPart, "Expected URL \"" + currentUrl + "\" not to contain " +
                ("\"" + expectedUrlPart + "\""));
        }
        else {
            chai_1.expect(currentUrl).to
                .contain(expectedUrlPart, "Expected URL \"" + currentUrl + "\" to contain \"" + expectedUrlPart + "\"");
        }
    };
    ;
    check.IsEmpty = function (element, falseCase) {
        var newFalseCase = true;
        if (typeof falseCase === 'function') {
            newFalseCase = false;
        }
        else if (falseCase === ' not') {
            newFalseCase = false;
        }
        check.ContainsAnyText(element, newFalseCase);
    };
    ;
    check.Modal = function (modalType, falseState) {
        var promptText = '';
        try {
            promptText = browser.alertText();
            if (falseState) {
                chai_1.expect(promptText).to.not
                    .equal(null, "A " + modalType + " was opened when it shouldn't");
            }
        }
        catch (e) {
            if (!falseState) {
                chai_1.expect(promptText).to
                    .equal(null, "A " + modalType + " was not opened when it should have been");
            }
        }
    };
    ;
    check.ModalText = function (modalType, falseState, expectedText) {
        try {
            var text = browser.alertText();
            if (falseState) {
                chai_1.expect(text).to.not.equal(expectedText, "Expected the text of " + modalType + " not to equal " +
                    ("\"" + expectedText + "\""));
            }
            else {
                chai_1.expect(text).to.equal(expectedText, "Expected the text of " + modalType + " not to equal " +
                    ("\"" + expectedText + "\", instead found \"" + text + "\""));
            }
        }
        catch (e) {
            throw new Error("A " + modalType + " was not opened when it should have been opened");
        }
    };
    ;
    check.Offest = function (element, falseCase, expectedPosition, axis) {
        var location = browser.getLocation(element, axis);
        var intExpectedPosition = parseInt(expectedPosition, 10);
        if (falseCase) {
            chai_1.expect(location).to.not
                .equal(intExpectedPosition, "Element \"" + element + "\" should not be positioned at " +
                (intExpectedPosition + "px on the " + axis + " axis"));
        }
        else {
            chai_1.expect(location).to
                .equal(intExpectedPosition, "Element \"" + element + "\" should be positioned at " +
                (intExpectedPosition + "px on the " + axis + " axis, but was found ") +
                ("at " + location + "px"));
        }
    };
    ;
    check.Property = function (isCSS, attrName, element, falseCase, expectedValue) {
        var command = isCSS ? 'getCssProperty' : 'getAttribute';
        var attrType = (isCSS ? 'CSS attribute' : 'Attribute');
        var attributeValue = browser[command](element, attrName);
        if (attrName.indexOf('color') > -1) {
            attributeValue = attributeValue.value;
        }
        if (falseCase) {
            chai_1.expect(attributeValue).to.not
                .equal(expectedValue, attrType + " of element \"" + element + "\" should not contain " +
                ("\"" + attributeValue + "\""));
        }
        else {
            chai_1.expect(attributeValue).to
                .equal(expectedValue, attrType + " of element \"" + element + "\" should not contain " +
                ("\"" + attributeValue + "\", but \"" + expectedValue + "\""));
        }
    };
    ;
    check.Selected = function (element, falseCase) {
        var isSelected = browser.isSelected(element);
        if (falseCase) {
            chai_1.expect(isSelected).to.not
                .equal(true, "\"" + element + "\" should not be selected");
        }
        else {
            chai_1.expect(isSelected).to
                .equal(true, "\"" + element + "\" should be selected");
        }
    };
    ;
    check.Title = function (falseCase, expectedTitle) {
        var title = browser.getTitle();
        if (falseCase) {
            chai_1.expect(title).to.not
                .equal(expectedTitle, "Expected title not to be \"" + expectedTitle + "\"");
        }
        else {
            chai_1.expect(title).to
                .equal(expectedTitle, "Expected title to be \"" + expectedTitle + "\" but found \"" + title + "\"");
        }
    };
    ;
    check.URL = function (falseCase, expectedUrl) {
        var currentUrl = browser.url().value;
        if (falseCase) {
            chai_1.expect(currentUrl).to.not
                .equal(expectedUrl, "expected url not to be \"" + currentUrl + "\"");
        }
        else {
            chai_1.expect(currentUrl).to
                .equal(expectedUrl, "expected url to be \"" + expectedUrl + "\" but found " +
                ("\"" + currentUrl + "\""));
        }
    };
    ;
    check.URLPath = function (falseCase, expectedPath) {
        var currentUrl = browser.url().value.replace(/http(s?):\/\//, '');
        var domain = "" + currentUrl.split('/')[0];
        currentUrl = currentUrl.replace(domain, '');
        if (falseCase) {
            chai_1.expect(currentUrl).to.not
                .equal(expectedPath, "expected path not to be \"" + currentUrl + "\"");
        }
        else {
            chai_1.expect(currentUrl).to
                .equal(expectedPath, "expected path to be \"" + expectedPath + "\" but found " +
                ("\"" + currentUrl + "\""));
        }
    };
    ;
    check.WithinViewport = function (element, falseCase) {
        var isVisible = browser.isVisibleWithinViewport(element);
        if (falseCase) {
            chai_1.expect(isVisible).to.not
                .equal(true, "Expected element \"" + element + "\" to be outside the viewport");
        }
        else {
            chai_1.expect(isVisible).to
                .equal(true, "Expected element \"" + element + "\" to be inside the viewport");
        }
    };
    ;
    check.CompareText = function (element1, falseCase, element2) {
        var text1 = browser.getText(element1);
        var text2 = browser.getText(element2);
        if (falseCase) {
            chai_1.expect(text1).to.not.equal(text2, "Expected text not to be \"" + text1 + "\"");
        }
        else {
            chai_1.expect(text1).to.equal(text2, "Expected text to be \"" + text1 + "\" but found \"" + text2 + "\"");
        }
    };
    ;
    check.isEnabled = function (element, falseCase) {
        var isEnabled = browser.isEnabled(element);
        if (falseCase) {
            chai_1.expect(isEnabled).to.not
                .equal(true, "Expected element \"" + element + "\" not to be enabled");
        }
        else {
            chai_1.expect(isEnabled).to
                .equal(true, "Expected element \"" + element + "\" to be enabled");
        }
    };
    ;
    check.isExisting = function (selector, falseCase) {
        var elements = browser.elements(selector).value;
        if (falseCase) {
            chai_1.expect(elements).to.have
                .lengthOf(0, "Expected element \"" + selector + "\" not to exist");
        }
        else {
            chai_1.expect(elements).to.have.length
                .above(0, "Expected element \"" + selector + "\" to exist");
        }
    };
    ;
    check.isVisible = function (element, falseCase) {
        var isVisible = browser.isVisible(element);
        if (falseCase) {
            chai_1.expect(isVisible).to.not
                .equal(true, "Expected element \"" + element + "\" not to be visible");
        }
        else {
            chai_1.expect(isVisible).to
                .equal(true, "Expected element \"" + element + "\" to be visible");
        }
    };
    ;
    return check;
}());
exports.default = check;
