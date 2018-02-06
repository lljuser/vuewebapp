<template>
  <div class="appH5_body">
    <div class="appH5_content">
        <h2>区域标题</h2>
        <div class="appH5_panel">
    	    <div class="appH5_title">
		       区域标题
	        </div>
	    </div>
		<h2>icon</h2>
        <div class="appH5_panel">
		    <font-awesome-icon :icon="['far', 'user']" class="appH5_icon" />专家
	        <font-awesome-icon :icon="['far', 'chart-bar']" class="appH5_icon" />项目
	        <font-awesome-icon :icon="['far', 'edit']" class="appH5_icon"/>文章
        </div>
	    <h2>tab切换</h2>
        <div class="appH5_panel appH5_tab_div">
    	    <div class="appH5_tab appH5_select_tab">市场</div>
    	     <div class="appH5_tab">产品</div>
	    </div>
	    <h2>字号4种</h2>
        <div class="appH5_panel">
    	    <div class="appH5_font_smaller">弱化信息</div>
    	    <div class="appH5_font_normal">常用的字号，比如表格的文字，下拉列表的文字</div>
    	    <div class="appH5_font_large">特例，表格中放大的数字</div>
    	    <div class="appH5_font_larger">页面顶部标题，Tab标题，区域标题</div>
    	    <div class="appH5_font_largest">超超大字</div>
	    </div>
	    <h2>两列示例</h2>
        <div class="appH5_panel">
    	    <div class="appH5_title">
		       <span></span>
		       <span>产品要素</span>
	        </div>
	        <table class="appH5_list_two">
	        	<tr>
	        		<td>产品名称</td>
	        		<td>这是一个产品名称，可能会很长，这是一个产品名称，可能会很长</td>
	        	</tr>
	        	<tr>
	        		<td>产品分类</td>
	        		<td>借贷类型</td>
	        	</tr>
	        </table>
	    </div>
	    <h2>四列示例</h2>
        <div class="appH5_panel">
    	    <div class="appH5_title">
		       <span></span>
		       <span>产品要素</span>
	        </div>
	        <table class="appH5_list_four">
				<tr>
	        		<td colspan="4" class="appH5_color_white appH5_word_break">这是一个产品名称，这是一个产品名称，这是一个产品名称</td>
	        	</tr>
				<tr>
	        		<td class='appH5_color_red' colspan="2" rowspan="2">
						<span class="appH5_font_largest">253</span>
						<span>亿</span>
					</td>
	        		<td class='appH5_color_skyblue appH5_vertical_bottom appH5_font_larger appH5_white_space'>5~6%</td>
	        		<td class='appH5_color_skyblue appH5_vertical_bottom appH5_font_larger appH5_white_space'>3.83年</td>
	        	</tr>
				<tr>
					<td class='appH5_color_skyblue appH5_font_larger appH5_white_space appH5_vertical_middle'>AAA</td>
					<td class='appH5_color_skyblue appH5_font_larger appH5_white_space'>收费收益权</td>
				</tr>
	        	<tr>
	        		<td class='appH5_white_space'>产品描述</td>
	        		<td colspan="3">这是一个产品名称，这是一个产品名称，这是一个产品名称</td>
	        	</tr>
	        	<tr>
	        		<td class='appH5_white_space'>证券类型</td>
	        		<td class="appH5_color_link">夹层级</td>
	        		<td class='appH5_white_space'>评&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级</td>
	        		<td>AAA</td>
	        	</tr>
	        	<tr>
	        		<td class='appH5_white_space'>证券类型</td>
	        		<td>夹层级</td>
	        		<td class='appH5_white_space'>资产类型</td>
	        		<td>A应收账款</td>
	        	</tr>
	        	<tr>
	        		<td colspan="4">
						<span>项目描述</span>
						<div class="appH5_color_white appH5_margin_top_td_div">
							支持描述支持描述支持描述支持描述支持描述支持描述支持描述支持描述支持描述支持描述支持描述支持描述
						</div>
					</td>
	        	</tr>
	        </table>
	    </div>
		<h2>四列示例</h2>
        <div class="appH5_panel">
			        <table class="appH5_list_four">
				<tr>
	        		<td colspan="4" class="appH5_color_white appH5_word_break">这是一个产品名称，这是一个产品名称，这是一个产品名称</td>
	        	</tr>
				<tr>
	        		<td class='appH5_color_red' colspan="2" rowspan="2">
						<span class="appH5_font_largest">253</span>
						<span>亿</span>
					</td>
	        		<td class='appH5_vertical_bottom appH5_font_smaller appH5_white_space'>上交所</td>
	        		<td class='appH5_vertical_bottom appH5_font_smaller appH5_white_space appH5_color_white'>2017-12-23（发行）</td>
	        	</tr>
				<tr>
					<td class='appH5_font_smaller appH5_white_space appH5_vertical_top appH5_color_white'>过手型</td>
					<td class='appH5_font_smaller appH5_white_space appH5_vertical_top'>2018-12-23（到期）</td>
				</tr>
				</table>
		</div>
        <h2>表单元素</h2>
	    <div class="appH5_panel">
	        <input type='text' placeholder='请输入内容'>
	        <br>
			<input class="appH5_search_input" type='text' placeholder='请输入内容'>
			<br>
			<select>
				<option>选择1</option>
				<option>选择2</option>
			</select>
		</div>
		<h2>颜色集合</h2>
		<div class="appH5_panel">
			<div class="appH5_color_red">资金专用颜色</div>
			<div class="appH5_color_disabled">不可操作颜色</div>
			<div class="appH5_color_error">错误提示</div>
			<div class="appH5_color_details appH5_font_smaller">弱化信息，例如：一小时前</div>
		</div>
		<h2>按钮集合</h2>
		<div class="appH5_panel">
			<div class="appH5_btn_larger_blue">登&nbsp;&nbsp;录</div>
			<div class="appH5_btn_unfollow">+关注</div>
			<div class="appH5_btn_follow">已关注</div>
			<div class="appH5_btn_smaller_blue">按钮</div>
			<div class="appH5_btn_smaller_orange">新增</div>
			<div class="appH5_btn_save">保存</div>
			<div class="appH5_btn_cancel">取消</div>
		</div>
        <h2>示例表格</h2>
        <div class="appH5_panel">
            <table class="appH5_table">
                <tr>
                    <th class="text-left">名称</th>
                    <th class="text-right">今年(单)</th>
                    <th class="text-right">今年(亿)</th>
                    <th class="text-right">累计(亿)</th>
                </tr>
                <tr>
                    <td>信贷ABS</td>
                    <td class="text-right">1</td>
                    <td class="text-right appH5_color_red">5</td>
                    <td class="text-right appH5_color_red">445</td>
                </tr>
                <tr class="appH5_bg_brightred">
                    <td>信贷ABS</td>
                    <td class="text-right">1</td>
                    <td class="text-right appH5_color_red">5</td>
                    <td class="text-right appH5_color_red">445</td>
                </tr>
				<tr class="appH5_bg_brightred appH5_detail_tr">
                    <td colspan=4 class="appH5_font_smaller appH5_color_Lightpink">偿付报告已出，尚未支付</td>
                </tr>
                <tr>
                    <td class="fontBold">总计</td>
                    <td class="text-right fontBold">2</td>
                    <td class="text-right appH5_color_red fontBold">10</td>
                    <td class="text-right fontBold appH5_color_red">890</td>
                </tr>
            </table>
        </div>
		<h2>证券示例表格</h2>
        <div class="appH5_panel appH5_panel_mb">
			<table class="appH5_table">
				<tr>
					<th>简称</th> 
					<th class="text-right">
						初始(亿)
					</th>
					<th class="text-right">
						利率
					</th> 
					<th class="text-right">
						期限(年)
					</th> 
					<th class="text-center">
						量化评级
					</th>
					<th class="text-right">
						类型
					</th>
				</tr> 
				<tr>
					<td>A</td>
					<td class="text-right appH5_color_red">
						1.50
					</td> 
					<td class="text-right appH5_color_skyblue">
						4.85
                    </td> 
					<td class="text-right appH5_color_skyblue">
						0.70
					</td> 
					<td class="text-right text-center appH5_color_skyblue">
						AAA
					</td>
					<td class="text-right">
						过手
					</td> 
			    </tr>
				<tr>
					<td>A</td>
					<td class="text-right appH5_color_red">
						1.50
					</td> 
					<td class="text-right appH5_color_skyblue">
						4.85
                    </td> 
					<td class="text-right appH5_color_skyblue">
						0.70
					</td> 
					<td class="text-right text-center appH5_color_skyblue">
						AAA
					</td>
					<td class="text-right">
						过手
					</td> 
			    </tr>
			</table>
		</div>
		<h2>小图标</h2>
		<div class="appH5_panel">
            <img class="appH5_arrowDown" src="../../public/image/arrowdown.png" />
            <img class="appH5_commentIcon" src="../../public/image/commenticon.png" />
            <img class="appH5_unfollowIcon" src="../../public/image/unfollowicon.png" />
            <img class="appH5_followIcon" src="../../public/image/followicon.png" />
		</div>
		<h2>顶部有返回按钮的页面图标</h2>
		<div class="appH5_panel">
            <img class="appH5_returnIcon" src="../../public/image/returnicon.png" />
            <img class="appH5_threeDot" src="../../public/image/threedot.png" />
		</div>
		<h2>分割线</h2>
		<div class="appH5_panel">
		    <div class="appH5_border_top">borderTop</div>
            <div class="appH5_border_bottom">borderBottom</div>
		</div>
		<h2>查看更多</h2>
		<div class="appH5_panel">
		    <div class="appH5_look_more">查看更多专家</div>
		</div>
	</div>
</div>
</template>
<script>
import 'amfe-flexible';

export default {
  
};
</script>

