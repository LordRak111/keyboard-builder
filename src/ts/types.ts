// Базовый интерфейс для опций
export interface KeyboardOption {
  label: string
  value: string
}

// Интерфейс для переключателей с дополнительными полями
export interface SwitchOption extends KeyboardOption {
  description: string
  price: number
}

// Тип для размеров клавиатуры
export type KeyboardSize = '60' | '65' | '75' | 'tkl' | '96' | '100'

// Тип для типов переключателей
export type SwitchType = 'linear' | 'tactile' | 'clicky'

// Тип для профилей кейкапов
export type KeycapProfile = 'cherry' | 'oem' | 'sa' | 'dsa' | 'xda'

// Тип для материалов корпуса
export type CaseMaterial = 'aluminum' | 'plastic' | 'acrylic' | 'wood'

// Интерфейс состояния сборки
export interface BuildOptions {
  size: KeyboardSize
  switchType: SwitchType
  keycapProfile: KeycapProfile
  caseMaterial: CaseMaterial
}

// Интерфейс для сохранённой сборки
export interface SavedBuild extends BuildOptions {
  id: string
  totalPrice: number
  createdAt: string
  name?: string
}

// Интерфейс для компонента переключателя
export interface SwitchComponent {
  id: string
  name: string
  type: SwitchType
  manufacturer: string
  actuationForce: number // в граммах
  price: number
  inStock: boolean
}

// Интерфейс для корпуса
export interface CaseComponent {
  id: string
  name: string
  material: CaseMaterial
  color: string
  price: number
  compatibleSizes: KeyboardSize[]
}

// Интерфейс для кейкапов
export interface KeycapSet {
  id: string
  name: string
  profile: KeycapProfile
  material: 'ABS' | 'PBT'
  price: number
  compatibleLayouts: KeyboardSize[]
}

// Интерфейс для полной сборки
export interface FullKeyboardBuild {
  id: string
  name: string
  case: CaseComponent
  switches: SwitchComponent[]
  keycaps: KeycapSet
  size: KeyboardSize
  totalPrice: number
  createdAt: string
  updatedAt: string
}

// Константы с опциями (если хочешь хранить их здесь)
export const KEYBOARD_SIZES: KeyboardOption[] = [
  { label: '60%', value: '60' },
  { label: '65%', value: '65' },
  { label: '75%', value: '75' },
  { label: 'TKL', value: 'tkl' },
  { label: '96%', value: '96' },
  { label: '100%', value: '100' }
]

export const SWITCH_TYPES: SwitchOption[] = [
  { 
    label: 'Линейные', 
    value: 'linear', 
    description: 'Плавный ход без тактильной отдачи', 
    price: 2500 
  },
  { 
    label: 'Тактильные', 
    value: 'tactile', 
    description: 'Ощутимый bump при нажатии', 
    price: 3000 
  },
  { 
    label: 'Кликающие', 
    value: 'clicky', 
    description: 'Громкий клик и тактильная отдача', 
    price: 3200 
  }
]

export const KEYCAP_PROFILES: KeyboardOption[] = [
  { label: 'Cherry', value: 'cherry' },
  { label: 'OEM', value: 'oem' },
  { label: 'SA', value: 'sa' },
  { label: 'DSA', value: 'dsa' },
  { label: 'XDA', value: 'xda' }
]

export const CASE_MATERIALS: KeyboardOption[] = [
  { label: 'Алюминий', value: 'aluminum' },
  { label: 'Пластик', value: 'plastic' },
  { label: 'Акрил', value: 'acrylic' },
  { label: 'Дерево', value: 'wood' }
]

// Цены для расчёта
export const PRICE_MAP: Record<string, number> = {
  '60': 5000,
  '65': 6000,
  '75': 7000,
  'tkl': 8000,
  '96': 9000,
  '100': 10000,
  'linear': 2500,
  'tactile': 3000,
  'clicky': 3200,
  'cherry': 2000,
  'oem': 1500,
  'sa': 3000,
  'dsa': 2500,
  'xda': 2500,
  'aluminum': 8000,
  'plastic': 3000,
  'acrylic': 4000,
  'wood': 10000
}