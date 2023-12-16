import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { enquiryForm, getEnquiryForm, markMessageAsRead } from '../../../ReduxToolKit/User/EnquirySlice';
import { userURL } from '../../../Base/Constent';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import the confirmation alert library
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Checkbox, Divider } from 'antd';
const CheckboxGroup = Checkbox.Group;
// icons
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { SlRefresh } from 'react-icons/sl';
import SinglePurchase from './SinglePurchase';
import { AiFillDelete } from 'react-icons/ai';
// =======================================================================================================
function EnquirySMS({ enquiry2, setEnquiry2, enquiyForm, showEnquiryMessages, setShowEnquiryMessages }) {

  const dispatch = useDispatch();

  // const [showEnquiryMessages, setShowEnquiryMessages] = useState(false);
  const [selectedEnquiryMessage, setSelectedEnquiryMessage] = useState(null);
  const [checkedEnquiry, setCheckedEnquiry] = useState([]);
  // const [selectAll, setSelectAll] = useState(false);
  // const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const enquiryFormCollections = useSelector(state => state.enquiry.enquiry);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [filterOption, setFilterOption] = useState('all');

  // useEffect(() => {
  //   if(handleEnquiyForm){
  //     setShowEnquiryMessages(false)
  //   }
  // },[])

  useEffect(() => {
    axios.get(`${userURL}/form/enquiy/getall`, { withCredentials: true })
      .then((response) => {
        dispatch(enquiryForm(response.data));
        console.log(response.data);
      })
  }, [dispatch]);
  // ====================[>]
  const refreshEnquiryMessages = () => {
    axios.get(`${userURL}/form/enquiy/getall`, { withCredentials: true })
      .then((response) => {
        dispatch(enquiryForm(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error refreshing messages:', error);
      });
  };

  // ==============================

  const handleCheckedEnquiry = (isCheckedEnquiry, index) => {
    const checkedEnquiryItems = [...checkedEnquiry];
    checkedEnquiryItems[index] = isCheckedEnquiry;
    setCheckedEnquiry(checkedEnquiryItems);
  };
  // ================================
  const isAnyCheckboxCheckedEnquiry = checkedEnquiry.some((isCheckedEnquiry) => isCheckedEnquiry);

  // ===============================
  const openEnquityMessage = (message) => {

    setEnquiry2(false);
    setShowEnquiryMessages(true);
    setSelectedEnquiryMessage(message);

    // Dispatch action to mark the message as read
    dispatch(markMessageAsRead(message._id));

  };
  // ========================
  const filteredMessages = enquiryFormCollections.filter((message) => {
    if (filterOption === 'read') {
      return message.read;
    } else if (filterOption === 'unread') {
      return !message.read;
    } else {
      return true; // 'all' option
    }
  });
  // =================================
  const handleSelectAll = (isAllChecked) => {
    setSelectAllChecked(isAllChecked);

    // Update the state of individual checkboxes
    const newChecked = enquiryFormCollections.map(() => isAllChecked);
    setCheckedEnquiry(newChecked);
  };

  // delte sms
  const handleDeleteAllEnquiry = () => {
    if (isAnyCheckboxCheckedEnquiry) {
      // Show confirmation alert
      confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure you want to delete all selected messages?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => onDeleteAllEnqiry(),
          },
          {
            label: 'No',
            onClick: () => { /* Do nothing if user clicks No */ },
          },
        ],
      });
    } else {
      // Show alert if no checkboxes are selected
      alert('Please select messages to delete.');
    }
  };

  const onDeleteAllEnqiry = () => {
    // Implement the logic to delete all selected messages in the database
    // Make a request to your server to delete the selected messages
    const selectedIds = enquiryFormCollections
      .filter((_, index) => checkedEnquiry[index])
      .map((message) => message._id);

    axios.post(`${userURL}/form/enquiy/deleteAll`, { ids: selectedIds })
      .then(() => {
        dispatch(getEnquiryForm()); // Fetch updated tasks
      })
      .catch((error) => {
        console.error('Error deleting messages:', error);
      });
  };

  // ==========================
  const removeMessage = (id, e) => {
    // Prevent event propagation
    e.stopPropagation();

    axios.delete(`${userURL}/form/enquiy/delete/${id}`)
      .then((res) => {
        dispatch(getEnquiryForm()); // Fetch updated tasks

      })
      .catch((error) => {
        console.error('Error deleting message:', error);
      });
  };

  return (
    <>
      {enquiry2 && (
        <div className="w-[100%] bg-white rounded-2xl">
          <ul>
            {/* all selection */}
            <div className="m-5 pb-5 border-b flex justify-between">
              {/* refresh pagestart */}
              <div className="hover:bg-slate-200 rounded-full w-7 h-7 flex justify-center items-center transition-all duration-500">
                <SlRefresh className=' cursor-pointer  ' onClick={refreshEnquiryMessages} />
              </div>

              {/* refresh ends */}
              <div className="">
                {/* <input
                      type="checkbox"
                      name="selectallCheckbox"
                      id="selectallCheckbox"
                      checked={selectAllChecked}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    /> */}
               <Checkbox
                  // indeterminate={indeterminate}
                  onChange={(e) =>handleSelectAll(e.target.checked)}
                  checked={selectAllChecked}
                >
                  Check all
                </Checkbox>
                {/* <span>Select ALL</span> */}
              </div>
              <div className="relative">
                <select
                  className="cursor-pointer border p-2 rounded-md"
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                >
                  <option value="all">All Messages</option>
                  <option value="read">Read</option>
                  <option value="unread">Unread</option>
                </select>
              </div>

              {/* Delete all start */}

              <div className="hover:bg-slate-200 rounded-full p-2 transition-all duration-500">
                <button className='float-right text-[1.5rem] hover:text-red-600' onClick={handleDeleteAllEnquiry}>
                  <MdOutlineDeleteSweep />
                </button>
              </div>
              {/* Delete all start */}

            </div>
            {filteredMessages.length === 0 && (
              <div className="flex justify-center items-center">
                <p className=''>No Enquiry messages yet</p>
              </div>
            )}
            {enquiryFormCollections && enquiryFormCollections.length > 0 &&
              filteredMessages.map((message, index) => (
                <div
                  className={`flex items-center hover:bg-slate-200 hover:shadow-inner cursor-pointer p-2 border-b-[0.1rem] ${message.read ? 'font-normal' : 'font-bold'} `}
                  key={message._id}
                  onClick={(e) => {
                    // Check if the clicked element is not the checkbox
                    if (e.target.tagName.toLowerCase() !== 'input') {
                      openEnquityMessage(message);
                    }
                  }}
                >
                  {/* Radio Button */}
                  {/* <input
                    type="checkbox"
                    name="selectedEnquiryMessage"
                    value={message._id}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCheckedEnquiry(e.target.checked, index);
                    }}
                    checkedEnquiry={checkedEnquiry[index] || false}
                  /> */}
                  <Checkbox
                  // indeterminate={indeterminate}
                  onChange={(e) =>handleCheckedEnquiry(e.target.checked,index)}
                  checkedEnquiry={checkedEnquiry[index] || false}
                />
                  {/* Full Name */}
                  <span className={`ms-2 `}>{message.fullName}</span>

                  {/* commends (showing only first 10 characters followed by '...') */}
                  <span className="ms-5 sm:block hidden">
                    {message.commends.substring(0, 50)}
                    {message.commends.length > 50 ? '...' : ''}
                  </span>
                  {/* Sent Date and Time */}
                  <span className=" sm:block hidden ml-auto text-gray-500">
                    {new Date(message.sentAt).toLocaleString()}
                  </span>
                  {/* Delete Button */}
                  {checkedEnquiry[index] && (
                    <button
                      className="ml-auto"
                      onClick={(e) => removeMessage(message._id, e)}
                    >
                      <AiFillDelete />
                    </button>

                  )}
                </div>
              ))}
          </ul>
        </div>
      )}
      {showEnquiryMessages && <SinglePurchase selectedEnquiryItem={selectedEnquiryMessage}
        enquiyForm={enquiyForm}

      />}

    </>

  )
}

export default EnquirySMS