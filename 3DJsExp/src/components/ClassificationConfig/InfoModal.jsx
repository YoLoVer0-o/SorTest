import { useState, useEffect } from "react";
import { useResponsive } from "../../hooks";
import { Modal } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";

const InfoModal = (props) => {
    /////////////////////////////////////props declaration/////////////////////////////////////////////////////////////////////
    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [isModalOpen, setIsModalOpen] = useState(modalToggle);

    const { isMobile } = useResponsive();

    useEffect(() => {
        setIsModalOpen(modalToggle);
    }, [modalToggle]);

    return (
        <Modal
            className="tw-max-h-full tw-max-w-fit"
            title={"คำอธิบาย"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            <div className="tw-overflow-y-auto tw-h-full tw-w-full tw-border-black tw-border-2 tw-rounded-md">
                <div className="tw-flex tw-flex-col tw-w-full tw-h-full tw-p-4 tw-gap-4">
                    <div
                        className={classNames("tw-flex tw-flex-col tw-w-96 tw-h-fit", {
                            "tw-w-56": isMobile,
                        })}
                    >
                        <p>คำคัดกรอง:คำในหวดหมู่</p>
                    </div>
                    <div
                        className={classNames("tw-flex tw-flex-col tw-w-96 tw-h-fit", {
                            "tw-w-56": isMobile,
                        })}
                    >
                        <p>น้ำหนัก(1-10):ความเกี่ยวข้องระหว่างคำและหมวดหมู่</p>
                    </div>
                    <div
                        className={classNames("tw-flex tw-flex-col tw-w-96 tw-h-fit", {
                            "tw-w-56": isMobile,
                        })}
                    >
                        <p>หมวดนี้แน่นอน:คำคัดกรองอยู่ในหวดนี้แน่นอน</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

InfoModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
};

export default InfoModal;
