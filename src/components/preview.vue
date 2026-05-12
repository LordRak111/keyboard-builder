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
            getKeyClass(key.l),
            { 'rgb-active': rgbMode !== 'off', [`rgb-${rgbMode}`]: rgbMode !== 'off' }
          ]"
          :style="{ width: `${key.w * 40}px`, minWidth: `${key.w * 40}px` }"
        >
          <span class="key-label" :style="getRgbStyle(rIdx, kIdx)">{{ key.l }}</span>
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
  rgbMode: 'off' | 'static' | 'rainbow' | 'wave' | 'breathing' | 'reactive'
  rgbColor: string
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
  '65': [
    [{l:'`',w:1}, {l:'1',w:1}, {l:'2',w:1}, {l:'3',w:1}, {l:'4',w:1}, {l:'5',w:1}, {l:'6',w:1}, {l:'7',w:1}, {l:'8',w:1}, {l:'9',w:1}, {l:'0',w:1}, {l:'-',w:1}, {l:'=',w:1}, {l:'⌫',w:2}],
    [{l:'Tab',w:1.5}, {l:'Q',w:1}, {l:'W',w:1}, {l:'E',w:1}, {l:'R',w:1}, {l:'T',w:1}, {l:'Y',w:1}, {l:'U',w:1}, {l:'I',w:1}, {l:'O',w:1}, {l:'P',w:1}, {l:'[',w:1.5}, {l:']',w:1.5}, {l:'\\',w:1.5}],
    [{l:'Caps',w:1.75}, {l:'A',w:1}, {l:'S',w:1}, {l:'D',w:1}, {l:'F',w:1}, {l:'G',w:1}, {l:'H',w:1}, {l:'J',w:1}, {l:'K',w:1}, {l:'L',w:1}, {l:';',w:1}, {l:"'",w:1}, {l:'Enter',w:2.25}],
    [{l:'Shift',w:2.25}, {l:'Z',w:1}, {l:'X',w:1}, {l:'C',w:1}, {l:'V',w:1}, {l:'B',w:1}, {l:'N',w:1}, {l:'M',w:1}, {l:',',w:1}, {l:'.',w:1}, {l:'/',w:1}, {l:'Shift',w:2.75}, {l:'↑',w:1}, {l:'Del',w:1}],
    [{l:'Ctrl',w:1.25}, {l:'Win',w:1.25}, {l:'Alt',w:1.25}, {l:'Space',w:6.25}, {l:'Alt',w:1.25}, {l:'Fn',w:1.25}, {l:'Menu',w:1.25}, {l:'Ctrl',w:1.25}, {l:'←',w:1}, {l:'↓',w:1}, {l:'→',w:1}]
  ],

  '75': [
    [{l:'Esc',w:1}, {l:'F1',w:1}, {l:'F2',w:1}, {l:'F3',w:1}, {l:'F4',w:1}, {l:'F5',w:1}, {l:'F6',w:1}, {l:'F7',w:1}, {l:'F8',w:1}, {l:'F9',w:1}, {l:'F10',w:1}, {l:'F11',w:1}, {l:'F12',w:1}, {l:'Del',w:1}],
    [{l:'`',w:1}, {l:'1',w:1}, {l:'2',w:1}, {l:'3',w:1}, {l:'4',w:1}, {l:'5',w:1}, {l:'6',w:1}, {l:'7',w:1}, {l:'8',w:1}, {l:'9',w:1}, {l:'0',w:1}, {l:'-',w:1}, {l:'=',w:1}, {l:'⌫',w:2}],
    [{l:'Tab',w:1.5}, {l:'Q',w:1}, {l:'W',w:1}, {l:'E',w:1}, {l:'R',w:1}, {l:'T',w:1}, {l:'Y',w:1}, {l:'U',w:1}, {l:'I',w:1}, {l:'O',w:1}, {l:'P',w:1}, {l:'[',w:1.5}, {l:']',w:1.5}, {l:'\\',w:1.5}, {l:'PgUp',w:1}],
    [{l:'Caps',w:1.75}, {l:'A',w:1}, {l:'S',w:1}, {l:'D',w:1}, {l:'F',w:1}, {l:'G',w:1}, {l:'H',w:1}, {l:'J',w:1}, {l:'K',w:1}, {l:'L',w:1}, {l:';',w:1}, {l:"'",w:1}, {l:'Enter',w:2.25}, {l:'PgDn',w:1}],
    [{l:'Shift',w:2.25}, {l:'Z',w:1}, {l:'X',w:1}, {l:'C',w:1}, {l:'V',w:1}, {l:'B',w:1}, {l:'N',w:1}, {l:'M',w:1}, {l:',',w:1}, {l:'.',w:1}, {l:'/',w:1}, {l:'Shift',w:2.75}, {l:'↑',w:1}],
    [{l:'Ctrl',w:1.25}, {l:'Win',w:1.25}, {l:'Alt',w:1.25}, {l:'Space',w:6.25}, {l:'Alt',w:1.25}, {l:'Fn',w:1.25}, {l:'Menu',w:1.25}, {l:'Ctrl',w:1.25}, {l:'←',w:1}, {l:'↓',w:1}, {l:'→',w:1}]
  ],

  '98': [
    [{l:'Esc',w:1}, {l:'F1',w:1}, {l:'F2',w:1}, {l:'F3',w:1}, {l:'F4',w:1}, {l:'F5',w:1}, {l:'F6',w:1}, {l:'F7',w:1}, {l:'F8',w:1}, {l:'F9',w:1}, {l:'F10',w:1}, {l:'F11',w:1}, {l:'F12',w:1}, {l:'Del',w:1}],
    [{l:'`',w:1}, {l:'1',w:1}, {l:'2',w:1}, {l:'3',w:1}, {l:'4',w:1}, {l:'5',w:1}, {l:'6',w:1}, {l:'7',w:1}, {l:'8',w:1}, {l:'9',w:1}, {l:'0',w:1}, {l:'-',w:1}, {l:'=',w:1}, {l:'⌫',w:1.5}, {l:'Ins',w:1}, {l:'Home',w:1}, {l:'PgUp',w:1}, {l:'Num7',w:1}, {l:'Num8',w:1}, {l:'Num9',w:1}],
    [{l:'Tab',w:1.5}, {l:'Q',w:1}, {l:'W',w:1}, {l:'E',w:1}, {l:'R',w:1}, {l:'T',w:1}, {l:'Y',w:1}, {l:'U',w:1}, {l:'I',w:1}, {l:'O',w:1}, {l:'P',w:1}, {l:'[',w:1.5}, {l:']',w:1.5}, {l:'\\',w:1.5}, {l:'Del',w:1}, {l:'End',w:1}, {l:'PgDn',w:1}, {l:'Num4',w:1}, {l:'Num5',w:1}, {l:'Num6',w:1}],
    [{l:'Caps',w:1.75}, {l:'A',w:1}, {l:'S',w:1}, {l:'D',w:1}, {l:'F',w:1}, {l:'G',w:1}, {l:'H',w:1}, {l:'J',w:1}, {l:'K',w:1}, {l:'L',w:1}, {l:';',w:1}, {l:"'",w:1}, {l:'Enter',w:2.25}, {l:'↑',w:1}, {l:'Num1',w:1}, {l:'Num2',w:1}, {l:'Num3',w:1}],
    [{l:'Shift',w:2.25}, {l:'Z',w:1}, {l:'X',w:1}, {l:'C',w:1}, {l:'V',w:1}, {l:'B',w:1}, {l:'N',w:1}, {l:'M',w:1}, {l:',',w:1}, {l:'.',w:1}, {l:'/',w:1}, {l:'Shift',w:2.75}, {l:'←',w:1}, {l:'↓',w:1}, {l:'→',w:1}, {l:'Num0',w:2}, {l:'Num.',w:1}],
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
  [{l:'Esc',w:1}, {l:'F1',w:1}, {l:'F2',w:1}, {l:'F3',w:1}, {l:'F4',w:1}, {l:'F5',w:1}, {l:'F6',w:1}, {l:'F7',w:1}, {l:'F8',w:1}, {l:'F9',w:1}, {l:'F10',w:1}, {l:'F11',w:1}, {l:'F12',w:1}, {l:'PrtSc',w:1}, {l:'ScrLk',w:1}, {l:'Pause',w:1}],
  [{l:'`',w:1}, {l:'1',w:1}, {l:'2',w:1}, {l:'3',w:1}, {l:'4',w:1}, {l:'5',w:1}, {l:'6',w:1}, {l:'7',w:1}, {l:'8',w:1}, {l:'9',w:1}, {l:'0',w:1}, {l:'-',w:1}, {l:'=',w:1}, {l:'⌫',w:2}, {l:'Ins',w:1}, {l:'Home',w:1}, {l:'PgUp',w:1}, {l:'Num',w:1}, {l:'7',w:1}, {l:'8',w:1}, {l:'9',w:1}, {l:'+',w:1.5}],
  [{l:'Tab',w:1.5}, {l:'Q',w:1}, {l:'W',w:1}, {l:'E',w:1}, {l:'R',w:1}, {l:'T',w:1}, {l:'Y',w:1}, {l:'U',w:1}, {l:'I',w:1}, {l:'O',w:1}, {l:'P',w:1}, {l:'[',w:1.5}, {l:']',w:1.5}, {l:'\\',w:1.5}, {l:'Del',w:1}, {l:'End',w:1}, {l:'PgDn',w:1}, {l:'4',w:1}, {l:'5',w:1}, {l:'6',w:1}],
  [{l:'Caps',w:1.75}, {l:'A',w:1}, {l:'S',w:1}, {l:'D',w:1}, {l:'F',w:1}, {l:'G',w:1}, {l:'H',w:1}, {l:'J',w:1}, {l:'K',w:1}, {l:'L',w:1}, {l:';',w:1}, {l:"'",w:1}, {l:'Enter',w:2.25}, {l:'1',w:1}, {l:'2',w:1}, {l:'3',w:1}, {l:'Ent',w:1.5}],
  [{l:'Shift',w:2.25}, {l:'Z',w:1}, {l:'X',w:1}, {l:'C',w:1}, {l:'V',w:1}, {l:'B',w:1}, {l:'N',w:1}, {l:'M',w:1}, {l:',',w:1}, {l:'.',w:1}, {l:'/',w:1}, {l:'Shift',w:1.75}, {l:'↑',w:1}, {l:'0',w:2}, {l:'.',w:1}],
  [{l:'Ctrl',w:1.25}, {l:'Win',w:1.25}, {l:'Alt',w:1.25}, {l:'Space',w:6.25}, {l:'Alt',w:1.25}, {l:'Fn',w:1.25}, {l:'Menu',w:1.25}, {l:'Ctrl',w:1.25}, {l:'←',w:1}, {l:'↓',w:1}, {l:'→',w:1}]
]
}

const layout = computed(() => KEY_LAYOUTS[props.size as keyof typeof KEY_LAYOUTS] || KEY_LAYOUTS['tkl'])

const getKeyClass = (label: string) => {
  if (label === 'Space') return 'key-space'
  if (['Enter','⌫','Shift','Ctrl','Alt','Tab','Caps','Win','Fn','Menu','←','↓','↑','→'].includes(label)) return 'key-modifier'
  return 'key-alpha'
}

const getRgbStyle = (rIdx: number, kIdx: number) => {
  if (props.rgbMode === 'wave') {
    return { '--wave-delay': `${(rIdx + kIdx) * 0.08}s` }
  }
  return {}
}
</script>

<style scoped>
.keyboard-case {
  overflow: hidden;
  display: inline-flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 10px;
  background: #2c3e50;
  border: 10px solid #1a252f;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
  transition: all 0.3s ease;
  box-sizing: border-box;
}
.case-aluminum {
  background: linear-gradient(145deg, #2a3b4c, #1e2a3a);
  border-color: #4dabf7;
  box-shadow: 0 6px 16px rgba(77,171,247,0.15), inset 0 1px 0 rgba(255,255,255,0.15);
}
.case-plastic {
  background: #2c3e50;
  border-color: #868e96;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
.case-wood {
  background: linear-gradient(145deg, #5c4033, #3e2723);
  border-color: #8b5a2b;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
}

.keyboard-row {
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
  justify-content: center;
  flex-shrink: 0;
  flex-wrap: nowrap;
}
.keyboard-row:last-child { margin-bottom: 0; }

.keycap {
  height: 40px;
  min-width: 40px;
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
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
}
.keycap:hover { transform: translateY(-1px); box-shadow: inset 0 -2px 0 #ced4da, 0 4px 8px rgba(0,0,0,0.15); }
.keycap:active { transform: translateY(1px); box-shadow: inset 0 1px 3px rgba(0,0,0,0.2); }

.keycap.profile-cherry {
  height: 40px;
  border-radius: 4px;
  background: #e9ecef;
}
.keycap.profile-sa {
  height: 52px;
  border-radius: 10px;
  background: #f1f3f5;
  box-shadow: inset 0 -3px 0 #dee2e6, 0 3px 8px rgba(0,0,0,0.15);
}
.keycap.profile-dsa {
  height: 44px;
  border-radius: 6px;
  background: #e2e6ea;
}
.keycap.profile-xda {
  height: 42px;
  border-radius: 2px;
  background: #e9ecef;
}

.keycap.key-modifier { background: #dee2e6; font-size: 0.7rem; }
.keycap.key-space { background: #d0d5db; }

.keycap.profile-sa.key-modifier,
.keycap.profile-sa.key-space { background: #f8f9fa; }


.keycap.switch-linear { border-bottom: 3px solid #ff6b6b; }
.keycap.switch-tactile { border-bottom: 3px solid #51cf66; }
.keycap.switch-clicky { border-bottom: 3px solid #339af0; }


.keycap.rgb-active {
  filter: brightness(0.92) saturate(0.85);
}
.keycap.rgb-active.key-modifier,
.keycap.rgb-active.key-space {
  filter: brightness(0.88) saturate(0.8);
}


.key-label {
  font-weight: 600;
  color: #212529;
  transition: color 0.2s, text-shadow 0.2s, filter 0.2s;
  position: relative;
  z-index: 1;
  user-select: none;
}

.rgb-active .key-label {
  color: v-bind(rgbColor);
  text-shadow: 0 0 4px v-bind(rgbColor), 0 0 8px v-bind(rgbColor);
}

@keyframes hue-cycle-text {
  0% { filter: hue-rotate(0deg) brightness(1.2); }
  100% { filter: hue-rotate(360deg) brightness(1.2); }
}
.rgb-rainbow .key-label { animation: hue-cycle-text 2.5s linear infinite; }
.rgb-wave .key-label {
  animation: hue-cycle-text 2.5s linear infinite;
  animation-delay: var(--wave-delay, 0s);
}

@keyframes breathe-text {
  0%, 100% { opacity: 0.35; text-shadow: 0 0 2px v-bind(rgbColor); }
  50% { opacity: 1; text-shadow: 0 0 12px v-bind(rgbColor), 0 0 24px v-bind(rgbColor); }
}
.rgb-breathing .key-label { animation: breathe-text 2.5s ease-in-out infinite; }

.keycap.rgb-reactive {
  cursor: pointer;
}
.keycap.rgb-reactive .key-label {
  color: #212529;
  text-shadow: none;
  transition: color 0.05s, text-shadow 0.05s, transform 0.05s;
}
.keycap.rgb-reactive:active {
  transform: translateY(2px);
}
.keycap.rgb-reactive:active .key-label {
  color: v-bind(rgbColor);
  text-shadow: 0 0 8px v-bind(rgbColor), 0 0 16px v-bind(rgbColor);
}
.wood {
  position: absolute;
}
</style>