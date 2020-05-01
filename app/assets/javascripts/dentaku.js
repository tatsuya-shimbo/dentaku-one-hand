$(function() {
  // 定義
  var style = 0;
  var swich = 0;
  var reset = 0;
  var num1 = 0;
  var num2 = 0;
  var result = 0;
  // フォーカス
  $("input").focus();
  $("body").click(function(){
    $("input").focus();
  });
  // ボタンクリック
  $(".btn").click(function(){

    var value = $(this).find(".main").text().replace(/\r?\n/g, '').trim();

    calculate(value);


  });
  //キーボード
  $("input").on("keyup", function(){
    var key = $("input").val();
    keyArray2 = key.split("");

    for (var i = 0; i < keyArray2.length; i++) {
      var value = change(keyArray2[i]);

      calculate(value);
    }


    $("input").val("");
  });
  //変換器
  function change(key){
    var keyArray1 = ["2", "3", "4", "5", "w", "e", "r", "t", "s", "d", "f", "g", "x", "c", "v", "b", " ", "j", "a", "z"];
    var  valueArray = ["7", "8", "9", "/", "4", "5", "6", "x", "1", "2", "3", "-", "0", ".", "C", "+", "=", "AC", "0", "00"];
    var keyNum = keyArray1.indexOf(key);
    return valueArray[keyNum];
  }
  //計算
  function calculate(value){
    var display = $(".result").text().replace(/\r?\n/g, '').trim();
    var numArray = ["00", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var symbolArray = ["+", "-", "x", "/"];

    if (numArray.includes(value)) {
      if (swich == 0) {
        if (display == 0) {
          if (value == "0" || value == "00") {

          } else {
            $(".result").empty();
            $(".result").append(value);
          }
        } else {
          if (reset == 1) {
            $(".result").empty(value);
          }
          $(".result").append(value);
        }
        reset = 0;
      }
      else {
        swich = 0;
        $(".input-box").children().removeClass("active");
        num1 = display;
        $(".result").empty();
        $(".result").append(value);
      }



    }
    else if (symbolArray.includes(value)) {
      if (swich == 0 && style != 0) {
        num2 = display;

        if (style == 1) {
          result = num1*1 + num2*1;
        }
        else if (style == 2) {
          result = num1*1 - num2*1;
        }
        else if (style == 3) {
          result = num1*1 * num2*1;
        }
        else if (style == 4) {
          result = num1*1 / num2*1;
        }

        if (result == "Infinity" || num1 == "エラー") {
          result = "エラー";
        }
        $(".result").text(result);

      }
      swich = 1;
      reset = 0;
      $(".input-box").children().removeClass("active");

      if (value == "+") {
        style = 1;
        $("#plus").addClass("active");
      } else if (value == "-") {
        style = 2;
        $("#minus").addClass("active");
      } else if (value == "x") {
        style = 3;
        $("#times").addClass("active");
      } else if (value == "/") {
        style = 4;
        $("#divide").addClass("active");
      }

    }
    else if (value == "=") {
      num2 = display;

      if (style == 0) {
        result = num2*1;
      }
      else if (style == 1) {
        result = num1*1 + num2*1;
      }
      else if (style == 2) {
        result = num1*1 - num2*1;
      }
      else if (style == 3) {
        result = num1*1 * num2*1;
      }
      else if (style == 4) {
        result = num1*1 / num2*1;
      }

      style = 0;
      reset = 1;


      if (swich == 1) {
        result = num2;
        swich = 0;
        $(".input-box").children().removeClass("active");
      }



      if (result == "Infinity" || num1 == "エラー") {
        result = "エラー";
      }
      $(".result").text(result);
    }
    else if (value == "C") {
      if (style != 0 && swich == 0) {
        $(".result").text(num1);
        swich = 1;
        if (style == 1) {
          $("#plus").addClass("active");
        } else if (style == 2) {
          $("#minus").addClass("active");
        } else if (style == 3) {
          $("#times").addClass("active");
        } else if (style == 4) {
          $("#divide").addClass("active");
        }

      }
    }
    else if (value == "AC") {
      $(".result").text("0");
      style = 0;
      swich = 0;
      $(".input-box").children().removeClass("active");
      reset = 0;
      num1 = 0;
      num2 = 0;
      result = 0;
    }
  }
});
