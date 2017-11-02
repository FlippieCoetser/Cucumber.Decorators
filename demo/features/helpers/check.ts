import  {expect} from 'chai';

export default class check {
    /**
    * Check if the given element has the given class
    * @param  {String}   elem              Element selector
    * @param  {String}   falseCase         Whether to check for the class to exist
    *                                      or not ('has', 'does not have')
    * @param  {String}   expectedClassName The class name to check
    */
    public static Class(elem: string, falseCase: string, expectedClassName: string) {
        const classesList: string[] = browser.getAttribute(elem, 'className').split(' ');

        if (falseCase === 'does not have') {
            expect(classesList).to.not
                .include(
                    expectedClassName,
                    `Element ${elem} should not have the class ${expectedClassName}`
                );
        } else {
            expect(classesList).to
                .include(
                    expectedClassName,
                    `Element ${elem} should have the class ${expectedClassName}`
                );
        }
    };

    /**
    * Check if the given elements contains text
    * @param  {String}   element   Element selector
    * @param  {Boolean}   falseCase Whether to check if the content contains text
    *                              or not
    */
    public static ContainsAnyText(element: string, falseCase: boolean) {
        let command: string = 'getValue';

        if (browser.getAttribute(element, 'value') === null) {
            command = 'getText';
        }

        let boolFalseCase: boolean;

        const text: string = browser[command](element);

        if (typeof falseCase === 'undefined') {
            boolFalseCase = false;
        } else {
            boolFalseCase = !!falseCase;
        }

        if (boolFalseCase) {
            expect(text).to.equal('');
        } else {
            expect(text).to.not.equal('');
        }
    };

    /**
    * Check if the given elements contains text
    * @param  {String}   element       Element selector
    * @param  {String}   falseCase     Whether to check if the content contains
    *                                  the given text or not
    * @param  {String}   expectedText  The text to check against
    */
    public static ContainsText(element: string, falseCase: string, expectedText: string) {
        let command: string = 'getValue';

        if (browser.getAttribute(element, 'value') === null) {
            command = 'getText';
        }

        let boolFalseCase: boolean;

        let stringExpectedText: string = expectedText;

        const text: string = browser[command](element);

        if (typeof expectedText === 'undefined') {
            stringExpectedText = falseCase;
            boolFalseCase = false;
        } else {
            boolFalseCase = (falseCase === ' not');
        }

        if (boolFalseCase) {
            expect(text).to.not.contain(stringExpectedText);
        } else {
            expect(text).to.contain(stringExpectedText);
        }
    };

    /**
    * Check the content of a cookie against a given value
    * @param  {String}   name          The name of the cookie
    * @param  {String}   falseCase     Whether or not to check if the value matches
    *                                  or not
    * @param  {String}   expectedValue The value to check against
    */
    public static CookieContent(name: string, falseCase: string, expectedValue: string) {
        const cookie = browser.getCookie(name);

        expect(cookie.name).to.equal(
            name,
            `no cookie found with the name "${name}"`
        );

        if (falseCase) {
            expect(cookie.value).to.not
                .equal(
                    expectedValue,
                    `expected cookie "${name}" not to have value "${expectedValue}"`
                );
        } else {
            expect(cookie.value).to
                .equal(
                    expectedValue,
                    `expected cookie "${name}" to have value "${expectedValue}"` +
                    ` but got "${cookie.value}"`
                );
        }
    };

    /**
    * Check if a cookie with the given name exists
    * @param  {[type]}   name      The name of the cookie
    * @param  {[type]}   falseCase Whether or not to check if the cookie exists or
    *                              not
    */
    public static CookieExist(name, falseCase) {
        const cookie = browser.getCookie(name);

        if (falseCase) {
            expect(cookie).to.equal(
                null,
                `Expected cookie "${name}" not to exists but it does`
            );
        } else {
            expect(cookie).to.not.equal(
                null,
                `Expected cookie "${name}" to exists but it does not`
            );
        }
    };

    /**
    * Check the dimensions of the given element
    * @param  {String}   elem         Element selector
    * @param  {String}   falseCase    Whether to check if the dimensions match or
    *                                 not
    * @param  {String}   expectedSize Expected size
    * @param  {String}   dimension    Dimension to check (broad or tall)
    */
    public static Dimension(elem: string, falseCase: string, expectedSize: string, dimension: string) {
        const elementSize = browser.getElementSize(elem);

        const intExpectedSize: number = parseInt(expectedSize, 10);

        let origionalSize: number = elementSize.height;

        let label: string = 'height';

        if (dimension === 'broad') {
            origionalSize = elementSize.width;
            label = 'width';
        }

        if (falseCase) {
            expect(origionalSize).to.not
                .equal(
                    intExpectedSize,
                    `Element "${elem}" should not have a ${label} of ` +
                    `${intExpectedSize}px`
                );
        } else {
            expect(origionalSize).to
                .equal(
                    intExpectedSize,
                    `Element "${elem}" should have a ${label} of ` +
                    `${intExpectedSize}px, but is ${origionalSize}px`
                );
        }
    };

    /**
    * Check if the given element exists
    * @param  {String}   isExisting Whether the element should be existing or not
    *                               (an or no)
    * @param  {String}   element       Element selector
    */
    public static ElementExist(isExisting: string, element: string) {
        let falseCase: boolean = true;

        if (isExisting === 'an') {
            falseCase = false;
        }

        const nrOfElements = browser.elements(element).value;
        if (falseCase === true) {
            expect(nrOfElements).to.have.lengthOf(
                0,
                `Element with selector "${element}" should not exist on the page`
            );
        } else {
            expect(nrOfElements).to.have.length.of.at.least(
                1,
                `Element with selector "${element}" should exist on the page`
            );
        }
    };

    /**
    * Check if the given elements text is the same as the given text
    * @param  {String}   element       Element selector
    * @param  {String}   falseCase     Whether to check if the content equals the
    *                                  given text or not
    * @param  {String}   expectedText  The text to validate against
    */
    public static EqualsText(element: string, falseCase: string, expectedText: string) {
        let command: string = 'getValue';

        if (browser.getAttribute(element, 'value') === null) {
            command = 'getText';
        }

        let parsedExpectedText: string = expectedText;

        let boolFalseCase: boolean = !!falseCase;

        // Check for empty element
        if (typeof parsedExpectedText === 'function') {
            parsedExpectedText = '';

            boolFalseCase = !boolFalseCase;
        }

        if (parsedExpectedText === undefined && falseCase === undefined) {
            parsedExpectedText = '';
            boolFalseCase = true;
        }

        const text = browser[command](element);

        if (boolFalseCase) {
            parsedExpectedText.should.not.equal(text);
        } else {
            parsedExpectedText.should.equal(text);
        }
    };

    /**
    * Check if the given element has the focus
    * @param  {String}   selector  Element selector
    * @param  {String}   falseCase Whether to check if the given element has focus
    *                              or not
    */
    public static Focus(selector: string, falseCase: string) {
        const hasFocus: boolean = browser.hasFocus(selector);

        if (falseCase) {
            expect(hasFocus).to.not
                .equal(true, 'Expected element to not be focused, but it is');
        } else {
            expect(hasFocus).to
                .equal(true, 'Expected element to be focused, but it is not');
        }
    };

    /**
    * Check if the given string is in the URL path
    * @param  {String}   falseCase       Whether to check if the given string is in
    *                                    the URL path or not
    * @param  {String}   expectedUrlPart The string to check for
    */
    public static InURLPath(falseCase, expectedUrlPart) {
        const currentUrl: string = browser.url().value;

        if (falseCase) {
            expect(currentUrl).to.not
                .contain(
                    expectedUrlPart,
                    `Expected URL "${currentUrl}" not to contain ` +
                    `"${expectedUrlPart}"`
                );
        } else {
            expect(currentUrl).to
                .contain(
                    expectedUrlPart,
                    `Expected URL "${currentUrl}" to contain "${expectedUrlPart}"`
                );
        }
    };

    public static IsEmpty(element, falseCase) {
        let newFalseCase = true;
    
        if (typeof falseCase === 'function') {
            newFalseCase = false;
        } else if (falseCase === ' not') {
            newFalseCase = false;
        }
    
        check.ContainsAnyText(element, newFalseCase);
    };

    /**
    * Check if a modal was opened
    * @param  {String}   modalType  The type of modal that is expected (alertbox,
    *                               confirmbox or prompt)
    * @param  {String}   falseState Whether to check if the modal was opened or not
    */
    public static Modal(modalType: string, falseState: string) {

        let promptText: string = '';

        try {
            promptText = <string>browser.alertText();

            if (falseState) {
                expect(promptText).to.not
                    .equal(
                        null,
                        `A ${modalType} was opened when it shouldn't`
                    );
            }
        } catch (e) {
            if (!falseState) {
                expect(promptText).to
                    .equal(
                        null,
                        `A ${modalType} was not opened when it should have been`
                    );
            }
        }
    };

    /**
    * Check the text of a modal
    * @param  {String}   modalType     The type of modal that is expected
    *                                  (alertbox, confirmbox or prompt)
    * @param  {String}   falseState    Whether to check if the text matches or not
    * @param  {String}   expectedText  The text to check against
    */
    public static ModalText(modalType: string, falseState: string, expectedText: string) {
        try {
            const text: string = <string>browser.alertText();
            if (falseState) {
                expect(text).to.not.equal(
                    expectedText,
                    `Expected the text of ${modalType} not to equal ` +
                    `"${expectedText}"`
                );
            } else {
                expect(text).to.equal(
                    expectedText,
                    `Expected the text of ${modalType} not to equal ` +
                    `"${expectedText}", instead found "${text}"`
                );
            }
        } catch (e) {
            throw new Error(`A ${modalType} was not opened when it should have been opened`);
        }
    };

    /**
    * Check the offset of the given element
    * @param  {String}   element              Element selector
    * @param  {String}   falseCase         Whether to check if the offset matches
    *                                      or not
    * @param  {String}   expectedPosition  The position to check against
    * @param  {String}   axis              The axis to check on (x or y)
    */
    public static Offest(element: string, falseCase: string, expectedPosition: string, axis) {
        const location = browser.getLocation(element, axis);

        const intExpectedPosition: number = parseInt(expectedPosition, 10);

        if (falseCase) {
            expect(location).to.not
                .equal(
                    intExpectedPosition,
                    `Element "${element}" should not be positioned at ` +
                    `${intExpectedPosition}px on the ${axis} axis`
                );
        } else {
            expect(location).to
                .equal(
                    intExpectedPosition,
                    `Element "${element}" should be positioned at ` +
                    `${intExpectedPosition}px on the ${axis} axis, but was found ` +
                    `at ${location}px`
                );
        }
    };

    /**
    * Check the given property of the given element
    * @param  {String}   isCSS         Whether to check for a CSS property or an
    *                                  attribute
    * @param  {String}   attrName      The name of the attribute to check
    * @param  {String}   element          Element selector
    * @param  {String}   falseCase     Whether to check if the value of the
    *                                  attribute matches or not
    * @param  {String}   expectedValue The value to match against
    */
    public static Property(isCSS: string, attrName: string, element: string, falseCase: string, expectedValue: string) {
        const command: string = isCSS ? 'getCssProperty' : 'getAttribute';

        const attrType: string = (isCSS ? 'CSS attribute' : 'Attribute');

        let attributeValue = browser[command](element, attrName);

        /**
        * when getting something with a color WebdriverIO returns a color
        * object but we want to assert against a string
        */
        if (attrName.indexOf('color') > -1) {
            attributeValue = attributeValue.value;
        }

        if (falseCase) {
            expect(attributeValue).to.not
                .equal(
                    expectedValue,
                    `${attrType} of element "${element}" should not contain ` +
                    `"${attributeValue}"`
                );
        } else {
            expect(attributeValue).to
                .equal(
                    expectedValue,
                    `${attrType} of element "${element}" should not contain ` +
                    `"${attributeValue}", but "${expectedValue}"`
                );
        }
    };

    /**
    * Check the selected state of the given element
    * @param  {String}   element   Element selector
    * @param  {String}   falseCase Whether to check if the element is elected or
    *                              not
    */
    public static Selected(element: string, falseCase: string) {
        const isSelected: boolean = browser.isSelected(element);

        if (falseCase) {
            expect(isSelected).to.not
                .equal(true, `"${element}" should not be selected`);
        } else {
            expect(isSelected).to
                .equal(true, `"${element}" should be selected`);
        }
    };

    /**
    * Check the title of the current browser window
    * @param  {Type}     falseCase     Whether to check if the title matches the
    *                                  expected value or not
    * @param  {Type}     expectedTitle The expected title
    */
    public static Title(falseCase, expectedTitle) {
        const title = browser.getTitle();
    
        if (falseCase) {
            expect(title).to.not
                .equal(
                    expectedTitle,
                    `Expected title not to be "${expectedTitle}"`
                );
        } else {
            expect(title).to
                .equal(
                    expectedTitle,
                    `Expected title to be "${expectedTitle}" but found "${title}"`
                );
        }
    };
    
    /**
    * Check the URL of the given browser window
    * @param  {String}   falseCase   Whether to check if the URL matches the
    *                                expected value or not
    * @param  {String}   expectedUrl The expected URL to check against
    */
    public static URL(falseCase: string, expectedUrl: string) {
        const currentUrl: string = browser.url().value;

        if (falseCase) {
            expect(currentUrl).to.not
                .equal(expectedUrl, `expected url not to be "${currentUrl}"`);
        } else {
            expect(currentUrl).to
                .equal(
                    expectedUrl,
                    `expected url to be "${expectedUrl}" but found ` +
                    `"${currentUrl}"`
                );
        }
    };

    /**
    * Check if the current URL path matches the given path
    * @param  {String}   falseCase    Whether to check if the path matches the
    *                                 expected value or not
    * @param  {String}   expectedPath The expected path to match against
    */
    public static URLPath(falseCase: string, expectedPath: string) {
        let currentUrl: string = browser.url().value.replace(/http(s?):\/\//, '');

        const domain = `${currentUrl.split('/')[0]}`;

        currentUrl = currentUrl.replace(domain, '');

        if (falseCase) {
            expect(currentUrl).to.not
                .equal(expectedPath, `expected path not to be "${currentUrl}"`);
        } else {
            expect(currentUrl).to
                .equal(
                    expectedPath,
                    `expected path to be "${expectedPath}" but found ` +
                    `"${currentUrl}"`
                );
        }
    };

    /**
    * Check if the given element is visible inside the current viewport
    * @param  {String}   element   Element selector
    * @param  {String}   falseCase Whether to check if the element is visible
    *                              within the current viewport or not
    */
    public static WithinViewport(element: string, falseCase: string) {
        const isVisible: boolean = browser.isVisibleWithinViewport(element);

        if (falseCase) {
            expect(isVisible).to.not
                .equal(
                    true,
                    `Expected element "${element}" to be outside the viewport`
                );
        } else {
            expect(isVisible).to
                .equal(
                    true,
                    `Expected element "${element}" to be inside the viewport`
                );
        }
    };

    /**
    * Compare the contents of two elements with each other
    * @param  {String}   element1  Element selector for the first element
    * @param  {String}   falseCase Whether to check if the contents of both
    *                              elements match or not
    * @param  {String}   element2  Element selector for the second element
    */
    public static CompareText(element1: string, falseCase: string, element2: string) {
        const text1: string = browser.getText(element1);

        const text2: string = browser.getText(element2);

        if (falseCase) {
            expect(text1).to.not.equal(
                text2,
                `Expected text not to be "${text1}"`
            );
        } else {
            expect(text1).to.equal(
                text2,
                `Expected text to be "${text1}" but found "${text2}"`
            );
        }
    };

    /**
    * Check if the given element is enabled
    * @param  {String}   element   Element selector
    * @param  {String}   falseCase Whether to check if the given element is enabled
    *                              or not
    */
    public static isEnabled(element: string, falseCase: string) {
        const isEnabled: boolean = browser.isEnabled(element);

        if (falseCase) {
            expect(isEnabled).to.not
                .equal(true, `Expected element "${element}" not to be enabled`);
        } else {
            expect(isEnabled).to
                .equal(true, `Expected element "${element}" to be enabled`);
        }
    };

    /**
    * Check if the given element exists in the current DOM
    * @param  {String}   selector  Element selector
    * @param  {String}   falseCase Whether to check if the element exists or not
    */
    public static isExisting(selector: string, falseCase: string) {
        const elements = browser.elements(selector).value;

        if (falseCase) {
            expect(elements).to.have
                .lengthOf(0, `Expected element "${selector}" not to exist`);
        } else {
            expect(elements).to.have.length
                .above(0, `Expected element "${selector}" to exist`);
        }
    };

    /**
    * Check if the given element is (not) visible
    * @param  {String}   element   Element selector
    * @param  {String}   falseCase Check for a visible or a hidden element
    */
    public static isVisible(element: string, falseCase: string) {
        const isVisible: boolean = browser.isVisible(element);

        if (falseCase) {
            expect(isVisible).to.not
                .equal(true, `Expected element "${element}" not to be visible`);
        } else {
            expect(isVisible).to
                .equal(true, `Expected element "${element}" to be visible`);
        }
    };
}
