import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom';

import logo from '../assets/logo.jpg';
import poster from '../assets/poster.jpg';



const PostReport = props => {

    const location = useLocation();
    const postData = location.state;

    return (
        <div className='tw-grid tw-grid-flow-row tw-max-w-full tw-max-h-full tw-w-full tw-h-full tw-overflow-y-auto tw-gap-10'>
            <div className='tw-grid tw-grid-flow-row tw-gap-4'>
                <div className='tw-grid tw-grid-flow-col tw-justify-between' >
                    <div className='tw-rounded-full tw-border-8 tw-border-black tw-w-36 tw-h-36 tw-overflow-hidden'>
                        <img className='object-scale-down' src={logo} />
                    </div>
                    <div className='tw-grid tw-border-4 tw-border-black tw-align-middle tw-items-center tw-justify-start tw-p-4'>
                        <p className='tw-text-md'>กลุ่ม:</p>
                        <p className='tw-text-md'>ชื่อผู้ใช้:{postData.creator}</p>
                        <p className='tw-text-md'>ช่องทาง:</p>
                    </div>
                    <div className='tw-grid tw-border-4 tw-border-black tw-align-middle tw-items-center tw-justify-start tw-p-4'>
                        <p className='tw-text-md'>ยอดผู้ติดตาม:</p>
                        <p className='tw-text-md'>ยอดวิว/รีทวิต:</p>
                        <p className='tw-text-md'>คอมเมนต์:</p>
                    </div>
                </div>
                <div className='tw-grid tw-grid-flow-col tw-justify-between tw-max-h-fit tw-max-w-fit tw-gap-4'>
                    <div className='tw-grid tw-border-4 tw-border-black tw-max-h-80'>
                        <p>
                            {postData.post}
                        </p>
                    </div>
                    <div className='tw-grid tw-border-4 tw-border-black tw-max-w-sm tw-max-h-80 tw-overflow-hidden'>
                        <img className='object-contain tw-max-h-[inherit] tw-max-w-[inherit]' src={poster} />
                    </div>
                </div>
            </div>
            <div className='tw-grid tw-grid-flow-row tw-max-h-fit tw-max-w-fit'>
                <div className='tw-border-4 tw-border-black tw-text-center'>สรุปความเคลื่อนไหว</div>
                <div className='tw-grid tw-border-4 tw-border-black tw-max-h-80'>
                    <p>
                        {postData.post}
                    </p>
                </div>
            </div>
            <div className='tw-grid tw-grid-flow-row tw-max-h-fit tw-max-w-fit'>
                <div className='tw-border-4 tw-border-black tw-text-center'>สรุปวิเคราะห์</div>
                <div className='tw-grid tw-border-4 tw-border-black tw-max-h-80'>
                    <p>
                        {postData.post}
                    </p>
                </div>
            </div>
        </div>
    )
}

PostReport.propTypes = {

}

export default PostReport