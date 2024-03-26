import { MainLayout } from "../components";

const MainPage = () => {
    return (
        <div className="tw-h-full tw-max-h-full tw-max-w-[100vw]">
            <MainLayout pageKey={['/main']} />
        </div>
    );
}

export default MainPage;