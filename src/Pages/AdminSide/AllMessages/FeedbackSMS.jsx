import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userURL } from '../../../Base/Constent';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { SlRefresh } from 'react-icons/sl';
import SinglePurchase from './SinglePurchase';
import { AiFillDelete } from 'react-icons/ai';
import {
    getFeedbackInfo,
    markFeedbackMessageAsRead,
    setFeedback,
} from '../../../ReduxToolKit/User/FeedBackSlice';

function FeedbackSMS({
    enquiry3,
    setEnquiry3,
    showFeedbackMessages,
    setShowFeedbackMessages,
    openFeedbackForm,
}) {
    const dispatch = useDispatch();
    const [selectedFeedbackMessage, setSelectedFeedbackMessage] = useState(null);
    const [checkedEnquiry, setCheckedEnquiry] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [filterOption, setFilterOption] = useState('all');
    const feedbackFormCollections = useSelector(
        (state) => state.feedback.feedback
    );

    useEffect(() => {
        axios
            .get(`${userURL}/form/feedback/getall`, { withCredentials: true })
            .then((response) => {
                dispatch(setFeedback(response.data));
            })
            .catch((error) => {
                console.error('Error fetching feedback messages:', error);
            });
    }, [dispatch]);

    const refreshEnquiryMessages = () => {
        axios
            .get(`${userURL}/form/feedback/getall`, { withCredentials: true })
            .then((response) => {
                dispatch(setFeedback(response.data));
            })
            .catch((error) => {
                console.error('Error refreshing messages:', error);
            });
    };

    const handleCheckedEnquiry = (isCheckedEnquiry, index) => {
        const checkedEnquiryItems = [...checkedEnquiry];
        checkedEnquiryItems[index] = isCheckedEnquiry;
        setCheckedEnquiry(checkedEnquiryItems);
    };

    const isAnyCheckboxCheckedEnquiry = checkedEnquiry.some(
        (isCheckedEnquiry) => isCheckedEnquiry
    );

    const openEnquityMessage = (message) => {
        setEnquiry3(false);
        setShowFeedbackMessages(true);
        setSelectedFeedbackMessage(message);

        dispatch(markFeedbackMessageAsRead(message._id));
    };

    const filteredMessages = feedbackFormCollections.filter((message) => {
        if (filterOption === 'read') {
            return message.read;
        } else if (filterOption === 'unread') {
            return !message.read;
        } else {
            return true; // 'all' option
        }
    });

    const handleSelectAll = (isAllChecked) => {
        setSelectAllChecked(isAllChecked);

        const newChecked = feedbackFormCollections.map(() => isAllChecked);
        setCheckedEnquiry(newChecked);
    };

    const handleDeleteAllEnquiry = () => {
        if (isAnyCheckboxCheckedEnquiry) {
            confirmAlert({
                title: 'Confirm to delete',
                message: 'Are you sure you want to delete all selected messages?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: onDeleteAll,
                    },
                    {
                        label: 'No',
                        onClick: () => {
                            /* Do nothing if the user clicks No */
                        },
                    },
                ],
            });
        } else {
            alert('Please select messages to delete.');
        }
    };

    const onDeleteAll = () => {
        const selectedIds = feedbackFormCollections
            .filter((_, index) => checkedEnquiry[index])
            .map((message) => message._id);

        axios
            .post(`${userURL}/form/feedback/deleteAll`, { ids: selectedIds })
            .then(() => {
                dispatch(getFeedbackInfo());
            })
            .catch((error) => {
                console.error('Error deleting messages:', error);
            });
    };

    const removeMessage = (id, e) => {
        e.stopPropagation();

        axios
            .delete(`${userURL}/form/feedback/delete/${id}`)
            .then(() => {
                dispatch(getFeedbackInfo());
            })
            .catch((error) => {
                console.error('Error deleting message:', error);
            });
    };

    return (
        <>
            {enquiry3 && (
                <div className="w-[100%] bg-white rounded-2xl">
                    <ul>
                        <div className="m-5 pb-5 border-b flex justify-between">
                            <div className="hover:bg-slate-200 rounded-full w-7 h-7 flex justify-center items-center transition-all duration-500">
                                <SlRefresh
                                    className=" cursor-pointer  "
                                    onClick={refreshEnquiryMessages}
                                />
                            </div>

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

                            <div className="hover:bg-slate-200 rounded-full p-2 transition-all duration-500">
                                <button
                                    className="float-right text-[1.5rem] hover:text-red-600"
                                    onClick={handleDeleteAllEnquiry}
                                >
                                    <MdOutlineDeleteSweep />
                                </button>
                            </div>
                        </div>
                        {filteredMessages.length === 0 && (
                            <div className="flex justify-center items-center">
                                <p className="">No Enquiry messages yet</p>
                            </div>
                        )}
                        {feedbackFormCollections &&
                            feedbackFormCollections.length > 0 &&
                            filteredMessages.map((message, index) => (
                                <div
                                    className={`flex items-center hover:bg-slate-200 hover:shadow-inner cursor-pointer p-2 border-b-[0.1rem] ${message.read ? 'font-normal' : 'font-bold'
                                        } `}
                                    key={message._id}
                                    onClick={(e) => {
                                        if (e.target.tagName.toLowerCase() !== 'input') {
                                            openEnquityMessage(message);
                                        }
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        name="selectedFeedbackMessage"
                                        value={message._id}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            handleCheckedEnquiry(e.target.checked, index);
                                        }}
                                        checked={checkedEnquiry[index] || false}
                                    />
                                    <span className={`ms-2 `}>{message.phone}</span>

                                    {message.feedbacks && (
                                        <span className="ms-5 sm:block hidden">
                                            {message.feedbacks.substring(0, 50)}
                                            {message.feedbacks.length > 50 ? '...' : ''}
                                        </span>
                                    )}


                                    <span className=" sm:block hidden ml-auto text-gray-500">
                                        {new Date(message.sentAt).toLocaleString()}
                                    </span>

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
            {showFeedbackMessages && (
                <SinglePurchase selectedFeedbackItem={selectedFeedbackMessage} 
                openFeedbackForm={openFeedbackForm} />
            )}
        </>
    );
}

export default FeedbackSMS;
