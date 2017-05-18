(function(){

  // Добавление/удаление модификаторов при клике на переключение видимости
  var toggler = document.getElementById('main-nav-toggler');
  if(toggler){
    toggler.addEventListener('click', mainNavVisibleToggle);
  }
  var backdrop = document.getElementById('main-nav-backdrop');
  if(backdrop){
    backdrop.addEventListener('click', mainNavVisibleToggle);
  }

  // Добавление/удаление модификаторов при фокусировке на ссылочном элементе
  var linkClassName = 'main-nav__sub-link';
  var linkClassNameShowChild = 'main-nav__item--show-child';
  var findLinkClassName = new RegExp(linkClassName);
  // Слежение за всплывшим событием focus
  document.addEventListener('focus', function(event) {
    // Если событие всплыло от одной из ссылок гл. меню
    if (findLinkClassName.test(event.target.className)) {
      // Добавим классы, показывающие списки вложенных уровней, на всех родителей
      event.target.parents('.main-nav__item').forEach(function(item){
        item.classList.add(linkClassNameShowChild);
      });
    }
  }, true);
  // Слежение за всплывшим событием blur
  document.addEventListener('blur', function(event) {
    // Если событие всплыло от одной из ссылок гл. меню
    if (findLinkClassName.test(event.target.className)) {
      // Уберем все классы, показывающие списки 2+ уровней
      // event.target.closest('.main-nav').querySelectorAll('.'+linkClassNameShowChild).forEach(function(item){
      document.querySelectorAll('.'+linkClassNameShowChild).forEach(function(item){
        item.classList.remove(linkClassNameShowChild);
      });
    }
  }, true);

  // Добавление/удаление модификаторов при клике на родителе с подпунктами
  document.addEventListener('click', function(event) {
    if (event.target.closest('.main-nav__item--show-child') !== null) {
      mainSubNavHide();
    }
    else if (event.target.dataset.mainNavSubmenuToggler) {
      mainSubNavHide();
      event.target.parents('.main-nav__item').forEach(function(item){
        item.classList.toggle(linkClassNameShowChild);
      });
    }
    if (event.target.closest('.main-nav__lvl') === null && !event.target.dataset.mainNavSubmenuToggler) {
      mainSubNavHide();
    }
  }, true);

  // Переключение видимости гл. меню
  function mainNavVisibleToggle(e) {
    e.preventDefault();
    toggler.classList.toggle('burger--close');
    document.getElementById('main-nav').classList.toggle('main-nav--open');
    mainSubNavHide();
  }

  // Сокрытие видимости всех подменю
  function mainSubNavHide() {
    document.querySelectorAll('.'+linkClassNameShowChild).forEach(function(item){
      item.classList.remove(linkClassNameShowChild);
    });
  }



  // Добавление метода .parents()
  Element.prototype.parents = function(selector) {
    var elements = [];
    var elem = this;
    var ishaveselector = selector !== undefined;

    while ((elem = elem.parentElement) !== null) {
      if (elem.nodeType !== Node.ELEMENT_NODE) {
        continue;
      }

      if (!ishaveselector || elem.matches(selector)) {
        elements.push(elem);
      }
    }

    return elements;
  };

  // Добавление метода .closest() (полифил, собственно)
  (function(e){
   e.closest = e.closest || function(css){
     var node = this;

     while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
     }
     return null;
   }
  })(Element.prototype);

}());