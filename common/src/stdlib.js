module.exports = `
[= null [[\\[]]]]
[= null? [\\[x] [== x null]]]
[= zero [num \`0\`]]
[= one [num \`1\`]]
[= two [num \`2\`]]
[= true [<= one two]]
[= false [<= two one]]
[= bool? [\\[x]
  [|| [== x true] [\\[] [== x false]]]
]]
[= newline \`
\` ]
[= println [\\ [x] [print x] [print newline]]]
[= on [\\[cond then]
  [if cond then [\\[]]]
]]
[= && [\\[a b]
  [if a b [\\[] false]]
]]
[= || [\\[a b]
  [if a [\\[] a] b]
]]
[= == [\\ [x y] [&& [<= x y] [\\ [] [<= y x]]]]]
[= != [\\ [x y] [! [== x y]]]]
[= < [\\ [x y] [&& [<= x y] [\\ [] [! [>= x y]]]]]]
[= > [\\ [x y] [< y x]]]
[= >= [\\ [x y] [<= y x]]]
[= get [\\[var] [var get]]]
[= let [\\[var value] [[var let] value]]]
[= += [\\[var value] [let var [+ [get var] value]]]]
[= ++ [\\[v] [+= v one]]]
[= -= [\\[var value] [let var [- [get var] value]]]]
[= -- [\\[v] [-= v one]]]


[= map [\\ [fn seq] 
  [\\[c] [seq [compose c fn]]]
]]    
[= filter [\\ [pred seq] 
  [\\[c] 
    [seq [\\[x] 
       [on [pred x] [\\[] [c x]]]
  ]]]
]]
[= first [\\ [gen] [at zero gen]]]
[= empty? [\\ [gen]
  [first [\\ [return]
    [gen [\\ [_] [return false]]]
    [return true]
  ]]
]]
[= take [\\ [n gen]
    [\\ [yield]
        [= i [var zero]]
        [first [\\ [ret]
           [gen [\\ [x]
              [on [> [++ i] n]
                  [\\[] [ret null]]
              ]
              [yield x]
           ]]
        ]]
    ]
]]
[= skip [\\ [n gen]
    [\\ [yield]
        [= i [var zero]]
        [first [\\ [ret]
           [gen [\\ [x]
              [on [> [++ i] n]
                  [yield x]
              ]
           ]]
        ]]
    ]
]]
[= assert [\\[condition] [on [! condition] [\\ [] [throw \`Assertion error\`]]]]]
[= assert-fail [\\[body]
  [assert [catch 
    [\\[]
      [body]
      false
    ]
    [\\[e] true]
  ]]
]]
[= assert== [\\[expected value] [assert [== expected value]]]]
[= failed-tests [var zero]]
[= test [\\ [title body]
  [print title]
  [catch 
    [\\[]
      [body]
      [println \` - Ok\`]
    ]
    [\\[e]
      [++ failed-tests]
      [println \` - Failed\`]
    ]
  ] 
]]
[= skip-test [\\ [title body]]]
[= reduce [\\ [f init coll]
    [= result [var init]]
    [coll [\\ [x] 
      [let result [f [get result] x]]
    ]]
    [get result]
]]
[= sum [\\ [gen] [reduce + zero gen]]]
[= product [\\ [gen] [reduce * one gen]]]
[= pi [js-get [js-get js-global \`Math\`] \`PI\`]]
[= exp [js-get [js-get js-global \`Math\`] \`exp\`]]
[= log [js-get [js-get js-global \`Math\`] \`log\`]]
[= sin [js-get [js-get js-global \`Math\`] \`sin\`]]
[= cos [js-get [js-get js-global \`Math\`] \`cos\`]]
[= tan [js-get [js-get js-global \`Math\`] \`tan\`]]
[= asin [js-get [js-get js-global \`Math\`] \`asin\`]]
[= acos [js-get [js-get js-global \`Math\`] \`acos\`]]
[= atan [js-get [js-get js-global \`Math\`] \`atan\`]]
[= atan2 [js-get [js-get js-global \`Math\`] \`atan2\`]]
[= sinh [js-get [js-get js-global \`Math\`] \`sinh\`]]
[= cosh [js-get [js-get js-global \`Math\`] \`cosh\`]]
[= tanh [js-get [js-get js-global \`Math\`] \`tanh\`]]
[= asinh [js-get [js-get js-global \`Math\`] \`asinh\`]]
[= acosh [js-get [js-get js-global \`Math\`] \`acosh\`]]
[= atanh [js-get [js-get js-global \`Math\`] \`atanh\`]]
[= ceil [js-get [js-get js-global \`Math\`] \`ceil\`]]
[= floor [js-get [js-get js-global \`Math\`] \`floor\`]]
[= sqrt [js-get [js-get js-global \`Math\`] \`sqrt\`]]
[= length [\\[s] 
   [js-get s \`length\`]
]]
[= uppercase [\\ [s]
  [js-call s \`toUpperCase\` [,]]
]]
[= lowercase [\\ [s]
  [js-call s \`toLowerCase\` [,]]
]]
[= substring [\\ [s from length]
  [js-call s \`substr\` [, from length]]
]]
[= sort [\\ [order coll]
    [= c [\\[a b]
      [if [order a b]
        [\\[] [~ one]]
        [\\[][if [order b a]
          [\\[] one]
          [\\[] zero]
        ]]
      ]
    ]]
    
    [js-wrap [js-call [js-unwrap coll] \`sort\` [, c]]]
]]
[= concat [\\[elements] [join \`\` elements]]]
[= write [\\[elements] [print [concat elements]]]]
[= writeln [\\[elements] [println [concat elements]]]]
[= type [\\[] [\\[x] x]]]
[= Type [type]]
[= Any [type]]
[= Real [type]]
[= Int [type]]
[= String [type]]
[= Bool [type]]
[= Null [type]]
[= ? [\\[t] [type]]]
[= Any? [? Any]]
[= Fun [\\[arg-types result-type] [type]]]
[= F0 [\\[R] [Fun [,] R]]]
[= F1 [\\[A R] [Fun [, A] R]]]
[= F2 [\\[A1 A2 R] [Fun [, A1 A2] R]]]
[= F3 [\\[A1 A2 A3 R] [Fun [, A1 A2 A3] R]]]
[= F4 [\\[A1 A2 A3 A4 R] [Fun [, A1 A2 A3 A4] R]]]
[= Seq [\\[T] [F1 [F1 T Null] Null]]]
[= Req [\\[signature] [type]]]
[= Gen [\\[def] [type]]]
`