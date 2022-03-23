# The Ludwig Programming Language

_For the clarity we are aiming at is indeed complete clarity. Ludwig Wittgenstein_


> All code samples in this document can be executed and edited directly in the browser.
> Please check out [an interactive version](https://ludwig-lang.github.io/ludwig-lang/) of this page.

## Why Ludwig?
Ludwig is a high-level multi-paradigm dynamically-typed programming language 
with a super-simple but human-friendly syntax. It's built upon a minimalistic set of basic concepts,
but naturally expands _ad inifinitum_ like a seed becomes a tree.
It seamlessly unifies functional and object-oriented styles of programming,
encourages single assignment immutability but permits mutable state when necessary,
supports lazy evaluation and tail recursion, and provides a uniform API for both "fluent" generators and materialized persistent data structures. 

The aim of this project is to explore a possibility of building a practically usable and human-friendly programming language
using the fewest number of language constructs.

Ludwig is named after Ludwig Wittgenstein, a prominent Austrian-British philosopher who worked in the fields of philosophy of 
mathematics and philosophy of language. Many of the ideas realized in Ludwig come from such programming languages like Lisp, Smalltalk,
Rebol and Red, but it was no less inspired by the dizzying passion for simplicity and clarity which can be found in the works of Ludwig Wittgenstein.
 

We believe that after its run-time library and tooling mature, Ludwig can be used as a primary language for writing all kinds
of software, from simple scripts to server-side applications.
Besides that, the extreme simplicity of the language opens the way for other types of use:
- as a portable target "back-end" language for translation from other languages
- as an educational language, both for the ease of learning and the simplicity of implementation
- as an embedded low-code/rule language
- in genetic programming research and applications
- as an intermediate representation for static analysis and optimization algorithms

Ludwig doesn't have and doesn't need special syntax for such basic constructs as `if` or `for` statements, 
module imports, visibility modifiers, object instantiation, visibility modifiers, and even numerical or boolean literals!
Nonetheless, it does support all the aforementioned features in a very consistent and easy to grasp manner. 
Basically, instead of having a fixed set of hard-coded constructs such as the `if-then-else` statement, Ludwig allows you to 
define new control structures as regular functions. The same can be done in LISP, but Ludwig achieves it without 
using LISP macros or any similar metaprogramming technique 
and has just two special forms comparing to more than 25 in most LISP realizations.

The reference implementation of Ludwig interpreter is written in Java Script and can be used in both NodeJS and browser applications.
Due to the simplicity of the language, implementation of an interpreter or a compiler in other languages including Ludwig itself
should be an easy task. 

## Getting started

The JavaScript implementation of Ludwig comes in three versions, one for back-end NodeJS development, one for front-end development,
and , finally, one for cross-platform development. They can be added to your *npm* project using one of the following commands:
```bash
npm install ludwig-lang-backend
``` 
```bash
npm install ludwig-lang-frontend
``` 
```bash
npm install ludwig-lang-common
```
The back-end and the front-end versions basically just extend the cross-platform version with platform-specific functions.
The back-end version also provides an interpreter of *.ludwig files and an interactive REPL.

## Syntax and basic concepts

I promise you, it will take you no longer than 5 minutes to learn the full syntax. Let's start with something very simple.

```
# Our very first program
[println `Hello, World`]
```

The first line contains a comment starting with `#`.

The second calls the standard function `println` passing the string literal `Hello, World` as an argument.
The syntax `[function arg1 arg2...]` used for function invocation is similar to LISP's S-expressions.
Ludwig uses square brackets instead of LISP's parentheses for two reasons:
- to make it visually distinguishable from LISP
- for the ease of typing. On most keyboards you need to actually press `Shift-(` to type a parenthesis
and just `[` for a bracket.

String literals are surrounded with backquotes.    
 

Let's now consider a slightly more complex example:
```
# Let's define a function first
[= hello [\ [name] 
  [print `Hello, `]
  [println name]
]]

[hello `World`]
```

It defines a new function, `hello` with a single argument, `name` 
(strictly speaking, it binds symbol `hello` to an anonymous lambda-function).
The syntax `[= symbol value]` is used for all assignments.
All symbols in Ludwig are constants, so you cannot redefine one, but some of them may have mutable "inner" state.


The function body in enclosed with square brackets and consists of the special symbol `\`
which stands for the Greek letter λ *"Lambda"*, a list of arguments (just one in our case) enclosed with brackets,
and the function's body, consisting in our case of two expressions, 
one printing the word `Hello`, another printing the argument `name`.

The formal syntax for a λ-function is `[\ [argument*] expression*]`.
The result of a λ-function is produced by the last expression of its body.
Each expression in the body can be a symbol, a string literal, an assignment, a function invocation or a nested λ-function literal.

Finally, we call the newly defined function, passing `World` as an argument.

Congratulations! At this point You've learned Ludwig's syntax in full.
The example above contains all the possible Ludwig syntax constructs.
Yes, again: this is everything you need to know:
- whitespace doesn't matter 
- comments start with `#`
- string literals should be put within \` back-quotes \`
- function invocations use "square-bracketed" S-expressions 
- assignments have the form `[= symbol value ]`
- anonymous functions are defined using the λ-syntax: `[\ [argument*] expression*]`
- symbols (constants' names) can be anything that doesn't clash with the above rules

Yes, Ludwig does support control structures, numbers and boolean values, mutable state, collections, objects, module imports and much more, 
but all these features don't require any new syntax constructs.


## Types

### Null

The constant `null` represents a special value signifying an absence of any other value.

A function with an empty body always returns `null`:
```
[= foo [\[]]]

[print[foo]]
```

### Strings

Strings literals can contain single and double quotes:
```
`It's a "good" string`
```

Multi-line strings:
```
`A
multiline
string`
```

An empty string literal:
```
``
```

### Booleans

#### The "if" function

```
[if true 
  [\ [] [println `It's true`]]
  [\ [] [println `It's not true`]]
]
```

```
[if false 
  [\ [] [println `It's true`]]
  [\ [] [println `It's not true`]]
]
```
Chained if:
```
[= sign [\[x]
    [if [< x zero] 
        [\[] [~ one]]
        [\[] [if [> x zero]
                 [\[] one]
                 [\[] zero]
        ]]
    ]
]]

[println [sign [num `-100`]]]
[println [sign [num `0`]]]
[println [sign [num `0.0001`]]]
```
### Numbers

Numbers are first-class objects in Ludwig. However, there is no support for numeric literals in Ludwig's syntax.
Instead, Ludwig provides a few functions for *parsing* strings into numbers. The most commonly used parsing function is `num`
which parses a number from its decimal representation. 

Valid number formats:
```
[println [num `123.45`]]
[println [num `+123.45`]]
[println [num `1.2345E2`]]
[println [num `1.2345e+2`]]
[println [num `1_000_000_000`]]
[println [num `NaN`]]
[println [num `Infinity`]]
[println [num `-Infinity`]]
```

This may seem awful at a first glance but this approach has in fact a number of advantages over syntax-level support for numeric literal.
First of all, the fact that the core syntax of the language remains very simple makes it simple to create all kinds of tools 
like IDE plugins or code highlighters for the language.
Finally, most developers actually very rarely need to declare a numeric constant. Most numbers come from IO and require parsing anyway.
Most hardcoded constants in a typical codebase are small integer numbers 0, 1, 2. Ludwig defines those numbers as named constants:
```
[println zero]
[println one]
[println two]
```

Arithmetic operations:
```
[= x [num `7`]]
[= y [num `3`]]
[println [+ x y]]
[println [- x y]]
[println [* x y]]
[println [/ x y]]
[println [^ x y]]
# modulo
[println [mod x y]]
[println [mod y x]]
# integer division
[println [div x y]]
[println [div y x]]
# negation
[println [~ x]]
```
Unlike LISP where you can sum multiple numbers at once, e.g. `(+ 1 2 3 4)`, in Ludwig all binary arithmetic operators take exactly two arguments.
Ludwig also uses separate symbols for subtraction (`~`) and unary negation (`~`).

### Functions

### The anatomy of a function

### Recursion

### Tail recursion

### Mutually recursive functions

### Number of arguments

Function `[arity f]` returns the number of arguments of function `f`:
```
[println [arity [\[] [print `booo`]]]]
[println [arity +]]
[println [arity if]]
```

All Ludwig functions except to `,` (the list constructor) have fixed number of arguments.
```
# this will produce an error
[+ one] 
```

```
# this too
[+ one one one] 
```

The list constructor function `,` can accept any number of arguments
```
[println [arity ,]]
[println [,]]
[println [, one]]
[println [, one two]]
```

Following the philosophy of the language, we are not planning to introduce any other variadic functions bu `,`.
Even though variadic functions can be convenient, they also introduce unnecessary ambiguities and sometimes lead to hard-to-spot bugs.

### Tail recursion

### Errors

## Functions for everything

### Variables
As was said before, all bindings in Ludwig are static.
Once a symbol is assigned a value, it cannot be assigned another value in the same lexical context.
```
[= x `a`] # okay
[= x `b`] # this will fail

```
This means that all bindings are immutable. That is very good for the correctness of your program, but sometimes
you do need mutable state. Ludwig allows for mutability by providing a special kind of container primitive which internal
state can be mutated. These containers are quite naturally called "variables" or "vars".

While it's possible to create other high-level mutable objects **using** *var* objects, they are the only primitives
allowing for mutability.
A variable object can be created using `[var initial-value]` function.
```
[= x [var one]]
```

The value of a variable can be retrieved using `let` function and modified using `set`:

```
[= x [var one]]
[println [get x]]
[let x two] 
[println [get x]]
```

Variables containing numerical values can be incremeted or decremented:
```
[= x [var zero]]
[++ x]
[println [get x]]
[-- x] 
[println [get x]]
```

Variables can be used to create "stateful functions":
```
[= counter [var zero]]
[= next_id [\[] [++ counter]]]

[println [next_id]]
[println [next_id]]
[println [next_id]]
```

The example above works fine, but what if we want to hide (encapsulate) its internal state?
The old wrapping trick does just that: 
```
[= next_id [[\[]  
  [= counter [var zero]]  
  [\[] [++ counter]]
]]]
  

[println [next_id]]
[println [next_id]]
[println [next_id]]
```

### Generators
Ludwig's approach to iterables, generators, sequences, collections or how you name them is different from other programming languages.
A generator is simply a function which takes another single-argument function as an argument.
We call the second function *consumer*.
The generator may call the consumer an arbitrary (finite or infinite) number of times, feeding the consumer with values
(yielding values).


A generator that yields three values:
```
[= generator [\[consumer]
  [consumer zero]
  [consumer one]
  [consumer two]
]]

# We pass println as a consumer
[generator println]
```


A generator that yields 20 values:
```
[= generator [\[consumer]
  [= i [var zero]]
  [= iter [\ []
    [consumer [get i]]
    [on [< [++ i] [num `20`]]
      iter
    ]
  ]]
  [iter]
]]

[generator println]
```

A generator that yields nothing:
```
[= generator [\[consumer]
]]

# Will print nothing
[generator println]
```
### Working with generators
Of course,Ludwig generators support such functions as `size`, `filter`, `map`, `reduce`, etc.
Some of them deserve a special mention.
First of all, it's very easy to create an infinite generator. This means that calling `[size gen]` may never finish:
```
[= infinite [\[yield] 
  [yield one] 
  [infinite yield]
]]
[size infinite] # this will never finish
```
Normally, when you pass a consumer function to a generator, the generator will keep calling the function until **the generator**
decides to stop. The consumer is in sense passive. What could the consumer do to terminate the generator? Basically,
just one thing, throw an error:
```
[= generator [\[yield]
  [yield zero]
  [yield one]
  [yield two]
]]

[= consumer [\[x]
  [println x]
  [on [== x one] [\[]
      [throw `I've had enough`]
  ]]
]]

[catch [\[]
    [generator consumer]
  ]
  [\[e]
    [println `Terminated`]
  ]
]
``` 
Some functions **taking** a generator as an argument, such as `first`, `at`, `take` or `empty?` use this mechanism to terminate evaluation of the generator
(in fact, instead of `throw` and `catch`, they use a more lightweight mechanism, but the idea remains the same):
```
[= x [var zero]]
[= infinite [\[consumer]
  [consumer [++ x]]
  [infinite consumer]
]]

[at [num `99`] infinite]  # stops after the 100th iteration
```
The `first` function effectively terminates the generator and can be used to implement equivalents to `return`, `break` and `continue`
statements in other languages:
```
[= sign [\[x]
    [first [\[ret]
       [on [< x zero] [\[] [ret [~ one]]]]
       [on [> x zero] [\[] [ret one]]]
       [ret zero]
    ]]
]]
```
### Lists
Lists are materialized generators which store values in memory instead of calculating them on every call.
The easiest way to create a list is by using the list constructor function `,`.
It accepts an arbitrary number of arguments and returns a generator yielding those values.
```
[= items [, `a` `b` `c`]]
[println items]
[println [size items]]
[println [at zero items]]
[println [at one items]]
[println [at two items]]
[items println]
```
An empty list:
```
[,]
```

Any finite fluent (non-materialized) generator can be converted into a list using `[list gen]` function.
```
[= gen [\[yield]
    [println `yielding values`]
    [yield zero]
    [yield one]
    [yield two]
]]

[= items [list gen]] # prints `yielding values`
items
```

Be careful, if you call `list` on an infinite generator, your application will crash with an "out of memory" error!

Again, lists are generators, are "normal" functions. However, list-backed generators have a number of distinctive properties:
- `[size gen]` and  `[at index gen]` require constant time, O(1).
- lists have nice string representations, e.g. `List [ 1, 2, 3 ]`
- lists are implemented using persistent data structures, meaning that such operations as addition or deletion of list elements
involve only limited copying 


### Sets

Sets are materialized generators producing unique values.
Similarly to lists, sets are implemented using persistent data structures.
Every generator can be converted into a set using the `set` function. Please note that the order of elements
in the resulting set may differ from their order in the original generator.
The `contains` function takes constant time `O(1)` for sets. 

```
[= s [set [, `a` `b` `c` `a`]]]
[println s]
[println [contains s `a`]]
[println [contains s `d`]]

```


### Records

One can look at records from different angles. From one, they a just a convenient way to define a special kind of functions.
Let's define a tabular function f(x) which returns 1 when x = 0, and 0 when x = 1. You cand do that using `if`:
```
[= f [\ [x]
  [if [== x zero]
      [\[] one]
      [\[] [if [== x one]
               [\[] zero]
               [\[] [error `Unexpected argument value`]]
           ]
      ]
  ]
]]

[println [f zero]]
[println [f one]]
```
Records provide a less verbose way to achieve the same result:
```
[= f [record [, 
  zero one
  one zero
]]]

[println [f zero]]
[println [f one]]
```
You may call `f` a recorded function or simply a record.

This works for all kinds of argument anr result types:
```
[= p [record [, 
  `x` one
  `y` zero
]]]

[println p]
[println [p `x`]]
[println [p `y`]]
```
If you're going to create more "points" you can create a new function for that:
```
[= point [\[x y]
  [record [, 
    `x` x
    `y` y
  ]]
]]

[= p [point zero one]]
```
Or even a shorter one using the `export` function, which takes a list of variable names, resolves them and produces
a record:
```
[= point [\[x y]
  [export [, `x` `y`]]
]]

[= p [point zero one]]
```
Wait, it looks as if we've just declared a new type, `point` and then created an instance of that type!
This is not exactly true, Ludwig doesn't have a concept of classes, but it does support a certain form of object-oriented programming.

## Object-oriented programming, the good part

*"Objects are a poor man's closures."* Norman Adams

Ludwig's `record` function provides an easy, but by no means the only way of creating functions (closures) which behave like objects without a need
to introduce such new concepts as "classes", "constructors", "visibility levels", "fields" and "methods".
Ludwig's closures can implement multiple behaviors (aka methods), 
hiding the implementation details from the clients and can also have hidden internal state, mutable or immutable - you decide (encapsulation),
and last not least, they allow you to create multiple implementations of the same protocol, or set of methods (polymorphism).
The type system allows you to make your objects type-safe by defining by specifying which interfaces (protocols) they implement,
without tying the latter behavioral contracts to any concrete implementation (a class).


Let's make our point class ~~movable~~ mutable:
```
[= point [\[x y]
  [record [, 
    `x` [var x]
    `y` [var y]
  ]]
]]

[= p [point zero one]]
[let [p `x`] two]
p
```
Let's add a method:
```
[= point [\[x y]
  [= it [record [, 
    `x` [var x]
    `y` [var y]
    `dist` [\[] 
       [sqrt [+ [* [get [it `x`]] [get [it `x`]]] 
                [* [get [it `y`]] [get [it `y`]]]]]
    ]
  ]]]
]]

[= p [point zero one]]
[println [[p `dist`]]]
[let [p `x`] [num `3`]]
[let [p `y`] [num `4`]]
[println [[p `dist`]]]
```
### Encapsulation
We can also hide the mutable state from direct modification (encapsulate it):
```
[= point [\[x y]
  [= my-x [var x]]
  [= my-y [var y]]
  [record [, 
    `x` [\[] [get my-x]]
    `y` [\[] [get my-y]]
    `dist` [\[] 
       [sqrt [+ [* [get my-x] [get my-x]] 
                [* [get my-y] [get my-y]]]]
    ]
    `move` [\[x y]
       [let my-x x]
       [let my-y y]
     ]
  ]]
]]

[= p [point zero one]]
[println [[p `dist`]]]
[[p `move`] [num `3`] [num `4`]]
[println [[p `dist`]]]
```
### Polymorphism 
```
[= dog [\[name] [record [,
  `say` [\[] 
     [writeln [, name` says bark`]]
  ]
]]]]

[= cat [\[name] [record [,
  `say` [\[] 
     [writeln [, name` says mew`]]
  ]
]]]]

[= jack [dog `Jack`]]
[= kitty [cat `Kitty`]]

[= animals [, jack kitty]]

[animals [\[a] [[a `say`]]]]
```
### Multimethods
```
[= say [\[animal]
  [[animal say]]
]]

[= dog [\[name] [record [,
  say [\[] 
     [writeln [, name` says bark`]]
  ]
]]]]

[= cat [\[name] [record [,
  say [\[] 
     [writeln [, name` says mew`]]
  ]
]]]]

[= jack [dog `Jack`]]
[= kitty [cat `Kitty`]]

[= animals [, jack kitty]]

[animals say]
```
## Inheritance?

## Type annotations

## Ludwig idioms

### String interpolation

Many modern programming languages like Kotlin or JavaScript provide syntax sugar for *string interpolation* which allows including expressions into string literals.
For example, in JavaScript you can write
```javascript
const apples = 4;
const bananas = 3;
console.log(`I have ${apples + bananas} fruits: ${apples} apples and ${bananas} bananas`);
```
As was said before, Ludwing contains no syntax sugar, but nonetheless, supports sugar-free string interpolation.
```
[= apples [num `4`]]
[= bananas [num `3`]]
[println [concat[, `I have `[+ apples bananas]` fruits: `apples` apples and `bananas` bananas`]]]
```
or even shorter
```
[= apples [num `4`]]
[= bananas [num `3`]]
[writeln [, `I have `[+ apples bananas]` fruits: `apples` apples and `bananas` bananas`]]
```
## The standard library
### String functions
`[length s]`

`[substring s start length]`

### Mathematical functions
`[num? x]`

`[~ a]` Numerical negation, same as `[- zero a]`

`[+ a b]` Returns the sum of `a` and `b`

`[* a b]` Returns the product of `a` and `b`

`[- a b]`

`[/ a b]`

`[div a b]`

`[mod a b]`

### Logical functions

`true`

`false`

`[bool? x]`

`[! a]`

`[if condition then else]`

`[on condition action]`

`[& a b]`

`[| a b]`

`[&& a b]`

`[|| a b]`

### Variables

`[var initial-value]` Creates a new variable object and sets it to `initial-value`
```
[= x [var zero]]`
``` 

`[get v]`

`[let v]`

`[++ v]`

`[-- v]`

`[+= v delta]`

`[-= v delta]`

#### What is a variable?

A variable is an object that can be passed to the standard functions `get` and `let` which are defined as follows:
```
[= get [\[var] [[var `get`]]]]
[= let [\[var value] [[var `let`] value]]]
```
, so instead of calling 
```
[let my-var value]
[get my-var]
```
you can call
```
[[my-var `let`] value]
[[my-var `get`]]
```

As you can see, this means that a variable record must have two fields:
- `get` containing a no argument function returning variable's value
- `let` containing a one-argument function, which should set variable's value to the passed value

The built-in `var` function also defines `to-string` function which returns a string representation of the variable.

You can define a custom record type implementing the variable protocol:
```
[= checked-var [\[predicate initial]
    [assert [prdicate initial]]
    [= inner [var initial]]
    [record [,
        `let` [\[value]
            [assert [predicate value]]
            [let inner value]
        ]
        `get` [inner `get`]
        `to-string` [inner `to-string`]
    ]]
]]

[= positive? [\[x] [> x zero]]]
[= v [checked-var positive one]]
[let v two]
[let v [num `-1`]]
```

### Functions on functions

`[fun? x]` Returns `true` if x is a function, `false` otherwise

`[apply f args]`

`[arity f]`

`[memoize f]`
```
[= fib [memoize [\[n]
  [if [< n two]
    [\[] one]
    [\[] [+ [fib [- n two]] [fib [- n one]]]]
  ]
]]]

[fib [num `100`]]
```

`[compose f g]`

`[safely f]`

### Error handling

`[error message]`

`[catch body on-error]`

`[finally body finalizer]`

`[throw error]`

### Generator functions

`[map f gen]`

`[filter predicate gen]`

`[size gen]`

`[first gen]`

`[at n gen]`

`[empty? gen]`

`[take n gen]`

`[skip n gen]`

`[list gen]`

`[set gen]`

`[union a b]` Returns a union of two sets.

`[intersection a b]`

`[difference a b]`

`[, ...]` Creates a materialized list. 

`[join separator gen]`

`[keys rec]`

`[insert list index item]`

`[update list index item]`

`[remove coll index-or-key]`

### Basic IO
`[print x]`

`[println x]`

`[prompt question]`

`[write gen]`

`[writeln gen]`

### Testing
`[assert condition]`

`[test message body]`

### HTTP client
### HTTP server
### File IO
### Modules
`[load module-path]`
`[export symbols]`
### Metaprogramming
## The roadmap
## FAQ
### Isn't Ludwig too verbose?

Ludwig contains 0.00% syntax sugar. It means that some Ludwig constructs may look slightly more complex than their equivalents
in other languages such as Python, JavaScript or LISP using various flavors of syntax sugar to provide
shortcuts to common patterns. On the other hand, Ludwig programs can be much more compact and easier to understand than analogous programs written in
such Baroque languages as Java. Just compare "Hello world" written in Ludwig

```ludwig
[println `Hello, world`]
```
with its Java equivalent:
```java
package com.example;

public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, world");
  }
}
```
The Java version is not just much more verbose, to understand how it works, you first need to learn a number of concepts: 
packages and classes, fields and methods (including static methods), visibility modifiers, the "void" type, arrays, 
and the special "main" method and how Java passes command line arguments to it! And all this for the simplest "Hello, world!" primer!

As with LISP's parentheses, some people may find ubiquitous square brackets in Ludwig code 
annoying and distracting. With its extremely simple and regular (even comparing to Lisp's) syntax, Ludwig is a great 
candidate for experiments with non-textual structural or projectional editing approaches. 
