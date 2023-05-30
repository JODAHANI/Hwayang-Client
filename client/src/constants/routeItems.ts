// **라우트랑 텍스트는 구분해서 관리.

export const hwayangClientServer = `https://port-0-hwayang-client-server-7e6o2clhv5snco.sel4.cloudtype.app/api/users`;
// export const hwayangClientServer = `/api/users`;

export const hwayangImageUrl = `https://port-0-hwayang-client-server-7e6o2clhv5snco.sel4.cloudtype.app`;

export const hwayangAdminServer = `https://port-0-admin-server-7e6o2clhv5snco.sel4.cloudtype.app/api/admin`;

export const hwayangAdminApi = `https://port-0-admin-server-7e6o2clhv5snco.sel4.cloudtype.app/api/admin/api/admin`;

export const Routes = {
  home: `/`,
  getWorship: `${hwayangAdminApi}/worship-management`,
  postWorship: `${hwayangAdminApi}/worship-apply`,
  worshipCancel: `${hwayangAdminApi}/worship-result/cancel`,
  worshipApply: `/worship-apply`,
  worshipResult: `/worship-result`,
  onlineWorship: `/online-worship`,
  worshipGuide: `/worship-guide`,
  userSubtract: `${hwayangAdminApi}/worship-result/subtract`,

  quietTime: `/quiet-time`,
  login: `/login`,
  signUp: `/sign-up`,
  prayRequest: `/pray-request`,
  prayRequestDetail: `/pray-request/:id`,
  graceSharing: `/grace-sharing`,
  graceSharingWrite: `/grace-sharing/write`,
  graceSharingDetail: `/grace-sharing/:id`,
  graceSharingDelete: `${hwayangClientServer}/grace-sharing/delete`,
  graceImageSave: `/grace-sharing/write/image-save`,
  logout: `/logout`,
  myPage: `/my-page`,
  thanksLetter: `/thanks-letter`,
  thanksLetterWrite: `/thanks-letter/write`,
  thanksLetterDetail: `/thanks-letter/:id`,
  thanksLetterEdit: `/thanks-letter/edit/:id`,
  proclamation: `/proclamation`,
  newFamily: `/new-family`,
  newFamilyDetail: `/new-family/:id`,
  notificationDetail: `/notification/:id`,
};

export const RoutesText = {
  homeText: `홈`,
  worshipApplyText: `예배신청`,
  worshipResultText: `신청현황 / 취소`,
  onlineWorshipText: `온라인 예배`,
  worshipGuideText: `예배안내`,
  quietTimeText: `큐티하기`,
  loginText: `로그인`,
  signUpText: `회원가입`,
  prayRequestText: `기도요청`,
  graceSharingText: `은혜공유`,
  logoutText: `로그아웃`,
  myPageText: `내정보`,
  thanksLetterText: `감사편지`,
  proclamationText: `말씀선포`,
  newFamilyText: `새가족 소개`,
};

export const RoutesIcon = {
  worshipApplyIcon: `👑`,
  worshipResultIcon: `📌`,
  newFamilyIcon: `🎉`,
  onlineWorshipIcon: `👩🏼‍💻`,
  quietTimeIcon: `🔥`,
  prayRequestIcon: `🙏🏻`,
  thanksLetterIcon: `💌`,
  graceSharingIcon: `🧡`,
  proclamationIcon: `🥇`,
  worshipGuideIcon: `💎`,
};

export const RoutesImgUrl = {
  prayerRequestImg: `img/subNav/prayingHands.png`,
  thanksLetterImg: `img/subNav/letter.png`,
  proclamationImg: `img/subNav/speak.png`,
  graceSharingImg: `img/subNav/share.png`,
};
