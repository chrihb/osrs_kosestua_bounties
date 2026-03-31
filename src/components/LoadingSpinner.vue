<script setup>
defineProps({ small: Boolean })
</script>

<template>
  <div class="lds-ellipsis" :class="{ small }">
    <div /><div /><div /><div />
  </div>
</template>

<style scoped>
.lds-ellipsis,
.lds-ellipsis div {
  box-sizing: border-box;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  color: #ff981f;
}
.lds-ellipsis div {
  position: absolute;
  top: 33.33333px;
  width: 13.33333px;
  height: 13.33333px;
  border-radius: 50%;
  background: currentColor;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}
@keyframes lds-ellipsis3 {
  0% { transform: scale(1); }
  100% { transform: scale(0); }
}
@keyframes lds-ellipsis2 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(24px, 0); }
}

/* Small variant for inline button use */
.lds-ellipsis.small {
  width: 40px;
  height: 10px;
}
.lds-ellipsis.small div {
  top: 0;
  width: 10px;
  height: 10px;
}
.lds-ellipsis.small div:nth-child(1) {
  left: 0;
}
.lds-ellipsis.small div:nth-child(2) {
  left: 0;
  animation: lds-ellipsis2-sm 0.6s infinite;
}
.lds-ellipsis.small div:nth-child(3) {
  left: 15px;
  animation: lds-ellipsis2-sm 0.6s infinite;
}
.lds-ellipsis.small div:nth-child(4) {
  left: 30px;
}
@keyframes lds-ellipsis2-sm {
  0% { transform: translate(0, 0); }
  100% { transform: translate(15px, 0); }
}
</style>
