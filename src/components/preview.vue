<template>
  <div class="keyboard-preview-wrapper">
    <div class="keyboard-case" :class="`case-${caseMaterial}`">
      <div v-for="(row, rIdx) in layout" :key="rIdx" class="keyboard-row">
        <div
          v-for="(key, kIdx) in row"
          :key="`${rIdx}-${kIdx}`"
          class="keycap"
          :class="[
            `profile-${keycapProfile}`,
            `switch-${switchType}`,
            getKeyClass(key.l)
          ]"
          :style="{ flex: `0 0 ${key.w * 40}px` }"
        >
          <span class="key-label">{{ key.l }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { KeyboardSize, SwitchType, KeycapProfile, CaseMaterial } from '../ts/types'

const props = defineProps<{
  size: KeyboardSize
  switchType: SwitchType
  keycapProfile: KeycapProfile
  caseMaterial: CaseMaterial
}>()

type KeyDef = { l: string; w: number }
type Layout = KeyDef[][]


const KEY_LAYOUTS: Record<string, Layout> = {
  '60': [
    [{l:'Esc',w:1}, {l:'1',w:1}, {l:'2',w:1}, {l:'3',w:1}, {l:'4',w:1}, {l:'5',w:1}, {l:'6',w:1}, {l:'7',w:1}, {l:'8',w:1}, {l:'9',w:1}, {l:'0',w:1}, {l:'-',w:1}, {l:'=',w:1}, {l:'⌫',w:2}],
    [{l:'Tab',w:1.5}, {l:'Q',w:1}, {l:'W',w:1}, {l:'E',w:1}, {l:'R',w:1}, {l:'T',w:1}, {l:'Y',w:1}, {l:'U',w:1}, {l:'I',w:1}, {l:'O',w:1}, {l:'P',w:1}, {l:'[',w:1.5}, {l:']',w:1.5}, {l:'\\',w:1.5}],
    [{l:'Caps',w:1.75}, {l:'A',w:1}, {l:'S',w:1}, {l:'D',w:1}, {l:'F',w:1}, {l:'G',w:1}, {l:'H',w:1}, {l:'J',w:1}, {l:'K',w:1}, {l:'L',w:1}, {l:';',w:1}, {l:"'",w:1}, {l:'Enter',w:2.25}],
    [{l:'Shift',w:2.25}, {l:'Z',w:1}, {l:'X',w:1}, {l:'C',w:1}, {l:'V',w:1}, {l:'B',w:1}, {l:'N',w:1}, {l:'M',w:1}, {l:',',w:1}, {l:'.',w:1}, {l:'/',w:1}, {l:'Shift',w:2.75}],
    [{l:'Ctrl',w:1.25}, {l:'Win',w:1.25}, {l:'Alt',w:1.25}, {l:'Space',w:6.25}, {l:'Alt',w:1.25}, {l:'Fn',w:1.25}, {l:'Menu',w:1.25}, {l:'Ctrl',w:1.25}]
  ],
  'tkl': [
    [{l:'Esc',w:1}, {l:'F1',w:1}, {l:'F2',w:1}, {l:'F3',w:1}, {l:'F4',w:1}, {l:'F5',w:1}, {l:'F6',w:1}, {l:'F7',w:1}, {l:'F8',w:1}, {l:'F9',w:1}, {l:'F10',w:1}, {l:'F11',w:1}, {l:'F12',w:1}, {l:'Del',w:1}],
    [{l:'`',w:1}, {l:'1',w:1}, {l:'2',w:1}, {l:'3',w:1}, {l:'4',w:1}, {l:'5',w:1}, {l:'6',w:1}, {l:'7',w:1}, {l:'8',w:1}, {l:'9',w:1}, {l:'0',w:1}, {l:'-',w:1}, {l:'=',w:1}, {l:'⌫',w:2}],
    [{l:'Tab',w:1.5}, {l:'Q',w:1}, {l:'W',w:1}, {l:'E',w:1}, {l:'R',w:1}, {l:'T',w:1}, {l:'Y',w:1}, {l:'U',w:1}, {l:'I',w:1}, {l:'O',w:1}, {l:'P',w:1}, {l:'[',w:1.5}, {l:']',w:1.5}, {l:'\\',w:1.5}],
    [{l:'Caps',w:1.75}, {l:'A',w:1}, {l:'S',w:1}, {l:'D',w:1}, {l:'F',w:1}, {l:'G',w:1}, {l:'H',w:1}, {l:'J',w:1}, {l:'K',w:1}, {l:'L',w:1}, {l:';',w:1}, {l:"'",w:1}, {l:'Enter',w:2.25}],
    [{l:'Shift',w:2.25}, {l:'Z',w:1}, {l:'X',w:1}, {l:'C',w:1}, {l:'V',w:1}, {l:'B',w:1}, {l:'N',w:1}, {l:'M',w:1}, {l:',',w:1}, {l:'.',w:1}, {l:'/',w:1}, {l:'Shift',w:2.75}],
    [{l:'Ctrl',w:1.25}, {l:'Win',w:1.25}, {l:'Alt',w:1.25}, {l:'Space',w:6.25}, {l:'Alt',w:1.25}, {l:'Fn',w:1.25}, {l:'←',w:1}, {l:'↓',w:1}, {l:'↑',w:1}, {l:'→',w:1}]
  ],
  'full': [
    [{l:'Esc',w:1}, {l:'F1',w:1}, {l:'F2',w:1}, {l:'F3',w:1}, {l:'F4',w:1}, {l:'F5',w:1}, {l:'F6',w:1}, {l:'F7',w:1}, {l:'F8',w:1}, {l:'F9',w:1}, {l:'F10',w:1}, {l:'F11',w:1}, {l:'F12',w:1}, {l:'Print',w:1}, {l:'ScrLk',w:1}, {l:'Pause',w:1}],
    [{l:'`',w:1}, {l:'1',w:1}, {l:'2',w:1}, {l:'3',w:1}, {l:'4',w:1}, {l:'5',w:1}, {l:'6',w:1}, {l:'7',w:1}, {l:'8',w:1}, {l:'9',w:1}, {l:'0',w:1}, {l:'-',w:1}, {l:'=',w:1}, {l:'⌫',w:2}, {l:'Ins',w:1}, {l:'Home',w:1}, {l:'PgUp',w:1}],
    [{l:'Tab',w:1.5}, {l:'Q',w:1}, {l:'W',w:1}, {l:'E',w:1}, {l:'R',w:1}, {l:'T',w:1}, {l:'Y',w:1}, {l:'U',w:1}, {l:'I',w:1}, {l:'O',w:1}, {l:'P',w:1}, {l:'[',w:1.5}, {l:']',w:1.5}, {l:'\\',w:1.5}, {l:'Del',w:1}, {l:'End',w:1}, {l:'PgDn',w:1}],
    [{l:'Caps',w:1.75}, {l:'A',w:1}, {l:'S',w:1}, {l:'D',w:1}, {l:'F',w:1}, {l:'G',w:1}, {l:'H',w:1}, {l:'J',w:1}, {l:'K',w:1}, {l:'L',w:1}, {l:';',w:1}, {l:"'",w:1}, {l:'Enter',w:2.25}],
    [{l:'Shift',w:2.25}, {l:'Z',w:1}, {l:'X',w:1}, {l:'C',w:1}, {l:'V',w:1}, {l:'B',w:1}, {l:'N',w:1}, {l:'M',w:1}, {l:',',w:1}, {l:'.',w:1}, {l:'/',w:1}, {l:'Shift',w:2.75}, {l:'↑',w:1}],
    [{l:'Ctrl',w:1.25}, {l:'Win',w:1.25}, {l:'Alt',w:1.25}, {l:'Space',w:6.25}, {l:'Alt',w:1.25}, {l:'Fn',w:1.25}, {l:'Menu',w:1.25}, {l:'Ctrl',w:1.25}, {l:'←',w:1}, {l:'↓',w:1}, {l:'→',w:1}]
  ]
}

const layout = computed(() => {
  return KEY_LAYOUTS[props.size as keyof typeof KEY_LAYOUTS] || KEY_LAYOUTS['tkl']
})

const getKeyClass = (label: string) => {
  if (label === 'Space') return 'key-space'
  if (['Enter','Backspace','Shift','Ctrl','Alt','Tab','Caps','Win','Fn','Menu'].some(k => label.includes(k))) return 'key-modifier'
  return 'key-alpha'
}
</script>

<style scoped>
.keyboard-preview-wrapper {
  display: flex;
  justify-content: center;
  padding: 1rem;
  overflow-x: auto;
}

.keyboard-case {
  background: #2c3e50;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
  border: 1px solid #1a252f;
  transition: all 0.3s ease;
}


.case-aluminum { border-color: #4dabf7; background: #1e2a3a; box-shadow: 0 6px 16px rgba(77,171,247,0.15); }
.case-plastic { border-color: #868e96; background: #2c3e50; }
.case-wood { border-color: #8b5a2b; background: #4a3520; }

.keyboard-row {
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
  justify-content: center;
}
.keyboard-row:last-child { margin-bottom: 0; }

.keycap {
  height: 40px;
  background: #e9ecef;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: #212529;
  box-shadow: inset 0 -2px 0 #ced4da, 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.15s;
  user-select: none;
}
.keycap:hover { transform: translateY(-1px); box-shadow: inset 0 -2px 0 #ced4da, 0 4px 8px rgba(0,0,0,0.15); }
.keycap:active { transform: translateY(1px); box-shadow: inset 0 1px 3px rgba(0,0,0,0.2); }

.key-modifier { background: #dee2e6; font-size: 0.7rem; }
.key-space { background: #d0d5db; }


.profile-cherry { height: 40px; border-radius: 4px; }
.profile-sa { height: 52px; border-radius: 10px; background: #f1f3f5; }
.profile-dsa { height: 44px; border-radius: 6px; background: #e9ecef; }
.profile-xda { height: 42px; border-radius: 2px; background: #e9ecef; }


.switch-linear { border-bottom: 3px solid #ff6b6b; }
.switch-tactile { border-bottom: 3px solid #51cf66; }
.switch-clicky { border-bottom: 3px solid #339af0; }
</style>