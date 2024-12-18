<template>
  <h2>JS</h2>
  JavaScript was invented by Brendan Eich in 1995, and became an ECMA standard in 1997. <br>
  ECMA-262 is the official name of the standard. ECMAScript is the official name of the language. <br><br>

  The Original JavaScript ES1 ES2 ES3 (1997-1999) <br>
  The First Main Revision ES5 (2009) <br>
  The Second Revision ES6 (2015) <br>
  The Yearly Additions (2016, 2017 ... 2021, 2022)<br><br>

  <a href="https://htmlcheatsheet.com/">htmlcheatsheet.com</a> <br>
  <a href="https://cheatography.com/davechild/cheat-sheets/javascript/pdf/?last=1462956370">cheatography.com</a> <br>
  <a href=" https://www.regexpal.com/">regexpal.com</a>

  <br><br>

  In HTML, JavaScript code is inserted between {{'<script>'}} and {{'</script>'}} tags. <br>
  A JavaScript function is a block of JavaScript code, that can be executed when "called" for. <br>
  JavaScript statements are composed of: Values, Operators, Expressions, Keywords, and Comments. <br>
  Semicolons separate JavaScript statements.<br>
  JavaScript ignores multiple spaces. <br>
  For best readability, programmers often like to avoid code lines longer than 80 characters. <br>


  <br><br>


  getElementById() <br>
    --- document.getElementById("demo").innerHTML = "Hello JavaScript"; <br>
    --- document.getElementById("demo").style.fontSize = "35px"; <br>
    --- document.getElementById("demo").style.display = "none"; <br>
    --- document.getElementById("demo").style.display = "block"; <br><br>


    JavaScript Display Possibilities <br>
    --- Writing into an HTML element, using <b>innerHTML</b>.<br>
    --- Writing into the HTML output using <b>document.write()</b>. (Can be used between script tags in Html) <br>
    --- Writing into an alert box, using <b>window.alert()</b>. <br>
    --- Writing into the browser console, using <b>console.log()</b>. <br>

    --- You cannot access output devices from JavaScript. The only exception is that you can call the <b>window.print()</b> method in the browser to print the content of the current window. 

    <br><br>
    let a, b, c;  // Declare 3 variables <br>
a = 5;        // Assign the value 5 to a <br>
b = 6;        // Assign the value 6 to b <br>
c = a + b;    // Assign the sum of a and b to c <br>

a = 5; b = 6; c = a + b; <br>



  <p>Camel Notation :- oneTwoThree</p>
  <p>Pascal Notation :- OneTwoThree</p>
  <p>Clean Architecture :- <a href="https://www.techtarget.com/whatis/definition/clean-architecture">Link</a> </p>
  <p>JS Data Types :- <img src="../../assets/js_data_types.png"></p>
  <p>Call, Bind, Apply :- <a href="https://www.geeksforgeeks.org/explain-call-apply-and-bind-methods-in-javascript/">Link</a> </p>
  <p>Curry Functions :- <a href="https://www.slideshare.net/slideshow/higherorder-functions/27802353#2">Link</a></p>



  <div id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Collapsible Group Item #1
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Collapsible Group Item #2
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Collapsible Group Item #3
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
</div>

</template>
