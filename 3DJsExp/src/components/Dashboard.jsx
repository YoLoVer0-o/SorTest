import { VerticalBarChart } from '../utilities';
import { sentimentAll, sentimentPos, sentimentNega } from '../mock';
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const redirect = (data) => {
        if (data.commentType == "positive") {
            console.log(data.commentType);
            navigate('feedback', { state: sentimentPos });

        } else if (data.commentType == "negative") {
            console.log(data.commentType);
            navigate('feedback', { state: sentimentNega });
        } else {
            console.log("Unknown comment type");
        }
    };

    return (
        <div className='tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-w-min tw-h-min tw-object-contain'>
            {/* <div>
                <Pie data={bankData}
                    width={200}
                    height={200}
                    innerRadius={60}
                    outerRadius={100} />
            </div> */}
            <div className='tw-flex tw-text-center tw-max-w-fit tw-max-h-fit tw-m-3 tw-object-contain tw-self-center'>
                <h1 className='tw-font-extrabold tw-text-2xl'>Overall DashBoard</h1>
            </div>
            <div className='tw-flex tw-my-6 tw-max-w-fit tw-max-h-fit tw-object-contain'>
                <VerticalBarChart
                    className={"tw-flex tw-h-fit tw-w-fit tw-max-w-fit tw-max-h-fit"}
                    data={sentimentAll}
                    width={740}
                    height={460}
                    onBarClick={redirect}
                />
            </div>

        </div>
    );
}

export default Dashboard;