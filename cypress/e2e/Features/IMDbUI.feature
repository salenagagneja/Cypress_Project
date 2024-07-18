Feature: IMDb.com

Background:
    Given I open website
    Then I click on "acceptCookiee"

#***************************************************************************************
Scenario: 1
Then I set text "Nicolas Cage" for element "searchBox" and Enter
    Then I set text "Nicolas Cage" for element "searchBox" and Enter
    Then I click on "fisrtSearchResult"
    Then I click on "upcomingProject"
    Then I fetch list of movies with "Completed" tag


Scenario: 2
    Then I click on "btnmenu"
    Then I click on "topBoxOffice"
    Then I select "2" item on the "rating" list
    Then I click on "5Star"
    Then I click on "Rate"


Scenario: 3
    Then I click on "btnmenu"
    Then I click on "topTVShows"
    Then I click on "breakingBad"
    Then I click on "photos"

Scenario: 4
    Then I click on "btnmenu"
    Then I click on "bornToday"
    Then I click on "closeDateFilter"
    Then I click on "birthdayFilter"
    Then I set text "YESTERDAY|MM-DD|0" for element "inpBirthday" and Enter
    Then I click on "seeResult"
    Then I select "3" item on the "birthdayList" list
    And I capture screenshot
    
Scenario: 5
    Then I click on "btnmenu"
    Then I click on "bornToday"
    Then I click on "closeDateFilter"
    Then I click on "birthDateFilter"
    Then I set text "TODAY|YYYY-MM-DD|-14610" for element "birthDateStart"
    Then I set text "TODAY|YYYY-MM-DD|-14610" for element "birthDateEnd"
    Then I click on "seeResult"
    Then I select "1" item on the "birthdayList" list
    And I capture screenshot
    