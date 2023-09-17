import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import './hospital.css';
import { useNavigate } from 'react-router-dom';

const HospitalAdmin = ({ isLoggedIn, setisLoggedIn }) => {
  const [data, setData] = useState([]);
  const [editedData, setEditedData] = useState([]);
  const [groupFilter, setGroupFilter] = useState('All');
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/availability' } });
    }
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/hospital/avail', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data);
        setEditedData(response.data);
        console.log(editedData)
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  const handleEditQuantity = (index, newValue) => {
    const updatedData = [...editedData];
    updatedData[index].Quantity = newValue;
    setEditedData(updatedData);
  };

  const handleIncrement = (index) => {
    const updatedData = [...editedData];
    updatedData[index].Quantity += 1;
    setEditedData(updatedData);
    console.log(editedData)
  };

  const handleDecrement = (index) => {
    const updatedData = [...editedData];
    updatedData[index].Quantity = Math.max(0, updatedData[index].Quantity - 1);
    setEditedData(updatedData);
  };

  const handleSubmit = async () => {
    const requestData = {
      ...editedData,
      email: localStorage.email, // Add email to the edited data
    };
    
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8080/hospital/update-blood-quantity', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Show success message or handle success as needed
    } catch (error) {
      console.error('Failed to update data', error);
      // Show error message or handle error as needed
    }
  };

  const handleGroupFilterChange = (selectedGroup) => {
    setGroupFilter(selectedGroup);
    if (selectedGroup === 'All') {
      setEditedData(data);
    } else {
      const filteredResults = data.filter((item) =>
        item.GroupName.toLowerCase().includes(selectedGroup.toLowerCase())
      );
      setEditedData(filteredResults);
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="hospital-admin-container">
      <h1 className="hospital-admin-title">Hospital Admin</h1>
      <Card className="hospital-admin-card">
        <div className="table-top">
          <div className="dropdown-container">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {groupFilter}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {bloodGroups.map((group, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleGroupFilterChange(group)}
                  >
                    {group}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <Table responsive className="hospital-admin-table">
          <thead>
            <tr>
              <th className="table-header">Serial No.</th>
              <th className="table-header">Group</th>
              <th className="table-header">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {editedData.map((item, index) => (
              <tr key={index} className="table-row">
                <td>{index + 1}</td>
                <td>{item.GroupName}</td>
                <td>
                  {isEditMode ? (
                    <div className="quantity-edit-container">
                      <button
                        className="quantity-button"
                        onClick={() => handleDecrement(index)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={item.Quantity}
                        onChange={(e) =>
                          handleEditQuantity(index, parseInt(e.target.value))
                        }
                      />
                      <button
                        className="quantity-button"
                        onClick={() => handleIncrement(index)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    item.Quantity
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <div className="button-container">
        <Button variant="primary" className="edit-button" onClick={toggleEditMode}>
          {isEditMode ? 'Save' : 'Edit'}
        </Button>
        {isEditMode && (
          <Button variant="primary" onClick={handleSubmit}>
            Submit Changes
          </Button>
        )}
      </div>
    </div>
  );
};

export default HospitalAdmin;
