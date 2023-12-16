import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { adminbaseURL, userURL } from '../../Base/Constent';
import { formsingle, getUserSingleForm, markMessageAsRead } from '../../ReduxToolKit/User/SingleFormSlice';
import { useDispatch, useSelector } from 'react-redux';
import SinglePurchase from './AllMessages/SinglePurchase';
import { confirmAlert } from 'react-confirm-alert'; // Import the confirmation alert library
import 'react-confirm-alert/src/react-confirm-alert.css';
// icons
import { AiFillDelete } from 'react-icons/ai';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { SlRefresh } from "react-icons/sl";
import EnquirySMS from './AllMessages/EnquirySMS';
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
// img
import logo from '../../../assets/images/doba_logo.png';
import { enquiryForm } from '../../ReduxToolKit/User/EnquirySlice';
import { getFeedbackInfo, setFeedback } from '../../ReduxToolKit/User/FeedBackSlice';
import FeedbackSMS from './AllMessages/FeedbackSMS';


function Messages() {
  const dispatch = useDispatch();

  const [enquiry1, setEnquiry1] = useState(true);
  const [enquiry2, setEnquiry2] = useState(false);
  const [enquiry3, setEnquiry3] = useState(false);

  const [showMessages, setShowMessages] = useState(false);
  const [showEnquiryMessages, setShowEnquiryMessages] = useState(false);
  const [showFeedbackMessages, setShowFeedbackMessages] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [checked, setChecked] = useState([]);
  // const [selectAll, setSelectAll] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [filterOption, setFilterOption] = useState('all');
  const [open, setOpen] = useState(false)
  // =================================

  const SingleFormCollections = useSelector(state => state.form.form);
  const enquiryFormCollections = useSelector(state => state.enquiry.enquiry);
  const feedbackFormCollections = useSelector(state => state.feedback.feedback);

  // console.log(SingleFormCollections, 'SingleFormCollections');

  useEffect(() => {
    axios.get(`${userURL}/singleform/getall`, { withCredentials: true })
      .then((response) => {
        dispatch(formsingle(response.data));
        console.log(response.data);
      })
  }, [dispatch]);
  // enqyiry form=============================================
  useEffect(() => {
    axios.get(`${userURL}/form/enquiy/getall`, { withCredentials: true })
      .then((response) => {
        dispatch(enquiryForm(response.data));
        console.log(response.data);
      })
  }, [dispatch]);
  // =======Feedback form==========================
  useEffect(() => {
    axios.get(`${userURL}/form/feedback/getall`, { withCredentials: true })
      .then((response) => {
        dispatch(setFeedback(response.data));
        console.log(response.data);
      })
  }, [dispatch]);
  // ==============================================
  const refreshMessages = () => {
    axios.get(`${userURL}/singleform/getall`, { withCredentials: true })
      .then((response) => {
        dispatch(formsingle(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error refreshing messages:', error);
      });
  };

  // =================================

  const openSingeForm = () => {
    setEnquiry1(true);
    setEnquiry2(false);
    setEnquiry3(false);
    setShowMessages(false);
    setShowEnquiryMessages(false)
    setShowFeedbackMessages(false)

  };


  const enquiyForm = () => {
    setEnquiry1(false);
    setEnquiry2(true);
    setEnquiry3(false);
    setShowMessages(false);
    setShowEnquiryMessages(false)
    setShowFeedbackMessages(false)
  };
  const openFeedbackForm = () => {
    setEnquiry1(false);
    setEnquiry2(false);
    setEnquiry3(true);
    setShowMessages(false);
    setShowEnquiryMessages(false)
    setShowFeedbackMessages(false)
  };

  // const showSingleMessage = (message) => {
  //   setEnquiry1(false);
  //   setShowMessages(true);
  //   setSelectedMessage(message);
  // };

  // =================================

  // Messages.jsx
  const showSingleMessage = (message) => {
    setEnquiry1(false);
    setShowMessages(true);
    setSelectedMessage(message);

    // Dispatch action to mark the message as read
    dispatch(markMessageAsRead(message._id));
  };
  // =================================
  // Calculate allMessagesRead and unreadCount

  const allMessagesRead = enquiryFormCollections.every(message => message.read);
  const unreadCount = enquiryFormCollections.filter(message => !message.read).length;
  // ==
  const allSingleMessagesRead = SingleFormCollections.every(message => message.read);
  const unreadSingleCount = SingleFormCollections.filter(message => !message.read).length;
  // ==
  const allFeedbacksRead = feedbackFormCollections.every(message => message.read);
  const unreadFeedbackCount = feedbackFormCollections.filter(message => !message.read).length;
  
  // Filter messages based on the selected option
  const filteredMessages = SingleFormCollections.filter((message) => {
    if (filterOption === 'read') {
      return message.read;
    } else if (filterOption === 'unread') {
      return !message.read;
    } else {
      return true; // 'all' option
    }
  });

  const handleChecked = (isChecked, index) => {
    const checkedItems = [...checked];
    checkedItems[index] = isChecked;
    setChecked(checkedItems);
  };

  // select all checkbox
  // const handleSelectAll = (isAllChecked) => {
  //   if (SingleFormCollections && SingleFormCollections.length > 0) {
  //     const newChecked = SingleFormCollections.map(() => isAllChecked);
  //     setChecked(newChecked);
  //   } else {
  //     setChecked([]); // Set to an empty array when there are no messages
  //   }
  // };

  const handleSelectAll = (isAllChecked) => {
    setSelectAllChecked(isAllChecked);

    // Update the state of individual checkboxes
    const newChecked = SingleFormCollections.map(() => isAllChecked);
    setChecked(newChecked);
  };

  // const isAllCheckboxesChecked = checked.every((isChecked) => isChecked);
  const isAnyCheckboxChecked = checked.some((isChecked) => isChecked);
  // =================================

  const removeMessage = (id, e) => {
    // Prevent event propagation
    e.stopPropagation();

    axios.delete(`${userURL}/form/delete/${id}`)
      .then((res) => {
        dispatch(getUserSingleForm()); // Fetch updated tasks
      })
      .catch((error) => {
        console.error('Error deleting message:', error);
      });
  };
  // =================================
  const handleDeleteAll = () => {
    if (isAnyCheckboxChecked) {
      // Show confirmation alert
      confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure you want to delete all selected messages?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => onDeleteAll(),
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

  const onDeleteAll = () => {
    // Implement the logic to delete all selected messages in the database
    // Make a request to your server to delete the selected messages
    const selectedIds = SingleFormCollections
      .filter((_, index) => checked[index])
      .map((message) => message._id);

    axios.post(`${userURL}/form/deleteAll`, { ids: selectedIds })
      .then(() => {
        dispatch(getUserSingleForm()); // Fetch updated tasks
      })
      .catch((error) => {
        console.error('Error deleting messages:', error);
      });
  };
  return (
    <div className="">
      {/* ppppppp */}
      {/* <div className={` ${open ?'w-72' : 'w-20'} duration-300 h-screen relative bg-blue-600`}> 
      <IoIosArrowForward 
          className={`absolute cursor-pointer -right-3 top-9 text-[1.75rem] border rounded-full duration-300 border-blue-600 ${open && 'rotate-180'}`}
          onClick={()=> setOpen(!open)}/>
       </div> */}
      {/* <div className="p-7 text-2xl font-semibold flex-1 bg-slate-600 h-screen">
          second
        </div> */}
      {/* ppppppp */}
      {/* sm: sms menu bar menu ======================================================[?]*/}

      <div className=" pt-10 sm:flex bg-[#F6F8FC] p-5">
        <div className={` ${open ? ' my-6' : 'h-1 w-[15%]'} w-[100%] flex justify-center sm:hidden m-auto duration-300 rounded-md  bg-dark-purple`}>
          <MdOutlineArrowDropDown onClick={() => setOpen(!open)} className='absolute  top-[1.8rem] text-[2rem]' />
          {/*  */}
          <ul className={`${!open && 'hidden'} origin-left duration-200`}>
            <li
              className={`text-white p-2 cursor-pointer rounded-lg ${enquiry1 || showMessages ? 'font-bold' : 'font-light'}`}
              onClick={openSingeForm}
            >
              SinglePurchase
              {SingleFormCollections && SingleFormCollections.length > 0 && (
                  <span className={`w-5 h-5  font-bold float-right flex justify-center items-center ms-2 rounded-full ${allSingleMessagesRead ? ' text-white' : 'bg-red-500 text-white'}`}>
                    {allSingleMessagesRead ? SingleFormCollections.length.toLocaleString() : unreadSingleCount.toLocaleString()}
                  </span>
                )}
            </li>
            <li
              className={`text-white p-2 cursor-pointer rounded-lg ${enquiry2 || showEnquiryMessages ? 'font-bold' : 'font-light'}`}
              onClick={enquiyForm}
            >
              Enquiry Form
              {/* {enquiryFormCollections && enquiryFormCollections.length > 0 && (
                <span className=" w-5 h-5 text-center ms-2 rounded-full bg-red-500 float-right ">
                  {enquiryFormCollections.length.toLocaleString()}
                </span>
              )} */}
               {enquiryFormCollections && enquiryFormCollections.length > 0 && (
                  <span className={`w-5 h-5  font-bold float-right flex justify-center items-center ms-2 rounded-full ${allMessagesRead ? ' text-white' : 'bg-red-500 text-white'}`}>
                    {allMessagesRead ? enquiryFormCollections.length.toLocaleString() : unreadCount.toLocaleString()}
                  </span>
                )}
            </li>
            {/* feedback menu */}
            <li
              className={`text-white p-2 cursor-pointer rounded-lg ${enquiry3 || showFeedbackMessages ? 'font-bold' : 'font-light'}`}
              onClick={openFeedbackForm}
            >
              Feedback Form
               {feedbackFormCollections && feedbackFormCollections.length > 0 && (
                  <span className={`w-5 h-5  font-bold float-right flex justify-center items-center ms-2 rounded-full ${allFeedbacksRead ? ' text-white' : 'bg-red-500 text-white'}`}>
                    {allFeedbacksRead ? feedbackFormCollections.length.toLocaleString() : unreadFeedbackCount.toLocaleString()}
                  </span>
                )}
            </li>
          </ul>
          {/*  */}
        </div>
        {/* sm: sms menu bar menu ends ======================================================[?]*/}

        <div className="w-[20%] md:block hidden">
          <div className="w-[80%] ">
            {/* selection list */}
            <ul className="">
              <li
                className={`p-2 my-2 font-light hover:bg-slate-200 cursor-pointer rounded-lg ${enquiry1 || showMessages ? 'bg-slate-300 hover:bg-slate-300' : ''}`}
                onClick={openSingeForm}
              >
                SinglePurchase
                {SingleFormCollections && SingleFormCollections.length > 0 && (
                  <span className={`w-5 h-5  font-bold float-right flex justify-center items-center ms-2 rounded-full ${allSingleMessagesRead ? ' text-black' : 'bg-red-500 text-white'}`}>
                    {allSingleMessagesRead ? SingleFormCollections.length.toLocaleString() : unreadSingleCount.toLocaleString()}
                  </span>
                )}
              </li>
              {/* [===========================   =======================================] */}
              <li
                className={`p-2 font-light hover:bg-slate-200 cursor-pointer rounded-lg ${enquiry2 || showEnquiryMessages ? 'bg-slate-300 hover:bg-slate-300' : ''}`}
                onClick={enquiyForm}
              >
                Enquiry Form

                {/* Display the count based on read/unread status */}
                {enquiryFormCollections && enquiryFormCollections.length > 0 && (
                  <span className={`w-5 h-5  font-bold float-right flex justify-center items-center ms-2 rounded-full ${allMessagesRead ? ' text-black' : 'bg-red-500 text-white'}`}>
                    {allMessagesRead ? enquiryFormCollections.length.toLocaleString() : unreadCount.toLocaleString()}
                  </span>
                )}
              </li>

               {/* feedback menu */}
           
            {/*  */}
            <li
                className={`p-2 font-light hover:bg-slate-200 cursor-pointer mt-3 rounded-lg ${enquiry3 || showEnquiryMessages ? 'bg-slate-300 hover:bg-slate-300' : ''}`}
                onClick={openFeedbackForm}
              >
              Feedback Form


                {/* Display the count based on read/unread status */}
                {feedbackFormCollections && feedbackFormCollections.length > 0 && (
                  <span className={`w-5 h-5  font-bold float-right flex justify-center items-center ms-2 rounded-full ${allFeedbacksRead ? ' text-black' : 'bg-red-500 text-white'}`}>
                    {allFeedbacksRead ? feedbackFormCollections.length.toLocaleString() : unreadFeedbackCount.toLocaleString()}
                  </span>
                )}
              </li>
              {/* [=================================================================] */}

            </ul>
            {/* selection list ends*/}
          </div>
        </div>
        {/* second div start */}
        <div className="sm:w-[80%] h-[100vh] overflow-y-auto scroll-smooth flex justify-center w-[100%]">
          {enquiry1 && (
            <div className="w-[100%] bg-white rounded-2xl">
              <ul>
                {/* head side stats */}

                {/* all selection */}
                <div className="m-5 pb-5 border-b flex justify-between">
                  {/* refresh pagestart */}
                  <div className="hover:bg-slate-200 rounded-full w-7 h-7 flex justify-center items-center  transition-all duration-500">
                    <SlRefresh className=' cursor-pointer  ' onClick={refreshMessages} />
                  </div>

                  {/* refresh ends */}
                  {/* selectallCheckbox starts */}
                  <div className="">
                    <input
                      type="checkbox"
                      name="selectallCheckbox"
                      id="selectallCheckbox"
                      checked={selectAllChecked}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
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

                  {/* selectallCheckbox ends */}

                  {/* Delete all start */}

                  <div className="hover:bg-slate-200 rounded-full p-2 transition-all duration-500">
                    <button className='float-right text-[1.5rem] hover:text-red-600' onClick={handleDeleteAll}>
                      <MdOutlineDeleteSweep />
                    </button>
                  </div>
                  {/* Delete all start */}

                </div>
                {/* head side ends */}
                {filteredMessages.length === 0 && (
                  <div className="flex justify-center items-center">
                    <p className=''>No messages yet</p>
                  </div>
                )}
                {SingleFormCollections && SingleFormCollections.length > 0 &&
                  filteredMessages.map((message, index) => (
                    <div
                      className={`flex items-center hover:bg-slate-200 hover:shadow-inner cursor-pointer p-2 border-b-[0.1rem] ${message.read ? 'font-normal' : 'font-bold'} `}
                      key={message._id}
                      onClick={(e) => {
                        // Check if the clicked element is not the checkbox
                        if (e.target.tagName.toLowerCase() !== 'input') {
                          showSingleMessage(message);
                        }
                      }}
                    >
                      {/* Radio Button */}
                      <input
                        type="checkbox"
                        name="selectedMessage"
                        value={message._id}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleChecked(e.target.checked, index);
                        }}
                        checked={checked[index] || false}
                      />
                      {/* Full Name */}
                      <span className={`ms-2 `}>{message.fullName}</span>

                      {/* Command (showing only first 10 characters followed by '...') */}
                      <span className="ms-5 sm:block hidden">
                        {message.command.substring(0, 50)}
                        {message.command.length > 50 ? '...' : ''}
                      </span>
                      {/* Sent Date and Time */}
                      <span className=" sm:block hidden ml-auto text-gray-500">
                        {new Date(message.sentAt).toLocaleString()}
                      </span>
                      {/* Delete Button */}
                      {checked[index] && (
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


          {showMessages && <SinglePurchase
            openSingeForm={openSingeForm}
            selectedItem={selectedMessage}
          />}

          <EnquirySMS 
          enquiyForm={enquiyForm}
           enquiry2={enquiry2}
           setEnquiry2={setEnquiry2} 
           handleEnquiyForm={enquiyForm}
          showEnquiryMessages={showEnquiryMessages} 
          setShowEnquiryMessages={setShowEnquiryMessages} 
          allMessagesRead={allMessagesRead}
          unreadCount={unreadCount}
          />

          
<FeedbackSMS 
          openFeedbackForm={openFeedbackForm}
           enquiry3={enquiry3}
           setEnquiry3={setEnquiry3} 
          //  handleEnquiyForm={openFeedbackForm}
          showFeedbackMessages={showFeedbackMessages} 
          setShowFeedbackMessages={setShowFeedbackMessages} 
          allFeedbacksRead={allFeedbacksRead}
          unreadFeedbackCount={unreadFeedbackCount}
          />

  

        </div>
      </div>
    </div>
  );
}

export default Messages;
