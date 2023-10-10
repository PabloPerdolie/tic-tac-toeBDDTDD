import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

test('initial game board state, func generateCells()', () => {
    const { getAllByTestId } = render(<App />);
    const cells = getAllByTestId('cell');   

    cells.forEach((cell) => {
      expect(cell).toHaveTextContent('');
    });
});

test('player X makes a move, func handleClick()', () => {
    const { getAllByTestId } = render(<App />);
    const cells = getAllByTestId('cell');
    const firstCell = cells[0];
  
    fireEvent.click(firstCell);
    
    expect(firstCell).toHaveTextContent('X');
});

test('detects a winner, func calculateWinner()', () => {
    const { getAllByTestId, getByText } = render(<App />);
    const cells = getAllByTestId('cell');;
  
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X
  
    const winnerMessage = getByText('Winner: X');
    expect(winnerMessage).toBeInTheDocument();
});

test('detects a draw (tie), func check()', () => {
    const { getAllByTestId, getByText } = render(<App />);
    const cells = getAllByTestId('cell');
  
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[5]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[2]); // O
    fireEvent.click(cells[6]); // O
    fireEvent.click(cells[7]); // X
    fireEvent.click(cells[8]); // O
  
    const drawMessage = getByText('Draw!');
    expect(drawMessage).toBeInTheDocument();
});

test('cell creation, func Cell()', () => {
    const { getAllByTestId } = render(<App />);
    const cells = getAllByTestId('cell');   
    let count = 1;
    cells.forEach((cell) => {
      let id = 'cell-' + count;
      expect(cell).toHaveTextContent('');
      expect(cell).toHaveAttribute('id', id);
      count++;
    });
});

test('player wins alert, func alertingWinner()', () => {
    const spy = jest.spyOn(window, 'alert');
    const { getAllByTestId } = render(<App />);
    const cells = getAllByTestId('cell');;
  
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X
    
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
});