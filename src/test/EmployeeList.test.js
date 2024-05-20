import React from 'react';
import { render, waitFor, screen, act  } from '@testing-library/react';
import '@testing-library/jest-dom'
import EmployeeList from '../EmployeeList';
import { fetchEmployeeData } from '../services/EmployeeService';
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock('../services/EmployeeService');

describe('Testing the EmployeeList Component', () => {
    it('renders loading state correctly', async () => {
        fetchEmployeeData.mockResolvedValueOnce(null); // Mocking API response to simulate loading state

        render(<EmployeeList />);
    
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    
        await waitFor(() => {
          expect(fetchEmployeeData).toHaveBeenCalledTimes(1);
        });
    });

    it('renders error state correctly', async () => {
        const errorMessage = 'Failed to fetch data';
        fetchEmployeeData.mockRejectedValueOnce(new Error(errorMessage)); // Mocking API response to simulate error state
    
        render(<EmployeeList />);
    
        expect(await screen.findByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    
        await waitFor(() => {
          expect(fetchEmployeeData).toHaveBeenCalledTimes(1);
        });
      });

      it('renders data correctly when fetched successfully', async () => {
        const mockData = [
          { empNo: 1, firstName: 'John', lastName: 'Doe', gender: 'Male', birthDate: '1990-01-01', hireDate: '2020-01-01' },
          { empNo: 2, firstName: 'Jane', lastName: 'Doe', gender: 'Female', birthDate: '1992-03-15', hireDate: '2020-02-01' }
        ];
        fetchEmployeeData.mockResolvedValueOnce(mockData); // Mocking API response to simulate successful data fetch
    
        const component = await act( async () => render(<MemoryRouter><EmployeeList/></MemoryRouter>));
    
    
        // Check if the table headers and data are rendered correctly
        await waitFor(() => {
          expect(screen.getByText('Employee No')).toBeInTheDocument();
          expect(screen.getByText('FirstName')).toBeInTheDocument();
          expect(screen.getByText('LastName')).toBeInTheDocument();
          expect(screen.getByText('Gender')).toBeInTheDocument();
          expect(screen.getByText('BirthDate')).toBeInTheDocument();
          expect(screen.getByText('HireDate')).toBeInTheDocument();
    
          expect(screen.getByText('John')).toBeInTheDocument();
          expect(screen.getByText('Jane')).toBeInTheDocument();
          expect(screen.getByText('1990-01-01')).toBeInTheDocument();
          expect(screen.getByText('1992-03-15')).toBeInTheDocument();
    
          expect(fetchEmployeeData).toHaveBeenCalledTimes(1);
        }, {
          timeout: 2000,
        });
      }); 

});