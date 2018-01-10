<template>
    <div class="recentActivitiesContent ep_font32">
        <div class="ep_marginTop24"></div>
        <section class="ep_part ep_content_div">
            <div v-if="!isArrayEmpty(recentActivities)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in recentActivities" v-bind:key="item.Id">
                    <div class="ep_overhide">
                        <span class="ep_font28 ep_ellipsis fl ep_width460">{{item.Name}}</span>
                        <a v-bind:href="'/expert/expertuser/activity?id=' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32 ep_marginLeft30">编辑</a>
                        <span class="ep_font24 ep_ellipsis fr ep_color_grey ep_lineHeight32 ep_align_right ep_marginLeft15">{{item.ActivityTime}}</span>
                    </div>
                    <pre class="ep_decription ep_color_grey ep_font24">{{item.Description}}</pre>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'ActivityList',
        data: function () {
            return {
                recentActivities: []
            }
        },
        created: function () {
            this.recentActivities = [{"Id":106,"Name":"fffff","ActivityTime":"2018.01","Time":"0001-01-01 00:00:00","Description":null},{"Id":107,"Name":"aaaa","ActivityTime":"2018.01","Time":"0001-01-01 00:00:00","Description":null},{"Id":108,"Name":"xcxxxx","ActivityTime":"2018.01","Time":"0001-01-01 00:00:00","Description":null},{"Id":102,"Name":"sss","ActivityTime":"2017.12","Time":"0001-01-01 00:00:00","Description":null}];
        },
        methods: {
            isArrayEmpty: function (arr) {
                return (arr === null || arr === undefined || arr.length === 0);
            },
        }
    }
</script>

<style>

</style>
