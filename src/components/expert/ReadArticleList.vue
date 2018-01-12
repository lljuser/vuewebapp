<template>
    <div class="articleListContent ep_font32">
        <div class="ep_marginTop24"></div>
        <section class="ep_content_div">
            <div v-if="!isArrayEmpty(publishes)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="(item, index) in publishes" v-bind:key="item.Name" v-bind:class="[index === 0 ? 'ep_paddingTop46' : '']">
                    <div class=" ep_overhide">
                        <span class="fl ep_font28 appH5_color_green">《</span>
                        <span class="ep_font28 ep_ellipsis fl ep_maxWidth460 appH5_color_green">{{item.Name}}</span>
                        <span class="fl ep_font28 appH5_color_green">》</span>
                        <div v-if="!editable" class="ep_overhide fr ep_lineHeight32 ">
                            <img class="followImg" v-bind:class="item.IsEndorse?'appH5_followIcon':'appH5_unfollowIcon'" v-on:click="publishEndorseHandle(item)" v-bind:src="endorseImg(item.IsEndorse)" />
                        </div>
                        <!-- <div v-else class="ep_overhide fr ep_lineHeight32 ">
                            <img class="followImg" v-bind:class="item.IsEndorse?'appH5_followIcon':'appH5_unfollowIcon'" v-bind:src="endorseImg(item.IsEndorse)" />
                        </div> -->
                    </div>
                    <div class="divArticleDetail">
                        <ul class="ep_color_grey ep_font24 ep_decription articleDetail">
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
                                <a class="fl ep_ellipsis ep_width300 ep_Link ep_color_orange_important"  v-bind:href="item.Link">{{item.Link}}</a>
                            </li>
                            <li v-show="isValidElement(item.AttachmentFileCode)">
                                <span>作品文件：</span>
                                <div class="fl">《</div>
                                <span class="fl ep_ellipsis">{{item.Name}}</span>
                                <div class="fl">》</div> 
                            </li>
                        </ul>
                        <span class="ep_sendMailBtn ep_font24" v-show="isValidElement(item.AttachmentFileCode)">发送到邮箱</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from "axios";
    import * as webApi from "@/config/api";
    import dislikeImg from '@/public/images/dislike.png';
    import likeImg from '@/public/images/like.png';

    export default {
        name: 'ReadArticleList',
        data: function () {
            return {
                publishes: {},
                editable: false,
                publicEndorseLock: false,
                userId: null,
            }
        },
        created: function () {
            this.userId = this.$route.params.userId;
            this.initData();
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
        }
    }
</script>

<style>
    
</style>
