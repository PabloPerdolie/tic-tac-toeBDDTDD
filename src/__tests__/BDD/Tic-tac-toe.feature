Feature: Tic-Tac-Toe Game

  Scenario: Players take turns (handleClick)
    Given a tic-tac-toe game is in progress
    When player X makes a move
    Then player O should make the next move

  Scenario: Player wins (calculateWinner)
    Given a tic-tac-toe game is in progress
    When player X marks three cells in a line
    Then player X wins the game

  Scenario: Game ends in a draw (check)
    Given a tic-tac-toe game is in progress
    When all cells are marked and there is no winner
    Then the game should end in a draw

  Scenario: Player wins alert (alertingWinner)
    Given a tic-tac-toe game is in progress
    When all cells are marked and there is alert talking about win
    Then player X win the game

  Scenario: Generation of cells (generateCells)
    Given a tic-tac-toe game is in progress
    When game started 
    Then there are 9 cells on the field

  Scenario: Cell creation (Cell)
    Given a tic-tac-toe game is in progress
    When game started 
    Then every of the 9 cells on the field has an ID "cell-N" and value "null"
