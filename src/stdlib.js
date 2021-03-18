module.exports = `
[= null [[\\[]]]]
[= null? [\\[x] [== x null]]]
[= zero [num \`0\`]]
[= one [num \`1\`]]
[= two [num \`2\`]]
[= pi [num \`3.141592653589793\`]]
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
[= ! [\\[x]
  [if x [\\[] false] [\\[] true]]
]]
[= & [\\[a b]
  [if a [\\[] b] [\\[] false]]
]]
[= && [\\[a b]
  [if a b [\\[] false]]
]]
[= | [\\[a b]
  [if a [\\[] a] [\\[] b]]
]]
[= || [\\[a b]
  [if a [\\[] a] b]
]]
[= == [\\ [x y] [&& [<= x y] [\\ [] [<= y x]]]]]
[= != [\\ [x y] [! [== x y]]]]
[= < [\\ [x y] [&& [<= x y] [\\ [] [! [>= x y]]]]]]
[= > [\\ [x y] [< y x]]]
[= >= [\\ [x y] [<= y x]]]
[= get [\\[var] [var \`get\`]]]
[= let [\\[var value] [[var \`let\`] value]]]
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
[= lazy [\\ [f]
    [= value [var null]]
    [= uninitialized [var true]]
    
    [\\[] 
      [on [get uninitialized] [\\[]
         [let value [f]]
         [let uninitialized false]
      ]]
      [get value]
    ]
]]
[= assert [\\[condition] [on [! condition] [\\ [] [error \`Assertion error\`]]]]]
`