<template>
  <div>
    <div class="modal-bg" @click="closeModal"></div>
    <transition-group name="slide">
      <div class="modal-content w-4/5 shadow-lg rounded-md" key="slide-target">
        <slot />
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "modal",
  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>

<style>
.modal-bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1rem 1.5rem;
}
</style>