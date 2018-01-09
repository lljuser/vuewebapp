<template>
    <div class="editProfileContent" id="editProfileContent" v-cloak>
        <section class="ep_part" id="basicInformation">
            <header class="ep_part_title ep_part_item_border">
                <img class="ep_icon fl" src="../../public/images/person.png" />
                <span class='fl'>基本信息</span>
                <router-link to="BasicInfomation">
                    <img class="fr editPencils" src="../../public/images/pencils.png" alt="">
                </router-link>
            </header>
            <div class="ep_part_item ep_part_item_border">
                <span class='fl ep_font32 ep_color_grey'>头像</span>
                <div class="divUserAvatar fr">
                    <img v-bind:src="userInfo.User && userInfo.User.Avatar" alt="用户头像">
                </div>
            </div>
            <div class="ep_part_item ep_part_item_border">
                <span class='fl ep_font32 ep_color_grey'>姓名</span>
                <span class=" fr ep_font32 ep_marginLeft15 ep_align_right ep_width200 ep_ellipsis">{{userInfo.User && userInfo.User.Name}}</span>
            </div>
            <div class="ep_part_item ep_part_item_border">
                <span class='fl ep_font32 ep_color_grey'>公司</span>
                <span class="fr ep_font32 ep_marginLeft15 ep_align_right ep_width460 ep_ellipsis">{{userInfo.User && userInfo.User.Company}}</span>
            </div>
            <div class="ep_part_item ep_part_item_border">
                <span class='fl ep_font32 ep_color_grey'>手机号</span>
                <span class="fr ep_font32 ep_marginLeft15 ep_align_right">{{userInfo.User && userInfo.User.Cellphone}}</span>
            </div>
            <div class="ep_part_item ep_part_item_border">
                <span class='fl ep_font32 ep_color_grey'>邮箱</span>
                <span class="fr ep_font32 ep_marginLeft15 ep_align_right">{{userInfo.User && userInfo.User.Email}}</span>
            </div>
        </section>
        <section class="ep_part" id="projectHistoryABS">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.ABSProjects)?'':'ep_part_item_border']">
                <img class="ep_icon fl" src="../../public/images/projectHistory.png" />
                <span class='fl'>ABS项目经历</span>
                <span class="fl ep_marginLeft15 ep_font28 ep_overhide" v-if="!isArrayEmpty(userInfo.ABSProjects)">
                    <span class="ep_color_grey2 fl">(共</span>
                    <span class="ep_color_yellow fl">{{projectHistoriesSummary.totalCount>9999?'9999+':projectHistoriesSummary.totalCount}}</span>
                    <span class="ep_color_grey2 fl">单，</span>
                    <span class="ep_color_yellow fl">{{projectHistoriesSummary.totalOffering.toFixed(2)>9999?'9999+':projectHistoriesSummary.totalOffering.toFixed(2)}}</span>
                    <span class="ep_color_grey2 fl">亿)</span>
                </span>  
                <a class="fr" href="/expert/expertuser/projectHistoryABS">
                    <img class="addBtn" src="../../public/images/add.png" />
                </a>
            </header>
            <div v-if="!isArrayEmpty(userInfo.ABSProjects)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in _.take(userInfo.ABSProjects,3)">
                    <div class="ep_overhide">
                        <a class="ep_font32 ep_ellipsis fl ep_width600 ep_color_yellow" v-bind:href="'/expert/expertuser/projectABSDetails?dealId=' + item.DealId">{{item.DealName}}</a>
                        <router-link to="/AbsHistory" class="ep_font24 ep_color_orange fr ep_lineHeight32">
                            编辑
                        </router-link>
                        <!-- <a class="ep_font24 ep_color_orange fr ep_lineHeight32" v-bind:href="'/expert/expertuser/projectHistoryABS?id=' + item.Id">编辑</a> -->

                    </div>
                    <table class="projectHistoryABSList ep_font28 ep_marginTop10">
                        <tr>
                            <td class="ep_ellipsis ep_paddingright30">{{item.DealType}}</td>
                            <td class="ep_ellipsis ep_paddingright30">{{item.TotalOffering.toFixed(2)}}亿元</td>
                        </tr>
                        <tr>
                            <td>{{item.PersonalResponsibility.Name}}</td>
                            <td colspan="2">{{splicingOrganizationRoles(item.OrganizationRoles)}}</td>
                        </tr>
                    </table>
                </div>
                <div class="ep_font30 ep_align_center ep_padding30" v-if="userInfo.ABSProjects.length > 3">
                    <a href="/expert/expertuser/projectHistoryABSList">查看更多</a>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.ABSProjects)">暂无ABS项目经历</p>
        </section>
        <section class="ep_part" id="projectHistoryOther">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.OtherProjects)?'':'ep_part_item_border']">
                <img class="ep_icon fl" src="../../public/images/projectHistory.png" />
                <span class='fl'>其它项目经历</span>
                <span class="fl ep_marginLeft15 ep_font28 ep_overhide" v-if="!isArrayEmpty(userInfo.OtherProjects)">
                    <span class="ep_color_grey2 fl">(共</span>
                    <span class="ep_color_yellow fl">{{otherProjectHistoriesSummary.totalCount>9999?'9999+':otherProjectHistoriesSummary.totalCount}}</span>
                    <span class="ep_color_grey2 fl">单，</span>
                    <span class="ep_color_yellow fl">{{otherProjectHistoriesSummary.totalOffering.toFixed(2)>9999?'9999+':otherProjectHistoriesSummary.totalOffering.toFixed(2)}}</span>
                    <span class="ep_color_grey2 fl">亿)</span>
                </span> 
                <a class="fr" href="/expert/expertuser/projectHistoryOther">
                    <img class="addBtn" src="../../public/images/add.png" />
                </a>
            </header>
            <div v-if="!isArrayEmpty(userInfo.OtherProjects)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in _.take(userInfo.OtherProjects,3)">
                    <div class="ep_overhide">
                        <span class="ep_font32 fl ep_width600">{{item.ProjectName}}</span>
                        <a class="ep_font24 ep_color_orange fr ep_lineHeight32" v-bind:href="'/expert/expertuser/projectHistoryOther?id=' + item.Id">编辑</a>
                    </div>
                    <table class="projectHistoryABSList ep_font28 ep_marginTop10">
                        <tr>
                            <td class="ep_ellipsis">{{item.DealType}}</td>
                            <td class="ep_ellipsis">{{item.TotalOffering.toFixed(2)}}亿元</td>
                            <td class="ep_ellipsis">{{item.ProjectShortName}}</td>
                            <td class="ep_ellipsis">{{item.Nation}}</td>
                        </tr>
                        <tr>
                            <td>{{item.PersonalResponsibility.Name}}</td>
                            <td colspan="3">{{splicingOrganizationRoles(item.OrganizationRoles)}}</td>
                        </tr>
                    </table>
                </div>
                <div class="ep_font30 ep_align_center ep_padding30" v-if="userInfo.OtherProjects.length>3">
                    <a href="/expert/expertuser/projectHistoryOtherList">查看更多</a>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.OtherProjects)">暂无其它项目经历</p>
        </section>
        <section class="ep_part" id="workHistory">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.WorkHistories)?'':'ep_part_item_border']">
                <img class="ep_icon fl" src="../../public/images/workHistory.png" />
                <span class='fl'>工作经历</span>
                <a class="fr" href="/expert/expertuser/workHistory">
                    <img class="addBtn" src="../../public/images/add.png" />
                </a>
            </header>
            <div v-if="!isArrayEmpty(userInfo.WorkHistories)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in userInfo.WorkHistories">
                    <div class="ep_overhide">
                        <span class="ep_font32 ep_ellipsis fl ep_width600">{{item.Position}}</span>
                        <a v-bind:href="'/expert/expertuser/workHistory?id=' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32">编辑</a>
                    </div>
                    <div class="ep_font28 ep_color_grey2 ep_marginTop10 ep_overhide">
                        <span class="fl ep_maxWidth400 ep_ellipsis">{{item.Company}}</span>
                        <span class="fl ep_marginLeft24 ep_width250 ep_ellipsis">{{item.Department}}</span>
                    </div>
                    <div class="ep_font28 ep_color_grey2 ep_marginTop10">
                        <span>{{item.StartTime}}</span>
                        <span>-</span>
                        <span>{{item.EndTime}}</span>
                    </div>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.WorkHistories)">暂无工作经历</p>
        </section>
        <section class="ep_part" id="otherPosition">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.OtherPosts)?'':'ep_part_item_border']">
                <img class="ep_icon fl" src="../../public/images/position.png" />
                <span class='fl'>其它职务</span>
                <a class="fr" href="/expert/expertuser/otherPosition">
                    <img class="addBtn" src="../../public/images/add.png" />
                </a>
            </header>
            <div v-if="!isArrayEmpty(userInfo.OtherPosts)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in userInfo.OtherPosts">
                    <div class="ep_overhide">
                        <span class="ep_font32 ep_ellipsis fl ep_width600">{{item.Name}}</span>
                        <a v-bind:href="'/expert/expertuser/otherPosition?id=' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32">编辑</a>
                    </div>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.OtherPosts)">暂无其它职务</p>
        </section>
        <section class="ep_part" id="awardsAndHonors">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.HonorAwards)?'':'ep_part_item_border']">
                <img class="ep_icon fl" src="../../public/images/honor.png" />
                <span class='fl'>奖项与荣誉</span>
                <a class="fr" href="/expert/expertuser/awardsAndHonors">
                    <img class="addBtn" src="../../public/images/add.png" />
                </a>
            </header>
            <div v-if="!isArrayEmpty(userInfo.HonorAwards)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in userInfo.HonorAwards">
                    <div class="ep_overhide">
                        <span class="ep_font32 ep_ellipsis fl ep_width460">{{item.Name}}</span>
                        <a v-bind:href="'/expert/expertuser/awardsAndHonors?id=' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32 ep_marginLeft30">编辑</a>
                        <span class="ep_font28 ep_ellipsis fr ep_color_grey2 ep_lineHeight32 ep_align_right ep_marginLeft15">{{item.Year}}</span>
                    </div>
                    <pre class="ep_decription ep_color_grey2 ep_font28">{{item.Description}}</pre>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.HonorAwards)">暂无奖项与荣誉</p>
        </section>
        <section class="ep_part" id="activity">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.RecentActivities)?'':'ep_part_item_border']">
                <img class="ep_icon fl" src="../../public/images/activity.png" />
                <span class='fl'>近期活动</span>
                <a class="fr" href="/expert/expertuser/activity">
                    <img class="addBtn" src="../../public/images/add.png" />
                </a>
            </header>
            <div v-if="!isArrayEmpty(userInfo.RecentActivities)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in _.take(userInfo.RecentActivities,3)">
                    <div class="ep_overhide">
                        <span class="ep_font32 ep_ellipsis fl ep_width460">{{item.Name}}</span>
                        <a v-bind:href="'/expert/expertuser/activity?id=' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32 ep_marginLeft30">编辑</a>
                        <span class="ep_font28 ep_ellipsis fr ep_color_grey2 ep_lineHeight32 ep_align_right ep_marginLeft15">{{item.ActivityTime}}</span>
                    </div>
                    <pre class="ep_decription ep_color_grey2 ep_font28">{{item.Description}}</pre>
                </div>
                <div class="ep_font30 ep_align_center ep_padding30" v-if="userInfo.RecentActivities.length > 3">
                    <a href="/expert/expertuser/recentActivitiesList">查看更多</a>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.RecentActivities)">暂无近期活动</p>
        </section>
        <section class="ep_part" id="article">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.Publishs)?'':'ep_part_item_border']">
                <img class="ep_icon fl" src="../../public/images/article.png" />
                <span class='fl'>著作与文章</span>
                <a class="fr" href="/expert/expertuser/article">
                    <img class="addBtn" src="../../public/images/add.png" />
                </a>
            </header>
            <div v-if="!isArrayEmpty(userInfo.Publishs)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in _.take(userInfo.Publishs,3)">
                    <div class="ep_overhide">
                        <span class="fl ep_font32">《</span>
                        <span class="ep_font32 ep_ellipsis fl ep_maxWidth460">{{item.Name}}</span>
                        <span class="fl ep_font32">》</span>
                        <a v-bind:href="'/expert/expertuser/article?id=' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32 ep_marginLeft30">编辑</a>
                    </div>
                    <div class="divArticleDetail">
                        <ul class="ep_color_grey2 ep_font28 ep_decription articleDetail">
                            <li>
                                <span>作者：</span>
                                <span class="ep_ellipsis">{{item.Author}}</span>
                            </li>
                            <li v-if="isValidElement(item.Publisher)">
                                <span>出版社：</span>
                                <span class="ep_ellipsis">{{item.Publisher}}</span>
                            </li>
                            <li v-if="isValidElement(item.PublishTime)">
                                <span>出版时间：</span>
                                <span class="ep_ellipsis">{{isValidElement(item.PublishTime) ? item.PublishTime + '年' : ''}}</span>
                            </li>
                            <li v-if="isValidElement(item.Isbn)">
                                <span>书号ISBN：</span>
                                <span class="ep_ellipsis">{{item.Isbn}}</span>
                            </li>
                            <li v-if="isValidElement(item.Pages)">
                                <span>页数：</span>
                                <span class="ep_ellipsis">{{item.Pages}}</span>
                            </li>
                            <li v-if="isValidElement(item.Link)">
                                <span>作品网址：</span>
                                <a class="fl ep_ellipsis ep_width300 ep_color_blue ep_Link" v-bind:href="item.Link">{{item.Link}}</a>
                            </li>
                            <li v-show="isValidElement(item.AttachmentFileCode)">
                                <span>作品文件：</span>
                                <div class="fl">《</div>
                                <span class="fl ep_ellipsis">{{item.Name}}</span>
                                <div class="fl">》</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="ep_font30 ep_align_center ep_padding30" v-if="userInfo.Publishs.length > 3">
                    <a href="/expert/expertuser/articleList">查看更多</a>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.Publishs)">暂无著作与文章</p>
        </section>
        <section class="ep_part" id="educationHistory">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.Educations)?'':'ep_part_item_border']">
                <img class="ep_icon fl" src="../../public/images/education.png" />
                <span class='fl'>教育经历</span>
                <a class="fr" href="/expert/expertuser/educationHistory">
                    <img class="addBtn" src="../../public/images/add.png" />
                </a>
            </header>
            <div v-if="!isArrayEmpty(userInfo.Educations)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in userInfo.Educations">
                    <div class="ep_overhide">
                        <span class="ep_font32 ep_ellipsis fl ep_width400">{{item.School}}</span>
                        <a v-bind:href="'/expert/expertuser/educationHistory?id=' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32 ep_marginLeft30">编辑</a>
                        <span class="ep_font28 ep_ellipsis fr ep_color_grey2 ep_lineHeight32 ep_align_right ep_marginLeft15">
                            <span>{{item.FromYear}}</span>
                            <span>-</span>
                            <span>{{item.ToYear}}</span>
                        </span>
                    </div>
                    <ul class="ep_color_grey2 ep_font28 ep_decription educationDetail ep_marginTop10">
                        <li class="ep_overhide">
                            <span class="fl">学位：</span>
                            <span class="fl ep_width600">{{item.Degree}}</span>
                        </li>
                        <li>
                            <pre class="ep_decription">{{item.Description}}</pre>
                        </li>
                    </ul>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.Educations)">暂无教育经历</p>
        </section>
        <section class="ep_part" id="personalProfile" v-if="isValidElement(userInfo.User)">
            <header class="ep_part_title" v-bind:class="[isValidElement(userInfo.User.Introduction)?'ep_part_item_border':'']">
                <img class="ep_icon fl" src="../../public/images/person.png" />
                <span class='fl'>个人简介</span>
                <a href="/expert/expertuser/personalProfile">
                    <img class="fr editPencils" src="../../public/images/pencils.png" alt="">
                </a>
            </header>
            <pre v-if="isValidElement(userInfo.User.Introduction)" class="ep_part_description" v-cloak>{{userInfo.User && userInfo.User.Introduction}}</pre>
            <p v-else class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey">暂无个人简介</p>
        </section>
    </div>
</template>

<script>
import '@/public/modules/expert/flexible';
import _ from 'lodash';

import '@/public/css/expert/reset.css';
import '@/public/css/expert/editProfile.css';
 
export default {
  name: 'EditProfile',
  data: function () {
    return {
      '_': {},
      userInfo: {}
    };
  },
  created: function () {
      this.initData();
  },
  methods: {
      initData: function () {
        //   fetch('http://10.1.3.60:43400/expert/ExpertInfo/GetExpert').then(response => response.json()).then((json) => {
        //         this.userInfo = json.data;
        //   });
        this._ = _;
        this.userInfo = {"User":{"Name":"杨小峰177","Avatar":"http://10.1.1.35:8000/filestore/common/downloadimg/cnabs/479fc8b7-2e95-cde6-098e-08d5518e105d/s","Company":"asdasdasd","Cellphone":"17721307643","Email":"xiaofeng.yang@sail-fs.com","FollowerNum":0,"FriendNum":0,"FollowingNum":0,"Introduction":null},"ABSProjects":[{"Id":154,"DealId":2605,"DealName":"鼎程2018-1","TotalOffering":11.18,"DealType":"应收账款","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":391,"DealId":2605,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":157,"DealId":1423,"DealName":"中飞租2017-1","TotalOffering":1.71,"DealType":"融资租赁","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":394,"DealId":1423,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":3,"Name":"项目参与人"}},{"Id":138,"DealId":2084,"DealName":"中建材2017-2","TotalOffering":9.0,"DealType":"应收账款","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":332,"DealId":2084,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":145,"DealId":2031,"DealName":"安心贷1号2017-1","TotalOffering":4.47,"DealType":"小额贷款","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":357,"DealId":2031,"OrganizationRoleId":24,"OrganizationRole":"其它","IsCustomizedOrganizationRole":true,"CustomizedOrganizationRole":"test"},{"Id":358,"DealId":2031,"OrganizationRoleId":24,"OrganizationRole":"其它","IsCustomizedOrganizationRole":true,"CustomizedOrganizationRole":"testss"}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":153,"DealId":2291,"DealName":"借呗2017-43","TotalOffering":40.0,"DealType":"个人消费贷款","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":390,"DealId":2291,"OrganizationRoleId":1,"OrganizationRole":"承销商","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":137,"DealId":2277,"DealName":"借呗E2017-1","TotalOffering":4.7,"DealType":"个人消费贷款","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":331,"DealId":2277,"OrganizationRoleId":1,"OrganizationRole":"承销商","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":156,"DealId":1628,"DealName":"鄂黄2017-1","TotalOffering":5.0,"DealType":"收费收益权","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":393,"DealId":1628,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}}],"OtherProjects":[{"Id":73,"ProjectName":"test","ProjectShortName":"test","TotalOffering":0.0,"DealType":"资产证券化","Nation":null,"Description":null,"EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":73,"OrganizationRoleId":20,"OrganizationRole":"税务顾问","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null},{"Id":0,"DealId":73,"OrganizationRoleId":12,"OrganizationRole":"担保人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null},{"Id":0,"DealId":73,"OrganizationRoleId":6,"OrganizationRole":"发起机构","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":80,"ProjectName":"qwe","ProjectShortName":"qwe","TotalOffering":10.0,"DealType":"资产证券化","Nation":"qwe","Description":"","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":80,"OrganizationRoleId":23,"OrganizationRole":"委托机构","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":81,"ProjectName":"rweqw","ProjectShortName":"qweqwe001","TotalOffering":20.0,"DealType":"结构性融资","Nation":"rew","Description":"","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":81,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":82,"ProjectName":"aaaa","ProjectShortName":"ssss","TotalOffering":20.0,"DealType":"结构性融资","Nation":"qwe","Description":"","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":82,"OrganizationRoleId":1,"OrganizationRole":"承销商","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":83,"ProjectName":"eeee","ProjectShortName":"eeee","TotalOffering":10.0,"DealType":"结构性融资","Nation":"wwww","Description":"","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":83,"OrganizationRoleId":19,"OrganizationRole":"财务顾问","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":84,"ProjectName":"dddd","ProjectShortName":"wwww","TotalOffering":30.0,"DealType":"结构性融资","Nation":"fffff","Description":"","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":84,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":85,"ProjectName":"qqqq","ProjectShortName":"aaaa","TotalOffering":30.0,"DealType":"PPP","Nation":"cccc","Description":"","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":85,"OrganizationRoleId":12,"OrganizationRole":"担保人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":3,"Name":"项目参与人"}}],"WorkHistories":[{"Id":214,"Company":"asdasdasd","OrganizationId":null,"Department":"CNABS","Position":"Dev","StartTime":"2017.08","EndTime":"至今","Description":null,"IsEndorse":false}],"HonorAwards":[],"Publishs":[{"Id":133,"Name":"test","Publisher":"test","PublishTime":"2016","Year":null,"Author":"test","Isbn":"11241231","Pages":100,"Link":null,"EndorseNum":0,"IsEndorse":false,"AttachmentFileCode":null},{"Id":132,"Name":"test","Publisher":null,"PublishTime":null,"Year":null,"Author":"test","Isbn":null,"Pages":null,"Link":null,"EndorseNum":0,"IsEndorse":false,"AttachmentFileCode":null}],"RecentActivities":[{"Id":102,"Name":"sss","ActivityTime":"2017.12","Time":"0001-01-01 00:00:00","Description":null}],"OtherPosts":[{"Id":125,"Name":"test"},{"Id":138,"Name":"1234"},{"Id":139,"Name":"ssss"},{"Id":140,"Name":"dasd"},{"Id":141,"Name":"test111"},{"Id":142,"Name":"啊啊啊"}],"Educations":[]}
      },
      //机构角色拼接
      splicingOrganizationRoles: function (organizationRoles) {
          if (this.isArrayEmpty(organizationRoles)) return "";

          var result = [];

          organizationRoles.forEach(function (item) {
              result.push(item.IsCustomizedOrganizationRole ? item.CustomizedOrganizationRole : item.OrganizationRole);
          });

          return result.sort().join();
      },
      isArrayEmpty: function (arr) {
          return (arr === null || arr === undefined || arr.length === 0);
      },
      isValidElement: function (item) {
          return !(item === null || item === undefined || item === "");
      }
  },
  computed: {
       projectHistoriesSummary: function () {
            if (this.userInfo.ABSProjects === null || this.userInfo.ABSProjects.length === 0) return null;

            var projectTotalOffering = 0;

            for (let item of this.userInfo.ABSProjects) {
                projectTotalOffering += Number(item.TotalOffering);
            }

            return { totalCount: this.userInfo.ABSProjects.length, totalOffering: projectTotalOffering };
      },
      otherProjectHistoriesSummary: function () {
            if (this.userInfo.OtherProjects === null || this.userInfo.OtherProjects.length === 0) return null;

            var projectTotalOffering = 0;

            for (let item of this.userInfo.OtherProjects) {
                projectTotalOffering += Number(item.TotalOffering);
            }

            return { totalCount: this.userInfo.OtherProjects.length, totalOffering: projectTotalOffering };
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 
</style>
