import { useState, useEffect } from 'react';
import { Modal } from 'antd';

const FeedbackModal = props => {

    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;
    const modalData = props.modalData;

    const [isModalOpen, setIsModalOpen] = useState(modalToggle);
    const [data, setData] = useState(modalData);

    useEffect(() => {
        setData(modalData);
    }, [modalData]);

    useEffect(() => {
        setIsModalOpen(modalToggle);
    }, [modalToggle]);

    return (
        <>
            <Modal title="Comment Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <div>
                    {data.map((d, index) => (
                        <div key={index}>
                            <p>{d.userName}</p>
                            <p>{d.message}</p>
                        </div>
                    ))}
                    {/* <p>Some contents...</p> */}
                </div>
            </Modal>
        </>
    );
};
export default FeedbackModal;