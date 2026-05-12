<template>
  <div class="keyboard-configurator">
    <h1>Конструктор механической клавиатуры</h1>

    <div class="configurator-layout">
      <div class="options-panel">
        <div class="option-group">
          <h3>Форм-фактор</h3>
          <div class="option-buttons">
            <button
              v-for="size in KEYBOARD_SIZES"
              :key="size.value"
              :class="{ active: selectedOptions.size === size.value }"
              @click="selectedOptions.size = size.value as KeyboardSize"
            >
              {{ size.label }}
            </button>
          </div>
        </div>

        <div class="option-group">
          <h3>Переключатели (Switch)</h3>
          <div class="option-buttons">
            <button
              v-for="switch_ in SWITCH_TYPES"
              :key="switch_.value"
              :class="{ active: selectedOptions.switchType === switch_.value }"
              @click="selectedOptions.switchType = switch_.value as SwitchType"
            >
              <div class="switch-name">{{ switch_.label }}</div>
              <div class="switch-desc">{{ switch_.description }}</div>
            </button>
          </div>
        </div>

        <div class="option-group">
          <h3>Профиль кейкапов</h3>
          <div class="option-buttons">
            <button
              v-for="profile in KEYCAP_PROFILES"
              :key="profile.value"
              :class="{
                active: selectedOptions.keycapProfile === profile.value,
              }"
              @click="
                selectedOptions.keycapProfile = profile.value as KeycapProfile
              "
            >
              {{ profile.label }}
            </button>
          </div>
        </div>

        <div class="option-group">
          <h3>Материал корпуса</h3>
          <div class="option-buttons">
            <button
              v-for="material in CASE_MATERIALS"
              :key="material.value"
              :class="{
                active: selectedOptions.caseMaterial === material.value,
              }"
              @click="
                selectedOptions.caseMaterial = material.value as CaseMaterial
              "
            >
              {{ material.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="preview-panel">
        <div class="option-group">
          <h3>Режим подсветки</h3>
          <div class="option-buttons">
            <button
              v-for="mode in RGB_MODES"
              :key="mode.value"
              :class="{ active: selectedRgbMode === mode.value }"
              @click="selectedRgbMode = mode.value"
            >
              {{ mode.label }}
            </button>
          </div>

          <div
            v-if="
              selectedRgbMode !== 'off' &&
              selectedRgbMode !== 'rainbow' &&
              selectedRgbMode !== 'wave'
            "
            class="color-picker-wrapper"
          >
            <label>Цвет подсветки:</label>
            <input
              type="color"
              v-model="selectedRgbColor"
              class="color-input"
            />
          </div>
        </div>

        <h2 class="small-title">Ваша сборка</h2>

        <div class="keyboard-preview">
          <KeyboardPreview
            :size="selectedOptions.size"
            :switchType="selectedOptions.switchType"
            :keycapProfile="selectedOptions.keycapProfile"
            :caseMaterial="selectedOptions.caseMaterial"
            :rgbMode="selectedRgbMode"
            :rgbColor="selectedRgbColor"
          />
        </div>

        <div class="build-summary">
          <div class="summary-item">
            <span class="summary-label">Форм-фактор:</span>
            <span class="summary-value">{{
              getLabel(selectedOptions.size, KEYBOARD_SIZES)
            }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Переключатели:</span>
            <span class="summary-value">{{
              getLabel(selectedOptions.switchType, SWITCH_TYPES)
            }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Профиль кейкапов:</span>
            <span class="summary-value">{{
              getLabel(selectedOptions.keycapProfile, KEYCAP_PROFILES)
            }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Материал корпуса:</span>
            <span class="summary-value">{{
              getLabel(selectedOptions.caseMaterial, CASE_MATERIALS)
            }}</span>
          </div>
          <div class="summary-item total-price">
            <span class="summary-label">Примерная стоимость:</span>
            <span class="summary-value">{{ calculatePrice() }} ₽</span>
          </div>
        </div>

        <button class="save-build-btn" @click="saveBuild">
          Сохранить сборку
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import KeyboardPreview from "../components/preview.vue";

import type {
  BuildOptions,
  KeyboardSize,
  KeyboardOption,
  SwitchType,
  KeycapProfile,
  CaseMaterial,
} from "../ts/types";
import {
  KEYBOARD_SIZES,
  SWITCH_TYPES,
  KEYCAP_PROFILES,
  CASE_MATERIALS,
  PRICE_MAP,
} from "../ts/types";

const selectedRgbMode = ref<
  "off" | "static" | "rainbow" | "wave" | "breathing" | "reactive"
>("off");
const selectedRgbColor = ref("#ff3366");

const RGB_MODES = [
  { label: "Выкл", value: "off" },
  { label: "Статический", value: "static" },
  { label: "Радуга", value: "rainbow" },
  { label: "Волна", value: "wave" },
  { label: "Дыхание", value: "breathing" },
  { label: "Реактивный", value: "reactive" },
] as const;

const selectedOptions = reactive<BuildOptions>({
  size: "tkl",
  switchType: "linear",
  keycapProfile: "cherry",
  caseMaterial: "aluminum",
});

const getLabel = (value: string, options: KeyboardOption[]): string => {
  return options.find((opt) => opt.value === value)?.label || value;
};

const calculatePrice = (): number => {
  let total = 0;
  const options = selectedOptions as Record<string, string>;

  for (const [key, value] of Object.entries(options)) {
    total += PRICE_MAP[value] || 0;
  }

  return total;
};

const saveBuild = (): void => {
  const build = {
    ...selectedOptions,
    id: crypto.randomUUID(),
    totalPrice: calculatePrice(),
    createdAt: new Date().toISOString(),
  };

  console.log("Сборка сохранена:", build);
};
</script>

<style scoped>
.color-picker-wrapper {
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #495057;
}
.color-input {
  width: 40px;
  height: 28px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: none;
}

.small-title {
  color: #495057;
}

.keyboard-configurator {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  text-align: center;
  color: #b9c0c7;
  margin-bottom: 2rem;
}

.configurator-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.options-panel {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
}

.preview-panel {
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
}

.option-group {
  margin-bottom: 1.5rem;
}

.option-group h3 {
  color: #495057;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.option-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.option-buttons button {
  padding: 0.5rem 1rem;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  background: white;
  color: black;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.option-buttons button:hover {
  border-color: #4dabf7;
  background: #e7f5ff;
}

.option-buttons button.active {
  background: #228be6;
  color: white;
  border-color: #228be6;
}

.switch-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.switch-desc {
  font-size: 0.8rem;
  color: #000000;
}

.keyboard-preview {
  margin: 1.5rem 0;
  width: 1500px;
}

.preview-placeholder {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem;
  text-align: center;
  border-radius: 12px;
  font-size: 1.5rem;
}

.build-summary {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #dee2e6;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-label {
  color: #6c757d;
  font-size: 0.9rem;
}

.summary-value {
  font-weight: 600;
  color: #2c3e50;
}

.total-price {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 2px solid #228be6;
}

.total-price .summary-value {
  font-size: 1.2rem;
  color: #228be6;
}

.save-build-btn {
  width: 100%;
  padding: 0.75rem;
  background: #228be6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.save-build-btn:hover {
  background: #1c7ed6;
}

.keyboard-preview {
  width: 400px;
  margin: 1.5rem 0;
  padding-bottom: 12px;
  border-radius: 8px;
}

.keyboard-case {
  display: inline-flex;
  flex-direction: column;
  min-width: max-content;
  width: fit-content;
}

.keyboard-preview::-webkit-scrollbar {
  height: 6px;
}
.keyboard-preview::-webkit-scrollbar-thumb {
  background: #adb5bd;
  border-radius: 3px;
}
.keyboard-preview::-webkit-scrollbar-track {
  background: #f1f3f5;
}

.preview-panel {
  min-width: 800px;
  overflow: visible;
}
</style>
