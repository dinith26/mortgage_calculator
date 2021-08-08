let loan_amount = 100000;
let tenure = 12;
let interest_rate = 1;
let myChartData = {};
let myChartData2 = {};
let myChart = {}

let lon = 1200;
let int = 200;
let home = 150;

setTimeout(function(){

    var ctx = document.getElementById("myChart").getContext("2d");
    ctx.fillText("20" + "%", 100/2 - 20, 100/2, 200);
    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Monthly Payment', 'Interest', 'Home Insurance'],
            datasets: [{
                label: '# of Votes',
                data: [lon, int, home],
                backgroundColor: [
                    'rgb(18, 205, 108)',
                    'rgb(51, 153, 255)',
                    'rgb(204, 102, 255)',
                ],
                borderColor: [
                    'rgb(18, 205, 108)',
                    'rgb(51, 153, 255)',
                    'rgb(204, 102, 255)',
                ],
                borderWidth: 1,
                hoverOffset: 4
            }]
        },
        options: {
            elements: {
                center: {
                    text: "Text"
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'rgb(255, 255, 255)'
                    },
                    position: 'top'
                }
            }
        }


    });
    getLoanDetails();
}, 1000);


function getLoanDetails(){
    $.ajax({
        url: '/home/cal',
        type: 'GET',
        data: {
            loan_amount: loan_amount,
            tenure: tenure,
            interest_rate: interest_rate,
            home_rate: 2
        },
        success: (data, status, xhr) => {
            myChart.data.datasets[0].data = data.data;
            let tot = parseInt(data.data[0]) + parseInt(data.data[1]) + parseInt(data.data[2])
            $("#month_inst").html(tot.toFixed(2));
            $("#rate").html(interest_rate);
            $("#capital_payment").html(data.data[0].toFixed(2));
            $("#interest").html(data.data[1].toFixed(1));
            $("#home_ins").html(data.data[2].toFixed(1));
            myChart.update();
        },
        error: (xhr, status, error) => {
        },
	});
}

function slider(s_id) {
    var range       = '#'+s_id;
    var inputRange  = '#input-'+s_id;
    var labelsRange = '#labels-'+s_id;

    var getTrackStyle = function (elem) {
        var curVal = elem.value;
        var step = 100 / ($(inputRange).attr('max') - 1);
        var seltrack = (curVal - 1) * step;
        $(labelsRange+' li').removeClass('active selected');
        var curLabel = $(labelsRange).find('li:nth-child(' + curVal + ')');
        curLabel.addClass('active selected');
        curLabel.prevAll().addClass('selected');

        console.log(curLabel.data('stop'))
        if(s_id == "range-1"){
            loan_amount = curLabel.data('stop');
        }else if(s_id == "range-2"){
            tenure = curLabel.data('stop');
        }else{
            interest_rate = curLabel.data('stop');
        }


        getLoanDetails();

        var style = range+' {background: linear-gradient(to right, var(--slider-active-color) 0%, var(--slider-active-color) ' + seltrack + '%, '+$(range).parent().css('background-color')+' ' + seltrack + '%, '+$(range).parent().css('background-color')+' 100%);}\n';

        return style;
    };

    var sheet = document.createElement('style');
    document.body.appendChild(sheet);
    $(inputRange).on('input', function () {
        sheet.textContent = getTrackStyle(this);
    });

    $(labelsRange+' li').on('click', function () {
        var index = $(this).index();
        $(inputRange).val(index + 1).trigger('input');
    });
};

function autorun() {
    slider('range-1');
    slider('range-2');
    slider('range-3');
    slider('range-4');
    slider('range-5');
};


if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);

