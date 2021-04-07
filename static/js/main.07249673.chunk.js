(this["webpackJsonpludwig-lang-docs"]=this["webpackJsonpludwig-lang-docs"]||[]).push([[0],{38:function(e,n,t){},60:function(e,n,t){"use strict";t.r(n);var a=t(33),i=t(6),l=t(1),r=t(0),o=t(31),b=t.n(o),s=(t(38),t(12)),c=t.n(s),p=t(3),u=t.n(p),m=t(32),d=t.n(m),j=t(13),O=t.n(j);function g(){return(g=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}const h={};function f({components:e,...n}){return Object(r.b)("wrapper",g({},h,n,{components:e,mdxType:"MDXLayout"}),Object(r.b)("h1",null,"The Ludwig Programming Language"),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"For the clarity we are aiming at is indeed complete clarity. Ludwig Wittgenstein")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"All code samples in this document can be executed and edited directly in the browser.\nPlease check out ",Object(r.b)("a",{parentName:"p",href:"https://ludwig-lang.github.io/ludwig-lang/"},"an interactive version")," of this page.")),Object(r.b)("h2",null,"Why Ludwig?"),Object(r.b)("p",null,"Ludwig is a high-level multi-paradigm dynamically-typed programming language\nwith a super-simple but human-friendly syntax. It's built upon a minimalistic set of basic concepts,\nbut naturally expands ",Object(r.b)("em",{parentName:"p"},"ad inifinitum"),' like a seed becomes a tree.\nIt seamlessly unifies functional and object-oriented styles of programming,\nencourages single assignment immutability but permits mutable state when necessary,\nsupports lazy evaluation and tail recursion, and provides a uniform API for both "fluent" generators and materialized persistent data structures. '),Object(r.b)("p",null,"The aim of this project is to explore a possibility of building a practically usable and human-friendly programming language\nusing the fewest number of language constructs."),Object(r.b)("p",null,"Ludwig is named after Ludwig Wittgenstein, a prominent Austrian-British philosopher who worked in the fields of philosophy of\nmathematics and philosophy of language. Many of the ideas realized in Ludwig come from such programming languages like Lisp, Smalltalk,\nRebol and Red, but it was no less inspired by the dizzying passion for simplicity and clarity which can be found in the works of Ludwig Wittgenstein."),Object(r.b)("p",null,"We believe that after its run-time library and tooling mature, Ludwig can be used as a primary language for writing all kinds\nof software, from simple scripts to server-side applications.\nBesides that, the extreme simplicity of the language opens the way for other types of use:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},'as a portable target "back-end" language for translation from other languages'),Object(r.b)("li",{parentName:"ul"},"as an educational language, both for the ease of learning and the simplicity of implementation"),Object(r.b)("li",{parentName:"ul"},"as an embedded low-code/rule language"),Object(r.b)("li",{parentName:"ul"},"in genetic programming research and applications"),Object(r.b)("li",{parentName:"ul"},"as an intermediate representation for static analysis and optimization algorithms")),Object(r.b)("p",null,"Ludwig doesn't have and doesn't need special syntax for such basic constructs as ",Object(r.b)("inlineCode",{parentName:"p"},"if")," or ",Object(r.b)("inlineCode",{parentName:"p"},"for")," statements,\nmodule imports, visibility modifiers, object instantiation, visibility modifiers, and even numerical or boolean literals!\nNonetheless, it does support all the aforementioned features in a very consistent and easy to grasp manner.\nBasically, instead of having a fixed set of hard-coded constructs such as the ",Object(r.b)("inlineCode",{parentName:"p"},"if-then-else")," statement, Ludwig allows you to\ndefine new control structures as regular functions. The same can be done in LISP, but Ludwig achieves it without\nusing LISP macros or any similar metaprogramming technique\nand has just two special forms comparing to more than 25 in most LISP realizations."),Object(r.b)("p",null,"The reference implementation of Ludwig interpreter is written in Java Script and can be used in both NodeJS and browser applications.\nDue to the simplicity of the language, implementation of an interpreter or a compiler in other languages including Ludwig itself\nshould be an easy task. "),Object(r.b)("h2",null,"Getting started"),Object(r.b)("p",null,"The JavaScript implementation of Ludwig comes in three versions, one for back-end NodeJS development, one for front-end development,\nand , finally, one for cross-platform development. They can be added to your ",Object(r.b)("em",{parentName:"p"},"npm")," project using one of the following commands:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"npm install ludwig-lang-backend\n")),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"npm install ludwig-lang-frontend\n")),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"npm install ludwig-lang-common\n")),Object(r.b)("p",null,"The back-end and the front-end versions basically just extend the cross-platform version with platform-specific functions.\nThe back-end version also provides an interpreter of *.ludwig files and an interactive REPL."),Object(r.b)("h2",null,"Syntax and basic concepts"),Object(r.b)("p",null,"I promise you, it will take you no longer than 5 minutes to learn the full syntax. Let's start with something very simple."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"# Our very first program\n[println `Hello, World`]\n")),Object(r.b)("p",null,"The first line contains a comment starting with ",Object(r.b)("inlineCode",{parentName:"p"},"#"),"."),Object(r.b)("p",null,"The second calls the standard function ",Object(r.b)("inlineCode",{parentName:"p"},"println")," passing the string literal ",Object(r.b)("inlineCode",{parentName:"p"},"Hello, World")," as an argument.\nThe syntax ",Object(r.b)("inlineCode",{parentName:"p"},"[function arg1 arg2...]")," used for function invocation is similar to LISP's S-expressions.\nLudwig uses square brackets instead of LISP's parentheses for two reasons:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"to make it visually distinguishable from LISP"),Object(r.b)("li",{parentName:"ul"},"for the ease of typing. On most keyboards you need to actually press ",Object(r.b)("inlineCode",{parentName:"li"},"Shift-(")," to type a parenthesis\nand just ",Object(r.b)("inlineCode",{parentName:"li"},"[")," for a bracket.")),Object(r.b)("p",null,"String literals are surrounded with backquotes.    "),Object(r.b)("p",null,"Let's now consider a slightly more complex example:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"# Let's define a function first\n[= hello [\\ [name] \n  [print `Hello, `]\n  [println name]\n]]\n\n[hello `World`]\n")),Object(r.b)("p",null,"It defines a new function, ",Object(r.b)("inlineCode",{parentName:"p"},"hello")," with a single argument, ",Object(r.b)("inlineCode",{parentName:"p"},"name"),"\n(strictly speaking, it binds symbol ",Object(r.b)("inlineCode",{parentName:"p"},"hello")," to an anonymous lambda-function).\nThe syntax ",Object(r.b)("inlineCode",{parentName:"p"},"[= symbol value]"),' is used for all assignments.\nAll symbols in Ludwig are constants, so you cannot redefine one, but some of them may have mutable "inner" state.'),Object(r.b)("p",null,"The function body in enclosed with square brackets and consists of the special symbol ",Object(r.b)("inlineCode",{parentName:"p"},"\\"),"\nwhich stands for the Greek letter \u03bb ",Object(r.b)("em",{parentName:"p"},'"Lambda"'),", a list of arguments (just one in our case) enclosed with brackets,\nand the function's body, consisting in our case of two expressions,\none printing the word ",Object(r.b)("inlineCode",{parentName:"p"},"Hello"),", another printing the argument ",Object(r.b)("inlineCode",{parentName:"p"},"name"),"."),Object(r.b)("p",null,"The formal syntax for a \u03bb-function is ",Object(r.b)("inlineCode",{parentName:"p"},"[\\ [argument*] expression*]"),".\nThe result of a \u03bb-function is produced by the last expression of its body.\nEach expression in the body can be a symbol, a string literal, an assignment, a function invocation or a nested \u03bb-function literal."),Object(r.b)("p",null,"Finally, we call the newly defined function, passing ",Object(r.b)("inlineCode",{parentName:"p"},"World")," as an argument."),Object(r.b)("p",null,"Congratulations! At this point You've learned Ludwig's syntax in full.\nThe example above contains all the possible Ludwig syntax constructs.\nYes, again: this is everything you need to know:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"whitespace doesn't matter "),Object(r.b)("li",{parentName:"ul"},"comments start with ",Object(r.b)("inlineCode",{parentName:"li"},"#")),Object(r.b)("li",{parentName:"ul"},"string literals should be put within ","`"," back-quotes ","`"),Object(r.b)("li",{parentName:"ul"},'function invocations use "square-bracketed" S-expressions '),Object(r.b)("li",{parentName:"ul"},"assignments have the form ",Object(r.b)("inlineCode",{parentName:"li"},"[= symbol value ]")),Object(r.b)("li",{parentName:"ul"},"anonymous functions are defined using the \u03bb-syntax: ",Object(r.b)("inlineCode",{parentName:"li"},"[\\ [argument*] expression*]")),Object(r.b)("li",{parentName:"ul"},"symbols (constants' names) can be anything that doesn't clash with the above rules")),Object(r.b)("p",null,"Yes, Ludwig does support control structures, numbers and boolean values, mutable state, collections, objects, module imports and much more,\nbut all these features don't require any new syntax constructs."),Object(r.b)("h2",null,"Types"),Object(r.b)("h3",null,"Null"),Object(r.b)("p",null,"The constant ",Object(r.b)("inlineCode",{parentName:"p"},"null")," represents a special value signifying an absence of any other value."),Object(r.b)("p",null,"A function with an empty body always returns ",Object(r.b)("inlineCode",{parentName:"p"},"null"),":"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= foo [\\[]]]\n\n[print[foo]]\n")),Object(r.b)("h3",null,"Strings"),Object(r.b)("p",null,"Strings literals can contain single and double quotes:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},'`It\'s a "good" string`\n')),Object(r.b)("p",null,"Multi-line strings:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"`A\nmultiline\nstring`\n")),Object(r.b)("p",null,"An empty string literal:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"``\n")),Object(r.b)("h3",null,"Booleans"),Object(r.b)("h4",null,'The "if" function'),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[if true \n  [\\ [] [println `It's true`]]\n  [\\ [] [println `It's not true`]]\n]\n")),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[if false \n  [\\ [] [println `It's true`]]\n  [\\ [] [println `It's not true`]]\n]\n")),Object(r.b)("p",null,"Chained if:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= sign [\\[x]\n    [if [< x zero] \n        [\\[] [~ one]]\n        [\\[] [if [> x zero]\n                 [\\[] one]\n                 [\\[] zero]\n        ]]\n    ]\n]]\n\n[println [sign [num `-100`]]]\n[println [sign [num `0`]]]\n[println [sign [num `0.0001`]]]\n")),Object(r.b)("h3",null,"Numbers"),Object(r.b)("p",null,"Numbers are first-class objects in Ludwig. However, there is no support for numeric literals in Ludwig's syntax.\nInstead, Ludwig provides a few functions for ",Object(r.b)("em",{parentName:"p"},"parsing")," strings into numbers. The most commonly used parsing function is ",Object(r.b)("inlineCode",{parentName:"p"},"num"),"\nwhich parses a number from its decimal representation. "),Object(r.b)("p",null,"Valid number formats:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[println [num `123.45`]]\n[println [num `+123.45`]]\n[println [num `1.2345E2`]]\n[println [num `1.2345e+2`]]\n[println [num `1_000_000_000`]]\n[println [num `NaN`]]\n[println [num `Infinity`]]\n[println [num `-Infinity`]]\n")),Object(r.b)("p",null,"This may seem awful at a first glance but this approach has in fact a number of advantages over syntax-level support for numeric literal.\nFirst of all, the fact that the core syntax of the language remains very simple makes it simple to create all kinds of tools\nlike IDE plugins or code highlighters for the language.\nFinally, most developers actually very rarely need to declare a numeric constant. Most numbers come from IO and require parsing anyway.\nMost hardcoded constants in a typical codebase are small integer numbers 0, 1, 2. Ludwig defines those numbers as named constants:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[println zero]\n[println one]\n[println two]\n")),Object(r.b)("p",null,"Arithmetic operations:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= x [num `7`]]\n[= y [num `3`]]\n[println [+ x y]]\n[println [- x y]]\n[println [* x y]]\n[println [/ x y]]\n[println [^ x y]]\n# modulo\n[println [mod x y]]\n[println [mod y x]]\n# integer division\n[println [div x y]]\n[println [div y x]]\n# negation\n[println [~ x]]\n")),Object(r.b)("p",null,"Unlike LISP where you can sum multiple numbers at once, e.g. ",Object(r.b)("inlineCode",{parentName:"p"},"(+ 1 2 3 4)"),", in Ludwig all binary arithmetic operators take exactly two arguments.\nLudwig also uses separate symbols for subtraction (",Object(r.b)("inlineCode",{parentName:"p"},"~"),") and unary negation (",Object(r.b)("inlineCode",{parentName:"p"},"~"),")."),Object(r.b)("h3",null,"Functions"),Object(r.b)("h3",null,"The anatomy of a function"),Object(r.b)("h3",null,"Recursion"),Object(r.b)("h3",null,"Tail recursion"),Object(r.b)("h3",null,"Mutually recursive functions"),Object(r.b)("h3",null,"Number of arguments"),Object(r.b)("p",null,"Function ",Object(r.b)("inlineCode",{parentName:"p"},"[arity f]")," returns the number of arguments of function ",Object(r.b)("inlineCode",{parentName:"p"},"f"),":"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[println [arity [\\[] [print `booo`]]]]\n[println [arity +]]\n[println [arity if]]\n")),Object(r.b)("p",null,"All Ludwig functions except to ",Object(r.b)("inlineCode",{parentName:"p"},",")," (the list constructor) have fixed number of arguments."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"# this will produce an error\n[+ one] \n")),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"# this too\n[+ one one one] \n")),Object(r.b)("p",null,"The list constructor function ",Object(r.b)("inlineCode",{parentName:"p"},",")," can accept any number of arguments"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[println [arity ,]]\n[println [,]]\n[println [, one]]\n[println [, one two]]\n")),Object(r.b)("p",null,"Following the philosophy of the language, we are not planning to introduce any other variadic functions bu ",Object(r.b)("inlineCode",{parentName:"p"},","),".\nEven though variadic functions can be convenient, they also introduce unnecessary ambiguities and sometimes lead to hard-to-spot bugs."),Object(r.b)("h3",null,"Tail recursion"),Object(r.b)("h3",null,"Errors"),Object(r.b)("h2",null,"Functions for everything"),Object(r.b)("h3",null,"Variables"),Object(r.b)("p",null,"As was said before, all bindings in Ludwig are static.\nOnce a symbol is assigned a value, it cannot be assigned another value in the same lexical context."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= x `a`] # okay\n[= x `b`] # this will fail\n\n")),Object(r.b)("p",null,'This means that all bindings are immutable. That is very good for the correctness of your program, but sometimes\nyou do need mutable state. Ludwig allows for mutability by providing a special kind of container primitive which internal\nstate can be mutated. These containers are quite naturally called "variables" or "vars".'),Object(r.b)("p",null,"While it's possible to create other high-level mutable objects ",Object(r.b)("strong",{parentName:"p"},"using")," ",Object(r.b)("em",{parentName:"p"},"var")," objects, they are the only primitives\nallowing for mutability.\nA variable object can be created using ",Object(r.b)("inlineCode",{parentName:"p"},"[var initial-value]")," function."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= x [var one]]\n")),Object(r.b)("p",null,"The value of a variable can be retrieved using ",Object(r.b)("inlineCode",{parentName:"p"},"let")," function and modified using ",Object(r.b)("inlineCode",{parentName:"p"},"set"),":"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= x [var one]]\n[println [get x]]\n[let x two] \n[println [get x]]\n")),Object(r.b)("p",null,"Variables containing numerical values can be incremeted or decremented:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= x [var zero]]\n[++ x]\n[println [get x]]\n[-- x] \n[println [get x]]\n")),Object(r.b)("p",null,'Variables can be used to create "stateful functions":'),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= counter [var zero]]\n[= next_id [\\[] [++ counter]]]\n\n[println [next_id]]\n[println [next_id]]\n[println [next_id]]\n")),Object(r.b)("p",null,"The example above works fine, but what if we want to hide (encapsulate) its internal state?\nThe old wrapping trick does just that: "),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= next_id [[\\[]  \n  [= counter [var zero]]  \n  [\\[] [++ counter]]\n]]]\n  \n\n[println [next_id]]\n[println [next_id]]\n[println [next_id]]\n")),Object(r.b)("h3",null,"Generators"),Object(r.b)("p",null,"Ludwig's approach to iterables, generators, sequences, collections or how you name them is different from other programming languages.\nA generator is simply a function which takes another single-argument function as an argument.\nWe call the second function ",Object(r.b)("em",{parentName:"p"},"consumer"),".\nThe generator may call the consumer an arbitrary (finite or infinite) number of times, feeding the consumer with values\n(yielding values)."),Object(r.b)("p",null,"A generator that yields three values:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= generator [\\[consumer]\n  [consumer zero]\n  [consumer one]\n  [consumer two]\n]]\n\n# We pass println as a consumer\n[generator println]\n")),Object(r.b)("p",null,"A generator that yields 20 values:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= generator [\\[consumer]\n  [= i [var zero]]\n  [= iter [\\ []\n    [println [get i]]\n    [on [< [++ i] [num `20`]]\n      iter\n    ]\n  ]]\n  [iter]\n]]\n\n[generator println]\n")),Object(r.b)("p",null,"A generator that yields nothing:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= generator [\\[consumer]\n]]\n\n# Will print nothing\n[generator println]\n")),Object(r.b)("h3",null,"Working with generators"),Object(r.b)("p",null,"Of course,Ludwig generators support such functions as ",Object(r.b)("inlineCode",{parentName:"p"},"size"),", ",Object(r.b)("inlineCode",{parentName:"p"},"filter"),", ",Object(r.b)("inlineCode",{parentName:"p"},"map"),", ",Object(r.b)("inlineCode",{parentName:"p"},"reduce"),", etc.\nSome of them deserve a special mention.\nFirst of all, it's very easy to create an infinite generator. This means that calling ",Object(r.b)("inlineCode",{parentName:"p"},"[size gen]")," may never finish:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= infinite [\\[yield] \n  [yield one] \n  [infinite yield]\n]]\n[size infinite] # this will never finish\n")),Object(r.b)("p",null,"Normally, when you pass a consumer function to a generator, the generator will keep calling the function until ",Object(r.b)("strong",{parentName:"p"},"the generator"),"\ndecides to stop. The consumer is in sense passive. What could the consumer do to terminate the generator? Basically,\njust one thing, throw an error:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= generator [\\[yield]\n  [yield zero]\n  [yield one]\n  [yield two]\n]]\n\n[= consumer [\\[x]\n  [println x]\n  [on [== x one] [\\[]\n      [throw `I've had enough`]\n  ]]\n]]\n\n[catch [\\[]\n    [generator consumer]\n  ]\n  [\\[e]\n    [println `Terminated`]\n  ]\n]\n")),Object(r.b)("p",null,"Some functions ",Object(r.b)("strong",{parentName:"p"},"taking")," a generator as an argument, such as ",Object(r.b)("inlineCode",{parentName:"p"},"first"),", ",Object(r.b)("inlineCode",{parentName:"p"},"at"),", ",Object(r.b)("inlineCode",{parentName:"p"},"take")," or ",Object(r.b)("inlineCode",{parentName:"p"},"empty?")," use this mechanism to terminate evaluation of the generator\n(in fact, instead of ",Object(r.b)("inlineCode",{parentName:"p"},"throw")," and ",Object(r.b)("inlineCode",{parentName:"p"},"catch"),", they use a more lightweight mechanism, but the idea remains the same):"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= x [var zero]]\n[= infinite [\\[consumer]\n  [consumer [++ x]]\n  [infinite consumer]\n]]\n\n[at [num `99`] infinite]  # stops after the 100th iteration\n")),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"first")," function effectively terminates the generator and can be used to implement equivalents to ",Object(r.b)("inlineCode",{parentName:"p"},"return"),", ",Object(r.b)("inlineCode",{parentName:"p"},"break")," and ",Object(r.b)("inlineCode",{parentName:"p"},"continue"),"\nstatements in other languages:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= sign [\\[x]\n    [first [\\[ret]\n       [on [< x zero] [\\[] [ret [~ one]]]]\n       [on [> x zero] [\\[] [ret one]]]\n       [ret zero]\n    ]]\n]]\n")),Object(r.b)("h3",null,"Lists"),Object(r.b)("p",null,"Lists are materialized generators which store values in memory instead of calculating them on every call.\nThe easiest way to create a list is by using the list constructor function ",Object(r.b)("inlineCode",{parentName:"p"},","),".\nIt accepts an arbitrary number of arguments and returns a generator yielding those values."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= items [, `a` `b` `c`]]\n[println items]\n[println [size items]]\n[println [at zero items]]\n[println [at one items]]\n[println [at two items]]\n[items println]\n")),Object(r.b)("p",null,"An empty list:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[,]\n")),Object(r.b)("p",null,"Any finite fluent (non-materialized) generator can be converted into a list using ",Object(r.b)("inlineCode",{parentName:"p"},"[list gen]")," function."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= gen [\\[yield]\n    [println `yielding values`]\n    [yield zero]\n    [yield one]\n    [yield two]\n]]\n\n[= items [list gen]] # prints `yielding values`\nitems\n")),Object(r.b)("p",null,"Be careful, if you call ",Object(r.b)("inlineCode",{parentName:"p"},"list"),' on an infinite generator, your application will crash with an "out of memory" error!'),Object(r.b)("p",null,'Again, lists are generators, are "normal" functions. However, list-backed generators have a number of distinctive properties:'),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"[size gen]")," and  ",Object(r.b)("inlineCode",{parentName:"li"},"[at index gen]")," require constant time, O(1)."),Object(r.b)("li",{parentName:"ul"},"lists have nice string representations, e.g. ",Object(r.b)("inlineCode",{parentName:"li"},"List [ 1, 2, 3 ]")),Object(r.b)("li",{parentName:"ul"},"lists are implemented using persistent data structures, meaning that such operations as addition or deletion of list elements\ninvolve only limited copying ")),Object(r.b)("h3",null,"Sets"),Object(r.b)("p",null,"Sets are materialized generators producing unique values.\nSimilarly to lists, sets are implemented using persistent data structures.\nEvery generator can be converted into a set using the ",Object(r.b)("inlineCode",{parentName:"p"},"set")," function. Please note that the order of elements\nin the resulting set may differ from their order in the original generator.\nThe ",Object(r.b)("inlineCode",{parentName:"p"},"contains")," function takes constant time ",Object(r.b)("inlineCode",{parentName:"p"},"O(1)")," for sets. "),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= s [set [, `a` `b` `c` `a`]]]\n[println s]\n[println [contains s `a`]]\n[println [contains s `d`]]\n\n")),Object(r.b)("h3",null,"Records"),Object(r.b)("p",null,"One can look at records from different angles. From one, they a just a convenient way to define a special kind of functions.\nLet's define a tabular function f(x) which returns 1 when x = 0, and 0 when x = 1. You cand do that using ",Object(r.b)("inlineCode",{parentName:"p"},"if"),":"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= f [\\ [x]\n  [if [== x zero]\n      [\\[] one]\n      [\\[] [if [== x one]\n               [\\[] zero]\n               [\\[] [error `Unexpected argument value`]]\n           ]\n      ]\n  ]\n]]\n\n[println [f zero]]\n[println [f one]]\n")),Object(r.b)("p",null,"Records provide a less verbose way to achieve the same result:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= f [record [, \n  zero one\n  one zero\n]]]\n\n[println [f zero]]\n[println [f one]]\n")),Object(r.b)("p",null,"You may call ",Object(r.b)("inlineCode",{parentName:"p"},"f")," a recorded function or simply a record."),Object(r.b)("p",null,"This works for all kinds of argument anr result types:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= p [record [, \n  `x` one\n  `y` zero\n]]]\n\n[println p]\n[println [p `x`]]\n[println [p `y`]]\n")),Object(r.b)("p",null,'If you\'re going to create more "points" you can create a new function for that:'),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= point [\\[x y]\n  [record [, \n    `x` x\n    `y` y\n  ]]\n]]\n\n[= p [point zero one]]\n")),Object(r.b)("p",null,"Or even a shorter one using the ",Object(r.b)("inlineCode",{parentName:"p"},"export")," function, which takes a list of variable names, resolves them and produces\na record:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= point [\\[x y]\n  [export [, `x` `y`]]\n]]\n\n[= p [point zero one]]\n")),Object(r.b)("p",null,"Wait, it looks as if we've just declared a new type, ",Object(r.b)("inlineCode",{parentName:"p"},"point")," and then created an instance of that type!\nLet's make our point class ",Object(r.b)("del",{parentName:"p"},"movable")," mutable:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= point [\\[x y]\n  [record [, \n    `x` [var x]\n    `y` [var y]\n  ]]\n]]\n\n[= p [point zero one]]\n[let [p `x`] two]\np\n")),Object(r.b)("p",null,"Let's add a method:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= point [\\[x y]\n  [= it [record [, \n    `x` [var x]\n    `y` [var y]\n    `dist` [\\[] \n       [sqrt [+ [* [get [it `x`]] [get [it `x`]]] \n                [* [get [it `y`]] [get [it `y`]]]]]\n    ]\n  ]]]\n]]\n\n[= p [point zero one]]\n[println [[p `dist`]]]\n[let [p `x`] [num `3`]]\n[let [p `y`] [num `4`]]\n[println [[p `dist`]]]\n")),Object(r.b)("p",null,"We can also hide the mutable state from direct modification (encapsulate it):"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= point [\\[x y]\n  [= my-x [var x]]\n  [= my-y [var y]]\n  [record [, \n    `x` [\\[] [get my-x]]\n    `y` [\\[] [get my-y]]\n    `dist` [\\[] \n       [sqrt [+ [* [get my-x] [get my-x]] \n                [* [get my-y] [get my-y]]]]\n    ]\n    `move` [\\[x y]\n       [let my-x x]\n       [let my-y y]\n     ]\n  ]]\n]]\n\n[= p [point zero one]]\n[println [[p `dist`]]]\n[[p `move`] [num `3`] [num `4`]]\n[println [[p `dist`]]]\n")),Object(r.b)("h3",null,"Polymorphism"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= dog [\\[name] [record [,\n  `say` [\\[] \n     [print name]\n     [println ` says bark`]\n  ]\n]]]]\n\n[= cat [\\[name] [record [,\n  `say` [\\[] \n     [print name]\n     [println ` says mew`]\n  ]\n]]]]\n\n[= jack [dog `Jack`]]\n[= kitty [cat `Kitty`]]\n\n[= animals [, jack kitty]]\n\n[animals [\\[a] [[a `say`]]]]\n")),Object(r.b)("h2",null,"The standard library"),Object(r.b)("h3",null,"String functions"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[length s]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[substring s start length]")),Object(r.b)("h3",null,"Mathematical functions"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[num? x]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[~ a]")," Numerical negation, same as ",Object(r.b)("inlineCode",{parentName:"p"},"[- zero a]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[+ a b]")," Returns the sum of ",Object(r.b)("inlineCode",{parentName:"p"},"a")," and ",Object(r.b)("inlineCode",{parentName:"p"},"b")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[* a b]")," Returns the product of ",Object(r.b)("inlineCode",{parentName:"p"},"a")," and ",Object(r.b)("inlineCode",{parentName:"p"},"b")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[- a b]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[/ a b]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[div a b]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[mod a b]")),Object(r.b)("h3",null,"Logical functions"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"true")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"false")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[bool? x]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[! a]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[if condition then else]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[on condition action]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[& a b]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[| a b]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[&& a b]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[|| a b]")),Object(r.b)("h3",null,"Variables"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[var initial-value]")," Creates a new variable object and sets it to ",Object(r.b)("inlineCode",{parentName:"p"},"initial-value")),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= x [var zero]]`\n")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[get v]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[let v]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[++ v]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[-- v]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[+= v delta]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[-= v delta]")),Object(r.b)("h3",null,"Functions on functions"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[fun? x]")," Returns ",Object(r.b)("inlineCode",{parentName:"p"},"true")," if x is a function, ",Object(r.b)("inlineCode",{parentName:"p"},"false")," otherwise"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[apply f args]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[arity f]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[memoize f]")),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},"[= fib [memoize [\\[n]\n  [if [< n two]\n    [\\[] one]\n    [\\[] [+ [fib [- n two]] [fib [- n one]]]]\n  ]\n]]]\n\n[fib [num `100`]]\n")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[compose f g]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[safely f]")),Object(r.b)("h3",null,"Error handling"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[error message]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[catch body on-error]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[finally body finalizer]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[throw error]")),Object(r.b)("h3",null,"Generator functions"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[map f gen]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[filter predicate gen]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[size gen]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[first gen]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[at n gen]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[empty? gen]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[take n gen]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[skip n gen]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[list gen]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[set gen]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[union a b]")," Returns a union of two sets."),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[intersection a b]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[difference a b]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[, ...]")," Creates a materialized list. "),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[join separator gen]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[keys rec]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[insert list index item]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[update list index item]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[remove coll index-or-key]")),Object(r.b)("h3",null,"Basic IO"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[print x]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[println x]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[prompt question]")),Object(r.b)("h3",null,"Testing"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[assert condition]")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[test message body]")),Object(r.b)("h3",null,"HTTP client"),Object(r.b)("h3",null,"HTTP server"),Object(r.b)("h3",null,"File IO"),Object(r.b)("h3",null,"Modules"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"[load module-path]"),"\n",Object(r.b)("inlineCode",{parentName:"p"},"[export symbols]")),Object(r.b)("h3",null,"Metaprogramming"),Object(r.b)("h2",null,"The roadmap"),Object(r.b)("h2",null,"FAQ"),Object(r.b)("h3",null,"Isn't Ludwig too verbose?"),Object(r.b)("p",null,'Ludwig contains 0.00% syntax sugar. It means that some Ludwig constructs may look slightly more complex than their equivalents\nin other languages such as Python, JavaScript or LISP using various flavors of syntax sugar to provide\nshortcuts to common patterns. On the other hand, Ludwig programs can be much more compact and easier to understand than analogous programs written in\nsuch Baroque languages as Java. Just compare "Hello world" written in Ludwig'),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ludwig"},"[println `Hello, world`]\n")),Object(r.b)("p",null,"with its Java equivalent:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-java"},'package com.example;\n\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, world");\n  }\n}\n')),Object(r.b)("p",null,'The Java version is not just much more verbose, to understand how it works, you first need to learn a number of concepts:\npackages and classes, fields and methods (including static methods), visibility modifiers, the "void" type, arrays,\nand the special "main" method and how Java passes command line arguments to it! And all this for the simplest "Hello, world!" primer!'),Object(r.b)("p",null,"As with LISP's parentheses, some people may find ubiquitous square brackets in Ludwig code\nannoying and distracting. With its extremely simple and regular (even comparing to Lisp's) syntax, Ludwig is a great\ncandidate for experiments with non-textual structural or projectional editing approaches. "))}f.isMDXComponent=!0;var y=t(2),N="/ludwig-lang/",v=new Map;u.a.builtins.load=function(e){var n=O.a.normalize(O.a.join(N,e.endsWith(".ludwig")?e:e+".ludwig"));if(!v.has(n)){var t=d()(n).text(),a=N;N=O.a.dirname(n);try{v.set(n,u.a.eval(t,n))}finally{N=a}}return v.get(n)};var w=new Map([["`","`"],["[","]"]]),x=function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},C=function(e){var n=u.a.tokenize(e,!1,!1),t=0;return n.map((function(e){var n=function(e){switch(e){case"[":return"lb";case"]":return"rb";case"\\":return"lambda";case"=":return"assignment";default:return 0===e.trim().length?"ws":e.startsWith("#")?"comment":e.startsWith("`")?e.endsWith("`")&&1!==e.length?"string":"unterminated-string":"symbol"}}(e.value);switch(n){case"lb":n="lb-"+((++t-1)%9+1);break;case"rb":n="rb-"+(t<0?0:(t-1)%9+1),t--}return'<span class="ludwig-'.concat(n,'">').concat(x(e.value),"</span>")})).join("")};b.a.render(Object(y.jsx)(r.a,{components:{code:function(e){var n=Object(l.useState)(e.children.trim()),t=Object(i.a)(n,2),r=t[0],o=t[1],b=Object(l.useState)(),s=Object(i.a)(b,2),p=s[0],m=s[1],d=Object(l.useState)(""),j=Object(i.a)(d,2),O=j[0],g=j[1],h=Object(l.useState)(!0),f=Object(i.a)(h,2),N=f[0],v=f[1],k=e.className&&e.className.replace(/language-/,"");if(k&&"ludwig"!==k)return Object(y.jsx)("pre",{children:r});var L=Object(y.jsx)(c.a,{className:"ludwig-editor",value:r,readOnly:!N,onValueChange:o,highlight:C,onKeyPress:function(e){var n=e.target.selectionStart,t=Object(a.a)(e.target.value),i=e.key,l=w.get(i);l&&(t.splice(n,0,l),e.target.value=t.join(""),e.target.selectionEnd=n)}}),z=p&&Object(y.jsx)(c.a,{className:"ludwig-output",readOnly:!0,highlight:x,rows:Math.min(p.match(/[^\r\n]+/g).length,20),value:p}),T=O&&Object(y.jsx)(c.a,{className:"ludwig-error",readOnly:!0,highlight:x,rows:1,value:O});return Object(y.jsxs)("div",{children:[Object(y.jsxs)("div",{style:{position:"relative"},children:[L,Object(y.jsx)("button",{type:"button",disabled:!N,style:{position:"absolute",right:"0px",top:"0px"},onClick:function(){var e="",n=u.a.env();u.a.builtins.print=function(n){e+=u.a.builtins.str(n)},m(""),g(""),v(!1),setTimeout((function(){try{var t=u.a.eval(r,"",n);m(e+(null!==t&&void 0!==t?n.str(t):""))}catch(a){m(e),a instanceof u.a.LudwigError&&console.error(a.cause),console.error(a),g(a.message)}finally{v(!0)}}),0)},children:"\u25b6\ufe0fRun\ufe0f"})]}),z,T]})},blockquote:function(e){return null}},children:Object(y.jsx)(f,{})}),document.getElementById("root"))}},[[60,1,2]]]);
//# sourceMappingURL=main.07249673.chunk.js.map