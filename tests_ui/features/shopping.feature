Feature: Login, add to Cart and remove from Cart with a random number of items

  Scenario: Successful login and cart operations with random items
    Given I open the SauceDemo website
    When I login as a standard user
    Then I should see the products page
    And I log all products with their names and prices

    When I add a random number of products to the cart
    Then the cart quantity should match the expected number of products

    And I go to the cart page
    Then I verify the quantity and description are visible
    And I verify remove, checkout, and continue buttons are enabled

    When I remove a random number of products from the cart
    Then the cart quantity should match the expected number of products

  Scenario: Failing scenario for login test
    Given I open the SauceDemo website
    When I login with invalid credentials
    Then this step should fail because the user is not logged in

