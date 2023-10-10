import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../../App';

describe('Cell component', () => {
    it('should render cells with states of id = "cell-N" and value=null', () => {
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
});

describe('handleClick function', () => {
    it('should handle click event correctly', () => {
        const { getAllByTestId } = render(<App />);
        const cells = getAllByTestId('cell');
        const firstCell = cells[0];
        
        fireEvent.click(firstCell);
        
        expect(firstCell).toHaveTextContent('X');
    });
});

describe('generateCells function', () => {
    it('should generate cells correctly', () => {
        const { getAllByTestId } = render(<App />);
        const cells = getAllByTestId('cell');   

        cells.forEach((cell) => {
            expect(cell).toHaveTextContent('');
        });
    });
});

describe('calculateWinner function', () => {
    it('should calculate winner correctly', () => {
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
});

describe('check function', () => {
    it('should detects a draw', () => {
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
});


describe('alertingWinner function', () => {
   test('should alert the winner sign', () => {
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
});
    
    