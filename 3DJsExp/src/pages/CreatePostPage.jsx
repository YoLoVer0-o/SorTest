import { MainLayout } from "../components";

const CreatePostPage = () => {
    return (
        <div className="tw-h-full tw-max-h-full tw-max-w-[100vw]">
            <MainLayout pageKey={['/postCreation']} />
        </div>
    );
}

export default CreatePostPage;