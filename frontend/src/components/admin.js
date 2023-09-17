import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Table, Dropdown } from 'react-bootstrap';
import { TextField, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import './availability.css';
import Search from './search';

const Availability = ({ isLoggedIn, setisLoggedIn }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [cityFilter, setCityFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/blood/details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  const cities = data.map((item) => item.city);

  const handleSearch = () => {
    let filteredResults = data;
    if (cityFilter) {
      filteredResults = filteredResults.filter((item) =>
        item.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }
    if (groupFilter && groupFilter !== 'All') {
      filteredResults = filteredResults.filter((item) =>
        item.GroupName.toLowerCase().includes(groupFilter.toLowerCase())
      );
    }
    setFilteredData(filteredResults);
  };

  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="availability-container">
      <h1 className="availability-title">Authenticated Request</h1>
      <Card className="availability-card">
        <div className="table-top">
          <div className="search-container">
            <Search cities={cities} onSearch={(city) => setCityFilter(city)} />
            <div className="dropdown-container">
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {groupFilter ? groupFilter : 'Blood Group'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {bloodGroups.map((group, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setGroupFilter(group)}
                    >
                      {group}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Button
              variant="contained"
              onClick={handleSearch}
              className="search-button curved-icon"
            >
              <i className="material-icons">search</i> Search
            </Button>
          </div>
        </div>
        <Table responsive className="availability-table">
          <thead>
            <tr>
              <th className="table-header">Hospital</th>
              <th className="table-header">Group</th>
              <th className="table-header">Quantity</th>
              <th className="table-header">City</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="table-row">
                <td>{item.HName}</td>
                <td>{item.GroupName}</td>
                <td>{item.Quantity}</td>
                <td>{item.city}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default Availability;
