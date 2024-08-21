const STORAGE_AREA = chrome?.storage?.local; // 也可以使用 chrome.storage.sync

/**
 * 保存数据到存储区域
 * @param {Object} data - 需要保存的数据
 * @returns {Promise<void>}
 */
function save(data) {
  return new Promise((resolve, reject) => {
    STORAGE_AREA?.set(data, () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError));
      } else {
        resolve('');
      }
    });
  });
}

/**
 * 从存储区域获取数据
 * @param {string|string[]} keys - 键或键的数组
 * @returns {Promise<Object>}
 */
function get(keys) {
  return new Promise((resolve, reject) => {
    STORAGE_AREA?.get(keys, (result: unknown) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError));
      } else {
        resolve(result);
      }
    });
  });
}

/**
 * 删除存储区域中的数据
 * @param {string|string[]} keys - 键或键的数组
 * @returns {Promise<void>}
 */
function remove(keys) {
  return new Promise((resolve, reject) => {
    STORAGE_AREA.remove(keys, () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError));
      } else {
        resolve('');
      }
    });
  });
}

/**
 * 清空存储区域
 * @returns {Promise<void>}
 */
function clear() {
  return new Promise((resolve, reject) => {
    STORAGE_AREA.clear(() => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError));
      } else {
        resolve('');
      }
    });
  });
}

export default {
  save,
  get,
  remove,
  clear
};
