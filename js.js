/* Shivving (IE8 is not supported, but at least it won't look as awful)
/* ========================================================================== */

(function (document) {
	var
	head = document.head = document.getElementsByTagName('head')[0] || document.documentElement,
	elements = 'article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output picture progress section summary time video x'.split(' '),
	elementsLength = elements.length,
	elementsIndex = 0,
	element;

	while (elementsIndex < elementsLength) {
		element = document.createElement(elements[++elementsIndex]);
	}

	element.innerHTML = 'x<style>' +
		'article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}' +
		'audio[controls],canvas,video{display:inline-block}' +
		'[hidden],audio{display:none}' +
		'mark{background:#FF0;color:#000}' +
	'</style>';

	return head.insertBefore(element.lastChild, head.firstChild);
})(document);

/* Prototyping
/* ========================================================================== */

(function (window, ElementPrototype, ArrayPrototype, polyfill) {
	function NodeList() { [polyfill] }
	NodeList.prototype.length = ArrayPrototype.length;

	ElementPrototype.matchesSelector = ElementPrototype.matchesSelector ||
	ElementPrototype.mozMatchesSelector ||
	ElementPrototype.msMatchesSelector ||
	ElementPrototype.oMatchesSelector ||
	ElementPrototype.webkitMatchesSelector ||
	function matchesSelector(selector) {
		return ArrayPrototype.indexOf.call(this.parentNode.querySelectorAll(selector), this) > -1;
	};

	ElementPrototype.ancestorQuerySelectorAll = ElementPrototype.ancestorQuerySelectorAll ||
	ElementPrototype.mozAncestorQuerySelectorAll ||
	ElementPrototype.msAncestorQuerySelectorAll ||
	ElementPrototype.oAncestorQuerySelectorAll ||
	ElementPrototype.webkitAncestorQuerySelectorAll ||
	function ancestorQuerySelectorAll(selector) {
		for (var cite = this, newNodeList = new NodeList; cite = cite.parentElement;) {
			if (cite.matchesSelector(selector)) ArrayPrototype.push.call(newNodeList, cite);
		}

		return newNodeList;
	};

	ElementPrototype.ancestorQuerySelector = ElementPrototype.ancestorQuerySelector ||
	ElementPrototype.mozAncestorQuerySelector ||
	ElementPrototype.msAncestorQuerySelector ||
	ElementPrototype.oAncestorQuerySelector ||
	ElementPrototype.webkitAncestorQuerySelector ||
	function ancestorQuerySelector(selector) {
		return this.ancestorQuerySelectorAll(selector)[0] || null;
	};
})(this, Element.prototype, Array.prototype);

/* Helper Functions
/* ========================================================================== */

function generateTableRow() {
	var emptyColumn = document.createElement('tr');

	emptyColumn.innerHTML = '<td><a class="cut">-</a><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
		'<td><span data-prefix>$</span><span contenteditable>0.00</span></td>' +
		'<td><span contenteditable>0</span></td>' +
		'<td><span data-prefix>$</span><span>0.00</span></td>';

	return emptyColumn;
}

function parseFloatHTML(element) {
	return parseFloat(element.innerHTML.replace(/[^\d\.\-]+/g, '')) || 0;
}

function parsePrice(number) {
	return number.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');
}

/* Update Number
/* ========================================================================== */

function updateNumber(e) {
	var
	activeElement = document.activeElement,
	value = parseFloat(activeElement.innerHTML),
	wasPrice = activeElement.innerHTML == parsePrice(parseFloatHTML(activeElement));

	if (!isNaN(value) && (e.keyCode == 38 || e.keyCode == 40 || e.wheelDeltaY)) {
		e.preventDefault();

		value += e.keyCode == 38 ? 1 : e.keyCode == 40 ? -1 : Math.round(e.wheelDelta * 0.025);
		value = Math.max(value, 0);

		activeElement.innerHTML = wasPrice ? parsePrice(value) : value;
	}

	updateInvoice();
}

/* Update Invoice
/* ========================================================================== */

function updateInvoice() {
	var total = 0;
	var cells, price, total, a, i;

	// update inventory cells
	// ======================

	for (var a = document.querySelectorAll('table.inventory tbody tr'), i = 0; a[i]; ++i) {
		// get inventory row cells
		cells = a[i].querySelectorAll('span:last-child');

		// set price as cell[2] * cell[3]
		price = parseFloatHTML(cells[2]) * parseFloatHTML(cells[3]);

		// add price to total
		total += price;

		// set row total
		cells[4].innerHTML = price;
	}

	// update balance cells
	// ====================

	// get balance cells
	cells = document.querySelectorAll('table.balance td:last-child span:last-child');

	// set total
	cells[0].innerHTML = total;

	// set balance and meta balance
	cells[2].innerHTML = document.querySelector('table.meta tr:last-child td:last-child span:last-child').innerHTML = parsePrice(total - parseFloatHTML(cells[1]));

	// update prefix formatting
	// ========================

	var prefix = document.querySelector('#prefix').innerHTML;
	for (a = document.querySelectorAll('[data-prefix]'), i = 0; a[i]; ++i) a[i].innerHTML = prefix;

	// update price formatting
	// =======================

	for (a = document.querySelectorAll('span[data-prefix] + span'), i = 0; a[i]; ++i) if (document.activeElement != a[i]) a[i].innerHTML = parsePrice(parseFloatHTML(a[i]));
}

/* On Content Load
/* ========================================================================== */

function onContentLoad() {
	updateInvoice();

	var
	input = document.querySelector('input'),
	image = document.querySelector('img');

	function onClick(e) {
		var element = e.target.querySelector('[contenteditable]'), row;

		element && e.target != document.documentElement && e.target != document.body && element.focus();

		if (e.target.matchesSelector('.add')) {
			document.querySelector('table.inventory tbody').appendChild(generateTableRow());
		}
		else if (e.target.className == 'cut') {
			row = e.target.ancestorQuerySelector('tr');

			row.parentNode.removeChild(row);
		}

		updateInvoice();
	}

	function onEnterCancel(e) {
		e.preventDefault();

		image.classList.add('hover');
	}

	function onLeaveCancel(e) {
		e.preventDefault();

		image.classList.remove('hover');
	}

	function onFileInput(e) {
		image.classList.remove('hover');

		var
		reader = new FileReader(),
		files = e.dataTransfer ? e.dataTransfer.files : e.target.files,
		i = 0;

		reader.onload = onFileLoad;

		while (files[i]) reader.readAsDataURL(files[i++]);
	}

	function onFileLoad(e) {
		var data = e.target.result;

		image.src = data;
	}

	if (window.addEventListener) {
		document.addEventListener('click', onClick);

		document.addEventListener('mousewheel', updateNumber);
		document.addEventListener('keydown', updateNumber);

		document.addEventListener('keydown', updateInvoice);
		document.addEventListener('keyup', updateInvoice);

		input.addEventListener('focus', onEnterCancel);
		input.addEventListener('mouseover', onEnterCancel);
		input.addEventListener('dragover', onEnterCancel);
		input.addEventListener('dragenter', onEnterCancel);

		input.addEventListener('blur', onLeaveCancel);
		input.addEventListener('dragleave', onLeaveCancel);
		input.addEventListener('mouseout', onLeaveCancel);

		input.addEventListener('drop', onFileInput);
		input.addEventListener('change', onFileInput);
	}
}

window.addEventListener && document.addEventListener('DOMContentLoaded', onContentLoad);

function multiply()
    {
	
	var final_data= document.getElementById("note1").value;
      var qnt=document.getElementById("Quantity1").value;
        var amt=final_data*qnt;
      document.getElementById("total1").value=amt;
	  var note2= document.getElementById("note2").value;
      var qnt2=document.getElementById("Quantity2").value;
        var amt2=note2*qnt2;
      document.getElementById("total2").value=amt2;
	  var note3= document.getElementById("note3").value;
      var qnt3=document.getElementById("Quantity3").value;
        var amt3=note3*qnt3;
      document.getElementById("total3").value=amt3;
	  var note4= document.getElementById("note4").value;
      var qnt4=document.getElementById("Quantity4").value;
        var amt4=note4*qnt4;
      document.getElementById("total4").value=amt4;
	  var note5= document.getElementById("note5").value;
      var qnt5=document.getElementById("Quantity5").value;
        var amt5=note5*qnt5;
      document.getElementById("total5").value=amt5;
	  
	  var note6= document.getElementById("note6").value;
      var qnt6=document.getElementById("Quantity6").value;
        var amt6=note6*qnt6;
      document.getElementById("total6").value=amt6;
	  
	  var note7= document.getElementById("note7").value;
      var qnt7=document.getElementById("Quantity7").value;
        var amt7=note7*qnt7;
      document.getElementById("total7").value=amt7;
	  
	  var note8= document.getElementById("note8").value;
      var qnt8=document.getElementById("Quantity8").value;
        var amt8=note8*qnt8;
      document.getElementById("total8").value=amt8;
	  
	  var note9= document.getElementById("note9").value;
      var qnt9=document.getElementById("Quantity9").value;
        var amt9=note9*qnt9;
      document.getElementById("total9").value=amt9;
	  
	  var note10= document.getElementById("note10").value;
      var qnt10=document.getElementById("Quantity10").value;
        var amt10=note10*qnt10;
      document.getElementById("total10").value=amt10;
	  
	  var note11= document.getElementById("note11").value;
      var qnt11=document.getElementById("Quantity11").value;
        var amt11=note11*qnt11;
      document.getElementById("total11").value=amt11;
	  
	  var note12= document.getElementById("note12").value;
      var qnt12=document.getElementById("Quantity12").value;
        var amt12=note12*qnt12;
      document.getElementById("total12").value=amt12;
	  
	  var note13= document.getElementById("note13").value;
      var qnt13=document.getElementById("Quantity13").value;
        var amt13=note13*qnt13;
      document.getElementById("total13").value=amt13;
	  
	  var note14= document.getElementById("note14").value;
      var qnt14=document.getElementById("Quantity14").value;
        var amt14=note14*qnt14;
      document.getElementById("total14").value=amt14;
	  
	  var note15= document.getElementById("note15").value;
      var qnt15=document.getElementById("Quantity15").value;
        var amt15=note15*qnt15;
      document.getElementById("total15").value=amt15;
	  
	  var note16= document.getElementById("note16").value;
      var qnt16=document.getElementById("Quantity16").value;
        var amt16=note16*qnt16;
      document.getElementById("total16").value=amt16;
	  
	  var note17= document.getElementById("anup").value;
	  var amt17=note17
	  document.getElementById("total17").value=amt17;
	  
	  var total1= document.getElementById("total1").value;
	  var total2= document.getElementById("total2").value;
	  var total3= document.getElementById("total3").value;
	  var total4= document.getElementById("total4").value;
	  var total5= document.getElementById("total5").value;
	  var total6= document.getElementById("total6").value;
	  var total7= document.getElementById("total7").value;
	  var total8= document.getElementById("total8").value;
	  var total9= document.getElementById("total9").value;
	  var total10= document.getElementById("total10").value;
	  var total11= document.getElementById("total11").value;
	  var total12= document.getElementById("total12").value;
	  var total13= document.getElementById("total13").value;
	  var total14= document.getElementById("total14").value;
	  var total15= document.getElementById("total15").value;
	  var total16= document.getElementById("total16").value;
	  var total17= document.getElementById("total17").value;
	  var total18= document.getElementById("total18").value;
	  var total19= document.getElementById("total19").value;
	  var total20= document.getElementById("total20").value;
	  var total21= document.getElementById("total21").value;
	  var total22= document.getElementById("total22").value;
	  var total23= document.getElementById("total23").value;
	  var total24= document.getElementById("total24").value;
	  var total25= document.getElementById("total25").value;
	  var total26= document.getElementById("total26").value;
	 
	  var all1=+(total1)+ +(total3)+ +(total5)+ +(total7)+ +(total9)+ +(total11)+ +(total14)+ +(total15)+ +(total16)+ +(total17)+ +(total18)+ +(total19)+ +(total20)+ +(total21)+ +(total22)+ +(total23)+ +(total24)+ +(total25);
	  document.getElementById("all_total").value=all1;
	  
	  var qt20=+(qnt2)+ +(qnt4)+ +(qnt6)+ +(qnt8)+ +(qnt10)+ +(qnt12);
	  document.getElementById("non").value=qt20;
	  
	  var amt20=+(total2)+ +(total4)+ +(total6)+ +(total8)+ +(total10)+ +(total12);
	  document.getElementById("total20").value=amt20;
	  
	  var note18= document.getElementById("dipika").value;
	  var amt18=note18
	  document.getElementById("total18").value=amt18;
	  
	  var note21= document.getElementById("bc").value;
	  var amt21=note21
	  document.getElementById("total21").value=amt21;
	  
	  var note22= document.getElementById("exc").value;
	  var amt22=note22
	  document.getElementById("total22").value=amt22;
	  
	  var note23= document.getElementById("ac").value;
	  var amt23=note23
	  document.getElementById("total23").value=amt23;
	  
	  var note24= document.getElementById("ofe").value;
	  var amt24=note24
	  document.getElementById("total24").value=amt24;
	  
	  var note25= document.getElementById("pc").value;
	  var amt25=note25
	  document.getElementById("total25").value=amt25;
	  
	  var note26= document.getElementById("ob").value;
	  var amt26=note26
	  document.getElementById("total26").value=amt26;
	 var amt27=total26
	  document.getElementById("total26_1").value=amt27;
	  
	  var note19= document.getElementById("loan").value;
	  var amt19=note19
	  document.getElementById("total19").value=amt19;
	  
	  var ato= document.getElementById("all_total").value;
	  var pob= document.getElementById("total26_1").value;
	  var mib=-(pob)- -(ato) 
	  document.getElementById("db").value=mib;
	  
	  
var dt = new Date();
document.getElementById("date").innerHTML = dt.toLocaleDateString();

var dt1 = new Date();
document.getElementById("time").innerHTML = dt1.toLocaleTimeString();


document.getElementById("Quantity1").max = "10";
	  }
	  
function GetPrint()
{
    /*For Print*/
    window.print();
}
