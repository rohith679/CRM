import React, { useEffect } from "react";
import LogoUploader from "../../../../Components/LogoUploader/Index";
import PrimaryBtn from "../../../../Components/Button/Index";
import { Checkbox, Col, DatePicker, Form, Input, Row, Select } from "antd";
import useServices from "../hooks/useServices";
import dayjs from "dayjs";
import Text from "../../../../Components/Typography/Typography";
import { LeftOutlined } from "@ant-design/icons";

const UserRegisterForm = ({ user, onBack, editAccount, setIsMyAccount }) => {
  const [form] = Form.useForm();
  const services = useServices();
  const { errors, userForm, setUserForm } = services;

  // useEffect(() => {
  //   if (user?._id) {
  //     setUserForm((prev) => ({
  //       ...prev,
  //       userDetails: {
  //         fname: user?.fname,
  //         email: user?.email,
  //         dob: user?.dob,
  //         gender: user?.gender,
  //         height: user?.height,
  //         weight: user?.weight,
  //         mobileNo: user?.mobileNo,
  //       },
  //     }));
  //   }
  // }, [user]);
  useEffect(() => {
    if (user?._id) {
      const newData = {
        fname: user?.fname,
        email: user?.email,
        dob: user?.dob ? dayjs.unix(user?.dob) : null,
        gender: user?.gender,
        height: user?.height,
        weight: user?.weight,
        mobileNo: user?.mobileNo,
      };

      form.setFieldsValue(newData); // ✅ set values dynamically
      setUserForm((prev) => ({
        ...prev,
        userDetails: newData,
      }));
    }
  }, [user]);

  console.log(user);
  console.log(userForm);

  const handleChange = (event, name) => {
    if (!name) return;
    let { value } = event.target;
    // Remove all spaces
    value = value.replace(/\s/g, "");
    setUserForm((prev) => ({
      ...prev,
      userDetails: {
        ...prev?.userDetails,
        [name]: value,
      },
    }));
    if (errors?.[name]) {
      delete errors?.[name];
    }
  };
  return (
    <>
      {user?._id && (
        <div className="flex justify-between items-center">
          <div
            className="flex justify-start text-secondary font-semibold items-center cursor-pointer gap-1 text-xl"
            onClick={onBack}
          >
            <LeftOutlined />
            Back
          </div>
          {editAccount && (
            <div
              className="text-white bg-primary p-1 w-10 text-center rounded-lg cursor-pointer"
              onClick={() => setIsMyAccount(false)}
            >
              Edit
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-center">
          <LogoUploader
            logoUrl={userForm?.userDetails?.profileImage}
            onUpload={(url) =>
              setUserForm((prev) => ({
                ...prev,
                userDetails: {
                  ...prev.userDetails,
                  profileImage: url,
                },
              }))
            }
          />
        </div>

        <Form
          form={form}
          layout="vertical"
          className="[&_.ant-form-item]:mb-0 max-sm:[&_.ant-form-item]:mb-0"
          initialValues={{
            fname: userForm?.userDetails?.fname,
            email: userForm?.userDetails?.email,
            dob: userForm?.userDetails?.dob
              ? dayjs.unix(userForm?.userDetails?.dob)
              : null,
            gender: userForm?.userDetails?.gender,
            height: userForm?.userDetails?.height,
            weight: userForm?.userDetails?.weight,
          }}
          onValuesChange={(changedValues, allValues) => {
            setUserForm((prev) => ({
              ...prev,
              userDetails: {
                ...prev.userDetails,
                fname: allValues.fname,
                email: allValues.email,
                dob: allValues.dob
                  ? Math.floor(allValues.dob.valueOf() / 1000)
                  : null,
                gender: allValues.gender,
                height: allValues.height,
                weight: allValues.weight,
              },
            }));
          }}
        >
          <Row gutter={[6, 6]}>
            {/* gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} */}
            <Col span={24}>
              <Form.Item
                label={
                  <p className="text-label mb-0">
                    Full Name<span className="text-red-500">*</span>
                  </p>
                }
                name="fname"
                rules={[{ required: true, message: "First name is required" }]}
                required={false}
                validateStatus={errors?.fname ? "error" : ""}
                help={errors?.fname || ""}
              >
                <Input
                  value={userForm?.userDetails?.fname || ""}
                  onChange={(e) => handleChange(e, "fname")}
                  maxLength={30}
                  disabled={editAccount}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={<p className="text-label mb-0">Email Id</p>}
                name="email"
                rules={[{ required: false, message: "Email is required" }]}
                required={false}
                validateStatus={errors?.email ? "error" : ""}
                help={errors?.email || ""}
              >
                <Input
                  value={userForm?.userDetails?.email}
                  onChange={(e) => handleChange(e, "email")}
                  disabled={editAccount}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<p className="text-label mb-0">DOB</p>}
                name="dob"
              >
                <DatePicker
                  className="w-full"
                  showToday={false}
                  value={
                    userForm?.userDetails?.dob
                      ? dayjs.unix(userForm.userDetails.dob) // convert timestamp to dayjs
                      : null
                  }
                  defaultPickerValue={dayjs().subtract(15, "year")}
                  onChange={(date) => {
                    const timestamp = date
                      ? Math.floor(date.valueOf() / 1000)
                      : null;
                    setUserForm((prev) => ({
                      ...prev,
                      userDetails: {
                        ...prev.userDetails,
                        dob: timestamp,
                      },
                    }));
                    delete errors?.dob;
                  }}
                  disabledDate={(current) => {
                    // Disable dates after today minus 18 years
                    return (
                      current &&
                      current > dayjs().subtract(15, "year").endOf("day")
                    );
                  }}
                  disabled={editAccount}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<p className="text-label mb-0">Gender</p>}
                name="age"
                required={false}
              >
                <Select
                  className="w-full"
                  placeholder="Select age group"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                  value={userForm?.userDetails?.gender}
                  onChange={(value) => {
                    setUserForm((prev) => ({
                      ...prev,
                      userDetails: {
                        ...prev.userDetails,
                        gender: value,
                      },
                    }));
                  }}
                  disabled={editAccount}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<p className="text-label mb-0">Height</p>}
                name="height"
                rules={[{ required: false, message: "Height is required" }]}
                required={false}
              >
                <Input
                  value={userForm?.userDetails?.email}
                  onChange={(e) => handleChange(e, "height")}
                  disabled={editAccount}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<p className="text-label mb-0">Weight</p>}
                name="weight"
                rules={[{ required: false, message: "Email is required" }]}
                required={false}
              >
                <Input
                  value={userForm?.userDetails?.email}
                  onChange={(e) => handleChange(e, "weight")}
                  disabled={editAccount}
                />
              </Form.Item>
            </Col>
            {!user?._id && (
              <Col span={24}>
                <Form.Item className="my-2">
                  <div className="flex items-start gap-2">
                    <Checkbox
                    // checked={isChecked}
                    // onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <Text type="body" className="text-sm">
                      By logging in, you accept the{" "}
                      <a
                        href="/user/terms&Conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-300 underline"
                      >
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacyPolicy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-300 underline"
                      >
                        Privacy Policy
                      </a>{" "}
                      of Zenvy
                    </Text>
                  </div>
                </Form.Item>
              </Col>
            )}
          </Row>

          <div className="flex justify-center mt-2">
            <PrimaryBtn
              style={{ width: "auto" }}
              onClick={() => {
                const flattenedData = { ...userForm?.userDetails };
                user?._id
                  ? services?.userUpdate(flattenedData)
                  : services?.userSignUp();
              }}
              disabled={editAccount}
            >
              {user?._id ? "Update Details" : "Save Details"}
              {/* Save Details */}
            </PrimaryBtn>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UserRegisterForm;
