function collapse (id) {
  var target = document.getElementById(id);
  if (target != null) {
    target.style.display = "none";
  }
}

function expand (id) {
  var target = document.getElementById(id);
  if (target != null) {
    target.style.display = "block";
  }
}

function collapseGroup(id, exLink, coLink) {
  collapse(id);
  collapse(exLink);
  expand(coLink);
}

function expandGroup(id, exLink, coLink) {
  expand(id);
  expand(exLink);
  collapse(coLink);
}

function disable (id) {
  var target = document.getElementById(id);
  if (target != null) {
    target.disabled = true;
  }
}

function enable (id) {
  var target = document.getElementById(id);
  if (target != null) {
    target.disabled = false;
  }
}

function addBR (node) {
  var br = document.createElement("br");
  node.appendChild(br);
}

function addBRC (node) {
  var br = document.createElement("br");
  br.className = "floatClearLeft";
  node.appendChild(br);
}

function addLabel (node, label) {
  var d = document.createElement("div");
  d.className = "label";
  var text = document.createTextNode(label);
  d.appendChild(text);
  node.appendChild(d);
}

function addRedLabel (node, label) {
  var d = document.createElement("div");
  d.className = "required_label";
  var text = document.createTextNode(label);
  d.appendChild(text);
  node.appendChild(d);
}

function addInput (node, name, style) {
  var input = document.createElement("input");
  input.type = "text";
  input.name = name;
  input.id = name;
  if (undefined == style) { style = "field"; }
  input.className = style;
  node.appendChild(input);
}

function addHR (node, w) {
  addBRC(node);
  var hr = document.createElement("hr");
  hr.align = "left";
  hr.noshade = "noshade";
  hr.size = 1;
  hr.width = w;
  hr.color = "#f0eee4";
  node.appendChild(hr);
}

function addText (node, text) {
  var t = document.createTextNode(text);
  node.appendChild(t);
}

function addLink (node, url, text) {
  var a = document.createElement("a");
  a.href = url;
  var t = document.createTextNode(text);
  a.appendChild(t);
  node.appendChild(a);
}

function addGap (node) {
  var d = document.createElement("div");
  d.className = "gap";
  // var t = document.createTextNode("&#xA0;");
  var t = document.createTextNode("");
  d.appendChild(t);
  node.appendChild(d);
}

function writeBlank () {
  document.write("&#xA0;");
}

function toggle(button, id) {
  var target = document.getElementById(id);
  var button = document.getElementById(button);
  if (target != null) {
    if (target.style.display == "block") {
      target.style.display = "none";
      button.style.background = 'url(/default/images/tree_plus.gif) no-repeat center center';
      button.setAttribute("title","show");
    } else {
      target.style.display = "block";
      button.style.background = 'url(/default/images/tree_minus.gif) no-repeat center center';
      button.setAttribute("title","hide");
    }
  }
}

function toggle2(button, id) {
  var target = document.getElementById(id);
  var button = document.getElementById(button);
  if (target != null) {
    if (target.style.display == "none") {
      target.style.display = "block";
      button.style.background = 'url(/default/images/tree_minus.gif) no-repeat center center';
      button.setAttribute("title","hide");
    } else {
      target.style.display = "none";
      button.style.background = 'url(/default/images/tree_plus.gif) no-repeat center center';
      button.setAttribute("title","show");
    }
  }
}

function simple_toggle(id) {
  var target = document.getElementById(id);
  if (target != null) {
    if (target.style.display == "block") {
      target.style.display = "none";
    } else {
      target.style.display = "block";
    }
  }
}

function addField (target, label, labelType, field, fieldClass) {
  var fp = document.createElement("div");
  fp.className = "form-pair";
  var fi = document.createElement("div");
  fi.className = "form-item";
  var fv = document.createElement("div");
  fv.className = "form-value";
  if (labelType == 1) {
    addRedLabel(fi, label);
  } else {
    addLabel(fi, label);
  }
  addInput(fv, field, fieldClass);
  fp.appendChild(fi);
  fp.appendChild(fv);
  target.appendChild(fp);
}

function addCustomField (target, label, labelType, field) {
  var fp = document.createElement("div");
  fp.className = "form-pair";
  var fi = document.createElement("div");
  fi.className = "form-item";
  var fv = document.createElement("div");
  fv.className = "form-value";
  if (labelType == 1) {
    addRedLabel(fi, label);
  } else {
    addLabel(fi, label);
  }
  fv.appendChild(field);
  fp.appendChild(fi);
  fp.appendChild(fv);
  target.appendChild(fp);
}

function show(id) {
  var target = document.getElementById(id);
  if (target != null) {
    target.style.display = "block";
  }
}

function hide(id) {
  var target = document.getElementById(id);
  if (target != null) {
    target.style.display = "none";
  }
}
