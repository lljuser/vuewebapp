import axios from 'axios';

const apiAddress = process.env.API_ADDRESS;
export default apiAddress;

export const Market = {
  list: `${apiAddress}/momarket/productsummary`,
  chart: `${apiAddress}/momarket/getissuestatchartdata`,
};

export const Login = {
  login: `${apiAddress}/H5Account/Login`,
  // login: 'http://localhost:43400/H5Account/Login',
};

export const Product = {
  // {productTypeId?}/{dealTypeId?}/{currentStatusId?}/{direction?}/{lastId?}/{pageSize?}
  list: `${apiAddress}/modeal/getdeallist`,
  // /{dealId?}
  detail: `${apiAddress}/modeal/getdealfactory`,
  // /{dealId}/{resultId}
  chart: `${apiAddress}/modeal/NoteCashFlowSeries`,
};

export const Trade = {
  // /{ratingId?}/{couponId?}/{walId?}/{lastId?}/{pageSize?}/{direction?}
  list: `${apiAddress}/motrade/gettradelist`,
  // /{tradeId}/{noteId}/{tradeType}
  detail: `${apiAddress}//motrade/gettradedata`,
  typeList: `${apiAddress}/motrade/getsecuritytypelist`,
  walbuckList: `${apiAddress}/moTrade/getwalbucketlist`,
  ratingList: `${apiAddress}/motrade/getratinglist`,
  couponList: `${apiAddress}/motrade/getcouponlist`,
};

export const Security = {
  // /{year?}/{dealTypeId?}/{trancheId?}/{direction?}/{lastId?}/{pageSize?}
  list: `${apiAddress}/MoNote/GetNoteList`,
  // /{noteId?}
  detail: `${apiAddress}/MoNote/GetNoteFactory`,
  structure: `${apiAddress}/MoNote/GetDealStructure`,
};

export const Organ = {
  // /{typeId?}/{roleId?}/{direction?}/{lastId?}/{pageSize?}
  list: `${apiAddress}/MoOrganization/GetOrganizationList`,
  dealList: `${apiAddress}/MoOrganization/GetDealList`,
  expertList: `${apiAddress}/MoOrganization/GetOrganizationRelateProfessorList`,
  articleList: `${apiAddress}/MoOrganization/GetOrganizationArticleList`,
  followList: `${apiAddress}/MoOrganization/ChangeUserFollow`,
  detail: `${apiAddress}/MoOrganization/GetOragnizationData`,
};

export const Expert = {
  // 获取专家编辑页面数据
  getExpert: `${apiAddress}/ExpertInfo/GetExpert`,
  // 获取专家展示页面数据
  getExpertDisplay: `${apiAddress}/ExpertInfo/GetExpertDisplay`,
  // 获取所有ABS项目经历
  getAbsProjects: `${apiAddress}/ExpertInfo/GetAbsProjects`,
  // 获取单个Abs项目经历
  getAbsProject: `${apiAddress}/ExpertInfo/GetAbsProject`,
  // 取消ABS项目经历点赞
  deleteAbsProjectEndorse: `${apiAddress}/ExpertInfo/DeleteAbsProjectEndorse`,
  // 点赞ABS项目经历
  addAbsProjectEndorse: `${apiAddress}/ExpertInfo/AddAbsProjectEndorse`,
  // 获取所有的其它项目经历
  getOtherProjects: `${apiAddress}/ExpertInfo/GetOtherProjects`,
  // 取消其它项目经历点赞
  deleteOtherProjectEndorse: `${apiAddress}/ExpertInfo/DeleteOtherProjectEndorse`,
  // 点赞其它项目经历
  addOtherProjectEndorse: `${apiAddress}/ExpertInfo/AddOtherProjectEndorse`,
  // 获取著作与文章
  getPublishs: `${apiAddress}/ExpertInfo/GetPublishs`,
  // 取消著作与文章点赞
  deletePublishEndorse: `${apiAddress}/ExpertInfo/DeletePublishEndorse`,
  // 点赞著作与文章
  addPublishEndorse: `${apiAddress}/ExpertInfo/AddPublishEndorse`,
  // 获取近期活动
  getRecentActivities: `${apiAddress}/ExpertInfo/GetRecentActivities`,
  // 获取编辑页面的其它项目经历
  getOtherProjectsByEditing: `${apiAddress}/ExpertInfo/GetOtherProjectsByEditing`,
  // 获取机构角色及个人自责
  getOrganizationRolesAndResponsibilitiesAndDealTypes: `${apiAddress}/ExpertInfo/GetOrganizationRolesAndResponsibilitiesAndDealTypes`,
  // 获取单个其它项目经历
  getOtherProject: `${apiAddress}/ExpertInfo/GetOtherProject`,
  // 删除其它项目经历
  deleteOtherProject: `${apiAddress}/ExpertInfo/DeleteOtherProject`,
  // 添加其它项目经历
  addOtherProject: `${apiAddress}/ExpertInfo/AddOtherProject`,
  // 更新其它项目经历
  updateOtherProject: `${apiAddress}/ExpertInfo/UpdateOtherProject`,
  // 获取单个其它职务
  getOtherPost: `${apiAddress}/ExpertInfo/GetOtherPost`,
  // 删除单个其它职务
  deleteOtherPost: `${apiAddress}/ExpertInfo/DeleteOtherPost`,
  // 添加单个其它职务
  addOtherPost: `${apiAddress}/ExpertInfo/AddOtherPost`,
  // 更新单个其它职务
  updateOtherPost: `${apiAddress}/ExpertInfo/UpdateOtherPost`,
  // 获取单个最近活动
  getRecentActivity: `${apiAddress}/ExpertInfo/GetRecentActivity`,
  // 删除单个近期活动
  deleteRecentActivity: `${apiAddress}/ExpertInfo/DeleteRecentActivity`,
  // 添加单个近期活动
  addRecentActivity: `${apiAddress}/ExpertInfo/AddRecentActivity`,
  // 更新单个近期活动
  updateRecentActivity: `${apiAddress}/ExpertInfo/UpdateRecentActivity`,
  // 获取单个奖项与荣誉
  getHonorAward: `${apiAddress}/ExpertInfo/GetHonorAward`,
  // 删除单个奖项与荣誉
  deleteHonorAward: `${apiAddress}/ExpertInfo/DeleteHonorAward`,
  // 添加单个奖项与荣誉
  addHonorAward: `${apiAddress}/ExpertInfo/AddHonorAward`,
  // 更新单个奖项与荣誉
  updateHonorAward: `${apiAddress}/ExpertInfo/UpdateHonorAward`,
  // 获取单个著作与文章
  getPublish: `${apiAddress}/ExpertInfo/GetPublish`,
  // 删除单个著作与文章
  deletePublish: `${apiAddress}/ExpertInfo/DeletePublish`,
  // 获取上传文件Url
  getUploadFileUrl: `${apiAddress}/ExpertInfo/GetUploadFileUrl`,
  // 添加单个著作与文章
  addPublish: `${apiAddress}/ExpertInfo/AddPublish`,
  // 更新单个著作与文章
  updatePublish: `${apiAddress}/ExpertInfo/UpdatePublish`,
  // 获取编辑页面的所有著作
  getPublishsByEditing: `${apiAddress}/ExpertInfo/GetPublishsByEditing`,
  // 获取单个教育经历
  getEducation: `${apiAddress}/ExpertInfo/GetEducation`,
  // 删除单个教育经历
  deleteEducation: `${apiAddress}/ExpertInfo/DeleteEducation`,
  // 添加单个教育经历
  addEducation: `${apiAddress}/ExpertInfo/AddEducation`,
  // 更新单个教育经历
  updateEducation: `${apiAddress}/ExpertInfo/UpdateEducation`,
  // 获取个人简介
  getPersonalProfile: `${apiAddress}/ExpertInfo/GetPersonalProfile`,
  // 更新个人简介
  updatePersonalProfile: `${apiAddress}/ExpertInfo/UpdatePersonalProfile`,
  // 获取用户基本信息
  getUserBasicInfo: `${apiAddress}/ExpertInfo/GetUserBasicInfo`,
  // 获取单个工作经历
  getWorkHistory: `${apiAddress}/ExpertInfo/GetWorkHistory`,
  // 删除单个工作经历
  deleteWorkHistory: `${apiAddress}/ExpertInfo/DeleteWorkHistory`,
  // 添加单个工作经历
  addWorkHistory: `${apiAddress}/ExpertInfo/AddWorkHistory`,
  // 更新单个工作经历
  updateWorkHistory: `${apiAddress}/ExpertInfo/UpdateWorkHistory`,
  // 机构自动检索
  orgSearch: `${apiAddress}/Search/OrganizationSearch`,
  // ABS产品自动检索
  dealSearch: `${apiAddress}/Search/AbsDealSearch`,
  // 获取Abs项目经历机构角色以及个人职责
  getOrganizationRolesAndResponsibilities: `${apiAddress}/ExpertInfo/GetOrganizationRolesAndResponsibilities`,
  // 添加单个Abs项目经历
  addAbsProject: `${apiAddress}/ExpertInfo/AddAbsProject`,
  // 更新单个Abs项目经历
  updateAbsProject: `${apiAddress}/ExpertInfo/UpdateAbsProject`,
  // 删除单个Abs项目经历
  deleteAbsProject: `${apiAddress}/ExpertInfo/DeleteAbsProject`,
  // 获取编辑页面的所有abs项目经历
  getAbsProjectsByEditing: `${apiAddress}/ExpertInfo/GetAbsProjectsByEditing`,
  // 更新个人资料
  updateUserBasicInfo: `${apiAddress}/ExpertInfo/UpdateUserBasicInfo`,
  // 图片上传接口
  uploadImgUrl: `${apiAddress}/filestore/common/uploaddata/cnabs/`,
  // 著作发送至邮箱Url
  sendPublishUrl: `${apiAddress}/AppDeal/SendPublish`,
};

export const Demo = {
  list: 'http://10.1.1.35/Demo/DemoProduct/getlist',
  detail: 'http://10.1.1.35/Demo/DemoProduct/getitem',
};

// 调用webAPI前进行登录状态检查
function checkLoginStatus() {
  setTimeout(() => {
    if (!new RegExp(/login/i).test(location.href)) {
      axios.post(Market.list).then((response) => {
        // console.log(response);
        if (!response.data.data && !new RegExp(/login/i).test(location.href)) {
          if (response.data.indexOf('正在授权') > 0) {
            location.href = 'login.html';
          }
        }
      });
      // .catch((error) => {
      //   // console.log(error);
      //   // location.href = 'login.html';
      // });
    }
  }, 100);
}
checkLoginStatus();
