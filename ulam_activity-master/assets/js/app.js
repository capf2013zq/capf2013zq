var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

var isExist = function (val) {
  val = $.trim(val);
  if (val != "") {
    return true;
  }
  return false;
}

var isEthAddr = function (addr) {
  if (/^(0x)?[0-9a-fA-F]{40}$/.test(addr)) {
    return true;
  }

  return false;
}

var isUlamAddr = function (addr) {
  // ULAM14986b77d1abfa0dd892f9abc573d6c95fa86ebb
  var patt = new RegExp('^(ulam)?[0-9a-fA-F]{40}$', 'i');

  if (patt.test(addr)) {
    return true;
  }

  return false;
}

var isEmail = function (val) {
  var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,7})$/;

  if (pattern.test(val)) {
    return true;
  }

  return false;
}

var isNum = function (val) {

  if (/^[0-9]*$/.test(val)) {
    return true;
  }

  return false;
}