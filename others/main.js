

//constants
var fullMockConstant = $("#fullMockConstant").val();
var mockConstant = $("#mockTestConstant").val();
var subjectWiseConstant = $("#subjectWiseConstant").val();

function resolveToToppersId(v){
	switch(v){
		case 'full':
			return "fullMockToppersWrap";
		case 'mock':
			return "mockToppersWrap";
		case 'subject':
			return "subjectWiseToppersWrap";	
    }
}

function getToppers(val,whichBlock){
	
	var input = {
		"testType":val
	};
	
	var blockID = $("#"+resolveToToppersId(whichBlock));
	
	var inputdata = JSON.stringify(input);
	
	$.ajax({
		url: base_url+'rest/student/v1/getToppers',
		type:"POST",
		dataType: "json",
	    contentType: 'application/json',
	    data:inputdata,
	    beforeSend: function(){
	    	$(blockID).empty();
			$(blockID).html('<div class="center"><img src="'+base_url+'assets/images/students/spinner2.gif" width="100" height="100"></div>');
	    },
	    success: function(data){
	    	
	    	var testName = data.testName;
	    	var examType = data.examType;
	    	var examDate = data.date;
	    	var allToppers = data.topperDetails;
	    	
	    	switch(val){
	    		case fullMockConstant:
	    			$("#fullMockName").html(testName);
	    			$("#fullMockExamType").html(examType);
	    			$("#fullMockExamDate").html(examDate);
	    			
	    			setTopperCard(allToppers,'full');
	    			break;
	    		case mockConstant:
	    			$("#mockName").html(testName);
	    			$("#mockExamType").html(examType);
	    			$("#mockExamDate").html(examDate);
	    			
	    			setTopperCard(allToppers,'mock');
	    			break;
	    		case subjectWiseConstant:
	    			$("#subjectWiseName").html(testName);
	    			$("#subjectWiseExamType").html(examType);
	    			$("#subjectWiseExamDate").html(examDate);
	    			
	    			setTopperCard(allToppers,'subject');
	    			break;
	    	}
	    	
	    	
	    	
	    	
	    },
		error:function(data){
			$(blockID).empty();
			$(blockID).html('<div class="center"><h2>No Toppers Found! :(</h2></div>');
		}
		
	})

}



function setTopperCard(topperData,type){
	var currType = resolveToToppersId(type);	
	var currDiv = $("#"+currType);
	if(topperData === null || topperData === undefined){
		//No toppers data
		$(currDiv).empty();
		$(currDiv).html('<div class="center"><h3>Toppers Data not available yet!</h3></div>');
		$(currDiv).owlCarousel({
            nav: false,
            center: true,
            dots: true,
            navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>']
        });
	} else{
		var len = topperData.length;
		
		
		if(len>0){
				
			
			var appendData = "";
			
			for(var tp=0;tp<len;tp++){
				
				var topperImage = topperData[tp].topperImage;
				var rank = topperData[tp].rank;
				var topperName = topperData[tp].topperName;
				var topperState = topperData[tp].topperState;
				var topperCity = topperData[tp].topperCity;
				var studentScored = topperData[tp].studentScored;
				var totalScore = topperData[tp].totalScore;
				
				appendData += '<div><div class="t1 wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.2s">';
				appendData += '<div id="ribbon"><div class="inset"></div><div class="container"><div class="base rank'+rank+'">'+rank+'</div>';
				appendData += '<div class="left_corner rank'+rank+'"></div><div class="right_corner rank'+rank+'"></div></div></div>';
				appendData += '<span class="sp'+rank+'"></span>';
				
				if(topperImage === "" || topperImage === null || topperImage === undefined){
					//default image to display
					appendData += '<img src="'+base_url+'assets/images/students/default.png">';
				} else{
					appendData += '<img src="'+topperImage+'">';
				}
				
				appendData += '<div class="namesec"><p class="t2">'+topperName+'</p><p class="t3"> '+ studentScored +' / '+totalScore+'</p><div class="namesec2">';
				appendData += '<span class="stateName">'+topperState+'</span><span class="cityName">'+topperCity+'</span>';
				appendData += '</div></div></div></div>';
				
			}
			
			$(currDiv).empty();
			$(currDiv).append(appendData);
					
			if(len>3){
				
				$(currDiv).owlCarousel({
					nav: false,
					center: true,
					loop: true,
					autoplay: true,
					dots: true,
					navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>'],
					responsive: {
						0: {
							items: 1
						},
						768: {
							items: 3
						}
					}
				});
				
			} else{
				$(currDiv).owlCarousel({
					nav: false,
					center: true,
					dots: true,
					navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>'] 
				});
			}
			
			
		} else{
			//No toppers data
			$(currDiv).empty();
			$(currDiv).html('<div class="center"><h3>Toppers Data not available yet!</h3></div>');
			$(currDiv).owlCarousel({
				nav: false,
				center: true,
				dots: true,
				navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>']
			});
		}
	}
	
	
	
	
}

$(document).ready(function(){

	let questionsData =  [
		{
	        "id": 1941,
	        "question": {
	            "value": "<p><span style=\"color:black; font-family:&quot;Times New Roman&quot;,&quot;serif&quot;; font-size:1.5rem\"><span style=\"color:#000000\">A charge </span><em><span style=\"color:#000000\">q</span></em><span style=\"color:#000000\"> is placed at the centre of the line joining two</span><span style=\"color:#000000\">&nbsp; </span><span style=\"color:#000000\">equal charges</span><span style=\"color:#000000\">&nbsp; </span><em><span style=\"color:#000000\">Q</span></em><span style=\"color:#000000\">. The system of the three charges will be in equilibrium, if q is equal to</span></span></span></p>"
	        },
	        "option1": {
	            "value": "<p>$-\\frac{Q}{2}$</p>"
	        },
	        "option2": {
	            "value": "<p>$-\\frac{Q}{4}$</p>"
	        },
	        "option3": {
	            "value": "<p>$+\\frac{Q}{4}$</p>"
	        },
	        "option4": {
	            "value": "<p>$+\\frac{Q}{2}$</p>"
	        },
	        "solution": {
	            "value": "<p><span style=\"font-size:12pt\"><span style=\"font-family:&quot;Times New Roman&quot;,serif\"><span style=\"color:#000000\">|F</span><sub><span style=\"color:#000000\">A</span></sub><span style=\"color:#000000\">| = |F</span><sub><span style=\"color:#000000\">C</span></sub><span style=\"color:#000000\">|</span></span></span></p>"
	        },
	        "answer": "B"
	    },
	    {
	        "id": 2027,
	        "question": {
	            "value": "<p><span style=\"color:black; font-family:&quot;Times New Roman&quot;,&quot;serif&quot;; font-size:1.5rem\">An infinite sequence of resistance is shown in the figure. The resultant resistance between A and B will be, when </span>$\\mathrm{R}_{1}=1 \\mathrm{ohm}$ and $\\mathrm{R}_{2}=2 \\mathrm{ohm}$</p><p><img src=\"data:image/png;base64,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\" /></p>"
	        },
	        "option1": {
	            "value": "<p><span style=\"color:black; font-family:&quot;Times New Roman&quot;,&quot;serif&quot;; font-size:12pt\">Infinity</span></p>"
	        },
	        "option2": {
	            "value": "<p>$1 \\Omega$</p>"
	        },
	        "option3": {
	            "value": "<p>$2 \\Omega$</p>"
	        },
	        "option4": {
	            "value": "<p>$1.5 \\Omega$</p>"
	        },
	        "solution": {
	            "value": "<p><span style=\"color:black; font-family:&quot;Times New Roman&quot;,&quot;serif&quot;; font-size:12pt\">Let the resultant resistance be R. If we add one more branch, then the resultant resistance would be the same because this is an infinite sequence.</span></p><p>$\\therefore \\frac{\\mathrm{RR}_{2}}{\\mathrm{R}+\\mathrm{R}_{2}}+\\mathrm{R}_{1}=\\mathrm{R} \\Rightarrow 2 \\mathrm{R}+\\mathrm{R}+2=\\mathrm{R}^{2}+2 \\mathrm{R}$</p><p>$\\Rightarrow \\mathrm{R}^{2}-\\mathrm{R}-2=0 \\Rightarrow \\mathrm{R}=-1$ or $\\mathrm{R}=2 \\mathrm{ohm}$</p><p><img src=\"data:image/png;base64,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\" /></p>"
	        },
	        "answer": "C"
	    }
	];
	
	console.log(questionsData);
	// let id = 0;
	let appendData = '';
	questionsData.forEach((ques, index) => {
		
		// id++;
		// let id = index++;
		
		if((index + 1) == 1){
			appendData += `
						<div class="row questionandans${index + 1}" style="display: block;">
						
							<div class="col-md-12" style="display: flex; justify-content: end; align-items: center;">
								<h5 style="margin: .5rem 1rem 0 0;; padding: .3rem">${index + 1} / ${questionsData.length}</h5>
							</div>
						
						    <div class="col-md-12" style="padding: 0 1rem; display: flex; flex-direction: column; align-items: start;">
		
						        <div style="display: flex; justify-content: center; margin-bottom: 1rem; font-size: 1.5rem;">
						            <span style="margin-right: .5rem;">${index + 1}.Q)</span><span class="parent-of-question">${ques.question.value}</span>
						        </div>
	
						        <div style="width: 100%;">
						            <div style="display: flex; flex-direction: column; align-items: start;">
						                <div class="forhover" id="forhover-1${index + 1}"
						                    style="cursor: pointer; border: 1px solid #dddddd; padding: 0.1rem 1rem; width: 100%; display: flex; font-size: 1.4rem; margin-bottom: .5rem;">
						                    <span style="margin-right: .5rem;">A)</span><span>${ques.option1.value}</span>
						                </div>
						                <div class="forhover" id="forhover-2${index + 1}"
						                    style="cursor: pointer; border: 1px solid #dddddd; padding: 0.1rem 1rem; width: 100%; display: flex; font-size: 1.4rem; margin-bottom: .5rem;">
						                    <span style="margin-right: .5rem;">B)</span><span>${ques.option2.value}</span>
						                </div>
						                <div class="forhover" id="forhover-3${index + 1}"
						                    style="cursor: pointer; border: 1px solid #dddddd; padding: 0.1rem 1rem; width: 100%; display: flex; font-size: 1.4rem; margin-bottom: .5rem;">
						                    <span style="margin-right: .5rem;">C)</span><span>${ques.option3.value}</span>
						                </div>
						                <div class="forhover" id="forhover-4${index + 1}"
						                    style="cursor: pointer; border: 1px solid #dddddd; padding: 0.1rem 1rem; width: 100%; display: flex; font-size: 1.4rem;">
						                    <span style="margin-right: .5rem;">D)</span><span>${ques.option4.value}</span>
						                </div>
						            </div>
						        </div>
	
						    </div>
		
							<div class="col-md-12" style="display: flex; justify-content: center; align-items: center; padding: 1rem; border-radius: 3rem;">
								<i class="fa fa-solid fa-arrow-right" style="cursor: pointer; font-size: 1.5rem; font-weight: 800; border: 5px solid #8c8c8c; padding: .3rem .4rem; border-radius: 3rem;" onclick="nextQuestion(${index + 1})"></i>
							</div>
		
						</div>
			`;
		}
		/*else if(index == questionsData.length - 1){
			
		}*/
		else{
			appendData += `
						<div class="row questionandans${index + 1}" style="display: none;">
						
							<div class="col-md-12" style="display: flex; justify-content: end; align-items: center;">
								<h5 style="margin: .5rem 1rem 0 0;; padding: .3rem">${index + 1} / ${questionsData.length}</h5>
							</div>
						
						    <div class="col-md-12" style="padding: 0 1rem; display: flex; flex-direction: column; align-items: start;">
		
						        <div style="display: flex; justify-content: center; margin-bottom: 1rem; font-size: 1.5rem;">
						            <span style="margin-right: .5rem;">${index + 1}.Q)</span><span class="parent-of-question">${ques.question.value}</span>
						        </div>

						        <div style="width: 100%;">
						            <div style="display: flex; flex-direction: column; align-items: start;">
						                <div class="forhover" id="forhover-1${index + 1}"
						                    style="cursor: pointer; border: 1px solid #dddddd; padding: 0.1rem 1rem; width: 100%; display: flex; font-size: 1.4rem; margin-bottom: .5rem;">
						                    <span style="margin-right: .5rem;">A)</span><span>${ques.option1.value}</span>
						                </div>
						                <div class="forhover" id="forhover-2${index + 1}"
						                    style="cursor: pointer; border: 1px solid #dddddd; padding: 0.1rem 1rem; width: 100%; display: flex; font-size: 1.4rem; margin-bottom: .5rem;">
						                    <span style="margin-right: .5rem;">B)</span><span>${ques.option2.value}</span>
						                </div>
						                <div class="forhover" id="forhover-3${index + 1}"
						                    style="cursor: pointer; border: 1px solid #dddddd; padding: 0.1rem 1rem; width: 100%; display: flex; font-size: 1.4rem; margin-bottom: .5rem;">
						                    <span style="margin-right: .5rem;">C)</span><span>${ques.option3.value}</span>
						                </div>
						                <div class="forhover" id="forhover-4${index + 1}"
						                    style="cursor: pointer; border: 1px solid #dddddd; padding: 0.1rem 1rem; width: 100%; display: flex; font-size: 1.4rem;">
						                    <span style="margin-right: .5rem;">D)</span><span>${ques.option4.value}</span>
						                </div>
						            </div>
						        </div>

						    </div>
		
							<div class="col-md-12" style="display: flex; justify-content: center; align-items: center; padding: 1rem">`;
							if(index == questionsData.length - 1){
								appendData += `<i class="fa fa-solid fa-arrow-left" style="cursor: pointer; font-size: 1.5rem; font-weight: 800; margin-right: 1rem; border: 5px solid #8c8c8c; padding: .3rem .4rem; border-radius: 3rem;" onclick="previousQuestion(${index + 1})"></i>
											   <i class="fa fa-solid fa-flag-checkered" style="cursor: pointer; font-size: 1.5rem; font-weight: 800; margin-left: 1rem; border: 5px solid #8c8c8c; padding: 0.3rem; border-radius: 3rem;" onclick="testFinished()"></i>`;
							}else{
								appendData += `<i class="fa fa-solid fa-arrow-left" style="cursor: pointer; font-size: 1.5rem; font-weight: 800; margin-right: 1rem; border: 5px solid #8c8c8c; padding: .3rem .4rem; border-radius: 3rem;" onclick="previousQuestion(${index + 1})"></i>
											   <i class="fa fa-solid fa-arrow-right" style="cursor: pointer; font-size: 1.5rem; font-weight: 800; margin-left: 1rem; border: 5px solid #8c8c8c; padding: .3rem .4rem; border-radius: 3rem;" onclick="nextQuestion(${index + 1})"></i>`;
							}
							appendData +=`
							</div>
		
						</div>
			`;
			
			// document.getElementById('ays-quiz-container-3').innerHTML += ``;
		}
	});
	
	document.getElementById('ays-quiz-container-3').innerHTML = appendData;
	
	/*document.querySelector(".forhover").addEventListener('mouseenter', (e) => {
		$("#" + e.target.id).css("box-shadow", "0 0 25px -8px black");
	});
	
	document.querySelector(".forhover").addEventListener('mouseleave', (e) => {
		$("#" + e.target.id).css("box-shadow", "0 0 25px -8px black");
	});*/
	
	/*$(".forhover").mouseenter(function() {
    	$(this).css("box-shadow", "0 0 25px -8px black");
	}).mouseleave(function() {
	     $(this).css("box-shadow", "0 0 25px -8px black");
	});*/
	
	$('.parent-of-question p').css('margin', '0');
	
	rendereelemntforkatext();
	
	var commented = true; // Chai

	$(window).load(function () {
		$(".loaded").fadeOut();
		$(".preloader").delay(1000).fadeOut("slow");
		
		/*$(".portfolio-loader").delay(1000).fadeOut("slow");*/
		
	});

	checkCookieFor360(); // added by Chai
	
	if(commented != true){ // Chai 25-05-22
		getToppers(fullMockConstant,"full");
		getToppers(mockConstant,"mock");
		getToppers(subjectWiseConstant,"subject");
	}
	
	$(".examboxlinks").hover(function(){
			var findi = $(this).find(".single-icon > i");
			var findh4 = $(this).find(".single-special > h4");
			$(findi).css("color","#fb397d");
			$(findh4).css("color","#5b32b4");
	}, function(){
		var findi = $(this).find(".single-icon > i");
		$(findi).css("color","grey");
		var findh4 = $(this).find(".single-special > h4");
		$(findh4).css("color","grey");
	});

/*	var $mainNav2 = $("#nav");


	 $mainNav2.append("<li id='magic-line-two'></li>");
    
    var $magicLineTwo = $("#magic-line-two");
    
    $magicLineTwo
        .width($(".current_page_item_two").width())
        .height($mainNav2.height())
        .css("left", $(".current_page_item_two a").position().left)
        .data("origLeft", $(".current_page_item_two a").position().left)
        .data("origWidth", $magicLineTwo.width())
        .data("origColor", $(".current_page_item_two a").attr("rel"));
                
    $("#nav a").hover(function() {
        $el = $(this);
        leftPos = $el.position().left;
        newWidth = $el.parent().width();
        $magicLineTwo.stop().animate({
            left: leftPos,
            width: newWidth,
            backgroundColor: $el.attr("rel")
        })
    }, function() {
        $magicLineTwo.stop().animate({
            left: $magicLineTwo.data("origLeft"),
            width: $magicLineTwo.data("origWidth"),
            backgroundColor: $magicLineTwo.data("origColor")
        });    
    });
    
 
    $(".current_page_item_two a").mouseenter();*/


    $("#cssmenu ul li").click(function(){
        $("#cssmenu ul li").not(this).removeClass("active");
        $(this).addClass("active");
    });

    $(".info-item .btn2").click(function(){
  $(".container2").toggleClass("log-in");
});
$(".container-form .btn2").click(function(){
  $(".container2").addClass("active");
});

$("#regbtn").click(function(){
    $(".container2").addClass("log-in");
});
$("#logbtn").click(function(){
    $(".container2").removeClass("log-in");
});


$('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
});

function nextQuestion(id){
	document.querySelector('.questionandans' + id).style.display = "none";
	document.querySelector('.questionandans' + (id + 1)).style.display = "block";
}

function previousQuestion(id){
	document.querySelector('.questionandans' + id).style.display = "none";
	document.querySelector('.questionandans' + (id - 1)).style.display = "block";
}

function testFinished(){
	alert("Congratulation, you have successfully finished the test.");
}

function getstatesall() {
	var appenddata;
	$.ajax({
		type : "GET",
		url : base_url + 'rest/admin/v1/getnotificationstates',
		dataType : "json",
		contentType : 'application/json',

		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				  if(i !== 0){
				var statename = data[i].name;
				var stateid = data[i].id;
				//var zoneidis = data.zones[i].id;
				appenddata += '<option value="'+stateid+'">' + statename
						+ '</option>';
				  }
			}
			$("#state").prop("disabled", false);
			$("#state").empty("");
			$("#state").append(
					'<option value="">--- Select States---</option>');
			$("#state").append(appenddata);

			try{
				$('.selectpicker').selectpicker('refresh');
			}catch(e){
				console.log("");
			}

		},
		error : function(data) {

			//alert("States not found!");

		}

	});
}
function getallSelectedcities(element, event) {

	var appenddata = "";

	var cities = [];

	for (var i = 0; i < element.options.length; i++) {
		if (element.options[i].selected) {
			cities.push(element.options[i].value);
		}
	}

	var inputData = {
		"state" : cities
	};
	var inputdata = JSON.stringify(inputData);
	
	$.ajax({
		type : "POST",
		dataType : "json",
		contentType : 'application/json',
		url : base_url + 'rest/admin/v1/getnotificationcities',
		data : inputdata,
		beforeSend : function() {
			$("#loading").show();
		},
		success : function(data) {
			$("#loading").hide();
			for (var i = 0; i < data.length; i++) {
				appenddata += '<option value="'+data[i].id+'" >'
						+ data[i].name + '</option>';
			}

			$("#city").empty("");
			$("#city").append('<option value="">--- Select ---</option>');
			$("#city").append(appenddata);

			$('.selectpicker').selectpicker('refresh');
			$("#city").prop("disabled", false);

		},
		error : function(data) {
			$("#loading").hide();
			alert("Cities not found!");

		},

	});

}

function detectmob() {
	  /* if(window.innerWidth <= 800 && window.innerHeight <= 600) {
	     //alert('mobile screen');
	     window.location = base_url +"jsp/student/student module/applinks.jsp";
	   } else {
	     //return false;
		   //alert('Web screen');
	   }*/
	    if( navigator.userAgent.match(/Android/i)
|| navigator.userAgent.match(/webOS/i)
|| navigator.userAgent.match(/iPhone/i)
|| navigator.userAgent.match(/iPad/i)
|| navigator.userAgent.match(/iPod/i)
|| navigator.userAgent.match(/BlackBerry/i)
|| navigator.userAgent.match(/Windows Phone/i)
){
window.location = base_url +"jsp/student/student module/applinks.jsp";
return true;

}
else {
return false;
}
	}
	
let exaid = "";
function checkCookieFor360() { // added by Chai & Adi
    let catid = getCookieFor360("categoria");
    let staid = getCookieFor360("estandar");
    exaid = getCookieFor360("examen");
    if (catid != "" && staid != "" && exaid != "") {
        // validateuser("student");
		$.ajax({
	        type: "GET",
	        async: false,
	        url: base_url + "jsp/master/setstudentsession.jsp?usertype=student",
	        success: function (data) { },
	        error: function (data) { }
	    });
        window.location = base_url + "jsp/student/student module/studenthome.jsp";
    }/* else{
	if(exaid == ""){
		window.location =base_url+"jsp/student/student module/catselect.jsp?ref=std";
	}
  } */
}

function getCookieFor360(cookieName) { // added by Chai & Adi
    let concatCookie = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let splittedCookie = decodedCookie.split(';');
    for (let index = 0; index < splittedCookie.length; index++) {
        let oneCookie = splittedCookie[index];
        while (oneCookie.charAt(0) == ' ') {
            oneCookie = oneCookie.substring(1);
        }
        if (oneCookie.indexOf(concatCookie) == 0) {
            return oneCookie.substring(concatCookie.length, oneCookie.length);
        }
    }
    return "";
}

/*function validateuser(usertype) { // added by Chai & Adi
    $.ajax({
        type: "GET",
        async: false,
        url: base_url + "jsp/master/setstudentsession.jsp?usertype=" + usertype,
        success: function (data) { },
        error: function (data) { }
    });
}*/

/* function privacyTerms(type){
	if(type == 'privacy') window.location = "";
	else window.location = ""; // terms
} */

function sendthefeed(){
	var name = $("#feedback-name").val();
	var email = $("#feedback-email").val();
	var subject = $("#feedback-subject").val();
	var feedback = $("#feedback-feedback").val();
	
	if(name == "" && email == "" && subject == "" && feedback == ""){
		alert("Please enter your details and send message.");
		return;
	}else if(name == ""){
		alert("Please enter your name.");
		return;
	}else if(email == ""){
		alert("Please enter your email.");
		return;
	}else if(subject == ""){
		alert("Please enter your subject.");
		return;
	}else if(feedback == ""){
		alert("Please enter your feedback.");
		return;
	}
	
	$.ajax({
		  url : base_url + "rest/student/feedbackEmail",
		  type:"POST",
		  dataType:"json",
		  contentType:'application/json',
		  data: JSON.stringify({
				"name":name,
				"email":email,
				"source":"skyget",
				"subject":subject,
				"feedback":feedback
	      }),
		  success:function(data){
		      alert("Message sent successfully");	
		  },
		  error:function(data){
			  alert(data.responseJSON.errorMessage);
		  }
	});
}
