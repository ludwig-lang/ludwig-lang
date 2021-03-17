# The Ludwig Programming Language

__All code samples in this document can be executed and edited directly in the browser.
Please check out [an interactive version](https://ludwig-lang.github.io/ludwig-lang/) of this page.__

Ludwig is a minimalistic high-level multi-paradigm dynamically-typed programming language 
with a super-simple but human-friendly syntax.

The aim of this project is to explore a possibility of building a practically usable and human-friendly programming language
using the fewest number of language constructs.

Ludwig is named after Ludwig Wittgenstein, a prominent Austrian-British philosopher who worked in the fields of philosophy of 
mathematics and philosophy of language.

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
define new control structures as regular functions. The same can be done in Lisp, but Ludwig achieves it without 
using Lisp macros or any similar metaprogramming technique 
and has just two special forms comparing to more than 25 in most LISP realizations.

The reference implementation of Ludwig interpreter is written in Java Script and can be used in both NodeJS and browser applications.
Due to the simplicity of the language, implementation of an interpreter or a compiler in other languages including Ludwig itself
should be an easy task. 

Ludwig contains 0.00% syntax sugar. This means that programs written in Ludwig are typically longer than equivalent programs
written in other dynamic languages such as Python, JavaScript or LISP using various flavors of syntax sugar to provide
shortcuts to common operations. As with Lisp's parentheses, some people may find ubiquitous square brackets in Ludwig code 
annoying and distracting. With its extremely simple and regular (even comparing to Lisp's) syntax, Ludwig is a great 
candidate for experiments with non-textual structural or projectional editing approaches. 

## The syntax

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

Congratulations! At this point I've learned Ludwig's syntax in full.
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

The constant `null` represents a special value signifying an absence of anu other value.

A function with an empty body always returns `null`:
```
[= foo [\[]]]

[foo]
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

Arithmetic operations:
```
[= x [num `7`]]
[= y [num `3`]]
[println [+ x y]]
[println [- x y]]
[println [* x y]]
[println [/ x y]]
# modulo
[println [mod x y]]
[println [mod y x]]
# integer division
[println [div x y]]
[println [div y x]]
# negation
[println [~ x]]
```

### Functions

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

All are fine
```
[println [arity ,]] # returns 0 but it's actually "any"
[println [,]]
[println [, one]]
[println [, one two]]
```


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
[= x [var zero]]
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
    [println [get i]]
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
### Lists
Lists are basically materialized generators which store values in memory instead of calculating them on every call.
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

Be careful, if you call `list` on an infinite generator, your application will crash with out of memory error!

Again, lists are generators, are "normal" functions. However, list-backed generators have a number of distinctive properties:
- `[size gen]` and  `[at index gen]` require constant time, O(1).
- lists have nice string representations, e.g. `[ 1, 2, 3 ]`
- lists are implemented using persistent data structures, meaning that such operations as addition or deletion of list elemnts
involve only limited copying 


### Sets


### Records

### Lazy evaluation

```
[= instance [lazy [\[]
[println `Calculating...`]
`A result of a very expensive calulation`
]]]

# Prints "Calculating..." only once
[println [value]]
[println [value]]
```
