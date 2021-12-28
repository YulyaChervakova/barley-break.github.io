$(document).ready(function () {


  function newGame() {
    move = 0;
    const shuffle = (arr) => {
      return arr.sort(() => Math.round(Math.random() * 100) - 50);
    }
    var arrOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
     shuffle(arrOutput);
    for (var i = 0; i < 16; i++) {
      if (i == 15) {
        $('.block>.block-color>.number').eq(i).html(" ");
      } else {
        $('.block>.block-color>.number').eq(i).html(arrOutput[i]);
      }

    }
  }
  var flag = -1;
  var index1
  var index2
  var mass = new Array();
  var searchIndex;
  var move
  newGame();
  //console.log(arrOutput);

  //   const start= new Date().getTime();

  // const end = new Date().getTime();
  //console.log('SecondWay: ${end - start}ms');
  $('.field').on('click', function (e) {
    $('.won').css('display', 'none');
    $('.play').css('display', 'flex');
    newGame();
  });
  $(' .block').on('click', function (e) {
    $(this).addClass("active");

    //Перестановка 
    function chengElse() {
      var swap = $('.active:eq(1) .block-color .number').text();
      var swap2 = $('.active:eq(0) .block-color .number').text();
      $('.active:eq(0) .block-color .number').fadeTo(5, 0.3).html(swap).fadeTo(500, 1);
      $('.active:eq(1) .block-color .number').fadeTo(5, 0.3).html(swap2).fadeTo(500, 1);
    }
    //Проверка на собранность 
    function composure() {
      mass = [];
      for (var i = 0; i < 16; i++) {
        mass.push($('.block>.block-color>.number').eq(i).text());
        if ($('.block>.block-color>.number').eq(i).text() == ' ') {
          searchIndex = i;
        }
      }
      mass.splice(searchIndex, 1);
      for (var i = 0; i < mass.length; i++) {
        if (mass[i] != (1 + i)) {
          move += 1;
          $('#output').html(move);
          break;
        } else {
          if (mass[i] == 15 && i == (mass.length - 1)) {
            move += 1;
          $('#output').html(move);
          $('#move').html("Ходы: "+move);
            $('.won').css('display', 'flex');
            $('.play').css('display', 'none');

          }
        }

      }
    }
    if (flag !== -1) {

      if ($('.active').length == 2) {
        //ЧУДОООО
        index1 = $('.block+.active').index();
        index2 = $('.block+.active:eq(1)').index(0);
        if (index2 == -1) {
          index2 = 0;
        }
        if (($('.active:eq(0) .block-color .number').text() == ' ')) {

          if (index1 - 1 == index2 || index1 + 1 == index2 || index1 - 4 == index2 || index1 + 4 == index2) {
            chengElse();
          }
        } else {
          if (($('.active:eq(1) .block-color .number').text() == ' ')) {
            if (index2 + 1 == index1 || index2 - 1 == index1 || index2 + 4 == index1 || index2 - 4 == index1) {
              chengElse();
            }
          }
        }
        flag = -1

        $('.block').removeClass("active");
      }

      composure();
    } else {

      block1 = $(this, '.block-color .number').text();
      flag = $('.block').index(this);
    }
    //Проверка на собранность 


  });

});