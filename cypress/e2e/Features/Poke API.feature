Feature: PokeAPI.co

#***************************************************************************************
Scenario: 1
    When I send "valid" "GET" request for "https://pokeapi.co/api/v2/berry/1"
    Then I validate "id" in response as "1"
    Then I validate "name" in response as "cheri"

Scenario: 2
    When I send "NOT FOUND" "GET" request for "https://pokeapi.co/api/v2/berry/101"

Scenario: 3
    When I send "valid" "GET" request for "https://pokeapi.co/api/v2/berry/chesto"
    Then I validate "id" in response as "2"
    Then I validate "name" in response as "chesto"
    
Scenario: 4
    When I send "NOT FOUND" "GET" request for "https://pokeapi.co/api/v2/berry/chresto"

Scenario: 5
    When I send "valid" "GET" request for "https://pokeapi.co/api/v2/berry/chesto"
    Then I validate "id" in response as "2"
    Then I validate "name" in response as "chesto"

Scenario: 6
    When I send "valid" "GET" request for "https://pokeapi.co/api/v2/berry-flavor/spicy"
    Then I validate "spicy" berries in response
    And I pick the berry with the highest potency
    When I send "valid" "GET" request for the selected berry "https://pokeapi.co/api/v2/berry/"
    Then I validate "id" and "name" in response
