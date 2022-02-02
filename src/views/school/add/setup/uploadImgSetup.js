import { uploadFile } from '@/api/common'

export default function useNav() {

    const uploadImg = async (e) => {
        let formData = new FormData();
        formData.append("files", e.file);
        return new Promise((resolve, reject) => {
            uploadFile(formData).then(res => {
                if(res.code === 200) {
                    // form.schoolLogo = res.data
                    resolve(res.data)
                }
            })
        })
    }

    return {
        uploadImg
    }
}