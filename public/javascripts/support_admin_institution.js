var instIndex = 2;
var instContact = new Array();
instContact = 2;
var maxContact = 2;

function createInstIP(container) {
  var inst = document.getElementById(container);
  if (inst != null) {
    var tr = document.createElement("tr");
    if (instIndex % 2 == 0) {
       tr.className = "row1";
    } else {
       tr.className = "row2";
    }
    var td = document.createElement("td");
    td.colSpan = 4;
    tr.appendChild(td);
    
    addInput(td, "ip_start_"+instIndex, "m_field");
    addText(td, " - ");
    addInput(td, "ip_end_"+instIndex, "m_field");
    
//    var checkbox = document.createElement("input");
//    checkbox.name = "remove_"+instIndex;
//    checkbox.value = instIndex;
//    checkbox.type = "checkbox";
//    td.appendChild(checkbox);    
//    addText(td, " Remove");
//    var func = "javascript:toggleDisable(this)";
//    checkbox.onclick = new Function(func);
    
    inst.appendChild(tr);
    instIndex++;
  }
}

function createContact(container) {
  if (instContact <= maxContact) {
    var c = document.getElementById(container);
    if (c != null) {
      addHR(c, 300);

      addField(c, "contact name:", 1, "contact_name_"+instContact);
      addField(c, "email:", 1, "email_"+instContact);
      addField(c, "phone:", 0, "phone_"+instContact);

      instContact++;
    }
  } else {
    alert("Cannot create more than "+maxContact+" contacts for an institution");
  }
}

function toggleDisable(item) {
   if (item != null) {
      var start = document.getElementById("ip_start_"+item.value);
      var end = document.getElementById("ip_end_"+item.value);
      if (start.disabled == null || !start.disabled) {
         start.disabled = true;
         end.disabled = true;
      } else {
         start.disabled = false;
         end.disabled = false;
      }
   }
}