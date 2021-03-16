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

The reference implementation of Ludwig interpreter is written in Java Script and can be used in both NodeJS and browser applications .
Due to the simplicity of the language, implementing an interpreter or a compiler in other languages including Ludwig itself
should be an easy task. 

Ludwig contains 0.00% syntax sugar. This means that programs written in Ludwig are typically longer than equivalent programs
written in other dynamic languages such as Python, JavaScript or LISP using various flavors of syntax sugar to provide
shortcuts to common operations. As with Lisp's parentheses, some people may find ubiquitous square brackets in Ludwig code 
annoying and distracting. With its extremely simple and regular (even comparing to Lisp's) syntax, Ludwig is a great 
candidate for experiments with non-textual structural or projectional editing approaches. 

```
[println `Hello, World`]
```