import { useDispatch, useSelector } from "react-redux";
// import useServices from "../../Pages/PrivateRouting/Subscriptions/hooks/useServices";
import { useEffect, useState } from "react";
import useServices from "../Pages/PrivateRouting/Subscriptions/hooks/useServices";
// import { setIsExpired } from "../../Redux/subscriptionModal";

const useIsPlanExpired = () => {
  const dispatch = useDispatch();
  const [expired, setExpired] = useState(false);
  const services = useServices();
  const user = useSelector((state) => state.auth.user);

  const checkExpiration = async () => {
    const expireAt = await services.getCurrentPlan();
    const currentTime = Date.now();
    const isExpired = expireAt && new Date(expireAt).getTime() < currentTime;
    setExpired(isExpired);
    // dispatch(setIsExpired(isExpired)); // optional
    return isExpired;
  };

  // Automatically check only once when component mounts
  useEffect(() => {
    if (user?.userType === "doctor") {
      checkExpiration();
    }
  }, [user?.userType]);

  return { expired, checkExpiration };
};

export default useIsPlanExpired;
