<template>
  <div>
    <div class="flex items-center">
      <ui-select
        :model-value="selectorType"
        :disabled="selectList"
        class="w-full"
        @change="$emit('update:selectorType', $event)"
      >
        <option value="css">CSS Selector</option>
        <option value="xpath">XPath</option>
      </ui-select>
      <template v-if="selectorType === 'css'">
        <ui-button
          :class="{ 'text-primary': selectList }"
          icon
          class="ml-2"
          title="Select a list of elements"
          @click.stop.prevent="$emit('update:selectList', !selectList)"
        >
          <v-remixicon name="riListUnordered" />
        </ui-button>
        <!-- <ui-button
          icon
          class="ml-2"
          title="Selector settings aaa"
          @click="$emit('settings', !settingsActive)"
        >
          <v-remixicon
            :name="settingsActive ? 'riCloseLine' : 'riSettings3Line'"
          />
        </ui-button> -->
      </template>
    </div>
    <div class="mt-2 flex items-center">
      <ui-input
        :model-value="selector"
        placeholder="Element selector"
        class="element-selector h-full flex-1 leading-normal"
        @change="$emit('selector', $event)"
      >
        <template #prepend>
          <button
            class="absolute left-0 ml-2"
            @click.stop.prevent="copySelector"
          >
            <v-remixicon name="riFileCopyLine" />
          </button>
        </template>
      </ui-input>
      <template v-if="selectedCount === 1 && !selector.includes('|>')">
        <button
          class="mr-1 ml-2"
          title="Parent element"
          @click.stop.prevent="$emit('parent')"
        >
          <v-remixicon rotate="90" name="riArrowLeftLine" />
        </button>
        <button title="Child element" @click.stop.prevent="$emit('child')">
          <v-remixicon rotate="-90" name="riArrowLeftLine" />
        </button>
      </template>
    </div>
  </div>
</template>
<script setup>
import { inject } from 'vue';
import UiInput from '@/components/ui/UiInput.vue';

const props = defineProps({
  selector: {
    type: String,
    default: '',
  },
  selectedCount: {
    type: Number,
    default: 0,
  },
  selectorType: {
    type: String,
    default: '',
  },
  selectList: {
    type: Boolean,
    default: false,
  },
  settingsActive: Boolean,
});
defineEmits([
  'change',
  'list',
  'parent',
  'child',
  'selector',
  'settings',
  'update:selectorType',
  'update:selectList',
]);

const rootElement = inject('rootElement');

function copySelector() {
  rootElement.shadowRoot.querySelector('input')?.select();

  navigator.clipboard.writeText(props.selector).catch((error) => {
    document.execCommand('copy');
    console.error(error);
  });
}
</script>
