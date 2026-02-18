<template>
    <v-dialog v-model="open" max-width="420">
        <v-card>
            <v-card-title class="text-h6">
                Salvar Portfólio
            </v-card-title>

            <v-card-text>
                <v-text-field v-model="name" label="Nome do portfólio" autofocus :error="hasError"
                    :error-messages="errorMessage" counter maxlength="50" />
            </v-card-text>

            <v-card-actions>
                <v-spacer />
                <v-btn variant="text" @click="close">Cancelar</v-btn>
                <v-btn color="blue-accent-3" :loading="loading" @click="confirm">
                    Salvar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'confirm', name: string): void;
}>();

const open = ref(props.modelValue);
const name = ref('');
const hasError = ref(false);
const errorMessage = ref('');
const loading = ref(false);

watch(
    () => props.modelValue,
    val => (open.value = val)
);

function close() {
    emit('update:modelValue', false);
    reset();
}

function confirm() {
    if (name.value.trim().length < 3) {
        hasError.value = true;
        errorMessage.value = 'O nome deve ter pelo menos 3 caracteres.';
        return;
    }

    loading.value = true;
    emit('confirm', name.value.trim());
}

function reset() {
    name.value = '';
    hasError.value = false;
    errorMessage.value = '';
    loading.value = false;
}
</script>
