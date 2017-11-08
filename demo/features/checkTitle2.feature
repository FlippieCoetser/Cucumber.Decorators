@Test
Feature: Check Title 2
    As a developer
    I want google site have the correct title

    Background:
        Given I open the url "http://www.google.com"

    Scenario: Check Title
        Then I expect that the title is "Google"
