
const apiAddress = 'http://10.1.1.35';
export default apiAddress;

export const Market = {
  list: `${apiAddress}/momarket/productsummary`,
  chart: `${apiAddress}/momarket/getissuestatchartdata`,
};

export const Product = {
  // {productTypeId?}/{dealTypeId?}/{currentStatusId?}/{direction?}/{lastId?}/{pageSize?}
  list: `${apiAddress}/modeal/getdeallist`,
  // /{dealId?}
  detail: `${apiAddress}/modeal/getdealfactory`,
  // /{dealId}/{resultId}
  chart: `${apiAddress}/modeal/getnotecashflowchartdata`,
  //
};

export const Trade = {
  // /{ratingId?}/{securityTypeId?}/{walId?}/{lastId?}/{pageSize?}/{direction?}
  list: `${apiAddress}/motrade/gettradelist`,
  // /{tradeId}/{noteId}/{tradeType}
  detail: `${apiAddress}//motrade/gettradedata`,
  typeList: `${apiAddress}/motrade/getsecuritytypelist`,
  walbuckList: `${apiAddress}/motrade/getwalbucketlist`,
  ratingList: `${apiAddress}/motrade/getratinglist`,
};

export const Expert = {
  getExpertDisplay: `${apiAddress}/ExpertInfo/GetExpertDisplay`,
  // 获取ABS项目经历
  getAbsProjects: `${apiAddress}/ExpertInfo/GetAbsProjects`,
  // 取消ABS项目经历点赞
  deleteAbsProjectEndorse: `${apiAddress}/ExpertInfo/DeleteAbsProjectEndorse`,
  // 点赞ABS项目经历
  addAbsProjectEndorse: `${apiAddress}/ExpertInfo/AddAbsProjectEndorse`,
  // 获取其它项目经历
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
};

export const Demo = {
  list: 'http://10.1.1.35/Demo/DemoProduct/getlist',
  detail: 'http://10.1.1.35/Demo/DemoProduct/getitem',
};
