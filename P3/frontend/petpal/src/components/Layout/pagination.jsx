import React, { useState, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';

const ListWithPagination = ({ items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    // Update the currentItems based on the currentPage
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(items.slice(startIndex, endIndex));
  }, [currentPage, items, itemsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const markAsRead = async (id) => {
        //setNotiList((notiList) =>
        //  notiList.map((notification) =>
        //    notification.id === id ? { ...notification, read: true } : notification
          //)
        //);
        console.log(id)
        try {
            // Create the POST request using the fetch API
            const response = await fetch(`http://127.0.0.1:8000/noti/${id}/`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
                //console.log('yes')
                const data = await response.json();
                get_noti();
                //setNotiList(data.results)
            } else {
                // Handle error responses
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error.message);
        }
    };
  const get_noti = async (e) => {
        try {
            // Create the POST request using the fetch API
            const response = await fetch("http://127.0.0.1:8000/noti/?read=${filter}", {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
                const data = await response.json();
                setCurrentItems(data.results)
            } else {
                // Handle error responses
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error.message);
        }
    };

     const del = async (e) => {
     console.log(e)
        try {
            // Create the POST request using the fetch API
            const response = await fetch(`http://127.0.0.1:8000/noti/${e}/`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
                //const data = await response.json();
                get_noti();
            } else {
                // Handle error responses
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error.message);
        }
    };

  return (
    <div>
<ul class="list-group">
                {currentItems && currentItems.map((notification) => (
                  <li class="list-group-item" key={notification.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '5px',
                  backgroundColor: notification.read ? 'green' : 'red',
                }}
              />
                  <a onClick={() => markAsRead(notification.id)} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }} href={notification.link}>{notification.content}</a>
                    <div>
                    <button type="button" onClick={() => del(notification.id)}>
                        <Icon.Trash className="bi bi-bell" style={{ color: 'black' }}></Icon.Trash>
                </button>

                      </div>
              </li>
                ))}
              </ul>
      <div>
        {/* Pagination controls */}
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(items.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListWithPagination;
