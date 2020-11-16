<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
@font-face {
  font-family: 'Titillium Web';
  src:  url('assets/fonts/TitilliumWeb-Regular.woff2') format('woff2'),
  url('assets/fonts/TitilliumWeb-Regular.woff') format('woff');
}

* {
   margin:0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

* {
  scrollbar-width: thin;
  scrollbar-color: #1A1E29 black;
}

*::-webkit-scrollbar {
  width: 12px;
}
*::-webkit-scrollbar-track {
  background: black;
}
*::-webkit-scrollbar-thumb {
  background-color: #1A1E29 ;
  border: none;
}

body {
  font-family: "Titillium Web", Arial, sans-serif;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
	background: linear-gradient(360deg, #090C14 0%, #1A1E29 100%);
	color: #ACB2BB
}


.container-after-titlebar {
  border-top: 0.5px solid #2f3442;
  background: inherit;
}

#app,
#root {
  min-height: 100vh;
}
button, a {
  cursor: pointer;
  font-family: "Titillium Web", Arial, sans-serif;
}
button:disabled {
  cursor: not-allowed;
}
.phrase {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 164px;
  height: 40px;
  border: 1px solid #2B2F3A;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-transform: uppercase;
  color: #DCE0E7;
}

.ol_container {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 10px;
}

.ol_parent {
  display: flex;
  justify-content: center;
}

::placeholder {
  color: #555B65;
}

</style>
