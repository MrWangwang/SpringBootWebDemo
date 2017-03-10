// JavaScript Document

//**
$(function(){
	$.extend({
		todayDate:function(){	//获取昨天的日期
			var date = new Date();
			var year = date.getFullYear();
			var month = $.toAllDate((date.getMonth()+1));
			var day = $.toAllDate(date.getDate()-1);
			return year+'-'+month+'-'+day;
		},
		toAllDate:function(t){	//对日期格式化	t是数字天数
			return t<10 ? ''+'0'+t: t;		
		},
		modifyDate:function(t){	//返回修改日期	t是数字天数
			var m_date = new Date(); 
			m_date.setDate(m_date.getDate()-t);
			var y = m_date.getFullYear();    
			var m = $.toAllDate(m_date.getMonth()+1); 
			var d = $.toAllDate(m_date.getDate());    
			return y+"-"+m+'-'+d;
		},
		dataRange:function(t1,t2,p){	//返回选定日期的日历范围， p是分隔符
			//t1 开始天数，默认为今天
			//t2 选择日期范围的天数
			var t1 = t1||0;
			var t2 = t2-t1;
			return $.modifyDate(t1)+p+$.modifyDate(t2);
		},
		dataFormat:function(){	//格式化时间日期，返回今天的日期
			var date = new Date();
			var Year= date.getFullYear(); 
			var Month= $.toAllDate((date.getMonth()+1));
			var Day = $.toAllDate(date.getDate());
			return Year+'-'+Month+'-'+Day;
		},
		keyEnter:function(ele){	//键盘回车事件
			$(document).keydown(function(e){
				if(e.keyCode=='13'){
					$(ele).click();
				}
			}); 
		},
		dataSub:function(str,num,label){	//传参格式化时间
			return str = str.substring(0,num).replace(/-/g,label);
		},
		selfReturnTop:function(dom,dom2){	//返回顶部锚点连接 dom 需要添加的标签名 dom2整体部分元素名
			var returnTOP = '<div class="'+dom+'" title="返回顶部"></div>';
			var _this = '.'+dom;
			var Wright = ($(window).width()-$(dom2).width())/2;
			if(Wright>0){
				Wright = ($(window).width()-$(dom2).width()+10)/2;
			}else{
				Wright = 0;
			}
			$(dom2).append(returnTOP);
			$(_this).on('click',function(){
				$('body,html').animate({'scrollTop':0},'fast');
			}).css('right',Wright);
			$(_this).hover(function(){$(_this).addClass('current');},function(){$(_this).removeClass('current');});
			$(window).scroll(function(){
				var windowH = $(window).scrollTop();				
				if(windowH>75){
					$(_this).fadeIn();
				}else if(windowH<=75){
					$(_this).fadeOut();
				}
			});
		},
		selfArraySubtract:function(arr1,arr2,arr3){			//两个数组取出差集
			 for(var i=0; i < arr1.length; i++){   
		        var flag = true;   
		        for(var j=0; j < arr2.length; j++){   
		            if(arr1[i] == arr2[j])   
		            flag = false;   
		        }   
		        if(flag)   
		        arr3.push(arr1[i]);   
		    }
			return arr3;
		},
		selfArrayPop:function(arr){		//数组排序
			return arr.sort(function(a,b){
				return a-b;
			});
		},
		selfGetImgName:function(path){	//获取图片路径
			var pos1 = path.lastIndexOf('/');
			var pos2 = path.lastIndexOf('\\');
			var pos = Math.max(pos1, pos2)
			if( pos<0 ){
				return path;
				
			}else{
				return path.substring(pos+1);
				
			}
		}
		/*selfCheckImgSize:function(target,size,flag){	//判断上传图片大小
			if(this.length == 0) return this;
			var flag = true;
			var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
		    var fileSize = 0;
		    if (isIE && !target.files)
		    {
		        var filePath = target.value;
		        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
		        var file = fileSystem.GetFile (filePath);
		        fileSize = file.Size;
		    } else {
		        fileSize = target.files[0].size;
		    }
		    var fsize = fileSize / 1024;    //kb
		    if(parseInt(fsize) >= parseInt(size)){
		        alert('文件过大');
		        flag = false;
		    }
		    return flag;
		}*/
	});
	//时间日期矫正
	var wu_sj=$.todayDate();
	var wu_le=wu_sj.length-2;
	var wu_riqi=$.modifyDate(7);
	if(wu_sj.substr(wu_le)=="00"){
		var wu_jz_a=parseInt(wu_riqi.substr(wu_le,2))+6;
		var wu_jz_b=wu_riqi.substr(0,wu_le)+wu_jz_a;
		$.todayDate=function(){
			return wu_jz_b;
		}
	}
	
	$.fn.extend({
		selfPosition:function(){	//元素垂直视窗和水平视窗的属性 
			if(this.lenth ==0) return this;
			var a =new Array();
			a[0]=($(window).height()-this.height())/2;
			a[1]=($(window).width()-this.width())/2;
			return a;
		},
		autoHeight:function(){	//补足头部和尾部的留白部分 
			if(this.lenth ==0) return this;
			var bodyHeight = ($(window).height())-($('.header').outerHeight(true))-($('.footer').outerHeight(true));
			this.css('height',bodyHeight);
		},
		autoCenter:function(dom1,dom2,dom3){	//dom1 = allMain dom2 = allBox dom3 = otherLog	//居中的组合布局
			if(this.lenth ==0) return this;
			var BH = ($(window).height())-($('.header').outerHeight(true))-($('.footer').outerHeight(true));
			var CH =parseInt($(dom1).css('paddingTop'))*2;
			var AH = BH-CH+'px';
			$(dom1).css('height',AH);
			var ZH = $(dom2).offset().top;	//上边距 
			var YH = $(window).height() - (ZH + $('.footer').outerHeight(true)+parseInt($('.allMain').css('paddingTop')))+'px';
			$(dom2).css('height',YH);
			var XH = parseInt(YH) - parseInt($(dom3).css('height'));
			XH = XH/2+'px';
			$(dom3).css('marginTop',XH);
		},
		countS:function(){	//页面跳转倒计时 
			if(this.lenth ==0) return this;
			var _this= this;
			setInterval(count,1000);
			var num=5;
			function count(){
				num--;
				num>0?_this.text(num):location.href='/FusionAbility/user/login.action';
			};	
		},
		buttonHover:function(classname){	//为鼠标经过添加样式 
			if(this.lenth == 0) return this;
			this.hover(function(){$(this).addClass(classname);},function(){$(this).removeClass(classname);});
		},
		selfButtonHover:function(classname){	//鼠标经过样式
			if(this.lenth == 0) return this;
			this.hover(function(){$(this).addClass(classname).siblings().removeClass(classname);});
		},
		buttonClick:function(cname){	//点击按钮添加样式
			if(this.length==0) return this;
			this.toggle(function(){$(this).addClass(cname).siblings().removeClass(cname);},function(){$(this).removeClass(cname);});
		},
		buttonCurrent:function(cname){	//鼠标点击切换样式
			if(this.length==0) return this;
			this.click(function(){$(this).addClass(cname).siblings().removeClass(cname);});	
		},
		selfDialog:function(){	//开启对话框
			if(this.lenth == 0) return this;
			var _this = $(this);
			$('.bodyCover').css('height',$(document).height()).show();
			this.css({
				top:this.selfPosition()[0],
				left:this.selfPosition()[1],
				position:'fixed'
			});
			this.show();
			$(window).resize(function(){
				_this.css({
					top:_this.selfPosition()[0],
					left:_this.selfPosition()[1],
					position:'absolute'
				});
			});
			if(this.find('.IDCopy').size()){	//复制文本功能
				if($.browser.mozilla){
					$(".IDCopy").click(function(){
						alert('您的浏览器不支持此功能，请手动复制！')
					})
				}else{
					$(".IDCopy").zclip({
						path: "../js/comm/ZeroClipboard.swf",
						copy: function(){
						return $(this).prev().text();
						},
						beforeCopy:function(){/* 按住鼠标时的操作 */
							$(this).css("color","orange");
						},
						afterCopy:function(){/* 复制成功后的操作 */
							alert('当前信息已复制到剪贴板！');
				        }
					});
				}
			}			
		},
		closeDialog:function(){		//关闭对话框
			if(this.lenth ==0) return this;
			this.parents('.appAddDialog').hide();
			this.parents('.newAppDialog').hide();
			this.parents('.dialogPw').hide();
			this.parents('.dialogInfor').hide();
			this.parents('.termsService').hide();
			this.parents('.configDialog').hide();
			this.parents('.Codedialog').hide();
			this.parents('.privacyPolicy').hide();
			this.parents('.userProDialog').hide();
			this.parents('.labelDialog').hide();
			this.parents('.pushDialog').hide();
			this.parents('.pushSetNoDia').hide();
			this.parents('.funnelDialog').hide();
//			location.reload();
			$('.bodyCover').hide();
		},
		selfDropDown:function(){	//下拉切换动作
			if(this.length == 0) return this;
			var _this=this.find('.eleHidden');
			this.find('.eleHidden').toggle();
		},
		selfTabs:function(cname,dom){	//tab折页	cname 点击按钮切换的类名，dom 需要显示和隐藏的元素名
			if(this.length == 0) return this;
			this.click(function(){
				var num = $(this).index();
				$(this).addClass(cname).siblings().removeClass(cname);
				$(dom).eq(num).show().siblings(dom).hide();
			});
		},
		selfDropdown:function(dom){	//下拉动作条
			if(this.length == 0) return this;
			var dom = "."+dom;
			$(this).click(function(){
				$(dom).toggle();
			});
		},
		selfSlidedown:function(){	//下拉切换
			if(this.length == 0) return this;
			$(this).click(function(){
				$(this).next().slideToggle();
			});
		},
		selfMaxText:function(num,ele){	//剩余字数提示
			if(this.length == 0) return this;
			this.keyup(function(){
				var N = $(this).val().length;
				N = num-N;
				var notice = '剩余'+N+'字';
				$(ele).text(notice);
			});
		},
		selfRadio:function(){	//
			if(this.length == 0) return this;
			$(this).each(function(){
				$(this).click(function(){
					$(this).addClass('current').siblings().removeClass('current');
				});
			});
		},
		selfTextShow:function(){	//把文本框的内容同步 
			if(this.length == 0) return this;
			this.keyup(function(){
				var text = $(this).val();
				$('.mobileText').text(text);
			});
		},
		selfToggleDown:function(dom1,dom2,cname){	//点击展开下拉
			if(this.length == 0) return this;
			$(this).click(function(e){
				e.stopPropagation();
				$(dom1).addClass(cname);
				var aaa = $(this).find(dom2).length;
				if(aaa){
					$(this).find(dom2).toggle();
				}else{
					$(dom2).toggle();
				};		
				if($(dom2).is(':hidden')){
					$(dom1).removeClass(cname);
				};
				$(document).click(function(){
					$(dom1).removeClass(cname);
					if(aaa){
						$(this).find(dom2).hide();
					}else{
						$(dom2).hide();
					}	
				});
			});
		},
		selfPlacehoder:function(){	//在不兼容placeholder属性的浏览器模拟属性
			if(this.length == 0 || "placeholder" in document.createElement("input")) return this;
			return this.each(function(){
				var _this = $(this);
				var label = "<label class='placeholder'>"+_this.attr('placeholder')+"</label>";
				_this.after(label);
				_this.next('.placeholder').click(function(){
					_this.next('.placeholder').hide();
					_this.focus();
				});
				_this.focus(function(){
					_this.next('.placeholder').hide();
				}).blur(function(){
					if(_this.val()==''){
						_this.next('.placeholder').show();
					}
				});
			});
		},
		selfExplain:function(arr){	//页面图注说明
			$(this).each(function(i){
				var num = i;
				$(this).on('mouseenter',function(e){
					var pageX = e.pageX;
					var pageY = e.pageY;
					var explain = '<div class="explainArea">'+arr[i]+'</div><div class="explainTri"></div>';
					$('body').append(explain);
					var _this = $('.explainArea');
					var triangle = $('.explainTri');
					_this.css({
						left:pageX,
						top:pageY
					});
					_this.css({
						left:'-=35px',
						top:'+=25px'
					});
					triangle.css({
						left:pageX,
						top:pageY
					});
					triangle.css({
						left:pageX,
						top:'+=20px'
					});
				}).on('mouseleave',function(){
					$('div').remove('.explainArea');
					$('div').remove('.explainTri');
				});
			});
		},
		selfTabRadio:function(dom,cname){	//单选按钮切换并且绑定
			if(this.length == 0) return this;
			$(this).click(function(){
				$(this).addClass(cname).parent().siblings().find(dom).removeClass(cname);
				$(this).find(':input').attr('checked','true');
				$(this).parent().siblings().find(dom).find(':input').removeAttr('checked');
			});
		},
/*		
		selfOnCon:function(){	//添加未上线图标指示
			if(this.length == 0) return this;
			$(this).each(function(index){
				var OnConPic = '<div class="OnConPic'+index+' OnConPic">'+index+'</div>';
				var onConPicIndex = '.onConPic'+index;
				$('body').append(OnConPic);
			});
			$(this).each(function(index){
				var thisH = $(this).offset().top;
				var thisL = $(this).offset().left;
				var thisW = $(this).innerWidth();
				alert($('.OnConPic').text());
				$(onConPicIndex).css({
					left:thisL+thisW+15+'px',
					top:thisH+2+'px'
				}).text(index);
				
			});
		}
*/
	});
	//表单校验 by syzx9801@163.com
	/*
	*	参数 notNull //非空校验	range //范围校验	isEmail //邮箱校验 isTel //电话校验 radio //单选按钮校验 checkBox //复选按钮组
	*		name //校验元素和名称	noCheck	//不做校验的元素 ajax	//ajax校验函数名
	*		wrongText //错误提示语 rightText //正确提示语
	*		noticeSpan //提示语所在元素 noticeAll //开启长提示语
	*		submitButton //表单提交按钮 sucFn //表单校验成功后调用函数 failedFn //表单错误调用函数
	*/
	;(function() {
	    $.fn.selfForm = function(opts) {
			if(this.length == 0) return this;
			var _this = $(this);
			//默认值
			var defaults = {
				notNull:[],
				range:[],
				isEmail:[],
				isTel:[],
				radio:[],
				checkBox:[],
				passCom:[],
				submitButton:'.doLogin', 
				name:{},
				noticeSpan:'.checkNotice',	
				noticeAll:false,		
				wrongText:'',
				noCheck:[],
				rightText:'<span class="passSpan"></span>',
				failedFn:function(){return true;},
				sucFn:function(){alert('提交');}
			};
			var opts = $.extend(defaults,opts);
			//点击提交，开始校验
			$(opts.submitButton).click(function(){
				var isNull = [];
				var notRange =[];
				var notEmail =[];
				var notTel = [];
				var hasSing = [];
				var notRadio =[];
				var notCheckBox = [];
				var notCom =[];
				//校验表单校验项是否为空
				if(opts.notNull.length>0){
					for(var i = 0; i<opts.notNull.length;i++){
						var notNullVal = $.trim($(opts.notNull[i]).val()).replace(/\s/g, '');
						if(notNullVal == ''){
							isNull.push(opts.notNull[i]);
						}
					};
				}
				//校验位数
				if(opts.range.length>0){
					for(var j = 0; j<opts.range.length; j++){
						var rangeVal =  $.trim($(opts.range[j][0]).val()).replace(/\s/g, '');
						if(rangeVal.length<opts.range[j][1] || rangeVal.length>opts.range[j][2]){
							notRange.push(opts.range[j][0]);
						}
					}
				}
				//校验是否为邮箱 _\.@chinamobile.com
				if(opts.isEmail.length>0){
					for(var k =0; k<opts.isEmail.length; k++){
						var emailVal = $.trim($(opts.isEmail[k]).val()).replace(/\s/g, '');
					//	if(emailVal.search(/^([a-zA-Z0-9]+[_|\_|\.]?)+@chinamobile.com$/) == -1){
						if(emailVal.search(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_.-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/) == -1){	//测试用
							notEmail.push(opts.isEmail[k]);
						}
					}
				}
				//是否为电话号码 010-12345678|13012345678
				if(opts.isTel.length>0){
					for(var l = 0; l<opts.isTel.length; l++){
						var telVal = $.trim($(opts.isTel[l]).val()).replace(/\s/g, '');
						if(telVal.search(/^(\d{2,5}-\d{7,8}(-\d{1,})?)|(13[0-9]|15[0-9]|18[2-9]|14[2-9]|17[6-8])\d{8}$/)== -1){
							notTel.push(opts.isTel[l]);
						}
					}
				}
				//是否含有特殊字符
				for(var m = 0; m<opts.notNull.length;m++){
					var symbolVal = $.trim($(opts.notNull[m]).val()).replace(/\s/g, '');
					if(symbolVal.search(/^([a-zA-Z0-9\u4e00-\u9fa5]+[_|\_|\.|@|-]?)+$/) == -1){
						hasSing.push(opts.notNull[m]);
					}
				};
				//校验元素一致性
				if((opts.passCom.length>0)&&(opts.passCom.length%2 == 0)){
					$.each(opts.passCom,function(i,v){
						var comA = $(opts.passCom[i]).val().replace(/\s/g, '');
						var comB = '';
						if($(opts.passCom[i+1]).val()==undefined){
							return false;
						}else{
							comB = $(opts.passCom[i+1]).val().replace(/\s/g, '');
						}
						if(comA!==comB){
							notCom.push(opts.passCom[i],opts.passCom[i+1]);
						}
					});
				};
				//单选按钮是否选中
				if(opts.radio.length>0){
					for(var z = 0; z<opts.radio.length;z++){
						var radioVal=$(opts.radio[z]).filter(':checked').size();
						if(radioVal == 0){
							notRadio.push(opts.radio[z]);
						}
					}
				};
				//复选按钮组是否有选择
				if(opts.checkBox.length>0){
					for(var y =0; y<opts.checkBox.length; y++){
						//[多选元素节点名，多选名称，最小值，最大值]
						var checkBoxVal = $(opts.checkBox[y][0]).filter(':checked').size();
						if((checkBoxVal<opts.checkBox[y][2])||(checkBoxVal>opts.checkBox[y][3])){
							notCheckBox.push(opts.checkBox[y][0]);
						}
					}
				}
				//为全部的表单说明区域初始化成功标签
				for(var nullNum=0;nullNum<opts.notNull.length;nullNum++){
					if(opts.noticeAll){
						$(opts.notNull[nullNum]).parent().find(opts.noticeSpan).addClass('passOK').show().html(opts.rightText+opts.name[opts.notNull[e]]+'可以使用');
					}else{
						$(opts.notNull[nullNum]).parent().find(opts.noticeSpan).addClass('passOK').show().html(opts.rightText);
					}
				}
				//循环不符规的元素，为元素的说明与按照优先级填充说明文档 获取的是表单元素所有待填充元素个数，确定循环几次
				for(var n= 0; n<opts.notNull.length; n++){
					//顺序是邮箱>电话>位数>特殊字符>为空								'<span style="color:#ff6562">'+opts.name[notEmail[n]]+'地址不正确'+'</span>'
					$(notEmail[n]).parent().find(opts.noticeSpan).show().html('<span style="color:#ff6562">'+opts.name[notEmail[n]]+'地址不正确'+'</span>').removeClass('passOK');	//邮箱
					$(notTel[n]).parent().find(opts.noticeSpan).show().html('<span style="color:#ff6562">'+opts.name[notTel[n]]+'格式不正确'+'</span>').removeClass('passOK');		//联系方式
					$(notRange[n]).parent().find(opts.noticeSpan).show().html('<span style="color:#ff6562">'+opts.name[notRange[n]]+'位数应在'+$(notRange[n]).attr('minlength')+'-'+$(notRange[n]).attr('maxlength')+'之间</span>').removeClass('passOK');
					$(hasSing[n]).parent().find(opts.noticeSpan).show().html('<span style="color:#ff6562">'+opts.name[hasSing[n]]+'含有特殊字符'+'</span>').removeClass('passOK');
					$(isNull[n]).parent().find(opts.noticeSpan).show().html('<span style="color:#ff6562">'+opts.name[isNull[n]]+'不能为空'+'</span>').removeClass('passOK');
					$(notRadio[n]).parent().find(opts.noticeSpan).show().html('<span style="color:#ff6562">'+opts.name[notRadio[n]]+'必须勾选'+'</span>').removeClass('passOK');
					if(n<notCheckBox.length){
						$(notCheckBox[n]).parent().find(opts.noticeSpan).show().html(
							opts.wrongText+opts.name[notCheckBox[n]]+'需要选择'+opts.checkBox[n][2]+'-'+opts.checkBox[n][3]+'项'
							).removeClass('passOK');
					}
				}
				//循环两次确认项元素
				for(var u=0;u<notCom.length;u+=2){
					$(notCom[u+1]).parent().find(opts.noticeSpan).show().html('<span style="color:#ff6562">'+opts.name[notCom[u]]+'不一致').removeClass('passOK');
				};
				//开始判断，然后提交
		//		alert(isNull+notTel+notEmail+notRange+hasSing+notRadio+notCheckBox+notCom);
				if((isNull.length=='')&&(notTel.length=='')&&(notEmail.length=='')&&(notRange.length=='')&&(hasSing.length=='')&&(notRadio.length=='')&&(notCheckBox.length=='')&&(notCom.length=='')){
					opts.sucFn();
				}else{
					opts.failedFn();
				}
				isNull = [];
				notTel =[];
				notEmail =[];
				notRange =[];
				hasSing =[];
				notRadio =[];
				notCheckBox=[];
				notCom=[];
			});
			//input失去焦点开始校验 顺序是邮箱>电话>位数>特殊字符>为空
			_this.find(':input').each(function(){
				var thisID = '#'+$(this).attr('id');
				var thisClass= '.'+$(this).attr('class');
				$(this).blur(function(){
					if(opts.noticeAll){	//为全部的表单说明区域初始化成功标签
						$(this).parent().find(opts.noticeSpan).show().addClass('passOK').html(opts.rightText+opts.name[thisID]+'可以使用');
					}else{
						$(this).parent().find(opts.noticeSpan).show().addClass('passOK').html(opts.rightText);
					}
					//开始校验
					var _thisVal = $.trim($(this).val()).replace(/\s/g, '');
					if($.inArray(thisID,opts.isEmail)!== -1){
					//	if(_thisVal.search(/^([a-zA-Z0-9]+[_|\_|\.]?)+@chinamobile.com$/) == -1){
						if(_thisVal.search(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_.-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/) == -1){	//测试
							$(this).parent().find(opts.noticeSpan).show().html('<span style="color:#ff6562">'+opts.name[thisID]+'格式不正确'+'</span>').removeClass('passOK');
						}
					};
					if($.inArray(thisID,opts.isTel)!== -1){
						if(_thisVal.search(/^(\d{2,5}-\d{7,8}(-\d{1,})?)|(13[0-9]|15[0-9]|18[2-9]|14[2-9]|17[6-8])\d{8}$/)== -1){
							$(this).parent().find(opts.noticeSpan).show().html('<span style="color:#ff6562">'+opts.name[thisID]+'格式不正确'+'</span>').removeClass('passOK');
						}
					}
					for(var w=0; w<opts.range.length; w++){
						if($.inArray(thisID,opts.range[w])!== -1){
							if(_thisVal.length<opts.range[w][1] || _thisVal.length>opts.range[w][2]){
								$(this).parent().find(opts.noticeSpan).html('<span style="color:#ff6562">'+opts.name[thisID]+'位数应在'+opts.range[w][1]+'-'+opts.range[w][2]+'之间</span>').removeClass('passOK');
							}
						}
					}
					if($.inArray(thisID,opts.notNull)!== -1){
						if(_thisVal.search(/^([a-zA-Z0-9\u4e00-\u9fa5]+[_|\_|\.|@|-]?)+$/) == -1){
							$(this).parent().find(opts.noticeSpan).show().html('<span style="color:#ff6562">'+opts.name[thisID]+'含有特殊字符'+'</span>').removeClass('passOK');
						}
					}
					if($.inArray(thisID,opts.notNull)!== -1){
						if(_thisVal == ''){
							$(this).parent().find(opts.noticeSpan).show().html('<span style="color:#ff6562">'+opts.name[thisID]+'不能为空'+'</span>').removeClass('passOK');
						}
					}
					if($.inArray(thisID,opts.passCom)!== -1){
						for(var t=0;t<opts.passCom.length;t+=2){
							if($(opts.passCom[t]).val().replace(/\s/g, '')!==$(opts.passCom[t+1]).val().replace(/\s/g, '')){
								$(opts.passCom[t+1]).parent().find(opts.noticeSpan).show().html('<span style="color:#ff6562">'+opts.name[opts.passCom[t]]+'不一致').removeClass('passOK');
							}
						}
					}
				});
			});	
			//复选按钮组的blur验证未完成
	/*		for(var w =0;w<opts.checkBox.length; w++){
				var checkBoxVal = $(opts.checkBox[w][0]).filter(':checked').size();
				if((checkBoxVal<opts.checkBox[w][2])||(checkBoxVal>opts.checkBox[w][3])){
					$(opts.checkBox[w][0]).blur(function(){
						$(opts.checkBox[w][0]).parent().find(opts.noticeSpan).html(
							opts.wrongText+opts.name[opts.checkBox[w][1]]+'需要选择'+opts.checkBox[w][2]+'-'+opts.checkBox[w][3]+'项'
							);
					})
				}
			};
	*/		
			//输入项屏蔽空格
			_this.find(':input').each(function(){
				$(this).keyup(function(e){
					if(e.keyCode==32){
						this.value=$(this).val().replace(/\s/g, '');	
					}
				})
			});
			//input获取焦点 提示框内提示语消失
			_this.find(':input').each(function(){
				$(this).focus(function(){
					$(this).parent().find(opts.noticeSpan).html('').hide();
				});
			});
	    };
	})(jQuery);
	
	/*	插件调用	*/
	$('.topNav p').selfToggleDown('.topNav p','.appChange','thisCurrent');	//左侧用户切换APP下拉调用
	$('.dataTitle h3').selfToggleDown('.dataTitle h3','.dataTitle .eleHidden','current');	//页面IOS和安卓切换图片下拉调用
	$('.timeArea').selfToggleDown('.timeArea','.timeList','');	//数据分析事件选择下拉调用
	$('.pushArea').selfToggleDown('.pushArea','.pushList','');	//推送效果页面 推送事件下拉调用
	$('.compareSelect').selfToggleDown('.compareSelect','.comList','');	//推送效果页面 推送时间下拉调用
	$('.pushedTitle h3').selfToggleDown('.pushedTitle h3','.pushedTitle .eleHidden','current');	//推送页面IOS和安卓切换下拉调用
	$('.user_center').selfToggleDown('.header_right','.userDropDown','current');	//头部用户中心下拉调用
	$('.header_right').selfToggleDown('.header_right','.userDropDown','current');	//头部用户中心下拉调用2
	$.selfReturnTop('returnTOP','.main');	//为页面绑定返回顶部的滚动框 
	$('.articleBtnBox font').selfToggleDown('.articleBtnBox font','.articleBtnOl','current');
	
	//按钮经过样式切换调用
	$('.addAndroidIco,.addIOSIco').buttonHover('currentGreen');
	$('.appDetail,.appSet').buttonHover('currentBlue');
	$('.subNav dt').buttonHover('current');
	$('.userDropDown li').buttonHover('current');
	
	// 404页面高度自适应
	$('.errorPage').autoHeight();
	
	//对话框选中事件	app_introduce.jsp页面
	$('.checkbox').click(function(){
		if($(this).is(':checked')){
			$('.checkboxNotice').show();
		}else{
			$('.checkboxNotice').hide();
		}
	});
	//添加新版本对话框	app_introduce.jsp页面
	$('.addAndroidIco,.addIOSIco').click(function(){
		$('.appAddDialog_1').selfDialog();
		
	});
	$('.appAddDialog .dialogClose,.appAddDialog .cancel,.appAddDialog_2 .confirm').click(function(){
		$(this).closeDialog();
		$('.checkboxNotice').hide();
		$('#updatePlatForm')[0].reset();
		$('.checkBox').removeClass('current');
	});
	//添加新应用对话框	application_detail.jsp页面
	$('.addApp').click(function(){
		$('.newAppDialog_1').selfDialog();
		$('.newAppDialog .dialogClose,.newAppDialog_4 .confirm').click(function(){
			$(this).closeDialog();
			$('#addNewAppForm')[0].reset();
			$('.checkBox').removeClass('current');
			$('.checkboxNotice').hide();
		});
	});
	$('.newAppDialog_1 .confirm').click(function(){
		var n = $(".newAppDialog_1 input:checked").length;
		var t = $(".newAppDialog_1 input:text").val().length;
		if(n==0){
			alert('请选择系统平台');
			return false;
		}
		if(t==0){
			alert("请填写应用名称");
			$(".newAppDialog_1 input:text").focus();
			return false;
		}
		if((t>15)||(t<1)){
			alert("应用名称长度不正确");
			$(".newAppDialog_1 input:text").focus();
			return false;
		}
		$(this).closeDialog();
		$(this).parents('.newAppDialog').next('.newAppDialog').selfDialog();
	});
	$('.newAppDialog_2 .confirm,.newAppDialog_3 .confirm').click(function(){
		$(this).closeDialog();
		$(this).parents('.newAppDialog').next('.newAppDialog').selfDialog();
	});
	$('.newAppDialog .previous').click(function(){
		$(this).closeDialog();
		$(this).parents('.newAppDialog').prev('.newAppDialog').selfDialog();
	});
	$('.newAppDialog_4 .confirm').click(function(){
		$(this).closeDialog();
	});
	
	//个人中心对话框	user_center.jsp页面
	$('.modifyPw').click(function(){
		$('.dialogPw').selfDialog();
		$("#password").focus();
		$('.dialogPw .cancel,.dialogPw .dialogClose').click(function(){
			$('#changeUserpswdForm')[0].reset();	//点击关闭重置表单
			$('.checkNotice').html('');
			$(this).closeDialog();
		});
	});
	$('.modifyInfor').click(function(){
		$('.dialogInfor').selfDialog();
		$('.dialogInfor .cancel,.dialogInfor .dialogClose').click(function(){
			$('#updateUserInfoForm')[0].reset();
			$('.checkNotice').html('');
			$(this).closeDialog();
		});
	});
	//用户登陆对话框 login.jsp页面 找回密码
	$('.loginBody h6').click(function(){
		refreshCode("findPsw");
		$('.codeStepA').selfDialog();
		$('.Codedialog .cancel,.Codedialog .dialogClose,.codeStepB .confirm,.codeStepC .confirm').click(function(){
			$(this).closeDialog();
			$('#findPswForm')[0].reset();
			$('#findPswForm .codeError').text('');
			refreshCode("login");
		});
		$('.selfFind').click(function(){
			$(this).closeDialog();
			$('.codeStepC').selfDialog();
		});
	});
	//注册服务条款对话框 register.jsp页面
	$('span.service').click(function(){	//服务条款弹窗
		$('.termsService').selfDialog();
		$('.termsService .cancel,.termsService .dialogClose').click(function(){
			$(this).closeDialog();
		});
		$('.termsService .confirm').click(function(){
			$('.clause').addClass('current');	//点击同意页面服务条款被勾选
			$('#serviceCon').attr('checked','true');
			$(this).closeDialog();
		});
	});
	$('.privacy').click(function(){
		$('.privacyPolicy').selfDialog();
		$('.privacyPolicy .confirm,.privacyPolicy .cancel,.privacyPolicy .dialogClose').click(function(){
			$(this).closeDialog();
		});
	});
	//配置应用界面上传证书对话框 application_config.jsp 页面
	$('.conModify').click(function(){
		$('.uploadDialog').selfDialog();
		var text = $(this).prevAll('span').text();
		if(text=='测试环境'){
			$('input[name="platForEnvir"]').val(0);
		}else{
			$('input[name="platForEnvir"]').val(1);
		}
		var appName = $('.APPNAME').text();
		var appPW = $(this).attr('del');
		var appCertName = $(this).prevAll('.appCertName').text();
		$('.uploadDialog h4').text('为'+appName+'应用上传('+text+')证书');
		$('input[type="password"]').val(appPW);
		if(appCertName!='证书未上传'){
			$('input[type="text"]').val(appCertName);
		}else{
			$('input[type="text"]').val('');
		}
		$('.uploadDialog .dialogClose,.uploadDialog .cancel').click(function(){
			$('.uploadDialog form')[0].reset();
			$(this).closeDialog();
		});
	});
	$('.deleteApp').click(function(){
		$('.delAppDialog').selfDialog();
		$('.delAppDialog .dialogClose,.delAppDialog .cancel,.delAppDialog .confirm').click(function(){
			$(this).closeDialog();
		});
	});
	/*	配置对话框
	$('.selfEventTable a').click(function(){
		var t = $(this).parent().siblings('td:eq(0)').text();
		$('.delEventDialog h4 i').text(t);
		$('.delEventDialog').selfDialog();
		$('.delEventDialog .dialogClose,.delEventDialog .cancel,.delEventDialog .confirm').click(function(){
			$(this).closeDialog();
		});
	});
	*/
	$('.modifyConfig').click(function(){
		$('.modifyDialog').selfDialog();
		$('.modifyDialog .dialogClose,.modifyDialog .cancel,.modifyDialog .confirm').click(function(){
			$(this).closeDialog();
		});
	});
	//用户特征分析对话框调用
	$('.dataTextArea .modify').click(function(){
		$('.userPro').selfDialog();
		$('.userProDialog .dialogClose').click(function(){
			$(this).closeDialog();
			$('#userLabelForm :radio').removeAttr('checked');
			$('.labelRadio span').removeClass('current');
		});
	});
	$('.userPro .confirm').click(function(){
		if($('#userLabelForm :input[name="userLabel"]:checked').length){
			$(this).closeDialog();
			$('.userProCon').selfDialog();
		}else{
			alert('请选择一个标签！');
		}
	});
	$('.userProCon .confirm').click(function(){
		$(this).closeDialog();
		$('#userLabelForm :radio').removeAttr('checked');
		$('.labelRadio span').removeClass('current');
	});
	
	//用户标签对话框
	//删除标签对话框
	$('.btnDelLabel').click(function(){
		$('.delLabel').selfDialog();
		refreshCode('delCode');
		$('.delLabel h6').append('<b>删除标签：'+$(this).parents('tr').find('.labelTagName').text()+'</b>');						//获取用户点击的删除标签行的标签名称添加到对话框头部
		$('.delLabelCon p font,.delLabelCon h6 font').html($(this).parents('tr').find('.labelTagName').text());					//获取用户点击的删除表情行的标签名称添加到删除成功对话框头部和内容介绍部分
		var id = $(this).parents('tr').find('input[name="userTagId"]').val();
		$('#usertagid').val(id);
		//console.log(id);
		$('.labelDialog .dialogClose,.labelDialog .cancel').click(function(){
			$(this).closeDialog();
			$('.delLabel h6 b').remove();
			$('#deleteTagForm')[0].reset();
		});
	});
	//删除标签成功对话框
	$('.delLabelCon .confirm,.delLabelCon .dialogClose').click(function(){
		/*$(this).closeDialog();
		$('#deleteTagForm')[0].reset();
		$('.delLabel h6 b').remove();*/
		window.location.href=window.location.href;
	});
	$('.addNewLabel').click(function(){	//添加用户标签对话框
		var _this = $('.addLabel .dialogClose,.addLabel .confirm,.addLabel .cancel');
		$('.addLabel').selfDialog();
		$('.btnAddLabel :button').eq(0).click(function(){	//添加默认标签对话框
			_this.closeDialog();
			$('.addSysLabel').selfDialog();	
			$('.addSysLabel .dialogClose').click(function(){
				$('.sysFrom')[0].reset();
				$('.checkBox').removeClass('current');
				$(this).closeDialog();
			});
		});
	});	
	//添加默认标签确定对话框
	$('.addSysLabel .cancel').click(function(){
		$(this).closeDialog();
	});
	$('.addSysLabel .confirm').click(function(){
		if($('#unselectedUserTag :checked').length<1){
			alert('至少选择一个默认标签！');
			return false;
		}
		for(var i=0; i<$('#unselectedUserTag :checked').length;i++){
			$($('#unselectedUserTag :checked')[i]).parents('li').clone().appendTo('#newLabelUl');
		}
		$('#userLabelSize').text($('#unselectedUserTag :checked').length);
		$('.addSysLabelCon .confirm').click(function(){	//点击确定关闭
			$(this).closeDialog();
		});
		$(this).closeDialog();
		$('.addSysLabelCon').selfDialog();
		$('.addSysLabelCon .dialogClose').click(function(){		//默认标签关闭按钮事件
			$('.sysFrom')[0].reset();
			$('.checkBox').removeClass('current');
			$('#newLabelUl').empty();
			$(this).closeDialog();
		});
		$('.addSysLabelCon .previous').click(function(){		//返回修改
			$(this).closeDialog();
			$('#newLabelUl').empty();
			$(this).parents('.labelDialog').prev('.labelDialog').selfDialog();
			
		});
	});
	//添加筛选条件标签对话框
	$('.btnAddLabel :button').eq(1).click(function(){	//开启筛选条件1对话框
		$(this).closeDialog();
		$('.filterLabel').selfDialog();
		$('.filterLabel .dialogClose').click(function(){	//关闭筛选1
			$(this).closeDialog();
			$('.formFilter')[0].reset();					//表单重置
			$('tr').remove('.currentTR');					//移除克隆的条件框
			$('.filterLabel').height('425');
		});
	});
	$('.filterLabel .confirm').click(function(){			//开启筛选条件2对话框
		if($('.filterLabel input[type="text"]').length<2){	//筛选条件必须多余2个判断
			alert('至少选择2个筛选条件！');
			return false;
		}
		var flag = true;
		$(".filterLabel input[type='text']").each(function (i) {
            if ($(this).val() == "") {						//判断筛选条件是否有空值
                flag = false;
            }
		});
		if(!flag){
			alert("标签条件不能为空！");
			return false;
		}
		var arrTR = '';									//标签规则文字说明
		var userLabelCodeList = [];						//标签规则编码数组
		var arrForm = [];
		var attCode = '';								//标签规则编码字符串,ajax与数据库比对
		var logCheck = $('.filterLabel input[type="radio"]:checked').val();	//标签组合的逻辑关系 and||or
		var filNum = '1';
		$('.filterLabel input[type="text"]').each(function(i){
			arrForm[i] = $(this).val();
			userLabelCodeList[i] = $(this).attr('del');
		});
		userLabelCodeList = $.selfArrayPop(userLabelCodeList);	//获取了排序后的数组
		for(var i=0; i<arrForm.length; i++){
			if(i==arrForm.length-1){
				arrTR+= '<p>条件'+filNum+'：'+arrForm[i]+'</p>';		//用于页面展示的用户逻辑标签
				attCode+= userLabelCodeList[i];
				filNum++;
			}else{
				arrTR+= '<p>条件'+filNum+'：'+arrForm[i]+'</p><p>'+logCheck+'</p>';		//用于页面展示的用户逻辑标签
				attCode+= userLabelCodeList[i]+logCheck;
				filNum++;
			}
		}; 
		
		$.ajax({
			//判断标签组合的规则 
			 type: "post",
			    url:"getAllRequirementTag.action?appid="+$appid+"&app_platform="+$app_platform+"&requirementTag="+attCode, 
			    dataType: "json", 
			    error: function(data) {
			    	//alert("error");
			    },
			    success: function(data) { 
			    	var statuscode =  data.statuscode;
			    	console.log(statuscode);
			    	if (statuscode == 200) {
			    		$('.filTextR').html(arrTR);	
			    		$('input[name="userLabelStr"]').val(attCode);	//同步到隐藏域
			    		$('.filterLabel .confirm').closeDialog();
			    		$('.filterLabel2').selfDialog();
					}else{
						alert("您已添加过相同的条件标签");
					}
			    }
		});
    }); 
	$('.filterLabel2 .dialogClose').click(function(){	//关闭筛选2
		$(this).closeDialog();
		$('.formFilter')[0].reset();
		$('tr').remove('.currentTR');
	});
	$('.labelDialog .previous').click(function(){
		$(this).closeDialog();
		$(this).parents('.labelDialog').prev('.labelDialog').selfDialog();
	});
	/*	开启筛选条件3对话框	*/
	$('.filterLabel2 .confirm').click(function(){
		if($('.filLabName input').val()=='' || $('.filLabNotice input').val()==''){
			alert('用户标签说明信息不能为空！');
			return false;
		}
		$(this).closeDialog();
		$('.filterLabel3').selfDialog();
		$('.filterLabel3 .dialogClose').click(function(){	//关闭筛选3
			$(this).closeDialog();
			$('.formFilter')[0].reset();
			$('tr').remove('.currentTR');
		});
		var filLabName = '自定义标签: '+ $('.filLabName :text').val() + ' 添加成功!';	//标签名称同步
		$('.filterLabel4 h4').text(filLabName);
	});
	/*	开启筛选条件 4 对话框	*/
	$('.filterLabel3 .confirm').click(function(){ 
		$('#uploadImgForm').ajaxSubmit({
			type: "POST", 
			dataType: "json",
			async: false,
			error: function(data) {
			     alert("文件过大");
			},
			success:function(res){
				$(this).closeDialog();
				console.log(res.statuscode);	//404过大
				$('.filterLabel4').selfDialog();
			}
		}); 
	});
	$('.filterLabel4 .dialogClose,.filterLabel4 .confirm').click(function(){
		window.location.href=window.location.href;
	});
	$('.addLabel .dialogClose').click(function(){
		$(this).closeDialog();
	});
	/*	推送事件收益修改对话框 push_income.jsp页面	*/
	$('.pushSet').live('click',function(){
		$('.pushSetDia').find('.eventName').val('').val($(this).prev('font').text());	//从点击的元素获取关联事件名称加载到对话框中
		var eventTime = $(this).parent().parent().siblings('td:eq(0)').text();	//获取推送时间
		var eventLabel = $(this).parent().parent().siblings('td:eq(1)').text();	//推送类型
		var eventInt = $(this).parent().parent().siblings('td:eq(2)').text();	//推送用户标签
		var pushCount = $(this).parent().parent().siblings('td:eq(3)').text();   //pushCount
		var eventTaskID = $(this).parent().parent().siblings('.taskId').text();	//
		var _this = $(this).parent().parent();
		$('.pushSetDia').find('.eventTag').text('').text(eventTime+'+'+eventLabel+'+'+eventInt);	//为eventTag里赋值，值为表格前三个td内容和
		$('.pushCon').find('.eventTaskID').val('').val(eventTaskID);
		$('.pushCon').find('.pushCount').val('').val(pushCount);
		$(this).parent().parent().parent().addClass('current');
		$('.pushNameList li').find('font').live('click',function(){
			$(this).addClass('current').parent().siblings().find('font').removeClass('current');	//
			var pushName = $(this).parent().find('span').text();
			var eventCount = $(this).parent().find('i').text();
			$('.eventCount').val('').val(eventCount);			//关联count			
			$('.pushSetDia').find('.eventName').val('').val(pushName);
		});
	});
	$('.pushSetDia .confirm').click(function(){
		$(this).closeDialog();
		$('.pushCon').selfDialog();
		$('.pushCon').find('.eventName').val('').val($('.pushSetDia').find('.eventName').val());//把关联收益名称加载到确定对话框的事件名称		
		$('.pushCon .pushBox span:eq(0)').text('').text($('.pushSetDia .pushBox span:eq(0)').text());	//获取第一个对话框的事件名称加载到对话框的对应位置中
		$('.pushCon .pushBox span:eq(1)').text('').text($('.pushSetDia .pushBox span:eq(1)').text());
		$('.pushCon .cancel,.pushCon .dialogClose').click(function(){
			$(this).closeDialog();
		});
	});
	$('.pushCon .confirm').live('click',function(){
		updateEvent();
		showPushImcomeTableInfo();
		$(this).closeDialog();
	});
	$('.pushSetNoDia .cancel,.pushSetNoDia .dialogClose').click(function(){
		$(this).closeDialog();
	});
	$('.pushSetDia .cancel,.pushSetDia .dialogClose').click(function(){
		$(this).closeDialog();
	});
	
	/*	杂项		*/
	//navLeft左侧导航功能 navLeft.jsp页面
	$('.mainNav').find('li').hover(function(){
		$(this).addClass('current').siblings('li').removeClass('current');
	},function(){
		$(this).removeClass('current');
	});
	$('.mainNav').find('li').click(function(){
		var _this = $(this);
		_this.addClass('current').siblings('li').removeClass('current');
		_this.next('dl').toggle().siblings('dl').hide();
		_this.find('font').addClass('show');		
		_this.siblings('li').find('font').removeClass('show');
		if(_this.next('dl').is(':hidden')){
			_this.find('font').removeClass('show');
		}
	});
	//user_label 页面
	//筛选条件切换AND和OR的功能
	$('.FilLabBox').toggle(function(){
		$('.FilLabTabs').css('marginLeft','50px').text('OR');
		$(this).find('input').eq(1).attr('checked','true').siblings().removeAttr('checked');
	},function(){
		$('.FilLabTabs').css('marginLeft','0px').text('AND');
		$(this).find('input').eq(0).attr('checked','true').siblings().removeAttr('checked');
	});
	 
	//选择类别和选择逻辑关系下拉
	$('.filterTab p').each(function(){
		$(this).click(function(e){
			e.stopPropagation();
			var _this = $(this);
			$(this).find('span').toggle();
			//此处遍历对象拼接成模拟select放到当前的对话框中
			_this.find('userLabelList').empty();
			//放置默认标签的列表
			var userLabelAll = [];	//当前用户可选择的默认标签
			for(var i=0;i<userLabelData.data.length; i++){
				userLabelAll.push(userLabelData.data[i].name);	//用户可选择的标签编码
			}
			var userLabelList = ''
			var userLabelAll2 = [];	//用户选择过的默认标签名
			var num = _this.parents('.mainTR').siblings('.mainTR').find('input[type="text"]').size();
			var val = _this.parents('.mainTR').siblings('.mainTR').find('input[type="text"]'); 
			for(var i=0;i<val.length;i++){ 
				var ttt = $(val[i]).val(); 
				if(ttt != ""){ 
					userLabelAll2.push(ttt);
				}
			}
			var userLabelAll3 = [];
			$.selfArraySubtract(userLabelAll,userLabelAll2,userLabelAll3);
			var userLabelList = ''
			for(var i=0;i<userLabelAll3.length; i++){
				for(var j=0;j<userLabelData.data.length;j++){
					if(userLabelData.data[j].name==userLabelAll3[i]){
						userLabelList += '<i del="'+userLabelData.data[j].code+'">'+userLabelAll3[i]+'</i>'
					}
				}
			}
			_this.find('.userLabelList').html(userLabelList); 
			_this.find('.userLabelList i').click(function(){	//同步用户选择的默认标签同步到input框中
				var filterI = $(this).text();
				var filrerD = $(this).attr('del');
				$(this).parent().siblings('input').val(filterI).attr('del',filrerD);
			});
			$(document).click(function(){
				_this.find('span').hide();
			});
		});
	});
	//选择类别和选择逻辑关系同步到input中
	$('.userLabelList i').live('click',function(){
		var filterI = $(this).text();
		console.log(filterI)
		$(this).parent().siblings('input').val(filterI);
	});
	//增加筛选条件
	$('.addFilBtn').click(function(){
		var delFilBtn = '<span class="delFilBtn" title="删除该筛选条件">一</span>';
		if($('.filterTab tr').size()==5 || $('.filterTab tr').size()==userLabelData.data.length){	//满足了条件关闭增加条件按钮
			return false;
		}else{
			$('.filterTab tr:first').clone(true).appendTo('.filterTab').removeAttr('del');
			$('.filterLabel').animate({
				top:'-=40px'
			})
			var cloneDOM = $('.filterTab tr:last');	//复制出来的节点元素
			cloneDOM.find('input[type="text"]').attr('value','');	//复制的节点元素清空内容
			var cloneNUM = $('.filterTab tr').size();	//获取当前的条件数目，给name赋值
			cloneDOM.addClass('currentTR');	
			cloneDOM.find('th').text('标签条件'+cloneNUM+'：');	//复制的节点元素更改提示语
			cloneDOM.find('input').attr('name',function(){return this.name+cloneNUM;});
			cloneDOM.find('.filterInput').css('width','159px');
			cloneDOM.find('td:eq(0)').append(delFilBtn);		//添加删除条件筛选按钮
		}
	});
	//删除筛选条件
	$('.delFilBtn').live('click',function(){
		$('.filterTab tr:last').remove('.currentTR');
		$('.filterLabel').animate({
			top:'+=40px'
		});
	});	
	
	/*	filterLabel3事件	*/
	//为上传按钮绑定事件
	$('.imgContent font').on('click',function(){
		$(this).siblings(':file').click();
	});
	//当file改变时	用户标签图片区
	$('.imgContent :file').change(function(){
//		var flagA = $.selfCheckImgSize(this,1000);		//获取文件大小
//		if(flagA){
		var fileName = $(this).val();
		var file = /\.[^\.]+/.exec(fileName);
		if(file!='.png'){
			alert('图片格式不正确，请选择png文件上传');
	        return false;
	    }
		$(this).siblings(':text,:radio').val($(this).val()).siblings(':radio').attr('checked','true');	//上传图片同步到input中
		$('input[name="userLabelImg"]').val($.selfGetImgName(fileName));
		//缺少文件大小判断
		$('.checkButton').removeClass('checkButtonCurret');
		$('.checkButton :radio').removeAttr('checked');
		var files = !!this.files ? this.files : [];	//同步到侧边图片区
	    if (!files.length || !window.FileReader) return;
	    if (/image/.test( files[0].type)){
	        var reader = new FileReader();
	        reader.readAsDataURL(files[0]);
	        reader.onloadend = function(){
	        	$('.imgShow').append('<img src="'+this.result+'" width="60px" height="60px" id="userLabelImg"/>').css("background", "#FFF");
	        };
	    };
/*		}else{
			$('.checkButton').removeClass('checkButtonCurret');
			$('.imgShow').css('background','#FFF');
		}
*/
	
	});
	//当点击默认图片按钮时
	$('.checkButton').click(function(){
		$(this).addClass('checkButtonCurret').find(':radio').attr('checked','true');
		$(this).siblings('p').find(':radio').removeAttr('checked').attr('value','');
		$(this).siblings('p').find(':file').attr('value','');
		$(this).siblings('p').find(':text').attr('value','');
		$('.imgShow img').remove('#userLabelImg');
		$('.imgShow').css("background", "url(../image/user_profile_4.png) no-repeat");
		//$(".imgShow").css("background-image", "url(../image/userLabelImg/default.png)");
	});
	
	//验证码刷新
	$('.idcodeImg').hover(function(){
		$('.spanCover').show();
		$('.reflashCode').show();
	},function(){
		$('.spanCover').hide();
		$('.reflashCode').hide();
	});
	$('.reflashCode').click(function(){
		$('.spanCover').hide();
		$('.reflashCode').hide();
		refreshCode("register");
	});
	//注册页面对话框居中显示
	$('.registerBody').css({	
		position:'absolute',
		top:$('.registerBody').selfPosition()[0]+'px',
		left:$('.registerBody').selfPosition()[1]+'px'
	});
	//注册页面placeholder调用
	$("#registerForm input[type='text'],#registerForm input[type='password']").selfPlacehoder().click(function(){
		$(this).find('.placeholder').hide();
	});
});

//用户中心图注
var userCenterArr = ['<h2>【图表说明】</h2><table><tr><th>SP ID</th><td>是用户用于接入消息推送平台及配置服务器侧SDK时的唯一标识</td></tr><tr><th>SP KEY</th><td>是用户用于接入消息推送平台及配置服务器侧SDK时的密钥</td></tr></table>'];	
//用户注册成功后的引导页
var registerInfor = ['<h2>【图表说明】</h2><table><tr><th>SP ID</th><td>是 用户用于接入消息推送平台及配置服务器侧SDK时的唯一标识</td></tr></table>'
                     ,'<h2>【图表说明】</h2><table><tr><th>SP KEY</th><td>是 用户用于接入消息推送平台及配置服务器侧SDK时的密钥</td></tr></table>'];
//应用列表页
var appListArr = ['<h2>【图表说明】</h2><table><tr><th>APP KEY</th><td>是应用的唯一标识，在集成客户端SDK时，您需要把APP KEY 写入配置文件中</td></tr></table>',
                  '<h2>【图表说明】</h2><table><tr><th>APP KEY</th><td>是应用的唯一标识，在集成客户端SDK时，您需要把APP KEY 写入配置文件中</td></tr></table>',
                  '<h2>【图表说明】</h2><table><tr><th>APP KEY</th><td>是应用的唯一标识，在集成客户端SDK时，您需要把APP KEY 写入配置文件中</td></tr></table>'];
//整体数据概况页
var alldataArr = ['<h2>【图表说明】</h2><table><tr><th>新增用户：</th><td>数据观测期内第一次成功启动包含SDK应用的用户，卸载后的二次安装不算作新增用户</td></tr><tr><th>活跃用户：</th><td>数据观测期内（非初次）启动过应用的用户数量（按用户去重）</td></tr><tr><th>日活跃率：</th><td>数据观测期内当日的活跃用户/累计用户数*100%</td></tr><tr><th>启动次数：</th><td>数据观测期内每次打开应用视为一次启动，应用退出、关闭或长时后台运行则视为启动结束</td></tr><tr><th>启动次数|每日人均：</th><td>数据观测期内应用的启动次数/活跃用户数</td></tr><tr><th>使用时长|单次平均：</th><td>数据观测期内应用的使用时长/启动次数</td></tr><tr><th>累计用户：</th><td>截止统计时间内已集成SDK服务的所有应用用户数量</td></tr><tr><th>累计启动：</th><td>截止统计时间内所有启动次数的总和</td></tr><tr><th>累计使用时长：</th><td>截止统计时间内累计使用时间的总和</td></tr></table>'
                  ,'<h2>【图表说明】</h2><p>您可以查看观测期内版本排名前10的各类用户分布情况</p><table><tr><th>新增用户：</th><td>数据观测期内使用该版本的新增用户数量</td></tr><tr><th>活跃用户：</th><td>数据观测期内使用该版本的活跃用户数量</td></tr><tr><th>累计用户：</th><td>截止统计时间内已集成SDK服务的所有应用用户数量</td></tr></table>'
                  ,'<h2>【图表说明】</h2><p>您可以查看观测期内TOP10渠道的各类用户分布情况</p><table><tr><th>新增用户：</th><td>数据观测期内通过该渠道的新增用户数量</td></tr><tr><th>活跃用户：</th><td>数据观测期内通过该渠道的活跃用户数量</td></tr><tr><th>累计用户：</th><td>截止统计时间内已集成SDK服务的所有应用用户数量</td></tr></table>'];
//用户趋势分析
var userTrendArr = ['<h2>【图表说明】</h2><table><tr><th>新增用户：</th><td>数据观测期内第一次成功启动包含SDK应用的用户，卸载后的二次安装不算作新增用户</td></tr><tr><th>新增用户占比：</th><td>数据观测内新增用户/活跃用户数*100%</td></tr></table>',
                    '<h2>【图表说明】</h2><table><tr><th>活跃用户：</th><td>观测期内（非首次启动）启动过应用的用户数量（按用户去重）</td></tr><tr><th>日活跃率：</th><td>数据观测期内当日的活跃用户/累计用户数*100%</td></tr></table>',
                    '<h2>【图表说明】</h2><table><tr><th>用户总量变化：</th><td>不同观测时间节点的累计用户数量的变化趋势</td></tr><tr><th>7日未登录用户占比：</th><td>当前统计时间至最近7日内未登录的用户数量/累计用户数量*100%</td></tr><tr><th>14日未登录用户占比：</th><td>当前统计时间至最近14日内未登录的用户数量/累计用户数量*100%</td></tr></table>',
                    '<h2>【图表说明】</h2><table><tr><th>新增用户：</th><td>数据观测期内第一次成功启动包含SDK应用的用户，卸载后的二次安装不算作新增用户</td></tr><tr><th>留存用户：</th><td>数据观测期内某日的新增用户在随后的日期中持续使用该应用的用户</td></tr><tr><th>留存率：</th><td>留存用户占当日新增用户的比率（+N日 留存率：用户自新增以来，在N日后还有使用的比例，即+N日的该日留存用户/该日新增用户），留存率是反映渠道推广质量、用户粘性及忠诚度的重要指标</td></tr></table>'];
//用户行为分析
var userBehaviorArr = ['<h2>【图表说明】</h2><table><tr><th>启动次数：</th><td>数据观测期内每次打开应用视为一次启动，应用退出、关闭或长时后台运行则视为启动结束</td></tr><tr><th>人均启动次数：</th><td>当日的应用启动次数/活跃用户数 </td></tr><tr><th>日启动总次数：</th><td>当日启动该应用的所有次数总和</td></tr></table>',
                       '<h2>【图表说明】</h2><table><tr><th>单次使用时长：</th><td>数据观测期内用户单次启动应用的使用时长</td></tr><tr><th>日使用总时长：</th><td>当日该应用所有用户使用时长的总和</td></tr></table>',
                       '<h2>【图表说明】</h2><table><tr><th>使用时段：</th><td>0时到24时中，每个小时内用户的使用情况，以用户启动应用的时间作为时段的归类标准，0点时段指启动时间在该日0:00:00-0:59:59中</td></tr><tr><th>启动次数分布：</th><td>指定日期不同时间段内用户启动应用次数的分布状况</td></tr><tr><th>活跃用户分布：</th><td>指定日期不同时间段内活跃用户的分布状况</td></tr></table>'];
//使用环境分析
var equipmentArr = ['<h2>【图表说明】</h2><p>您可以查看数据观测期内TOP10终端的用户分布</p><table><tr><th>新增用户：</th><td>数据观测期内使用此机型的新增用户数量</td></tr><tr><th>启动次数：</th><td>数据观测期内使用此机型的用户启动次数</td></tr></table>',
                    '<h2>【图表说明】</h2><p>您可以查看数据观测期内TOP10分辨率的用户分布</p><table><tr><th>新增用户：</th><td>数据观测期内使用此分辨率的新增用户数量</td></tr><tr><th>启动次数：</th><td>数据观测期内使用此分辨率的用户启动次数</td></tr></table>',
                    '<h2>【图表说明】</h2><p>您可以查看数据观测期内TOP10操作系统的用户分布</p><table><tr><th>新增用户：</th><td>数据观测期内使用此操作系统的新增用户数量</td></tr><tr><th>启动次数：</th><td>数据观测期内使用此操作系统的用户启动次数</td></tr></table>'];
//自定义事件分析
var eventAnalysisArr = ['<h2>【图表说明】</h2><table><tr><th>Event ID：</th><td>设定自定义事件时代码中的Event ID </td></tr><tr><th>事件数量：</th><td>数据观测时间期内该事件被触发的次数</td></tr><tr><th>达成事件用户数</th><td>某一事件被用户成功触发的用户总数</td></tr><tr><th>事件数/触发用户：</th><td>数据数据观测期内某一事件被触发的数量/触发该事件的用户总数*100%</td></tr><tr><th>事件数/触发次数：</th><td>数据数据观测期内某一事件被触发的数量/触发次数*100%"</td></tr></table>'];
//自定义事件详情页
var eventDetailArr = ['<h2>【图表说明】</h2><table><tr><th>事件数量：</th><td>数据数据观测期内该事件被触发的总数量</td></tr><tr><th>达成事件用户数：</th><td>某一事件被用户成功触发的用户总数</td></tr></table>',
                      '@杨剑清待补充'];
//标签用户特征
var userProfileArr = ['<h2>【图表说明】</h2><p>您可以在【用户标签】中通过设置用户标签实现对用户的细分，从而在【细分用户特征分析】中查看该部分用户的行为数据特征，并可以通过在【消息推送】时选择有效的标签用户，实现在【推送分析】中查看该类用户的推送收益分析。</p><table><tr><th>有效用户数量：</th><td>符合某个标签条件的有效用户数量</td></tr><tr><th>标签更新时间：</th><td>符合某个标签条件的用户列表最终更新时间，当显示计算中时表示此轮用户标签未完成更新，请勿基于用户标签进行推送或数据分析操作。</td></tr><tr><th>数据更新时间：</th><td>选择特定的细分用户后，系统需要经过计算才能完成细分用户各类趋势特征图表的输出，当显示计算中时表示此轮数据计算未完成，请耐心等待。</td></tr></table>',
                      '<h2>【图表说明】</h2><p>该图表从新增用户和活跃用户的变化趋势来反应不同类型用户的整体变化趋势</p><table><tr><th>新增趋势：</th><td>数据观测期内符合细分用户标签条件的应用新增用户的变化趋势</td></tr><tr><th>活跃趋势：</th><td>数据观测期内符合细分用户标签条件的应用活跃用户的变化趋势。</td></tr></table>',
                      '<h2>【图表说明】</h2><table><tr><th>人均启动次数：</th><td>数据观测期内符合细分用户标签条件的用户人均启动次数变化趋势</td></tr><tr><th>单次使用时长：</th><td>数据观测期内符合细分用户标签条件的用户单次使用时长变化趋势</td></tr></table>',
                      '<h2>【图表说明】</h2><p>该图表从用户终端机型、所用机型分辨率、分布地域以及运营商等方面来集中反应细分用户的应用环境特征，仅显示TOP5</p><table><tr><th>终端机型：</th><td>数据观测期内符合细分用户标签条件的用户终端机型分布情况</td></tr><tr><th>分辨率：</th><td>数据观测期内符合细分用户标签条件的用户分辨。</td></tr><tr><th>地域分布：</th><td>数据观测期内符合细分用户标签条件的用户归属地分布情况。</td></tr><tr><th>运营商</th><td>数据观测期内符合细分用户标签条件的用户运营商分布情况</td></tr></table>'];
//推送效果
var pushEffectArr = ['<h2>【图表说明】</h2><table><tr><th>推送总量：</th><td>某次消息推送的目标用户总数量</td></tr><tr><th>下发量：</th><td>某次消息推送已成功下发的总消息数量</td></tr><tr><th>达到量：</th><td>某次消息推送已成功到达终端的总消息数量</td></tr><tr><th>打开量：</th><td>某次消息推送已被用户点击打开的总数量</td></tr></table>'
                     ,'<h2>【图表说明】</h2><table><tr><th>活跃用户：</th><td>数据观测期内（非初次）启动过应用的用户数量</td></tr><tr><th>启动次数：</th><td>数据观测期内应用启动的次数</td></tr><tr><th>使用时长：</th><td>数据观测期内用户的使用时长</td></tr></table>'];
//推送收益
var pushEvaluationArr = ['<h2>【图表说明】</h2><table><tr><th>推送总量：</th><td>某次推送下发的所有消息的总数量</td></tr><tr><th>收益事件：</th><td>您认为可以用于衡量某次推送效果的自定义事件，需要手动设置</td></tr><tr><th>收益事件数量：</th><td>当日收到推送后触发的收益事件的数量</td></tr><tr><th>收益率：</th><td>收益事件数量/推送总量*100%"</td></tr></table>',
                         '<h2>【图表说明】</h2><table><tr><th>收益事件：</th><td>您认为可以用于衡量某次推送效果的自定义事件，需要手动设置</td></tr><tr><th>收益事件数量：</th><td>当日收到推送后触发的收益事件的数量</td></tr><tr><th>收益达成用户数：</th><td>当日收到推送后触发收益事件的用户数（去重后）</td></tr><tr><th>推送转化率：</th><td>收益事件数量/推送总量*100%"</td></tr></table>'];
//用户标签
var userLabelArr = ['<h2>【图表说明】</h2><p>您可以在【用户标签】中通过设置用户标签实现对用户的细分，从而在【细分用户特征分析】中查看该部分用户的行为数据特征，并可以通过在【消息推送】时选择有效的标签用户，实现在【推送分析】中查看该类用户的推送收益分析。</p><table><tr><th>有效用户数量：</th><td>符合某个标签条件的有效用户数量</td></tr><tr><th>标签更新时间：</th><td>符合某个标签条件的用户列表最终更新时间，除定向标签外，我们会定期更新标签以保障标签中的用户真实有效，当显示计算中时表示此轮用户标签未完成更新，请勿基于用户标签进行推送或数据分析操作。</td></tr></table>',
                    '<h2>【图表说明】</h2><p>平台自动按照应用特性预判，智能筛选新增用户、重度用户、流失用户等。</p><p>每个应用中的每类系统默认标签仅能添加一次。</p><p>标签生成后，对应的用户库通过定期更新以保障标签的准确率。</p>',
                    '<h2>【图表说明】</h2><p>平台自动按照应用特性预判，智能筛选新增用户、重度用户、流失用户等。</p><p>每个应用中的每类系统默认标签仅能添加一次。</p><p>标签生成后，对应的用户库通过定期更新以保障标签的准确率。</p>',
                    '<p>通过对系统采集到的用户属性与行为中满足关键条件（渠道、版本、终端）的用户进行组合从而筛选出您的目标用户群体。</p><p>每个应用仅支持添加5个条件筛选标签。</p><p>标签生成后，对应的用户库通过定期更新以保障标签的准确率。</p>',
                    '<p>通过对系统采集到的用户属性与行为中满足关键条件（渠道、版本、终端）的用户进行组合从而筛选出您的目标用户群体。</p><p>每个应用仅支持添加5个条件筛选标签。</p><p>标签生成后，对应的用户库通过定期更新以保障标签的准确率。</p>',
                    '<p>通过对系统采集到的用户属性与行为中满足关键条件（渠道、版本、终端）的用户进行组合从而筛选出您的目标用户群体。</p><p>每个应用仅支持添加5个条件筛选标签。</p><p>标签生成后，对应的用户库通过定期更新以保障标签的准确率。</p>',
                    '<p>通过对系统采集到的用户属性与行为中满足关键条件（渠道、版本、终端）的用户进行组合从而筛选出您的目标用户群体。</p><p>每个应用仅支持添加5个条件筛选标签。</p><p>标签生成后，对应的用户库通过定期更新以保障标签的准确率。</p>'];

//漏斗标签
var funnelArr = ['<h2>【图表说明】</h2><p>您可以通过选择不同的日期，来重新计算和查看转化率漏斗。</p>',
                 '<h2>【图表说明】</h2><p>事件列表中显示了您可以添加进漏斗的自定义事件。</p>']

//验证
$(function(){
	
	/*	用户中心注册信息验证	*/
	$('#updateUserInfoForm').selfForm({
		notNull:['#enterprise','#contacts','#telephone'],
		isTel:['#telephone'],
		submitButton:'.dialogInfor .confirm', 
		name:{'#enterprise':'企业名称','#contacts':'联系人','#telephone':'联系方式'},
		range:[['#enterprise',2,64],['#contacts',2,24]],
		sucFn:updateUserInfoForm
		}
	);

	/*	其他平台登录验证	*/
	$('#otherLoginForm').selfForm({
		notNull:['#otherUserName','#otherPassWord','#idcode'],
		name:{'#otherUserName':'用户名','#otherPassWord':'密码','#idcode':'验证码'},
		noticeSpan:'.formItem',
		wrongText:'<span style="color:#ff6562"></span>',
		rightText:'<span class="passSpan"></span>',
		submitButton:'.otherLoginSubmit',
		sucFn:otherLogin
	});
});


function updateUserInfoForm(){	//用户中心修改注册信息表单提交
	$("#updateUserInfoForm").submit();
}

//其他平台登录
function otherLogin(){
	alert('OK');
}


function toDecimal2(x)
{
    var f = parseFloat(x);
    if (isNaN(f))
    {
        return 0;
    }
    var f = Math.round(x*100)/100;
    var s = f.toString();
    // alert(s);
    if (s == 0)
    	return s;
    var rs = s.indexOf('.');
    if (rs < 0)
    {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

function divide(up, down)
{  
	if (down == 0)
		return 0;
	else
		return up / down;
}

//获取密钥
/**
 * 对str做RSA加密，密钥是key,返回加密好的字符串
 */
function encrypPassword(str, key){
	str = str.split("").reverse().join("");
	var encrypedPwd = RSAUtils.encryptedString(key, str);
	return encrypedPwd;
}
/*<%-- //'<%=request.getContextPath()%>/user/rsaKey.action' --%>
*/   
function rsaKey(element) {  
	$.ajax({
	    cache: true,
	    type: "get",
	    url:'/FusionAbility/user/rsaKey.action', 
	    dataType: "json",
	    async: false,
	    error: function(data) {
	        alert("请刷新页面后重新登录");
	    },
	    success: function(data) {
	    	var wu_data=data;
	    	RSAUtils.setMaxDigits(200);
	    	key = new RSAUtils.getKeyPair(wu_data.publicKeyExponent, "", wu_data.publicKeyModulus);
	    	console.log(element.val());
	    	element.val(encrypPassword(element.val(), key));
	    	console.log(element.val());
	    }
	});    
}



