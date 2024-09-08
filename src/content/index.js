import browser from 'webextension-polyfill';
import { nanoid } from 'nanoid';
import cloneDeep from 'lodash.clonedeep';
import findSelector from '@/lib/findSelector';
import { sendMessage } from '@/utils/message';
import automa from '@business';
import { elementSelectorInstance } from './utils';

const isMainFrame = window.self === window.top;

async function messageListener({ data, source }) {
  try {
    if (data.type === 'automa:get-frame' && isMainFrame) {
      let frameRect = { x: 0, y: 0 };

      document.querySelectorAll('iframe').forEach((iframe) => {
        if (iframe.contentWindow !== source) return;

        frameRect = iframe.getBoundingClientRect();
      });

      source.postMessage(
        {
          frameRect,
          type: 'automa:the-frame-rect',
        },
        '*'
      );
    }
  } catch (error) {
    console.error(error);
  }
}

(() => {
  if (window.isAutomaInjected) return;

  let contextElement = null;
  let $ctxLink = '';
  let $ctxMediaUrl = '';
  let $ctxTextSelection = '';

  window.isAutomaInjected = true;
  window.addEventListener('message', messageListener);
  window.addEventListener(
    'contextmenu',
    ({ target }) => {
      contextElement = target;
      $ctxTextSelection = window.getSelection().toString();

      const tag = target.tagName;
      if (tag === 'A') {
        $ctxLink = target.href;
      } else {
        const closestUrl = target.closest('a');
        if (closestUrl) $ctxLink = closestUrl.href;
      }

      const getMediaSrc = (element) => {
        let mediaSrc = element.src || '';

        if (!mediaSrc.src) {
          const sourceEl = element.querySelector('source');
          if (sourceEl) mediaSrc = sourceEl.src;
        }

        return mediaSrc;
      };

      const mediaTags = ['AUDIO', 'VIDEO', 'IMG'];
      if (mediaTags.includes(tag)) {
        $ctxMediaUrl = getMediaSrc(target);
      } else {
        const closestMedia = target.closest('audio,video,img');
        if (closestMedia) $ctxMediaUrl = getMediaSrc(closestMedia);
      }
    },
    true
  );

  window.isAutomaInjected = true;
  window.addEventListener('message', messageListener);
  window.addEventListener('contextmenu', ({ target }) => {
    contextElement = target;
    $ctxTextSelection = window.getSelection().toString();
  });

  automa('content');

  browser.runtime.onMessage.addListener(async (data) => {
    switch (data.type) {
      case 'input-workflow-params':
        window.initPaletteParams?.(data.data);
        return Boolean(window.initPaletteParams);
      case 'content-script-exists':
        return true;
      case 'automa-element-selector': {
        return elementSelectorInstance();
      }
      case 'context-element': {
        let $ctxElSelector = '';

        if (contextElement) {
          $ctxElSelector = findSelector(contextElement);
          contextElement = null;
        }
        if (!$ctxTextSelection) {
          $ctxTextSelection = window.getSelection().toString();
        }

        const cloneContextData = cloneDeep({
          $ctxLink,
          $ctxMediaUrl,
          $ctxElSelector,
          $ctxTextSelection,
        });

        $ctxLink = '';
        $ctxMediaUrl = '';
        $ctxElSelector = '';
        $ctxTextSelection = '';

        return cloneContextData;
      }
      default:
        return null;
    }
  });
})();

window.addEventListener('__automa-fetch__', (event) => {
  const { id, resource, type } = event.detail;
  const sendResponse = (payload) => {
    window.dispatchEvent(
      new CustomEvent(`__automa-fetch-response-${id}__`, {
        detail: { id, ...payload },
      })
    );
  };

  sendMessage('fetch', { type, resource }, 'background')
    .then((result) => {
      sendResponse({ isError: false, result });
    })
    .catch((error) => {
      sendResponse({ isError: true, result: error.message });
    });
});

window.addEventListener('DOMContentLoaded', async () => {
  const link = window.location.pathname;
  const isAutomaWorkflow = /.+\.automa\.json$/.test(link);
  if (!isAutomaWorkflow) return;

  const accept = window.confirm(
    'Do you want to add this workflow into Automa?'
  );
  if (!accept) return;
  const workflow = JSON.parse(document.documentElement.innerText);

  const { workflows: workflowsStorage } = await browser.storage.local.get(
    'workflows'
  );

  const workflowId = nanoid();
  const workflowData = {
    ...workflow,
    id: workflowId,
    dataColumns: [],
    createdAt: Date.now(),
    table: workflow.table || workflow.dataColumns,
  };

  if (Array.isArray(workflowsStorage)) {
    workflowsStorage.push(workflowData);
  } else {
    workflowsStorage[workflowId] = workflowData;
  }

  await browser.storage.local.set({ workflows: workflowsStorage });

  alert('Workflow installed');
});
