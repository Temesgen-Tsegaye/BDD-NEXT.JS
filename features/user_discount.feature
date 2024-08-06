Feature: user discount creation

Scenario Outline:agent sent post request to payment gateway

Given  agent can create discoutnt for users
When   agent with  "<agent_id>","<promocode>" and "<commision_percentage>" trys to create discount with amount of  "<discount_percentage>" and "<plan>" plan
And payment gatway status "<payment_gateway_status>"
Then   The expected message should be   "<expected_message>"

Examples:

|agent_id|plan|promocode|commision_percentage|discount_percentage|payment_gateway_status|expected_message|
|1|weekly|PROMO1  |0.30                |0.10               |succsess|success   |
|1|monthly|PROMO1 |0.15                |0.40               |fail|discount can't excced commision percentage|
|1|yearly|PROMO1  |0.10                |0.03               |success|success|
|1|weekly|PROMO1  |0.30                |0.10               |fail|success|
|1|monthly|PROMO1 |0.15                |0.56               |fail|discount can't excced commision percentage|
|1|yearly|PROMO1  |0.10                |0.03               |fail|success|
  





