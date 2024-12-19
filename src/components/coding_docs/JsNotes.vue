<template>
    <h2>JS</h2>

    <button class="btn btn-link" data-bs-target="#js_introduction" data-bs-toggle="collapse"> Introduction </button>
    <div class="collapse" style="padding-left: 50px;" id="js_introduction">
        JavaScript was invented by Brendan Eich in 1995, and became an ECMA standard in 1997. <br>
        ECMA-262 is the official name of the standard. ECMAScript is the official name of the language. <br><br>

        The Original JavaScript ES1 ES2 ES3 (1997-1999) <br>
        The First Main Revision ES5 (2009) <br>
        The Second Revision ES6 (2015) <br>
        The Yearly Additions (2016, 2017 ... 2021, 2022)<br>
    </div>
    <br>

    <button class="btn btn-link" data-bs-target="#js_needed_webpages" data-bs-toggle="collapse"> WebPages </button>
    <div class="collapse" style="padding-left: 50px;" id="js_needed_webpages">
        <br>
        <a href="https://playcode.io/">https://playcode.io/</a>
        <a href="https://htmlcheatsheet.com/">htmlcheatsheet.com</a> <br>
        <a href="https://cheatography.com/davechild/cheat-sheets/javascript/pdf/?last=1462956370">cheatography.com</a>
        <br>
        <a href=" https://www.regexpal.com/">regexpal.com</a> <br>
    </div>
    <br>

    <button class="btn btn-link" data-bs-target="#js_more_introduction" data-bs-toggle="collapse"> More Intro </button>
    <div class="collapse py-2" style="padding-left: 50px;" id="js_more_introduction">
        In HTML, JavaScript code is inserted between {{ '< script> ' }} and {{ '</script>' }} tags. <br>
        A JavaScript function is a block of JavaScript code, that can be executed when "called" for. <br>
        JavaScript statements are composed of: Values, Operators, Expressions, Keywords, and Comments. <br>
        Semicolons separate JavaScript statements.<br>
        JavaScript ignores multiple spaces. <br>
        For best readability, programmers often like to avoid code lines longer than 80 characters. <br>
    </div>
    <br>
    

    <button class="btn btn-link" data-bs-target="#js_getElementById()" data-bs-toggle="collapse"> getElementById() </button>
    <div class="collapse py-2" style="padding-left: 50px;" id="js_getElementById()">
        --- document.getElementById("demo").innerHTML = "Hello JavaScript"; <br>
        --- document.getElementById("demo").style.fontSize = "35px"; <br>
        --- document.getElementById("demo").style.display = "none"; <br>
        --- document.getElementById("demo").style.display = "block"; <br><br>
    </div>
    <br>

    <button class="btn btn-link" data-bs-target="#js_display_possibilities" data-bs-toggle="collapse"> Display Properties </button>
    <div class="collapse py-2" style="padding-left: 50px;" id="js_display_possibilities">
        --- Writing into an HTML element, using <b>innerHTML</b>.<br>
        --- Writing into the HTML output using <b>document.write()</b>. (Can be used between script tags in Html) <br>
        --- Writing into an alert box, using <b>window.alert()</b>. <br>
        --- Writing into the browser console, using <b>console.log()</b>. <br>

        --- You cannot access output devices from JavaScript. The only exception is that you can call the
        <b>window.print()</b> method in the browser to print the content of the current window.
    </div>
    <br> 


    <button class="btn btn-link" data-bs-target="#js_statements" data-bs-toggle="collapse"> Statement </button>
    <div class="collapse py-2" style="padding-left: 50px;" id="js_statements">
        Semicolon (;) is used to separate statements. <br><br>


        let a, b, c; // Declare 3 variables <br>
        a = 5; // Assign the value 5 to a <br>
        b = 6; // Assign the value 6 to b <br>
        c = a + b; // Assign the sum of a and b to c <br><br>

        a = 5; b = 6; c = a + b; <br>
    </div>
    <br>

    <button class="btn btn-link" data-bs-target="#js_notations" data-bs-toggle="collapse"> Notations </button>
    <div class="collapse py-2" style="padding-left: 50px;" id="js_notations">
        <p>Camel Notation :- oneTwoThree</p>
        <p>Pascal Notation :- OneTwoThree</p>
    </div>
    <br>
 

    <button class="btn btn-link" data-bs-target="#js_data_types" data-bs-toggle="collapse"> Data Types </button>
    <div class="collapse py-2" style="padding-left: 50px;" id="js_data_types">
        <img src="../../assets/js_data_types.png">
    </div>
    <br>

    <p>Clean Architecture :- <a href="https://www.techtarget.com/whatis/definition/clean-architecture">Link</a> </p>
    <p>Call, Bind, Apply :- <a href="https://www.geeksforgeeks.org/explain-call-apply-and-bind-methods-in-javascript/">Link</a> </p>
    <p>Curry Functions :- <a href="https://www.slideshare.net/slideshow/higherorder-functions/27802353#2">Link</a></p>


    <button class="btn btn-link" data-bs-target="#js_need_to_learn" data-bs-toggle="collapse"> To Learn </button>
    <div class="collapse py-2" style="padding-left: 50px;" id="js_need_to_learn">
        Fullstack / SSR <br>
        Single-Page Application (SPA) <br>
        JamStack / SSG<br>
        Standalone Script <br>
    </div>
    <br>
</template>
