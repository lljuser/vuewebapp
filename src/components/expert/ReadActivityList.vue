<template>
    <div class="recentActivitiesContent ep_font32" :class="isShowHeader ? 'paddingTop50': ''">
        <div class="ep_marginTop24"></div>
        <section class="ep_part ep_content_div">
            <div v-if="!isArrayEmpty(recentActivities)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in recentActivities" v-bind:key="item.Name">
                    <div class="ep_overhide">
                        <span class="ep_font28 ep_ellipsis fl ep_width460 appH5_color_green">{{item.Name}}</span>
                        <span class="ep_font24 ep_ellipsis fr ep_color_grey ep_lineHeight32 ep_align_right ep_marginLeft15">{{item.ActivityTime}}</span>
                    </div>
                    <pre class="ep_decription ep_color_grey ep_font24">{{item.Description}}</pre>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import BusUtil from '../abs/BusUtil';
    import util from "@/public/modules/expert/utils";
    import axios from "axios";
    import * as webApi from "@/config/api";

    export default {
        name: 'ReadActivityList',
        data: function () {
            return {
                recentActivities: [],
                userId: null,
                isShowHeader: false
            }
        },
        created: function () {
            this.userId = this.$route.params.userId;
            this.initData();
            this.scrollRestore();
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
                axios.post(webApi.Expert.getRecentActivities, { UserId: this.userId }).then(response => {
                    this.recentActivities = response.data.data;
                });
            },
            isArrayEmpty: function (arr) {
                return (arr === null || arr === undefined || arr.length === 0);
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
