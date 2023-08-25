// import Pie from '../components/Pie'
// import { bankData } from "../assets/MOCK_DATA";
import Bar from '../components/Bar'
function Dashboard() {

    return (
        <div >
            {/* <div>
                <Pie data={bankData}
                    width={200}
                    height={200}
                    innerRadius={60}
                    outerRadius={100} />
            </div> */}
            <div className='tw-text-center tw-m-3'>
                <h1 className='tw-font-extrabold tw-text-2xl'>Overall DashBoard</h1>
                <p>ไทย</p>
                <p>english</p>
            </div>
            <div className='tw-my-6'>
                <Bar />
            </div>

        </div>
    );
}

export default Dashboard;