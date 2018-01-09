<template>
  <div class="appH5_body">
    <div class="appH5_content">
    
        <h2>区域标题</h2>
        <div class="appH5_panel">
    	    <div class="appH5_title">
		       区域标题
	        </div>
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
	        		<td class='appH5_white_space'>产品名称</td>
	        		<td colspan="3">这是一个产品名称，这是一个产品名称，这是一个产品名称</td>
	        	</tr>
	        	<tr>
	        		<td class='appH5_white_space'>证券类型</td>
	        		<td>夹层级</td>
	        		<td class='appH5_white_space'>评级</td>
	        		<td>AAA</td>
	        	</tr>
	        	<tr>
	        		<td class='appH5_white_space'>证券类型</td>
	        		<td>夹层级</td>
	        		<td class='appH5_white_space'>资产类型</td>
	        		<td>A应收账款</td>
	        	</tr>
	        	<tr>
	        		<td colspan="4">项目描述</td>
	        	</tr>
	        	<tr>
	        		<td colspan="4" class="appH5_color_white">支持描述支持描述支持描述支持描述支持描述支持描述支持描述支持描述支持描述支持描述支持描述支持描述</td>
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
                    <th>名称</th>
                    <th>今年总数</th>
                    <th>今年总额(亿)</th>
                    <th>累计总额(亿)</th>
                </tr>
                <tr>
                    <td>信贷ABS</td>
                    <td class="text-right">1</td>
                    <td class="text-right appH5_color_red">5</td>
                    <td class="text-right appH5_color_red">445</td>
                </tr>
                <tr>
                    <td>信贷ABS</td>
                    <td class="text-right">1</td>
                    <td class="text-right appH5_color_red">5</td>
                    <td class="text-right appH5_color_red">445</td>
                </tr>
                <tr>
                    <td class="fontBold">总计</td>
                    <td class="text-right fontBold">2</td>
                    <td class="text-right appH5_color_red fontBold">10</td>
                    <td class="text-right appH5_color_red fontBold">890</td>
                </tr>
            </table>
        </div>
		<h2>小图标</h2>
		<div class="appH5_panel">
            <img class="appH5_arrowDown" src="../../assets/arrowDown.png" />
            <img class="appH5_commentIcon" src="../../assets/commentIcon.png" />
            <img class="appH5_unfollowIcon" src="../../assets/unfollowIcon.png" />
            <img class="appH5_followIcon" src="../../assets/followIcon.png" />
		</div>
		<h2>顶部有返回按钮的页面图标</h2>
		<div class="appH5_panel">
            <img class="appH5_returnIcon" src="../../assets/returnIcon.png" />
            <img class="appH5_threeDot" src="../../assets/threeDot.png" />
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

