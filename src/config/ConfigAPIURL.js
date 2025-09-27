class ConfigAPIURL {
  static baseUrl =
    import.meta.env.VITE_REACT_APP_PayDefination_BaseUrl ||
    import.meta.env.VITE_REACT_APP_Dev_PayDefination_BaseUrl;

  //login
  static getReviews = this.baseUrl + "/user/review/all"; //get
  static getReviewsAgree = this.baseUrl + "/user/review/list/agree"; //get
  static createReview = this.baseUrl + "/user/create/review";
  static deleteReview = this.baseUrl + "/user/review/delete";
  static updateReview = this.baseUrl + "/user/review/update";

  //user
  static login = this.baseUrl + "/user/account/login";

  //QuickService]
  static CreateQuickServices = this.baseUrl + "/user/quick-service/create";
  static ListQuickServices = this.baseUrl + "/user/quick-service/all";
  static UpdateQuickServices = this.baseUrl + "/user/quick-service/update";
  static DeleteQuickServices = this.baseUrl + "/user/quick-service/delete";

  //ListContacts

  static ListContacts = this.baseUrl + "/user/contact/all";
  static CreateContact = this.baseUrl + "/user/contact";
  static DeleteContact = this.baseUrl + "/user/contact/delete";
  static UpdateContact = this.baseUrl + "/user/contact/update";

  //homeSection
  static UpdateHomeSectionMedia =
    this.baseUrl + "/user/update/home-section-media";
  static fetchSections = this.baseUrl + "/user/list/home-section-media";

  //homeMedia
  static uploadFile = this.baseUrl + "/user/upload/file";

// --- Logos ---
  static CreateLogo = this.baseUrl + "/user/create/logo";
  static ListLogos = this.baseUrl + "/user/logos/all";
  static GetLogoById =  this.baseUrl + "/user/logos/details";
  static UpdateLogo =  this.baseUrl + "/user/logos/update";
  static DeleteLogo = this.baseUrl + "/user/logos/delete";

  // --- PandBanters ---
  static CreateBanter = this.baseUrl + "/user/create/partners"; 
  static ListBanters = this.baseUrl + "/user/partners";             
  // static GetBanterById =  this.baseUrl = "/user/partners/details";
  static UpdateBanter =  this.baseUrl +"/user/partners/update";
  static DeleteBanter =  this.baseUrl +"/user/partners/delete";




}
export default ConfigAPIURL;
