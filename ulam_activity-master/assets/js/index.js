(function () {

  (function () {
    var code = getUrlParameter('invitation');
    code = $.trim(code);
    $("#expand_num").val(code);
  })();

  $("#gen_ulam").click(function(){
      $.getJSON(
        'http://47.92.35.100:5000/generate',
        function (data) {
          //alert(data[0].addr)
          $("#priv-key-gens").val(data[0].sk);
          $("#addr-gen").val(data[0].addr);

          $('#gen_ulam_alert').modal({
                backdrop: 'static',//点击空白处不关闭对话框

                show:true//弹出对话框
              });
        }
      )

  })

  $("#close_gen").click(function(){
        alert("dd")
       $('#gen_ulam_alert').modal("hide");
  })

  $("#inlineRadio1").click(function () {
      $("#yitai").show();
      $("#need").hide();
      $('#n1').css({'color':'#FFA500','fontWeight':700,'fontSize':'20px'});
      $('#n2').css({'color':'','fontWeight':'','fontSize':'16px'});
  })

    $("#inlineRadio2").click(function () {
        $("#yitai").hide();
        $("#need").show();
        $('#n2').css({'color':'#FFA500','fontWeight':700,'fontSize':'20px'});
        $('#n1').css({'color':'','fontWeight':'','fontSize':'16px'});
    })

   var b =  $("input[name='inlineRadioOptions']:checked").val();
    console.log(b);
    if(b==undefined){
        $("#yitai").hide();
        $("#need").hide();
    }


  $("#reg_btn").click(function () {
    var email = $("#email").val();
    var eth_addr = $("#eth_addr").val();
    var ulam_addr = $("#ulam_addr").val();
    var expand_num = Number($("#expand_num").val());

    if ((isExist(email) || isExist(eth_addr)) && isExist(ulam_addr) && isExist(expand_num)) {

      if ((isEthAddr(eth_addr) || isUlamAddr(ulam_addr)) && isEmail(email) && isNum(expand_num)) {

        var data = JSON.stringify({
          email: email,
          eth_addr: eth_addr,
          ulam_addr: ulam_addr,
          expand_num: expand_num
        });

        $.ajax({
          method: "POST",
          url: "http://47.92.35.100:5111/expand",
          contentType: "application/json",
          data: data,
          success: function (data) {
            // succeful10000000

            if (data == "error_expand_num") {
              alert("错误的邀请码")
              return false;
            }

            if (data == "error_email_num_repetition") {
              alert("邮箱重复");
              return false;
            }

            if (data == "email_confirm_fin") {
              alert("邮箱已认证");
              return false;
            }

            var code = data.substring(8);

            if (code.length == 8) {
              var res = "http://www.ulamchain.io/activity?invitation=" + code;
              $("#copyat").val(res);

              var clipboard = new ClipboardJS('._copy_btn_', {
                container: document.getElementById('alertModal') //html所在模态框ID
                // https://stackoverflow.com/questions/40526156/clipboard-js-not-working-in-bootstrap-modal
              });



              clipboard.on('success', function (e) {
                alert("复制成功");
                window.open("http://47.92.35.100:5101/show/" + code);
                //window.location.href="http://47.92.35.100:5101/show/" + code;
              });

              clipboard.on('error', function (e) {
                console.log(e);
              });

              $('#alertModal').modal({
                backdrop: 'static',//点击空白处不关闭对话框

                show:true//弹出对话框
              });

            }

            return false;

          },
          error: function (err) {
            console.log(err);
            return false;
          }
        });

      } else {
        alert("请填写正确的格式");
        return false;
      }

    } else {
      alert("请填写完内容");
      return false;
    }

  });
})();
