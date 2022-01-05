import { ref } from 'vue'
import { uploadFile } from '@/api/common.js'

export default function useNav() {
    const uploadRef = ref(null)
    const imgUrl = ref('')
    
    const uploadImg = (e) => {
        let formData = new FormData();
        formData.append("files", e.file);
        uploadFile(formData).then(res => {
            if(res.code === 200) {
                imgUrl.value = res.data
            }
        })
    }

    const change = () => {
        uploadMutiple.value.submit();
    }

    return {
        uploadRef,
        imgUrl,
        change,
        uploadImg
    }
}