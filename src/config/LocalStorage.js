class LocalStorage {
  //Base URL For Live & Staging
  static theme = "dark";
  static lng = {
    displayName: "English (India /en_IN)",
    code: "en_IN",
  };
  static shopId = "";
  static shopName = "";
  static logo = "";

  static adminButtonPermission = [];
  static maintenanceOptions = [];
  static adminSideMenuWithRoleID = {};
  static userLoggedIn = false;
  static userDetails = {
    permission: [],
    profileImage: "",
    userName: "",
    email: "",
    mobileNo: "",
  };
  static paymentEnvironment = "";
  static userPermission = [];
}

export default LocalStorage;
