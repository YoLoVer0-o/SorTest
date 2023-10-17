import { Input, Form, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "dayjs/locale/th";
// import PropTypes from "prop-types";

const ListInput = () => {
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 20,
        offset: 4,
      },
    },
  };

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <div>
      <Form
        // name="dynamic_form_item"
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
      // style={{
      //   maxWidth: 600,
      // }}
      >
        <Form.List
          name='data'
        //   rules={[
        //     {
        //       validator: async (_, names) => {
        //         if (!names || names.length < 2) {
        //           return Promise.reject(new Error("At least 2 passengers"));
        //         }
        //       },
        //     },
        //   ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "40%",
                  }}
                  icon={<PlusOutlined />}
                >
                  เพิ่มหัวข้อ
                </Button>

                <Form.ErrorList errors={errors} />
              </Form.Item>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayoutWithOutLabel
                    : formItemLayoutWithOutLabel)}
                  //   label={index === 0 ? "Passengers" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    className="tw-flex tw-flex-nowrap tw-flex-row tw-w-full"
                  // rules={[
                  //   {
                  //     required: true,
                  //     whitespace: false,
                  //     message:
                  //       "Please input passenger's name or delete this field.",
                  //   },
                  // ]}
                  // noStyle
                  >
                    <div className="tw-flex tw-flex-row tw-gap-8">
                      <div >
                        <Input
                          className="tw-flex tw-w-[32vw]"
                        //   placeholder="passenger name"
                        //   style={{
                        //     width: "100%",
                        //   }}
                        />
                      </div>
                      <div className="tw-flex ">
                        <MinusCircleOutlined
                          className="dynamic-delete-button tw-text-xl tw-text-red-600"
                          onClick={() => remove(field.name)}
                        />
                      </div>
                    </div>
                  </Form.Item>
                </Form.Item>
              ))}
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button className="tw-bg-lime-400" type="primary" htmlType="submit">
            บันทึก
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

ListInput.propTypes = {}

export default ListInput;
