import { BarChart } from '../components';
import { sentimentAll } from '../mock';

function Dashboard() {

    return (
        <div className='tw-max-w-fit tw-max-h-full tw-object-contain' >
            {/* <div>
                <Pie data={bankData}
                    width={200}
                    height={200}
                    innerRadius={60}
                    outerRadius={100} />
            </div> */}
            <div className='tw-text-center tw-max-w-fitl tw-max-h-full tw-m-3 tw-object-contain'>
                <h1 className='tw-font-extrabold tw-text-2xl'>Overall DashBoard</h1>
                <p>ไทย</p>
                <p>english</p>
            </div>
            <div className='tw-my-6 tw-max-w-fit tw-max-h-full tw-object-contain'>
                <BarChart
                    data={sentimentAll}
                    width={740}
                    height={460}
                />
            </div>

        </div>
    );
}

export default Dashboard;