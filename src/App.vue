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

body {
  font-family: "Titillium Web", Arial, sans-serif;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
	background: linear-gradient(360deg, #090C14 0%, #1A1E29 100%);
	color: #ACB2BB
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
</style>
