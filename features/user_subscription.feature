Feature: Agent commission Calculation
Scenario Outline: System gets callback from payment gateway
   Given User successfully completed subscription on the payment gateway
   When  the "<promocode>" and  "<plan>" returned
   And   discount percentage is "<discount_percentage>" 
   And   Price is  "<price>"
   And   commission percentage is "<commision_percentage>"
   Then  expected agent commission must be  "<agent_commission>"

Examples:

|id|plan|promocode|commision_percentage|discount_percentage|agent_commission|price|
|1|weekly|PROMO1  |0.30                   |0.10                 |20               |   100|
|1|monthly|PROMO1 |0.15                   |0.05                  |30              |  300|
|1|yearly|PROMO1  |0.10                   |0.03                  |63              |     900|





  

# # Feature: User Subscription
#  Scenario Outline: User subscribes to platform with or without a promo code
#     Given the user with id "<user_id>" exists
#     And the promo code is "<promo_code>" 
#     And the plan is "<plan>"
#     And the commission_percentage "<commission_percentage>"

#     And the discount_percentage "<discount_percentage>"
#     When the user tries to subscribe
#       | plan | promo_code | discount |
#       | WEEKLY| agent_code1| |
#     Then the purchase should be processed successfully with expected discount "<expected_discount>"
#     Then the purchase should be processed successfully with expected commission "<expected_commission>"
    

#     Examples:
#       | user_id | promo_code | plan    | expected_discount |commission_percentage| expected_commission |discount_percentage| 
#       | 1       | PROMO1     | WEEKLY  | 5                 |10                   |   5                 |5|
#       | 1       | PROMO1     | MONTHLY | 25                |10                   | 25                 |5|
#       | 1       | PROMO1     | YEARLY  | 45                |10                   |45                  |5|
#       | 2       |            | WEEKLY  | 0                 |                     |                    ||
#       | 2       |            | MONTHLY | 0                 |                     |                    ||
#       | 2       |            | YEARLY  | 0                 |                     |                    ||


  # Scenario Outline: User fail to subscribe
  #   Given the user with id "<user_id>" exists
  #   And the promo code is "<promo_code>"
  #   When the user subscribes using promo code "<promo_code>" 
  #   Then the purchase should fail with error "<error_message>"
  # Examples:
  #     | user_id | promo_code      |error_message            |
  #     | 3       | INVALID_PROMO   |Invalid Promocode       |
  #     | 4       | PROMO5          |Payment was declined    |


#ON FIRST MOCK WITH ALL VALID PROMO1
#ON second mock with 





# Feature: User Subscription

#   Scenario Outline: User subscribes to music with or without a promo code
#     Given the user with id "<user_id>" exists
#     And the promo code "<promo_code>" is <promo_code_status>
#     And the music with id "<music_id>" exists with a price of <price>
#     When the user subscribes to the music with id "<music_id>" using promo code "<promo_code>"
#     Then the purchase should be processed successfully
#     And a purchased record should be created with user_id "<user_id>" and music_id "<music_id>"
#     And the agent's wallet should be updated based on the final price
#     And the user's subscription should reflect any discount applied

#     Examples:
#       | user_id | promo_code     | promo_code_status | music_id | price | expected_discount |
#       | 1       | PROMO1         | valid             | 1        | 10    | 2                 | # Example of valid promo code
#       | 2       | INVALID_PROMO  | invalid           | 2        | 20    | 0                 | # Example of invalid promo code
#       | 3       | NONE           | none              | 3        | 15    | 0                 | # Example with no promo code

#   Scenario Outline: User subscribes to music with a failing payment
#     Given the user with id "<user_id>" exists
#     And the promo code "<promo_code>" is <promo_code_status>
#     And the music with id "<music_id>" exists with a price of <price>
#     And the user's payment method is <payment_status>
#     When the user subscribes to the music with id "<music_id>" using promo code "<promo_code>"
#     Then the purchase should fail with error "<error_message>"
#     And no purchased record should be created
#     And the agent's wallet should not be updated
#     And the user's subscription should not be created

#     Examples:
#       | user_id | promo_code    | promo_code_status | music_id | price | payment_status | error_message            |
#       | 4       | PROMO2        | valid             | 4        | 10    | insufficient_funds | Payment failed due to insufficient funds |
#       | 5       | INVALID_PROMO | invalid           | 5        | 20    | expired_card     | Payment failed due to expired card       |
#       | 6       | NONE          | none              | 6        | 15    | payment_declined | Payment was declined                      |
