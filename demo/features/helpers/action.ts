import  {expect} from 'chai';

export default class action {
    /**
    * Open the given URL
    * @param  {String}   type Type of navigation (url or site)
    * @param  {String}   page The URL to navigate to
    */
    public static Open(type: string, page: string) {
        const url = (type === 'url') ? page : browser.options.baseUrl + page;
        browser.url(url);
    };
    
    /**
    * Clear a given input field (placeholder for WDIO's clearElement)
    * @param  {String}   element Element selector
    */ 
    public static ClearElement(element: string) {
        browser.clearElement(element);
    }

    /**
    * Perform an click action on the given element
    * @param  {String}   action  The action to perform (click or doubleClick)
    * @param  {String}   type    Type of the element (link or selector)
    * @param  {String}   element Element selector
    */
    public static ClickElement(action: string, type: string, element: string) {
        const elem: string = (type === 'link') ? `=${element}` : element;
        const method: string = (action === 'click') ? 'click' : 'doubleClick';
        
        // check if elment exist
        const nrOfElements = browser.elements(element).value;
        expect(nrOfElements).to.have.length.of.at.least(
            1,
            `Element with selector "${element}" should exist on the page`
        );
    
        browser[method](elem);
    };

    /**
    * Delete a cookie
    * @param  {String}   name The name of the cookie to delete
    */
    public static DeleteCookie(name: string) {
        browser.deleteCookie(name);
    };

    /**
    * Drag a element to a given destination
    * @param  {String}   source      The selector for the source element
    * @param  {String}   destination The selector for the destination element
    */
    public static DragAndDrop(source: string, destination: string){
        browser.dragAndDrop(source, destination);
    };

    /**
    * Handle a modal
    * @param  {String}   action    Action to perform on the modal (accept, dismiss)
    * @param  {String}   modalType Type of modal (alertbox, confirmbox, prompt)
    */
    public static HandleModal(action: string, modalType: string) {
        let command: string = `alert${action.slice(0, 1).toUpperCase()}${action.slice(1)}`;

        /**
        * Alert boxes can't be dismissed, this causes Chrome to crash during tests
        */
        if (modalType === 'alertbox') {
            command = 'alertAccept';
        }

        browser[command]();
    };

    /**
    * Move to the given element with an optional offset on a X and Y position
    * @param  {String}   element  Element selector
    * @param  {String}   x        X coordinate to move to
    * @param  {String}   y        Y coordinate to move to
    */
    public static MoveToElement(element: string, x: string, y: string) {
        const intX: number = parseInt(x, 10) || undefined;
        const intY: number = parseInt(y, 10) || undefined;

        browser.moveToObject(element, intX, intY);
    };

    /**
     * Pause execution for a given number of milliseconds
    * @param  {String}   ms   Number of milliseconds to pause
    */
    public static Pause(ms: string) {
        const intMs: number = parseInt(ms, 10);

        browser.pause(intMs);
    };

    /**
    * Perform a key press
    * @param  {String}   key  The key to press
    */
    public static PressButton(key: string) {
        browser.keys(key);
    };

    /**
    * Resize the browser window
    * @param  {String}   screenWidth  The width of the window to resize to
    * @param  {String}   screenHeight The height of the window to resize to
    */
    public static ResizeScreen(screenWidth: string, screenHeight: string) {
        browser.windowHandleSize({
            width: <number>parseInt(screenWidth, 10),
            height: <number>parseInt(screenHeight, 10),
        });
    };

    /**
    * Scroll the page to the given element
    * @param  {String}   selector Element selector
    */
    public static Scroll(selector: string) {
        browser.scroll(selector);
    };

    /**
    * Select an option of a select element
    * @param  {String}   selectionType  Type of method to select by (name, value or
    *                                   text)
    * @param  {String}   selectionValue Value to select by
    * @param  {String}   selectElem     Element selector
    */
    public static SelectOption(selectionType: string, selectionValue: string, selectElem: string) {
        const commandArguments: string[] = [
            selectElem,
            selectionValue,
        ];

        let command: string = '';

        switch (selectionType) {
            case 'name': {
                command = 'selectByAttribute';

                // The selectByAttribute command expects the attribute name as it
                // second argument so let's add it
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
                throw new Error(`Unknown selection type "${selectionType}"`);
            }
        }

        browser[command](...commandArguments);
    };

    /**
    * Select a option from a select element by it's index
    * @param  {String}   index      The index of the option
    * @param  {String}   obsolete   The ordinal indicator of the index (unused)
    * @param  {String}   selectElem Element selector
    *
    * @todo  merge with selectOption
    */
    public static SelectOptionByIndex(index: string, obsolete: string, selectElem: string) {
        const optionIndex: number = parseInt(index, 10);

        browser.selectByIndex(selectElem, optionIndex);
    };

    public static SetCookie(cookieName: string, cookieContent: string) {
        browser.setCookie({
            name: cookieName,
            value: cookieContent,
        });
    };

    /**
     * Set the value of the given input field to a new value or add a value to the
    * current element value
    * @param  {String}   method  The method to use (add or set)
    * @param  {String}   value   The value to set the element to
    * @param  {String}   element Element selector
    */
    public static SetInputField(method: string, value: string, element: string) {
        /**
        * The command to perform on the browser object (addValue or setValue)
        * @type {String}
        */
        const command: string = (method === 'add') ? 'addValue' : 'setValue';

        let checkValue = value;

        const nrOfElements = browser.elements(element).value;

        expect(nrOfElements).to.have.lengthOf(
            1,
            `Element with selector "${element}" should exist exactly ` +
            `1 time(s)`
        );

        if (!value) {
            checkValue = '';
        }

        browser[command](element, checkValue);
    };

    /**
    * Set the text of the current prompt
    * @param  {String}   modalText The text to set to the prompt
    */
    public static SetPromptText(modalText) {
        try {
            browser.alertText(modalText);
        } catch (e) {
            throw new Error('A prompt was not open when it should have been open');
        }
    };

    /**
    * Submit the given form
    * @param  {String}   form Form element selector
    */
    public static SubmitForm(form: string) {
        browser.submitForm(form);
    };
 
    /**
    * Wait for the given element to be checked, enabled, selected, visible, contain
    * a text, contain a value or to exist
    * @param  {String}   elem                     Element selector
    * @param  {String}   ms                       Wait duration (optional)
    * @param  {String}   falseState               Check for opposite state
    * @param  {String}   state                    State to check for (default
    *                                             existence)
    */
    public static WaitFor(elem: string, ms: string, falseState: string, state: string) {
        const intMs: number = parseInt(ms, 10) || 3000;

        let command: string = 'waitForExist';

        let boolFalseState: boolean = !!falseState;

        let parsedState: string = '';

        if (falseState || state) {
            parsedState = state.indexOf(' ') > -1
                ? state.split(/\s/)[state.split(/\s/).length - 1]
                : state;

            // Check box checked state translates to selected state
            if (parsedState === 'checked') {
                parsedState = 'selected';
            }

            if (parsedState) {
                command = `waitFor${parsedState[0].toUpperCase()}` +
                    `${parsedState.slice(1)}`;
            }
        }

        if (typeof falseState === 'undefined') {
            boolFalseState = false;
        }

        browser[command](elem, intMs, boolFalseState);
    };

    /**
    * Wait for the given element to become visible
    * @param  {String}   elem      Element selector
    * @param  {String}   falseCase Whether or not to expect a visible or hidden
    *                              state
    *
    * @todo  merge with waitfor
    */
    public static WaitForVisible(elem: string, falseCase:string) {
        const ms: number = 10000;

        browser.waitForVisible(elem, ms, !!falseCase);
    };
}
