<template>
  <div class="progress-circle">
    <svg viewBox="0 0 100 100">
      <path d="
        M 50 50
        m 0 -47
        a 47 47 0 1 1 0 94
        a 47 47 0 1 1 0 -94
        " :stroke="color[1]"></path>
      <path d="
        M 50 50
        m 0 -47
        a 47 47 0 1 1 0 94
        a 47 47 0 1 1 0 -94
        " :stroke="color[0]" :style="`stroke-dasharray: ${_percentage}px, 295.31px;`"></path>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "progress-circle",
  props: {
    size: {
      type: Number,
      default: 240
    },
    unit: {
      type: String,
      default: 'rem'
    },
    viewport: {
      type: Number,
      default: 75
    },
    color: {
      type: [String, Array],
      default: () => ['transparent', 'transparent']
    },
    percentage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  computed: {
    _percentage: {
      get() {
        return this.percentage * Math.pow(10, -2) * 295.31;
      }
    }
  },
  methods: {
    unitConvert(value) {
      if (this.unit === 'vw') {
        value = value / (this.viewport * 10)
      }
      if (this.unit === 'rem') {
        value = value / this.viewport
      }
      return value;
    }
  }
}
</script>

<style scoped lang="scss">
.progress-circle {
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  width: 240px;
  height: 240px;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    path, .ignore {
      stroke-dasharray: 295.31px, 295.31px;
    }

    path {
      fill: none;
      stroke-dashoffset: 0;
      stroke-width: 3px;

      &:last-child, .ignore {
        stroke-dasharray: 0, 295.31px;
        stroke-linecap: round;
        transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s;
      }
    }
  }
}
</style>