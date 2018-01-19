<template>
    <div class="articleListContent ep_font32" :class="isShowHeader ? 'paddingTop50': ''">
        <div class="ep_marginTop24"></div>
        <section class="ep_content_div">
            <div v-if="!isArrayEmpty(publishes)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="(item, index) in publishes" v-bind:key="index">
                    <div class=" ep_overhide">
                        <span class="fl ep_font28 appH5_color_green">《</span>
                        <span class="ep_font28 ep_ellipsis fl ep_maxWidth577 appH5_color_green">{{item.Name}}</span>
                        <span class="fl ep_font28 appH5_color_green">》</span>
                        <div v-if="!editable" class="ep_overhide fr ep_lineHeight32 ">
                            <img class="followImg" v-bind:class="item.IsEndorse?'appH5_followIcon':'appH5_unfollowIcon'" v-on:click="publishEndorseHandle(item)" v-bind:src="endorseImg(item.IsEndorse)" />
                        </div>
                    </div>
                    <div class="divArticleDetail">
                        <ul class="ep_color_grey ep_font24 ep_decription articleDetail">
                            <li>
                                <span class='article_title'>作者：</span>
                                <span class="ep_ellipsis ep_width517">{{item.Author}}</span>
                            </li>
                            <li v-if="isValidElement(item.Publisher)">
                                <span class='article_title'>出版社：</span>
                                <span class="ep_ellipsis ep_width517">{{item.Publisher}}</span>
                            </li>
                            <li v-if="isValidElement(item.PublishTime)">
                                <span class='article_title'>出版时间：</span>
                                <span class="ep_ellipsis ep_width517">{{isValidElement(item.PublishTime) ? item.PublishTime + '年' : ''}}</span>
                            </li>
                            <li v-if="isValidElement(item.Isbn)">
                                <span class='article_title'>书号ISBN：</span>
                                <span class="ep_ellipsis ep_width517">{{item.Isbn}}</span>
                            </li>
                            <li v-if="isValidElement(item.Pages)">
                                <span class='article_title'>页数：</span>
                                <span class="ep_ellipsis ep_width300">{{item.Pages}}</span>
                            </li>
                            <li v-if="isValidElement(item.Link)">
                                <span class='article_title'>作品网址：</span>
                                <a class="fl ep_ellipsis ep_width300 ep_Link ep_color_orange_important"  v-bind:href="item.Link">{{item.Link}}</a>
                            </li>
                            <li v-show="isValidElement(item.AttachmentFileCode)">
                                <span class='article_title'>作品文件：</span>
                                <div class="fl">《</div>
                                <span class="fl ep_ellipsis ep_maxwidth250">{{item.Name}}</span>
                                <div class="fl">》</div> 
                            </li>
                        </ul>
                        <span class="ep_sendMailBtn ep_font24" v-on:click="sendAttachment(item.AttachmentFileCode)" v-show="isValidElement(item.AttachmentFileCode)">发送到邮箱</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from "axios";
    import * as webApi from "@/config/api";
    import BusUtil from '../abs/BusUtil';
    import util from "@/public/modules/expert/utils";
    import dislikeImg from '@/public/images/dislike.png';
    import likeImg from '@/public/image/followicon.png';

    export default {
        name: 'ReadArticleList',
        data: function () {
            return {
                publishes: {},
                editable: false,
                publicEndorseLock: false,
                userId: null,
                isShowHeader: false
            }
        },
        created: function () {
            this.userId = this.$route.params.userId;
            this.scrollRestore();
            this.initData();
        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                var query = util.getQueryString();

                if (query.isShowHeader) {
                    vm.isShowHeader = true;
                    const busUtil = BusUtil.getInstance();
                    busUtil.bus.$emit('showHeader', true);
                    busUtil.bus.$emit('path', 'expert.html?' + util.toQueryString(query));
                    busUtil.bus.$emit('headTitle', '近期活动');
                }
            });
        },
        methods: {
            initData: function () {
                axios.post(webApi.Expert.getPublishs, { UserId: this.userId }).then(response => {
                    this.publishes = response.data.data.Publishes;
                    this.editable = response.data.data.Editable;
                });
            },
            isArrayEmpty: function (arr) {
                return (arr === null || arr === undefined || arr.length === 0);
            },
            isValidElement: function (item) {
                return !(item === null || item === undefined || item === "");
            },
            endorseImg: function (isEndorse) {
                return isEndorse ? likeImg : dislikeImg;
            },
            publishEndorseHandle: function (publish) {
                if (this.publicEndorseLock) return;

                this.publicEndorseLock = true;
                var self = this;

                //取消点赞
                if (publish.IsEndorse) {
                    axios.post(webApi.Expert.deletePublishEndorse, { 
                        UserId: this.userId,
                        publishId: publish.Id
                    }).then(response => {
                        publish.EndorseNum = response.data.data.EndorseNum;
                        publish.IsEndorse = response.data.data.IsEndorse;
                        this.publicEndorseLock = false;
                    });
                    return;
                }

                //点赞
                axios.post(webApi.Expert.addPublishEndorse, { 
                    UserId: this.userId,
                    publishId: publish.Id
                }).then(response => {
                    publish.EndorseNum = response.data.data.EndorseNum;
                    publish.IsEndorse = response.data.data.IsEndorse;
                    this.publicEndorseLock = false;
                });
            },
            sendAttachment: function(fileCode) {
                axios.post(webApi.Expert.sendPublishUrl, {fileCode: fileCode})
                .then(response => {
                    this.$toast(response.data.data);
                });
            },
            scrollRestore: function () {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0; 
            },
        }
    }
</script>

<style>
    
</style>
