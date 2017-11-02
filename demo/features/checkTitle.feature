Feature: Local server test
    As a developer
    I want google site have the correct title

    Background:
        Given I open the url "http://www.google.com"

    Scenario: Google
        Then I expect that the title is "Google"
