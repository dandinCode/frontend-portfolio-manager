<template>
    <v-text-field v-model="model" :label="label" :type="show ? 'text' : 'password'" variant="outlined"
        class="password-field" :rules="rules">
        <template #prepend-inner>
            <v-icon color="white">mdi-lock-outline</v-icon>
        </template>

        <template #append-inner>
            <v-icon color="white" class="cursor-pointer" @click="toggle">
                {{ show ? 'mdi-eye-off' : 'mdi-eye' }}
            </v-icon>
        </template>
    </v-text-field>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
    modelValue: string;
    label?: string;
    rules?: ((v: string) => true | string)[];
}

const props = withDefaults(defineProps<Props>(), {
    label: 'Senha',
    rules: () => [],
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const show = ref(false);

const model = computed({
    get: () => props.modelValue,
    set: (value: string) => emit('update:modelValue', value),
});

function toggle() {
    show.value = !show.value;
}
</script>

<style scoped>
.password-field .v-icon {
    opacity: 1;
}
</style>
