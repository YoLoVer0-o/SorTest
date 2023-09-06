import { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';

const FeedbackModal = props => {

    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;
    const modalData = props.modalData;

    const [isModalOpen, setIsModalOpen] = useState(modalToggle);
    const [data, setData] = useState(modalData);

    const [visibleComments, setVisibleComments] = useState(5);

    const loadMoreComments = () => {
        setVisibleComments(visibleComments + 5);
    };

    // console.log(data.Comment);

    useEffect(() => {
        console.log("data selected");
        setData(modalData);
    }, [modalData]);

    useEffect(() => {
        setIsModalOpen(modalToggle);
    }, [modalToggle]);

    return (
        <>
            <Modal className='tw-max-h-fit tw-max-w-fit' title="Comment Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
                {data.length != 0 && (<div className='tw-m-6'>
                    <p className='tw-text-center tw-font-extrabold tw-text-xl'>{data.commentType} comments of {data.name}</p>
                    <p className='tw-font-bold tw-m-4'>comments: {data.value} </p>
                    <div className='tw-overflow-y-auto tw-h-[19.5rem]'>
                        {data.Comment.slice(0, visibleComments).map((comment, index) => (
                            <div key={index} className='tw-border-black tw-border-4 tw-rounded-sm tw-my-2 tw-p-4'>
                                <div>
                                    <span className='tw-font-extrabold tw-text-lg'>user: </span>
                                    <span className='tw-font-bold'> {comment.userName}</span>
                                </div>
                                <div>
                                    <span className='tw-font-extrabold tw-text-lg'>said: </span>
                                    <span className='tw-font-bold'>{comment.message}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {visibleComments < data.Comment.length && (
                        <Button type="primary" className='tw-bg-black' onClick={loadMoreComments}>Load More</Button>
                    )}
                </div>)}
            </Modal>
        </>
    );
};
export default FeedbackModal;