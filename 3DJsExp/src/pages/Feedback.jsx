import { BarChart, FeedbackModal } from '../components';
import { useLocation } from 'react-router-dom';

function Feedback() {

    const location = useLocation();
    const feedback = location.state;

    return (
        <div className='tw-max-w-fit tw-max-h-full tw-object-contain' >
            <div className='tw-text-center tw-max-w-fitl tw-max-h-full tw-m-3 tw-object-contain'>
                <h1 className='tw-font-extrabold tw-text-2xl'>Top 10 Feedback</h1>
            </div>
            <div className='tw-my-6 tw-max-w-fit tw-max-h-full tw-object-contain'>
                <BarChart
                    data={feedback}
                    width={740}
                    height={460}
                />
                <FeedbackModal />
            </div>

        </div>
    );
}

export default Feedback;