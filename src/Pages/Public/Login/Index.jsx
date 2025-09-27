import { Input, Button, Card, Form } from "antd";
import logoImage from "../../../assets/Images/loginLogo.png";
import logoImage1 from "../../../assets/Images/LoginImage1.png";
import logoImage2 from "../../../assets/Images/LoginImage2.png";
import logoImage3 from "../../../assets/Images/LoginImage3.png";
import OTPField from "./Components/OTP";
import MobileNoModal from "./Components/MobileNoModal";
import useServices from "./hooks/useServices";
import Text from "../../../Components/Typography/Typography";

const LoginPage = () => {
  const services = useServices();

  console.log(services?.errors);
  return (
    <>
      <div className="h-screen relative">
        {/* Top yellow section */}
        <div className="bg-yellow-400 h-1/2 w-full flex flex-col items-center justify-center">
          <img
            src={logoImage}
            alt="Logo"
            className="h-10 bg-white p-2 rounded-xl"
          />
          <p className="text-white font-bold text-lg mb-0">
            Login to your Account
          </p>
          {/* <p className="text-white text-sm mb-12">
            
          </p> */}
          <Text className="text-white max-sm:mb-24 md:mb-28  mb-12">
            Enter your details to access your account
          </Text>
        </div>

        {/* Bottom white section */}
        <div className="bg-white h-1/2 w-full flex flex-wrap items-end justify-center gap-4  sm:justify-between md:justify-between">
          <img
            src={logoImage1}
            alt="Doctor 1"
            className="h-32 sm:h-32 md:h-40 w-auto"
          />
          <img
            src={logoImage2}
            alt="Doctor 2"
            className="hidden sm:block h-24 sm:h-32 md:h-40 w-auto"
          />
          <img
            src={logoImage3}
            alt="Doctor 3"
            className="hidden md:block h-24 sm:h-32 md:h-40 w-auto"
          />
        </div>

        {/* Centered Card overlapping both */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {!services?.otpTrue ? (
            <MobileNoModal services={services} />
          ) : (
            <OTPField services={services} />
          )}

          {/* <OTPField /> */}
        </div>
      </div>
    </>
  );
};
export default LoginPage;
