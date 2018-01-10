<template>
    <div class="articleListContent ep_font32">
        <div class="ep_marginTop24"></div>
        <section class="ep_part ep_content_div">
            <div v-if="!isArrayEmpty(publishs)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="(item,index) in publishs" v-bind:key="item.Id" v-bind:class="[index===0?'ep_paddingTop46':'']">
                    <div class=" ep_overhide">
                        <span class="fl ep_font32 appH5_color_green">《</span>
                        <span class="ep_font32 ep_ellipsis fl ep_maxWidth460 appH5_color_green">{{item.Name}}</span>
                        <span class="fl ep_font32 appH5_color_green">》</span>
                        <a v-bind:href="'/expert/expertuser/article?id=' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32 ep_marginLeft30">编辑</a>
                    </div>
                    <div class="divArticleDetail">
                        <ul class="ep_color_grey ep_font28 ep_decription articleDetail">
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
                                <a class="fl ep_ellipsis ep_width300 ep_color_blue ep_Link"  v-bind:href="item.Link">{{item.Link}}</a>
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
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'ArticleList',
        data: function () {
            return {
                publishs: []
            }
        },
        created: function () {
            this.publishs = [{"Id":133,"Name":"test","Publisher":"test","PublishTime":"2016","Year":null,"Author":"test","Isbn":"11241231","Pages":100,"Link":null,"EndorseNum":0,"IsEndorse":false,"AttachmentFileCode":null},{"Id":139,"Name":"12312323","Publisher":null,"PublishTime":null,"Year":null,"Author":"123123","Isbn":null,"Pages":null,"Link":null,"EndorseNum":0,"IsEndorse":false,"AttachmentFileCode":null},{"Id":140,"Name":"12312312","Publisher":null,"PublishTime":null,"Year":null,"Author":"123123","Isbn":null,"Pages":null,"Link":null,"EndorseNum":0,"IsEndorse":false,"AttachmentFileCode":null},{"Id":132,"Name":"test","Publisher":null,"PublishTime":null,"Year":null,"Author":"test","Isbn":null,"Pages":null,"Link":null,"EndorseNum":0,"IsEndorse":false,"AttachmentFileCode":null}];
        },
        methods: {
            isArrayEmpty: function (arr) {
                return (arr === null || arr === undefined || arr.length === 0);
            },
            isValidElement: function (item) {
                return !(item === null || item === undefined || item === "");
            }
        }
    }
</script>

<style>

</style>
