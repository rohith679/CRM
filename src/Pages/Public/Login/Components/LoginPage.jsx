import React, { useRef, useState } from "react";
import Text from "../../../../Components/Typography/Typography";
import { Form, Image, Input } from "antd";
import loginlogo from "../../../../assets/Images/loginLogo.png";
import PrimaryBtn from "../../../../Components/Button/Index";
import useServices from "../hooks/useServices";
import OTPField from "./OTP";
import { LoadingOutlined } from "@ant-design/icons";
import UserRegisterForm from "./RegisterForm";

const UserLoginPage = () => {
  const services = useServices();
  const isMobileValid = services.mobileNo?.length === 10;

  const inputsRef = useRef([]);
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Only digits

    if (value) {
      const updatedOtp = [...otpArray];
      updatedOtp[index] = value;
      setOtpArray(updatedOtp);

      // Combine and set the OTP
      services.setOTP(updatedOtp.join(""));
      if (index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const updatedOtp = [...otpArray];

      if (otpArray[index]) {
        updatedOtp[index] = "";
        setOtpArray(updatedOtp);
        services.setOTP(updatedOtp.join(""));
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
    if (e.key === "Enter") {
      const otp = otpArray.join("");
      if (otp.length === 6 && !otpArray.includes("")) {
        services.verifyOTP();
      }
    }
  };
  return (
    <>
      {services?.register ? (
        <UserRegisterForm />
      ) : (
        <div className="p-4">
          <div className="flex justify-center">
            {" "}
            <img
              src={loginlogo}
              alt="Login Logo"
              className="w-[50px] h-[50px] object-contain"
            />
          </div>
          <div className="my-3">
            <Text type="subtitle" className="text-center">
              {!services?.otpTrue
                ? " Enter your details to access your account"
                : "Verification Code"}
            </Text>
            {services?.otpTrue && (
              <Text type="body" className=" text-center">
                Enter your OTP sent to {services?.mobileNo} {"  "}
                <span
                  className="text-secondary underline cursor-pointer"
                  onClick={() => services?.setOtpTrue(false)}
                >
                  Edit
                </span>
              </Text>
            )}
          </div>
          {!services?.otpTrue ? (
            <div>
              <Text type="subtitle">Mobile No</Text>
              <Form.Item
                style={{ marginBottom: 12 }}
                validateStatus={
                  services.mobileNo && !isMobileValid ? "error" : ""
                }
                help={
                  services.mobileNo && !isMobileValid
                    ? "Mobile No should be 10 digits"
                    : ""
                }
              >
                <Input
                  addonBefore="+91"
                  size="large"
                  placeholder="Enter Mobile Number"
                  value={services.mobileNo}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    const truncatedValue = value.slice(0, 10);
                    services.setMobileNo(truncatedValue);
                    if (services.errors?.mobileNo) {
                      services.setErrors((prev) => ({
                        ...prev,
                        mobileNo: "",
                      }));
                    }
                  }}
                />
              </Form.Item>

              <div className="flex justify-center">
                <PrimaryBtn
                  style={{ width: "auto" }}
                  onClick={() => services.onAccountLogin("user")}
                  disabled={!isMobileValid}
                >
                  Continue
                </PrimaryBtn>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium mb-2">OTP</p>
              <div className="flex gap-2 justify-center mb-3">
                {[...Array(6)].map((_, index) => (
                  <Input
                    key={index}
                    maxLength={1}
                    className="w-full h-10 rounded-md text-center border border-gray-300"
                    ref={(el) => (inputsRef.current[index] = el)}
                    value={otpArray[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                ))}
              </div>
              <PrimaryBtn
                variant="primary"
                onClick={() => services?.verifyOTP()}
              >
                {services?.isLoading ? <LoadingOutlined /> : "Verify"}
              </PrimaryBtn>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default UserLoginPage;
