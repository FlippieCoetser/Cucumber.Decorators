### Given

| Expression                                                                                     | Helper                       | 
|------------------------------------------------------------------------------------------------|------------------------------|
|/^I open the (url|site) "([^"]*)?"$/                                                            | action.Open                  |
|/^the element "([^"]*)?" is( not)* visible$/                                                    | check.IsVisible              |
|/^the element "([^"]*)?" is( not)* enabled$/                                                    | check.IsEnabled              |
|/^the element "([^"]*)?" is( not)* selected$/                                                   | check.Selected               |
|/^the checkbox "([^"]*)?" is( not)* checked$/                                                   | check.Selected               |
|/^there is (an|no) element "([^"]*)?" on the page$/                                             | check.ElementExists          |
|/^the title is( not)* "([^"]*)?"$/                                                              | check.Title                  |
|/^the element "([^"]*)?" contains( not)* the same text as element "([^"]*)?"$/                  | check.CompareText            |
|/^the element "([^"]*)?"( not)* matches the text "([^"]*)?"$/                                   | check.EqualsText             |
|/^the element "([^"]*)?"( not)* contains the text "([^"]*)?"$/                                  | check.ContainsText           |
|/^the element "([^"]*)?"( not)* contains any text$/                                             | check.ContainsAnyText        |
|/^the element "([^"]*)?" is( not)* empty$/                                                      | check.IsEmpty                |
|/^the page url is( not)* "([^"]*)?"$/                                                           | check.Url                    |
|/^the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"$/                | check.Property               |
|/^the cookie "([^"]*)?" contains( not)* the value "([^"]*)?"$/                                  | check.CookieContent          |
|/^the cookie "([^"]*)?" does( not)* exist$/                                                     | check.CookieExists           |
|/^the element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)$/                                     | check.Dimension              |
|/^the element "([^"]*)?" is( not)* positioned at ([\d]+)px on the (x|y) axis$/                  | check.Offset                 |
|/^I have a screen that is ([\d]+) by ([\d]+) pixels$/                                           | action.ResizeScreen          |
|/^I have closed all but the first (window|tab)$/                                                | action.CloseAllButFirstTab   |
|/^a (alertbox|confirmbox|prompt) is( not)* opened$/                                             | check.Modal                  |

### When

| Expression                                                                                     | Helper                       |   
|------------------------------------------------------------------------------------------------|------------------------------|
|/^I (click|doubleclick) on the (link|button|element) "([^"]*)?"$/                               | action.ClickElement          |
|/^I (add|set) "([^"]*)?" to the inputfield "([^"]*)?"$/                                         | action.SetInputField         |
|/^I clear the inputfield "([^"]*)?"$/                                                           | action.ClearInputField       |
|/^I drag element "([^"]*)?" to element "([^"]*)?"$/                                             | action.DragElement           |
|/^I submit the form "([^"]*)?"$/                                                                | action.SubmitForm            |
|/^I pause for (\d+)ms$/                                                                         | action.Pause                 |
|/^I set a cookie "([^"]*)?" with the content "([^"]*)?"$/                                       | action.SetCookie             |
|/^I delete the cookie "([^"]*)?"$/                                                              | action.DeleteCookie          |
|/^I press "([^"]*)?"$/                                                                          | action.PressButton           |
|/^I (accept|dismiss) the (alertbox|confirmbox|prompt)$/                                         | action.HandleModal           |
|/^I enter "([^"]*)?" into the prompt$/                                                          | action.SetPromptText         |
|/^I scroll to element "([^"]*)?"$/                                                              | action.Scroll                |
|/^I close the last opened (window|tab)$/                                                        | action.CloseLastOpenedWindow |
|/^I focus the last opened (window|tab)$/                                                        | action.FocusLastOpenedWindow |
|/^I select the (\d+)(st|nd|rd|th) option for element "([^"]*)?"$/                               | action.SelectOptionByIndex   |
|/^I select the option with the (name|value|text) "([^"]*)?" for element "([^"]*)?"$/            | action.SelectOption          |
|/^I move to element "([^"]*)?"(?: with an offset of (\d+),(\d+))*$/                             | action.MoveToElement         |

### Then

| Expression                                                                                     | Helper                       |   
|------------------------------------------------------------------------------------------------|------------------------------|
|/^I expect that the title is( not)* "([^"]*)?"$/                                                | check.Title                  |
|/^I expect that element "([^"]*)?" does( not)* appear exactly "([^"]*)?" times$/                | check.IfElementExists        |
|/^I expect that element "([^"]*)?" is( not)* visible$/                                          | check.IsVisible              |
|/^I expect that element "([^"]*)?" becomes( not)* visible$/                                     | action.WaitForVisible        |
|/^I expect that element "([^"]*)?" is( not)* within the viewport$/                              | check.WithinViewport         |
|/^I expect that element "([^"]*)?" does( not)* exist$/                                          | check.IsExisting             |
|/^I expect that element "([^"]*)?"( not)* contains the same text as element "([^"]*)?"$/        | check.CompareText            |
|/^I expect that element "([^"]*)?"( not)* matches the text "([^"]*)?"$/                         | check.EqualsText             |
|/^I expect that element "([^"]*)?"( not)* contains the text "([^"]*)?"$/                        | check.ContainsText           |
|/^I expect that element "([^"]*)?"( not)* contains any text$/                                   | check.ContainsAnyText        |
|/^I expect that element "([^"]*)?" is( not)* empty$/                                            | check.IsEmpty                |
|/^I expect that the url is( not)* "([^"]*)?"$/                                                  | check.URL                    |
|/^I expect that the path is( not)* "([^"]*)?"$/                                                 | check.URLPath                |
|/^I expect the url to( not)* contain "([^"]*)?"$/                                               | check.InURLPath              |
|/^I expect that the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"$/  | check.Property               |
|/^I expect that checkbox "([^"]*)?" is( not)* checked$/                                         | check.Selected               |
|/^I expect that element "([^"]*)?" is( not)* selected$/                                         | check.Selected               |
|/^I expect that element "([^"]*)?" is( not)* enabled$/                                          | check.IsEnabled              |
|/^I expect that cookie "([^"]*)?"( not)* contains "([^"]*)?"$/                                  | check.CookieContent          |
|/^I expect that cookie "([^"]*)?"( not)* exists$/                                               | check.CookieExists           |
|/^I expect that element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)$/                           | check.Dimension              |
|/^I expect that element "([^"]*)?" is( not)* positioned at ([\d]+)px on the (x|y) axis$/        | check.Offset                 |
|/^I expect that element "([^"]*)?" (has|does not have) the class "([^"]*)?"$/                   | check.Class                  |
|/^I expect a new (window|tab) has( not)* been opened$/                                          | check.NewWindow              |
|/^I expect the url "([^"]*)?" is opened in a new (tab|window)$/                                 | check.IsOpenedInNewWindow    |
|/^I expect that element "([^"]*)?" is( not)* focused$/                                          | check.Focus                  |
|/^I expect that a (alertbox|confirmbox|prompt) is( not)* opened$/                               | check.Modal                  |
|/^I expect that a (alertbox|confirmbox|prompt)( not)* contains the text "([^"]*)?"$/            | check.ModalText              |
 