<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  /** Visual variant */
  variant?: 'default' | 'primary' | 'secondary';
  /** Size preset */
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const classes = computed(() => [
  'component-name',
  `variant-${props.variant}`,
  `size-${props.size}`,
]);

function handleClick(event: MouseEvent) {
  emit('click', event);
}
</script>

<template>
  <div :class="classes" @click="handleClick">
    <slot />
  </div>
</template>

<style scoped>
.component-name {
  /* Base styles */
}

.variant-default {
  /* Default variant */
}

.variant-primary {
  /* Primary variant */
}

.variant-secondary {
  /* Secondary variant */
}

.size-sm {
  /* Small size */
}

.size-md {
  /* Medium size */
}

.size-lg {
  /* Large size */
}
</style>
