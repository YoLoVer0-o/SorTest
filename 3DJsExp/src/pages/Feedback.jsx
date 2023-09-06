import { BarChart, FeedbackModal } from '../components';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function Feedback() {

    const location = useLocation();
    const rawFeedback = location.state;
    const sortedFeedback = rawFeedback.sort((a, b) => b.value - a.value);

    const [modalToggle, setModalToggle] = useState(false);
    const [comment, setComment] = useState([]);

    const showModal = (data) => {
        setComment(data);
        setModalToggle(true);
    };

    const handleCancel = () => {
        setModalToggle(false);
    };

    return (
        <div className='tw-max-w-fit tw-max-h-full tw-object-contain' >
            <div className='tw-text-center tw-max-w-fitl tw-max-h-full tw-m-3 tw-object-contain'>
                <h1 className='tw-font-extrabold tw-text-2xl'>Top 10 Feedback</h1>
            </div>
            <div className='tw-my-6 tw-max-w-fit tw-max-h-full tw-object-contain'>
                <BarChart
                    data={sortedFeedback}
                    width={740}
                    height={460}
                    onBarClick={showModal}
                />
                <FeedbackModal modalToggle={modalToggle} handleCancel={handleCancel} modalData={comment} />
            </div>

        </div>
    );
}

export default Feedback;