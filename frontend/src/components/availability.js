import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Table, Dropdown } from 'react-bootstrap';
import { TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import './availability.css';
import Search from './search';
import SimpleMap from './maps';

const Availability = ({ isLoggedIn, setisLoggedIn }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [cityFilter, setCityFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [displayMode, setDisplayMode] = useState('hospital'); // 'hospital' or 'donor'
  const [donorData, setDonorData] = useState([]); // Donor data
  const navigate = useNavigate();
  const location = useLocation();
  const latitude = 37.7749; // Replace with your latitude
  const longitude = -122.4194; // Replace with your longitude
  const center = {
    lat: latitude,
    lng: longitude,
  };
  const zoom = 14;
  const hospitals=[
    '1-8-31/1, Minister Road, Krishna Nagar Colony, Begumpet, Secunderabad, Telangana 500003',
    'AIG Hospitals 1-66/AIG/2 to 5, Mindspace Rd P Janardhan Reddy Nagar, Gachibowli Hyderabad, Telangana 500032 India'
  ]

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/availability' } });
    }
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/avail', {
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

    const fetchDonorData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/donor/donors', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDonorData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Failed to fetch donor data', error);
      }
    };
    console.log(donorData)

    fetchData();
    fetchDonorData();
  }, []);

  const cities = data.map((item) => item.city);

  useEffect(() => {
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
  }, [cityFilter, groupFilter, data]);

  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="availability-container">

      <h1 className="availability-title">WELCOME</h1>
    <SimpleMap hospitalAddresses={hospitals} />
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
          </div>
        </div>
        <div className="toggle-button-container">
          <button
            className={`toggle-button ${displayMode === 'hospital' ? 'active' : ''}`}
            onClick={() => setDisplayMode('hospital')}
          >
            Hospitals
          </button>
          <button
            className={`toggle-button ${displayMode === 'donor' ? 'active' : ''}`}
            onClick={() => setDisplayMode('donor')}
          >
            Donors
          </button>
        </div>
        <Table responsive className="availability-table">
        <thead>
            <tr>
              <th className="table-header">{displayMode === 'hospital' ? 'Hospital' : 'Name'}</th>
              <th className="table-header">{displayMode === 'hospital' ? 'Blood Group' : 'Blood Group'}</th>
              <th className="table-header">{displayMode === 'hospital' ? 'Quantity' : 'Contact'}</th>
              <th className="table-header">City</th>
              {displayMode === 'donor' &&(<th className="table-header">message</th>)}
            </tr>
          </thead>
          <tbody>
            {displayMode === 'hospital' && (
              filteredData.map((item, index) => (
                <tr key={index} className="table-row">
                  <td>{item.HName}</td>
                  <td>{item.GroupName}</td>
                  <td>{item.Quantity}</td>
                  <td>{item.city}</td>
                </tr>
              ))
            )}
            {displayMode === 'donor' && (
              donorData.map((donor, index) => (
                <tr key={index} className="table-row">
                  <td>{donor.name}</td>
                  <td>{donor.bloodgroup}</td>
                  <td>{donor.mobileNumber}</td>
                  <td>{donor.city}</td>
                  <td>{donor.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default Availability;
