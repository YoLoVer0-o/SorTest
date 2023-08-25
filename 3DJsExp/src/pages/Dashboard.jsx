import Pie from '../components/Pie'
import Bar from '../components/Bar'
import bankData from '../assets/MOCK_DATA.jsx'
function Dashboard() {

    return (
        <div>
            <div>
                <Pie data={bankData}
                    width={200}
                    height={200}
                    innerRadius={60}
                    outerRadius={100} />
            </div>
            <div>
                <Bar />
            </div>

        </div>
    );
}

export default Dashboard;