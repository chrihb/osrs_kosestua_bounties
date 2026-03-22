<template>
  <div>
    <label for="file-upload" class="custom-file-upload osrs-btn">{{ text }}</label>
    <input id="file-upload" ref="fileInput" type="file" accept="image/*" @change="onFileChange" />
  </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(['fileChanged']);

const text = ref("Upload proof");
function onFileChange(e) {
  emit('fileChanged', e.target.files?.[0] ?? null);
  text.value = e.target.files?.[0].name;
}

// async function sendFile() {

// if (!file.value) return
// // Optional client-side validation
// if (file.value.size > 10 * 1024 * 1024) {
//   status.value = 'File too large (max 10 MB)'
//   return
// }

// status.value = 'Sending...'

//   try {
//     // Read as ArrayBuffer / raw bytes
//     const arrayBuffer = await file.value.arrayBuffer()

//     // Send to your API endpoint
//     const resp = await fetch('https://api.example.com/upload', {
//       method: 'POST',
//       headers: {
//         'Content-Type': file.value.type || 'application/octet-stream',
//         'X-Filename': encodeURIComponent(file.value.name),
//         // 'Authorization': `Bearer ${token}`
//       },
//       body: arrayBuffer
//     })

//     if (!resp.ok) {
//       const text = await resp.text().catch(() => resp.statusText)
//       status.value = `Upload failed: ${resp.status} ${text}`
//       return
//     }

//     const result = await resp.json().catch(() => null)
//     status.value = result?.message ?? 'Upload successful'
//   } catch (err) {
//     status.value = 'Error: ' + (err?.message ?? String(err))
//   }
//}
</script>

<style scoped>
.custom-file-upload {
  box-shadow:
    inset 1px 1px 0 #8a8070,
    inset -1px -1px 0 #0e0c08,
    1px 1px 0 #000;
  padding: 10px;
  cursor: pointer;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

input[type="file"] {
  display: none;
}
</style>