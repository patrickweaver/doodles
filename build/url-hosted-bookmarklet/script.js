const hash = window.location.hash;
const name = document.getElementById("name");
const code = document.getElementById("code");
const description = document.getElementById("description");
const bookmarklet = document.getElementById("bookmarklet");

if (hash) {
  const hashArray = hash.split("&");

  const data = {
    name: "",
    code: "",
    description: "",
  };

  hashArray.forEach((i) => {
    let s = i;
    if (s[0] === "#") {
      s = s.slice(1, s.length);
    }
    const [k, v] = s.split("=");
    data[decodeURI(k)] = decodeURI(v);
  });
  
  if (data.code.slice(0, 3) === "js_") {
    data.code = `javascript:(function()${data.code.slice(3, data.code.length)})()`
  }
  
  name.value = data.name;
  code.value = data.code;
  description.value = data.description;
} else {
  name.value = bookmarklet.innerHTML
  code.value = bookmarklet.href
  // description default is hard coded
}

updateBookmarklet();


name.addEventListener("input", updateBookmarklet);
code.addEventListener("input", updateBookmarklet);
description.addEventListener("input", updateBookmarklet);

function updateBookmarklet() {
  bookmarklet.href = code.value;
  bookmarklet.innerHTML = name.value;
  window.location.hash = `name=${name.value}&code=js_${code.value.slice(22, code.value.length - 3)}&description=${description.value}`;
}
