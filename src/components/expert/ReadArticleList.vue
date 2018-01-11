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
                        <div v-else class="ep_overhide fr ep_lineHeight32 ">
                                <img class="followImg" v-bind:class="item.IsEndorse?'appH5_followIcon':'appH5_unfollowIcon'" v-bind:src="endorseImg(item.IsEndorse)" />
                        </div>
                        <!-- <div v-if="!editable" class="ep_overhide fr ep_lineHeight32 ep_width112">
                            <img class="fl ep_icon_like ep_marginTop5" v-on:click="publishEndorseHandle(item)" v-bind:src="endorseImg(item.IsEndorse)" />
                            <span class="fl ep_font24 ep_color_grey">{{item.EndorseNum === 0 ? '' : item.EndorseNum}}</span>
                        </div>
                        <span v-else class="fr ep_color_grey ep_font24 ep_lineHeight32">{{item.EndorseNum === 0 ? '' : item.EndorseNum+'人赞'}}</span> -->
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
    import dislikeImg from '@/public/images/dislike.png';
    import likeImg from '@/public/images/like.png';

    export default {
        name: 'ReadArticleList',
        data: function () {
            return {
                publishes: {},
                editable: false,
                queryString: {},//GetRequest(),
                publicEndorseLock: false
            }
        },
        created: function () {
            this.initData();
        },
        methods: {
            initData: function () {
                this.publishes = [{"Id":133,"Name":"test","Publisher":"test","PublishTime":"2016","Year":null,"Author":"test","Isbn":"11241231","Pages":100,"Link":null,"EndorseNum":1,"IsEndorse":false,"AttachmentFileCode":null},{"Id":139,"Name":"12312323","Publisher":null,"PublishTime":null,"Year":null,"Author":"123123","Isbn":null,"Pages":null,"Link":null,"EndorseNum":0,"IsEndorse":false,"AttachmentFileCode":null},{"Id":140,"Name":"12312312","Publisher":null,"PublishTime":null,"Year":null,"Author":"123123","Isbn":null,"Pages":null,"Link":null,"EndorseNum":0,"IsEndorse":false,"AttachmentFileCode":null},{"Id":132,"Name":"test","Publisher":null,"PublishTime":null,"Year":null,"Author":"test","Isbn":null,"Pages":null,"Link":null,"EndorseNum":1,"IsEndorse":false,"AttachmentFileCode":null}];
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
        }
    }
</script>

<style>
    
</style>
