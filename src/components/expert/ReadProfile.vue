<template>
  <div class="editProfileContent" v-cloak>
        <section class="ep_part ep_overhide" id="basicInformation">
            <div class="ep_overhide basicInformationCard">
                <div class="fl ep_divAvatar">
                    <img style="width:1.866667rem;" v-bind:src="userInfo.User && userInfo.User.Avatar" alt="用户头像">
                </div>
                <div class="fl ep_marginLeft30 ep_width517" v-cloak>
                    <div class='ep_overhide'>
                        <span class="fl ep_font32 ep_width300 ep_ellipsis" style="font-size:18px;">{{userInfo.User && userInfo.User.Name}}</span>
                        <!-- <a v-if="editable" class="fr ep_editBtn ep_font28 ep_color_orange" href="/expert/expertuser/editProfile">编辑履历</a> -->
                        <router-link v-if="editable" to="/EditProfile" class="fr ep_editBtn ep_font28 ep_color_orange">
                            编辑履历
                        </router-link>
                    </div>
                    <div class='ep_overhide ep_marginTop10'>
                        <span class="fl ep_color_grey2 ep_font28 ep_width470">{{userInfo.User && userInfo.User.Company}}</span>
                    </div>
                </div>
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
                <router-link v-if="userInfo.ABSProjects && userInfo.ABSProjects.length > 3" to="ReadAbsHistoryList" class="fr ep_color_grey ep_font24">
                    更多
                </router-link>  
                <!-- <a v-if="userInfo.ABSProjects&&userInfo.ABSProjects.length > 3" class="fr ep_color_grey ep_font24" v-bind:href="'/expert/expertuser/readProjectHistoryABSList?UserId=' + queryString.UserId">
                    更多 >
                </a> -->
            </header>
            <div v-if="!isArrayEmpty(userInfo.ABSProjects)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in _.take(userInfo.ABSProjects,3)">
                    <div class="ep_overhide">
                        <a class="ep_font32 ep_ellipsis fl ep_width520 ep_color_yellow" v-bind:href="'/expert/expertuser/projectABSDetails?dealId=' + item.DealId">{{item.DealName}}</a>
                        <div v-if="!editable" class="ep_overhide fr ep_lineHeight32 ep_width112">
                            <img class="fl ep_icon_like ep_marginTop5" v-on:click="absProjectEndorseHandle(item)" v-bind:src="endorseImg(item.IsEndorse)" />
                            <span class="fl ep_font24 ep_color_grey">{{item.EndorseNum === 0 ? '' : item.EndorseNum}}</span>
                        </div>
                        <span v-else class="fr ep_color_grey ep_font24 ep_lineHeight32">{{item.EndorseNum === 0 ? '' : item.EndorseNum+'人赞'}}</span>
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
                <router-link v-if="userInfo.OtherProjects && userInfo.OtherProjects.length > 3" to="ReadOtherProjectList" class="fr ep_color_grey ep_font24">
                    更多
                </router-link>  
                <!-- <a v-if="userInfo.OtherProjects&&userInfo.OtherProjects.length>3" class="fr ep_color_grey ep_font24" v-bind:href="'/expert/expertuser/readProjectHistoryOtherList?UserId=' + queryString.UserId">
                    更多 >
                </a> -->
            </header>
            <div v-if="!isArrayEmpty(userInfo.OtherProjects)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in _.take(userInfo.OtherProjects,3)">
                    <div class="ep_overhide">
                        <span class="ep_font32 fl ep_width520">{{item.ProjectName}}</span>
                        <div v-if="!editable" class="ep_overhide fr ep_lineHeight32 ep_width112">
                            <img class="fl ep_icon_like ep_marginTop5" v-on:click="otherProjectEndorseHandle(item)" v-bind:src="endorseImg(item.IsEndorse)" />
                            <span class="fl ep_font24 ep_color_grey">{{item.EndorseNum === 0 ? '' : item.EndorseNum}}</span>
                        </div>
                        <span v-else class="fr ep_color_grey ep_font24 ep_lineHeight32">{{item.EndorseNum === 0 ? '' : item.EndorseNum+'人赞'}}</span>
                    </div>
                    <table class="projectHistoryABSList ep_font28 ep_marginTop10">
                        <tr>
                            <td class="ep_ellipsis">{{item.DealType}}</td>
                            <td class="ep_ellipsis" v-if="item.TotalOffering !== 0">{{item.TotalOffering.toFixed(2)}}亿元</td>
                            <td class="ep_ellipsis">{{item.ProjectShortName}}</td>
                            <td class="ep_ellipsis">{{item.Nation}}</td>
                        </tr>
                        <tr>
                            <td>{{item.PersonalResponsibility.Name}}</td>
                            <td colspan="3">{{splicingOrganizationRoles(item.OrganizationRoles)}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.OtherProjects)">暂无其它项目经历</p>
        </section>
        <section class="ep_part" id="workHistory">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.WorkHistories)?'':'ep_part_item_border']">
                <img class="ep_icon fl" src="../../public/images/workHistory.png" />
                <span class='fl'>工作经历</span>
            </header>
            <div v-if="!isArrayEmpty(userInfo.WorkHistories)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in userInfo.WorkHistories">
                    <div class="ep_overhide">
                        <span class="ep_font32 ep_ellipsis fl ep_width520">{{item.Position}}</span>
                        <!-- <span class="fr ep_color_grey2 ep_font28 ep_lineHeight32">机构已认证</span> -->
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
            </header>
            <div v-if="!isArrayEmpty(userInfo.OtherPosts)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in userInfo.OtherPosts">
                    <div class="ep_overhide">
                        <span class="ep_font32 ep_ellipsis fl ep_width600">{{item.Name}}</span>
                    </div>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.OtherPosts)">暂无其它职务</p>
        </section>
        <section class="ep_part" id="awardsAndHonors">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.HonorAwards)?'':'ep_part_item_border']">
                <img class="ep_icon fl" src="../../public/images/honor.png" />
                <span class='fl'>奖项与荣誉</span>
            </header>
            <div v-if="!isArrayEmpty(userInfo.HonorAwards)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in userInfo.HonorAwards">
                    <div class="ep_overhide">
                        <span class="ep_font32 ep_ellipsis fl ep_width460">{{item.Name}}</span>
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
                <a v-if="userInfo.RecentActivities&&userInfo.RecentActivities.length>3" class="fr ep_color_grey ep_font24" href="/expert/expertuser/readRecentActivitiesList">
                    更多 >
                </a>
            </header>
            <div v-if="!isArrayEmpty(userInfo.RecentActivities)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in _.take(userInfo.RecentActivities,3)">
                    <div class="ep_overhide">
                        <span class="ep_font32 ep_ellipsis fl ep_width460">{{item.Name}}</span>
                        <span class="ep_font28 ep_ellipsis fr ep_color_grey2 ep_lineHeight32 ep_align_right ep_marginLeft15">{{item.ActivityTime}}</span>
                    </div>
                    <pre class="ep_decription ep_color_grey2 ep_font28">{{item.Description}}</pre>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.RecentActivities)">暂无近期活动</p>
        </section>
        <section class="ep_part" id="article">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.Publishs)?'':'ep_part_item_border']">
                <img class="ep_icon fl" src="../../public/images/article.png" />
                <span class='fl'>著作与文章</span>
                <router-link v-if="userInfo.Publishs && userInfo.Publishs.length > 3" to="ReadArticleList" class="fr ep_color_grey ep_font24">
                    更多
                </router-link>  
                <!-- <a v-if="userInfo.Publishs && userInfo.Publishs.length > 3" class="fr ep_color_grey ep_font24" v-bind:href="'/expert/expertuser/readArticleList?UserId=' + queryString.UserId">
                    更多 >
                </a> -->
            </header>
            <div v-if="!isArrayEmpty(userInfo.Publishs)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in _.take(userInfo.Publishs,3)">
                    <div class="ep_overhide">
                        <span class="fl ep_font32">《</span>
                        <span class="ep_font32 ep_ellipsis fl ep_maxWidth460">{{item.Name}}</span>
                        <span class="fl ep_font32">》</span>
                        <div v-if="!editable" class="ep_overhide fr ep_lineHeight32 ep_width112">
                            <img class="fl ep_icon_like ep_marginTop5" v-on:click="publishEndorseHandle(item)" v-bind:src="endorseImg(item.IsEndorse)" />
                            <span class="fl ep_font24 ep_color_grey">{{item.EndorseNum === 0 ? '' : item.EndorseNum}}</span>
                        </div>
                        <span v-else class="fr ep_color_grey ep_font24 ep_lineHeight32">{{item.EndorseNum === 0 ? '' : item.EndorseNum+'人赞'}}</span>
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
                        <span class="ep_sendMailBtn ep_font28" v-on:click="sendAttachment(item.AttachmentFileCode)" v-show="isValidElement(item.AttachmentFileCode)">发送到邮箱</span>
                    </div>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.Publishs)">暂无著作与文章</p>
        </section>
        <section class="ep_part" id="educationHistory">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.Educations)?'':'ep_part_item_border']">
                <img class="ep_icon fl" src="../../public/images/education.png" />
                <span class='fl'>教育经历</span>
            </header>
            <div v-if="!isArrayEmpty(userInfo.Educations)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in userInfo.Educations">
                    <div class="ep_overhide">
                        <span class="ep_font32 ep_ellipsis fl ep_width400">{{item.School}}</span>
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
            </header>
            <pre v-if="isValidElement(userInfo.User.Introduction)" class="ep_part_description" v-cloak>{{userInfo.User && userInfo.User.Introduction}}</pre>
            <p v-else class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey">暂无个人简介</p>
        </section>
    </div>
</template>

<script>
    import _ from 'lodash';

    import dislikeImg from '@/public/images/dislike.png';
    import likeImg from '@/public/images/like.png';
    
    export default {
        name: 'ReadProfile',
        data: function () {
            return {
                '_': {},
                userInfo: {},
                editable: false,
                queryString: {},//GetRequest(),
                absProjectEndorseLock: false,
                otherProjectEndorseLock: false,
                publicEndorseLock: false
            }
        },
        created: function () {
            this.initData();
        },
        methods: {
            initData: function () {
                // var self = this;
                // var params = {};

                // if (isValidElement(this.queryString.UserId)) {
                //     params.UserId = this.queryString.UserId;
                // }

                // appFrame.ajax("/expert/ExpertInfo/GetExpertDisplay", {
                //     data: params,
                //     success: function (res) {
                //         self.userInfo = res.data.UserInfo;
                //         self.editable = res.data.Editable;
                //     }
                // });
                this.userInfo = {"User":{"Name":"杨小峰177","Avatar":"http://10.1.1.35:8000/filestore/common/downloadimg/cnabs/479fc8b7-2e95-cde6-098e-08d5518e105d/s","Company":"asdasdasd","Cellphone":"17721307643","Email":"xiaofeng.yang@sail-fs.com","FollowerNum":0,"FriendNum":0,"FollowingNum":0,"Introduction":null},"ABSProjects":[{"Id":154,"DealId":2605,"DealName":"鼎程2018-1","TotalOffering":11.18,"DealType":"保理融资","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":391,"DealId":2605,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":157,"DealId":1423,"DealName":"中飞租2017-1","TotalOffering":1.71,"DealType":"融资租赁","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":394,"DealId":1423,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":3,"Name":"项目参与人"}},{"Id":138,"DealId":2084,"DealName":"中建材2017-2","TotalOffering":9.0,"DealType":"应收账款","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":332,"DealId":2084,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":145,"DealId":2031,"DealName":"安心贷1号2017-1","TotalOffering":4.47,"DealType":"小额贷款","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":357,"DealId":2031,"OrganizationRoleId":24,"OrganizationRole":"其它","IsCustomizedOrganizationRole":true,"CustomizedOrganizationRole":"test"},{"Id":358,"DealId":2031,"OrganizationRoleId":24,"OrganizationRole":"其它","IsCustomizedOrganizationRole":true,"CustomizedOrganizationRole":"testss"}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":153,"DealId":2291,"DealName":"借呗2017-43","TotalOffering":40.0,"DealType":"个人消费贷款","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":390,"DealId":2291,"OrganizationRoleId":1,"OrganizationRole":"承销商","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":137,"DealId":2277,"DealName":"借呗E2017-1","TotalOffering":4.7,"DealType":"个人消费贷款","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":331,"DealId":2277,"OrganizationRoleId":1,"OrganizationRole":"承销商","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":156,"DealId":1628,"DealName":"鄂黄2017-1","TotalOffering":5.0,"DealType":"收费收益权","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":393,"DealId":1628,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}}],"OtherProjects":[{"Id":73,"ProjectName":"test","ProjectShortName":"test","TotalOffering":0.0,"DealType":"资产证券化","Nation":null,"Description":null,"EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":73,"OrganizationRoleId":20,"OrganizationRole":"税务顾问","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null},{"Id":0,"DealId":73,"OrganizationRoleId":12,"OrganizationRole":"担保人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null},{"Id":0,"DealId":73,"OrganizationRoleId":6,"OrganizationRole":"发起机构","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":80,"ProjectName":"qwe","ProjectShortName":"qwe","TotalOffering":10.0,"DealType":"资产证券化","Nation":"qwe","Description":"","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":80,"OrganizationRoleId":23,"OrganizationRole":"委托机构","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":81,"ProjectName":"rweqw","ProjectShortName":"qweqwe001","TotalOffering":20.0,"DealType":"结构性融资","Nation":"rew","Description":"","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":81,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":82,"ProjectName":"aaaa","ProjectShortName":"ssss","TotalOffering":20.0,"DealType":"结构性融资","Nation":"qwe","Description":"","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":82,"OrganizationRoleId":1,"OrganizationRole":"承销商","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":83,"ProjectName":"eeee","ProjectShortName":"eeee","TotalOffering":10.0,"DealType":"结构性融资","Nation":"wwww","Description":"","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":83,"OrganizationRoleId":19,"OrganizationRole":"财务顾问","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":84,"ProjectName":"dddd","ProjectShortName":"wwww","TotalOffering":30.0,"DealType":"结构性融资","Nation":"fffff","Description":"","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":84,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":85,"ProjectName":"qqqq","ProjectShortName":"aaaa","TotalOffering":30.0,"DealType":"PPP","Nation":"cccc","Description":"","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":85,"OrganizationRoleId":12,"OrganizationRole":"担保人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":3,"Name":"项目参与人"}}],"WorkHistories":[{"Id":214,"Company":"asdasdasd","OrganizationId":null,"Department":"CNABS","Position":"Dev","StartTime":"2017.08","EndTime":"至今","Description":null,"IsEndorse":false}],"HonorAwards":[],"Publishs":[{"Id":133,"Name":"test","Publisher":"test","PublishTime":"2016","Year":null,"Author":"test","Isbn":"11241231","Pages":100,"Link":null,"EndorseNum":1,"IsEndorse":false,"AttachmentFileCode":null},{"Id":139,"Name":"12312323","Publisher":null,"PublishTime":null,"Year":null,"Author":"123123","Isbn":null,"Pages":null,"Link":null,"EndorseNum":0,"IsEndorse":false,"AttachmentFileCode":null},{"Id":140,"Name":"12312312","Publisher":null,"PublishTime":null,"Year":null,"Author":"123123","Isbn":null,"Pages":null,"Link":null,"EndorseNum":0,"IsEndorse":false,"AttachmentFileCode":null},{"Id":132,"Name":"test","Publisher":null,"PublishTime":null,"Year":null,"Author":"test","Isbn":null,"Pages":null,"Link":null,"EndorseNum":1,"IsEndorse":false,"AttachmentFileCode":null}],"RecentActivities":[{"Id":102,"Name":"sss","ActivityTime":"2017.12","Time":"0001-01-01 00:00:00","Description":null}],"OtherPosts":[{"Id":125,"Name":"test"},{"Id":138,"Name":"1234"},{"Id":139,"Name":"ssss"},{"Id":140,"Name":"dasd"},{"Id":141,"Name":"test111"},{"Id":142,"Name":"啊啊啊"}],"Educations":[]};
                this._ = _;
                this.editable = true;
            },
            endorseImg: function (isEndorse) {
                return isEndorse ? likeImg : dislikeImg;
            },
            absProjectEndorseHandle: function (absProject) {
                if (this.absProjectEndorseLock) return;

                this.absProjectEndorseLock = true;
                var self = this;

                //取消点赞
                if (absProject.IsEndorse) {
                    appFrame.ajax("/expert/ExpertInfo/DeleteAbsProjectEndorse", {
                        data: { userId: this.queryString.UserId, dealId: absProject.DealId },
                        success: function (res) {
                            if (res.status === "fail") {
                                //TODO alert fail message
                                return;
                            }

                            absProject.EndorseNum = res.data.EndorseNum;
                            absProject.IsEndorse = res.data.IsEndorse;
                            self.absProjectEndorseLock = false;
                        }
                    });
                    return;
                }

                //点赞
                appFrame.ajax("/expert/ExpertInfo/AddAbsProjectEndorse", {
                    data: { userId: this.queryString.UserId, dealId: absProject.DealId },
                    success: function (res) {

                        if (res.status === "fail") {
                            //TODO alert fail message
                            return;
                        }

                        absProject.EndorseNum = res.data.EndorseNum;
                        absProject.IsEndorse = res.data.IsEndorse;
                        self.absProjectEndorseLock = false;
                    }
                });
            },
            otherProjectEndorseHandle: function (otherProject) {
                if (this.otherProjectEndorseLock) return;

                this.otherProjectEndorseLock = true;
                var self = this;

                //取消点赞
                if (otherProject.IsEndorse) {
                    appFrame.ajax("/expert/ExpertInfo/DeleteOtherProjectEndorse", {
                        data: { userId: this.queryString.UserId, dealId: otherProject.Id },
                        success: function (res) {
                            if (res.status === "fail") {
                                //TODO alert fail message
                                return;
                            }

                            otherProject.EndorseNum = res.data.EndorseNum;
                            otherProject.IsEndorse = res.data.IsEndorse;
                            self.otherProjectEndorseLock = false;
                        }
                    });
                    return;
                }

                //点赞
                appFrame.ajax("/expert/ExpertInfo/AddOtherProjectEndorse", {
                    data: { userId: this.queryString.UserId, dealId: otherProject.Id },
                    success: function (res) {

                        if (res.status === "fail") {
                            //TODO alert fail message
                            return;
                        }

                        otherProject.EndorseNum = res.data.EndorseNum;
                        otherProject.IsEndorse = res.data.IsEndorse;
                        self.otherProjectEndorseLock = false;
                    }
                });
            },
            publishEndorseHandle: function (publish) {
                if (this.publicEndorseLock) return;

                this.publicEndorseLock = true;
                var self = this;

                //取消点赞
                if (publish.IsEndorse) {
                    appFrame.ajax("/expert/ExpertInfo/DeletePublishEndorse", {
                        data: { userId: this.queryString.UserId, publishId: publish.Id },
                        success: function (res) {
                            if (res.status === "fail") {
                                //TODO alert fail message
                                return;
                            }

                            publish.EndorseNum = res.data.EndorseNum;
                            publish.IsEndorse = res.data.IsEndorse;
                            self.publicEndorseLock = false;
                        }
                    });
                    return;
                }

                //点赞
                appFrame.ajax("/expert/ExpertInfo/AddPublishEndorse", {
                    data: { userId: this.queryString.UserId, publishId: publish.Id },
                    success: function (res) {
                        if (res.status === "fail") {
                            //TODO alert fail message
                            return;
                        }

                        publish.EndorseNum = res.data.EndorseNum;
                        publish.IsEndorse = res.data.IsEndorse;
                        self.publicEndorseLock = false;
                    }
                });
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
            },
            sendAttachment: function (fileCode) {
                var self = this;

                appFrame.ajax("/AppDeal/SendPublish", {
                    data: { fileCode: fileCode },
                    success: function (res) {
                        self.$toast(res.data);
                    }
                });
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
    }
</script>

<style>

</style>

