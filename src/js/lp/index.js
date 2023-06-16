function initYandexMap() {
	if ($("#map1").length > 0)
	{
		ymaps.ready(function () {
			var _ball_bg = './img/map.balloon.svg';
			var _ball_Offset = [-21, -58];
			var _ball_Size = [43, 62];
			var myMap = new ymaps.Map('map1', {
				center: [45.017382, 38.936556],
				zoom: 16,
				controls: ["zoomControl"]
			}, {
				searchControlProvider: 'yandex#search'
			});
			var myPlacemark1 = new ymaps.Placemark([45.017382, 38.937656], {
					balloonContent: "г. Краснодар, Тургеневское шоссе, 20 Д",
					hintContent: "г. Краснодар, Тургеневское шоссе, 20 Д"
				}, {
					iconLayout: 'default#image',
					// Своё изображение иконки метки.
					iconImageHref: _ball_bg,
					// Размеры метки.
					iconImageSize: _ball_Size,
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: _ball_Offset
				});
			myMap.geoObjects.add(myPlacemark1);
		})
	}
}

function initYandexMapWaitOnHover()
{
	function loadScript(url, callback){
		var script = document.createElement("script");

		if (script.readyState){  // IE
			script.onreadystatechange = function(){
				if (script.readyState == "loaded" ||
					script.readyState == "complete"){
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			script.onload = function(){
				callback();
			};
		}

		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	}

	var check_if_load = 0;
	function __load_yandex()
	{
		if (check_if_load == 0)
		{
			/*var instance = $.fancybox.open(
			{
				animationDuration:0,
				afterShow: function( instance, current )
				{
					//console.info( instance );
					$(".fancybox-content").remove();
					instance.showLoading();
				}

			});*/
			check_if_load = 1;
			//animationDuration
			loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function()
			{
				/*instance.hideLoading();
				instance.close();*/
				ymaps.load(initYandexMap);
			});
		}
	}//end_ func


	$('#map1').on("touchstart",function()
	{
		__load_yandex();
	});
	$('#map1').mouseenter(function()
	{
		__load_yandex();
	});
	$('#map1').click(function()
	{
		__load_yandex();
	});
}//end_ func


let firstInitForm = false;

$(".fancybox-gallery").fancybox(
{
	theme : 'light',
	helpers : { thumbs : true },
	openEffect  : 'fade',
	closeEffect : 'fade',
	nextEffect  : 'fade',
	prevEffect  : 'fade',
	'showNavArrows' :   true
});

//	$(".popup").click( function()
$(document).on("click",".popup",function(){
	var _form_id = $(this).attr('href');

	var _form_title = $(this).data('title');
	var _form_comment = $(this).data('comment');
	var _form_name = $(this).data('form_name');
	var _form_type_model_name = $(this).data('form_type_model_name');
	var _form_diler = $(this).data('form_diler');

	var _select_val = $(this).attr('_select_val');

	$(".popup_container .form_title").html(_form_title);

	// console.log($(_form_id).html());

	$.fancybox.open( $(_form_id).html(),
	{
		padding: 0,
		content: $(_form_id).html(),
	//	modal: true,
		scrolling: "no",
		margin: 5,
		/*closeBtn: false,*/
		afterShow: function()
		{


			$(".popup_container input[name='title']").val(_form_title);
			$(".popup_container input[name='comment']").val(_form_comment);
			$(".popup_container input[name='form_name']").val(_form_name);
			$(".popup_container input[name='form_type_model_name']").val(_form_type_model_name);
			$(".popup_container input[name='form_diler']").val(_form_diler);
			$(".popup_container").attr("data-callkeeper_name",_form_title);
			$(".popup_container").attr('data-flash-title',_form_title);





			if ( typeof(_select_val)!="undefined" ) $('.popup_container select').val( _select_val );



		}
	} );
	_init_inputmask();
	if(!firstInitForm){
		initForm()
		firstInitForm = true;
	}
	return false;
});

function _init_inputmask()
{
	$("input[name=phone]").inputmask("8(999) 999-99-99",_option);
	return;
	var _option =
	{
			onKeyValidation: function (key, result) {
				var _text = $(this).val();
				var _first_char = _text.substr(0,1);
				var _two_chars = _text.substr(0,2);
				switch (_first_char)
				{
					case "0":
					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
					case "6":
					case "9":
						$(this).inputmask("8(999) 999-99-99",_option);
					return;
					break;
				}

				switch (_two_chars)
				{
					case "+8":
						$(this).inputmask("9(999) 999-99-99",_option);
					return;
					break;
				}


				switch (key)
				{
					case 43:
					case 229:
						if (_text == "")
						{
							 $(this).inputmask("+9(999) 999-99-99",_option);
							return;
						}
					break;

				}
			}
	}
	$("input[name=phone]").inputmask("9(999) 999-99-99",_option);

}

function initForm()
{

	_init_inputmask();

	$( "body" ).on( "submit", "form:not(#ckWrapper form)", function(e)
		// $( "body" ).on( "submit", "form", function()
	{
		e.preventDefault()
		var l_form_object = $(this);
		$("input,textarea,select",this).closest(".form-group").removeClass("has-danger");
		var l_err = false;
		$(".nacc",this).each( function()
		{
			if ( $(this)[0].tagName=="SELECT" || $(this)[0].tagName=="INPUT" )
			{
				if ( $.trim($(this).val())=="" )
				{
					l_err = true;
					$(this).closest(".form-group").addClass("has-danger");
				}//end_ if
			}//end_ if
		} );

		if ( l_err==true )
		{
			alert("В одном или нескольких полях введены неверные данные");
			return false;
		}//end_ if

		var _form_title = $(this).data('title');
		var _form_name = $(this).data('form_name');
		var _form_type_model_name = $(this).data('form_type_model_name');


		// if (typeof (window.yaCounter93383415) != "undefined") {
		//     if (typeof (window.ym) != "undefined") {
		//         ym(93383415, 'reachGoal', 'lead');
		//         console.log("[ym ok]");
		//     } else {
		//         yaCounter93383415.reachGoal('lead');
		//         console.log("[yaCounter ok]");
		//     }
		// }


		var _form = this;
		sendCallTouchData( {
			"title":_form_title,
			"name":$("input[name=name]",_form).val(),
			"phone":$("input[name=phone]",_form).val()
		});



		$.post( "https://alexsab.ru/lead/jetour/krasnodar/", $(this).serialize()+"&form="+this.id+"&form_title="+_form_title, function( data )
		{
			console.log('form_site :'+ window.location.href);
			console.log('form_name :'+ _form_name);
			console.log('form_type_model_name :'+ _form_type_model_name);
			console.log('form_action :'+ 'send_form');
			console.log('event :'+ 'event_ok');
			console.log('data :', data);
			console.log('answer :', data.answer);

			//ckForms.send( '#'+l_form_object.attr("name") );
			if(data.answer == "OK") {
				$('form').trigger('reset');
				alert("Сообщение успешно отправлено");
			} else if(data.answer == "required") {
				alert(data.message);
			} else if(data.answer == "error") {
				alert(data.error);
			}
			// $.fancybox.close();
		}, "json")
		.done(function() {
			console.log( "second success" );
		})
		.fail(function() {
			console.log( "error" );
		})
		.always(function() {
			console.log( "finished" );
		});

		return false;
	} );
}//end_ func



//==========================================================================================
//== CallTouch
function sendCallTouchData( e_vars )
{
	if ( typeof(e_vars)=="undefined" ) e_vars = [];

	if ( typeof(e_vars["name"])=="undefined" ) e_vars["name"] = "";
	if ( typeof(e_vars["phone"])=="undefined" ) e_vars["phone"] = "";
	if ( typeof(e_vars["title"])=="undefined" ) e_vars["title"] = "";
	if ( typeof(e_vars["calltouch_route_key"])=="undefined" ) e_vars["calltouch_route_key"] = "";

	var l_result = {};

	var l_phone = "";
	var l_name  = "";
	var l_title = "";
	var l_calltouch_route_key = "undefined";

	try
	{
		l_phone = e_vars["phone"];
		l_name  = e_vars["name"];
		l_title = e_vars["title"];
		l_calltouch_route_key = e_vars["calltouch_route_key"];

		l_result.name = l_name;
		l_result.phone = l_phone;
		l_result.title = l_title;
		l_result.calltouch_route_key = l_calltouch_route_key;

		l_result.url = document.location.href;
		l_result.referrer = document.referrer;
		l_result.user_agent = window.navigator.userAgent;

		console.log( "sendCallTouchData", l_result );

		l_result.ya = [];
		l_result.ga = [];
		var clientId = "";
		var trackingId = "";


	//Google
		if ( typeof(ga)!="undefined" && typeof(ga)=="function" )
		{
			try
			{
				ga(function(tracker)
				{
					if ( typeof(ga.getAll)=="function" )
					{
						//Ga list
						var l_ga_list = ga.getAll();


						if ( typeof(l_ga_list)=="object" && l_ga_list.length>0 )
						{
							for( l_key in l_ga_list )
							{
								l_ga = l_ga_list[l_key];
								clientId = l_ga.get('clientId');
								trackingId = l_ga.get('trackingId');

								//new ga push
								l_ga_find = 0;
								for( l_temp_ga_key in l_result.ga )
								{
									l_temp_ga_value = l_result.ga[l_temp_ga_key];
									if ( l_temp_ga_value["trackingId"]==trackingId ) l_ga_find = 1;
								}//end_ for
								if ( l_ga_find!=1 )
								{
									l_result.ga.push( {"type":"list","trackingId":trackingId, "clientId":clientId} );
								}//end_ if
							}//end_ for
							//!!OLD!!
							if ( l_ga_list.length>0 )
							{
								clientId = l_ga_list[0].get('clientId');
								trackingId = l_ga_list[0].get('trackingId');
							}//end_ if
						}//end_ if
					}//end_ if
					//!!OLD!!
					//l_result.push( {"trackingId":trackingId, "clientId":clientId} );
				});
			} catch (err)
			{

				try
				{
					clientId = tracker.get('clientId');
					trackingId = tracker.get('trackingId');

					//new ga push
					l_result.ga.push( {"type":"single","trackingId":trackingId, "clientId":clientId} );
				} catch (err)
				{
				}
			}//end_ try_ catch
		}//end_ if


	//Yandex
		if ( typeof(Ya)!="undefined" && typeof(Ya)=="object" && typeof(Ya.Metrika)=="function" && typeof(Ya.Metrika.counters)=="function" )
		{
			l_ya_counters = Ya.Metrika.counters();
			if ( typeof(l_ya_counters)=="object" && typeof(l_ya_counters.length)!="undefined" && l_ya_counters.length>0 )
			{
				for( var i=0; i<l_ya_counters.length; i++ )
				{
					l_ya_counter = l_ya_counters[i];
					l_ya_counter_type = l_ya_counter.type;
					l_ya_counter_id   = l_ya_counter.id;
					l_ya_client_id = window["yaCounter"+l_ya_counter_id].getClientID();
					l_result.ya.push( {"type":l_ya_counter_type, "trackingId":l_ya_counter_id, "clientId":l_ya_client_id} );
				}//end_ for_ i
			}//end_ if
		}//end_ if
	} catch (err)
	{
	}

	//calltouch SessionId
	l_result.calltouchSessionId = "";
	try
	{
		l_result.calltouchSessionId = window.ct('calltracking_params')[0].sessionId;
	}
	catch(e)
	{
	}


	//console.log( "[[[",l_result );
	console.log( "[[[==",JSON.stringify(l_result) );

	// $.post( "data/calltouch.php", {"data":JSON.stringify(l_result)}, function( data )
	// {
		// console.log( "CallTouch result:", data );
	// });

}//end_ func
//== CallTouch
//==========================================================================================



function _scroll(_this)
{
	var _shift = 0;
	if ($(_this).attr('_shift') != undefined) _shift = $(_this).attr('_shift');

	var _m_shift = 0;
	if ($(_this).attr('_m_shift') != undefined) _m_shift = $(_this).attr('_m_shift');


	var curWidth = $(window).width();
	if (curWidth <= 991) _shift = _m_shift;



	var el = $(_this).attr('href');
	var _pos = $(el).offset().top - $("body").offset().top - _shift;

	$("html,body").animate({ scrollTop: _pos }, 500);
}

function anchor_click()
{
	$('.anchor[href^="#"]').click(function(){
		_scroll(this);
		return false;
	});

	$('.anchor2[href^="#"]').click(function(){

		var _model = $(this).attr("_model");
		if ($('#filter_table select[name=models]').length > 0)
			$("#filter_table select[name=models] option[value='"+_model+"']").prop("selected",true).change();

		var _shift = 0;
		if ($(this).attr('_shift') != undefined) _shift = $(this).attr('_shift');

		var el = $(this).attr('href');
		var _pos = $(el).offset().top - $("body").offset().top;
		$("html,body").animate({ scrollTop: _pos }, 500);
		return false;
	});
}

function init_resp_table()
{
	var i = 1;
	$('.resp_table').each(function(){
		$(this).addClass('resp_table'+i);
		var _add_style = "";
		var j = 1;
		$('th',this).each(function(){
			var _text = $(this).html();
			_text = _text.replace("<br>"," ");
			_text = _text.replace("<br/>"," ");
			_text = _text.replace("</br>"," ");
			_text = _text.replace("/r","");
			_text = _text.replace(/\r|\n/g, '')
			_text = _text.replace(/<\/?[^>]+>/g,'');
			_text = _text.replace(/\s{2,}/g, ' ');
			if (_text != "") _add_style += ".resp_table"+i+ " tr td:nth-child("+j+"):before {content:'"+_text+"'}";
			j++;
		});
		$(this).after("<style>"+_add_style+"</style>");

		i++;
	});
}


function init_agree()
{
	$(document).on("change","input[name='agree']",function(){
		var _form = $(this).closest('form');
		if ($("input[name='agree']:not(:checked)",_form).length == 0)
			$(_form).removeClass("not_agree");
		else
			$(_form).addClass("not_agree");

	});
	$(document).on( "click","form.not_agree input[type='submit'],form.not_agree button[type='submit'],form.not_agree a.submit",function(){
		var _form = $(this).closest('form');
		if ($(_form).hasClass('not_agree')) return false;
	});

	$(document).on( "submit","form",function(){
		if ($(this).hasClass('not_agree')) return false;
	});



	$( "body" ).on('change','.agree',function()
	{
		var _form = $(this).closest('form');
		if ($('.agree:not(:checked)',_form).length == 0)
			$(_form).removeClass("not_agree");
		else
			$(_form).addClass("not_agree");

	});

	$( "body" ).on( "submit", "form", function(){
		if ($(this).hasClass("not_agree")) return false;
	});

}



$.fn.hasAttr = function(name) {
   return this.attr(name) !== undefined;
}

function init_row_toggle()
{
	$(document).on("click",".row_toggle",function(){
		if ($(".row_toggle_container:animated").length == 0)
		{
			if ($(this).hasClass("open"))
			{
				$(this).removeClass("open");
				if ($(this).hasAttr("data-target"))
				{
					$(".row_toggle_container[data-target='"+$(this).attr("data-target")+"']").slideUp();
			//		$(".row_toggle_container[data-target='"+$(this).hasAttr("data-target")+"']").hide();
					$($(this).attr("data-target")).slideUp();
				}
				else
					$(this).next(".row_toggle_container").slideUp();
			//	$(this).next(".row_toggle_container").hide();
			}
			else
			{
				$(this).addClass("open");
				var _parent = $(this).closest('.only_one');
				if (_parent.length > 0)
				{

					$('.row_toggle',_parent).removeClass("open");
					$('.row_toggle_container',_parent).slideUp();
				//	$('.row_toggle_container',_parent).hide();

				}

				if ($(this).hasAttr("data-target"))
				{
					$(".row_toggle_container[data-target='"+$(this).attr("data-target")+"']").slideDown();
			//		$(".row_toggle_container[data-target='"+$(this).hasAttr("data-target")+"']").show();
					$($(this).attr("data-target")).slideDown();
				}
				else
					$(this).next(".row_toggle_container").slideDown();
			//	$(this).next(".row_toggle_container").show();
			}
		}
	});
	$(".row_toggle").each(function(){
		if ($(this).hasClass('open'))
		{
			if ($(this).hasAttr("data-target"))
			{
//				$($(this).attr("data-target")).slideDown();
				$($(this).attr("data-target")).show();
			}
			else
			{
	//			$(this).next(".row_toggle_container").slideDown();
				$(this).next(".row_toggle_container").show();
			}
		}
		else
		{
			if ($(this).hasAttr("data-target"))
			{
		//		$($(this).attr("data-target")).slideUp();
				$($(this).attr("data-target")).hide();
			}
			else
			{
		//		$(this).next(".row_toggle_container").slideUp();
				$(this).next(".row_toggle_container").hide();
			}
		}
	});

}

function initButtons()
{
	document.querySelectorAll('.button').forEach(button => {
		let text = button.textContent.trim();
		let arr = button.textContent.trim().split('');
		let htmlResult = "";
		for( i in arr ) {
			let item = arr[i];
			if ( item==" " ) item = "&nbsp;";
			htmlResult = htmlResult + "<span>"+item+"</span>";
		}
		button.innerHTML = "<div>"+htmlResult+"</div>";
		//text = text.replace(" ","&nbsp;");
		//button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>';
	} );
}

function initAlert()
{
	window.alert = function( e_msg, e_time )
	{
		$("body").append("<style>.alert{ font-size: 20px; }</style>");

		if ( typeof(e_time)!="undefined" )
		{
			setTimeout( function(){ $.fancybox.close(); }, e_time );
		}

		e_msg = '<div class="alert">'+e_msg+'</div>';

		var instance = $.fancybox.getInstance();
		if ( typeof(instance)=="undefined" || instance==false )
		{
			$.fancybox.open(e_msg);
			return;
		}
		instance.current.$slide.trigger("onReset");
		instance.setContent( instance.current, e_msg );
	}//end_ func
}

function initMenu() {

	var headHeight;

	function getTop() {
		if ($(window).width() < 768) {
			headHeight = $('header').outerHeight(true) + "px";
			$(".menu").css('top', headHeight);
		}
	}

	$(".m_button").click(function () {
		getTop();
		$(this).toggleClass("active");
		$(".menu").toggleClass("active");
	});

	$(".menu a").click(function () {
		if ($(".m_button").hasClass("active")) {
			$(".m_button").removeClass("active");
			$(".menu").removeClass("active");
		}
	})
}



$( function()
{
	//initButtons();
	initAlert();
	init_agree();
	anchor_click();
	initYandexMapWaitOnHover();
	// initFancy();
	// initForm();
	init_resp_table();
	init_row_toggle();
	initMenu();


	// $(document).on("click", "a[href^='tel']", function () {
	//     if (typeof (window.yaCounter93383415) != "undefined") {
	//         if (typeof (window.ym) != "undefined") {
	//             ym(93383415, 'reachGoal', 'clickphone');
	//             console.log("[ym ok]");
	//         } else {
	//             yaCounter93383415.reachGoal('clickphone');
	//             console.log("[yaCounter ok]");
	//         }
	//     }
	// });

	// $(document).on("click", ".popup", function () {
	//     if (typeof (window.yaCounter93383415) != "undefined") {
	//         if (typeof (window.ym) != "undefined") {
	//             ym(93383415, 'reachGoal', 'openform');
	//             console.log("[ym ok]");
	//         } else {
	//             yaCounter93383415.reachGoal('openform');
	//             console.log("[yaCounter ok]");
	//         }
	//     }
	// });

} );
