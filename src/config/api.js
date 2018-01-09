 
const apiAddress = 'https://www.cn-abs.com';
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
  walbuckList: `${apiAddress}/moTrade/getwalbucketlist`,

}; 

export const Demo = {
  list: 'http://10.1.1.35/Demo/DemoProduct/getlist',
  detail: 'http://10.1.1.35/Demo/DemoProduct/getitem',
};
