import { Card, Input } from "antd";
import { useRef, useState } from "react";
import PrimaryBtn from "../../../../Components/Button/Index";
import { LoadingOutlined } from "@ant-design/icons";

const OTPField = ({ services }) => {
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
    <div className="max-sm:px-2">
      <Card className="rounded-lg w-80 max-sm:w-72 p-1 shadow-[4px_4px_16px_0px_#00000014]">
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
        <PrimaryBtn variant="primary" onClick={() => services?.verifyOTP()}>
          {services?.isLoading ? <LoadingOutlined /> : "Verify"}
        </PrimaryBtn>
      </Card>
    </div>
  );
};

export default OTPField;
