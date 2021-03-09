---
title: "Caesar cipher"
date: "2021-03-09"
---

The Caesar cipher is a basic cryptography algorithm where each letter of the alphabet corresponds to another letter that is offset by a predetermined amount. For instance, if the offset is 3, we would get the following conversions: A -> D, B -> E, ... Y -> B, Z -> C (note how we wrap back around if the cipher takes us to either end of the alphabet).

<!-- end -->

#### Approach

Get the character code for each letter of the string to be encoded, then augment the character code by the size of the offset. Build the string using these augmented character codes.

##### JS

```js
const caesarCipher = (n, str) => {
  // alphabet char codes : 'a' === 97, 'z' === 122
  const s = str.toLowerCase();
  return s.split('').map(x => {
    if (/\s/.test(x)) return x;
    const char = x.charCodeAt(0);
    let aug = char + n;
    if (aug > 122) {
      aug -= 26
    } else if (aug < 97) {
      aug += 26
    }
    return String.fromCharCode(aug);
  }).join('')
}

let code = caesarCipher(3, 'This is a test');
console.assert(caesarCipher(-3, code) === 'this is a test')
```

We start by converting the string to lowercase to avoid any conflicts, then splitting the string into an array so we can use array methods such as `map`. We have a regex test to see if the current character is whitespace, which is ignored in this cipher. The cipher consists of determining the character code and augmenting it by whatever the offset is. 

If this augmentation results in a character code that is outside the bounds of the alphabet (A: 96, Z: 122) then we effectively wrap back around by either adding or subtracting the total number of letters in the alphabet. The character codes from 96-122 directly correspond to the alphabet from A-Z, so this manipulation works like a charm!

##### Lua

```lua
function caesarCipher(x, str)
  local s = string.lower(str)
  local code = ''
  for i=1,#s do
    char = string.byte(s, i)
    if char < 97 or char > 122 then
      code = code .. string.char(char)
      goto continue
    end
    aug = char + x
    if aug > 122 then aug = aug - 26 end
    if aug < 97 then aug = aug + 26 end
    code = code .. string.char(aug)
    ::continue::
  end
  return code
end

code = caesarCipher(3, 'this is a tested encoding')
assert('this is a tested encoding' == caesarCipher(-3, code))
```

Lua is a pretty straightforward one here, we do the same looping and have the same logic. The only differences are in the language paradigms, such as no `continue` statements, loop structure, and the way that we call string methods.

##### Go

```go
import (
	"fmt"
	"strings"
)

func main() {
	code := caesarCipher(3, "this is a test")
	fmt.Println(code)
	fmt.Println(caesarCipher(-3, code))
}

func caesarCipher(x int, str string) string {
	s := strings.ToLower(str)
	reader := strings.NewReader(s)
	writer := strings.Builder{}
	for reader.Len() > 0 {
		char,_,_ := reader.ReadRune()
		if char < 96 || char > 122 {
			writer.WriteRune(char)
			continue
		}
		char += rune(x)
		if char > 122 {
			char -= rune(26)
		} else if char < 97 {
			char += rune(26)
		}
		writer.WriteRune(char)
	}
	return writer.String()
}
```

The Go solution is a bit more complex. While the logic remains utterly the same, we are using `rune` instead of a byte or string slice, and we are also using string readers and builders. I'm not sure of the advantages that these provide, but according to the <a href="https://golang.org/src/strings/builder.go?s=386:479#L5">Builder documentation</a> this is the most efficient way to build a string in Go. Additionally, the reader is a more efficient, read-only buffer reader and the best way to iterate through our string.

#### Summary

A straight-forward prompt that allowed me to explore string manipulation and built-ins in Lua and Go. Definitely enjoyed this prompt and learning more about how to do things in Lua and Go that are trivial for me to do in JS at this point. That's what learning a new language is all about, and I'm loving it!