import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

const FeedbackModal = props => {

    //////////////////////////////////////////props declaration////////////////////////////////////////////////////////////////
    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;
    const modalData = props.modalData;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [isModalOpen, setIsModalOpen] = useState(modalToggle);
    const [data, setData] = useState(modalData);

    useEffect(() => {
        setData(modalData);
    }, [modalData]);

    useEffect(() => {
        setIsModalOpen(modalToggle);
    }, [modalToggle]);

    return (
        <Modal
            className='tw-max-h-fit tw-max-w-fit'
            title={'ความคิดเห็น'}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null} >
            <div className='tw-m-6'>
                <p className='tw-text-center tw-font-extrabold tw-text-xl'> โพสต์เมื่อวันที่: {data.timestamp}</p>
                <div className='tw-overflow-y-auto tw-h-full tw-w-full'>
                    <div className='tw-border-black tw-border-4 tw-rounded-sm tw-my-2 tw-p-4'>
                        <div>
                            <span className='tw-font-extrabold tw-text-lg'>ผู้โพสต์: </span>
                            <span className='tw-font-bold'> {data.userName}</span>
                        </div>
                        <div>
                            <span className='tw-font-extrabold tw-text-lg'>เนื้อหา: </span>
                            <span className='tw-font-bold'>{data.message}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    );
};

FeedbackModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    modalData: PropTypes.any.isRequired,

}

export default FeedbackModal;