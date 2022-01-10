$(document).ready(function () {


  function newGame() {
    move = 0;
    $('#output').html(move);
    // const shuffle = (arr) => {
    //   return arr.sort(() => Math.round(Math.random() * 100) - 50);
    // }
    var arrOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    // shuffle(arrOutput);
    //Заполняем от 1 до 15
    for (var i = 0; i < 16; i++) {
      if (i == 15) {
        $('.block>.block-color>.number').eq(i).html(" ");
      } else {
        $('.block>.block-color>.number').eq(i).html(arrOutput[i]);
      }

    }

    //Рандомное количество перестановок 
    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    permutation = getRandomArbitrary(100, 20);

    function chengElse(a, b) {
      var swap = $('.block:eq(' + a + ') .block-color .number').text();
      var swap2 = $('.block:eq(' + b + ') .block-color .number').text();
      $('.block:eq(' + b + ')  .block-color .number').html(swap);
      $('.block:eq(' + a + ') .block-color .number').html(swap2);
      return b;
    }
    // проверка на расположение 
    function equalsTop(a, b) {
      var flag = $('.block:eq(' + a + ')').offset().top == $('.block:eq(' + b + ')').offset().top;
      return Boolean(flag)
    }
    var k = 15;
    var randomSign;
    var randomNumber;
    while (permutation != 0) {

      randomSign = ((Math.random() < 0.5) ? -1 : 1);
      randomNumber = ((Math.random() < 0.5) ? 1 : 4);


      if (randomSign < 0) {
        if (k + randomSign * randomNumber >= 0) {
          if (randomNumber == 1 && equalsTop(k, (k + randomSign * randomNumber))) {
            k = chengElse(k, (k + randomSign * randomNumber));

          } else {
            if (randomNumber == 4) {
              k = chengElse(k, (k + randomSign * randomNumber));
            }

          }
        } else {
          if (randomNumber == 1 && equalsTop(k, (k - randomSign * randomNumber))) {
            k = chengElse(k, (k - randomSign * randomNumber));

          } else {
            if (randomNumber == 4) {
              k = chengElse(k, (k - randomSign * randomNumber));
            }

          }

        }
      } else {
        if (k + randomSign * randomNumber <= 15) {
          if (randomNumber == 1 && equalsTop(k, (k + randomSign * randomNumber))) {
            k = chengElse(k, (k + randomSign * randomNumber));

          } else {
            if (randomNumber == 4) {
              k = chengElse(k, (k + randomSign * randomNumber));
            }

          }

        } else {
          if (randomNumber == 1 && equalsTop(k, (k - randomSign * randomNumber))) {
            k = chengElse(k, (k - randomSign * randomNumber));

          } else {
            if (randomNumber == 4) {
              k = chengElse(k, (k - randomSign * randomNumber));
            }
          }
        }
      }
      permutation -= 1;
    }

  }
  var permutation;
  var flag = -1;
  var index1
  var index2
  var mass = new Array();
  var searchIndex;
  var move
  newGame();

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
    function composure(move) {
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
          break;
        } else {
          if (mass[i] == 15 && i == (mass.length - 1)) {
            move += 1;
            $('#output').html(move);
            $('#move').html("Ходы: " + move);
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

          if (index1 - 1 == index2 || index1 + 1 == index2 && $('.active:eq(0)').offset().top == $('.active:eq(1)').offset().top) {
            chengElse();
            move += 1;
            $('#output').html(move);
          } else {
            if (index1 - 4 == index2 || index1 + 4 == index2) {
              chengElse();
              move += 1;
              $('#output').html(move);
            }
          }
        } else {
          if (($('.active:eq(1) .block-color .number').text() == ' ')) {
            if (index2 + 1 == index1 || index2 - 1 == index1 && ($('.active:eq(0)').offset().top) == ($('.active:eq(1)').offset().top)) {
              chengElse();
              move += 1;
              $('#output').html(move);
            } else {
              if (index2 + 4 == index1 || index2 - 4 == index1) {
                chengElse();
                move += 1;
                $('#output').html(move);
              }
            }
          }
        }
        flag = -1

        $('.block').removeClass("active");
      }
      //Проверка на собранность 
      composure(move);
    } else {

      block1 = $(this, '.block-color .number').text();
      flag = $('.block').index(this);
    }



  });

});