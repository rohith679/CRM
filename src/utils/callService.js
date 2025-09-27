import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZEGO_CONFIG } from "../config/zegoConfig";

// Generate random ID for users
export const randomID = (len = 5) => {
  let result = "";
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
};

// Generate Kit Token
export const generateKitToken = (roomID, userID, userName) => {
  return ZegoUIKitPrebuilt.generateKitTokenForTest(
    ZEGO_CONFIG.appID,
    ZEGO_CONFIG.serverSecret,
    roomID,
    userID,
    userName
  );
};

// Initialize and join call
export const joinCall = (
  containerElement,
  roomID,
  userID,
  userName,
  onLeave
) => {
  const kitToken = generateKitToken(roomID, userID, userName);
  const zp = ZegoUIKitPrebuilt.create(kitToken);

  zp.joinRoom({
    container: containerElement,
    scenario: {
      mode: ZegoUIKitPrebuilt.VideoConference,
    },
    showPreJoinView: false, // Skip pre-join screen
    showLeavingView: false, // Skip leaving confirmation
    onLeaveRoom: () => {
      if (onLeave) onLeave();
    },
  });

  return zp;
};
